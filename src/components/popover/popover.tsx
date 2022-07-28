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
  positionFloatingUI,
  FloatingCSS,
  OverlayPositioning,
  FloatingUIComponent,
  connectFloatingUI,
  disconnectFloatingUI,
  LogicalPlacement,
  EffectivePlacement,
  defaultOffsetDistance,
  filterComputedPlacements,
  ReferenceElement
} from "../../utils/floating-ui";

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
export class Popover implements FloatingUIComponent, OpenCloseComponent {
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
  @Prop({ mutable: true, reflect: true }) dismissible = false;

  @Watch("dismissible")
  handleDismissible(value: boolean): void {
    this.closable = value;
  }

  /** When true, display a close button within the Popover */
  @Prop({ mutable: true, reflect: true }) closable = false;

  @Watch("closable")
  handleClosable(value: boolean): void {
    this.dismissible = value;
  }

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
  @Prop() flipPlacements?: EffectivePlacement[];

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

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition();
  }

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   *
   * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = defaultPopoverPlacement;

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
    this.reposition();
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

  filteredFlipPlacements: EffectivePlacement[];

  @Element() el: HTMLCalcitePopoverElement;

  @State() effectiveReferenceElement: ReferenceElement;

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
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);
    this.setFilteredPlacements();
    if (this.dismissible) {
      this.handleDismissible(this.dismissible);
    }
    if (this.closable) {
      this.handleClosable(this.closable);
    }
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
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event() calcitePopoverBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event() calcitePopoverClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event() calcitePopoverBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event() calcitePopoverOpen: EventEmitter<void>;

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
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);

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
    const { closeButton, intlClose, heading, closable } = this;

    return closable || closeButton ? (
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
    const arrowNode = !disablePointer ? <div class={CSS.arrow} ref={this.storeArrowEl} /> : null;

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
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed
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
