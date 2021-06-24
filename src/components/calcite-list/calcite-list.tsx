import { Component, h, VNode } from "@stencil/core";
import { CSS } from "./resources";

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
      <div class={CSS.container}>
        <slot />
      </div>
    );
  }
}
