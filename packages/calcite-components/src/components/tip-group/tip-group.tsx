import { Component, h, Prop, VNode } from "@stencil/core";

/**
 * @slot - A slot for adding `calcite-tip`s.
 */
@Component({
  tag: "calcite-tip-group",
  styleUrl: "tip-group.scss",
  shadow: true,
})
export class TipGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * The component header text for all nested `calcite-tip`s.
   *
   */
  @Prop() groupTitle: string;

  render(): VNode {
    return <slot />;
  }
}
