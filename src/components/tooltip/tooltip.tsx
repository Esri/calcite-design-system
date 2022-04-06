import { Component, Element, Host, Method, Prop, State, Watch, h, VNode } from "@stencil/core";
import { CSS, TOOLTIP_REFERENCE, ARIA_DESCRIBED_BY, TOOLTIP_DELAY_MS } from "./resources";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import {
  PopperPlacement,
  defaultOffsetDistance,
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning
} from "../../utils/popper";
import { queryElementRoots } from "../../utils/dom";

class TooltipManagerSingleton {
  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      const referenceEl = event.currentTarget as HTMLElement;
      const tooltipEl = this.registeredElements.get(referenceEl);

      if (tooltipEl) {
        this.clearHoverTimeout(tooltipEl);
        this.toggleTooltip(referenceEl, tooltipEl, false);
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
    const clickedTooltip = this.registeredElements.get(referenceEl);

    this.clickedTooltip = clickedTooltip;

    if (clickedTooltip) {
      this.toggleTooltip(referenceEl, clickedTooltip, false);
    }
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

  /**
   * CSS Selector to match reference elements for tooltips. Reference elements will be identified by this selector in order to open their associated tooltip.
   * @default `[data-calcite-tooltip-reference]`
   */
  selector = `[${TOOLTIP_REFERENCE}]`;

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
    referenceEl.addEventListener("keydown", this.keyDownHandler);
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
    referenceEl.removeEventListener("keydown", this.keyDownHandler);
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

  private focusTooltip(
    referenceEl: HTMLElement,
    tooltip: HTMLCalciteTooltipElement,
    value: boolean
  ): void {
    this.closeExistingTooltip(referenceEl);

    if (value) {
      this.clearHoverTimeout(tooltip);
    }

    this.toggleTooltip(referenceEl, tooltip, value);
  }

  private toggleTooltip(
    referenceEl: HTMLElement,
    tooltip: HTMLCalciteTooltipElement,
    value: boolean
  ): void {
    tooltip.open = value;

    if (value) {
      this.activeTooltipEl = tooltip;
      this.addOpenListeners(referenceEl);
      this.removeClosedListeners(referenceEl);
    } else {
      this.addClosedListeners(referenceEl);
      this.removeOpenListeners(referenceEl);
    }
  }

  private hoverToggle = (
    referenceEl: HTMLElement,
    tooltip: HTMLCalciteTooltipElement,
    value: boolean
  ): void => {
    const { hoverTimeouts } = this;

    hoverTimeouts.delete(tooltip);

    if (value) {
      this.closeExistingTooltip(referenceEl);
    }

    this.toggleTooltip(referenceEl, tooltip, value);
  };

  private hoverTooltip(
    referenceEl: HTMLElement,
    tooltip: HTMLCalciteTooltipElement,
    value: boolean
  ): void {
    this.clearHoverTimeout(tooltip);

    const { hoverTimeouts } = this;

    const timeoutId = window.setTimeout(() => {
      const willOpenAndStillHovered =
        (value && referenceEl.matches(":hover")) || tooltip.matches(":hover");

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

const manager = new TooltipManagerSingleton();

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true
})
export class Tooltip {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Accessible name for the component */
  @Prop() label!: string;

  /**
   * Offset the position of the tooltip away from the reference element.
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition();
  }

  /**
   * Offset the position of the tooltip along the reference element.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition();
  }

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    if (value) {
      this.launchTooltip();
    } else {
      this.destroyPopper();
    }
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
   */
  @Prop() referenceElement: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.setUpReferenceElement();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipElement;

  @State() effectiveReferenceElement: HTMLElement;

  arrowEl: HTMLDivElement;

  popper: Popper;

  guid = `calcite-tooltip-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    this.setUpReferenceElement();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    this.removeReferences();
    this.destroyPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { popper, el, open, placement } = this;

    if (!open || !popper) {
      return;
    }

    const modifiers = this.getModifiers();

    await updatePopper({
      el,
      modifiers,
      placement,
      popper
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  launchTooltip(): void {
    this.createPopper();
  }

  setUpReferenceElement = (): void => {
    this.removeReferences();

    if (
      !this.effectiveReferenceElement ||
      (typeof this.referenceElement === "string" &&
        !this.effectiveReferenceElement.matches(`#${this.referenceElement}`)) ||
      this.effectiveReferenceElement !== this.referenceElement
    ) {
      this.effectiveReferenceElement = this.getReferenceElement();
    }

    const { el, referenceElement, effectiveReferenceElement } = this;
    if (referenceElement && !effectiveReferenceElement) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el
      });
    }

    this.addReferences();
  };

  getId = (): string => {
    return this.el.id || this.guid;
  };

  addReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    const id = this.getId();

    effectiveReferenceElement.setAttribute(TOOLTIP_REFERENCE, id);
    effectiveReferenceElement.setAttribute(ARIA_DESCRIBED_BY, id);

    manager.registerElement(effectiveReferenceElement, this.el);
  };

  removeReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    effectiveReferenceElement.removeAttribute(TOOLTIP_REFERENCE);
    effectiveReferenceElement.removeAttribute(ARIA_DESCRIBED_BY);

    manager.unregisterElement(effectiveReferenceElement);
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement, el } = this;

    return (
      (typeof referenceElement === "string"
        ? queryElementRoots(el, { id: referenceElement })
        : referenceElement) || null
    );
  }

  getModifiers(): Partial<StrictModifiers>[] {
    const { arrowEl, offsetDistance, offsetSkidding } = this;

    const arrowModifier: Partial<StrictModifiers> = {
      name: "arrow",
      enabled: true,
      options: {
        element: arrowEl
      }
    };

    const offsetModifier: Partial<StrictModifiers> = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };

    const eventListenerModifier: Partial<StrictModifiers> = {
      name: "eventListeners",
      enabled: this.open
    };

    return [arrowModifier, offsetModifier, eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();

    const { el, placement, effectiveReferenceElement: referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el,
      modifiers,
      placement,
      overlayPositioning,
      referenceEl
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { effectiveReferenceElement, label, open } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;

    return (
      <Host
        aria-hidden={hidden.toString()}
        aria-label={label}
        calcite-hydrated-hidden={hidden}
        id={this.getId()}
        role="tooltip"
      >
        <div
          class={{
            [PopperCSS.animation]: true,
            [PopperCSS.animationActive]: displayed
          }}
        >
          <div class={CSS.arrow} ref={(arrowEl) => (this.arrowEl = arrowEl)} />
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
