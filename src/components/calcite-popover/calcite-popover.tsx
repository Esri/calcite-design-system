import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h
} from "@stencil/core";
import { CSS } from "./resources";
import {
  CalciteFlipPlacements,
  CalcitePlacement,
  getPlacement
} from "../../utils/popper";
import Popper from "popper.js";
import { VNode } from "@stencil/state-tunnel/dist/types/stencil.core";
import { x16 } from "@esri/calcite-ui-icons";
import CalciteIcon from "../../utils/CalciteIcon";
import { guid } from "../../utils/guid";

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
   *  HTMLElement Used to position this component within the a boundary.
   */
  @Prop() boundariesElement?: HTMLElement | string;

  @Watch("boundariesElement")
  boundariesElementHandler() {
    this._boundariesElement = this.getBoundariesElement();
    this.destroyPopper();
    this.reposition();
  }

  /**
   * Prevents flipping the popover's placement when it starts to overlap its reference element.
   */
  @Prop({ reflect: true }) disableFlip = false;

  /**
   * Removes the caret pointer.
   */
  @Prop({ reflect: true }) disablePointer = false;

  /**
   * Makes the popover flow toward the inner of the reference element.
   */
  @Prop({ reflect: true }) flowInner = false;

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: CalciteFlipPlacements;

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(open: boolean) {
    if (open) {
      this.reposition();
      this.calcitePopoverOpen.emit();
    } else {
      this.destroyPopper();
      this.calcitePopoverClose.emit();
    }
  }

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: CalcitePlacement = "auto";

  @Watch("placement")
  placementHandler() {
    this.destroyPopper();
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property.
   */
  @Prop() referenceElement!: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler() {
    this.removeReferenceListener();
    this._referenceElement = this.getReferenceElement();
    this.addReferenceListener();
    this.addReferenceAria();
    this.destroyPopper();
    this.reposition();
  }

  /** Text for close button. */
  @Prop() textClose = "Close";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /**
   * Offset the position of the popover in the horizontal direction.
   */
  @Prop({ reflect: true }) xOffset = 0;

  @Watch("xOffset")
  xOffsetHandler() {
    this.destroyPopper();
    this.reposition();
  }

  /**
   * Offset the position of the popover in the vertical direction.
   */
  @Prop({ reflect: true }) yOffset = 0;

  @Watch("yOffset")
  yOffsetHandler() {
    this.destroyPopper();
    this.reposition();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverElement;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  @State() _boundariesElement: HTMLElement = this.getBoundariesElement();

  popper: Popper;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.reposition();
    this.addReferenceListener();
    this.addReferenceAria();
  }

  componentDidUnload() {
    this.removeReferenceListener();
    this.destroyPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  /** Fired when the popover is closed */
  @Event() calcitePopoverClose: EventEmitter;
  /** Fired when the popover is opened */
  @Event() calcitePopoverOpen: EventEmitter;

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

  getId = (): string => {
    return this.el.id || `calcite-popover-${guid()}`;
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

  getBoundariesElement(): HTMLElement {
    const { boundariesElement } = this;

    return (
      (typeof boundariesElement === "string"
        ? document.getElementById(boundariesElement)
        : boundariesElement) || null
    );
  }

  getModifiers(): Popper.Modifiers {
    const verticalRE = /top|bottom/gi;
    const autoRE = /auto/gi;
    const {
      _boundariesElement,
      disableFlip,
      flipPlacements,
      flowInner,
      placement,
      xOffset,
      yOffset
    } = this;
    const offsetEnabled = !!(yOffset || xOffset) && !autoRE.test(placement);
    const offsets = [yOffset, xOffset];

    if (verticalRE.test(placement)) {
      offsets.reverse();
    }

    return {
      preventOverflow: {
        enabled: true,
        boundariesElement: _boundariesElement || "viewport",
        escapeWithReference: true
      },
      flip: {
        enabled: !disableFlip,
        boundariesElement: _boundariesElement || "viewport",
        flipVariationsByContent: true,
        behavior: flipPlacements || "flip"
      },
      inner: {
        enabled: flowInner
      },
      offset: {
        enabled: !!offsetEnabled,
        offset: offsets.join(",")
      }
    };
  }

  createPopper(): void {
    const { el, open, placement, _referenceElement } = this;

    if (!_referenceElement || !open) {
      return;
    }

    const newPopper = new Popper(_referenceElement, el, {
      placement: getPlacement(el, placement),
      modifiers: this.getModifiers()
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
    return this.el.querySelector("[slot=image]") ? (
      <div class={CSS.imageContainer}>
        <slot name="image" />
      </div>
    ) : null;
  }

  renderCloseButton(): VNode {
    const { closeButton, textClose } = this;

    return closeButton ? (
      <button
        aria-label={textClose}
        title={textClose}
        class={{ [CSS.closeButton]: true }}
        onClick={this.hide}
      >
        <CalciteIcon size="16" path={x16} />
      </button>
    ) : null;
  }

  render() {
    const { _referenceElement, open, disablePointer } = this;
    const displayed = _referenceElement && open;

    return (
      <Host
        role="dialog"
        aria-hidden={!displayed ? "true" : "false"}
        id={this.getId()}
      >
        <div
          class={{
            [CSS.container]: true,
            [CSS.containerOpen]: displayed,
            [CSS.containerPointer]: !disablePointer
          }}
        >
          <div class={CSS.contentContainer}>
            {this.renderImage()}
            <div class={CSS.content}>
              <slot />
              {this.renderCloseButton()}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
