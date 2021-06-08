import { Component, h, Prop, VNode } from "@stencil/core";

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
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * @todo document.
   */
  @Prop({ reflect: true }) selectable = false;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <ul>
        <slot />
      </ul>
    );
  }
}
