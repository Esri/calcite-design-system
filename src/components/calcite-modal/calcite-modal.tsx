import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";
import {
  CalciteFocusableElement,
  ensureId,
  focusElement,
  getElementDir,
  getSlotted,
  isCalciteFocusable
} from "../../utils/dom";
import { getKey } from "../../utils/key";
import { queryShadowRoot } from "@a11y/focus-trap/shadow";
import { isFocusable, isHidden } from "@a11y/focus-trap/focusable";
import { Scale } from "../interfaces";
import { ModalBackgroundColor } from "./interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { TEXT, SLOTS, CSS, ICONS } from "./resources";
import { createObserver } from "../../utils/observers";

const isFocusableExtended = (el: CalciteFocusableElement): boolean => {
  return isCalciteFocusable(el) || isFocusable(el);
};

const getFocusableElements = (el: HTMLElement | ShadowRoot): HTMLElement[] => {
  return queryShadowRoot(el, isHidden, isFocusableExtended);
};

/**
 * @slot header - a slot for adding a modal header
 * @slot content - a slot for adding modal content
 * @slot primary - a slot for adding a primary button
 * @slot secondary - a slot for adding a secondary button
 * @slot back - a slot for adding a back button
 */

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
  @Prop({ mutable: true, reflect: true }) active = false;

  /** Optionally pass a function to run before close */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () => Promise.resolve();

  /** Disables the display a close button within the Modal */
  @Prop() disableCloseButton = false;

  /** Disables the closing of the Modal when clicked outside. */
  @Prop() disableOutsideClose = false;

  /** Aria label for the close button */
  @Prop() intlClose = TEXT.close;

  /** Prevent the modal from taking up the entire screen on mobile */
  @Prop({ reflect: true }) docked: boolean;

  /** Specify an element to focus when the modal is first opened */
  @Prop() firstFocus?: HTMLElement;

  /** Flag to disable the default close on escape behavior */
  @Prop() disableEscape = false;

  /** specify the scale of modal, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
  @Prop({ reflect: true }) width: Scale | number = "m";

  /** Set the modal to always be fullscreen (overrides width) */
  @Prop({ reflect: true }) fullscreen: boolean;

  /** Adds a color bar at the top for visual impact,
   * Use color to add importance to destructive/workflow dialogs. */
  @Prop({ reflect: true }) color?: "red" | "blue";

  /** Background color of modal content */
  @Prop({ reflect: true }) backgroundColor: ModalBackgroundColor = "white";

  /** Turn off spacing around the content area slot */
  @Prop() noPadding = false;

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

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateFooterVisibility();
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
  }

  render(): VNode {
    const dir = getElementDir(this.el);

    return (
      <Host
        aria-describedby={this.contentId}
        aria-labelledby={this.titleId}
        aria-modal="true"
        role="dialog"
      >
        <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
        {this.renderStyle()}
        <div
          class={{ modal: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
          onTransitionEnd={this.transitionEnd}
        >
          <div data-focus-fence onFocus={this.focusLastElement} tabindex="0" />
          <div class={CSS.header}>
            {this.renderCloseButton()}
            <header class={CSS.title}>
              <slot name={CSS.header} />
            </header>
          </div>
          <div
            class={{
              content: true,
              "content--spaced": !this.noPadding,
              "content--no-footer": !this.hasFooter
            }}
            ref={(el) => (this.modalContent = el)}
          >
            <slot name={SLOTS.content} />
          </div>
          {this.renderFooter()}
          <div data-focus-fence onFocus={this.focusFirstElement} tabindex="0" />
        </div>
      </Host>
    );
  }

  renderFooter(): VNode {
    return this.hasFooter ? (
      <div class={CSS.footer}>
        <span class={CSS.back}>
          <slot name={SLOTS.back} />
        </span>
        <span class={CSS.secondary}>
          <slot name={SLOTS.secondary} />
        </span>
        <span class={CSS.primary}>
          <slot name={SLOTS.primary} />
        </span>
      </div>
    ) : null;
  }

  renderCloseButton(): VNode {
    return !this.disableCloseButton ? (
      <button
        aria-label={this.intlClose}
        class={CSS.close}
        onClick={this.close}
        ref={(el) => (this.closeButtonEl = el)}
        title={this.intlClose}
      >
        <calcite-icon
          icon={ICONS.close}
          scale={
            this.scale === "s" ? "s" : this.scale === "m" ? "m" : this.scale === "l" ? "l" : null
          }
        />
      </button>
    ) : null;
  }

  renderStyle(): VNode {
    const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
    return hasCustomWidth ? (
      <style>
        {`
        .modal {
          max-width: ${this.width}px !important;
        }
        @media screen and (max-width: ${this.width}px) {
          .modal {
            height: 100% !important;
            max-height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          .content {
            flex: 1 1 auto !important;
            max-height: unset !important;
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
  @State() hasFooter = true;

  closeButtonEl: HTMLButtonElement;

  contentId: string;

  modalContent: HTMLDivElement;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateFooterVisibility()
  );

  previousActiveElement: HTMLElement;

  titleId: string;

  private activeTransitionProp = "opacity";

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
  /** Fired when the modal finishes the open animation */
  @Event() calciteModalOpen: EventEmitter;

  /** Fired when the modal finishes the close animation */
  @Event() calciteModalClose: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Focus first interactive element
   * @deprecated use `setFocus` instead.
   */
  @Method()
  async focusElement(el?: HTMLElement): Promise<void> {
    if (el) {
      el.focus();
    }

    return this.setFocus();
  }

  /**
   * Sets focus on the component.
   *
   * By default, will try to focus on any focusable content. If there is none, it will focus on the close button.
   * If you want to focus on the close button, you can use the `close-button` focus ID.
   */
  @Method()
  async setFocus(focusId?: "close-button"): Promise<void> {
    const closeButton = this.closeButtonEl;

    return focusElement(
      focusId === "close-button" ? closeButton : getFocusableElements(this.el)[0] || closeButton
    );
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
  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active ? this.calciteModalOpen.emit() : this.calciteModalClose.emit();
    }
  };

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

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteModalOpen", this.openEnd);
  };

  /** Open the modal */
  private open() {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.el.addEventListener("calciteModalOpen", this.openEnd);
    this.active = true;

    const titleEl = getSlotted(this.el, SLOTS.header);
    const contentEl = getSlotted(this.el, SLOTS.content);

    this.titleId = ensureId(titleEl);
    this.contentId = ensureId(contentEl);

    document.documentElement.classList.add(CSS.overflowHidden);
  }

  handleOutsideClose = (): void => {
    if (this.disableOutsideClose) {
      return;
    }

    this.close();
  };

  /** Close the modal, first running the `beforeClose` method */
  close = (): Promise<void> => {
    return this.beforeClose(this.el).then(() => {
      this.active = false;
      focusElement(this.previousActiveElement);
      this.removeOverflowHiddenClass();
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

  private removeOverflowHiddenClass(): void {
    document.documentElement.classList.remove(CSS.overflowHidden);
  }

  private updateFooterVisibility = (): void => {
    this.hasFooter = !!this.el.querySelector(
      `[slot=${SLOTS.back}], [slot=${SLOTS.secondary}], [slot=${SLOTS.primary}]`
    );
  };
}
