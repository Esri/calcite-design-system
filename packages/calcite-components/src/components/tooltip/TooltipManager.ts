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

  private hoveredTooltip: HTMLCalciteTooltipElement = null;

  private clickedTooltip: HTMLCalciteTooltipElement = null;

  private activeTooltip: HTMLCalciteTooltipElement = null;

  private registeredElementCount = 0;

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

        if (referenceElement instanceof Element && referenceElement.contains(event.target as HTMLElement)) {
          event.preventDefault();
        }
      }
    }
  };

  private pointerMoveHandler = (event: PointerEvent): void => {
    const composedPath = event.composedPath();
    const { activeTooltip } = this;
    const hoveringActiveTooltip = activeTooltip?.open && composedPath.includes(activeTooltip);

    if (hoveringActiveTooltip) {
      this.clearHoverTimeout();
      return;
    }

    const tooltip = this.queryTooltip(composedPath);
    this.hoveredTooltip = tooltip;

    if (this.isClosableClickedTooltip(tooltip)) {
      return;
    }

    this.clickedTooltip = null;

    if (tooltip) {
      this.openHoveredTooltip(tooltip);
    } else if (activeTooltip) {
      this.closeHoveredTooltip();
    }
  };

  private clickHandler = (event: PointerEvent): void => {
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

  private addShadowListeners(shadowRoot: ShadowRoot): void {
    shadowRoot.addEventListener("focusin", this.focusInHandler, { capture: true });
    shadowRoot.addEventListener("focusout", this.focusOutHandler, { capture: true });
  }

  private removeShadowListeners(shadowRoot: ShadowRoot): void {
    shadowRoot.removeEventListener("focusin", this.focusInHandler, { capture: true });
    shadowRoot.removeEventListener("focusout", this.focusOutHandler, { capture: true });
  }

  private addListeners(): void {
    window.addEventListener("keydown", this.keyDownHandler, { capture: true });
    window.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    window.addEventListener("click", this.clickHandler, { capture: true });
    window.addEventListener("focusin", this.focusInHandler, { capture: true });
    window.addEventListener("focusout", this.focusOutHandler, { capture: true });
  }

  private removeListeners(): void {
    window.removeEventListener("keydown", this.keyDownHandler, { capture: true });
    window.removeEventListener("pointermove", this.pointerMoveHandler, { capture: true });
    window.removeEventListener("click", this.clickHandler, { capture: true });
    window.removeEventListener("focusin", this.focusInHandler, { capture: true });
    window.removeEventListener("focusout", this.focusOutHandler, { capture: true });
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

  private closeActiveTooltip(): void {
    const { activeTooltip } = this;

    if (activeTooltip?.open) {
      this.toggleTooltip(activeTooltip, false);
    }
  }

  private toggleFocusedTooltip(tooltip: HTMLCalciteTooltipElement, open: boolean): void {
    this.closeActiveTooltip();

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

        if (this.activeTooltip === this.hoveredTooltip) {
          return;
        }

        this.closeActiveTooltip();

        if (tooltip !== this.hoveredTooltip) {
          return;
        }

        this.toggleTooltip(tooltip, true);
      },
      this.activeTooltip ? 0 : TOOLTIP_OPEN_DELAY_MS,
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

  private queryFocusedTooltip(event: FocusEvent, open: boolean): void {
    const tooltip = this.queryTooltip(event.composedPath());

    if (!tooltip || this.isClosableClickedTooltip(tooltip)) {
      return;
    }

    this.toggleFocusedTooltip(tooltip, open);
  }

  private isClosableClickedTooltip(tooltip: HTMLCalciteTooltipElement): boolean {
    return tooltip?.closeOnClick && tooltip === this.clickedTooltip;
  }

  private registerShadowRoot(shadowRoot: ShadowRoot): void {
    const { registeredShadowRootCounts } = this;

    const newCount = (registeredShadowRootCounts.get(shadowRoot) ?? 0) + 1;

    if (newCount === 1) {
      this.addShadowListeners(shadowRoot);
    }

    registeredShadowRootCounts.set(shadowRoot, newCount);
  }

  private unregisterShadowRoot(shadowRoot: ShadowRoot): void {
    const { registeredShadowRootCounts } = this;

    const newCount = registeredShadowRootCounts.get(shadowRoot) - 1;

    if (newCount === 0) {
      this.removeShadowListeners(shadowRoot);
    }

    registeredShadowRootCounts.set(shadowRoot, newCount);
  }

  private getReferenceElShadowRootNode(referenceEl: ReferenceElement): ShadowRoot | null {
    return referenceEl instanceof Element ? getShadowRootNode(referenceEl) : null;
  }
}
