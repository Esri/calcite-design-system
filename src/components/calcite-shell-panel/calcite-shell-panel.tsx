import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Watch,
  h,
  VNode,
  State
} from "@stencil/core";
import { CSS, SLOTS, TEXT } from "./resources";
import { Position, Scale } from "../interfaces";
import { getSlotted } from "../../utils/dom";
import { getKey } from "../../utils/key";
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

  /** Text for resize separator.
   * @default "Resize"
   */
  @Prop() intlResize = TEXT.resize;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  disconnectedCallback(): void {
    this.disconnectSeparator();
  }

  componentDidLoad(): void {
    this.setMinAndMax();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellPanelElement;

  @State() contentWidth = 0;

  @State() contentOffset = 0;

  @State() initialContentWidth = 0;

  @Watch("initialContentWidth")
  @Watch("contentOffset")
  contentWidthHandler(): void {
    const { initialContentWidth, contentOffset, min, max } = this;

    if (!initialContentWidth || !contentOffset) {
      return;
    }

    const rounded = Math.round(
      this.position === "end"
        ? initialContentWidth - contentOffset
        : initialContentWidth + contentOffset
    );

    this.contentWidth =
      typeof max === "number" && typeof min === "number" ? clamp(rounded, min, max) : rounded;
  }

  initialClientX = 0;

  contentEl: HTMLDivElement;

  separatorEl: HTMLDivElement;

  max: number = null;

  min: number = null;

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
    const { collapsed, detached, position, contentWidth, max, min, intlResize } = this;

    const contentNode = (
      <div
        class={{ [CSS.content]: true, [CSS.contentDetached]: detached }}
        hidden={collapsed}
        ref={this.storeContentEl}
        style={contentWidth ? { width: `${contentWidth}px` } : null}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
      </div>
    );

    const separatorNode = (
      <div
        aria-label={intlResize}
        aria-orientation="vertical"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={contentWidth}
        class={CSS.separator}
        onKeyDown={this.separatorKeyDown}
        ref={this.connectSeparator}
        role="separator"
        tabIndex={0}
        touch-action="none"
      />
    );

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

  setMinAndMax = (): void => {
    const { contentEl } = this;

    if (!contentEl) {
      return;
    }

    const computedStyle = getComputedStyle(contentEl);

    if (!computedStyle) {
      return;
    }

    const max = parseInt(computedStyle.getPropertyValue("max-width"), 0);
    const min = parseInt(computedStyle.getPropertyValue("min-width"), 0);

    if (typeof max === "number" && !isNaN(max)) {
      this.max = max;
    }

    if (typeof min === "number" && !isNaN(min)) {
      this.min = min;
    }
  };

  storeContentEl = (contentEl: HTMLDivElement): void => {
    this.contentEl = contentEl;
  };

  getKeyvalue = (event: KeyboardEvent): number => {
    const key = getKey(event.key);
    const { contentOffset, step, stepMultiplier, min, max } = this;
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
      event.stopPropagation();
    }

    const increaseKeys = key === "ArrowDown" || key === "ArrowRight";

    if (increaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return contentOffset + stepValue;
    }

    const decreaseKeys = key === "ArrowUp" || key === "ArrowLeft";

    if (decreaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return contentOffset - stepValue;
    }

    if (typeof min === "number" && key === "Home") {
      return min;
    }

    if (typeof max === "number" && key === "End") {
      return max;
    }

    if (key === "PageDown") {
      return contentOffset + multipliedStep;
    }

    if (key === "PageUp") {
      return contentOffset - multipliedStep;
    }

    return null;
  };

  separatorKeyDown = (event: KeyboardEvent): void => {
    const contentOffset = this.getKeyvalue(event);
    this.resetContentSizing();

    if (typeof contentOffset === "number") {
      this.setInitialContentWidth();
      this.contentOffset = contentOffset;
    }
  };

  separatorPointerMove = (event: PointerEvent): void => {
    event.preventDefault();
    this.contentOffset = event.clientX - this.initialClientX;
  };

  resetContentSizing = (): void => {
    this.contentOffset = 0;
    this.initialContentWidth = 0;
  };

  separatorPointerUp = (event: PointerEvent): void => {
    event.preventDefault();
    this.resetContentSizing();
    document.removeEventListener("pointerup", this.separatorPointerUp);
    document.removeEventListener("pointermove", this.separatorPointerMove);
  };

  setInitialContentWidth = (): void => {
    this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
  };

  separatorPointerDown = (event: PointerEvent): void => {
    event.preventDefault();
    this.separatorEl && document.activeElement !== this.separatorEl && this.separatorEl.focus();

    this.resetContentSizing();
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
