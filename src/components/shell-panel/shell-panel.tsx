import { Component, Element, forceUpdate, h, Prop, State, VNode, Watch } from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { getElementDir, getSlotted, isPrimaryPointerButton } from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { clamp } from "../../utils/math";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Position, Scale } from "../interfaces";
import { ShellPanelMessages } from "./assets/shell-panel/t9n";
import { CSS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 */
@Component({
  tag: "calcite-shell-panel",
  styleUrl: "shell-panel.scss",
  shadow: true,
  assetsDirs: ["assets"]
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
   */
  @Prop({ reflect: true }) detached = false;

  /**
   * When `detached`, specifies the maximum height of the component.
   */
  @Prop({ reflect: true }) detachedHeightScale: Scale = "l";

  /**
   * Specifies the width of the component's content area.
   */

  @Prop({ reflect: true }) widthScale: Scale = "m";

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   */
  @Prop({ reflect: true }) position: Position;

  /**
   * When `true` and not `detached`, the component's content area is resizable.
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

  initialContentWidth: number = null;

  initialClientX: number = null;

  contentEl: HTMLDivElement;

  separatorEl: HTMLDivElement;

  contentWidthMax: number = null;

  contentWidthMin: number = null;

  step = 1;

  stepMultiplier = 10;

  @State() defaultMessages: ShellPanelMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader(): VNode {
    const { el } = this;

    const hasHeader = getSlotted(el, SLOTS.header);

    return hasHeader ? (
      <div class={CSS.contentHeader} key="header">
        <slot name={SLOTS.header} />
      </div>
    ) : null;
  }

  render(): VNode {
    const {
      collapsed,
      detached,
      position,
      initialContentWidth,
      contentWidth,
      contentWidthMax,
      contentWidthMin,
      resizable
    } = this;

    const allowResizing = !detached && resizable;

    const contentNode = (
      <div
        class={{ [CSS.content]: true, [CSS.contentDetached]: detached }}
        hidden={collapsed}
        key="content"
        style={allowResizing && contentWidth ? { width: `${contentWidth}px` } : null}
        // eslint-disable-next-line react/jsx-sort-props
        ref={this.storeContentEl}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
      </div>
    );

    const separatorNode = allowResizing ? (
      <div
        aria-label={this.messages.resize}
        aria-orientation="horizontal"
        aria-valuemax={contentWidthMax}
        aria-valuemin={contentWidthMin}
        aria-valuenow={contentWidth ?? initialContentWidth}
        class={CSS.separator}
        key="separator"
        onKeyDown={this.separatorKeyDown}
        role="separator"
        tabIndex={0}
        touch-action="none"
        // eslint-disable-next-line react/jsx-sort-props
        ref={this.connectSeparator}
      />
    ) : null;

    const actionBarNode = (
      <slot key="action-bar" name={SLOTS.actionBar} onSlotchange={this.handleActionBarSlotChange} />
    );

    const mainNodes = [actionBarNode, contentNode, separatorNode];

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

    forceUpdate(this);
  }

  storeContentEl = (contentEl: HTMLDivElement): void => {
    this.contentEl = contentEl;
  };

  getKeyAdjustedWidth = (event: KeyboardEvent): number | null => {
    const { key } = event;
    const {
      el,
      step,
      stepMultiplier,
      contentWidthMin,
      contentWidthMax,
      initialContentWidth,
      position
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
      "PageDown"
    ];

    if (MOVEMENT_KEYS.indexOf(key) > -1) {
      event.preventDefault();
    }

    const dir = getElementDir(el);

    const directionKeys = ["ArrowLeft", "ArrowRight"];
    const directionFactor = dir === "rtl" && directionKeys.includes(key) ? -1 : 1;

    const increaseKeys =
      key === "ArrowUp" ||
      (position === "end" ? key === directionKeys[0] : key === directionKeys[1]);

    if (increaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return initialContentWidth + directionFactor * stepValue;
    }

    const decreaseKeys =
      key === "ArrowDown" ||
      (position === "end" ? key === directionKeys[1] : key === directionKeys[0]);

    if (decreaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return initialContentWidth - directionFactor * stepValue;
    }

    if (typeof contentWidthMin === "number" && key === "Home") {
      return contentWidthMin;
    }

    if (typeof contentWidthMax === "number" && key === "End") {
      return contentWidthMax;
    }

    if (key === "PageDown") {
      return initialContentWidth - multipliedStep;
    }

    if (key === "PageUp") {
      return initialContentWidth + multipliedStep;
    }

    return null;
  };

  separatorKeyDown = (event: KeyboardEvent): void => {
    this.setInitialContentWidth();
    const width = this.getKeyAdjustedWidth(event);

    if (typeof width === "number") {
      this.setContentWidth(width);
    }
  };

  separatorPointerMove = (event: PointerEvent): void => {
    event.preventDefault();

    const { el, initialContentWidth, position, initialClientX } = this;
    const offset = event.clientX - initialClientX;
    const dir = getElementDir(el);

    const adjustmentDirection = dir === "rtl" ? -1 : 1;
    const adjustedOffset =
      position === "end" ? -adjustmentDirection * offset : adjustmentDirection * offset;
    const width = initialContentWidth + adjustedOffset;

    this.setContentWidth(width);
  };

  separatorPointerUp = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    event.preventDefault();
    document.removeEventListener("pointerup", this.separatorPointerUp);
    document.removeEventListener("pointermove", this.separatorPointerMove);
  };

  setInitialContentWidth = (): void => {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  };

  separatorPointerDown = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    event.preventDefault();
    const { separatorEl } = this;

    separatorEl && document.activeElement !== separatorEl && separatorEl.focus();

    this.setInitialContentWidth();
    this.initialClientX = event.clientX;

    document.addEventListener("pointerup", this.separatorPointerUp);
    document.addEventListener("pointermove", this.separatorPointerMove);
  };

  connectSeparator = (separatorEl: HTMLDivElement): void => {
    this.disconnectSeparator();
    this.separatorEl = separatorEl;
    separatorEl.addEventListener("pointerdown", this.separatorPointerDown);
  };

  disconnectSeparator = (): void => {
    this.separatorEl?.removeEventListener("pointerdown", this.separatorPointerDown);
  };

  handleActionBarSlotChange = (event: Event): void => {
    const actionBars = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true
      })
      .filter((el) => el?.matches("calcite-action-bar")) as HTMLCalciteActionBarElement[];

    actionBars.forEach((actionBar) => (actionBar.layout = "vertical"));
  };
}
