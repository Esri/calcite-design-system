import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
  VNode
} from "@stencil/core";
import {
  CSS,
  ARIA_CONTROLS,
  ARIA_EXPANDED,
  HEADING_LEVEL,
  TEXT,
  defaultPopoverPlacement
} from "./resources";
import {
  PopperPlacement,
  defaultOffsetDistance,
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning,
  ComputedPlacement,
  filterComputedPlacements,
  ReferenceElement
} from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import { queryElementRoots, toAriaBoolean } from "../../utils/dom";
import { OpenCloseComponent } from "../../utils/openCloseComponent";
import { HeadingLevel, Heading } from "../functional/Heading";

import PopoverManager from "./PopoverManager";

const manager = new PopoverManager();

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-popover",
  styleUrl: "popover.scss",
  shadow: true
})
export class Popover implements OpenCloseComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true and clicking outside of the component, automatically closes open `calcite-popover`s.
   */
  @Prop({ reflect: true }) autoClose = false;

  /**
   * When true, a close button is added to the component.
   *
   * @deprecated use dismissible instead.
   */
  @Prop({ reflect: true }) closeButton = false;

  /**
   * When true, a close button is added to the component.
   *
   * @deprecated use closable instead
   */
  @Prop({ reflect: true }) dismissible = false;

  /** When true, display a close button within the Popover */
  @Prop({ reflect: true }) closable = false;

  /**
   * When true, prevents flipping the component's placement when overlapping its `referenceElement`.
   */
  @Prop({ reflect: true }) disableFlip = false;

  /**
   * When true, removes the caret pointer.
   */
  @Prop({ reflect: true }) disablePointer = false;

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: ComputedPlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
  }

  /**
   * The component header text.
   */
  @Prop() heading?: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /**
   * Offsets the position of the popover away from the `referenceElement`.
   *
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition();
  }

  /**
   * Offsets the position of the popover along the `referenceElement`.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition();
  }

  /**
   * When true, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    this.reposition();
    this.setExpandedAttr();
  }

  /** Describes the positioning type to use for the overlaid content. If the element is in a fixed container, use the "fixed" value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   *
   * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
   */
  @Prop({ reflect: true }) placement: PopperPlacement = defaultPopoverPlacement;

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /**
   *  The `referenceElement` used to position the component according to its "placement" value. Setting to an `HTMLElement` is preferred so the component does not need to query the DOM. However, a string `id` of the reference element can also be used.
   */
  @Prop() referenceElement!: ReferenceElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.setUpReferenceElement();
  }

  /**
   * When true, disables automatically toggling the component when its `referenceElement` has been triggered. This property can be set to "true" to manage when a popover is open.
   */
  @Prop({ reflect: true }) triggerDisabled = false;

  /**
   * Accessible name for the component's close button.
   *
   * @default "Close"
   */
  @Prop() intlClose = TEXT.close;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  filteredFlipPlacements: ComputedPlacement[];

  @Element() el: HTMLCalcitePopoverElement;

  @State() effectiveReferenceElement: ReferenceElement;

  popper: Popper;

  arrowEl: HTMLDivElement;

  closeButtonEl: HTMLCalciteActionElement;

  guid = `calcite-popover-${guid()}`;

  private activeTransitionProp = "opacity";

  private containerEl: HTMLDivElement;

  private setContainerEl = (el): void => {
    this.containerEl = el;
    this.containerEl.addEventListener("transitionstart", this.transitionStartHandler);
  };

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.setFilteredPlacements();
  }

  componentWillLoad(): void {
    this.setUpReferenceElement();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    this.containerEl?.removeEventListener("transitionstart", this.transitionStartHandler);
    this.removeReferences();
    this.destroyPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /* Fires when the component is requested to be closed and before the closing transition begins. */
  @Event() calcitePopoverBeforeClose: EventEmitter<void>;

  /* Fires when the component is closed and animation is complete. */
  @Event() calcitePopoverClose: EventEmitter<void>;

  /* Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event() calcitePopoverBeforeOpen: EventEmitter<void>;

  /* Fires when the component is open and animation is complete. */
  @Event() calcitePopoverOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { popper, el, placement } = this;
    const modifiers = this.getModifiers();

    popper
      ? await updatePopper({
          el,
          modifiers,
          placement,
          popper
        })
      : this.createPopper();
  }

  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  @Method()
  async setFocus(focusId?: "close-button"): Promise<void> {
    const { closeButtonEl } = this;

    if (focusId === "close-button" && closeButtonEl) {
      forceUpdate(closeButtonEl);
      closeButtonEl.setFocus();

      return;
    }

    this.el?.focus();
  }

  /**
   * Toggles the component's open property.
   *
   * @param value
   */
  @Method()
  async toggle(value = !this.open): Promise<void> {
    this.open = value;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  setUpReferenceElement = (): void => {
    this.removeReferences();
    this.effectiveReferenceElement = this.getReferenceElement();

    const { el, referenceElement, effectiveReferenceElement } = this;
    if (referenceElement && !effectiveReferenceElement) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el
      });
    }

    this.addReferences();
    this.createPopper();
  };

  getId = (): string => {
    return this.el.id || this.guid;
  };

  setExpandedAttr = (): void => {
    const { effectiveReferenceElement, open } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    if ("setAttribute" in effectiveReferenceElement) {
      effectiveReferenceElement.setAttribute(ARIA_EXPANDED, toAriaBoolean(open));
    }
  };

  addReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    const id = this.getId();

    if ("setAttribute" in effectiveReferenceElement) {
      effectiveReferenceElement.setAttribute(ARIA_CONTROLS, id);
    }
    manager.registerElement(effectiveReferenceElement, this.el);
    this.setExpandedAttr();
  };

  removeReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    if ("removeAttribute" in effectiveReferenceElement) {
      effectiveReferenceElement.removeAttribute(ARIA_CONTROLS);
      effectiveReferenceElement.removeAttribute(ARIA_EXPANDED);
    }
    manager.unregisterElement(effectiveReferenceElement);
  };

  getReferenceElement(): ReferenceElement {
    const { referenceElement, el } = this;

    return (
      (typeof referenceElement === "string"
        ? queryElementRoots(el, { id: referenceElement })
        : referenceElement) || null
    );
  }

  getModifiers(): Partial<StrictModifiers>[] {
    const {
      arrowEl,
      disableFlip,
      disablePointer,
      offsetDistance,
      offsetSkidding,
      filteredFlipPlacements
    } = this;
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: !disableFlip
    };

    if (filteredFlipPlacements) {
      flipModifier.options = {
        fallbackPlacements: filteredFlipPlacements
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

    const eventListenerModifier: Partial<StrictModifiers> = {
      name: "eventListeners",
      enabled: this.open
    };

    return [arrowModifier, flipModifier, offsetModifier, eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { el, placement, effectiveReferenceElement: referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el,
      modifiers,
      overlayPositioning,
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

  onBeforeOpen(): void {
    this.calcitePopoverBeforeOpen.emit();
  }

  onOpen(): void {
    this.calcitePopoverOpen.emit();
  }

  onBeforeClose(): void {
    this.calcitePopoverBeforeClose.emit();
  }

  onClose(): void {
    this.calcitePopoverClose.emit();
  }

  transitionStartHandler = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp && event.target === this.containerEl) {
      this.open ? this.onBeforeOpen() : this.onBeforeClose();
    }
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp && event.target === this.containerEl) {
      this.open ? this.onOpen() : this.onClose();
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderCloseButton(): VNode {
    const { dismissible, closeButton, intlClose, heading, closable } = this;

    return closable || dismissible || closeButton ? (
      <div class={CSS.closeButtonContainer}>
        <calcite-action
          class={CSS.closeButton}
          onClick={this.hide}
          ref={(closeButtonEl) => (this.closeButtonEl = closeButtonEl)}
          scale={heading ? "s" : "m"}
          text={intlClose}
        >
          <calcite-icon icon="x" scale={heading ? "s" : "m"} />
        </calcite-action>
      </div>
    ) : null;
  }

  renderHeader(): VNode {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (
      <Heading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
        {heading}
      </Heading>
    ) : null;

    return headingNode ? (
      <div class={CSS.header}>
        {headingNode}
        {this.renderCloseButton()}
      </div>
    ) : null;
  }

  render(): VNode {
    const { effectiveReferenceElement, heading, label, open, disablePointer } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? (
      <div class={CSS.arrow} ref={(arrowEl) => (this.arrowEl = arrowEl)} />
    ) : null;

    return (
      <Host
        aria-hidden={toAriaBoolean(hidden)}
        aria-label={label}
        aria-live="polite"
        calcite-hydrated-hidden={hidden}
        id={this.getId()}
        role="dialog"
      >
        <div
          class={{
            [PopperCSS.animation]: true,
            [PopperCSS.animationActive]: displayed
          }}
          onTransitionEnd={this.transitionEnd}
          ref={this.setContainerEl}
        >
          {arrowNode}
          <div
            class={{
              [CSS.hasHeader]: !!heading,
              [CSS.container]: true
            }}
          >
            {this.renderHeader()}
            <div class={CSS.content}>
              <slot />
            </div>
            {!heading ? this.renderCloseButton() : null}
          </div>
        </div>
      </Host>
    );
  }
}
