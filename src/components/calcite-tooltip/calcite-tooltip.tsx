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
import Popper from "popper.js";
import { guid } from "../../utils/guid";
import { CalcitePlacement, getPlacement } from "../../utils/popper";

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
   * Display and position the component.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(open: boolean) {
    if (open) {
      this.reposition();
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
    this.destroyPopper();
    this.reposition();
  }

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipElement;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  popper: Popper;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.addReferenceListeners();
    this.addReferenceAria();
    this.reposition();
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
    const { popper } = this;

    popper ? this.updatePopper(popper) : this.createPopper();
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

  getModifiers(): Popper.Modifiers {
    return {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    };
  }

  createPopper(): void {
    const { _referenceElement, el, open, placement } = this;

    if (!_referenceElement || !open) {
      return;
    }

    const newPopper = new Popper(_referenceElement, el, {
      eventsEnabled: false,
      placement: getPlacement(el, placement),
      modifiers: this.getModifiers()
    });

    window.addEventListener("resize", newPopper.scheduleUpdate, {
      passive: true
    });

    this.popper = newPopper;
  }

  updatePopper(popper: Popper): void {
    popper.options.placement = getPlacement(this.el, this.placement);
    popper.options.modifiers = {
      ...popper.options.modifiers,
      ...this.getModifiers()
    };
    popper.scheduleUpdate();
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      window.removeEventListener("resize", popper.scheduleUpdate);
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
        aria-hidden={!displayed ? "true" : "false"}
        id={this.getId()}
      >
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: displayed
          }}
        >
          <div class={CSS.contentContainer}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
