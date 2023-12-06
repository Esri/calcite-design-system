import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { toAriaBoolean } from "../../utils/dom";
import {
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  FloatingCSS,
  FloatingLayout,
  FloatingUIComponent,
  LogicalPlacement,
  OverlayPositioning,
  ReferenceElement,
  reposition,
} from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { ARIA_DESCRIBED_BY, CSS } from "./resources";

import TooltipManager from "./TooltipManager";
import { getEffectiveReferenceElement } from "./utils";
import { FloatingArrow } from "../functional/FloatingArrow";

const manager = new TooltipManager();

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true,
})
export class Tooltip implements FloatingUIComponent, OpenCloseComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Closes the component when the `referenceElement` is clicked. */
  @Prop({ reflect: true }) closeOnClick = false;

  /**
   * Accessible name for the component.
   *
   * @deprecated No longer necessary. Overrides the context of the component's description, which could confuse assistive technology users.
   */
  @Prop() label: string;

  /**
   * Offset the position of the component away from the `referenceElement`.
   *
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition(true);
  }

  /**
   * Offset the position of the component along the `referenceElement`.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition(true);
  }

  /**
   * When `true`, the component is open.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * The `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
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
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.reposition(true);
  }

  /**
   * The `referenceElement` to position the component according to its `"placement"` value.
   *
   * Setting to the `HTMLElement` is preferred so the component does not need to query the DOM for the `referenceElement`.
   *
   * However, a string ID of the reference element can be used.
   */
  @Prop() referenceElement: ReferenceElement | string;

  @Watch("referenceElement")
  referenceElementHandler(): void {
    this.setUpReferenceElement();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTooltipElement;

  @State() effectiveReferenceElement: ReferenceElement;

  @State() floatingLayout: FloatingLayout = "vertical";

  arrowEl: SVGElement;

  guid = `calcite-tooltip-${guid()}`;

  hasLoaded = false;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.setUpReferenceElement(this.hasLoaded);
    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);
  }

  async componentWillLoad(): Promise<void> {
    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
  }

  componentDidLoad(): void {
    if (this.referenceElement && !this.effectiveReferenceElement) {
      this.setUpReferenceElement();
    }
    this.reposition(true);
    this.hasLoaded = true;
  }

  disconnectedCallback(): void {
    this.removeReferences();
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteTooltipBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteTooltipClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteTooltipBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteTooltipOpen: EventEmitter<void>;

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
        offsetDistance,
        offsetSkidding,
        arrowEl,
        type: "tooltip",
      },
      delayed
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  onBeforeOpen(): void {
    this.reposition(true);
    this.calciteTooltipBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteTooltipOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteTooltipBeforeClose.emit();
  }

  onClose(): void {
    this.calciteTooltipClose.emit();
    this.reposition(true);
  }

  private setTransitionEl = (el): void => {
    this.transitionEl = el;
  };

  setUpReferenceElement = (warn = true): void => {
    this.removeReferences();
    this.effectiveReferenceElement = getEffectiveReferenceElement(this.el);
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

  addReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    const id = this.getId();

    if ("setAttribute" in effectiveReferenceElement) {
      effectiveReferenceElement.setAttribute(ARIA_DESCRIBED_BY, id);
    }

    manager.registerElement(effectiveReferenceElement, this.el);
  };

  removeReferences = (): void => {
    const { effectiveReferenceElement } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    if ("removeAttribute" in effectiveReferenceElement) {
      effectiveReferenceElement.removeAttribute(ARIA_DESCRIBED_BY);
    }

    manager.unregisterElement(effectiveReferenceElement);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { effectiveReferenceElement, label, open, floatingLayout } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;

    return (
      <Host
        aria-hidden={toAriaBoolean(hidden)}
        aria-label={label}
        aria-live="polite"
        calcite-hydrated-hidden={hidden}
        id={this.getId()}
        role="tooltip"
      >
        <div
          class={{
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed,
          }}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setTransitionEl}
        >
          <FloatingArrow
            floatingLayout={floatingLayout}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(arrowEl: SVGElement) => (this.arrowEl = arrowEl)}
          />
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
