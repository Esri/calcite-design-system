// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
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
import { guid } from "../../utils/guid";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { FloatingArrow } from "../functional/FloatingArrow";
import { Scale } from "../interfaces";
import { useTopLayer } from "../../controllers/useTopLayer";
import { ARIA_DESCRIBED_BY, CSS, IDS } from "./resources";
import TooltipManager from "./TooltipManager";
import { getEffectiveReferenceElement } from "./utils";
import { styles } from "./tooltip.scss";

declare global {
  interface DeclareElements {
    "calcite-tooltip": Tooltip;
  }
}

const manager = new TooltipManager();

/** @slot - A slot for adding text. */
export class Tooltip extends LitElement implements FloatingUIComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private arrowEl: SVGSVGElement;

  private direction = useDirection();

  floatingEl: HTMLDivElement;

  private guid = IDS.host(guid());

  transitionProp = "opacity" as const;

  transitionRef = createRef<HTMLDivElement>();

  private topLayer = useTopLayer<this>({
    disabledOverride: () => this.open && !this.referenceEl,
    target: () => this.floatingEl,
  })(this);

  // #endregion

  // #region State Properties

  @state() floatingLayout: FloatingLayout = "vertical";

  @state() referenceEl: ReferenceElement;

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

  /** When `true`, removes the caret pointer. */
  @property({ reflect: true }) pointerDisabled = false;

  /**
   * The `referenceElement` is used to position the component according to its `placement` value.
   *
   * Setting the value to an `HTMLElement` is preferred so the component does not need to query the DOM.
   *
   * However, a string `id` of the reference element can also be used.
   *
   * The component should not be placed within its own `referenceElement` to avoid unintended behavior.
   */
  @property() referenceElement: ReferenceElement | string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

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
      arrowEl,
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
        arrowEl,
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

  override connectedCallback(): void {
    this.setUpReferenceElement(true);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
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
      this.openHandler();
    }

    if (changes.has("referenceElement")) {
      this.setUpReferenceElement();

      if (!this.referenceElement && this.open) {
        this.topLayer.hide();
      }
    }
  }

  loaded(): void {
    if (this.referenceElement && !this.referenceEl) {
      this.setUpReferenceElement();
    }
  }

  override disconnectedCallback(): void {
    this.removeReferences();
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

    if (el) {
      requestAnimationFrame(() => this.setUpReferenceElement());
    }
  }

  private setArrowEl(el: SVGSVGElement): void {
    this.arrowEl = el;
    this.reposition(true);
  }

  private setUpReferenceElement(warn = true): void {
    this.removeReferences();
    this.referenceEl = getEffectiveReferenceElement(this.el);
    connectFloatingUI(this);

    const { el, referenceElement, referenceEl } = this;
    if (warn && referenceElement && !referenceEl) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el,
      });
    }

    this.addReferences();
  }

  private getId(): string {
    return this.el.id || this.guid;
  }

  private addReferences(): void {
    const { referenceEl } = this;

    if (!referenceEl) {
      return;
    }

    const id = this.getId();

    if ("setAttribute" in referenceEl) {
      referenceEl.setAttribute(ARIA_DESCRIBED_BY, id);
    }

    manager.registerElement(referenceEl, this.el);
  }

  private removeReferences(): void {
    const { referenceEl } = this;

    if (!referenceEl) {
      return;
    }

    if ("removeAttribute" in referenceEl) {
      referenceEl.removeAttribute(ARIA_DESCRIBED_BY);
    }

    manager.unregisterElement(referenceEl);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { referenceEl, label, open, pointerDisabled, floatingLayout } = this;
    const displayed = referenceEl && open;
    const hidden = !displayed;
    const arrowNode = !pointerDisabled ? (
      <FloatingArrow floatingLayout={floatingLayout} key="floating-arrow" ref={this.setArrowEl} />
    ) : null;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.inert = hidden;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = label;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLive = "polite";
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", this.getId());
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
          {arrowNode}
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  // #endregion
}
