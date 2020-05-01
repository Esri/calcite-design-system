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

  /**
   * Automatically close popovers when clicking outside of them.
   */
  @Prop({ reflect: true }) autoClose?: boolean;

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

  @Listen("click", { target: "window", capture: true }) closeOpenPopovers(
    event: Event
  ) {
    if (!this.autoClose) {
      return;
    }

    const target = event.target as HTMLElement;
    const CALCITE_POPOVER_TAGNAME = "calcite-popover";

    const blacklistElements =
      (target && target.matches(this.selector)) ||
      target.closest(CALCITE_POPOVER_TAGNAME);

    if (blacklistElements) {
      return;
    }

    document.body
      .querySelectorAll(CALCITE_POPOVER_TAGNAME)
      .forEach((popover) => (popover.open = false));
  }
}
