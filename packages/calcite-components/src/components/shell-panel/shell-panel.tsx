// @ts-strict-ignore
import interact from "interactjs";
import type { Interactable, ResizeEvent } from "@interactjs/types";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import {
  getElementDir,
  getStylePixelValue,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { clamp } from "../../utils/math";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, Layout, Position, Scale, Width } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import type { ActionBar } from "../action-bar/action-bar";
import { resizeStep, resizeShiftStep } from "../../utils/resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
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

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private resizeHandleEl: HTMLDivElement;

  private interaction: Interactable;

  private actionBars: ActionBar["el"][] = [];

  private contentEl: HTMLDivElement;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

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

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /**
   * Specifies the display mode of the component, where:
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
   * When `layout` is `horizontal`, specifies the maximum height of the component.
   *
   * @deprecated Use the `height` property instead.
   */
  @property({ reflect: true }) heightScale: Scale;

  /** The direction of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) position: Extract<"start" | "end", Position> = "start";

  /** When `true` and `displayMode` is not `float-content` or `float`, the component's content area is resizable. */
  @property({ reflect: true }) resizable = false;

  /** Specifies the height of the component. */
  @property({ reflect: true }) height: Height;

  /**
   * When `layout` is `vertical`, specifies the width of the component.
   *
   * @deprecated Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale = "m";

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  //#endregion

  //#region Events

  /** @private */
  calciteInternalShellPanelResizeEnd = createEvent({ cancelable: false });

  /** @private */
  calciteInternalShellPanelResizeStart = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.setActionBarsLayout(this.actionBars);
    }
  }

  override disconnectedCallback(): void {
    this.cleanupInteractions();
  }

  //#endregion

  //#region Private Methods

  private getContentElDOMRect(): DOMRect {
    return this.contentEl.getBoundingClientRect();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const { key, defaultPrevented, shiftKey } = event;
    const {
      position,
      layout,
      resizable,
      contentEl,
      el,
      resizeValues: { maxBlockSize, maxInlineSize, minBlockSize, minInlineSize },
    } = this;

    const arrowKeys =
      layout === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];

    const keys = [...arrowKeys, "Home", "End"];

    if (!resizable || !contentEl || defaultPrevented || !keys.includes(key)) {
      return;
    }

    const rect = this.getContentElDOMRect();
    const invertRTL = getElementDir(el) === "rtl" ? -1 : 1;
    const stepValue = shiftKey ? resizeShiftStep : resizeStep;

    switch (key) {
      case "ArrowUp":
        this.updateSize({
          size:
            rect.height + (layout === "horizontal" && position === "end" ? stepValue : -stepValue),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size:
            rect.height + (layout === "horizontal" && position === "end" ? -stepValue : stepValue),
          type: "blockSize",
        });
        event.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size:
            rect.width +
            (layout === "vertical" && position === "end" ? stepValue : -stepValue) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size:
            rect.width +
            (layout === "vertical" && position === "end" ? -stepValue : stepValue) * invertRTL,
          type: "inlineSize",
        });
        event.preventDefault();
        break;
      case "Home":
        this.updateSize({
          size: layout === "horizontal" ? minBlockSize : minInlineSize,
          type: layout === "horizontal" ? "blockSize" : "inlineSize",
        });
        event.preventDefault();
        break;
      case "End":
        this.updateSize({
          size: layout === "horizontal" ? maxBlockSize : maxInlineSize,
          type: layout === "horizontal" ? "blockSize" : "inlineSize",
        });
        event.preventDefault();
        break;
    }
  }

  private updateSize({
    type,
    size,
  }: {
    type: "inlineSize" | "blockSize";
    size: number | null;
  }): void {
    const { contentEl, resizeValues } = this;

    if (!contentEl) {
      return;
    }

    const resizeMin = type === "blockSize" ? "minBlockSize" : "minInlineSize";
    const resizeMax = type === "blockSize" ? "maxBlockSize" : "maxInlineSize";

    const clamped =
      resizeValues[resizeMin] && resizeValues[resizeMax]
        ? clamp(size, resizeValues[resizeMin], resizeValues[resizeMax])
        : size;

    const rounded = Math.round(clamped);

    this.resizeValues = {
      ...resizeValues,
      [type]: rounded,
    };

    contentEl.style[type] = size !== null ? `${rounded}px` : null;
  }

  private cleanupInteractions(): void {
    this.interaction?.unset();
    this.updateSize({ size: null, type: "inlineSize" });
    this.updateSize({ size: null, type: "blockSize" });
  }

  private async setupInteractions(): Promise<void> {
    this.cleanupInteractions();

    const { el, contentEl, resizable, position, collapsed, resizeHandleEl, layout } = this;

    if (!contentEl || collapsed || !resizable || !resizeHandleEl) {
      return;
    }

    await this.el.componentOnReady();

    const { inlineSize, minInlineSize, blockSize, minBlockSize, maxInlineSize, maxBlockSize } =
      window.getComputedStyle(contentEl);

    const values: ResizeValues = {
      inlineSize: getStylePixelValue(inlineSize),
      blockSize: getStylePixelValue(blockSize),
      minInlineSize: getStylePixelValue(minInlineSize),
      minBlockSize: getStylePixelValue(minBlockSize),
      maxInlineSize: getStylePixelValue(maxInlineSize) || window.innerWidth,
      maxBlockSize: getStylePixelValue(maxBlockSize) || window.innerHeight,
    };

    this.resizeValues = values;

    const rtl = getElementDir(el) === "rtl";

    this.interaction = interact(contentEl, { context: el.ownerDocument }).resizable({
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
        },
        move: ({ rect }: ResizeEvent) => {
          const isBlock = layout === "horizontal";

          this.updateSize({
            size: isBlock ? rect.height : rect.width,
            type: isBlock ? "blockSize" : "inlineSize",
          });
        },
      },
    });
  }

  private storeContentEl(contentEl: HTMLDivElement): void {
    this.contentEl = contentEl;
  }

  private setResizeHandleEl(el: HTMLDivElement): void {
    this.resizeHandleEl = el;
    this.setupInteractions();
  }

  private setActionBarsLayout(actionBars: ActionBar["el"][]): void {
    actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
  }

  private handleActionBarSlotChange(event: Event): void {
    const actionBars = slotChangeGetAssignedElements(event).filter((el): el is ActionBar["el"] =>
      el?.matches("calcite-action-bar"),
    );

    this.actionBars = actionBars;
    this.setActionBarsLayout(actionBars);
  }

  private handleHeaderSlotChange(event: Event): void {
    this.hasHeader = slotChangeHasAssignedElement(event);
  }

  private getResizeIcon(): string {
    const { layout } = this;

    return layout === "horizontal" ? "drag-resize-vertical" : "drag-resize-horizontal";
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

    const dir = getElementDir(this.el);

    const separatorNode =
      !collapsed && resizable ? (
        <div
          ariaLabel={this.messages.resize}
          ariaOrientation={layout === "horizontal" ? "vertical" : "horizontal"}
          ariaValueMax={
            layout == "horizontal" ? resizeValues.maxBlockSize : resizeValues.maxInlineSize
          }
          ariaValueMin={
            layout == "horizontal" ? resizeValues.minBlockSize : resizeValues.minInlineSize
          }
          ariaValueNow={layout == "horizontal" ? resizeValues.blockSize : resizeValues.inlineSize}
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
          ref={this.storeContentEl}
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
      <slot key="action-bar" name={SLOTS.actionBar} onSlotChange={this.handleActionBarSlotChange} />
    );

    const mainNodes = [actionBarNode, contentNode];

    if (position === "end") {
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
