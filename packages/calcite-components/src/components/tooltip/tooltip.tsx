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
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { FloatingArrow } from "../functional/FloatingArrow";
import { ARIA_DESCRIBED_BY, CSS } from "./resources";
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
export class Tooltip extends LitElement implements FloatingUIComponent, OpenCloseComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private arrowEl: SVGSVGElement;

  floatingEl: HTMLDivElement;

  private guid = `calcite-tooltip-${guid()}`;

  transitionProp = "opacity" as const;

  transitionEl: HTMLDivElement;

  // #endregion

  // #region State Properties

  @state() floatingLayout: FloatingLayout = "vertical";

  @state() referenceEl: ReferenceElement;

  // #endregion

  // #region Public Properties

  /** Closes the component when the `referenceElement` is clicked. */
  @property({ reflect: true }) closeOnClick = false;

  /**
   * Accessible name for the component.
   *
   * @deprecated No longer necessary. Overrides the context of the component's description, which could confuse assistive technology users.
   */
  @property() label: string;

  /**
   * Offset the position of the component away from the `referenceElement`.
   *
   * @default 6
   */
  @property({ type: Number, reflect: true }) offsetDistance = defaultOffsetDistance;

  /** Offset the position of the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, the component is open. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * The `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
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
   */
  @property() referenceElement: ReferenceElement | string;

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
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
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
    onToggleOpenCloseComponent(this);
    this.reposition(true);
  }

  onBeforeOpen(): void {
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
    hideFloatingUI(this);
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;

    if (el) {
      requestAnimationFrame(() => this.setUpReferenceElement());
    }
  }

  private setTransitionEl(el: HTMLDivElement): void {
    this.transitionEl = el;
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
    const { referenceEl, label, open, floatingLayout } = this;
    const displayed = referenceEl && open;
    const hidden = !displayed;
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
      <div class={CSS.positionContainer} ref={this.setFloatingEl}>
        <div
          class={{
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed,
          }}
          ref={this.setTransitionEl}
        >
          <FloatingArrow
            floatingLayout={floatingLayout}
            ref={(arrowEl) => (this.arrowEl = arrowEl)}
          />
          <div class={CSS.container}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  // #endregion
}
