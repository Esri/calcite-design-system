import { Component, Element, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { POPOVER_REFERENCE } from "../calcite-popover/resources";
import { getElementById, getRootNode } from "../../utils/dom";

/**
 * @slot - A slot for adding elements that reference a 'calcite-popover' by the 'selector' property.
 */
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
   * CSS Selector to match reference elements for popovers. Reference elements will be identified by this selector in order to open their associated popover.
   */
  @Prop() selector = `[${POPOVER_REFERENCE}]`;

  /**
   * Automatically closes any currently open popovers when clicking outside of a popover.
   */
  @Prop({ reflect: true }) autoClose?: boolean;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getRelatedPopover = (element: HTMLElement): HTMLCalcitePopoverElement => {
    const { selector, el } = this;
    const id = element.closest(selector)?.getAttribute(POPOVER_REFERENCE);

    return getElementById(getRootNode(el), id) as HTMLCalcitePopoverElement;
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
    const rootNode = getRootNode(el);

    if (autoClose && !isTargetInsidePopover) {
      Array.from(
        rootNode instanceof ShadowRoot
          ? rootNode.host.querySelectorAll(popoverSelector)
          : rootNode.querySelectorAll(popoverSelector)
      )
        .filter((popover) => popover.open && popover !== relatedPopover)
        .forEach((popover) => popover.toggle(false));
    }

    if (!el.contains(target) || !relatedPopover) {
      return;
    }

    relatedPopover.toggle();
  }
}
