import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import {
  defaultOffsetDistance,
  connectFloatingUI,
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
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Scale } from "../types";
import { createObserver } from "../../utils/observers";
import { FloatingArrow } from "../functional/FloatingArrow";
import { useT9n } from "../../controllers/useT9n";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useTopLayer } from "../../controllers/useTopLayer";
import { referenceElementManager } from "../../controllers/useReferenceElement/manager";
import {
  ReferenceElementComponent,
  ReferenceElementType,
  useReferenceElement,
} from "../../controllers/useReferenceElement";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, defaultPopoverPlacement } from "./resources";
import { styles } from "./popover.scss";

declare global {
  interface DeclareElements {
    "calcite-popover": Popover;
  }
}

const manager = referenceElementManager({ click: true });

/** @slot - A slot for adding custom content. */
export class Popover extends LitElement implements FloatingUIComponent, ReferenceElementComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  referenceElementType: ReferenceElementType = "click";

  referenceElementController = useReferenceElement({ manager })(this);

  private arrowEl?: SVGSVGElement;

  private direction = useDirection();

  private filteredFlipPlacements?: FlipPlacement[];

  floatingEl?: HTMLDivElement;

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

  private mutationObserver = createObserver("mutation", () =>
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

  @state() referenceEl?: ReferenceElement;

  //#endregion

  //#region Public Properties

  /** When `true`, clicking outside of the component automatically closes open `calcite-popover`s. */
  @property({ reflect: true }) autoClose = false;

  /** @copyDoc */
  @property({ reflect: true }) closable = false;

  /** When `true`, prevents flipping the component's placement when overlapping its `referenceElement`. */
  @property({ reflect: true }) flipDisabled = false;

  /** @copyDoc */
  @property() flipPlacements?: FlipPlacement[];

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /**
   * Specifies custom focus trap configuration on the component.
   *
   * - `"allowOutsideClick`" allows outside clicks.
   * - `"initialFocus"` enables initial focus.
   * - `"returnFocusOnDeactivate"` returns focus when not active.
   * - `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body.
   * - `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   */
  @property() focusTrapOptions?: Partial<FocusTrapOptions>;

  /** @copyDoc */
  @property() heading?: string;

  /** @copyDoc */
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;

  /**
   * @copyDoc
   * @required
   */
  @property() label!: string;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the distance to position the component away from the `referenceElement`.
   */
  @property({ type: Number, reflect: true }) offsetDistance = defaultOffsetDistance;

  /** Specifies the distance to position the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the component will be positioned relative to the `referenceElement`. */
  @property({ reflect: true }) placement: LogicalPlacement = defaultPopoverPlacement;

  /** When `true`, removes the caret pointer. */
  @property({ reflect: true }) pointerDisabled = false;

  /**
   * @copyDoc
   *
   * @required
   */
  @property() referenceElement!: ReferenceElement | string;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
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
        referenceEl,
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
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
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
    this.mutationObserver?.disconnect();
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
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : undefined;
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
