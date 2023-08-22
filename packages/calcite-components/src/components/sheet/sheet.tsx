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
  Watch,
} from "@stencil/core";
import { ensureId, focusFirstTabbable } from "../../utils/dom";
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
import { CSS } from "./resources";

import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { SheetMessages } from "./assets/sheet/t9n";
import { SheetPosition } from "./interfaces";

@Component({
  tag: "calcite-sheet",
  styleUrl: "sheet.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Sheet
  implements
    OpenCloseComponent,
    FocusTrapComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteSheetElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /** When `true`, displays and positions the component.  */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   *  Passes a function to run before the component closes.
   *
   * @returns {Promise<void>}
   */
  @Prop() beforeClose: (el: HTMLElement) => Promise<void> = () => Promise.resolve();

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

  /**
   * Specifies the label of the component.
   */
  @Prop() label!: string;

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) outsideCloseDisabled = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) position: SheetPosition = "inline-start";

  /** When `true`, disables the default close on escape behavior. */
  @Prop({ reflect: true }) escapeDisabled = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: SheetMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<SheetMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop({ mutable: true }) slottedInShell: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
    // when sheet initially renders, if active was set we need to open as watcher doesn't fire
    if (this.open) {
      onToggleOpenCloseComponent(this);
      requestAnimationFrame(() => this.openSheet());
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    connectLocalized(this);
    connectMessages(this);
    connectFocusTrap(this);
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    deactivateFocusTrap(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.slottedInShell = false;
  }

  render(): VNode {
    const { outsideCloseDisabled, messages } = this;
    return (
      <Host
        aria-describedby={this.contentId}
        aria-label={this.label}
        aria-modal="true"
        role="dialog"
      >
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: this.isOpen,
            [CSS.slottedInShell]: this.slottedInShell,
          }}
        >
          <calcite-scrim
            aria-label={outsideCloseDisabled ? null : messages.close}
            class={CSS.scrim}
            onClick={this.handleOutsideClose}
            title={outsideCloseDisabled ? null : messages.close}
          />
          <div
            class={{
              [CSS.content]: true,
            }}
            // eslint-disable-next-line react/jsx-sort-props
            ref={this.setTransitionEl}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  sheetContent: HTMLDivElement;

  contentId: string;

  initialOverflowCSS: string;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver()
  );

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  /**
   * We use internal variable to make sure initially open sheet can transition from closed state when rendered
   *
   * @private
   */
  @State() isOpen = false;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: SheetMessages;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown", { target: "window" })
  handleEscape(event: KeyboardEvent): void {
    if (this.open && !this.escapeDisabled && event.key === "Escape" && !event.defaultPrevented) {
      this.close();
      event.preventDefault();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteSheetBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteSheetClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteSheetBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteSheetOpen: EventEmitter<void>;

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
   * @param top - position from the top
   * @param left - position from the left
   */
  @Method()
  async scrollContent(top = 0, left = 0): Promise<void> {
    if (this.sheetContent) {
      if (this.sheetContent.scrollTo) {
        this.sheetContent.scrollTo({ top, left, behavior: "smooth" });
      } else {
        this.sheetContent.scrollTop = top;
        this.sheetContent.scrollLeft = left;
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
    this.contentId = ensureId(el);
  };

  onBeforeOpen(): void {
    this.transitionEl.classList.add(CSS.openingActive);
    this.calciteSheetBeforeOpen.emit();
  }

  onOpen(): void {
    this.transitionEl.classList.remove(CSS.openingIdle, CSS.openingActive);
    this.calciteSheetOpen.emit();
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.transitionEl.classList.add(CSS.closingActive);
    this.calciteSheetBeforeClose.emit();
  }

  onClose(): void {
    this.transitionEl.classList.remove(CSS.closingIdle, CSS.closingActive);
    this.calciteSheetClose.emit();
    deactivateFocusTrap(this);
  }

  @Watch("open")
  async toggleSheet(value: boolean): Promise<void> {
    onToggleOpenCloseComponent(this);
    if (value) {
      this.transitionEl?.classList.add(CSS.openingIdle);
      this.openSheet();
    } else {
      this.transitionEl?.classList.add(CSS.closingIdle);
      this.close();
    }
  }

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteSheetOpen", this.openEnd);
  };

  /** Open the sheet */
  private openSheet() {
    this.el.addEventListener("calciteSheetOpen", this.openEnd);
    this.open = true;
    this.isOpen = true;
    if (!this.slottedInShell) {
      this.initialOverflowCSS = document.documentElement.style.overflow;
      // use an inline style instead of a utility class to avoid global class declarations.
      document.documentElement.style.setProperty("overflow", "hidden");
    }
  }

  handleOutsideClose = (): void => {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.close();
  };

  /**
   * Close the sheet, first running the `beforeClose` method
   *
   * @returns {Promise<void>}
   */
  close = async (): Promise<void> => {
    return this.beforeClose(this.el).then(() => {
      this.open = false;
      this.isOpen = false;
      this.removeOverflowHiddenClass();
    });
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", this.initialOverflowCSS);
  }

  private handleMutationObserver = (): void => {
    this.updateFocusTrapElements();
  };
}
