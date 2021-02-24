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
  h,
  VNode
} from "@stencil/core";
import { CSS, ARIA_CONTROLS, ARIA_EXPANDED, POPOVER_REFERENCE, TEXT } from "./resources";
import {
  PopperPlacement,
  defaultOffsetDistance,
  createPopper,
  updatePopper,
  CSS as PopperCSS
} from "../../utils/popper";
import { StrictModifiers, Placement, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import { Theme } from "../interfaces";
import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";

export type FocusId = "close-button";

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

  /** Accessible name for the component */
  @Prop() label!: string;

  /**
   * Offset the position of the popover away from the reference element.
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition();
  }

  /**
   * Offset the position of the popover along the reference element.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition();
  }

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(open: boolean): void {
    this.reposition();
    this.setExpandedAttr();
    if (open) {
      this.calcitePopoverOpen.emit();
    } else {
      this.calcitePopoverClose.emit();
    }
  }

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property.
   */
  @Prop() referenceElement!: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.removeReferences();
    this._referenceElement = this.getReferenceElement();
    this.addReferences();
    this.createPopper();
  }

  /** Text for close button. */
  @Prop() intlClose = TEXT.close;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

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

  guid = `calcite-popover-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad(): void {
    this.createPopper();
    this.addReferences();
  }

  disconnectedCallback(): void {
    this.removeReferences();
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

  @Method()
  async reposition(): Promise<void> {
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
  async setFocus(focusId?: FocusId): Promise<void> {
    if (focusId === "close-button") {
      this.closeButtonEl?.focus();
      return;
    }

    this.el?.focus();
  }

  @Method()
  async toggle(value = !this.open): Promise<void> {
    this.open = value;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getId = (): string => {
    return this.el.id || this.guid;
  };

  setExpandedAttr = (): void => {
    const { _referenceElement, open } = this;

    if (!_referenceElement) {
      return;
    }

    _referenceElement.setAttribute(ARIA_EXPANDED, open.toString());
  };

  addReferences = (): void => {
    const { _referenceElement } = this;

    if (!_referenceElement) {
      return;
    }

    const id = this.getId();

    _referenceElement.setAttribute(POPOVER_REFERENCE, id);
    _referenceElement.setAttribute(ARIA_CONTROLS, id);
    this.setExpandedAttr();
  };

  removeReferences = (): void => {
    const { _referenceElement } = this;

    if (!_referenceElement) {
      return;
    }

    _referenceElement.removeAttribute(POPOVER_REFERENCE);
    _referenceElement.removeAttribute(ARIA_CONTROLS);
    _referenceElement.removeAttribute(ARIA_EXPANDED);
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement } = this;

    return (
      (typeof referenceElement === "string"
        ? document.getElementById(referenceElement)
        : referenceElement) || null
    );
  }

  getModifiers(): Partial<StrictModifiers>[] {
    const {
      arrowEl,
      flipPlacements,
      disableFlip,
      disablePointer,
      offsetDistance,
      offsetSkidding
    } = this;
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: !disableFlip
    };

    if (flipPlacements) {
      flipModifier.options = {
        fallbackPlacements: flipPlacements
      };
    }

    const arrowModifier: Partial<StrictModifiers> = {
      name: "arrow",
      enabled: !disablePointer
    };

    if (arrowEl) {
      arrowModifier.options = {
        element: arrowEl
      };
    }

    const offsetModifier: Partial<StrictModifiers> = {
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
    const { el, placement, _referenceElement: referenceEl } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el,
      modifiers,
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
    const { closeButton, intlClose } = this;

    return closeButton ? (
      <button
        aria-label={intlClose}
        class={{ [CSS.closeButton]: true }}
        onClick={this.hide}
        ref={(closeButtonEl) => (this.closeButtonEl = closeButtonEl)}
        title={intlClose}
      >
        <calcite-icon icon="x" scale="m" />
      </button>
    ) : null;
  }

  render(): VNode {
    const { _referenceElement, el, label, open, disablePointer } = this;
    const rtl = getElementDir(el) === "rtl";
    const displayed = _referenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? (
      <div class={CSS.arrow} ref={(arrowEl) => (this.arrowEl = arrowEl)} />
    ) : null;

    return (
      <Host
        aria-hidden={hidden.toString()}
        aria-label={label}
        calcite-hydrated-hidden={hidden}
        id={this.getId()}
        role="dialog"
      >
        <div
          class={{
            [CSS_UTILITY.rtl]: rtl,
            [PopperCSS.animation]: true,
            [PopperCSS.animationActive]: displayed
          }}
        >
          {arrowNode}
          <div class={CSS.container}>
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
