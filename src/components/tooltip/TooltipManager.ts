import { TOOLTIP_DELAY_MS } from "./resources";

export default class TooltipManager {
  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      const { activeReferenceEl, activeTooltipEl } = this;

      if (activeTooltipEl) {
        this.clearHoverTimeout(activeTooltipEl);
        this.toggleTooltip(activeReferenceEl, activeTooltipEl, false);
      }
    }
  };

  mouseEnterShow = (event: MouseEvent): void => {
    this.hoverEvent(event, true);
  };

  mouseLeaveHide = (event: MouseEvent): void => {
    this.hoverEvent(event, false);
  };

  clickHandler = (event: MouseEvent): void => {
    const referenceEl = event.currentTarget as HTMLElement;
    this.clickedTooltip = this.registeredElements.get(referenceEl);
  };

  focusShow = (event: FocusEvent): void => {
    this.focusEvent(event, true);
  };

  blurHide = (event: FocusEvent): void => {
    this.focusEvent(event, false);
  };

  hoverTimeouts: WeakMap<HTMLCalciteTooltipElement, number> = new WeakMap();

  clickedTooltip: HTMLCalciteTooltipElement;

  activeTooltipEl: HTMLCalciteTooltipElement;

  activeReferenceEl: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  registeredElements = new WeakMap<HTMLElement, HTMLCalciteTooltipElement>();

  registerElement(referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement): void {
    this.registeredElements.set(referenceEl, tooltip);

    if (tooltip.open) {
      this.addOpenListeners(referenceEl);
    } else {
      this.addClosedListeners(referenceEl);
    }
  }

  private addOpenListeners(referenceEl: HTMLElement): void {
    document.addEventListener("keydown", this.keyDownHandler);
    referenceEl.addEventListener("mouseout", this.mouseLeaveHide);
    referenceEl.addEventListener("blur", this.blurHide);
  }

  private addClosedListeners(referenceEl: HTMLElement): void {
    referenceEl.addEventListener("click", this.clickHandler);
    referenceEl.addEventListener("focus", this.focusShow);
    referenceEl.addEventListener("mouseover", this.mouseEnterShow);
  }

  unregisterElement(referenceEl: HTMLElement): void {
    this.registeredElements.delete(referenceEl);

    this.removeOpenListeners(referenceEl);
    this.removeClosedListeners(referenceEl);
  }

  private removeClosedListeners(referenceEl: HTMLElement): void {
    referenceEl.removeEventListener("click", this.clickHandler);
    referenceEl.removeEventListener("focus", this.focusShow);
    referenceEl.removeEventListener("mouseover", this.mouseEnterShow);
  }

  private removeOpenListeners(referenceEl: HTMLElement): void {
    document.removeEventListener("keydown", this.keyDownHandler);
    referenceEl.removeEventListener("mouseout", this.mouseLeaveHide);
    referenceEl.removeEventListener("blur", this.blurHide);
  }

  private clearHoverTimeout(tooltip: HTMLCalciteTooltipElement): void {
    const { hoverTimeouts } = this;

    if (hoverTimeouts.has(tooltip)) {
      window.clearTimeout(hoverTimeouts.get(tooltip));
      hoverTimeouts.delete(tooltip);
    }
  }

  private closeExistingTooltip(referenceEl: HTMLElement): void {
    const tooltipEl = this.activeTooltipEl;

    if (tooltipEl) {
      this.toggleTooltip(referenceEl, tooltipEl, false);
    }
  }

  private focusTooltip(referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    this.closeExistingTooltip(referenceEl);

    if (value) {
      this.clearHoverTimeout(tooltip);
    }

    this.toggleTooltip(referenceEl, tooltip, value);
  }

  private toggleTooltip(referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    tooltip.open = value;

    if (value) {
      this.activeTooltipEl = tooltip;
      this.activeReferenceEl = referenceEl;
      this.addOpenListeners(referenceEl);
      this.removeClosedListeners(referenceEl);
    } else {
      this.addClosedListeners(referenceEl);
      this.removeOpenListeners(referenceEl);
    }
  }

  private hoverToggle = (referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    const { hoverTimeouts } = this;

    hoverTimeouts.delete(tooltip);

    if (value) {
      this.closeExistingTooltip(referenceEl);
    }

    this.toggleTooltip(referenceEl, tooltip, value);
  };

  private hoverTooltip(referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    this.clearHoverTimeout(tooltip);

    const { hoverTimeouts } = this;

    const timeoutId = window.setTimeout(() => {
      const willOpenAndStillHovered = (value && referenceEl.matches(":hover")) || tooltip.matches(":hover");

      this.hoverToggle(referenceEl, tooltip, willOpenAndStillHovered);
    }, TOOLTIP_DELAY_MS || 0);

    hoverTimeouts.set(tooltip, timeoutId);
  }

  private activeTooltipHover(event: MouseEvent): void {
    const referenceEl = event.currentTarget as HTMLElement;
    const tooltipEl = this.registeredElements.get(referenceEl);
    const { hoverTimeouts } = this;
    const { type } = event;

    if (!tooltipEl) {
      return;
    }

    if (type === "mouseover" && event.composedPath().includes(tooltipEl)) {
      this.clearHoverTimeout(tooltipEl);
    } else if (type === "mouseout" && !hoverTimeouts.has(tooltipEl)) {
      this.hoverTooltip(referenceEl, tooltipEl, false);
    }
  }

  private hoverEvent(event: MouseEvent, value: boolean): void {
    const referenceEl = event.currentTarget as HTMLElement;
    const tooltip = this.registeredElements.get(referenceEl);

    this.activeTooltipHover(event);

    if (!tooltip) {
      return;
    }

    this.hoverTooltip(referenceEl, tooltip, value);
  }

  private focusEvent(event: FocusEvent, value: boolean): void {
    const referenceEl = event.currentTarget as HTMLElement;
    const tooltip = this.registeredElements.get(referenceEl);

    if (!tooltip || tooltip === this.clickedTooltip) {
      this.clickedTooltip = null;
      return;
    }

    this.focusTooltip(referenceEl, tooltip, value);
  }
}
