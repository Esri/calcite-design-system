import {
  Component,
  Element,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h
} from "@stencil/core";
import { CSS } from "./resources";
import { Modifier, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import {
  CalcitePlacement,
  defaultOffsetDistance,
  createPopper,
  updatePopper
} from "../../utils/popper";
import { HOST_CSS } from "../../utils/dom";

@Component({
  tag: "calcite-tooltip",
  styleUrl: "calcite-tooltip.scss",
  shadow: true
})
export class CalciteTooltip {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Offset the position of the popover away from the reference element.
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler() {
    this.reposition();
  }

  /**
   * Offset the position of the popover along the reference element.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler() {
    this.reposition();
  }

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(open: boolean) {
    if (open) {
      this.createPopper();
    } else {
      this.destroyPopper();
    }
  }

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: CalcitePlacement = "auto";

  @Watch("placement")
  placementHandler() {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component.
   */
  @Prop() referenceElement!: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler() {
    this.removeReferenceListeners();
    this._referenceElement = this.getReferenceElement();
    this.addReferenceListeners();
    this.addReferenceAria();
    this.createPopper();
  }

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipElement;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  arrowEl: HTMLDivElement;

  popper: Popper;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.addReferenceListeners();
    this.addReferenceAria();
    this.createPopper();
  }

  componentDidUnload() {
    this.removeReferenceListeners();
    this.destroyPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method() async reposition(): Promise<void> {
    const { popper, el, placement } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
          el,
          modifiers,
          placement,
          popper
        })
      : this.createPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getId = (): string => {
    return this.el.id || `calcite-tooltip-${guid()}`;
  };

  addReferenceAria = (): void => {
    const { _referenceElement } = this;

    if (
      _referenceElement &&
      !_referenceElement.hasAttribute("aria-describedby")
    ) {
      _referenceElement.setAttribute("aria-describedby", this.getId());
    }
  };

  addReferenceListeners = (): void => {
    const { _referenceElement } = this;

    if (!_referenceElement) {
      return;
    }

    _referenceElement.addEventListener("mouseenter", this.show);
    _referenceElement.addEventListener("mouseleave", this.hide);
    _referenceElement.addEventListener("focus", this.show);
    _referenceElement.addEventListener("blur", this.hide);
  };

  removeReferenceListeners = (): void => {
    const { _referenceElement } = this;

    if (!_referenceElement) {
      return;
    }

    _referenceElement.removeEventListener("mouseenter", this.show);
    _referenceElement.removeEventListener("mouseleave", this.hide);
    _referenceElement.removeEventListener("focus", this.show);
    _referenceElement.removeEventListener("blur", this.hide);
  };

  show = (): void => {
    this.open = true;
  };

  hide = (): void => {
    this.open = false;
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement } = this;

    return (
      (typeof referenceElement === "string"
        ? document.getElementById(referenceElement)
        : referenceElement) || null
    );
  }

  getModifiers(): Partial<Modifier<any>>[] {
    const { arrowEl, offsetDistance, offsetSkidding } = this;

    const arrowModifier: Partial<Modifier<any>> = {
      name: "arrow",
      enabled: true,
      options: {
        element: arrowEl
      }
    };

    const offsetModifier: Partial<Modifier<any>> = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };

    return [arrowModifier, offsetModifier];
  }

  createPopper(): void {
    this.destroyPopper();

    const { el, open, placement, _referenceElement: referenceEl } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el,
      modifiers,
      open,
      placement,
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

  render() {
    const { _referenceElement, open } = this;
    const displayed = _referenceElement && open;

    return (
      <Host
        role="tooltip"
        class={{
          [HOST_CSS.hydratedInvisible]: !displayed
        }}
        aria-hidden={!displayed ? "true" : "false"}
        id={this.getId()}
      >
        <div class={CSS.arrow} ref={arrowEl => (this.arrowEl = arrowEl)}></div>
        <div class={CSS.container}>
          <slot />
        </div>
      </Host>
    );
  }
}
