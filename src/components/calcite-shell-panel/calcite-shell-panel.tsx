import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Watch,
  h,
  VNode,
  State,
  forceUpdate
} from "@stencil/core";
import { CSS, SLOTS, TEXT } from "./resources";
import { Position, Scale } from "../interfaces";
import { getSlotted, getElementStyleDir } from "../../utils/dom";
import { clamp } from "../../utils/math";

/**
 * @slot - A slot for adding content to the shell panel.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 */
@Component({
  tag: "calcite-shell-panel",
  styleUrl: "calcite-shell-panel.scss",
  shadow: true
})
export class CalciteShellPanel {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Hide the content panel.
   */
  @Prop({ reflect: true }) collapsed = false;

  @Watch("collapsed")
  watchHandler(): void {
    this.calciteShellPanelToggle.emit();
  }

  /**
   * This property makes the content area appear like a "floating" panel.
   */
  @Prop({ reflect: true }) detached = false;

  /**
   * Specifies the maxiumum height of the contents when detached.
   */
  @Prop({ reflect: true }) detachedHeightScale: Scale = "l";

  /**
   * This sets width of the content area.
   */

  @Prop({ reflect: true }) widthScale: Scale = "m";

  /**
   * Arranges the component depending on the elements 'dir' property.
   */
  @Prop({ reflect: true }) position: Position;

  /**
   * Accessible label for resize separator.
   * @default "Resize"
   */
  @Prop() intlResize = TEXT.resize;

  /**
   * This property makes the content area resizable if the calcite-shell-panel is not 'detached'.
   */
  @Prop({ reflect: true }) resizable = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  disconnectedCallback(): void {
    this.disconnectSeparator();
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

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when collapse has been toggled.
   */
  @Event() calciteShellPanelToggle: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader(): VNode {
    const { el } = this;

    const hasHeader = getSlotted(el, SLOTS.header);

    return hasHeader ? (
      <div class={CSS.contentHeader}>
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
      intlResize,
      resizable
    } = this;

    const allowResizing = !detached && resizable;

    const contentNode = (
      <div
        class={{ [CSS.content]: true, [CSS.contentDetached]: detached }}
        hidden={collapsed}
        ref={this.storeContentEl}
        style={allowResizing && contentWidth ? { width: `${contentWidth}px` } : null}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
      </div>
    );

    const separatorNode = allowResizing ? (
      <div
        aria-label={intlResize}
        aria-orientation="horizontal"
        aria-valuemax={contentWidthMax}
        aria-valuemin={contentWidthMin}
        aria-valuenow={contentWidth ?? initialContentWidth}
        class={CSS.separator}
        onKeyDown={this.separatorKeyDown}
        ref={this.connectSeparator}
        role="separator"
        tabIndex={0}
        touch-action="none"
      />
    ) : null;

    const actionBarNode = <slot name={SLOTS.actionBar} />;

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

    const dir = getElementStyleDir(el);

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
    const dir = getElementStyleDir(el);

    const adjustmentDirection = dir === "rtl" ? -1 : 1;
    const adjustedOffset =
      position === "end" ? -adjustmentDirection * offset : adjustmentDirection * offset;
    const width = initialContentWidth + adjustedOffset;

    this.setContentWidth(width);
  };

  separatorPointerUp = (event: PointerEvent): void => {
    event.preventDefault();
    document.removeEventListener("pointerup", this.separatorPointerUp);
    document.removeEventListener("pointermove", this.separatorPointerMove);
  };

  setInitialContentWidth = (): void => {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  };

  separatorPointerDown = (event: PointerEvent): void => {
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
}
