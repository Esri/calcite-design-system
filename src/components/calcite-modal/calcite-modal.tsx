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
  VNode
} from "@stencil/core";
import { getElementDir, CalciteFocusableElement, focusElement } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { queryShadowRoot } from "@a11y/focus-trap/shadow";
import { isHidden, isFocusable } from "@a11y/focus-trap/focusable";

function isCalciteFocusable(el: CalciteFocusableElement): boolean {
  return typeof el.setFocus === "function" || isFocusable(el);
}

function getFocusableElements(el: HTMLElement): HTMLElement[] {
  return queryShadowRoot(el, isHidden, isCalciteFocusable);
}

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
  @Element() el: HTMLCalciteModalElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  /** Add the active attribute to open the modal */
  @Prop() active?: boolean;

  /** Optionally pass a function to run before close */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () => Promise.resolve();

  /** Disables the display a close button within the Modal */
  @Prop() disableCloseButton?: boolean;

  /** Aria label for the close button */
  @Prop() intlClose = "Close";

  /** Prevent the modal from taking up the entire screen on mobile */
  @Prop({ reflect: true }) docked: boolean;

  /** Specify an element to focus when the modal is first opened */
  @Prop() firstFocus?: HTMLElement;

  /** Flag to disable the default close on escape behavior */
  @Prop() disableEscape?: boolean;

  /** specify the scale of modal, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
  @Prop({ reflect: true }) width: "s" | "m" | "l" | number = "m";

  /** Set the modal to always be fullscreen (overrides width) */
  @Prop({ reflect: true }) fullscreen: boolean;

  /** Adds a color bar at the top for visual impact,
   * Use color to add importance to destructive/workflow dialogs. */
  @Prop({ reflect: true }) color?: "red" | "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** Background color of modal content */
  @Prop({ reflect: true }) backgroundColor: "white" | "grey" = "white";

  /** Turn off spacing around the content area slot */
  @Prop() noPadding?: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad(): void {
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.active) {
      this.open();
    }
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host aria-modal="true" dir={dir} is-active={this.isActive} role="dialog">
        <calcite-scrim class="scrim" theme="dark" />
        {this.renderStyle()}
        <div class="modal">
          <div data-focus-fence="true" onFocus={this.focusLastElement} tabindex="0" />
          <div class="modal__header">
            {this.renderCloseButton()}
            <header class="modal__title">
              <slot name="header" />
            </header>
          </div>
          <div
            class={{
              modal__content: true,
              "modal__content--spaced": !this.noPadding
            }}
            ref={(el) => (this.modalContent = el)}
          >
            <slot name="content" />
          </div>
          {this.renderFooter()}
          <div data-focus-fence="true" onFocus={this.focusFirstElement} tabindex="0" />
        </div>
      </Host>
    );
  }

  renderFooter(): VNode {
    return this.el.querySelector("[slot=back], [slot=secondary], [slot=primary]") ? (
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
    ) : null;
  }

  renderCloseButton(): VNode {
    return !this.disableCloseButton ? (
      <button
        aria-label={this.intlClose}
        class="modal__close"
        onClick={this.close}
        ref={(el) => (this.closeButtonEl = el)}
        title={this.intlClose}
      >
        <calcite-icon icon="x" scale="l" />
      </button>
    ) : null;
  }

  renderStyle(): VNode {
    const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
    return hasCustomWidth ? (
      <style>
        {`
        .modal {
          max-width: ${this.width}px;
        }
        @media screen and (max-width: ${this.width}px) {
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
  //  Variables
  //
  //--------------------------------------------------------------------------
  @State() isActive: boolean;

  previousActiveElement: HTMLElement;

  closeButtonEl: HTMLButtonElement;

  modalContent: HTMLDivElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keyup", { target: "window" })
  handleEscape(e: KeyboardEvent): void {
    if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
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
  /** Focus first interactive element */
  @Method()
  async focusElement(el?: HTMLElement): Promise<void> {
    if (el) {
      focusElement(el);
      return;
    }
    const focusableElements = getFocusableElements(this.el);
    if (focusableElements.length > 0) {
      focusElement(focusableElements[0]);
    } else {
      focusElement(this.closeButtonEl);
    }
  }

  /** Set the scroll top of the modal content */
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
  @Watch("active")
  async toggleModal(value: boolean, oldValue: boolean): Promise<void> {
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
  close = (): Promise<void> => {
    return this.beforeClose(this.el).then(() => {
      this.active = false;
      this.isActive = false;
      focusElement(this.previousActiveElement);
      document.documentElement.classList.remove("overflow-hidden");
      setTimeout(() => this.calciteModalClose.emit(), 300);
    });
  };

  focusFirstElement = (): void => {
    focusElement(this.closeButtonEl);
  };

  focusLastElement = (): void => {
    const focusableElements = getFocusableElements(this.el).filter(
      (el) => !el.getAttribute("data-focus-fence")
    );
    if (focusableElements.length > 0) {
      focusElement(focusableElements[focusableElements.length - 1]);
    } else {
      focusElement(this.closeButtonEl);
    }
  };
}
