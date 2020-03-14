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
  State
} from "@stencil/core";
import { queryShadowRoot, isHidden, isFocusable } from "@a11y/focus-trap";

@Component({
  tag: "calcite-modal",
  styleUrl: "calcite-modal.scss",
  shadow: true
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
  /** Optionally pass a function to run before close */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () =>
    Promise.resolve();
  /** Aria label for the close button */
  @Prop() closeLabel: string = "Close";
  /** Prevent the modal from taking up the entire screen on mobile */
  @Prop({ reflect: true }) docked: boolean;
  /** Specify an element to focus when the modal is first opened */
  @Prop() firstFocus?: HTMLElement;
  /** Flag to disable the default close on escape behavior */
  @Prop() disableEscape?: boolean;
  /** Set the overall size of the modal */
  @Prop({ reflect: true }) size: "small" | "medium" | "large" | "fullscreen" =
    "small";
  /** Adds a color bar at the top for visual impact,
   * Use color to add importance to desctructive/workflow dialogs. */
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
    return (
      <Host
        role="dialog"
        aria-modal="true"
        class={{ "is-active": this.isActive }}
      >
        <div class="modal">
          <div
            data-focus-fence="true"
            tabindex="0"
            onFocus={this.focusLastElement.bind(this)}
          />
          <div class="modal__header">
            <button
              class="modal__close"
              aria-label={this.closeLabel}
              ref={el => (this.closeButton = el)}
              onClick={() => this.close()}
            >
              <calcite-icon icon="x" scale="m"></calcite-icon>
            </button>
            <header class="modal__title">
              <slot name="header" />
            </header>
          </div>
          <div
            class={{
              modal__content: true,
              "modal__content--spaced": !this.noPadding
            }}
            ref={el => (this.modalContent = el)}
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

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keyup", { target: "window" }) handleEscape(e: KeyboardEvent) {
    if (this.isActive && !this.disableEscape && e.key === "Escape") {
      this.close();
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
  /** Open the modal */
  @Method() async open(): Promise<HTMLElement> {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isActive = true;

    // wait for the modal to open, then handle focus.
    return new Promise(resolve => {
      setTimeout(() => {
        this.focusElement(this.firstFocus);
        resolve(this.el);
      }, 300);
      document.documentElement.classList.add("overflow-hidden");
      this.calciteModalOpen.emit();
    });
  }

  /** Close the modal, first running the `beforeClose` method */
  @Method() async close(): Promise<HTMLElement> {
    return this.beforeClose(this.el).then(() => {
      this.isActive = false;
      this.previousActiveElement.focus();
      document.documentElement.classList.remove("overflow-hidden");
      this.calciteModalClose.emit();
      return new Promise(resolve => {
        setTimeout(() => resolve(this.el), 300);
      });
    });
  }

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
      this.closeButton && this.closeButton.focus();
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
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() isActive: boolean;
  private previousActiveElement: HTMLElement;
  private closeButton: HTMLButtonElement;
  private modalContent: HTMLDivElement;

  private focusFirstElement() {
    this.closeButton && this.closeButton.focus();
  }

  private focusLastElement() {
    const focusableElements = queryShadowRoot(
      this.el,
      isHidden,
      isFocusable
    ).filter(el => !el.getAttribute("data-focus-fence"));
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    } else {
      this.closeButton && this.closeButton.focus();
    }
  }
}
