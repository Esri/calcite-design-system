import { Component, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { TOOLTIP_REFERENCE, TOOLTIP_DELAY_MS } from "../calcite-tooltip/resources";
import { getDescribedByElement } from "../../utils/dom";
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

  referenceEl: HTMLElement;

  tooltipEl: HTMLCalciteTooltipElement;

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

  closeExistingTooltip = (): void => {
    const { tooltipEl } = this;

    if (tooltipEl) {
      this.toggleTooltip(tooltipEl, false);
    }
  };

  focusedToggle = ({
    referenceEl,
    tooltip,
    value
  }: {
    referenceEl: HTMLElement;
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    this.closeExistingTooltip();
    this.referenceEl = value ? referenceEl : null;

    if (value) {
      this.clearTooltipTimeout(tooltip);
    }

    this.toggleTooltip(tooltip, value);
  };

  toggleTooltip = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    tooltip.open = value;
    this.tooltipEl = value ? tooltip : null;
  };

  hoveredToggle = ({
    referenceEl,
    tooltip,
    value
  }: {
    referenceEl: HTMLElement;
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    if (!this.timeouts.has(this.tooltipEl)) {
      this.closeExistingTooltip();
    }
    this.referenceEl = value ? referenceEl : null;

    this.tooltipEl = tooltip;
    this.clearTooltipTimeout(tooltip);

    const { timeouts } = this;

    const timeoutId = window.setTimeout(
      () => this.toggleTooltip(tooltip, value),
      TOOLTIP_DELAY_MS || 0
    );

    timeouts.set(tooltip, timeoutId);
  };

  activeTooltipHover = (event: MouseEvent, referenceEl: HTMLElement): void => {
    const { tooltipEl, timeouts } = this;

    if (!tooltipEl || !timeouts.has(tooltipEl)) {
      return;
    }

    const hoveringActiveTooltip = event.composedPath().includes(tooltipEl);

    hoveringActiveTooltip
      ? this.clearTooltipTimeout(tooltipEl)
      : this.hoveredToggle({ referenceEl, tooltip: tooltipEl, value: false });
  };

  hoverEvent = (event: MouseEvent, value: boolean): void => {
    const referenceEl = event.target as HTMLElement;

    this.activeTooltipHover(event, referenceEl);

    const tooltip = this.queryTooltip(referenceEl);

    if (!tooltip) {
      return;
    }

    this.hoveredToggle({ referenceEl, tooltip, value });
  };

  focusEvent = (event: FocusEvent, value: boolean): void => {
    const referenceEl = event.target as HTMLElement;
    const tooltip = this.queryTooltip(referenceEl);

    if (!tooltip) {
      return;
    }

    this.focusedToggle({ referenceEl, tooltip, value });
  };

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
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keyup", { target: "document" })
  keyUpHandler(event: KeyboardEvent): void {
    if (getKey(event.key) === "Escape") {
      const { tooltipEl } = this;

      this.referenceEl = null;

      if (tooltipEl) {
        this.clearTooltipTimeout(tooltipEl);
        this.toggleTooltip(tooltipEl, false);
      }
    }
  }

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
