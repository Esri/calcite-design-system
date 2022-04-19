import { TOOLTIP_DELAY_MS } from "./resources";

export default class TooltipManager {
  registeredElementCount = 0;

  queryTooltip = (composedPath: EventTarget[]): HTMLCalciteTooltipElement => {
    const { registeredElements } = this;

    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl));

    return registeredElements.get(registeredElement);
  };

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      const { activeTooltipEl } = this;

      if (activeTooltipEl) {
        this.clearHoverTimeout(activeTooltipEl);
        this.toggleTooltip(activeTooltipEl, false);
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
    this.clickedTooltip = this.queryTooltip(event.composedPath());
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

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  registeredElements = new WeakMap<HTMLElement, HTMLCalciteTooltipElement>();

  registerElement(referenceEl: HTMLElement, tooltip: HTMLCalciteTooltipElement): void {
    this.registeredElements.set(referenceEl, tooltip);
    this.registeredElementCount++;
    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  private addListeners(): void {
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("mouseover", this.mouseEnterShow, { capture: true });
    document.addEventListener("mouseout", this.mouseLeaveHide, { capture: true });
    document.addEventListener("click", this.clickHandler, { capture: true });
    document.addEventListener("focusin", this.focusShow), { capture: true };
    document.addEventListener("focusout", this.blurHide, { capture: true });
  }

  private removeListeners(): void {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("mouseover", this.mouseEnterShow, { capture: true });
    document.removeEventListener("mouseout", this.mouseLeaveHide, { capture: true });
    document.removeEventListener("click", this.clickHandler, { capture: true });
    document.removeEventListener("focusin", this.focusShow, { capture: true });
    document.removeEventListener("focusout", this.blurHide, { capture: true });
  }

  unregisterElement(referenceEl: HTMLElement): void {
    this.registeredElements.delete(referenceEl);
    this.registeredElementCount--;
    if (this.registeredElementCount === 0) {
      this.removeListeners();
    }
  }

  private clearHoverTimeout(tooltip: HTMLCalciteTooltipElement): void {
    const { hoverTimeouts } = this;

    if (hoverTimeouts.has(tooltip)) {
      window.clearTimeout(hoverTimeouts.get(tooltip));
      hoverTimeouts.delete(tooltip);
    }
  }

  private closeExistingTooltip(): void {
    const { activeTooltipEl } = this;

    if (activeTooltipEl) {
      this.toggleTooltip(activeTooltipEl, false);
    }
  }

  private focusTooltip(tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    this.closeExistingTooltip();

    if (value) {
      this.clearHoverTimeout(tooltip);
    }

    this.toggleTooltip(tooltip, value);
  }

  private toggleTooltip(tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    tooltip.open = value;

    if (value) {
      this.activeTooltipEl = tooltip;
    }
  }

  private hoverToggle = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    const { hoverTimeouts } = this;

    hoverTimeouts.delete(tooltip);

    if (value) {
      this.closeExistingTooltip();
    }

    this.toggleTooltip(tooltip, value);
  };

  private hoverTooltip(tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    this.clearHoverTimeout(tooltip);

    const { hoverTimeouts } = this;

    const timeoutId = window.setTimeout(() => this.hoverToggle(tooltip, value), TOOLTIP_DELAY_MS || 0);

    hoverTimeouts.set(tooltip, timeoutId);
  }

  private activeTooltipHover(event: MouseEvent): void {
    const { activeTooltipEl, hoverTimeouts } = this;
    const { type } = event;

    if (!activeTooltipEl) {
      return;
    }

    if (type === "mouseover" && event.composedPath().includes(activeTooltipEl)) {
      this.clearHoverTimeout(activeTooltipEl);
    } else if (type === "mouseout" && !hoverTimeouts.has(activeTooltipEl)) {
      this.hoverTooltip(activeTooltipEl, false);
    }
  }

  private hoverEvent(event: MouseEvent, value: boolean): void {
    const tooltip = this.queryTooltip(event.composedPath());

    this.activeTooltipHover(event);

    if (!tooltip) {
      return;
    }

    this.hoverTooltip(tooltip, value);
  }

  private focusEvent(event: FocusEvent, value: boolean): void {
    const tooltip = this.queryTooltip(event.composedPath());

    if (!tooltip || tooltip === this.clickedTooltip) {
      this.clickedTooltip = null;
      return;
    }

    this.focusTooltip(tooltip, value);
  }
}
