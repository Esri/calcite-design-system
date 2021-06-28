import { Component, h, VNode, Host } from "@stencil/core";
import { CSS } from "./resources";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 * @slot - A slot for adding `calcite-list-item` elements.
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
      <Host role="list">
        <div class={CSS.container}>
          <slot />
        </div>
      </Host>
    );
  }
}
