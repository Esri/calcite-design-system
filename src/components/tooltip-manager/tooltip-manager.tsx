import { Component, h, Prop, VNode } from "@stencil/core";
/**
 * @slot - A slot for adding elements that reference a 'calcite-tooltip' by the 'selector' property.
 * @deprecated No longer required for tooltip usage.
 */
@Component({
  tag: "calcite-tooltip-manager",
  styleUrl: "tooltip-manager.scss",
  shadow: true
})
export class TooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip.
   * @default `[data-calcite-tooltip-reference]`
   */
  @Prop() selector = "[data-calcite-tooltip-reference]";

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <slot />;
  }
}
