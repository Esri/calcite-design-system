// @ts-strict-ignore
import { getShadowRootNode } from "../../utils/dom";
import { ReferenceElement } from "../../utils/floating-ui";
import { TOOLTIP_OPEN_DELAY_MS, TOOLTIP_QUICK_OPEN_DELAY_MS, TOOLTIP_CLOSE_DELAY_MS } from "./resources";
import { getEffectiveReferenceElement } from "./utils";
import type { Tooltip } from "./tooltip";

export default class TooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new WeakMap<ReferenceElement, Tooltip["el"][]>();

  private registeredShadowRootCounts = new WeakMap<ShadowRoot, number>();

  private hoverOpenTimeout: number = null;

  private hoverCloseTimeout: number = null;

  private activeTooltips: Tooltip["el"][] = [];

  private registeredElementCount = 0;

  private clickedTooltips: Tooltip["el"][] = [];

  private hoveredTooltips: Tooltip["el"][] = [];

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: ReferenceElement, tooltip: Tooltip["el"]): void {
    this.registeredElementCount++;

    const existingTooltips = this.registeredElements.get(referenceEl) ?? [];
    this.registeredElements.set(referenceEl, [...existingTooltips, tooltip]);

    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      this.registerShadowRoot(shadowRoot);
    }

    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  unregisterElement(referenceEl: ReferenceElement, tooltip: Tooltip["el"]): void {
    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      this.unregisterShadowRoot(shadowRoot);
    }

    const existingTooltips = this.registeredElements.get(referenceEl) ?? [];
    const updatedTooltips = existingTooltips.filter((t) => t !== tooltip);

    if (updatedTooltips.length > 0) {
      this.registeredElements.set(referenceEl, updatedTooltips);
      this.registeredElementCount--;
    } else if (this.registeredElements.delete(referenceEl)) {
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

  private queryTooltips = (composedPath: EventTarget[]): Tooltip["el"][] => {
    const { registeredElements } = this;

    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl))!;

    return registeredElements.get(registeredElement);
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && !event.defaultPrevented) {
      const { activeTooltips } = this;

      const tooltip = activeTooltips?.find((tooltip) => tooltip?.open);

      if (tooltip?.open) {
        this.clearHoverTimeout();
        this.closeActiveTooltips();
        const referenceElement = getEffectiveReferenceElement(tooltip);
        const composedPath = event.composedPath();

        if (
          (referenceElement instanceof Element && composedPath.includes(referenceElement)) ||
          composedPath.includes(tooltip)
        ) {
          event.preventDefault();
        }
      }
    }
  };

  private pointerLeaveHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    this.clearHoverTimeout();
    this.closeHoveredTooltips();
  };

  private pointerMoveHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      this.closeHoveredTooltips();
      return;
    }

    const composedPath = event.composedPath();

    const tooltips = this.queryTooltips(composedPath);

    if (this.pathHasOpenTooltip(tooltips, composedPath)) {
      this.clearHoverTimeout();
      return;
    }

    if (tooltips?.some((tooltip) => this.clickedTooltips?.includes(tooltip))) {
      return;
    }

    if (!tooltips?.some((tooltip) => this.hoveredTooltips?.includes(tooltip))) {
      this.clearHoverOpenTimeout();
    }

    this.hoveredTooltips = tooltips;

    if (tooltips?.length) {
      this.openHoveredTooltips(tooltips);
    } else if (this.activeTooltips?.some((tooltip) => tooltip?.open)) {
      this.closeHoveredTooltips();
    }

    this.clickedTooltips = null;
  };

  private pathHasOpenTooltip(tooltips: Tooltip["el"][], composedPath: EventTarget[]): boolean {
    const { activeTooltips } = this;

    return (
      activeTooltips?.some((tooltip) => tooltip?.open && composedPath.includes(tooltip)) ||
      tooltips?.some((tooltip) => tooltip?.open && composedPath.includes(tooltip))
    );
  }

  private clickHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    this.clickedTooltips = null;
    const composedPath = event.composedPath();
    const tooltips = this.queryTooltips(composedPath);

    if (this.pathHasOpenTooltip(tooltips, composedPath)) {
      this.clearHoverTimeout();
      return;
    }

    this.closeActiveTooltips();

    if (!tooltips) {
      return;
    }

    this.clearHoverTimeout();

    const closeOnClickTooltips = tooltips.filter((tooltip) => tooltip.closeOnClick);
    const nonCloseOnClickTooltips = tooltips.filter((tooltip) => !tooltip.closeOnClick);

    if (closeOnClickTooltips?.length) {
      this.clickedTooltips = closeOnClickTooltips;
      this.toggleTooltips(closeOnClickTooltips, false);
    }

    this.toggleTooltips(nonCloseOnClickTooltips, true);
  };

  private blurHandler = (): void => {
    this.closeActiveTooltips();
  };

  private focusInHandler = (event: FocusEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    const composedPath = event.composedPath();
    const tooltips = this.queryTooltips(composedPath);

    if (this.pathHasOpenTooltip(tooltips, composedPath)) {
      this.clearHoverTimeout();
      return;
    }
    if (tooltips === this.clickedTooltips) {
      return;
    }

    this.clickedTooltips = null;

    this.closeTooltipsIfNotActive(tooltips);

    if (!tooltips?.length) {
      return;
    }

    this.toggleFocusedTooltips(tooltips, true);
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
    document.addEventListener("pointerleave", this.pointerLeaveHandler);
  }

  private removeListeners(): void {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("click", this.clickHandler);
    window.removeEventListener("focusin", this.focusInHandler);
    window.removeEventListener("blur", this.blurHandler);
    document.removeEventListener("pointerleave", this.pointerLeaveHandler);
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

  private closeTooltipsIfNotActive(tooltips: Tooltip["el"][]): void {
    if (tooltips !== this.activeTooltips) {
      this.closeActiveTooltips();
    }
  }

  private closeActiveTooltips(): void {
    const { activeTooltips } = this;

    this.toggleTooltips(activeTooltips, false);
  }

  private toggleFocusedTooltips(tooltips: Tooltip["el"][], open: boolean): void {
    if (open) {
      this.clearHoverTimeout();
    }

    this.toggleTooltips(tooltips, open);
  }

  private toggleTooltips(tooltips: Tooltip["el"][], open: boolean): void {
    tooltips?.forEach((tooltip) => (tooltip.open = open));

    this.activeTooltips = open ? tooltips : null;
  }

  private openHoveredTooltips = (tooltips: Tooltip["el"][]): void => {
    this.hoverOpenTimeout = window.setTimeout(
      () => {
        if (this.hoverOpenTimeout === null || tooltips !== this.hoveredTooltips) {
          return;
        }

        this.clearHoverCloseTimeout();
        this.closeTooltipsIfNotActive(tooltips);
        this.toggleTooltips(tooltips, true);
      },
      this.activeTooltips?.some((tooltip) => tooltip.open) ? TOOLTIP_QUICK_OPEN_DELAY_MS : TOOLTIP_OPEN_DELAY_MS,
    );
  };

  private closeHoveredTooltips = (): void => {
    this.hoverCloseTimeout = window.setTimeout(() => {
      if (this.hoverCloseTimeout === null) {
        return;
      }

      this.closeActiveTooltips();
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
