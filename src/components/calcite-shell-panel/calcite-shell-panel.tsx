import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Watch,
  h,
  VNode,
  Fragment
} from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { Position, Scale } from "../interfaces";
import { getSlotted } from "../../utils/dom";

/**
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot - A slot for adding content to the shell panel.
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

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLCalciteShellPanelElement;

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
    const { collapsed, detached, position } = this;

    const contentNode = (
      <div class={{ [CSS.content]: true, [CSS.contentDetached]: detached }} hidden={collapsed}>
        {this.renderHeader()}
        <div class={CSS.contentBody}>
          <slot />
        </div>
      </div>
    );

    const actionBarNode = <slot name={SLOTS.actionBar} />;

    const mainNodes = [actionBarNode, contentNode];

    if (position === "end") {
      mainNodes.reverse();
    }

    return <Fragment>{mainNodes}</Fragment>;
  }
}
