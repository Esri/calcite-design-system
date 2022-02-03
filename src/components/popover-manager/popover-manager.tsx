import { Component, Element, h, Listen, Prop, VNode } from "@stencil/core";
import { POPOVER_REFERENCE } from "../popover/resources";
import { queryElementRoots, queryElementsRoots } from "../../utils/dom";

/**
 * @slot - A slot for adding elements that reference a 'calcite-popover' by the 'selector' property.
 */
@Component({
  tag: "calcite-popover-manager",
  styleUrl: "popover-manager.scss",
  shadow: true
})
export class PopoverManager {
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
   * @default `[data-calcite-popover-reference]`
   */
  @Prop() selector = `[${POPOVER_REFERENCE}]`;

  /**
   * Automatically closes any currently open popovers when clicking outside of a popover.
   */
  @Prop({ reflect: true }) autoClose = false;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <slot />;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  queryPopover = (composedPath: EventTarget[]): HTMLCalcitePopoverElement => {
    const { el } = this;

    if (!composedPath.includes(el)) {
      return null;
    }

    const referenceElement = (composedPath as HTMLElement[]).find((pathEl) =>
      pathEl?.hasAttribute?.(POPOVER_REFERENCE)
    );

    if (!referenceElement) {
      return null;
    }

    const id = referenceElement.getAttribute(POPOVER_REFERENCE);

    return queryElementRoots(el, { id }) as HTMLCalcitePopoverElement;
  };

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click", { target: "window", capture: true })
  closeOpenPopovers(event: Event): void {
    const { autoClose, el } = this;
    const popoverSelector = "calcite-popover";
    const composedPath = event.composedPath();
    const popover = this.queryPopover(composedPath);

    if (popover) {
      popover.toggle();
      return;
    }

    if (autoClose) {
      (queryElementsRoots(el, popoverSelector) as HTMLCalcitePopoverElement[])
        .filter((popover) => popover.open && !composedPath.includes(popover))
        .forEach((popover) => popover.toggle(false));
    }
  }
}
