import { Component, Host, h, Listen, Prop, VNode, Element } from "@stencil/core";
import { TOOLTIP_REFERENCE, TOOLTIP_DELAY_MS } from "../calcite-tooltip/resources";
import { getElementById, getRootNode } from "../../utils/dom";
import { getKey } from "../../utils/key";

/**
 * @slot - A slot for adding elements that reference a 'calcite-tooltip' by the 'selector' property.
 */
@Component({
  tag: "calcite-tooltip-manager"
})
export class CalciteTooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Variables
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipManagerElement;

  tooltipEl: HTMLCalciteTooltipElement;

  hoverTimeouts: WeakMap<HTMLCalciteTooltipElement, number> = new WeakMap();

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip.
   */
  @Prop() selector = `[${TOOLTIP_REFERENCE}]`;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  queryTooltip = (element: HTMLElement): HTMLCalciteTooltipElement => {
    const { selector, el } = this;
    const id = element.closest(selector)?.getAttribute(TOOLTIP_REFERENCE);

    return getElementById(getRootNode(el), id) as HTMLCalciteTooltipElement;
  };

  clearHoverTimeout = (tooltip: HTMLCalciteTooltipElement): void => {
    const { hoverTimeouts } = this;

    if (hoverTimeouts.has(tooltip)) {
      window.clearTimeout(hoverTimeouts.get(tooltip));
    }
  };

  closeExistingTooltip = (): void => {
    const { tooltipEl } = this;

    if (tooltipEl) {
      this.toggleTooltip(tooltipEl, false);
    }
  };

  focusTooltip = ({
    tooltip,
    value
  }: {
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    this.closeExistingTooltip();

    if (value) {
      this.clearHoverTimeout(tooltip);
    }

    this.toggleTooltip(tooltip, value);
  };

  toggleTooltip = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    tooltip.open = value;

    if (value) {
      this.tooltipEl = tooltip;
    }
  };

  hoverToggle = ({
    tooltip,
    value
  }: {
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    const { hoverTimeouts } = this;

    hoverTimeouts.delete(tooltip);

    if (value) {
      this.closeExistingTooltip();
    }

    this.toggleTooltip(tooltip, value);
  };

  hoverTooltip = ({
    tooltip,
    value
  }: {
    tooltip: HTMLCalciteTooltipElement;
    value: boolean;
  }): void => {
    this.clearHoverTimeout(tooltip);

    const { hoverTimeouts } = this;

    const timeoutId = window.setTimeout(
      () => this.hoverToggle({ tooltip, value }),
      TOOLTIP_DELAY_MS || 0
    );

    hoverTimeouts.set(tooltip, timeoutId);
  };

  activeTooltipHover = (event: MouseEvent): void => {
    const { tooltipEl, hoverTimeouts } = this;

    if (!tooltipEl || !hoverTimeouts.has(tooltipEl)) {
      return;
    }

    const hoveringActiveTooltip = event.composedPath().includes(tooltipEl);

    hoveringActiveTooltip
      ? this.clearHoverTimeout(tooltipEl)
      : this.hoverTooltip({ tooltip: tooltipEl, value: false });
  };

  hoverEvent = (event: MouseEvent, value: boolean): void => {
    const tooltip = this.queryTooltip(event.target as HTMLElement);

    this.activeTooltipHover(event);

    if (!tooltip) {
      return;
    }

    this.hoverTooltip({ tooltip, value });
  };

  focusEvent = (event: FocusEvent, value: boolean): void => {
    const tooltip = this.queryTooltip(event.target as HTMLElement);

    if (!tooltip) {
      return;
    }

    this.focusTooltip({ tooltip, value });
  };

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
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("keyup", { target: "document" })
  keyUpHandler(event: KeyboardEvent): void {
    if (getKey(event.key) === "Escape") {
      const { tooltipEl } = this;

      if (tooltipEl) {
        this.clearHoverTimeout(tooltipEl);
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
