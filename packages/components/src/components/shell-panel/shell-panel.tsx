// @ts-strict-ignore
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode, method } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import {
  getStylePixelValue,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, Layout, Position, Scale, Width } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { ariaValueFromSize } from "../../utils/aria";
import { useT9n } from "../../controllers/useT9n";
import { useSizeOverride } from "../../controllers/useSizeOverride";
import type { ActionBar } from "../action-bar/action-bar";
import { resizeStep, resizeShiftStep } from "../../utils/resources";
import { IconName } from "../icon/interfaces";
import { styles as animationStyles } from "../../styles/component/animation.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { DisplayMode, ResizeValues } from "./interfaces";
import { styles } from "./shell-panel.scss";

declare global {
  interface DeclareElements {
    "calcite-shell-panel": ShellPanel;
  }
}

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 */
export class ShellPanel extends LitElement {
  //#region Static Members

  static override styles = [styles, animationStyles];

  //#endregion

  //#region Private Properties

  private direction = useDirection();

  private resizeHandleEl: HTMLDivElement;

  private interaction: Interactable;

  private actionBars: ActionBar["el"][] = [];

  private actionBarContainerEl: HTMLDivElement;

  private actionBarResizeObserver = createObserver("resize", () => this.updateActionBarSize());

  private actionBarObserver: MutationObserver;

  private contentRef = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private sizeOverride = useSizeOverride({
    targetElement: this.contentRef,
    getBounds: () => ({
      inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
      block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize },
    }),
    onResize: (resizeValues) => {
      this.resizeValues = resizeValues;
    },
  });

  //#endregion

  //#region State Properties

  @state() resizeValues: ResizeValues = {
    inlineSize: null,
    blockSize: null,
    minInlineSize: null,
    minBlockSize: null,
    maxInlineSize: null,
    maxBlockSize: null,
  };

  @state() hasHeader = false;

  //#endregion

  //#region Public Properties

  /** Specifies the placement of the `calcite-action-bar` (when slotted). */
  @property({ reflect: true }) actionBarPosition?: Position;

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /**
   * Specifies the component's display mode, where:
   *
   * `"dock"` displays at full height adjacent to center content,
   *
   * `"overlay"` displays at full height on top of center content, and
   *
   * `"float"` [Deprecated] does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   *
   * `"float-content"` does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   *
   * `"float-all"` detaches the `calcite-panel` and `calcite-action-bar` on top of center content.
   */
  @property({ reflect: true }) displayMode: DisplayMode = "dock";

  /**
   * When `layout` is `horizontal`, specifies the component's maximum height.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale: Scale;

  /**
   * Specifies the component's direction.
   *
   * @deprecated in v4.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   *
   * @deprecated in v4.0.0, removal target v6.0.0 -  No longer necessary.
   */
  @property({ reflect: true }) position: Extract<"start" | "end", Position> = "start";

  /** When `true` and `displayMode` is `"dock"` or `"overlay"`, the component's content area is resizable. */
  @property({ reflect: true }) resizable = false;

  /** Specifies the component's height. */
  @property({ reflect: true }) height: Height;

  /**
   * When `layout` is `vertical`, specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 -  Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the component's width. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  //#endregion

  //#region Public Methods

  /**
   * Updates the component's size by setting its inline and/or block dimensions.
   *
   * Use this method to programmatically override the components's width (inline) and/or height (block).
   * Pass `null` to clear the override and revert to the default or CSS variable size.
   */
  @method()
  async updateSize(size: { inline?: number | null; block?: number | null }): Promise<void> {
    this.updateSizeInternal(size);
  }

  //#endregion

  //#region Events

  /** @private */
  calciteInternalShellPanelResizableChange = createEvent({ cancelable: false });

  /** @private */
  calciteInternalShellPanelResizeEnd = createEvent({ cancelable: false });

  /** @private */
  calciteInternalShellPanelResizeStart = createEvent({ cancelable: false });

  /** Fires when the component's content area is collapsed. */
  calciteShellPanelCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteShellPanelExpand = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.setActionBarsLayout(this.actionBars);
    }
    if (changes.has("actionBarPosition") && this.hasUpdated) {
      this.setActionBarsLayout(this.actionBars);
    }
    if (
      (changes.has("layout") || changes.has("position") || changes.has("resizable")) &&
      this.hasUpdated
    ) {
      this.setupInteractions();
    }
    if (changes.has("resizable") && this.hasUpdated) {
      this.calciteInternalShellPanelResizableChange.emit();
    }
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteShellPanelCollapse.emit();
      } else {
        this.calciteShellPanelExpand.emit();
      }
    }
  }

  override firstUpdated(): void {
    this.setupActionBarObserver();
  }

  override disconnectedCallback(): void {
    this.cleanupInteractions();
    this.actionBarResizeObserver?.disconnect();
    this.actionBarObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private getContentElDOMRect(): DOMRect {
    return this.contentRef.value.getBoundingClientRect();
  }

  /** Internal synchronous size-override update — calls the controller directly to avoid promise wrapping. */
  private updateSizeInternal(size: { inline?: number | null; block?: number | null }): void {
    if (!this.contentRef.value) {
      return;
    }
    this.sizeOverride.resize(size);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, defaultPrevented, shiftKey } = event;
    const {
      position,
      layout,
      resizable,
      contentRef,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      layout === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (!resizable || !contentRef.value || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentElDOMRect();
    const invertRTL = this.direction === "rtl" ? -1 : 1;
    const stepValue = shiftKey ? resizeShiftStep : resizeStep;

    switch (key) {
      case "ArrowUp":
        this.updateSizeInternal({
          block:
            rect.height + (layout === "horizontal" && position === "end" ? stepValue : -stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSizeInternal({
          block:
            rect.height + (layout === "horizontal" && position === "end" ? -stepValue : stepValue),
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSizeInternal({
          inline:
            rect.width +
            (layout === "vertical" && position === "end" ? stepValue : -stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSizeInternal({
          inline:
            rect.width +
            (layout === "vertical" && position === "end" ? -stepValue : stepValue) * invertRTL,
        });
        event.preventDefault();
        break;
      case "Home":
        this.updateSizeInternal(
          layout === "horizontal" ? { block: minBlockSize } : { inline: minInlineSize },
        );
        event.preventDefault();
        break;
      case "End":
        this.updateSizeInternal(
          layout === "horizontal" ? { block: maxBlockSize } : { inline: maxInlineSize },
        );
        event.preventDefault();
        break;
    }
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
  }

  private async setupInteractions(): Promise<void> {
    this.cleanupInteractions();

    const { el, contentRef, resizable, position, collapsed, resizeHandleEl, layout } = this;

    if (!contentRef.value || collapsed || !resizable || !resizeHandleEl) {
      return;
    }

    await this.el.componentOnReady();

    const { inlineSize, minInlineSize, blockSize, minBlockSize, maxInlineSize, maxBlockSize } =
      window.getComputedStyle(contentRef.value);

    const values: ResizeValues = {
      inlineSize: getStylePixelValue(inlineSize),
      blockSize: getStylePixelValue(blockSize),
      minInlineSize: getStylePixelValue(minInlineSize),
      minBlockSize: getStylePixelValue(minBlockSize),
      maxInlineSize: getStylePixelValue(maxInlineSize) || window.innerWidth,
      maxBlockSize: getStylePixelValue(maxBlockSize) || window.innerHeight,
    };

    this.resizeValues = values;

    const rtl = this.direction === "rtl";

    this.interaction = interact(contentRef.value, { context: el.ownerDocument }).resizable({
      edges: {
        top: position === "end" && layout === "horizontal" ? resizeHandleEl : false,
        right:
          position === (rtl ? "end" : "start") && layout === "vertical" ? resizeHandleEl : false,
        bottom: position === "start" && layout === "horizontal" ? resizeHandleEl : false,
        left:
          position === (rtl ? "start" : "end") && layout === "vertical" ? resizeHandleEl : false,
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: {
            width: values.minInlineSize,
            height: values.minBlockSize,
          },
          max: {
            width: values.maxInlineSize,
            height: values.maxBlockSize,
          },
        }),
      ],
      listeners: {
        resizestart: () => {
          this.calciteInternalShellPanelResizeStart.emit();
        },
        resizeend: () => {
          this.calciteInternalShellPanelResizeEnd.emit();
          this.actionBars.forEach((actionBar) => actionBar.overflowActions());
        },
        move: ({ rect }: ResizeEvent) => {
          const isBlock = layout === "horizontal";

          this.updateSize(isBlock ? { block: rect.height } : { inline: rect.width });
          this.actionBars.forEach((actionBar) => actionBar.overflowActions());
        },
      },
    });
  }

  private setResizeHandleEl(el: HTMLDivElement): void {
    this.resizeHandleEl = el;
    this.setupInteractions();
  }

  private setActionBarContainerEl(el: HTMLDivElement): void {
    this.actionBarContainerEl = el;
    if (el) {
      this.actionBarResizeObserver?.observe(el);
      this.updateActionBarSize();
    }
  }

  private updateActionBarSize(): void {
    if (!this.actionBarContainerEl) {
      return;
    }
    const { layout } = this;
    const rect = this.actionBarContainerEl.getBoundingClientRect();
    const size = layout === "horizontal" ? rect.height : rect.width;
    this.el.style.setProperty("--calcite-internal-shell-panel-action-bar-size", `${size}px`);
  }

  private setActionBarsLayout(actionBars: ActionBar["el"][]): void {
    actionBars.forEach((actionBar) => {
      if (this.actionBarPosition) {
        actionBar.layout =
          this.actionBarPosition === "top" || this.actionBarPosition === "bottom"
            ? "horizontal"
            : "vertical";
        return;
      }

      actionBar.layout = this.layout;
    });
  }

  private async handleActionBarSlotChange(event: Event): Promise<void> {
    const actionBars = slotChangeGetAssignedElements(event).filter((el): el is ActionBar["el"] =>
      el?.matches("calcite-action-bar"),
    );

    this.actionBars = actionBars;
    this.setActionBarsLayout(actionBars);

    await this.updateComplete;
    actionBars.forEach((actionBar) => actionBar.overflowActions());
  }

  private handleHeaderSlotChange(event: Event): void {
    this.hasHeader = slotChangeHasAssignedElement(event);
  }

  private getResizeIcon(): IconName {
    const { layout } = this;

    return layout === "horizontal" ? ICONS.dragVertical : ICONS.dragHorizontal;
  }

  private setupActionBarObserver(): void {
    const actionBar = this.el.querySelector('calcite-action-bar[slot="action-bar"]');

    if (!actionBar || !this.contentRef.value) {
      return;
    }

    this.actionBarObserver = new MutationObserver(() => {
      if (!this.contentRef.value) {
        return;
      }

      const isExpanded = actionBar.hasAttribute("expanded");
      if (isExpanded) {
        this.contentRef.value.style.setProperty("--calcite-internal-shell-panel-max-width", "100%");
      } else {
        this.contentRef.value.style.removeProperty("--calcite-internal-shell-panel-max-width");
      }
    });

    this.actionBarObserver.observe(actionBar, {
      attributes: true,
      attributeFilter: ["expanded"],
    });

    // Set initial state
    const isExpanded = actionBar.hasAttribute("expanded");
    if (isExpanded) {
      this.contentRef.value.style.setProperty("--calcite-internal-shell-panel-max-width", "100%");
    }
  }

  //#endregion

  //#region Rendering

  private renderHeader(): JsxNode {
    return (
      <div class={CSS.contentHeader} hidden={!this.hasHeader} key="header">
        <slot name={SLOTS.header} onSlotChange={this.handleHeaderSlotChange} />
      </div>
    );
  }

  override render(): JsxNode {
    const { collapsed, position, resizable, layout, displayMode, resizeValues } = this;

    const dir = this.direction;
    const isBlockPosition = layout === "horizontal";

    const separatorNode =
      !collapsed && resizable ? (
        <div
          ariaLabel={this.messages.resize}
          ariaOrientation={isBlockPosition ? "vertical" : "horizontal"}
          ariaValueMax={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.maxBlockSize,
            resizeValues.maxInlineSize,
          )}
          ariaValueMin={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.minBlockSize,
            resizeValues.minInlineSize,
          )}
          ariaValueNow={ariaValueFromSize(
            isBlockPosition ? "block" : "inline",
            resizeValues.blockSize,
            resizeValues.inlineSize,
          )}
          class={CSS.resizeHandle}
          key="resize-handle"
          onKeyDown={this.handleKeyDown}
          ref={this.setResizeHandleEl}
          role="separator"
          tabIndex={0}
          touch-action="none"
        >
          <div class={CSS.resizeHandleBar}>
            <calcite-icon icon={this.getResizeIcon()} scale="s" />
          </div>
        </div>
      ) : null;

    const getAnimationDir = (): string => {
      if (layout === "horizontal") {
        return position === "start"
          ? CSS_UTILITY.calciteAnimateInDown
          : CSS_UTILITY.calciteAnimateInUp;
      } else {
        const isStart =
          (dir === "ltr" && position === "end") || (dir === "rtl" && position === "start");
        return isStart ? CSS_UTILITY.calciteAnimateInLeft : CSS_UTILITY.calciteAnimateInRight;
      }
    };

    const contentNode = (
      <div class={CSS.contentContainer}>
        <div
          class={{
            [CSS_UTILITY.rtl]: dir === "rtl",
            [CSS.content]: true,
            [CSS.contentOverlay]: displayMode === "overlay",
            [CSS.floatContent]: displayMode === "float-content" || displayMode === "float",
            [CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
            [getAnimationDir()]: displayMode === "overlay",
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
            [getDimensionClass("height", this.height, this.heightScale)]: !!(
              this.height || this.heightScale
            ),
          }}
          hidden={collapsed}
          key="content"
          ref={this.contentRef}
        >
          {this.renderHeader()}
          <div class={CSS.contentBody}>
            <slot />
          </div>
          {separatorNode}
        </div>
      </div>
    );

    const actionBarNode = (
      <div
        class={CSS.actionBarContainer}
        key="action-bar-container"
        ref={this.setActionBarContainerEl}
      >
        <slot name={SLOTS.actionBar} onSlotChange={this.handleActionBarSlotChange} />
      </div>
    );

    const effectivePosition = this.actionBarPosition || position;
    const mainNodes = [actionBarNode, contentNode];

    if (effectivePosition === "end" || effectivePosition === "bottom") {
      mainNodes.reverse();
    }

    return (
      <div class={{ [CSS.container]: true, [CSS.floatAll]: displayMode === "float-all" }}>
        {mainNodes}
      </div>
    );
  }

  //#endregion
}
