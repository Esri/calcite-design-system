import { isPrimaryPointerButton } from "../../utils/dom";
import { ReferenceElement } from "../../utils/floating-ui";
import { TOOLTIP_DELAY_MS } from "./resources";

export default class TooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new WeakMap<ReferenceElement, HTMLCalciteTooltipElement>();

  private hoverTimeout: number = null;

  private clickedTooltip: HTMLCalciteTooltipElement;

  private activeTooltipEl: HTMLCalciteTooltipElement;

  private registeredElementCount = 0;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: ReferenceElement, tooltip: HTMLCalciteTooltipElement): void {
    this.registeredElementCount++;

    this.registeredElements.set(referenceEl, tooltip);

    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  unregisterElement(referenceEl: ReferenceElement): void {
    if (this.registeredElements.delete(referenceEl)) {
      this.registeredElementCount--;
    }

    if (this.registeredElementCount === 0) {
      this.removeListeners();
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private queryTooltip = (composedPath: EventTarget[]): HTMLCalciteTooltipElement => {
    const { registeredElements } = this;

    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl));

    return registeredElements.get(registeredElement);
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      const { activeTooltipEl } = this;

      if (activeTooltipEl) {
        this.clearHoverTimeout();
        this.toggleTooltip(activeTooltipEl, false);
      }
    }
  };

  private queryHoveredTooltip = (composedPath: EventTarget[]): void => {
    const { activeTooltipEl } = this;

    if (activeTooltipEl && composedPath.includes(activeTooltipEl)) {
      this.clearHoverTimeout();
      return;
    }

    const tooltip = this.queryTooltip(composedPath);

    if (tooltip) {
      this.toggleHoveredTooltip(tooltip, true);
    } else if (activeTooltipEl) {
      this.toggleHoveredTooltip(activeTooltipEl, false);
    }
  };

  private pointerMoveHandler = (event: PointerEvent): void => {
    const composedPath = event.composedPath();

    this.clearHoverTimeout();

    this.hoverTimeout = window.setTimeout(() => this.queryHoveredTooltip(composedPath), TOOLTIP_DELAY_MS || 0);
  };

  private pointerDownHandler = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const clickedTooltip = this.queryTooltip(event.composedPath());

    this.clickedTooltip = clickedTooltip;

    if (clickedTooltip?.closeOnClick) {
      this.toggleTooltip(clickedTooltip, false);
      this.clearHoverTimeout();
    }
  };

  private focusInHandler = (event: FocusEvent): void => {
    this.queryFocusedTooltip(event, true);
  };

  private focusOutHandler = (event: FocusEvent): void => {
    this.queryFocusedTooltip(event, false);
  };

  private addListeners(): void {
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    document.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
    document.addEventListener("focusin", this.focusInHandler, { capture: true });
    document.addEventListener("focusout", this.focusOutHandler, { capture: true });
  }

  private removeListeners(): void {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    document.removeEventListener("pointerdown", this.pointerDownHandler, { capture: true });
    document.removeEventListener("focusin", this.focusInHandler, { capture: true });
    document.removeEventListener("focusout", this.focusOutHandler, { capture: true });
  }

  private clearHoverTimeout(): void {
    window.clearTimeout(this.hoverTimeout);
  }

  private closeExistingTooltip(): void {
    const { activeTooltipEl } = this;

    if (activeTooltipEl) {
      this.toggleTooltip(activeTooltipEl, false);
    }
  }

  private toggleFocusedTooltip(tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    this.closeExistingTooltip();

    if (value) {
      this.clearHoverTimeout();
    }

    this.toggleTooltip(tooltip, value);
  }

  private toggleTooltip(tooltip: HTMLCalciteTooltipElement, value: boolean): void {
    tooltip.open = value;

    if (value) {
      this.activeTooltipEl = tooltip;
    }
  }

  private toggleHoveredTooltip = (tooltip: HTMLCalciteTooltipElement, value: boolean): void => {
    if (value) {
      this.closeExistingTooltip();
    }

    this.toggleTooltip(tooltip, value);
  };

  private queryFocusedTooltip(event: FocusEvent, value: boolean): void {
    const tooltip = this.queryTooltip(event.composedPath());

    if (!tooltip || tooltip === this.clickedTooltip) {
      this.clickedTooltip = null;
      return;
    }

    this.toggleFocusedTooltip(tooltip, value);
  }
}
