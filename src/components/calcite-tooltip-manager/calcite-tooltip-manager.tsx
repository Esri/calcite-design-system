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

  focusedToggle = ({
    referenceEl,
    tooltip,
    value
  }: {
    referenceEl: HTMLElement;
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    const { hoveredTooltipEl, hoveredReferenceEl } = this;

    this.focusedReferenceEl = value ? referenceEl : null;

    if (referenceEl === hoveredReferenceEl || tooltip === hoveredTooltipEl) {
      return;
    }

    this.toggleFocusedTooltip(tooltip, value);
  };

  toggleFocusedTooltip = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    tooltip.open = value;
    this.focusedTooltipEl = value ? tooltip : null;
  };

  toggleHoveredTooltip = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    tooltip.open = value;
    this.hoveredTooltipEl = value ? tooltip : null;
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
    const { focusedReferenceEl, focusedTooltipEl } = this;

    this.hoveredReferenceEl = value ? referenceEl : null;

    if (referenceEl === focusedReferenceEl || tooltip === focusedTooltipEl) {
      return;
    }

    this.hoveredTooltipEl = tooltip;
    this.clearTooltipTimeout(tooltip);

    const { timeouts } = this;

    const timeoutId = window.setTimeout(
      () => this.toggleHoveredTooltip(tooltip, value),
      TOOLTIP_DELAY_MS || 0
    );

    timeouts.set(tooltip, timeoutId);
  };

  activeTooltipHover = (event: MouseEvent, referenceEl: HTMLElement): void => {
    const { hoveredTooltipEl } = this;

    if (!hoveredTooltipEl) {
      return;
    }

    const hoveringActiveTooltip = event.composedPath().includes(hoveredTooltipEl);

    hoveringActiveTooltip
      ? this.clearTooltipTimeout(hoveredTooltipEl)
      : this.hoveredToggle({ referenceEl, tooltip: hoveredTooltipEl, value: false });
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
      const { hoveredTooltipEl, focusedTooltipEl } = this;

      this.hoveredReferenceEl = null;
      this.focusedReferenceEl = null;

      if (hoveredTooltipEl) {
        this.toggleHoveredTooltip(hoveredTooltipEl, false);
      }

      if (focusedTooltipEl) {
        this.toggleFocusedTooltip(focusedTooltipEl, false);
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
