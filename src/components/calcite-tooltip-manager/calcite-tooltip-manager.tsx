import { Component, Element, Host, h, Prop } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement } from "../../utils/dom";

@Component({
  tag: "calcite-tooltip-manager"
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
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipManagerElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    const { el } = this;

    el.addEventListener("mouseenter", this.show, true);
    el.addEventListener("mouseleave", this.hide, true);
    el.addEventListener("focus", this.show, true);
    el.addEventListener("blur", this.hide, true);
  }

  componentDidUnload() {
    const { el } = this;

    el.removeEventListener("mouseenter", this.show, true);
    el.removeEventListener("mouseleave", this.hide, true);
    el.removeEventListener("focus", this.show, true);
    el.removeEventListener("blur", this.hide, true);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  toggle = (event: Event, value = true): void => {
    const target = event.target as HTMLElement;

    const describedByElement =
      target && target.matches(this.selector) && getDescribedByElement(target);

    if (describedByElement) {
      (describedByElement as HTMLCalciteTooltipElement).open = value;
    }
  };

  show = (event: Event): void => {
    this.toggle(event, true);
  };

  hide = (event: Event): void => {
    this.toggle(event, false);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return <Host />;
  }
}
