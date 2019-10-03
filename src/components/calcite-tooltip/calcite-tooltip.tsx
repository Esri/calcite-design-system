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
import { VNode } from "@stencil/state-tunnel/dist/types/stencil.core";

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
   * @todo document.
   */
  @Prop({ reflect: true }) image: string;

  /**
   * @todo document.
   */
  @Prop({ reflect: true }) interaction: "hover" | "click" = "hover";

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

  /**
   * @todo document.
   */
  @Prop({ reflect: true }) text: string;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

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

    this.removeReferenceListeners();
    this.addReferenceListeners();

    popper ? this.updatePopper(popper) : this.createPopper();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  addReferenceListeners = (): void => {
    if (this.interaction === "click") {
      this._referenceElement.addEventListener("click", this.toggle);
    }

    if (this.interaction === "hover") {
      this._referenceElement.addEventListener("mouseenter", this.show);
      this._referenceElement.addEventListener("mouseleave", this.hide);
      this._referenceElement.addEventListener("focus", this.show);
      this._referenceElement.addEventListener("blur", this.hide);
    }
  };

  removeReferenceListeners = (): void => {
    this._referenceElement.removeEventListener("click", this.toggle);
    this._referenceElement.removeEventListener("mouseenter", this.show);
    this._referenceElement.removeEventListener("mouseleave", this.hide);
    this._referenceElement.removeEventListener("focus", this.show);
    this._referenceElement.removeEventListener("blur", this.hide);
  };

  toggle = (): void => {
    this.open = !this.open;
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

  renderImage(): VNode {
    const { image, text } = this;

    return image ? <img class={CSS.image} alt={text} src={image} /> : null;
  }

  renderCloseButton(): VNode {
    const { interaction } = this;

    return interaction === "click" ? <button /> : null;
  }

  render() {
    const { _referenceElement, open, text } = this;

    return (
      <Host>
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: _referenceElement && open
          }}
        >
          {this.renderImage()}
          {this.renderCloseButton()}
          {text}
          <slot />
        </div>
      </Host>
    );
  }
}
