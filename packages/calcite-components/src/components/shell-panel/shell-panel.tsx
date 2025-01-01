// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, state, JsxNode } from "@arcgis/lumina";
import {
  getElementDir,
  isPrimaryPointerButton,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { clamp } from "../../utils/math";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { Height, Layout, Position, Scale, Width } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import type { ActionBar } from "../action-bar/action-bar";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
import { DisplayMode } from "./interfaces";
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
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private actionBars: ActionBar["el"][] = [];

  private contentEl: HTMLDivElement;

  private contentHeightMax: number = null;

  private contentHeightMin: number = null;

  private contentWidthMax: number = null;

  private contentWidthMin: number = null;

  private initialClientX: number = null;

  private initialClientY: number = null;

  private initialContentHeight: number = null;

  private initialContentWidth: number = null;

  private separatorEl: HTMLDivElement;

  private separatorPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.calciteInternalShellPanelResizeStart.emit();

    event.preventDefault();
    const { separatorEl } = this;

    if (separatorEl && document.activeElement !== separatorEl) {
      separatorEl.focus();
    }

    if (this.layout === "horizontal") {
      this.setInitialContentHeight();
      this.initialClientY = event.clientY;
    } else {
      this.setInitialContentWidth();
      this.initialClientX = event.clientX;
    }

    window.addEventListener(
      "pointerup",
      this.separatorPointerUp,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.addEventListener(
      "pointermove",
      this.separatorPointerMove,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  };

  private separatorPointerMove = (event: PointerEvent): void => {
    event.preventDefault();

    const {
      el,
      layout,
      initialContentWidth,
      initialContentHeight,
      position,
      initialClientX,
      initialClientY,
    } = this;

    const offset =
      layout === "horizontal" ? event.clientY - initialClientY : event.clientX - initialClientX;

    const adjustmentDirection = layout === "vertical" && getElementDir(el) === "rtl" ? -1 : 1;

    const adjustedOffset =
      layout === "horizontal"
        ? position === "end"
          ? -adjustmentDirection * offset
          : adjustmentDirection * offset
        : position === "end"
          ? -adjustmentDirection * offset
          : adjustmentDirection * offset;

    if (layout === "horizontal") {
      this.setContentHeight(initialContentHeight + adjustedOffset);
    } else {
      this.setContentWidth(initialContentWidth + adjustedOffset);
    }
  };

  private separatorPointerUp = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.calciteInternalShellPanelResizeEnd.emit();

    event.preventDefault();
    window.removeEventListener(
      "pointerup",
      this.separatorPointerUp,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    window.removeEventListener(
      "pointermove",
      this.separatorPointerMove,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  };

  private step = 1;

  private stepMultiplier = 10;

  // #endregion

  // #region State Properties

  @state() contentHeight: number = null;

  @state() contentWidth: number = null;

  @state() hasHeader = false;

  // #endregion

  // #region Public Properties

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

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

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

  // #endregion

  // #region Events

  /** @private */
  calciteInternalShellPanelResizeEnd = createEvent({ cancelable: false });

  /** @private */
  calciteInternalShellPanelResizeStart = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.setActionBarsLayout(this.actionBars);
    }
  }

  loaded(): void {
    this.updateAriaValues();
  }

  override disconnectedCallback(): void {
    this.disconnectSeparator();
  }

  // #endregion

  // #region Private Methods

  private setContentWidth(width: number): void {
    const { contentWidthMax, contentWidthMin } = this;

    const roundedWidth = Math.round(width);

    this.contentWidth =
      typeof contentWidthMax === "number" && typeof contentWidthMin === "number"
        ? clamp(roundedWidth, contentWidthMin, contentWidthMax)
        : roundedWidth;
  }

  private updateAriaValues(): void {
    const { contentEl } = this;
    const computedStyle = contentEl && getComputedStyle(contentEl);

    if (!computedStyle) {
      return;
    }

    if (this.layout === "horizontal") {
      this.updateHeights(computedStyle);
    } else {
      this.updateWidths(computedStyle);
    }

    this.requestUpdate();
  }

  private setContentHeight(height: number): void {
    const { contentHeightMax, contentHeightMin } = this;

    const roundedHeight = Math.round(height);

    this.contentHeight =
      typeof contentHeightMax === "number" && typeof contentHeightMin === "number"
        ? clamp(roundedHeight, contentHeightMin, contentHeightMax)
        : roundedHeight;
  }

  private updateWidths(computedStyle: CSSStyleDeclaration): void {
    const max = parseInt(computedStyle.getPropertyValue("max-width"));
    const min = parseInt(computedStyle.getPropertyValue("min-width"));
    const valueNow = parseInt(computedStyle.getPropertyValue("width"));

    if (typeof valueNow === "number" && !isNaN(valueNow)) {
      this.initialContentWidth = valueNow;
    }

    if (typeof max === "number" && !isNaN(max)) {
      this.contentWidthMax = max;
    }

    if (typeof min === "number" && !isNaN(min)) {
      this.contentWidthMin = min;
    }
  }

  private updateHeights(computedStyle: CSSStyleDeclaration): void {
    const max = parseInt(computedStyle.getPropertyValue("max-height"));
    const min = parseInt(computedStyle.getPropertyValue("min-height"));
    const valueNow = parseInt(computedStyle.getPropertyValue("height"));

    if (typeof valueNow === "number" && !isNaN(valueNow)) {
      this.initialContentHeight = valueNow;
    }

    if (typeof max === "number" && !isNaN(max)) {
      this.contentHeightMax = max;
    }

    if (typeof min === "number" && !isNaN(min)) {
      this.contentHeightMin = min;
    }
  }

  private storeContentEl(contentEl: HTMLDivElement): void {
    this.contentEl = contentEl;
  }

  private getKeyAdjustedSize(event: KeyboardEvent): number | null {
    const { key } = event;
    const {
      el,
      step,
      stepMultiplier,
      layout,
      contentWidthMin,
      contentWidthMax,
      initialContentWidth,
      initialContentHeight,
      contentHeightMin,
      contentHeightMax,
      position,
    } = this;
    const multipliedStep = step * stepMultiplier;

    const MOVEMENT_KEYS = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "PageUp",
      "PageDown",
    ];

    if (MOVEMENT_KEYS.indexOf(key) > -1) {
      event.preventDefault();
    }

    const dir = getElementDir(el);

    const horizontalKeys = ["ArrowLeft", "ArrowRight"];
    const verticalKeys = ["ArrowDown", "ArrowUp"];
    const directionFactor = dir === "rtl" && horizontalKeys.includes(key) ? -1 : 1;

    const increaseKeys =
      layout === "horizontal"
        ? position === "end"
          ? key === verticalKeys[1] || key === horizontalKeys[0]
          : key === verticalKeys[0] || key === horizontalKeys[1]
        : key === verticalKeys[1] ||
          (position === "end" ? key === horizontalKeys[0] : key === horizontalKeys[1]);

    if (increaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return layout === "horizontal"
        ? initialContentHeight + directionFactor * stepValue
        : initialContentWidth + directionFactor * stepValue;
    }

    const decreaseKeys =
      layout === "horizontal"
        ? position === "end"
          ? key === verticalKeys[0] || key === horizontalKeys[0]
          : key === verticalKeys[1] || key === horizontalKeys[1]
        : key === verticalKeys[0] ||
          (position === "end" ? key === horizontalKeys[1] : key === horizontalKeys[0]);

    if (decreaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return layout === "horizontal"
        ? initialContentHeight - directionFactor * stepValue
        : initialContentWidth - directionFactor * stepValue;
    }

    if (key === "Home" && layout === "horizontal" && typeof contentHeightMin === "number") {
      return contentHeightMin;
    }

    if (key === "Home" && layout === "vertical" && typeof contentWidthMin === "number") {
      return contentWidthMin;
    }

    if (key === "End" && layout === "horizontal" && typeof contentHeightMax === "number") {
      return contentHeightMax;
    }

    if (key === "End" && layout === "vertical" && typeof contentWidthMax === "number") {
      return contentWidthMax;
    }

    if (key === "PageDown") {
      return layout === "horizontal"
        ? initialContentHeight - multipliedStep
        : initialContentWidth - multipliedStep;
    }

    if (key === "PageUp") {
      return layout === "horizontal"
        ? initialContentHeight + multipliedStep
        : initialContentWidth + multipliedStep;
    }

    return null;
  }

  private initialKeydownWidth(event: KeyboardEvent): void {
    this.setInitialContentWidth();
    const width = this.getKeyAdjustedSize(event);

    if (typeof width === "number") {
      this.setContentWidth(width);
    }
  }

  private initialKeydownHeight(event: KeyboardEvent): void {
    this.setInitialContentHeight();
    const height = this.getKeyAdjustedSize(event);

    if (typeof height === "number") {
      this.setContentHeight(height);
    }
  }

  private separatorKeyDown(event: KeyboardEvent): void {
    if (this.layout === "horizontal") {
      this.initialKeydownHeight(event);
    } else {
      this.initialKeydownWidth(event);
    }
  }

  private setInitialContentHeight(): void {
    this.initialContentHeight = this.contentEl?.getBoundingClientRect().height;
  }

  private setInitialContentWidth(): void {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  }

  private connectSeparator(separatorEl: HTMLDivElement): void {
    this.disconnectSeparator();
    this.separatorEl = separatorEl;
    separatorEl?.addEventListener(
      "pointerdown",
      this.separatorPointerDown,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  }

  private disconnectSeparator(): void {
    this.separatorEl?.removeEventListener(
      "pointerdown",
      this.separatorPointerDown,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
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

  // #endregion

  // #region Rendering

  private renderHeader(): JsxNode {
    return (
      <div class={CSS.contentHeader} hidden={!this.hasHeader} key="header">
        <slot name={SLOTS.header} onSlotChange={this.handleHeaderSlotChange} />
      </div>
    );
  }

  override render(): JsxNode {
    const {
      collapsed,
      position,
      initialContentWidth,
      initialContentHeight,
      contentWidth,
      contentWidthMax,
      contentWidthMin,
      contentHeight,
      contentHeightMax,
      contentHeightMin,
      resizable,
      layout,
      displayMode,
    } = this;

    const dir = getElementDir(this.el);

    const allowResizing = displayMode !== "float-content" && displayMode !== "float" && resizable;

    const style = allowResizing
      ? layout === "horizontal"
        ? contentHeight
          ? { height: `${contentHeight}px` }
          : null
        : contentWidth
          ? { width: `${contentWidth}px` }
          : null
      : null;

    const separatorNode =
      !collapsed && allowResizing ? (
        <div
          ariaLabel={this.messages.resize}
          ariaOrientation={layout === "horizontal" ? "vertical" : "horizontal"}
          ariaValueMax={layout == "horizontal" ? contentHeightMax : contentWidthMax}
          ariaValueMin={layout == "horizontal" ? contentHeightMin : contentWidthMin}
          ariaValueNow={
            layout == "horizontal"
              ? (contentHeight ?? initialContentHeight)
              : (contentWidth ?? initialContentWidth)
          }
          class={CSS.separator}
          key="separator"
          onKeyDown={this.separatorKeyDown}
          ref={this.connectSeparator}
          role="separator"
          tabIndex={0}
          touch-action="none"
        />
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
        style={style}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
        {separatorNode}
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

  // #endregion
}
