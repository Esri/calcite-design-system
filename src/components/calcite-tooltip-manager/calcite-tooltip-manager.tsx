import { Component, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement, once } from "../../utils/dom";
import { getKey } from "../../utils/key";

const TOOLTIP_DELAY_MS = 500;

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

  hoveredTooltipEl: HTMLCalciteTooltipElement;

  hoveredReferenceEl: HTMLElement;

  focusedReferenceEl: HTMLElement;

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
    const { timeouts } = this;
    const timeoutId = window.setTimeout(() => (tooltip.open = value), TOOLTIP_DELAY_MS || 0);
    timeouts.set(tooltip, timeoutId);
  };

  // todo: cleanup event removals
  tooltipMouseEnter = (tooltip: HTMLCalciteTooltipElement): void => {
    this.clearTooltipTimeout(tooltip);
    this.hoveredTooltipEl = tooltip;
    once(tooltip, "mouseleave", () => this.tooltipMouseLeave(tooltip));
  };

  tooltipMouseLeave = (tooltip: HTMLCalciteTooltipElement): void => {
    this.delayedToggle(tooltip, false);
    this.hoveredTooltipEl = null;
  };

  hoverEvent = ({
    tooltip,
    value,
    referenceEl
  }: {
    referenceEl: HTMLElement;
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    this.hoveredReferenceEl = value ? referenceEl : null;

    if (referenceEl !== this.focusedReferenceEl) {
      this.delayedToggle(tooltip, value);
      once(tooltip, "mouseenter", () => this.tooltipMouseEnter(tooltip));
    }
  };

  focusEvent = ({
    tooltip,
    value,
    referenceEl
  }: {
    referenceEl: HTMLElement;
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    this.focusedReferenceEl = value ? referenceEl : null;

    if (referenceEl !== this.hoveredReferenceEl && tooltip !== this.hoveredTooltipEl) {
      this.toggle(tooltip, value);
    }
  };

  tooltipEvent = ({
    event,
    value = true
  }: {
    event: FocusEvent | MouseEvent | KeyboardEvent;
    value: boolean;
  }): void => {
    const target = event.target as HTMLElement;

    const describedByElement = getDescribedByElement(
      target.closest(this.selector)
    ) as HTMLCalciteTooltipElement;

    if (!describedByElement) {
      return;
    }

    if (event instanceof MouseEvent) {
      this.hoverEvent({ referenceEl: target, tooltip: describedByElement, value });
    }

    if (event instanceof FocusEvent) {
      this.focusEvent({ referenceEl: target, tooltip: describedByElement, value });
    }

    if (event instanceof KeyboardEvent) {
      this.focusEvent({ referenceEl: target, tooltip: describedByElement, value });
    }
  };

  keyUpHandler = (event: KeyboardEvent): void => {
    if (getKey(event.key) === "Escape") {
      this.tooltipEvent({ event, value: false });
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
    this.tooltipEvent({ event, value: true });
  }

  @Listen("mouseleave", { capture: true })
  mouseLeaveHide(event: MouseEvent): void {
    this.tooltipEvent({ event, value: false });
  }

  @Listen("focus", { capture: true })
  focusShow(event: FocusEvent): void {
    this.tooltipEvent({ event, value: true });
  }

  @Listen("blur", { capture: true })
  blurHide(event: FocusEvent): void {
    this.tooltipEvent({ event, value: false });
  }
}
