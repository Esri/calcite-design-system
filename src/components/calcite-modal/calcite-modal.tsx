import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h,
  Method,
  State,
  Watch,
} from "@stencil/core";
import { queryShadowRoot, isHidden, isFocusable } from "@a11y/focus-trap";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { VNode } from "@stencil/core/internal/stencil-core";

@Component({
  tag: "calcite-modal",
  styleUrl: "calcite-modal.scss",
  shadow: true,
})
export class CalciteModal {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Add the active attribute to open the modal */
  @Prop() active?: boolean;
  /** Optionally pass a function to run before close */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () =>
    Promise.resolve();
  /** Disables the display a close button within the Modal */
  @Prop() disableCloseButton?: boolean;
  /** Aria label for the close button */
  @Prop() intlClose: string = "Close";
  /** Prevent the modal from taking up the entire screen on mobile */
  @Prop({ reflect: true }) docked: boolean;
  /** Specify an element to focus when the modal is first opened */
  @Prop() firstFocus?: HTMLElement;
  /** Flag to disable the default close on escape behavior */
  @Prop() disableEscape?: boolean;
  /** Set the overall size of the modal. Can use stock sizes or pass a number (pixels) */
  @Prop({ reflect: true }) size:
    | "small"
    | "medium"
    | "large"
    | "fullscreen"
    | number;
  /** Adds a color bar at the top for visual impact,
   * Use color to add importance to destructive/workflow dialogs. */
  @Prop({ reflect: true }) color?: "red" | "blue";
  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";
  /** Turn off spacing around the content area slot */
  @Prop() noPadding?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir} role="dialog" aria-modal="true" is-active={this.isActive}>
        <calcite-scrim class="scrim" theme="dark"></calcite-scrim>
        {this.renderStyle()}
        <div class="modal">
          <div
            data-focus-fence="true"
            tabindex="0"
            onFocus={this.focusLastElement.bind(this)}
          />
          <div class="modal__header">
            {this.renderCloseButton()}
            <header class="modal__title">
              <slot name="header" />
            </header>
          </div>
          <div
            class={{
              modal__content: true,
              "modal__content--spaced": !this.noPadding,
            }}
            ref={(el) => (this.modalContent = el)}
          >
            <slot name="content" />
          </div>
          <div class="modal__footer">
            <span class="modal__back">
              <slot name="back" />
            </span>
            <span class="modal__secondary">
              <slot name="secondary" />
            </span>
            <span class="modal__primary">
              <slot name="primary" />
            </span>
          </div>
          <div
            data-focus-fence="true"
            tabindex="0"
            onFocus={this.focusFirstElement.bind(this)}
          />
        </div>
      </Host>
    );
  }

  renderCloseButton(): VNode {
    return !this.disableCloseButton ? (
      <button
        class="modal__close"
        aria-label={this.intlClose}
        title={this.intlClose}
        ref={(el) => (this.closeButtonEl = el)}
        onClick={() => this.close()}
      >
        <calcite-icon icon="x" scale="l"></calcite-icon>
      </button>
    ) : null;
  }

  renderStyle(): VNode {
    const hasCustomWidth = !isNaN(parseInt(`${this.size}`));
    return hasCustomWidth ? (
      <style>
        {`
        .modal {
          max-width: ${this.size}px;
        }
        @media screen and (max-width: ${this.size}px) {
          .modal {
            height: 100%;
            max-height: 100%;
            width: 100%;
            max-width: 100%;
            margin: 0;
            border-radius: 0;
          }
          .modal__content {
            flex: 1 1 auto;
            max-height: unset;
          }
          .modal__header,
          .modal__footer {
            flex: inherit;
          }
        }
      `}
      </style>
    ) : null;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keyup", { target: "window" }) handleEscape(e: KeyboardEvent) {
    if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
      this.beforeClose(this.el).then(() => {
        this.active = false;
      });
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Fired when the modal begins the open animation */
  @Event() calciteModalOpen: EventEmitter;
  /** Fired when the modal begins the close animation */
  @Event() calciteModalClose: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Focus first interactive element */
  @Method() async focusElement(el?: HTMLElement): Promise<void> {
    if (el) {
      el.focus();
      return;
    }
    const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      this.closeButtonEl?.focus();
    }
  }

  /** Set the scroll top of the modal content */
  @Method() async scrollContent(
    top: number = 0,
    left: number = 0
  ): Promise<void> {
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
  @Watch("active") async toggleModal(value, oldValue): Promise<void> {
    if (value !== oldValue) {
      if (value) {
        this.open();
      } else if (!value) {
        this.close();
      }
    }
  }

  /** Open the modal */
  private open() {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isActive = true;
    // wait for the modal to open, then handle focus.
    setTimeout(() => {
      this.focusElement(this.firstFocus);
      this.calciteModalOpen.emit();
    }, 300);
    document.documentElement.classList.add("overflow-hidden");
  }

  /** Close the modal, first running the `beforeClose` method */
  private close() {
    return this.beforeClose(this.el).then(() => {
      this.isActive = false;
      this.previousActiveElement?.focus();
      document.documentElement.classList.remove("overflow-hidden");
      setTimeout(() => this.calciteModalClose.emit(), 300);
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() isActive: boolean;
  private previousActiveElement: HTMLElement;
  private closeButtonEl: HTMLButtonElement;
  private modalContent: HTMLDivElement;

  private focusFirstElement() {
    this.closeButtonEl?.focus();
  }

  private focusLastElement() {
    const focusableElements = queryShadowRoot(
      this.el,
      isHidden,
      isFocusable
    ).filter((el) => !el.getAttribute("data-focus-fence"));
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    } else {
      this.closeButtonEl?.focus();
    }
  }
}
