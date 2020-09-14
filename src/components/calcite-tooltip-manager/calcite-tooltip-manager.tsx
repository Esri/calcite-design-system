import { Component, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement, addEventListenerOnce } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-tooltip-manager"
})
export class CalciteTooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Variables
  //
  // --------------------------------------------------------------------------

  timeouts: WeakMap<HTMLCalciteTooltipElement, number> = new WeakMap();

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Time to wait in milliseconds before closing the popup from mouse out.
   */
  @Prop() closeDelay = 500;

  /**
   * Time to wait in milliseconds before opening the popup from mouse over.
   */
  @Prop() openDelay = 500;

  /**
   * CSS Selector to match reference elements for tooltips.
   */
  @Prop() selector = `[${TOOLTIP_REFERENCE}]`;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  clearTooltipTimeout = (tooltip: HTMLCalciteTooltipElement): void => {
    const { timeouts } = this;

    if (timeouts.has(tooltip)) {
      window.clearTimeout(timeouts.get(tooltip));
    }
  };

  toggle = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    tooltip.open = value;
  };

  delayedToggle = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    this.clearTooltipTimeout(tooltip);
    const { openDelay, closeDelay, timeouts } = this;
    const delay = !value ? closeDelay : openDelay;
    const timeoutId = window.setTimeout(() => (tooltip.open = value), delay || 0);
    timeouts.set(tooltip, timeoutId);
  };

  eventToggle = ({
    event,
    value = true,
    delayed = true
  }: {
    event: Event;
    value: boolean;
    delayed: boolean;
  }): void => {
    const target = event.target as HTMLElement;

    const describedByElement = getDescribedByElement(
      target.closest(this.selector)
    ) as HTMLCalciteTooltipElement;

    if (!describedByElement) {
      return;
    }

    if (delayed) {
      this.delayedToggle(describedByElement, value);
      addEventListenerOnce(describedByElement, "mouseenter", () =>
        this.clearTooltipTimeout(describedByElement)
      );
      addEventListenerOnce(describedByElement, "mouseleave", () =>
        this.delayedToggle(describedByElement, value)
      );
    } else {
      this.toggle(describedByElement, value);
    }
  };

  keyUpHandler = (event: KeyboardEvent): void => {
    if (getKey(event.key) === "Escape") {
      this.eventToggle({ event, value: false, delayed: false });
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <Host onkeyup={this.keyUpHandler} />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("mouseenter", { capture: true })
  mouseEnterShow(event: MouseEvent): void {
    this.eventToggle({ event, value: true, delayed: true });
  }

  @Listen("mouseleave", { capture: true })
  mouseLeaveHide(event: MouseEvent): void {
    this.eventToggle({ event, value: false, delayed: true });
  }

  @Listen("focus", { capture: true })
  focusShow(event: Event): void {
    this.eventToggle({ event, value: true, delayed: false });
  }

  @Listen("blur", { capture: true })
  blurHide(event: Event): void {
    this.eventToggle({ event, value: false, delayed: false });
  }
}
