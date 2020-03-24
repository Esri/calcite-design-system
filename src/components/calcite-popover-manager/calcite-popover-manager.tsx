import { Component, Element, Host, h, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";

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

  @Element() el: HTMLCalciteTooltipManagerElement;

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

  getPopover = (element: HTMLElement): HTMLCalcitePopoverElement | null => {
    if (!element.matches(this.selector)) {
      return null;
    }

    const id = element.getAttribute("aria-describedby");

    if (!id) {
      return null;
    }

    return (document.getElementById(id) as HTMLCalcitePopoverElement) || null;
  };

  toggle = (event: Event): void => {
    const element = this.getPopover(event.target as HTMLElement);

    if (element) {
      element.open = !element.open;
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return <Host></Host>;
  }
}
