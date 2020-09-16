import { Component, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement } from "../../utils/dom";
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

  focusedReferenceEl: HTMLElement;

  focusedTooltipEl: HTMLCalciteTooltipElement;

  hoveredReferenceEl: HTMLElement;

  hoveredTooltipEl: HTMLCalciteTooltipElement;

  timeouts: WeakMap<HTMLCalciteTooltipElement, number> = new WeakMap();

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

  queryTooltip = (el: HTMLElement): HTMLCalciteTooltipElement => {
    return getDescribedByElement(el.closest(this.selector)) as HTMLCalciteTooltipElement;
  };

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

  activeTooltipHover = (event: MouseEvent): void => {
    const { hoveredTooltipEl } = this;

    if (!hoveredTooltipEl) {
      return;
    }

    const hoveringActiveTooltip = event.composedPath().includes(hoveredTooltipEl);

    hoveringActiveTooltip
      ? this.clearTooltipTimeout(hoveredTooltipEl)
      : this.delayedToggle(hoveredTooltipEl, false);
  };

  hoverEvent = (event: MouseEvent, value: boolean): void => {
    this.activeTooltipHover(event);

    const referenceEl = event.target as HTMLElement;
    const tooltip = this.queryTooltip(referenceEl);

    if (!tooltip) {
      return;
    }

    const { focusedReferenceEl, focusedTooltipEl } = this;

    this.hoveredReferenceEl = value ? referenceEl : null;
    this.hoveredTooltipEl = value ? tooltip : null; // todo: move into delayedToggle

    if (referenceEl !== focusedReferenceEl && tooltip !== focusedTooltipEl) {
      this.delayedToggle(tooltip, value);
    }
  };

  focusEvent = (event: FocusEvent, value: boolean): void => {
    const referenceEl = event.target as HTMLElement;
    const tooltip = this.queryTooltip(referenceEl);

    if (!tooltip) {
      return;
    }

    const { hoveredReferenceEl, hoveredTooltipEl } = this;

    this.focusedReferenceEl = value ? referenceEl : null;
    this.focusedTooltipEl = value ? tooltip : null; // todo: move into toggle

    if (referenceEl !== hoveredReferenceEl && tooltip !== hoveredTooltipEl) {
      this.toggle(tooltip, value);
    }
  };

  keyUpHandler = (event: KeyboardEvent): void => {
    if (getKey(event.key) === "Escape") {
      const referenceEl = event.target as HTMLElement;
      const tooltip = this.queryTooltip(referenceEl);

      // todo: close focused or mouse tooltip
      console.log(this.focusedTooltipEl);
      if (tooltip) {
        this.toggle(tooltip, false);
      }
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
    this.hoverEvent(event, true);
  }

  @Listen("mouseleave", { capture: true })
  mouseLeaveHide(event: MouseEvent): void {
    this.hoverEvent(event, false);
  }

  @Listen("focus", { capture: true })
  focusShow(event: FocusEvent): void {
    this.focusEvent(event, true);
  }

  @Listen("blur", { capture: true })
  blurHide(event: FocusEvent): void {
    this.focusEvent(event, false);
  }
}
