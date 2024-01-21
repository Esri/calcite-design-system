import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  EffectivePlacement,
  filterComputedPlacements,
  FloatingCSS,
  FloatingLayout,
  FloatingUIComponent,
  LogicalPlacement,
  OverlayPositioning,
  ReferenceElement,
  reposition,
} from "../../utils/floating-ui";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrap,
  FocusTrapComponent,
  updateFocusTrapElements,
} from "../../utils/focusTrapComponent";
import { ARIA_CONTROLS, ARIA_EXPANDED, CSS, defaultPopoverPlacement } from "./resources";

import { focusFirstTabbable, queryElementRoots, toAriaBoolean } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Scale } from "../interfaces";

import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { PopoverMessages } from "./assets/popover/t9n";
import PopoverManager from "./PopoverManager";

import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { FloatingArrow } from "../functional/FloatingArrow";
import { getIconScale } from "../../utils/component";

const manager = new PopoverManager();

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-popover",
  styleUrl: "popover.scss",
  shadow: true,
  assetsDirs: ["assets"],
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

  /** When `true`, displays a close button within the component. */
  @Prop({ reflect: true }) closable = false;

  /**
   * When `true`, prevents flipping the component's placement when overlapping its `referenceElement`.
   */
  @Prop({ reflect: true }) flipDisabled = false;

  /**
   * When `true`, prevents focus trapping.
   */
  @Prop({ reflect: true }) focusTrapDisabled = false;

  @Watch("focusTrapDisabled")
  handleFocusTrapDisabled(focusTrapDisabled: boolean): void {
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

  /** Accessible name for the component. */
  @Prop() label!: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<PopoverMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: PopoverMessages;

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
  openHandler(): void {
    onToggleOpenCloseComponent(this);
    this.reposition(true);
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

  @Element() el: HTMLCalcitePopoverElement;

  mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.updateFocusTrapElements(),
  );

  filteredFlipPlacements: EffectivePlacement[];

  @State() effectiveLocale = "";

  @State() floatingLayout: FloatingLayout = "vertical";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() effectiveReferenceElement: ReferenceElement;

  @State() defaultMessages: PopoverMessages;

  arrowEl: SVGElement;

  closeButtonEl: HTMLCalciteActionElement;

  guid = `calcite-popover-${guid()}`;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  hasLoaded = false;

  focusTrap: FocusTrap;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.setFilteredPlacements();
    connectLocalized(this);
    connectMessages(this);
    this.setUpReferenceElement(this.hasLoaded);
    connectFocusTrap(this);
    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);
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
      arrowEl,
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
        arrowEl,
        type: "popover",
      },
      delayed,
    );
  }

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    forceUpdate(this.el);
    focusFirstTabbable(this.el);
  }

  /**
   * Updates the element(s) that are used within the focus-trap of the component.
   */
  @Method()
  async updateFocusTrapElements(): Promise<void> {
    updateFocusTrapElements(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
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
        el,
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

  storeArrowEl = (el: SVGElement): void => {
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
      <div class={CSS.closeButtonContainer} key={CSS.closeButtonContainer}>
        <calcite-action
          appearance="transparent"
          class={CSS.closeButton}
          onClick={this.hide}
          scale={this.scale}
          text={messages.close}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(closeButtonEl) => (this.closeButtonEl = closeButtonEl)}
        >
          <calcite-icon icon="x" scale={getIconScale(this.scale)} />
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
      <div class={CSS.header} key={CSS.header}>
        {headingNode}
        {this.renderCloseButton()}
      </div>
    ) : null;
  }

  render(): VNode {
    const { effectiveReferenceElement, heading, label, open, pointerDisabled, floatingLayout } =
      this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    const arrowNode = !pointerDisabled ? (
      <FloatingArrow
        floatingLayout={floatingLayout}
        key="floating-arrow"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.storeArrowEl}
      />
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
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed,
          }}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setTransitionEl}
        >
          {arrowNode}
          <div
            class={{
              [CSS.hasHeader]: !!heading,
              [CSS.container]: true,
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
