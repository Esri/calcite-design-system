import { Component, h, Prop, VNode } from "@stencil/core";

/**
 * @slot - A slot for adding elements that reference a 'calcite-popover' by the 'selector' property.
 * @deprecated No longer required for popover usage.
 */
@Component({
  tag: "calcite-popover-manager",
  styleUrl: "popover-manager.scss",
  shadow: true
})
export class PopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for popovers. Reference elements will be identified by this selector in order to open their associated popover.
   * @default `[data-calcite-popover-reference]`
   */
  @Prop() selector = "[data-calcite-popover-reference]";

  /**
   * Automatically closes any currently open popovers when clicking outside of a popover.
   */
  @Prop({ reflect: true }) autoClose = false;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <slot />;
  }
}
