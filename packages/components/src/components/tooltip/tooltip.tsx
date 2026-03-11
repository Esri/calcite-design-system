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

  private arrowRef = createRef<SVGSVGElement>();

  private direction = useDirection();

  floatingEl: HTMLDivElement;

  private guid = IDS.host(guid());

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
  @state() private referenceEls: ReferenceElement[] = [];

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

  // /**
  //  * The `referenceElement` to position the component according to its `"placement"` value.
  //  *
  //  * Setting to the `HTMLElement` is preferred so the component does not need to query the DOM for the `referenceElement`.
  //  *
  //  * However, a string ID of the reference element can be used.
  //  *
  //  * The component should not be placed within its own `referenceElement` to avoid unintended behavior.
  //  */
  // @property() referenceElement: ReferenceElement | string;

  /**
   * Multiple reference elements to describe and re-anchor to.
   *
   * - Prefer passing elements to avoid DOM queries.
   * - String inputs are treated as ids (space/comma-separated) or arrays of ids.
   *
   * When provided, the tooltip will position to whichever reference was most recently interacted with (hover/focus).
   */
  @property() referenceElements?: ReferenceElement[] | string | string[];

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

  override connectedCallback(): void {
    this.setUpReferenceElements(true);
  }

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
    if (changes.has("referenceElements")) {
      this.setUpReferenceElements();
      if (this.referenceElements.length === 0 && this.open) {
        this.topLayer.hide();
      }
    }
  }

  loaded(): void {
    if (this.referenceElements && !this.referenceEls) {
      this.setUpReferenceElements();
    }
  }

  override disconnectedCallback(): void {
    this.removeReferences();
    //this.detachReferenceListeners();
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
      requestAnimationFrame(() => this.setUpReferenceElements());
    }
  }

  private setUpReferenceElements(warn = true): void {
    // Clean up old refs (aria + listeners)
    this.removeReferences();
    //this.detachReferenceListeners();

    // Resolve refs (multi preferred)
    const referenceEls = this.getEffectiveReferenceElements();
    this.referenceEls = referenceEls;

    // Preserve current anchor if still present, otherwise fall back to first ref
    const current = this.referenceEl;
    const nextActive =
      current && referenceEls.includes(current) ? current : referenceEls[0] || undefined;

    this.referenceEl = nextActive;

    connectFloatingUI(this);

    if (warn) {
      const { el, referenceElements } = this;
      const hasAnyConfigured = !!referenceElements;
      if (hasAnyConfigured && !this.referenceEl) {
        console.warn(`${el.tagName}: reference element(s) could not be resolved.`, { el });
      }
    }

    this.addReferences();
    //this.attachReferenceListeners();

    // if (this.open) {
    //   this.reposition(true);
    // }
  }

  private getEffectiveReferenceElements(): ReferenceElement[] {
    const { referenceElements } = this;

    if (referenceElements != null) {
      const normalized = this.normalizeReferenceElements(referenceElements);
      return normalized;
    }

    const single = getEffectiveReferenceElement(this.el);
    return single ? [single] : [];
  }

  private normalizeReferenceElements(
    input: ReferenceElement[] | string | string[],
  ): ReferenceElement[] {
    const elements: ReferenceElement[] = [];

    const pushIfElement = (value: unknown): void => {
      if (!value || typeof value !== "object") {
        return;
      }
      // basic node check
      if ("nodeType" in (value as any)) {
        elements.push(value as ReferenceElement);
      }
    };

    const resolveById = (id: string): void => {
      const trimmed = id.trim();
      if (!trimmed) {
        return;
      }
      const found = this.el.ownerDocument?.getElementById(trimmed);
      if (found) {
        elements.push(found as unknown as ReferenceElement);
      }
    };

    if (Array.isArray(input)) {
      for (const item of input) {
        if (typeof item === "string") {
          resolveById(item);
        } else {
          pushIfElement(item);
        }
      }
    } else if (typeof input === "string") {
      input
        .split(/[,\s]+/g)
        .filter(Boolean)
        .forEach(resolveById);
    } else {
      pushIfElement(input);
    }

    // De-dupe while preserving order
    return Array.from(new Set(elements));
  }

  // private onReferenceInteraction(event: Event): void {
  //   const target = event.currentTarget as ReferenceElement;

  //   if (!target || target === this.referenceEl) {
  //     return;
  //   }

  //   // Only re-anchor if this tooltip is configured for multi-ref.
  //   // (If single ref, interaction is irrelevant.)
  //   if (this.referenceElements == null) {
  //     return;
  //   }

  //   this.referenceEl = target;
  //   this.handlePopover();

  //   if (this.open) {
  //     this.reposition(true);
  //   }
  // }

  // private attachReferenceListeners(): void {
  //   // Only needed to support "re-anchor to currently interacted reference"
  //   if (this.referenceElements == null) {
  //     return;
  //   }

  //   this.referenceEls.forEach((referenceEl) => {
  //     if (!referenceEl || this.listeningReferenceEls.has(referenceEl)) {
  //       return;
  //     }

  //     // ReferenceElement is usually HTMLElement; guard for addEventListener presence
  //     if ("addEventListener" in referenceEl) {
  //       (referenceEl as any).addEventListener("pointerenter", this.boundOnReferencePointerEnter);
  //       (referenceEl as any).addEventListener("focusin", this.boundOnReferenceFocusIn);
  //       this.listeningReferenceEls.add(referenceEl);
  //     }
  //   });
  // }

  // private detachReferenceListeners(): void {
  //   this.listeningReferenceEls.forEach((referenceEl) => {
  //     if ("removeEventListener" in referenceEl) {
  //       (referenceEl as any).removeEventListener("pointerenter", this.boundOnReferencePointerEnter);
  //       (referenceEl as any).removeEventListener("focusin", this.boundOnReferenceFocusIn);
  //     }
  //   });
  //   this.listeningReferenceEls.clear();
  // }

  private getId(): string {
    return this.el.id || this.guid;
  }

  private addReferences(): void {
    const { referenceEls } = this;

    if (!referenceEls?.length) {
      return;
    }

    const id = this.getId();

    referenceEls.forEach((referenceEl) => this.addAriaDescribedBy(referenceEl, id));

    // Future: if TooltipManager is re-enabled, it should support multiple refs.
    referenceEls.forEach((referenceEl) => manager.registerElement(referenceEl, this.el));
  }

  private removeReferences(): void {
    const { referenceEls } = this;

    if (!referenceEls?.length) {
      return;
    }

    const id = this.getId();
    referenceEls.forEach((referenceEl) => this.removeAriaDescribedBy(referenceEl, id));

    // Future: if TooltipManager is re-enabled, it should support multiple refs.
    referenceEls.forEach((referenceEl) => manager.unregisterElement(referenceEl));
  }

  private addAriaDescribedBy(referenceEl: ReferenceElement, id: string): void {
    if (!referenceEl || !("getAttribute" in referenceEl) || !("setAttribute" in referenceEl)) {
      return;
    }

    const el = referenceEl;
    const current = el.getAttribute(ARIA_DESCRIBED_BY) || "";
    const tokens = current.split(/\s+/g).filter(Boolean);

    if (!tokens.includes(id)) {
      tokens.push(id);
      el.setAttribute(ARIA_DESCRIBED_BY, tokens.join(" "));
    }
  }

  private removeAriaDescribedBy(referenceEl: ReferenceElement, id: string): void {
    if (!referenceEl || !("getAttribute" in referenceEl)) {
      return;
    }

    const el = referenceEl;
    const current = el.getAttribute(ARIA_DESCRIBED_BY) || "";
    const tokens = current
      .split(/\s+/g)
      .filter(Boolean)
      .filter((token) => token !== id);

    if (tokens.length) {
      el.setAttribute(ARIA_DESCRIBED_BY, tokens.join(" "));
    } else if ("removeAttribute" in el) {
      el.removeAttribute(ARIA_DESCRIBED_BY);
    }
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
    setAttribute(this.el, "id", this.getId());
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
