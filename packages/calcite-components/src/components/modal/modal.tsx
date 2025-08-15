// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  setAttribute,
  state,
} from "@arcgis/lumina";
import {
  ensureId,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Kind, Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";
import { logger } from "../../utils/logger";
import { useT9n } from "../../controllers/useT9n";
import { usePreventDocumentScroll } from "../../controllers/usePreventDocumentScroll";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./modal.scss";

declare global {
  interface DeclareElements {
    "calcite-modal": Modal;
  }
}

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
export class Modal extends LitElement implements OpenCloseComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private contentId: string;

  private cssVarObserver: MutationObserver = createObserver("mutation", () => {
    this.updateSizeCssVars();
  });

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      // scrim closes on click, so we let it take over
      clickOutsideDeactivates: () => this.embedded,
      escapeDeactivates: (event) => {
        if (!event.defaultPrevented && !this.escapeDisabled) {
          this.open = false;
          event.preventDefault();
        }

        return false;
      },
    },
  })(this);

  usePreventDocumentScroll = usePreventDocumentScroll()(this);

  private ignoreOpenChange = false;

  private modalContent = createRef<HTMLDivElement>();

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.focusTrap.updateContainerElements(),
  );

  private _open = false;

  openProp = "opened";

  transitionProp = "opacity" as const;

  private titleId: string;

  transitionEl: HTMLDivElement;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private keyDownHandler = (event: KeyboardEvent): void => {
    const { defaultPrevented, key } = event;

    if (
      !defaultPrevented &&
      this.focusTrapDisabled &&
      this.open &&
      !this.escapeDisabled &&
      key === "Escape"
    ) {
      event.preventDefault();
      this.open = false;
    }
  };

  //#endregion

  //#region State Properties

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

  @state() get preventDocumentScroll(): boolean {
    return !this.embedded;
  }

  //#endregion

  //#region Public Properties

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

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick`" allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active, and
   * `"extraContainers"` specifies additional focusable elements external to the trap (e.g., 3rd-party components appending elements to the document body).
   * `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  /** Sets the component to always be fullscreen. Overrides `widthScale` and `--calcite-modal-width` / `--calcite-modal-height`. */
  @property({ reflect: true }) fullscreen: boolean;

  /** Specifies the kind of the component, which will apply to top border. */
  @property({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  >;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

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

  //#endregion

  //#region Public Methods

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

  /**
   * Sets focus on the component's "close" button (the first focusable item).
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.focusTrap.setExtraContainers(extraContainers);
    this.focusTrap.updateContainerElements();
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteModalBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteModalBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteModalClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteModalOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] });
    this.updateSizeCssVars();
  }

  async load(): Promise<void> {
    logger.deprecated("component", {
      name: "modal",
      removalVersion: 4,
      suggested: "dialog",
    });
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      this.openModal();
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("hasBack") && (this.hasUpdated || this.hasBack !== false)) ||
      (changes.has("hasPrimary") && (this.hasUpdated || this.hasPrimary !== false)) ||
      (changes.has("hasSecondary") && (this.hasUpdated || this.hasSecondary !== false))
    ) {
      this.hasFooter = this.hasBack || this.hasPrimary || this.hasSecondary;
    }

    if (changes.has("opened") && (this.hasUpdated || this.opened !== false)) {
      this.handleOpenedChange(this.opened);
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.cssVarObserver?.disconnect();
    this.embedded = false;
  }

  //#endregion

  //#region Private Methods

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
    if (!el) {
      return;
    }

    this.transitionEl = el;
  }

  onBeforeOpen(): void {
    this.transitionEl?.classList.add(CSS.openingActive);
    this.calciteModalBeforeOpen.emit();
  }

  onOpen(): void {
    this.transitionEl?.classList.remove(CSS.openingIdle, CSS.openingActive);
    if (this.focusTrapDisabled) {
      this.setFocus();
    }
    this.focusTrap.activate();
    this.calciteModalOpen.emit();
  }

  onBeforeClose(): void {
    this.transitionEl?.classList.add(CSS.closingActive);
    this.calciteModalBeforeClose.emit();
  }

  onClose(): void {
    this.transitionEl?.classList.remove(CSS.closingIdle, CSS.closingActive);
    this.calciteModalClose.emit();
    this.focusTrap.deactivate();
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
    const { transitionEl } = this;

    if (!transitionEl) {
      return;
    }

    const idleClass = value ? CSS.openingIdle : CSS.closingIdle;
    transitionEl.classList.add(idleClass);
    toggleOpenClose(this);
  }

  private handleCloseClick() {
    this.open = false;
  }

  private async openModal(): Promise<void> {
    await this.componentOnReady();
    this.opened = true;

    this.titleId = ensureId(this.titleEl);
    this.contentId = ensureId(this.contentEl);
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
      } catch {
        // close prevented
        requestAnimationFrame(() => {
          this.ignoreOpenChange = true;
          this.open = true;
          this.ignoreOpenChange = false;
        });
        return;
      }
    }

    this.opened = false;
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

  //#endregion

  //#region Rendering

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

  //#endregion
}
