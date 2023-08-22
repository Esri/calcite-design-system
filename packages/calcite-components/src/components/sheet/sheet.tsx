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
import { DisplayMode, Position } from "./interfaces";

@Component({
  tag: "calcite-sheet",
  styleUrl: "sheet.scss",
  shadow: true,
})
export class Sheet implements OpenCloseComponent, FocusTrapComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   *  Passes a function to run before the component closes.
   *
   * @returns {Promise<void>}
   */
  @Prop() beforeClose: (el: HTMLCalciteSheetElement) => Promise<void>;

  /**
   * Specifies the display mode - `"float"` (content is separated detached),
   * or `"overlay"` (displays on top of center content).
   */
  @Prop({ reflect: true }) displayMode: DisplayMode = "overlay";

  /** When `true`, disables the default close on escape behavior. */
  @Prop({ reflect: true }) escapeDisabled = false;

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

  /** When `true`, displays and positions the component.  */
  @Prop({ mutable: true, reflect: true }) open = false;

  @Watch("open")
  async toggleSheet(value: boolean): Promise<void> {
    onToggleOpenCloseComponent(this);
    if (value) {
      this.transitionEl?.classList.add(CSS.openingIdle);
      this.openSheet();
    } else {
      this.transitionEl?.classList.add(CSS.closingIdle);
      this.closeSheet();
    }
  }

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) outsideCloseDisabled = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) position: Position = "inline-start";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
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
    connectFocusTrap(this);
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    deactivateFocusTrap(this);
    this.slottedInShell = false;
  }

  render(): VNode {
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
            [CSS.containerOpen]: this.opened,
            [CSS.slottedInShell]: this.slottedInShell,
          }}
        >
          <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
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

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  @Element() el: HTMLCalciteSheetElement;

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is .
   *
   * @internal.
   */
  @Prop({ mutable: true, reflect: true }) opened = false;

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop() slottedInShell: boolean;

  private contentId: string;

  private initialOverflowCSS: string;

  private ignoreOpenChange = false;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver()
  );

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keydown", { target: "window" })
  handleEscape(event: KeyboardEvent): void {
    if (this.open && !this.escapeDisabled && event.key === "Escape" && !event.defaultPrevented) {
      this.closeSheet();
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

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

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
    this.contentId = ensureId(el);
  };

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteSheetOpen", this.openEnd);
  };

  private openSheet() {
    if (this.ignoreOpenChange) {
      return;
    }

    this.el.addEventListener("calciteSheetOpen", this.openEnd);
    this.open = true;
    this.opened = true;
    if (!this.slottedInShell) {
      this.initialOverflowCSS = document.documentElement.style.overflow;
      // use an inline style instead of a utility class to avoid global class declarations.
      document.documentElement.style.setProperty("overflow", "hidden");
    }

    this.ignoreOpenChange = false;
  }

  private handleOutsideClose = (): void => {
    if (this.outsideCloseDisabled) {
      return;
    }

    this.closeSheet();
  };

  private closeSheet = async (): Promise<void> => {
    if (this.ignoreOpenChange) {
      return;
    }

    if (this.beforeClose) {
      await this.beforeClose(this.el);
    }

    this.ignoreOpenChange = true;
    this.open = false;
    this.opened = false;
    this.removeOverflowHiddenClass();
    this.ignoreOpenChange = false;
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", this.initialOverflowCSS);
  }

  private handleMutationObserver = (): void => {
    this.updateFocusTrapElements();
  };
}
