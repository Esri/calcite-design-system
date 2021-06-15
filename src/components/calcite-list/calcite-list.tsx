import { Component, h, VNode } from "@stencil/core";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 * @slot - todo document.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "calcite-list.scss",
  shadow: true
})
export class CalciteList {
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <div>
        <slot />
      </div>
    );
  }
}
