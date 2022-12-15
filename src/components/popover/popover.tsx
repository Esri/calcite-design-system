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
import { CSS, ARIA_CONTROLS, ARIA_EXPANDED, defaultPopoverPlacement } from "./resources";
import {
  FloatingCSS,
  OverlayPositioning,
  FloatingUIComponent,
  connectFloatingUI,
  disconnectFloatingUI,
  LogicalPlacement,
  EffectivePlacement,
  defaultOffsetDistance,
  filterComputedPlacements,
  ReferenceElement,
  reposition,
  updateAfterClose
} from "../../utils/floating-ui";
import {
  FocusTrapComponent,
  FocusTrap,
  connectFocusTrap,
  activateFocusTrap,
  deactivateFocusTrap,
  focusFirstTabbable
} from "../../utils/focusTrapComponent";

import { guid } from "../../utils/guid";
import { queryElementRoots, toAriaBoolean } from "../../utils/dom";
import {
  OpenCloseComponent,
  connectOpenCloseComponent,
  disconnectOpenCloseComponent
} from "../../utils/openCloseComponent";
import { HeadingLevel, Heading } from "../functional/Heading";
import { Scale } from "../interfaces";

import PopoverManager from "./PopoverManager";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Messages } from "./assets/popover/t9n";

import {
  setUpLoadableComponent,
  setComponentLoaded,
  LoadableComponent,
  componentLoaded
} from "../../utils/loadable";

const manager = new PopoverManager();

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-popover",
  styleUrl: "popover.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Popover
  implements
    FloatingUIComponent,
    OpenCloseComponent,
    FocusTrapComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, clicking outside of the component automatically closes open `calcite-popover`s.
   */
  @Prop({ reflect: true }) autoClose = false;

  /** When `true`, display a close button within the component. */
  @Prop({ mutable: true, reflect: true }) closable = false;

  /**
   * When `true`, prevents flipping the component's placement when overlapping its `referenceElement`.
   */
  @Prop({ reflect: true }) flipDisabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

  @Watch("focusTrapDisabled")
  handlefocusTrapDisabled(focusTrapDisabled: boolean): void {
    if (!this.open) {
      return;
    }

    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }

  /**
   * When `true`, removes the caret pointer.
   */
  @Prop({ reflect: true }) pointerDisabled = false;

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements: EffectivePlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * Accessible name for the component's close button.
   *
   * @deprecated – translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlClose: string;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  @Watch("intlClose")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  /**
   * Offsets the position of the popover away from the `referenceElement`.
   *
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition(true);
  }

  /**
   * Offsets the position of the component along the `referenceElement`.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition(true);
  }

  /**
   * When `true`, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(value: boolean): void {
    if (value) {
      this.reposition(true);
    } else {
      updateAfterClose(this.el);
    }

    this.setExpandedAttr();
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition(true);
  }

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = defaultPopoverPlacement;

  @Watch("placement")
  placementHandler(): void {
    this.reposition(true);
  }

  /**
   *  The `referenceElement` used to position the component according to its `placement` value. Setting to an `HTMLElement` is preferred so the component does not need to query the DOM. However, a string `id` of the reference element can also be used.
   */
  @Prop() referenceElement!: ReferenceElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.setUpReferenceElement();
    this.reposition(true);
  }

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * When `true`, disables automatically toggling the component when its `referenceElement` has been triggered.
   *
   * This property can be set to `true` to manage when the component is open.
   */
  @Prop({ reflect: true }) triggerDisabled = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  filteredFlipPlacements: EffectivePlacement[];

  @Element() el: HTMLCalcitePopoverElement;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() effectiveReferenceElement: ReferenceElement;

  @State() defaultMessages: Messages;

  arrowEl: HTMLDivElement;

  closeButtonEl: HTMLCalciteActionElement;

  guid = `calcite-popover-${guid()}`;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  hasLoaded = false;

  focusTrap: FocusTrap;

  focusTrapEl: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.setFilteredPlacements();
    connectLocalized(this);
    connectMessages(this);
    connectOpenCloseComponent(this);
    this.setUpReferenceElement(this.hasLoaded);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    if (this.referenceElement && !this.effectiveReferenceElement) {
      this.setUpReferenceElement();
    }
    this.reposition();
    this.hasLoaded = true;
  }

  disconnectedCallback(): void {
    this.removeReferences();
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
    disconnectOpenCloseComponent(this);
    deactivateFocusTrap(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calcitePopoverBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calcitePopoverClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calcitePopoverBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calcitePopoverOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  @Method()
  async reposition(delayed = false): Promise<void> {
    const {
      el,
      effectiveReferenceElement,
      placement,
      overlayPositioning,
      flipDisabled,
      filteredFlipPlacements,
      offsetDistance,
      offsetSkidding,
      arrowEl
    } = this;
    return reposition(
      this,
      {
        floatingEl: el,
        referenceEl: effectiveReferenceElement,
        overlayPositioning,
        placement,
        flipDisabled,
        flipPlacements: filteredFlipPlacements,
        offsetDistance,
        offsetSkidding,
        includeArrow: !this.pointerDisabled,
        arrowEl,
        type: "popover"
      },
      delayed
    );
  }

  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  @Method()
  async setFocus(focusId?: "close-button"): Promise<void> {
    await componentLoaded(this);

    const { closeButtonEl } = this;

    if (focusId === "close-button" && closeButtonEl) {
      forceUpdate(closeButtonEl);
      closeButtonEl.setFocus();

      return;
    }

    focusFirstTabbable(this);
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

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
    connectOpenCloseComponent(this);
    this.focusTrapEl = el;
    connectFocusTrap(this);
  };

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  setUpReferenceElement = (warn = true): void => {
    this.removeReferences();
    this.effectiveReferenceElement = this.getReferenceElement();
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);

    const { el, referenceElement, effectiveReferenceElement } = this;
    if (warn && referenceElement && !effectiveReferenceElement) {
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
    activateFocusTrap(this);
  }

  onBeforeClose(): void {
    this.calcitePopoverBeforeClose.emit();
  }

  onClose(): void {
    this.calcitePopoverClose.emit();
    deactivateFocusTrap(this);
  }

  storeArrowEl = (el: HTMLDivElement): void => {
    this.arrowEl = el;
    this.reposition(true);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderCloseButton(): VNode {
    const { messages, closable } = this;
    return closable ? (
      <div class={CSS.closeButtonContainer}>
        <calcite-action
          class={CSS.closeButton}
          onClick={this.hide}
          ref={(closeButtonEl) => (this.closeButtonEl = closeButtonEl)}
          scale={this.scale}
          text={messages.close}
        >
          <calcite-icon icon="x" scale={this.scale === "l" ? "m" : this.scale} />
        </calcite-action>
      </div>
    ) : null;
  }

  renderHeader(): VNode {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (
      <Heading class={CSS.heading} level={headingLevel}>
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
    const { effectiveReferenceElement, heading, label, open, pointerDisabled } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    const arrowNode = !pointerDisabled ? <div class={CSS.arrow} ref={this.storeArrowEl} /> : null;

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
          ref={this.setTransitionEl}
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
