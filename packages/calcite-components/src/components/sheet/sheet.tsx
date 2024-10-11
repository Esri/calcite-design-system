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
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ensureId, focusFirstTabbable, getElementDir, isPixelValue } from "../../utils/dom";
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
import { LogicalFlowPosition, Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { CSS, sheetResizeStep } from "./resources";
import { DisplayMode } from "./interfaces";
import { SheetMessages } from "./assets/sheet/t9n";

@Component({
  tag: "calcite-sheet",
  styleUrl: "sheet.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Sheet
  implements
    T9nComponent,
    LocalizedComponent,
    OpenCloseComponent,
    FocusTrapComponent,
    LoadableComponent
{
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

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @internal
   */
  @Prop() embedded = false;

  /** When `true`, disables the default close on escape behavior. */
  @Prop({ reflect: true }) escapeDisabled = false;

  /**
   * When `position` is `"block-start"` or `"block-end"`, specifies the height of the component.
   */
  @Prop({ reflect: true }) heightScale: Scale = "m";

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

  /** When `true`, displays and positions the component.  */
  @Prop({ mutable: true, reflect: true }) open = false;

  @Watch("open")
  toggleSheet(value: boolean): void {
    if (this.ignoreOpenChange) {
      return;
    }

    if (value) {
      this.openSheet();
    } else {
      this.closeSheet();
    }
  }

  @Watch("opened")
  handleOpenedChange(): void {
    onToggleOpenCloseComponent(this);
  }

  /**
   * We use an internal property to handle styles for when a modal is actually opened, not just when the open attribute is applied. This is a property because we need to apply styles to the host element and to keep the styles present while beforeClose is .
   *
   * @internal.
   */
  @Prop({ mutable: true, reflect: true }) opened = false;

  /** When `true`, disables the closing of the component when clicked outside. */
  @Prop({ reflect: true }) outsideCloseDisabled = false;

  /** Determines where the component will be positioned. */
  @Prop({ reflect: true }) position: LogicalFlowPosition = "inline-start";

  /**
   * When `true`, the component is resizable.
   */
  @Prop({ reflect: true }) resizable = false;

  @Watch("open")
  @Watch("position")
  @Watch("resizable")
  handleInteractionChange(): void {
    this.setupInteractions();
  }

  @Watch("messages")
  @Watch("resizable")
  updateAssistiveText(): void {
    const { messages } = this;
    this.assistiveText =
      messages && this.resizable ? `${this.resizable ? messages.resizeEnabled : ""}` : null;
  }

  /**
   * When `position` is `"inline-start"` or `"inline-end"`, specifies the width of the component.
   */
  @Prop({ reflect: true }) widthScale: Scale = "m";

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
    connectFocusTrap(this, {
      focusTrapOptions: {
        // Scrim has it's own close handler, allow it to take over.
        clickOutsideDeactivates: false,
        escapeDeactivates: this.escapeDeactivates,
        onDeactivate: this.focusTrapDeactivates,
      },
    });
    this.setupInteractions();
  }

  disconnectedCallback(): void {
    this.removeOverflowHiddenClass();
    this.mutationObserver?.disconnect();
    disconnectLocalized(this);
    disconnectMessages(this);
    deactivateFocusTrap(this);
    this.embedded = false;
  }

  render(): VNode {
    const { assistiveText } = this;
    const dir = getElementDir(this.el);
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
            [CSS.containerEmbedded]: this.embedded,
            [CSS_UTILITY.rtl]: dir === "rtl",
          }}
          ref={this.setTransitionEl}
        >
          {assistiveText ? (
            <div aria-live="polite" class={CSS.assistiveText} key="assistive-text">
              {assistiveText}
            </div>
          ) : null}
          <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
          <div
            class={{
              [CSS.content]: true,
            }}
            onKeyDown={this.handleKeyDown}
            ref={this.setContentEl}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Properties / State
  //
  //--------------------------------------------------------------------------

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  @Element() el: HTMLCalciteSheetElement;

  @State() assistiveText: string | null = null;

  @State() defaultMessages: SheetMessages;

  private contentEl: HTMLDivElement;

  private interaction: Interactable;

  private contentId: string;

  private initialOverflowCSS: string;

  private ignoreOpenChange = false;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.handleMutationObserver(),
  );

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
   * Sets focus on the component's "close" button - the first focusable item.
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

  private getContentElDOMRect(): DOMRect {
    return this.contentEl.getBoundingClientRect();
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    const { key, defaultPrevented } = event;
    const { position, resizable, contentEl, el } = this;

    const keys =
      position === "block-end" || position === "block-start"
        ? ["ArrowUp", "ArrowDown"]
        : ["ArrowLeft", "ArrowRight"];

    if (!resizable || !contentEl || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentElDOMRect();
    const invertRTL = getElementDir(el) === "rtl" ? -1 : 1;

    switch (key) {
      case "ArrowUp":
        this.updateSize({
          size: rect.height + (position === "block-end" ? sheetResizeStep : -sheetResizeStep),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size: rect.height + (position === "block-end" ? -sheetResizeStep : sheetResizeStep),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size:
            rect.width +
            (position === "inline-end" ? sheetResizeStep : -sheetResizeStep) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size:
            rect.width +
            (position === "inline-end" ? -sheetResizeStep : sheetResizeStep) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
    }
  };

  private updateSize({
    type,
    size,
  }: {
    type: "inlineSize" | "blockSize";
    size: number | null;
  }): void {
    const { contentEl } = this;

    if (!contentEl) {
      return;
    }

    contentEl.style[type] = size !== null ? `${Math.round(size)}px` : null;
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
    this.updateSize({ size: null, type: "inlineSize" });
    this.updateSize({ size: null, type: "blockSize" });
  }

  private setupInteractions(): void {
    this.cleanupInteractions();

    const { el, contentEl, resizable, position } = this;

    if (!contentEl || !this.open) {
      return;
    }

    if (resizable) {
      this.interaction = interact(contentEl, { context: el.ownerDocument });

      const { minInlineSize, minBlockSize, maxInlineSize, maxBlockSize } =
        window.getComputedStyle(contentEl);

      const rtl = getElementDir(el) === "rtl";

      this.interaction.resizable({
        edges: {
          top: position === "block-end",
          right: position === (rtl ? "inline-end" : "inline-start"),
          bottom: position === "block-start",
          left: position === (rtl ? "inline-start" : "inline-end"),
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: {
              width: isPixelValue(minInlineSize) ? parseInt(minInlineSize, 10) : 0,
              height: isPixelValue(minBlockSize) ? parseInt(minBlockSize, 10) : 0,
            },
            max: {
              width: isPixelValue(maxInlineSize) ? parseInt(maxInlineSize, 10) : window.innerWidth,
              height: isPixelValue(maxBlockSize) ? parseInt(maxBlockSize, 10) : window.innerHeight,
            },
          }),
        ],
        listeners: {
          move: ({ rect }: ResizeEvent) => {
            this.updateSize({ size: rect.width, type: "inlineSize" });
            this.updateSize({ size: rect.height, type: "blockSize" });
          },
        },
      });
    }
  }

  onBeforeOpen(): void {
    this.calciteSheetBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteSheetOpen.emit();
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.calciteSheetBeforeClose.emit();
  }

  onClose(): void {
    this.calciteSheetClose.emit();
    deactivateFocusTrap(this);
  }

  private setContentEl = (el: HTMLDivElement): void => {
    this.contentEl = el;
    this.contentId = ensureId(el);
    this.setupInteractions();
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  private openEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calciteSheetOpen", this.openEnd);
  };

  private openSheet(): void {
    this.el.addEventListener("calciteSheetOpen", this.openEnd);
    this.opened = true;
    if (!this.embedded) {
      this.initialOverflowCSS = document.documentElement.style.overflow;
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

  private closeSheet = async (): Promise<void> => {
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

    this.opened = false;
    this.removeOverflowHiddenClass();
  };

  private removeOverflowHiddenClass(): void {
    document.documentElement.style.setProperty("overflow", this.initialOverflowCSS);
  }

  private handleMutationObserver(): void {
    this.updateFocusTrapElements();
  }

  private escapeDeactivates = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.escapeDisabled) {
      return false;
    }
    event.preventDefault();
    return true;
  };

  private focusTrapDeactivates = (): void => {
    this.open = false;
  };
}
