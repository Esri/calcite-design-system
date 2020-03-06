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
  CalcitePlacement,
  defaultOffsetDistance,
  createPopper,
  updatePopper
} from "../../utils/popper";
import { Modifier, Placement, Instance as Popper } from "@popperjs/core";
import { VNode } from "@stencil/core/internal/stencil-core";
import { guid } from "../../utils/guid";
import { HOST_CSS } from "../../utils/dom";

type FocusId = "close-button";

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
   * Prevents flipping the popover's placement when it starts to overlap its reference element.
   */
  @Prop({ reflect: true }) disableFlip = false;

  /**
   * Removes the caret pointer.
   */
  @Prop({ reflect: true }) disablePointer = false;

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: Placement[];

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
    this.createPopper();
  }

  /** Text for close button. */
  @Prop() textClose = "Close";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverElement;

  @State() _referenceElement: HTMLElement = this.getReferenceElement();

  popper: Popper;

  arrowEl: HTMLDivElement;

  closeButtonEl: HTMLButtonElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad() {
    this.createPopper();
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

  @Method()
  async setFocus(focusId?: FocusId) {
    if (focusId === "close-button") {
      this.closeButtonEl?.focus();
      return;
    }

    this.el?.focus();
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

  getModifiers(): Partial<Modifier<any>>[] {
    const {
      arrowEl,
      flipPlacements,
      disableFlip,
      disablePointer,
      offsetDistance,
      offsetSkidding
    } = this;
    const flipModifier: Partial<Modifier<any>> = {
      name: "flip",
      enabled: !disableFlip
    };

    if (flipPlacements) {
      flipModifier.options = {
        fallbackPlacements: flipPlacements
      };
    }

    const arrowModifier: Partial<Modifier<any>> = {
      name: "arrow",
      enabled: !disablePointer
    };

    if (arrowEl) {
      arrowModifier.options = {
        element: arrowEl
      };
    }

    const offsetModifier: Partial<Modifier<any>> = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };

    return [arrowModifier, flipModifier, offsetModifier];
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
        ref={closeButtonEl => (this.closeButtonEl = closeButtonEl)}
        aria-label={textClose}
        title={textClose}
        class={{ [CSS.closeButton]: true }}
        onClick={this.hide}
      >
        <calcite-icon icon="x" scale="s"></calcite-icon>
      </button>
    ) : null;
  }

  render() {
    const { _referenceElement, open, disablePointer } = this;
    const displayed = _referenceElement && open;
    const arrowNode = !disablePointer ? (
      <div class={CSS.arrow} ref={arrowEl => (this.arrowEl = arrowEl)}></div>
    ) : null;

    return (
      <Host
        role="dialog"
        class={{
          [HOST_CSS.hydratedInvisible]: !displayed
        }}
        aria-hidden={!displayed ? "true" : "false"}
        id={this.getId()}
      >
        {arrowNode}
        <div class={CSS.container}>
          {this.renderImage()}
          <div class={CSS.content}>
            <slot />
            {this.renderCloseButton()}
          </div>
        </div>
      </Host>
    );
  }
}
