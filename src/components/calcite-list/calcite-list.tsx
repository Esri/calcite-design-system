import { Component, h, VNode } from "@stencil/core";

/**
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
