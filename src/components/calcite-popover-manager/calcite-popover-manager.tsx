import { Component, Host, h, Listen, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getDescribedByElement } from "../../utils/dom";

@Component({
  tag: "calcite-popover-manager",
})
export class CalcitePopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for popovers.
   */
  @Prop() selector = `[${POPOVER_REFERENCE}]`;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return <Host />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click", { capture: true }) toggle(event: Event) {
    const target = event.target as HTMLElement;

    const describedByElement =
      target && target.matches(this.selector) && getDescribedByElement(target);

    if (describedByElement) {
      (describedByElement as HTMLCalcitePopoverElement).toggle();
    }
  }
}
