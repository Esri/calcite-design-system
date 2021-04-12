import { Component, Element, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getElementByAttributeId } from "../../utils/dom";

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

  getRelatedPopover = (element: HTMLElement): HTMLCalcitePopoverElement => {
    const { selector, el } = this;

    return getElementByAttributeId({
      element: element.closest(selector),
      attrName: POPOVER_REFERENCE,
      hostElement: (el.getRootNode() as ShadowRoot)?.host as HTMLElement
    }) as HTMLCalcitePopoverElement;
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
    const relatedPopover = this.getRelatedPopover(target);

    if (autoClose && !isTargetInsidePopover) {
      Array.from(document.body.querySelectorAll(popoverSelector))
        .filter((popover) => popover.open && popover !== relatedPopover)
        .forEach((popover) => popover.toggle(false));
    }

    if (!el.contains(target) || !relatedPopover) {
      return;
    }

    relatedPopover.toggle();
  }
}
