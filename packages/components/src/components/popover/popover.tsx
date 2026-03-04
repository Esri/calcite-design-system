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
  filterValidFlipPlacements,
  FlipPlacement,
  FloatingCSS,
  FloatingLayout,
  FloatingUIComponent,
  hideFloatingUI,
  LogicalPlacement,
  OverlayPositioning,
  ReferenceElement,
  reposition,
} from "../../utils/floating-ui";
import { queryElementRoots } from "../../utils/dom";
import { toAriaBoolean } from "../../utils/aria";
import { guid } from "../../utils/guid";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { FloatingArrow } from "../functional/FloatingArrow";
import { useT9n } from "../../controllers/useT9n";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useTopLayer } from "../../controllers/useTopLayer";
import PopoverManager from "./PopoverManager";
import T9nStrings from "./assets/t9n/messages.en.json";
import { ARIA_CONTROLS, ARIA_EXPANDED, CSS, defaultPopoverPlacement } from "./resources";
import { styles } from "./popover.scss";

declare global {
  interface DeclareElements {
    "calcite-popover": Popover;
  }
}

const manager = new PopoverManager();

/** @slot - A slot for adding custom content. */
export class Popover extends LitElement implements FloatingUIComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private arrowEl: SVGSVGElement;

  private direction = useDirection();

  private filteredFlipPlacements: FlipPlacement[];

  floatingEl: HTMLDivElement;

  focusTrap = useFocusTrap<this>({
    triggerProp: "open",
    focusTrapOptions: {
      allowOutsideClick: true,
      escapeDeactivates: (event) => {
        if (!event.defaultPrevented) {
          this.open = false;
          event.preventDefault();
        }

        return false;
      },
    },
  })(this);

  private guid = `calcite-popover-${guid()}`;

  private hasLoaded = false;

  private mutationObserver: MutationObserver = createObserver("mutation", () =>
    this.focusTrap.updateContainerElements(),
  );

  transitionProp = "opacity" as const;

  transitionRef = createRef<HTMLDivElement>();

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  private topLayer = useTopLayer<this>({
    disabledOverride: () => this.open && !this.referenceEl,
    target: () => this.floatingEl,
  })(this);

  //#endregion

  //#region State Properties

  @state() floatingLayout: FloatingLayout = "vertical";

  @state() referenceEl: ReferenceElement;

  //#endregion

  //#region Public Properties

  /** When `true`, clicking outside of the component automatically closes open `calcite-popover`s. */
  @property({ reflect: true }) autoClose = false;

  /** When `true`, displays a close button in the component. */
  @property({ reflect: true }) closable = false;

  /** When `true`, prevents flipping the component's placement when overlapping its `referenceElement`. */
  @property({ reflect: true }) flipDisabled = false;

  /** Specifies the component's fallback `placement` for slotted content when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick`" allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active,
   * `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body, and
   * `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  /** Specifies the component's heading text. */
  @property() heading: string;

  /** Specifies the heading level number of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /**
   * Specifies an accessible label for the component.
   *
   * @required
   */
  @property() label: string;

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the distance to position the component away from the `referenceElement`.
   */
  @property({ type: Number, reflect: true }) offsetDistance = defaultOffsetDistance;

  /** Specifies the distance to position the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, displays and positions the component. */
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
  @property({ reflect: true }) placement: LogicalPlacement = defaultPopoverPlacement;

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
   *
   * @required
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

  /**
   * When `true`, disables automatically toggling the component when its `referenceElement` has been triggered.
   *
   * This property can be set to `true` to manage when the component is open.
   */
  @property({ reflect: true }) triggerDisabled = false;

  //#endregion

  //#region Public Methods

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
      flipDisabled,
      filteredFlipPlacements,
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
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  /**
   * Updates the element(s) that are included in the component's focus-trap.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.focusTrap.setExtraContainers(extraContainers);
    this.focusTrap.updateContainerElements();
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calcitePopoverBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calcitePopoverBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calcitePopoverClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calcitePopoverOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setFilteredPlacements();

    // we set up the ref element in the next frame to ensure PopoverManager
    // event handlers are invoked after connect (mainly for `components` output target)
    requestAnimationFrame(() => this.setUpReferenceElement(this.hasLoaded));
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (
      (changes.has("offsetDistance") &&
        (this.hasUpdated || this.offsetDistance !== defaultOffsetDistance)) ||
      (changes.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0)) ||
      (changes.has("overlayPositioning") &&
        (this.hasUpdated || this.overlayPositioning !== "absolute")) ||
      (changes.has("placement") && (this.hasUpdated || this.placement !== defaultPopoverPlacement))
    ) {
      this.reposition(true);
    }

    if (changes.has("referenceElement")) {
      this.referenceElementHandler();

      if (!this.referenceElement && this.open) {
        this.topLayer.hide();
      }
    }
  }

  loaded(): void {
    if (this.referenceElement && !this.referenceEl) {
      this.setUpReferenceElement();
    }

    this.hasLoaded = true;
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.removeReferences();
    disconnectFloatingUI(this);
  }

  //#endregion

  //#region Private Methods

  private flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  private openHandler(): void {
    toggleOpenClose(this);
    this.reposition(true);
    this.setExpandedAttr();
  }

  private referenceElementHandler(): void {
    this.setUpReferenceElement();
    this.reposition(true);
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;

    if (el) {
      requestAnimationFrame(() => this.setUpReferenceElement());
    }
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  }

  private setUpReferenceElement(warn = true): void {
    this.removeReferences();
    this.referenceEl = this.getReferenceElement();
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

  private setExpandedAttr(): void {
    const { referenceEl, open } = this;

    if (!referenceEl) {
      return;
    }

    if ("setAttribute" in referenceEl) {
      referenceEl.setAttribute(ARIA_EXPANDED, toAriaBoolean(open));
    }
  }

  private addReferences(): void {
    const { referenceEl } = this;

    if (!referenceEl) {
      return;
    }

    const id = this.getId();

    if ("setAttribute" in referenceEl) {
      referenceEl.setAttribute(ARIA_CONTROLS, id);
    }

    manager.registerElement(referenceEl, this.el);
    this.setExpandedAttr();
  }

  private removeReferences(): void {
    const { referenceEl } = this;

    if (!referenceEl) {
      return;
    }

    if ("removeAttribute" in referenceEl) {
      referenceEl.removeAttribute(ARIA_CONTROLS);
      referenceEl.removeAttribute(ARIA_EXPANDED);
    }

    manager.unregisterElement(referenceEl);
  }

  private getReferenceElement(): ReferenceElement {
    const { referenceElement, el } = this;

    return (
      (typeof referenceElement === "string"
        ? queryElementRoots(el, { id: referenceElement })
        : referenceElement) || null
    );
  }

  private hide(): void {
    this.open = false;
  }

  onBeforeOpen(): void {
    this.calcitePopoverBeforeOpen.emit();
    this.topLayer.show();
  }

  onOpen(): void {
    this.calcitePopoverOpen.emit();
    this.focusTrap.activate();
  }

  onBeforeClose(): void {
    this.calcitePopoverBeforeClose.emit();
  }

  onClose(): void {
    this.calcitePopoverClose.emit();
    hideFloatingUI(this);
    this.focusTrap.deactivate();
    this.topLayer.hide();
  }

  private setArrowEl(el: SVGSVGElement): void {
    this.arrowEl = el;
    this.reposition(true);
  }

  //#endregion

  //#region Rendering

  private renderCloseButton(): JsxNode {
    const { messages, closable } = this;
    return closable ? (
      <div class={CSS.closeButtonContainer} key={CSS.closeButtonContainer}>
        <calcite-action
          class={CSS.closeButton}
          icon="x"
          onClick={this.hide}
          scale={this.scale}
          text={messages.close}
        />
      </div>
    ) : null;
  }

  private renderHeader(): JsxNode {
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

  override render(): JsxNode {
    const { referenceEl, heading, label, open, pointerDisabled, floatingLayout } = this;
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
    this.el.role = "dialog";

    return (
      <div class={CSS.positionContainer} popover="manual" ref={this.setFloatingEl}>
        <div
          class={{
            [CSS.container]: true,
            [FloatingCSS.animation]: true,
            [FloatingCSS.animationActive]: displayed,
          }}
          ref={this.transitionRef}
        >
          {arrowNode}
          <div
            class={{
              [CSS.hasHeader]: !!heading,
              [CSS.headerContainer]: true,
            }}
          >
            {this.renderHeader()}
            <div class={CSS.content}>
              <slot />
            </div>
            {!heading ? this.renderCloseButton() : null}
          </div>
        </div>
      </div>
    );
  }

  //#endregion
}
