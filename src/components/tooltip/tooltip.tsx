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
  ReferenceElement,
  repositionDebounceTimeout
} from "../../utils/floating-ui";
import { queryElementRoots, toAriaBoolean } from "../../utils/dom";

import TooltipManager from "./TooltipManager";
import { debounce } from "lodash-es";

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

  /** Closes the component when the `referenceElement` is clicked. */
  @Prop({ reflect: true }) closeOnClick = false;

  /** Accessible name for the component. */
  @Prop() label!: string;

  /**
   * Offset the position of the component away from the `referenceElement`.
   *
   * @default 6
   */
  @Prop({ reflect: true }) offsetDistance = defaultOffsetDistance;

  @Watch("offsetDistance")
  offsetDistanceOffsetHandler(): void {
    this.debouncedReposition();
  }

  /**
   * Offset the position of the component along the `referenceElement`.
   */
  @Prop({ reflect: true }) offsetSkidding = 0;

  @Watch("offsetSkidding")
  offsetSkiddingHandler(): void {
    this.debouncedReposition();
  }

  /**
   * When `true`, the component is open.
   */
  @Prop({ reflect: true }) open = false;

  @Watch("open")
  openHandler(): void {
    this.debouncedReposition();
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
    this.debouncedReposition();
  }

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   *
   * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  @Watch("placement")
  placementHandler(): void {
    this.debouncedReposition();
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

  arrowEl: HTMLDivElement;

  guid = `calcite-tooltip-${guid()}`;

  hasLoaded = false;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.setUpReferenceElement(this.hasLoaded);
  }

  componentDidLoad(): void {
    if (this.referenceElement && !this.effectiveReferenceElement) {
      this.setUpReferenceElement();
    }
    this.debouncedReposition();
    this.hasLoaded = true;
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

  private debouncedReposition = debounce(() => this.reposition(), repositionDebounceTimeout);

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
        aria-live="polite"
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
