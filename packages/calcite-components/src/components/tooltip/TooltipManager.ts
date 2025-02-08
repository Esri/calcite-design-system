import { getShadowRootNode } from "../../utils/dom";
import { ReferenceElement } from "../../utils/floating-ui";
import { TOOLTIP_OPEN_DELAY_MS, TOOLTIP_CLOSE_DELAY_MS } from "./resources";
import { getEffectiveReferenceElement } from "./utils";

export default class TooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new WeakMap<ReferenceElement, HTMLCalciteTooltipElement>();

  private registeredShadowRootCounts = new WeakMap<ShadowRoot, number>();

  private hoverOpenTimeout: number = null;

  private hoverCloseTimeout: number = null;

  private activeTooltip: HTMLCalciteTooltipElement = null;

  private registeredElementCount = 0;

  private clickedTooltip: HTMLCalciteTooltipElement = null;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: ReferenceElement, tooltip: HTMLCalciteTooltipElement): void {
    this.registeredElementCount++;
    this.registeredElements.set(referenceEl, tooltip);
    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      this.registerShadowRoot(shadowRoot);
    }

    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  unregisterElement(referenceEl: ReferenceElement): void {
    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      this.unregisterShadowRoot(shadowRoot);
    }

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
    if (event.key === "Escape" && !event.defaultPrevented) {
      const { activeTooltip } = this;

      if (activeTooltip?.open) {
        this.clearHoverTimeout();
        this.closeActiveTooltip();
        const referenceElement = getEffectiveReferenceElement(activeTooltip);
        const composedPath = event.composedPath();

        if (
          (referenceElement instanceof Element && composedPath.includes(referenceElement)) ||
          composedPath.includes(activeTooltip)
        ) {
          event.preventDefault();
        }
      }
    }
  };

  private pointerMoveHandler = (event: PointerEvent): void => {
    const composedPath = event.composedPath();
    const { activeTooltip } = this;

    const tooltip = this.queryTooltip(composedPath);

    if (this.pathHasOpenTooltip(tooltip, composedPath)) {
      this.clearHoverTimeout();
      return;
    }

    if (tooltip === this.clickedTooltip) {
      return;
    }

    if (tooltip) {
      this.openHoveredTooltip(tooltip);
    } else if (activeTooltip?.open) {
      this.closeHoveredTooltip();
    }

    this.clickedTooltip = null;
  };

  private pathHasOpenTooltip(tooltip: HTMLCalciteTooltipElement, composedPath: EventTarget[]): boolean {
    const { activeTooltip } = this;

    return (
      (activeTooltip?.open && composedPath.includes(activeTooltip)) || (tooltip?.open && composedPath.includes(tooltip))
    );
  }

  private clickHandler = (event: Event): void => {
    this.clickedTooltip = null;
    const composedPath = event.composedPath();
    const tooltip = this.queryTooltip(composedPath);

    if (this.pathHasOpenTooltip(tooltip, composedPath)) {
      this.clearHoverTimeout();
      return;
    }

    this.closeActiveTooltip();

    if (!tooltip) {
      return;
    }

    this.clearHoverTimeout();

    if (tooltip.closeOnClick) {
      this.clickedTooltip = tooltip;
      this.toggleTooltip(tooltip, false);
      return;
    }

    this.toggleTooltip(tooltip, true);
  };

  private blurHandler = (): void => {
    this.closeActiveTooltip();
  };

  private focusInHandler = (event: FocusEvent): void => {
    const composedPath = event.composedPath();
    const tooltip = this.queryTooltip(composedPath);

    if (this.pathHasOpenTooltip(tooltip, composedPath)) {
      this.clearHoverTimeout();
      return;
    }

    this.closeTooltipIfNotActive(tooltip);

    if (!tooltip) {
      return;
    }

    this.toggleFocusedTooltip(tooltip, true);
  };

  private addShadowListeners(shadowRoot: ShadowRoot): void {
    shadowRoot.addEventListener("focusin", this.focusInHandler);
  }

  private removeShadowListeners(shadowRoot: ShadowRoot): void {
    shadowRoot.removeEventListener("focusin", this.focusInHandler);
  }

  private addListeners(): void {
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("pointermove", this.pointerMoveHandler);
    window.addEventListener("click", this.clickHandler);
    window.addEventListener("focusin", this.focusInHandler);
    window.addEventListener("blur", this.blurHandler);
  }

  private removeListeners(): void {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("click", this.clickHandler);
    window.removeEventListener("focusin", this.focusInHandler);
    window.removeEventListener("blur", this.blurHandler);
  }

  private clearHoverOpenTimeout(): void {
    window.clearTimeout(this.hoverOpenTimeout);
    this.hoverOpenTimeout = null;
  }

  private clearHoverCloseTimeout(): void {
    window.clearTimeout(this.hoverCloseTimeout);
    this.hoverCloseTimeout = null;
  }

  private clearHoverTimeout(): void {
    this.clearHoverOpenTimeout();
    this.clearHoverCloseTimeout();
  }

  private closeTooltipIfNotActive(tooltip: HTMLCalciteTooltipElement): void {
    if (this.activeTooltip !== tooltip) {
      this.closeActiveTooltip();
    }
  }

  private closeActiveTooltip(): void {
    const { activeTooltip } = this;

    if (activeTooltip?.open) {
      this.toggleTooltip(activeTooltip, false);
    }
  }

  private toggleFocusedTooltip(tooltip: HTMLCalciteTooltipElement, open: boolean): void {
    if (open) {
      this.clearHoverTimeout();
    }

    this.toggleTooltip(tooltip, open);
  }

  private toggleTooltip(tooltip: HTMLCalciteTooltipElement, open: boolean): void {
    tooltip.open = open;

    this.activeTooltip = open ? tooltip : null;
  }

  private openHoveredTooltip = (tooltip: HTMLCalciteTooltipElement): void => {
    this.hoverOpenTimeout = window.setTimeout(
      () => {
        if (this.hoverOpenTimeout === null) {
          return;
        }

        this.clearHoverCloseTimeout();
        this.closeTooltipIfNotActive(tooltip);
        this.toggleTooltip(tooltip, true);
      },
      this.activeTooltip?.open ? 0 : TOOLTIP_OPEN_DELAY_MS,
    );
  };

  private closeHoveredTooltip = (): void => {
    this.hoverCloseTimeout = window.setTimeout(() => {
      if (this.hoverCloseTimeout === null) {
        return;
      }

      this.closeActiveTooltip();
    }, TOOLTIP_CLOSE_DELAY_MS);
  };

  private registerShadowRoot(shadowRoot: ShadowRoot): void {
    const { registeredShadowRootCounts } = this;

    const count = registeredShadowRootCounts.get(shadowRoot);
    const newCount = Math.min((typeof count === "number" ? count : 0) + 1, 1);

    if (newCount === 1) {
      this.addShadowListeners(shadowRoot);
    }

    registeredShadowRootCounts.set(shadowRoot, newCount);
  }

  private unregisterShadowRoot(shadowRoot: ShadowRoot): void {
    const { registeredShadowRootCounts } = this;

    const count = registeredShadowRootCounts.get(shadowRoot);
    const newCount = Math.max((typeof count === "number" ? count : 1) - 1, 0);

    if (newCount === 0) {
      this.removeShadowListeners(shadowRoot);
    }

    registeredShadowRootCounts.set(shadowRoot, newCount);
  }

  private getReferenceElShadowRootNode(referenceEl: ReferenceElement): ShadowRoot | null {
    return referenceEl instanceof Element ? getShadowRootNode(referenceEl) : null;
  }
}
