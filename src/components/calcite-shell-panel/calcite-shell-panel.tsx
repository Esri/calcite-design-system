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
import { CSS, SLOTS } from "./resources";
import { Position, Scale } from "../interfaces";
import { getSlotted } from "../../utils/dom";
import { getKey } from "../../utils/key";

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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  disconnectedCallback(): void {
    this.disconnectSeparator();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellPanelElement;

  @State() value: number;

  contentEl: HTMLDivElement;

  separatorEl: HTMLDivElement;

  max = 1000; // todo

  min = 50; // todo

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
    const { collapsed, detached, position, value } = this;

    const contentNode = (
      <div
        class={{ [CSS.content]: true, [CSS.contentDetached]: detached }}
        hidden={collapsed}
        ref={(contentEl) => (this.contentEl = contentEl)}
        style={{ width: `${value}px;` }}
      >
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
      </div>
    );

    const separatorNode = (
      <div
        aria-label="todo"
        aria-orientation="vertical"
        aria-valuemax={this.max}
        aria-valuemin={this.min}
        aria-valuenow={this.value}
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

  getKeyvalue = (event: KeyboardEvent): number => {
    const key = getKey(event.key);
    const { value, step, stepMultiplier, min, max } = this;
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

      return value + stepValue;
    }

    const decreaseKeys = key === "ArrowUp" || key === "ArrowLeft";

    if (decreaseKeys) {
      const stepValue = event.shiftKey ? multipliedStep : step;

      return value - stepValue;
    }

    if (key === "Home") {
      return min;
    }

    if (key === "End") {
      return max;
    }

    if (key === "PageDown") {
      return value + multipliedStep;
    }

    if (key === "PageUp") {
      return value - multipliedStep;
    }

    return null;
  };

  separatorKeyDown = (event: KeyboardEvent): void => {
    const value = this.getKeyvalue(event);

    if (typeof value === "number") {
      this.value = value;
    }
  };

  // private calculatePointerOffset = (event: PointerEvent): void => {
  //   const target = event.target as HTMLElement;
  //   const containerSize = target.clientHeight / 2;

  //   const rect = target.getBoundingClientRect();
  //   const offsetY = event.clientY - rect.top;

  //   this.pointerOffset = offsetY - containerSize;
  // };

  // todo: fix
  separatorPointerMove = (event: PointerEvent): void => {
    event.preventDefault();

    const { contentEl } = this;
    //const { clientY } = event;
    const { width } = contentEl.getBoundingClientRect();

    console.log(event);

    const value = width + event.offsetX;

    console.log(value);

    this.value = value;
  };

  private separatorPointerUp = (event: PointerEvent): void => {
    event.preventDefault();

    document.removeEventListener("pointerup", this.separatorPointerUp);
    document.removeEventListener("pointermove", this.separatorPointerMove);
  };

  separatorPointerDown = (event: PointerEvent): void => {
    event.preventDefault();
    this.separatorEl && document.activeElement !== this.separatorEl && this.separatorEl.focus();

    //this.calculatePointerOffset(event);
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
