import { Component, Element, Host, Method, Prop, State, Watch, h, VNode } from "@stencil/core";
import { CSS, ARIA_DESCRIBED_BY } from "./resources";
import { guid } from "../../utils/guid";
import {
  positionFloatingUI,
  FloatingCSS,
  OverlayPositioning,
  FloatingUIComponent,
  connectFloatingUI,
  disconnectFloatingUI,
  LogicalPlacement,
  defaultOffsetDistance,
  ReferenceElement
} from "../../utils/floating-ui";
import { queryElementRoots, toAriaBoolean } from "../../utils/dom";

import TooltipManager from "./TooltipManager";

const manager = new TooltipManager();

/**
 * @slot - A slot for adding text.
 */
@Component({
  tag: "calcite-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true
})
export class Tooltip implements FloatingUIComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Accessible name for the component */
  @Prop() label!: string;

  /**
   * Offset the position of the tooltip away from the reference element.
   *
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.reposition();
  }

  /**
   * Offset the position of the tooltip along the reference element.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.reposition();
  }

  /**
   * Display and position the component.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(): void {
    this.active = this.open;
    this.reposition();
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition();
  }

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   *
   * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /**
   * Reference HTMLElement used to position this component according to the placement property. As a convenience, a string ID of the reference element can be used. However, setting this property to use an HTMLElement is preferred so that the component does not need to query the DOM for the referenceElement.
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

  active: boolean;

  arrowEl: HTMLDivElement;

  guid = `calcite-tooltip-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.active = this.open;
    connectFloatingUI(this, this.effectiveReferenceElement, this.el);
  }

  componentWillLoad(): void {
    this.setUpReferenceElement();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  disconnectedCallback(): void {
    this.removeReferences();
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
  }

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
      offsetDistance,
      offsetSkidding,
      arrowEl
    } = this;

    if (!effectiveReferenceElement) {
      return;
    }

    return positionFloatingUI({
      floatingEl: el,
      referenceEl: effectiveReferenceElement,
      overlayPositioning,
      placement,
      offsetDistance,
      offsetSkidding,
      arrowEl,
      type: "tooltip"
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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

  getReferenceElement(): ReferenceElement {
    const { referenceElement, el } = this;

    return (
      (typeof referenceElement === "string"
        ? queryElementRoots(el, { id: referenceElement })
        : referenceElement) || null
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { effectiveReferenceElement, label, open } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;

    return (
      <Host
        aria-hidden={toAriaBoolean(hidden)}
        aria-label={label}
        calcite-hydrated-hidden={hidden}
        id={this.getId()}
        role="tooltip"
      >
        <div
          class={{
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed
          }}
        >
          <div class={CSS.arrow} ref={(arrowEl) => (this.arrowEl = arrowEl)} />
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
