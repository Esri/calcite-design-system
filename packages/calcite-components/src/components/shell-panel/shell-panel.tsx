import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import {
  getElementDir,
  isPrimaryPointerButton,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { clamp } from "../../utils/math";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Layout, Position, Scale } from "../interfaces";
import { ShellPanelMessages } from "./assets/shell-panel/t9n";
import { CSS, SLOTS } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";
import { DisplayMode } from "./interfaces";

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 */
@Component({
  tag: "calcite-shell-panel",
  styleUrl: "shell-panel.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class ShellPanel implements ConditionalSlotComponent, LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, hides the component's content area.
   */
  @Prop({ reflect: true }) collapsed = false;

  /**
   * When `true`, the content area displays like a floating panel.
   *
   * @deprecated Use `displayMode` instead.
   */
  @Prop({ reflect: true }) detached = false;

  @Watch("detached")
  handleDetached(value: boolean): void {
    if (value) {
      this.displayMode = "float";
    } else if (this.displayMode === "float") {
      this.displayMode = "dock";
    }
  }

  /**
   * Specifies the display mode of the component, where:
   *
   * `"dock"` displays at full height adjacent to center content,
   *
   * `"overlay"` displays at full height on top of center content, and
   *
   * `"float"` does not display at full height with content separately detached from `calcite-action-bar` on top of center content.
   */
  @Prop({ reflect: true }) displayMode: DisplayMode = "dock";

  @Watch("displayMode")
  handleDisplayMode(value: DisplayMode): void {
    this.detached = value === "float";
  }

  /**
   * When `displayMode` is `float`, specifies the maximum height of the component.
   *
   * @deprecated Use `heightScale` instead.
   */
  @Prop({ reflect: true }) detachedHeightScale: Scale;

  @Watch("detachedHeightScale")
  handleDetachedHeightScale(value: Scale): void {
    this.heightScale = value;
  }

  /**
   * When `layout` is `horizontal`, specifies the maximum height of the component.
   */
  @Prop({ reflect: true }) heightScale: Scale;

  @Watch("heightScale")
  handleHeightScale(value: Scale): void {
    this.detachedHeightScale = value;
  }

  /**
   * When `layout` is `vertical`, specifies the width of the component.
   */

  @Prop({ reflect: true }) widthScale: Scale = "m";

  /**
   *  The direction of the component.
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical", Layout> = "vertical";

  @Watch("layout")
  layoutHandler(): void {
    this.setActionBarsLayout(this.actionBars);
  }

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   */
  @Prop({ reflect: true }) position: Position = "start";

  /**
   * When `true` and `displayMode` is not `float`, the component's content area is resizable.
   */
  @Prop({ reflect: true }) resizable = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ShellPanelMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ShellPanelMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    this.disconnectSeparator();
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  componentDidLoad(): void {
    this.updateAriaValues();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellPanelElement;

  @State() contentWidth: number = null;

  @State() contentHeight: number = null;

  initialContentWidth: number = null;

  initialContentHeight: number = null;

  initialClientX: number = null;

  initialClientY: number = null;

  contentEl: HTMLDivElement;

  separatorEl: HTMLDivElement;

  contentWidthMax: number = null;

  contentWidthMin: number = null;

  contentHeightMax: number = null;

  contentHeightMin: number = null;

  step = 1;

  stepMultiplier = 10;

  actionBars: HTMLCalciteActionBarElement[] = [];

  @State() defaultMessages: ShellPanelMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() hasHeader = false;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalShellPanelResizeStart: EventEmitter<void>;

  /**
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalShellPanelResizeEnd: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader(): VNode {
    return (
      <div class={CSS.contentHeader} hidden={!this.hasHeader} key="header">
        <slot name={SLOTS.header} onSlotchange={this.handleHeaderSlotChange} />
      </div>
    );
  }

  render(): VNode {
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

    const allowResizing = displayMode !== "float" && resizable;

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
          aria-label={this.messages.resize}
          aria-orientation={layout === "horizontal" ? "vertical" : "horizontal"}
          aria-valuemax={layout == "horizontal" ? contentHeightMax : contentWidthMax}
          aria-valuemin={layout == "horizontal" ? contentHeightMin : contentWidthMin}
          aria-valuenow={
            layout == "horizontal"
              ? contentHeight ?? initialContentHeight
              : contentWidth ?? initialContentWidth
          }
          class={CSS.separator}
          key="separator"
          onKeyDown={this.separatorKeyDown}
          role="separator"
          tabIndex={0}
          touch-action="none"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.connectSeparator}
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
          [CSS.contentFloat]: displayMode === "float",
          [CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
          [getAnimationDir()]: displayMode === "overlay",
        }}
        hidden={collapsed}
        key="content"
        style={style}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.storeContentEl}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
        {separatorNode}
      </div>
    );

    const actionBarNode = (
      <slot key="action-bar" name={SLOTS.actionBar} onSlotchange={this.handleActionBarSlotChange} />
    );

    const mainNodes = [actionBarNode, contentNode];

    if (position === "end") {
      mainNodes.reverse();
    }

    return <div class={{ [CSS.container]: true }}>{mainNodes}</div>;
  }

  // --------------------------------------------------------------------------
  //
  //  private Methods
  //
  // --------------------------------------------------------------------------

  setContentWidth(width: number): void {
    const { contentWidthMax, contentWidthMin } = this;

    const roundedWidth = Math.round(width);

    this.contentWidth =
      typeof contentWidthMax === "number" && typeof contentWidthMin === "number"
        ? clamp(roundedWidth, contentWidthMin, contentWidthMax)
        : roundedWidth;
  }

  updateAriaValues(): void {
    const { contentEl } = this;
    const computedStyle = contentEl && getComputedStyle(contentEl);

    if (!computedStyle) {
      return;
    }

    this.layout === "horizontal"
      ? this.updateHeights(computedStyle)
      : this.updateWidths(computedStyle);

    forceUpdate(this);
  }

  setContentHeight(height: number): void {
    const { contentHeightMax, contentHeightMin } = this;

    const roundedWidth = Math.round(height);

    this.contentHeight =
      typeof contentHeightMax === "number" && typeof contentHeightMin === "number"
        ? clamp(roundedWidth, contentHeightMin, contentHeightMax)
        : roundedWidth;
  }

  updateWidths(computedStyle: CSSStyleDeclaration): void {
    const max = parseInt(computedStyle.getPropertyValue("max-width"), 10);
    const min = parseInt(computedStyle.getPropertyValue("min-width"), 10);
    const valueNow = parseInt(computedStyle.getPropertyValue("width"), 10);

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

  updateHeights(computedStyle: CSSStyleDeclaration): void {
    const max = parseInt(computedStyle.getPropertyValue("max-height"), 10);
    const min = parseInt(computedStyle.getPropertyValue("min-height"), 10);
    const valueNow = parseInt(computedStyle.getPropertyValue("height"), 10);

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

  storeContentEl = (contentEl: HTMLDivElement): void => {
    this.contentEl = contentEl;
  };

  getKeyAdjustedSize = (event: KeyboardEvent): number | null => {
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
  };

  initialKeydownWidth = (event: KeyboardEvent): void => {
    this.setInitialContentWidth();
    const width = this.getKeyAdjustedSize(event);

    if (typeof width === "number") {
      this.setContentWidth(width);
    }
  };

  initialKeydownHeight = (event: KeyboardEvent): void => {
    this.setInitialContentHeight();
    const height = this.getKeyAdjustedSize(event);

    if (typeof height === "number") {
      this.setContentHeight(height);
    }
  };

  separatorKeyDown = (event: KeyboardEvent): void => {
    this.layout === "horizontal"
      ? this.initialKeydownHeight(event)
      : this.initialKeydownWidth(event);
  };

  separatorPointerMove = (event: PointerEvent): void => {
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

    layout === "horizontal"
      ? this.setContentHeight(initialContentHeight + adjustedOffset)
      : this.setContentWidth(initialContentWidth + adjustedOffset);
  };

  separatorPointerUp = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.calciteInternalShellPanelResizeEnd.emit();

    event.preventDefault();
    window.removeEventListener("pointerup", this.separatorPointerUp);
    window.removeEventListener("pointermove", this.separatorPointerMove);
  };

  setInitialContentHeight = (): void => {
    this.initialContentHeight = this.contentEl?.getBoundingClientRect().height;
  };

  setInitialContentWidth = (): void => {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  };

  separatorPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.calciteInternalShellPanelResizeStart.emit();

    event.preventDefault();
    const { separatorEl } = this;

    separatorEl && document.activeElement !== separatorEl && separatorEl.focus();

    if (this.layout === "horizontal") {
      this.setInitialContentHeight();
      this.initialClientY = event.clientY;
    } else {
      this.setInitialContentWidth();
      this.initialClientX = event.clientX;
    }

    window.addEventListener("pointerup", this.separatorPointerUp);
    window.addEventListener("pointermove", this.separatorPointerMove);
  };

  connectSeparator = (separatorEl: HTMLDivElement): void => {
    this.disconnectSeparator();
    this.separatorEl = separatorEl;
    separatorEl?.addEventListener("pointerdown", this.separatorPointerDown);
  };

  disconnectSeparator = (): void => {
    this.separatorEl?.removeEventListener("pointerdown", this.separatorPointerDown);
  };

  setActionBarsLayout = (actionBars: HTMLCalciteActionBarElement[]): void => {
    actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
  };

  handleActionBarSlotChange = (event: Event): void => {
    const actionBars = slotChangeGetAssignedElements(event).filter(
      (el) => el?.matches("calcite-action-bar"),
    ) as HTMLCalciteActionBarElement[];

    this.actionBars = actionBars;
    this.setActionBarsLayout(actionBars);
  };

  handleHeaderSlotChange = (event: Event): void => {
    this.hasHeader = slotChangeHasAssignedElement(event);
  };
}
