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
   * Reference HTMLElement used to position this component.
   */
  @Prop() referenceElement: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler() {
    this._referenceElement = this.getReferenceElement();
    this.destroyPopper();
    this.reposition();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipElement;

  @State() popper: Popper;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.reposition();
  }

  componentDidUnload() {
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

  @Method() async toggle(): Promise<void> {
    this.open = !this.open;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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
      hide: {
        enabled: false
      },
      preventOverflow: {
        enabled: false
      }
    };
  }

  createPopper(): void {
    const { el, open, _referenceElement } = this;

    if (!_referenceElement || !open) {
      return;
    }

    const newPopper = new Popper(_referenceElement, el, {
      eventsEnabled: false,
      placement: "auto",
      modifiers: this.getModifiers()
    });

    window.addEventListener("resize", newPopper.scheduleUpdate, {
      passive: true
    });

    this.popper = newPopper;
  }

  updatePopper(popper: Popper): void {
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

    return (
      <Host>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: _referenceElement && open
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
