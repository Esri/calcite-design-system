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
import { CSS, TooltipInteraction, TooltipPlacement } from "./resources";
import Popper from "popper.js";
import { VNode } from "@stencil/state-tunnel/dist/types/stencil.core";
import { x16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";

/**
 * @slot image - A slot for adding an image. The image will appear above the text.
 */
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
   * Defines the way the user will interact with the tooltip.
   * 'click' - Displays the tooltip on first click and hides on second click. Also provides the user with a close button within the tooltip.
   * 'hover' - Displays the tooltip on mousover and hides on mouseout and displays the tooltip on focus and hides the tooltip on blur.
   */
  @Prop({ reflect: true }) interaction: TooltipInteraction = "hover";

  @Watch("interaction")
  interactionElementHandler(
    newValue: TooltipInteraction,
    oldValue: TooltipInteraction
  ) {
    this.removeReferenceListeners(oldValue);
    this.addReferenceListeners(newValue);
  }

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
  @Prop({ reflect: true }) placement: TooltipPlacement = "auto";

  @Watch("placement")
  placementHandler() {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component.
   */
  @Prop() referenceElement: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler() {
    this.removeReferenceListeners();
    this._referenceElement = this.getReferenceElement();
    this.addReferenceListeners();
    this.destroyPopper();
    this.reposition();
  }

  /**
   * Tooltip text value to display.
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

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  popper: Popper;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.addReferenceListeners();
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

  addReferenceListeners = (
    interaction: TooltipInteraction = this.interaction
  ): void => {
    const { _referenceElement } = this;

    if (!_referenceElement || !interaction) {
      return;
    }

    if (interaction === "click") {
      _referenceElement.addEventListener("click", this.toggle);
    }

    if (interaction === "hover") {
      _referenceElement.addEventListener("mouseenter", this.show);
      _referenceElement.addEventListener("mouseleave", this.hide);
      _referenceElement.addEventListener("focus", this.show);
      _referenceElement.addEventListener("blur", this.hide);
    }
  };

  removeReferenceListeners = (
    interaction: TooltipInteraction = this.interaction
  ): void => {
    const { _referenceElement } = this;

    if (!_referenceElement || !interaction) {
      return;
    }

    if (interaction === "click") {
      _referenceElement.removeEventListener("click", this.toggle);
    }

    if (interaction === "hover") {
      _referenceElement.removeEventListener("mouseenter", this.show);
      _referenceElement.removeEventListener("mouseleave", this.hide);
      _referenceElement.removeEventListener("focus", this.show);
      _referenceElement.removeEventListener("blur", this.hide);
    }
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
    const { _referenceElement, el, open, placement } = this;

    if (!_referenceElement || !open) {
      return;
    }

    const newPopper = new Popper(_referenceElement, el, {
      eventsEnabled: false,
      placement,
      modifiers: this.getModifiers()
    });

    window.addEventListener("resize", newPopper.scheduleUpdate, {
      passive: true
    });

    this.popper = newPopper;
  }

  updatePopper(popper: Popper): void {
    popper.options.placement = this.placement;
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
    const slottedImage = this.el.querySelector("[slot=image]");

    return slottedImage ? (
      <div class={CSS.imageContainer}>
        <slot name="image" />
      </div>
    ) : null;
  }

  renderCloseButton(): VNode {
    const { interaction } = this;

    return interaction === "click" ? (
      <button class={CSS.closeButton} onClick={this.hide}>
        <CalciteIcon size="16" path={x16} />
      </button>
    ) : null;
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
          <div class={CSS.message}>
            {this.renderCloseButton()}
            <div class={{ [CSS.content]: true, [CSS.contentFont]: true }}>
              {text}
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
