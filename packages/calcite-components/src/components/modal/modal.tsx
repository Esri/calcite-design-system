import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
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
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { componentOnReady, getIconScale } from "../../utils/component";
import { logger } from "../../utils/logger";
import { ModalMessages } from "./assets/modal/t9n";
import { CSS, ICONS, SLOTS } from "./resources";

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
@Component({
  tag: "calcite-modal",
  styleUrl: "modal.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Modal
  implements
    OpenCloseComponent,
    FocusTrapComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, displays and positions the component.  */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is.
   *
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) opened = false;

  /** Passes a function to run before the component closes. */
  @Prop() beforeClose: (el: HTMLCalciteModalElement) => Promise<void>;

  /** When `true`, disables the component's close button. */
  @Prop({ reflect: true }) closeButtonDisabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

  @Watch("focusTrapDisabled")
  handleFocusTrapDisabled(focusTrapDisabled: boolean): void {
    if (!this.open) {
      return;
    }

    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) outsideCloseDisabled = false;

  /** When `true`, prevents the component from expanding to the entire screen on mobile devices. */
  @Prop({ reflect: true }) docked: boolean;

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) embedded = false;

  /** When `true`, disables the default close on escape behavior. */
  @Prop({ reflect: true }) escapeDisabled = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Specifies the width of the component. */
  @Prop({ reflect: true }) widthScale: Scale = "m";

  /** Sets the component to always be fullscreen. Overrides `widthScale` and `--calcite-modal-width` / `--calcite-modal-height`. */
  @Prop({ reflect: true }) fullscreen: boolean;

  /** Specifies the kind of the component, which will apply to top border. */
  @Prop({ reflect: true }) kind: Extract<"brand" | "danger" | "info" | "success" | "warning", Kind>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ModalMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ModalMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    logger.deprecated("component", {
      name: "modal",
      removalVersion: 4,
      suggested: "dialog",
    });

    await setUpMessages(this);
    setUpLoadableComponent(this);
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      this.openModal();
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] });
    this.updateSizeCssVars();
    connectLocalized(this);
    connectMessages(this);
    connectFocusTrap(this, {
      focusTrapOptions: {
        // Scrim has it's own close handler, allow it to take over.
        clickOutsideDeactivates: false,
        escapeDeactivates: this.escapeDeactivates,
        onDeactivate: this.focusTrapDeactivates,
      },
    });
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    this.cssVarObserver?.disconnect();
    deactivateFocusTrap(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.embedded = false;
  }

  render(): VNode {
    return (
      <Host
        aria-describedby={this.contentId}
        aria-labelledby={this.titleId}
        aria-modal="true"
        role="dialog"
      >
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
                <slot name={CSS.header} onSlotchange={this.handleHeaderSlotChange} />
              </header>
            </div>
            {this.renderContentTop()}
            <div
              class={{
                [CSS.content]: true,
                [CSS.contentNoFooter]: !this.hasFooter,
              }}
              ref={(el) => (this.modalContent = el)}
            >
              <slot name={SLOTS.content} onSlotchange={this.handleContentSlotChange} />
            </div>
            {this.renderContentBottom()}
            {this.renderFooter()}
          </div>
        </div>
      </Host>
    );
  }

  renderFooter(): VNode {
    return (
      <div class={CSS.footer} hidden={!this.hasFooter} key="footer">
        <span class={CSS.back}>
          <slot name={SLOTS.back} onSlotchange={this.handleBackSlotChange} />
        </span>
        <span class={CSS.secondary}>
          <slot name={SLOTS.secondary} onSlotchange={this.handleSecondarySlotChange} />
        </span>
        <span class={CSS.primary}>
          <slot name={SLOTS.primary} onSlotchange={this.handlePrimarySlotChange} />
        </span>
      </div>
    );
  }

  renderContentTop(): VNode {
    return (
      <div class={CSS.contentTop} hidden={!this.hasContentTop}>
        <slot name={SLOTS.contentTop} onSlotchange={this.contentTopSlotChangeHandler} />
      </div>
    );
  }

  renderContentBottom(): VNode {
    return (
      <div class={CSS.contentBottom} hidden={!this.hasContentBottom}>
        <slot name={SLOTS.contentBottom} onSlotchange={this.contentBottomSlotChangeHandler} />
      </div>
    );
  }

  renderCloseButton(): VNode {
    return !this.closeButtonDisabled ? (
      <button
        aria-label={this.messages.close}
        class={CSS.close}
        key="button"
        onClick={this.handleCloseClick}
        ref={(el) => (this.closeButtonEl = el)}
        title={this.messages.close}
      >
        <calcite-icon icon={ICONS.close} scale={getIconScale(this.scale)} />
      </button>
    ) : null;
  }

  renderStyle(): VNode {
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

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  ignoreOpenChange = false;

  @Element() el: HTMLCalciteModalElement;

  modalContent: HTMLDivElement;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateFocusTrapElements(),
  );

  private cssVarObserver: MutationObserver = createObserver("mutation", () => {
    this.updateSizeCssVars();
  });

  titleId: string;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  closeButtonEl: HTMLButtonElement;

  contentId: string;

  @State() cssWidth: string | number;

  @State() cssHeight: string | number;

  @State() hasFooter = false;

  @Watch("hasBack")
  @Watch("hasPrimary")
  @Watch("hasSecondary")
  handleHasFooterChange(): void {
    this.hasFooter = this.hasBack || this.hasPrimary || this.hasSecondary;
  }

  @State() titleEl: HTMLElement;

  @State() contentEl: HTMLElement;

  @State() hasBack = false;

  @State() hasPrimary = false;

  @State() hasSecondary = false;

  @State() hasContentTop = false;

  @State() hasContentBottom = false;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ModalMessages;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteModalBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteModalClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteModalBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteModalOpen: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Sets focus on the component's "close" button (the first focusable item).
   *
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  /**
   * Updates the element(s) that are used within the focus-trap of the component.
   */
  @Method()
  async updateFocusTrapElements(): Promise<void> {
    updateFocusTrapElements(this);
  }

  /**
   * Sets the scroll top of the component's content.
   *
   * @param top
   * @param left
   */
  @Method()
  async scrollContent(top = 0, left = 0): Promise<void> {
    if (this.modalContent) {
      if (this.modalContent.scrollTo) {
        this.modalContent.scrollTo({ top, left, behavior: "smooth" });
      } else {
        this.modalContent.scrollTop = top;
        this.modalContent.scrollLeft = left;
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleHeaderSlotChange = (event: Event): void => {
    this.titleEl = slotChangeGetAssignedElements<HTMLElement>(event)[0];
  };

  private handleContentSlotChange = (event: Event): void => {
    this.contentEl = slotChangeGetAssignedElements<HTMLElement>(event)[0];
  };

  private handleBackSlotChange = (event: Event): void => {
    this.hasBack = slotChangeHasAssignedElement(event);
  };

  private handlePrimarySlotChange = (event: Event): void => {
    this.hasPrimary = slotChangeHasAssignedElement(event);
  };

  private handleSecondarySlotChange = (event: Event): void => {
    this.hasSecondary = slotChangeHasAssignedElement(event);
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

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

  @Watch("open")
  toggleModal(value: boolean): void {
    if (this.ignoreOpenChange) {
      return;
    }

    if (value) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  @Watch("opened")
  handleOpenedChange(value: boolean): void {
    const idleClass = value ? CSS.openingIdle : CSS.closingIdle;
    this.transitionEl.classList.add(idleClass);
    onToggleOpenCloseComponent(this);
  }

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteModalOpen", this.openEnd);
  };

  private handleCloseClick = () => {
    this.open = false;
  };

  private async openModal(): Promise<void> {
    await componentOnReady(this.el);
    this.el.addEventListener("calciteModalOpen", this.openEnd);
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

  private handleOutsideClose = (): void => {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.open = false;
  };

  closeModal = async (): Promise<void> => {
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
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", initialDocumentOverflowStyle);
  }

  private updateSizeCssVars = (): void => {
    this.cssWidth = getComputedStyle(this.el).getPropertyValue("--calcite-modal-width");
    this.cssHeight = getComputedStyle(this.el).getPropertyValue("--calcite-modal-height");
  };

  private contentTopSlotChangeHandler = (event: Event): void => {
    this.hasContentTop = slotChangeHasAssignedElement(event);
  };

  private contentBottomSlotChangeHandler = (event: Event): void => {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  };

  private escapeDeactivates = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.escapeDisabled) {
      return false;
    }
    event.preventDefault();
    return true;
  };

  private focusTrapDeactivates = () => {
    this.open = false;
  };
}
