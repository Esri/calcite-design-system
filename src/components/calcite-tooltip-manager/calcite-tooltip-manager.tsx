import { Component, Host, h, Listen, Prop } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement } from "../../utils/dom";

@Component({
  tag: "calcite-tooltip-manager",
})
export class CalciteTooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for tooltips.
   */
  @Prop() selector = `[${TOOLTIP_REFERENCE}]`;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  toggle = (event: Event, value = true): void => {
    const target = event.target as HTMLElement;
    const { selector } = this;

    const describedByElement = getDescribedByElement(target.closest(selector));

    if (describedByElement) {
      (describedByElement as HTMLCalciteTooltipElement).open = value;
    }
  };

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

  @Listen("mouseenter", { capture: true }) mouseEnterShow(event: Event) {
    this.toggle(event, true);
  }

  @Listen("mouseleave", { capture: true }) mouseLeaveHide(event: Event) {
    this.toggle(event, false);
  }

  @Listen("focus", { capture: true }) focusShow(event: Event) {
    this.toggle(event, true);
  }

  @Listen("blur", { capture: true }) blurHide(event: Event) {
    this.toggle(event, false);
  }
}
