import { Component, Element, Host, h, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getDescribedByElement } from "../../utils/dom";

@Component({
  tag: "calcite-popover-manager"
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
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverManagerElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    const { el } = this;

    el.addEventListener("click", this.toggle, true);
  }

  componentDidUnload() {
    const { el } = this;

    el.removeEventListener("click", this.toggle, true);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  toggle = (event: Event): void => {
    const target = event.target as HTMLElement;

    const describedByElement =
      target && target.matches(this.selector) && getDescribedByElement(target);

    if (describedByElement) {
      (describedByElement as HTMLCalcitePopoverElement).toggle();
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
}
