import { Component, Element, Host, h, Listen, Prop } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getDescribedByElement } from "../../utils/dom";

@Component({
  tag: "calcite-popover-manager"
})
export class CalcitePopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverManagerElement;

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

  render(): void {
    return <Host />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click", { target: "window", capture: true })
  closeOpenPopovers(event: Event): void {
    const target = event.target as HTMLElement;
    const { autoClose, el, selector } = this;
    const popoverSelector = "calcite-popover";
    const isTargetInsidePopover = target.closest(popoverSelector);
    const describedByElement = getDescribedByElement(target.closest(selector));

    if (autoClose && !isTargetInsidePopover) {
      Array.from(document.body.querySelectorAll(popoverSelector))
        .filter((popover) => popover.open && popover !== describedByElement)
        .forEach((popover) => popover.toggle(false));
    }

    if (!el.contains(target)) {
      return;
    }

    if (describedByElement) {
      (describedByElement as HTMLCalcitePopoverElement).toggle();
    }
  }
}
