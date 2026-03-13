// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import {
  connectFloatingUI,
  defaultOffsetDistance,
  disconnectFloatingUI,
  FloatingCSS,
  FloatingLayout,
  FloatingUIComponent,
  hideFloatingUI,
  LogicalPlacement,
  OverlayPositioning,
  ReferenceElement,
  reposition,
} from "../../utils/floating-ui";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { FloatingArrow } from "../functional/FloatingArrow";
import { useTopLayer } from "../../controllers/useTopLayer";
import {
  ReferenceElementComponent,
  ReferenceElementType,
  useReferenceElement,
} from "../../controllers/useReferenceElement";
import { referenceElementManager } from "../../controllers/useReferenceElement/manager";
import { CSS } from "./resources";
import { styles } from "./tooltip.scss";

declare global {
  interface DeclareElements {
    "calcite-tooltip": Tooltip;
  }
}

const manager = referenceElementManager({ hover: true });

/** @slot - A slot for adding text. */
export class Tooltip extends LitElement implements FloatingUIComponent, ReferenceElementComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private arrowRef = createRef<SVGSVGElement>();

  private direction = useDirection();

  floatingEl: HTMLDivElement;

  referenceElementType: ReferenceElementType = "hover";

  referenceElementController = useReferenceElement({ manager })(this);

  transitionProp = "opacity" as const;

  transitionRef = createRef<HTMLDivElement>();

  private topLayer = useTopLayer<this>({
    disabledOverride: () => this.open && !this.referenceEl,
    target: () => this.floatingEl,
  })(this);

  /** Tracks references we've attached listeners to so we can cleanly remove them. */
  // private listeningReferenceEls = new Set<ReferenceElement>();

  // private boundOnReferencePointerEnter = (event: Event): void => this.onReferenceInteraction(event);

  // private boundOnReferenceFocusIn = (event: Event): void => this.onReferenceInteraction(event);

  // #endregion

  // #region State Properties

  @state() floatingLayout: FloatingLayout = "vertical";

  /** Active reference used for positioning (re-anchored based on user interaction). */
  @state() referenceEl: ReferenceElement;

  /** All resolved references that should be described by this tooltip. */
  @state() private referenceElements: ReferenceElement[] = [];

  // #endregion

  // #region Public Properties

  /** Closes the component when the `referenceElement` is clicked. */
  @property({ reflect: true }) closeOnClick = false;

  /**
   * Specifies an accessible label for the component.
   *
   * @deprecated in v1.5.0, removal target v6.0.0 - No longer necessary. Overrides the context of the component's text description, which could confuse assistive technology users.
   */
  @property() label: string;

  /**
   * Specifies the distance to position the component away from the `referenceElement`.
   */
  @property({ type: Number, reflect: true }) offsetDistance = defaultOffsetDistance;

  /** Specifies the distance to position the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, the component is open. */
  @property({ reflect: true }) open = false;

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the component will be positioned relative to the `referenceElement`. */
  @property({ reflect: true }) placement: LogicalPlacement = "auto";

  /**
   * The `referenceElement` to position the component according to its `"placement"` value.
   *
   * Setting to the `HTMLElement` is preferred so the component does not need to query the DOM for the `referenceElement`.
   *
   * However, a string ID of the reference element can be used.
   *
   * The component should not be placed within its own `referenceElement` to avoid unintended behavior.
   */
  @property() referenceElement: ReferenceElement | string;

  /**
   * Multiple reference elements to describe and re-anchor to.
   *
   * - Prefer passing elements to avoid DOM queries.
   * - String inputs are treated as ids (space/comma-separated) or arrays of ids.
   *
   * When provided, the tooltip will position to whichever reference was most recently interacted with (hover/focus).
   */
  // @property() referenceElements: ReferenceElement[] | string | string[];

  /**
   * When `true` and the component is `open`, disables top layer placement.
   *
   * Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.
   *
   * @mdn [Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  @method()
  async reposition(delayed = false): Promise<void> {
    const {
      referenceEl,
      placement,
      overlayPositioning,
      offsetDistance,
      offsetSkidding,
      arrowRef,
      floatingEl,
    } = this;

    return reposition(
      this,
      {
        direction: this.direction,
        floatingEl,
        referenceEl: referenceEl,
        overlayPositioning,
        placement,
        offsetDistance,
        offsetSkidding,
        arrowEl: arrowRef.value,
        type: "tooltip",
      },
      delayed,
    );
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteTooltipBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteTooltipBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteTooltipClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteTooltipOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] ...existing comment... */
    if (
      (changes.has("offsetDistance") &&
        (this.hasUpdated || this.offsetDistance !== defaultOffsetDistance)) ||
      (changes.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0)) ||
      (changes.has("overlayPositioning") &&
        (this.hasUpdated || this.overlayPositioning !== "absolute")) ||
      (changes.has("placement") && (this.hasUpdated || this.placement !== "auto"))
    ) {
      this.reposition(true);
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      // debugger;
      this.openHandler();
    }

    if (changes.has("referenceElement") && !this.referenceElement && this.open) {
      this.topLayer.hide();
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("referenceEl")) {
      connectFloatingUI(this);
    }
  }

  override disconnectedCallback(): void {
    disconnectFloatingUI(this);
  }

  // #endregion

  // #region Private Methods

  private openHandler(): void {
    toggleOpenClose(this);
    this.reposition(true);
  }

  onBeforeOpen(): void {
    this.calciteTooltipBeforeOpen.emit();
    this.topLayer.show();
  }

  onOpen(): void {
    this.calciteTooltipOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteTooltipBeforeClose.emit();
  }

  onClose(): void {
    this.calciteTooltipClose.emit();
    hideFloatingUI(this);
    this.topLayer.hide();
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { referenceEl, label, open, floatingLayout } = this;
    const displayed = referenceEl && open;
    const hidden = !displayed;

    this.el.inert = hidden;
    this.el.ariaLabel = label;
    this.el.ariaLive = "polite";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "tooltip";

    return (
      <div class={CSS.positionContainer} popover="manual" ref={this.setFloatingEl}>
        <div
          class={{
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed,
          }}
          ref={this.transitionRef}
        >
          <FloatingArrow floatingLayout={floatingLayout} ref={this.arrowRef} />
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  // #endregion
}
