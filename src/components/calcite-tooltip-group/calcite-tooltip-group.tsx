import { Component, Element, Host, h } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";

@Component({
  tag: "calcite-tooltip-group",
  styleUrl: "calcite-tooltip-group.scss",
  shadow: true
})
export class CalciteTooltipGroup {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.addListeners();
  }

  componentDidUnload() {
    this.removeListeners();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getTooltip = (element: HTMLElement): HTMLCalciteTooltipElement => {
    if (!element.hasAttribute(TOOLTIP_REFERENCE)) {
      return;
    }

    const tooltipId = element.getAttribute("aria-describedby");

    if (!tooltipId) {
      return;
    }

    return document.getElementById(tooltipId) as HTMLCalciteTooltipElement;
  };

  show = (event: MouseEvent | FocusEvent): void => {
    const tooltip = this.getTooltip(event.target as HTMLElement);

    if (tooltip) {
      tooltip.open = true;
    }
  };

  hide = (event: MouseEvent | FocusEvent): void => {
    const tooltip = this.getTooltip(event.target as HTMLElement);

    if (tooltip) {
      tooltip.open = false;
    }
  };

  addListeners(): void {
    const { el } = this;

    el.addEventListener("mouseenter", this.show, true);
    el.addEventListener("mouseleave", this.hide, true);
    el.addEventListener("focus", this.show, true);
    el.addEventListener("blur", this.hide, true);
  }

  removeListeners(): void {
    const { el } = this;

    el.removeEventListener("mouseenter", this.show);
    el.removeEventListener("mouseleave", this.hide);
    el.removeEventListener("focus", this.show);
    el.removeEventListener("blur", this.hide);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
