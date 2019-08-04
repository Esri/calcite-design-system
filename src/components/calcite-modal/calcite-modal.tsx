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
import { x24 } from "@esri/calcite-ui-icons";
import "@a11y/focus-trap";
import { FocusTrap } from "@a11y/focus-trap";
import { getElementDir, getElementTheme, hasSlottedContent } from "../../utils/dom";

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
  /** Set the overall size of the modal */
  @Prop({ reflect: true }) size: "small" | "medium" | "large" | "fullscreen" =
    "small";
  /** Adds a color bar at the top for visual impact,
   * Use color to add importance to desctructive/workflow dialogs. */
  @Prop({ reflect: true }) color?: "red" | "blue";
  /** Select theme (light or dark) */
  @Prop({ reflect: true })
  theme: "light" | "dark" = "light";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    const back = this.el.shadowRoot.querySelector(
      "slot[name=back]"
    ) as HTMLSlotElement;
    const secondary = this.el.shadowRoot.querySelector(
      "slot[name=secondary]"
    ) as HTMLSlotElement;
    back.addEventListener("slotchange", () => {
      this.hideBackButton = !hasSlottedContent(back);
    });
    secondary.addEventListener("slotchange", () => {
      this.hideSecondaryButton = !hasSlottedContent(secondary);
    });
  }

  render() {
    const dir = getElementDir(this.el);
    const theme = getElementTheme(this.el);
    return (
      <Host
        role="dialog"
        aria-modal="true"
        class={{ "is-active": this.isActive }}
        dir={dir}
        theme={theme}
      >
        <div class="modal">
          <focus-trap ref={el => (this.trap = el as FocusTrap)}>
            <div class="modal__header">
              <button
                class="modal__close"
                aria-label={this.closeLabel}
                onClick={() => this.close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={x24} />
                </svg>
              </button>
              <header class="modal__title">
                <slot name="header"></slot>
              </header>
            </div>
            <div class="modal__content">
              <slot name="content"></slot>
            </div>
            <div
              class={{
                modal__footer: true,
                "modal__footer--hide-back": this.hideBackButton,
                "modal__footer--hide-secondary": this.hideSecondaryButton
              }}
            >
              <slot name="back"></slot>
              <slot name="secondary"></slot>
              <slot name="primary"></slot>
            </div>
          </focus-trap>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("keyup") handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
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
        if (this.firstFocus) {
          this.firstFocus.focus();
        } else {
          this.trap.focusFirstElement();
        }
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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() isActive: boolean;
  @State() hideBackButton: boolean = true;
  @State() hideSecondaryButton: boolean = true;
  private previousActiveElement: HTMLElement;
  private trap: FocusTrap;
}
