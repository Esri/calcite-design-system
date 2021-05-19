import { Component, Element, Prop, h, VNode, Fragment } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { Position, Scale } from "../interfaces";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";

/**
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot - A slot for adding content to the shell panel.
 */
@Component({
  tag: "calcite-shell-center-row",
  styleUrl: "calcite-shell-center-row.scss",
  shadow: true
})
export class CalciteShellCenterRow {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * This property makes the content area appear like a "floating" panel.
   */
  @Prop({ reflect: true }) detached = false;

  /**
   * Specifies the maxiumum height of the row.
   */
  @Prop({ reflect: true }) heightScale: Scale = "s";

  /**
   * Arranges the component depending on the elements 'dir' property.
   */
  @Prop({ reflect: true }) position: Position = "end";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellCenterRowElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";

    const contentNode = (
      <div class={{ [CSS.content]: true, [CSS_UTILITY.rtl]: rtl }}>
        <slot />
      </div>
    );

    const actionBar = getSlotted<HTMLCalciteActionBarElement>(el, SLOTS.actionBar);

    const actionBarNode = actionBar ? (
      <div class={{ [CSS.actionBarContainer]: true, [CSS_UTILITY.rtl]: rtl }}>
        <slot name={SLOTS.actionBar} />
      </div>
    ) : null;

    const children: VNode[] = [actionBarNode, contentNode];

    if (actionBar?.position === "end") {
      children.reverse();
    }

    return <Fragment>{children}</Fragment>;
  }
}
