import { Component, Host, h, Listen, Prop, VNode } from "@stencil/core";
import { TOOLTIP_REFERENCE } from "../calcite-tooltip/resources";
import { getDescribedByElement, addEventListenerOnce } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-tooltip-manager"
})
export class CalciteTooltipManager {
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  disconnectedCallback(): void {
    this.clearDelayTimer();
  }

  // --------------------------------------------------------------------------
  //
  //  Variables
  //
  // --------------------------------------------------------------------------

  delayTimer: number = null;

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * CSS Selector to match reference elements for tooltips.
   */
  @Prop() selector = `[${TOOLTIP_REFERENCE}]`;

  /**
   * CSS Selector to match reference elements for tooltips.
   */
  @Prop() delay = 1000;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  clearDelayTimer = (): void => {
    window.clearTimeout(this.delayTimer);
  };

  toggle = (element: HTMLCalciteTooltipElement, value: boolean): void => {
    element.open = value;
  };

  delayedToggle = (element: HTMLCalciteTooltipElement, value: boolean): void => {
    this.clearDelayTimer();

    this.delayTimer = window.setTimeout(() => (element.open = value), this.delay || 0);
  };

  eventToggle = ({
    event,
    value = true,
    delayed = true
  }: {
    event: Event;
    value: boolean;
    delayed: boolean;
  }): void => {
    const target = event.target as HTMLElement;

    const describedByElement = getDescribedByElement(
      target.closest(this.selector)
    ) as HTMLCalciteTooltipElement;

    if (!describedByElement) {
      return;
    }

    if (delayed) {
      this.delayedToggle(describedByElement, value);
      addEventListenerOnce(describedByElement, "mouseenter", () => this.clearDelayTimer());
      addEventListenerOnce(describedByElement, "mouseleave", () =>
        this.delayedToggle(describedByElement, value)
      );
    } else {
      this.toggle(describedByElement, value);
    }
  };

  keyUpHandler = (event: KeyboardEvent): void => {
    if (getKey(event.key) === "Escape") {
      this.eventToggle({ event, value: false, delayed: false });
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return <Host onkeyup={this.keyUpHandler} />;
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("mouseenter", { capture: true })
  mouseEnterShow(event: MouseEvent): void {
    this.eventToggle({ event, value: true, delayed: true });
  }

  @Listen("mouseleave", { capture: true })
  mouseLeaveHide(event: MouseEvent): void {
    this.eventToggle({ event, value: false, delayed: true });
  }

  @Listen("focus", { capture: true })
  focusShow(event: Event): void {
    this.eventToggle({ event, value: true, delayed: false });
  }

  @Listen("blur", { capture: true })
  blurHide(event: Event): void {
    this.eventToggle({ event, value: false, delayed: false });
  }
}
