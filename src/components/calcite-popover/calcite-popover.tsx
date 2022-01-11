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
  POPOVER_REFERENCE,
  TEXT
} from "./resources";
import {
  positionFloatingUI,
  FloatingCSS,
  OverlayPositioning,
  FloatingUIComponent,
  connectFloatingUI,
  disconnectFloatingUI,
  LogicalPlacement,
  EffectivePlacement,
  defaultOffsetDistance
} from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import { queryElementRoots } from "../../utils/dom";
import { HeadingLevel, CalciteHeading } from "../functional/CalciteHeading";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-popover",
  styleUrl: "calcite-popover.scss",
  shadow: true
})
export class CalcitePopover implements FloatingUIComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Display a close button within the Popover.
   * @deprecated use dismissible instead.
   */
  @Prop({ reflect: true }) closeButton = false;

  /**
   * Display a close button within the Popover.
   */
  @Prop({ reflect: true }) dismissible = false;

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
  @Prop() flipPlacements?: EffectivePlacement[];

  /**
   * Heading text.
   */
  @Prop() heading?: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /** Accessible name for the component */
  @Prop() label!: string;

  /**
   * Offset the position of the popover away from the reference element.
   * @default 6
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
  openHandler(): void {
    this.reposition();
    this.setExpandedAttr();
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition();
  }

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
   */
  @Prop() referenceElement!: HTMLElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.setUpReferenceElement();
    this.reposition();
  }

  /** Text for close button.
   * @default "Close"
   */
  @Prop() intlClose = TEXT.close;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePopoverElement;

  @State() effectiveReferenceElement: HTMLElement;

  arrowEl: HTMLDivElement;

  closeButtonEl: HTMLCalciteActionElement;

  guid = `calcite-popover-${guid()}`;

  private activeTransitionProp = "opacity";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectFloatingUI(this, this.el);
  }

  componentWillLoad(): void {
    this.setUpReferenceElement();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    this.removeReferences();
    disconnectFloatingUI(this, this.el);
    disconnectFloatingUI(this, this.effectiveReferenceElement);
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

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const {
      el,
      effectiveReferenceElement,
      placement,
      overlayPositioning,
      disableFlip,
      flipPlacements,
      offsetDistance,
      offsetSkidding,
      arrowEl
    } = this;

    return positionFloatingUI({
      floatingEl: el,
      referenceEl: effectiveReferenceElement,
      overlayPositioning,
      placement,
      disableFlip,
      flipPlacements,
      offsetDistance,
      offsetSkidding,
      arrowEl,
      type: "popover"
    });
  }

  /** Sets focus on the component. */
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

  /** Toggles the popover's open property. */
  @Method()
  async toggle(value = !this.open): Promise<void> {
    this.open = value;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setUpReferenceElement = (): void => {
    this.removeReferences();
    this.effectiveReferenceElement = this.getReferenceElement();
    connectFloatingUI(this, this.effectiveReferenceElement);

    const { el, referenceElement, effectiveReferenceElement } = this;
    if (referenceElement && !effectiveReferenceElement) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el
      });
    }

    this.addReferences();
  };

  getId = (): string => {
    return this.el.id || this.guid;
  };

  setExpandedAttr = (): void => {
    const { effectiveReferenceElement, open } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    effectiveReferenceElement.setAttribute(ARIA_EXPANDED, open.toString());
  };

  addReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    const id = this.getId();

    effectiveReferenceElement.setAttribute(POPOVER_REFERENCE, id);
    effectiveReferenceElement.setAttribute(ARIA_CONTROLS, id);
    this.setExpandedAttr();
  };

  removeReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    effectiveReferenceElement.removeAttribute(POPOVER_REFERENCE);
    effectiveReferenceElement.removeAttribute(ARIA_CONTROLS);
    effectiveReferenceElement.removeAttribute(ARIA_EXPANDED);
  };

  getReferenceElement(): HTMLElement {
    const { referenceElement, el } = this;

    return (
      (typeof referenceElement === "string"
        ? queryElementRoots(el, { id: referenceElement })
        : referenceElement) || null
    );
  }

  hide = (): void => {
    this.open = false;
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.open ? this.calcitePopoverOpen.emit() : this.calcitePopoverClose.emit();
    }
  };

  storeArrowEl = (el: HTMLDivElement): void => {
    this.arrowEl = el;
    this.reposition();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderCloseButton(): VNode {
    const { dismissible, closeButton, intlClose } = this;

    return dismissible || closeButton ? (
      <calcite-action
        class={CSS.closeButton}
        onClick={this.hide}
        ref={(closeButtonEl) => (this.closeButtonEl = closeButtonEl)}
        text={intlClose}
      >
        <calcite-icon icon="x" scale="m" />
      </calcite-action>
    ) : null;
  }

  renderHeader(): VNode {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (
      <CalciteHeading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
        {heading}
      </CalciteHeading>
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
    const arrowNode = !disablePointer ? <div class={CSS.arrow} ref={this.storeArrowEl} /> : null;

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
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed
          }}
          onTransitionEnd={this.transitionEnd}
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
