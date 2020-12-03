import { Component, Element, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getElementByAttributeName } from "../../utils/dom";

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

  render(): VNode {
    return <Host />;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  queryPopover = (el: HTMLElement): HTMLCalcitePopoverElement => {
    return getElementByAttributeName(
      el.closest(this.selector),
      POPOVER_REFERENCE
    ) as HTMLCalcitePopoverElement;
  };

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click", { target: "window", capture: true })
  closeOpenPopovers(event: Event): void {
    const target = event.target as HTMLElement;
    const { autoClose, el } = this;
    const popoverSelector = "calcite-popover";
    const isTargetInsidePopover = target.closest(popoverSelector);
    const popover = this.queryPopover(target);

    if (autoClose && !isTargetInsidePopover) {
      Array.from(document.body.querySelectorAll(popoverSelector))
        .filter((p) => p.open && p !== popover)
        .forEach((p) => p.toggle(false));
    }

    if (!el.contains(target)) {
      return;
    }

    if (popover) {
      popover.toggle();
    }
  }
}
