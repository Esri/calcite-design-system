import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import {
  ensureId,
  focusFirstTabbable,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrap,
  FocusTrapComponent,
  updateFocusTrapElements,
} from "../../utils/focusTrapComponent";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Kind, Scale } from "../interfaces";
import { componentOnReady, getIconScale } from "../../utils/component";
import { logger } from "../../utils/logger";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/modal.t9n.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./modal.scss";

declare global {
  interface DeclareElements {
    "calcite-modal": Modal;
  }
}

let totalOpenModals: number = 0;
let initialDocumentOverflowStyle: string = "";

/**
 * @deprecated Use the `calcite-dialog` component instead.
 * @slot header - A slot for adding header text.
 * @slot content - A slot for adding the component's content.
 * @slot content-top - A slot for adding content to the component's sticky header, where content remains at the top of the component when scrolling up and down.
 * @slot content-bottom - A slot for adding content to the component's sticky footer, where content remains at the bottom of the component when scrolling up and down.
 * @slot primary - A slot for adding a primary button.
 * @slot secondary - A slot for adding a secondary button.
 * @slot back - A slot for adding a back button.
 */
export class Modal
  extends LitElement
  implements OpenCloseComponent, FocusTrapComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private closeButtonEl = createRef<HTMLButtonElement>();

  private contentId: string;

  private cssVarObserver: MutationObserver = createObserver("mutation", () => {
    this.updateSizeCssVars();
  });

  private escapeDeactivates = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.escapeDisabled) {
      return false;
    }
    event.preventDefault();
    return true;
  };

  focusTrap: FocusTrap;

  private focusTrapDeactivates = () => {
    this.open = false;
  };

  private ignoreOpenChange = false;

  private modalContent = createRef<HTMLDivElement>();

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateFocusTrapElements(),
  );

  private _open = false;

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener(
      "calciteModalOpen",
      this.openEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  };

  openTransitionProp = "opacity";

  private titleId: string;

  transitionEl: HTMLDivElement;

  // #endregion

  // #region State Properties

  @state() contentEl: HTMLElement;

  @state() cssHeight: string | number;

  @state() cssWidth: string | number;

  @state() hasBack = false;

  @state() hasContentBottom = false;

  @state() hasContentTop = false;

  @state() hasFooter = false;

  @state() hasPrimary = false;

  @state() hasSecondary = false;

  @state() titleEl: HTMLElement;

  // #endregion

  // #region Public Properties

  /** Passes a function to run before the component closes. */
  @property() beforeClose: (el: Modal["el"]) => Promise<void>;

  /** When `true`, disables the component's close button. */
  @property({ reflect: true }) closeButtonDisabled = false;

  /** When `true`, prevents the component from expanding to the entire screen on mobile devices. */
  @property({ reflect: true }) docked: boolean;

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @private
   */
  @property() embedded = false;

  /** When `true`, disables the default close on escape behavior. */
  @property({ reflect: true }) escapeDisabled = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /** Sets the component to always be fullscreen. Overrides `widthScale` and `--calcite-modal-width` / `--calcite-modal-height`. */
  @property({ reflect: true }) fullscreen: boolean;

  /** Specifies the kind of the component, which will apply to top border. */
  @property({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  >;

  /** Use this property to override individual strings used by the component. */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messages = useT9n<typeof T9nStrings>();

  /** When `true`, displays and positions the component. */
  @property({ reflect: true })
  get open(): boolean {
    return this._open;
  }

  set open(open: boolean) {
    const oldOpen = this._open;
    if (open !== oldOpen) {
      this._open = open;
      this.toggleModal(open);
    }
  }

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is.
   *
   * @private
   */
  @property({ reflect: true }) opened = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @property({ reflect: true }) outsideCloseDisabled = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
  @property({ reflect: true }) widthScale: Scale = "m";

  // #endregion

  // #region Public Methods

  /**
   * Sets the scroll top of the component's content.
   *
   * @param top
   * @param left
   */
  @method()
  async scrollContent(top = 0, left = 0): Promise<void> {
    if (this.modalContent.value) {
      if (this.modalContent.value.scrollTo) {
        this.modalContent.value.scrollTo({ top, left, behavior: "smooth" });
      } else {
        this.modalContent.value.scrollTop = top;
        this.modalContent.value.scrollLeft = left;
      }
    }
  }

  /** Sets focus on the component's "close" button (the first focusable item). */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  /** Updates the element(s) that are used within the focus-trap of the component. */
  @method()
  async updateFocusTrapElements(): Promise<void> {
    updateFocusTrapElements(this);
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteModalBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteModalBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteModalClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteModalOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] });
    this.updateSizeCssVars();
    connectFocusTrap(this, {
      focusTrapOptions: {
        // Scrim has it's own close handler, allow it to take over.
        clickOutsideDeactivates: false,
        escapeDeactivates: this.escapeDeactivates,
        onDeactivate: this.focusTrapDeactivates,
      },
    });
  }

  async load(): Promise<void> {
    logger.deprecated("component", {
      name: "modal",
      removalVersion: 4,
      suggested: "dialog",
    });
    setUpLoadableComponent(this);
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      this.openModal();
    }
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("focusTrapDisabled") && (this.hasUpdated || this.focusTrapDisabled !== false)) {
      this.handleFocusTrapDisabled(this.focusTrapDisabled);
    }

    if (
      (changes.has("hasBack") && (this.hasUpdated || this.hasBack !== false)) ||
      (changes.has("hasPrimary") && (this.hasUpdated || this.hasPrimary !== false)) ||
      (changes.has("hasSecondary") && (this.hasUpdated || this.hasSecondary !== false))
    ) {
      this.handleHasFooterChange();
    }

    if (changes.has("opened") && (this.hasUpdated || this.opened !== false)) {
      this.handleOpenedChange(this.opened);
    }
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    this.cssVarObserver?.disconnect();
    deactivateFocusTrap(this);
    this.embedded = false;
  }

  // #endregion

  // #region Private Methods

  private handleFocusTrapDisabled(focusTrapDisabled: boolean): void {
    if (!this.open) {
      return;
    }

    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }

  private handleHasFooterChange(): void {
    this.hasFooter = this.hasBack || this.hasPrimary || this.hasSecondary;
  }

  private handleHeaderSlotChange(event: Event): void {
    this.titleEl = slotChangeGetAssignedElements<HTMLElement>(event)[0];
  }

  private handleContentSlotChange(event: Event): void {
    this.contentEl = slotChangeGetAssignedElements<HTMLElement>(event)[0];
  }

  private handleBackSlotChange(event: Event): void {
    this.hasBack = slotChangeHasAssignedElement(event);
  }

  private handlePrimarySlotChange(event: Event): void {
    this.hasPrimary = slotChangeHasAssignedElement(event);
  }

  private handleSecondarySlotChange(event: Event): void {
    this.hasSecondary = slotChangeHasAssignedElement(event);
  }

  private setTransitionEl(el: HTMLDivElement): void {
    this.transitionEl = el;
  }

  onBeforeOpen(): void {
    this.transitionEl.classList.add(CSS.openingActive);
    this.calciteModalBeforeOpen.emit();
  }

  onOpen(): void {
    this.transitionEl.classList.remove(CSS.openingIdle, CSS.openingActive);
    this.calciteModalOpen.emit();
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.transitionEl.classList.add(CSS.closingActive);
    this.calciteModalBeforeClose.emit();
  }

  onClose(): void {
    this.transitionEl.classList.remove(CSS.closingIdle, CSS.closingActive);
    this.calciteModalClose.emit();
    deactivateFocusTrap(this);
  }

  private toggleModal(value: boolean): void {
    if (this.ignoreOpenChange) {
      return;
    }

    if (value) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  private handleOpenedChange(value: boolean): void {
    const idleClass = value ? CSS.openingIdle : CSS.closingIdle;
    this.transitionEl.classList.add(idleClass);
    onToggleOpenCloseComponent(this);
  }

  private handleCloseClick() {
    this.open = false;
  }

  private async openModal(): Promise<void> {
    await componentOnReady(this.el);
    this.el.addEventListener(
      "calciteModalOpen",
      this.openEnd,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    this.opened = true;

    this.titleId = ensureId(this.titleEl);
    this.contentId = ensureId(this.contentEl);

    if (!this.embedded) {
      if (totalOpenModals === 0) {
        initialDocumentOverflowStyle = document.documentElement.style.overflow;
      }

      totalOpenModals++;
      // use an inline style instead of a utility class to avoid global class declarations.
      document.documentElement.style.setProperty("overflow", "hidden");
    }
  }

  private handleOutsideClose(): void {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  }

  private async closeModal(): Promise<void> {
    if (this.beforeClose) {
      try {
        await this.beforeClose(this.el);
      } catch (_error) {
        // close prevented
        requestAnimationFrame(() => {
          this.ignoreOpenChange = true;
          this.open = true;
          this.ignoreOpenChange = false;
        });
        return;
      }
    }

    totalOpenModals--;
    this.opened = false;
    this.removeOverflowHiddenClass();
  }

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", initialDocumentOverflowStyle);
  }

  private updateSizeCssVars(): void {
    this.cssWidth = getComputedStyle(this.el).getPropertyValue("--calcite-modal-width");
    this.cssHeight = getComputedStyle(this.el).getPropertyValue("--calcite-modal-height");
  }

  private contentTopSlotChangeHandler(event: Event): void {
    this.hasContentTop = slotChangeHasAssignedElement(event);
  }

  private contentBottomSlotChangeHandler(event: Event): void {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "aria-describedby", this.contentId);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "aria-labelledby", this.titleId);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaModal = "true";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "dialog";
    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerOpen]: this.opened,
          [CSS.containerEmbedded]: this.embedded,
        }}
      >
        <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
        {this.renderStyle()}
        <div
          class={{
            [CSS.modal]: true,
          }}
          ref={this.setTransitionEl}
        >
          <div class={CSS.header}>
            {this.renderCloseButton()}
            <header class={CSS.title}>
              <slot name={CSS.header} onSlotChange={this.handleHeaderSlotChange} />
            </header>
          </div>
          {this.renderContentTop()}
          <div
            class={{
              [CSS.content]: true,
              [CSS.contentNoFooter]: !this.hasFooter,
            }}
            ref={this.modalContent}
          >
            <slot name={SLOTS.content} onSlotChange={this.handleContentSlotChange} />
          </div>
          {this.renderContentBottom()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  private renderFooter(): JsxNode {
    return (
      <div class={CSS.footer} hidden={!this.hasFooter} key="footer">
        <span class={CSS.back}>
          <slot name={SLOTS.back} onSlotChange={this.handleBackSlotChange} />
        </span>
        <span class={CSS.secondary}>
          <slot name={SLOTS.secondary} onSlotChange={this.handleSecondarySlotChange} />
        </span>
        <span class={CSS.primary}>
          <slot name={SLOTS.primary} onSlotChange={this.handlePrimarySlotChange} />
        </span>
      </div>
    );
  }

  private renderContentTop(): JsxNode {
    return (
      <div class={CSS.contentTop} hidden={!this.hasContentTop}>
        <slot name={SLOTS.contentTop} onSlotChange={this.contentTopSlotChangeHandler} />
      </div>
    );
  }

  private renderContentBottom(): JsxNode {
    return (
      <div class={CSS.contentBottom} hidden={!this.hasContentBottom}>
        <slot name={SLOTS.contentBottom} onSlotChange={this.contentBottomSlotChangeHandler} />
      </div>
    );
  }

  private renderCloseButton(): JsxNode {
    return !this.closeButtonDisabled ? (
      <button
        ariaLabel={this.messages.close}
        class={CSS.close}
        key="button"
        onClick={this.handleCloseClick}
        ref={this.closeButtonEl}
        title={this.messages.close}
      >
        <calcite-icon icon={ICONS.close} scale={getIconScale(this.scale)} />
      </button>
    ) : null;
  }

  private renderStyle(): JsxNode {
    if (!this.fullscreen && (this.cssWidth || this.cssHeight)) {
      return (
        <style>
          {`.${CSS.container} {
              ${this.docked && this.cssWidth ? `align-items: center !important;` : ""}
            }
            .${CSS.modal} {
              block-size: ${this.cssHeight ? this.cssHeight : "auto"} !important;
              ${this.cssWidth ? `inline-size: ${this.cssWidth} !important;` : ""}
              ${this.cssWidth ? `max-inline-size: ${this.cssWidth} !important;` : ""}
              ${this.docked ? `border-radius: var(--calcite-border-radius) !important;` : ""}
            }
            @media screen and (max-width: ${this.cssWidth}) {
              .${CSS.container} {
                ${this.docked ? `align-items: flex-end !important;` : ""}
              }
              .${CSS.modal} {
                max-block-size: 100% !important;
                inline-size: 100% !important;
                max-inline-size: 100% !important;
                min-inline-size: 100% !important;
                margin: 0 !important;
                ${!this.docked ? `block-size: 100% !important;` : ""}
                ${!this.docked ? `border-radius: 0 !important;` : ""}
                ${
                  this.docked
                    ? `border-radius: var(--calcite-border-radius) var(--calcite-border-radius) 0 0 !important;`
                    : ""
                }
              }
            }
          `}
        </style>
      );
    }
  }

  // #endregion
}
