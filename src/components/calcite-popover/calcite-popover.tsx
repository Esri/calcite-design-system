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
import { x16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";

/**
 * @slot image - A slot for adding an image. The image will appear above the other slot content.
 */

@Component({
  tag: "calcite-popover",
  styleUrl: "calcite-popover.scss",
  shadow: true
})
export class CalcitePopover {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Adds a click handler to the referenceElement to toggle open the Popover.
   */
  @Prop({ reflect: true }) addClickHandle = false;

  @Watch("addClickHandle")
  interactionElementHandler() {
    this.removeReferenceListener();
    this.addReferenceListener();
  }

  /**
   * Display a close button within the Popover.
   */
  @Prop({ reflect: true }) closeButton = false;

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
   * horizontal: Positioned to the left or right of the referenceElement.
   * vertical: Positioned above or below the referenceElement.
   */
  @Prop({ reflect: true }) placement: "horizontal" | "vertical" = "horizontal";

  @Watch("placement")
  placementHandler() {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property.
   */
  @Prop() referenceElement: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler() {
    this.removeReferenceListener();
    this._referenceElement = this.getReferenceElement();
    this.addReferenceListener();
    this.destroyPopper();
    this.reposition();
  }

  /**
   * Offset the position of the popover in the horizontal direction.
   */
  @Prop({ reflect: true }) xOffset = 0;

  @Watch("xOffset")
  xOffsetHandler() {
    this.reposition();
  }

  /**
   * Offset the position of the popover in the vertical direction.
   */
  @Prop({ reflect: true }) yOffset = 0;

  @Watch("yOffset")
  yOffsetHandler() {
    this.reposition();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverElement;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  popper: Popper;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.reposition();
    this.addReferenceListener();
  }

  componentDidUnload() {
    this.removeReferenceListener();
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

  clickHandler = (): void => {
    this.toggle();
  };

  addReferenceListener = (): void => {
    const { _referenceElement, addClickHandle } = this;

    if (!_referenceElement || !addClickHandle) {
      return;
    }

    _referenceElement.addEventListener("click", this.clickHandler);
  };

  removeReferenceListener = (): void => {
    const { _referenceElement } = this;

    if (!_referenceElement) {
      return;
    }

    _referenceElement.removeEventListener("click", this.clickHandler);
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement } = this;

    return (
      (typeof referenceElement === "string"
        ? document.getElementById(referenceElement)
        : referenceElement) || null
    );
  }

  getPlacement(): Popper.Placement {
    return this.placement === "vertical" ? "bottom-start" : "auto-start";
  }

  getModifiers(): Popper.Modifiers {
    const { xOffset, yOffset } = this;
    const offsetEnabled = !!(yOffset || xOffset);
    const offset = `${yOffset}, ${xOffset}`;

    return {
      hide: {
        enabled: false
      },
      offset: {
        enabled: offsetEnabled,
        offset
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
      placement: this.getPlacement(),
      modifiers: this.getModifiers(),
      onCreate: data => {
        if (
          data.originalPlacement === "bottom-start" &&
          document.body.clientWidth &&
          data.offsets &&
          data.offsets.reference &&
          data.offsets.reference.left > document.body.clientWidth / 2
        ) {
          data.instance.options.placement = "bottom-end";
          data.instance.scheduleUpdate();
        }
      }
    });

    window.addEventListener("resize", newPopper.scheduleUpdate, {
      passive: true
    });

    this.popper = newPopper;
  }

  updatePopper(popper: Popper): void {
    popper.options.placement = this.getPlacement();
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

  hide = (): void => {
    this.open = false;
  };

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
    const { closeButton } = this;

    return closeButton ? (
      <button class={CSS.closeButton} onClick={this.hide}>
        <CalciteIcon size="16" path={x16} />
      </button>
    ) : null;
  }

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
          {this.renderCloseButton()}
          {this.renderImage()}
          <div class={CSS.content}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
