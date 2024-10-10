import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { ensureId, focusFirstTabbable, getElementDir } from "../../utils/dom";
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
import { CSS, initialResizePosition } from "./resources";
import { DisplayMode, ResizePosition } from "./interfaces";

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
    deactivateFocusTrap(this);
    this.embedded = false;
  }

  render(): VNode {
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
          <calcite-scrim class={CSS.scrim} onClick={this.handleOutsideClose} />
          <div
            class={{
              [CSS.content]: true,
            }}
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
  //  Private Properties/ State
  //
  //--------------------------------------------------------------------------

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  focusTrap: FocusTrap;

  @Element() el: HTMLCalciteSheetElement;

  private interaction: Interactable;

  private resizePosition: ResizePosition = { ...initialResizePosition };

  private contentEl: HTMLDivElement;

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
    this.resizePosition = { ...initialResizePosition };
  }

  // todo: make util
  private isPixelValue(value: string): boolean {
    return value.indexOf("px") !== -1;
  }

  private setupInteractions(): void {
    this.cleanupInteractions();

    const { el, transitionEl, resizable, resizePosition } = this;

    if (!transitionEl || !this.open) {
      return;
    }

    // todo: resize handle
    // todo: position setup
    if (resizable) {
      this.interaction = interact(transitionEl, { context: el.ownerDocument });

      const { minInlineSize, minBlockSize, maxInlineSize, maxBlockSize } =
        window.getComputedStyle(transitionEl);

      this.interaction.resizable({
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: {
              width: this.isPixelValue(minInlineSize) ? parseInt(minInlineSize, 10) : 0,
              height: this.isPixelValue(minBlockSize) ? parseInt(minBlockSize, 10) : 0,
            },
            max: {
              width: this.isPixelValue(maxInlineSize)
                ? parseInt(maxInlineSize, 10)
                : window.innerWidth,
              height: this.isPixelValue(maxBlockSize)
                ? parseInt(maxBlockSize, 10)
                : window.innerHeight,
            },
          }),
          interact.modifiers.restrict({
            restriction: "parent",
          }),
        ],
        listeners: {
          move: ({ rect, deltaRect }: ResizeEvent) => {
            if (deltaRect) {
              resizePosition.top += deltaRect.top;
              resizePosition.right += deltaRect.right;
              resizePosition.bottom += deltaRect.bottom;
              resizePosition.left += deltaRect.left;
            }
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
