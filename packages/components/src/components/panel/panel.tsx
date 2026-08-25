import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  ToEvents,
} from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import {
  hasVisibleContent,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
  slotChangeHasTextContent,
} from "../../utils/dom";
import { getIconScale } from "../../utils/component";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Heading, HeadingLevel } from "../functional/Heading";
import {
  defaultEndMenuPlacement,
  FlipPlacement,
  LogicalPlacement,
  OverlayPositioning,
} from "../../utils/floating-ui";
import { CollapseDirection, Scale } from "../types";
import { useT9n } from "../../controllers/useT9n";
import type { Alert } from "../alert/alert";
import { isActionBar } from "../action-bar/resources";
import { useSetFocus } from "../../controllers/useSetFocus";
import { IconName } from "../icon/types";
import { styles as headerStyles } from "../../styles/component/header.scss";
import { useInteractive } from "../../controllers/useInteractive";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, IDS, SLOTS } from "./resources";
import { styles } from "./panel.scss";

declare global {
  interface DeclareElements {
    "calcite-panel": Panel;
  }
}

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 * @slot alerts - A slot for adding `calcite-alert`s to the component.
 * @slot content-bottom - A slot for adding content below the unnamed (default) slot and above the footer slot (if populated).
 * @slot content-top - A slot for adding content above the unnamed (default) slot and below the action-bar slot (if populated).
 * @slot header-actions-start - A slot for adding actions or content to the start side of the header.
 * @slot header-actions-end - A slot for adding actions or content to the end side of the header.
 * @slot header-content - A slot for adding custom content to the header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot heading - A slot for adding content to the heading area of the default header. Takes precedence over the `heading` property.
 * @slot description - A slot for adding content to the description area of the default header. Takes precedence over the `description` property.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots.
 * @slot footer-end - A slot for adding custom content to a trailing footer. Should not be used with the `"footer"` slot.
 * @slot footer-start - A slot for adding custom content to a leading footer. Should not be used with the `"footer"` slot.
 */
export class Panel extends LitElement {
  //#region Static Members

  static override styles = [headerStyles, styles];

  //#endregion

  //#region Private Properties

  private containerRef = createRef<HTMLDivElement>();

  private panelScrollEl?: HTMLElement;

  private resizeObserver = createObserver("resize", () => this.resizeHandler());

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private _closed = false;

  private focusSetter = useSetFocus<this>()(this);

  private focusTrapController = useFocusTrap<this>({
    focusTrapOptions: {
      allowOutsideClick: true,
      escapeDeactivates: (event) => {
        if (!event.defaultPrevented && this.closable) {
          this.emitCloseEvent();
          event.preventDefault();
        }

        return false;
      },
    },
  })(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region State Properties

  @state() hasActionBar = false;

  @state() hasContentBottom = false;

  @state() hasContentTop = false;

  @state() hasEndActions = false;

  @state() hasFab = false;

  @state() hasFooterContent = false;

  @state() hasFooterEndContent = false;

  @state() hasFooterStartContent = false;

  @state() hasHeaderContent = false;

  @state() hasHeaderDescription = false;

  @state() hasHeaderHeading = false;

  @state() hasMenuItems = false;

  @state() hasStartActions = false;

  @state() showHeaderContent = false;

  //#endregion

  //#region Public Properties

  /** Passes a function to run before the component closes. */
  @property() beforeClose?: () => Promise<void>;

  /** @copyDoc */
  @property({ reflect: true }) closable = false;

  /** @copyDoc */
  @property({ reflect: true })
  get closed(): boolean {
    return this._closed;
  }
  set closed(value: boolean) {
    const oldValue = this._closed;
    if (value !== oldValue) {
      this.setClosedState(value);
    }
  }

  /** When `collapsible` is `true`, specifies the direction of the collapse icon. */
  @property() collapseDirection: CollapseDirection = "down";

  /** When `true`, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /** When `true`, the component is collapsible. */
  @property({ reflect: true }) collapsible = false;

  /** @copyDoc */
  @property() description?: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** @copyDoc */
  @property() heading?: string;

  /** @copyDoc */
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon?: IconName;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * When `true`, enables focus trapping. Focus trapping is also prevented when `closed` or when `closable` is `false`.
   * @private
   */
  @property({ reflect: true }) focusTrapEnabled = false;

  /**
   * Specifies custom focus trap configuration on the component.
   *
   * - `"allowOutsideClick"` allows outside clicks.
   * - `"initialFocus"` enables initial focus.
   * - `"returnFocusOnDeactivate"` returns focus when not active.
   * - `"extraContainers"` specifies additional focusable elements external to the trap, such as 3rd-party components appending elements to the document body.
   * - `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated. Return `false` to prevent focus return, or `undefined` to use the default behavior (returning focus to the element focused before activation).
   * @private
   */
  @property() focusTrapOptions?: Partial<FocusTrapOptions>;

  /** @copyDoc */
  @property() menuFlipPlacements?: FlipPlacement[];

  /** When `true`, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

  /** Determines where the action menu will be positioned. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement = defaultEndMenuPlacement;

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  //#endregion

  //#region Public Methods

  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns promise that resolves once the content is scrolled to.
   */
  @method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    this.panelScrollEl?.scrollTo(options);
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
    return this.focusSetter(() => this.containerRef.value, options);
  }

  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   * @private
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.focusTrapController.setExtraContainers(extraContainers);
    this.focusTrapController.updateContainerElements();
  }

  //#endregion

  //#region Events

  /** Fires when the close button is clicked. */
  calcitePanelClose = createEvent({ cancelable: true });

  /** Fires when the component's content area is collapsed. */
  calcitePanelCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calcitePanelExpand = createEvent({ cancelable: false });

  /** Fires when the content is scrolled. */
  calcitePanelScroll = createEvent({ cancelable: false });

  /** Fires when the collapse button is clicked. */
  calcitePanelToggle = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen("keydown", this.panelKeyDownHandler);
    this.listen<ToEvents<Panel>["calcitePanelClose"]>("calcitePanelClose", this.panelCloseHandler);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calcitePanelCollapse.emit();
      } else {
        this.calcitePanelExpand.emit();
      }
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("focusTrapEnabled") || changes.has("closable") || changes.has("closed")) {
      if (!this.closed && this.closable && this.focusTrapEnabled) {
        this.focusTrapController.activate();
      } else {
        this.focusTrapController.deactivate();
      }
    }
  }

  override disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  /** When defined, provides a condition to disable focus trapping. When `true`, prevents focus trapping. */
  focusTrapDisabledOverride(): boolean {
    return !this.focusTrapEnabled || !this.closable || this.closed;
  }

  private async setClosedState(value: boolean): Promise<void> {
    if (this.beforeClose && value) {
      try {
        await this.beforeClose?.();
      } catch {
        return;
      }
    }

    this._closed = value;
  }

  private resizeHandler(): void {
    const { panelScrollEl } = this;

    if (
      !panelScrollEl ||
      typeof panelScrollEl.scrollHeight !== "number" ||
      typeof panelScrollEl.offsetHeight !== "number"
    ) {
      return;
    }

    const hasScrollingContent = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight;

    // intentionally using setAttribute to avoid reflecting -1 so default browser behavior will occur
    if (hasScrollingContent) {
      panelScrollEl.setAttribute("tabindex", "0");
    } else {
      panelScrollEl.removeAttribute("tabindex");
    }
  }

  private closeClickHandler(): void {
    this.emitCloseEvent();
  }

  private emitCloseEvent(): void {
    this.calcitePanelClose.emit();
  }

  private panelKeyDownHandler(event: KeyboardEvent): void {
    if (event.key !== "Escape" || event.defaultPrevented || this.closed || !this.closable) {
      return;
    }

    event.preventDefault();
    this.emitCloseEvent();
  }

  private panelCloseHandler(event: CustomEvent<void>): void {
    if (event.defaultPrevented || event.target !== this.el) {
      return;
    }

    this.closed = true;
  }

  private collapse(): void {
    this.collapsed = !this.collapsed;
    this.calcitePanelToggle.emit();
  }

  private panelScrollHandler(): void {
    this.calcitePanelScroll.emit();
  }

  private handleHeaderActionsStartSlotChange(event: Event): void {
    this.hasStartActions = slotChangeHasAssignedElement(event);
  }

  private handleHeaderActionsEndSlotChange(event: Event): void {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  }

  private handleHeaderMenuActionsSlotChange(event: Event): void {
    this.hasMenuItems = slotChangeHasAssignedElement(event);
  }

  private handleActionBarSlotChange(event: Event): void {
    const actionBars = slotChangeGetAssignedElements(event).filter(isActionBar);

    actionBars.forEach((actionBar) => (actionBar.layout = "horizontal"));

    this.hasActionBar = !!actionBars.length;
  }

  private handleHeaderContentSlotChange(event: Event): void {
    this.hasHeaderContent = slotChangeHasAssignedElement(event);
  }

  private handleHeaderDescriptionSlotChange(event: Event): void {
    this.hasHeaderDescription =
      slotChangeHasTextContent(event) ||
      slotChangeGetAssignedElements<HTMLElement>(event).some(hasVisibleContent);
  }

  private handleHeaderHeadingSlotChange(event: Event): void {
    this.hasHeaderHeading =
      slotChangeHasTextContent(event) ||
      slotChangeGetAssignedElements<HTMLElement>(event).some(hasVisibleContent);
  }

  private handleFabSlotChange(event: Event): void {
    this.hasFab = slotChangeHasAssignedElement(event);
  }

  private handleFooterEndSlotChange(event: Event): void {
    this.hasFooterEndContent = slotChangeHasAssignedElement(event);
  }

  private handleFooterStartSlotChange(event: Event): void {
    this.hasFooterStartContent = slotChangeHasAssignedElement(event);
  }

  private handleFooterSlotChange(event: Event): void {
    this.hasFooterContent = slotChangeHasAssignedElement(event);
  }

  private contentBottomSlotChangeHandler(event: Event): void {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  }

  private contentTopSlotChangeHandler(event: Event): void {
    this.hasContentTop = slotChangeHasAssignedElement(event);
  }

  private setPanelScrollEl(el?: HTMLElement): void {
    updateRefObserver(this.resizeObserver, this.panelScrollEl, el);
    this.panelScrollEl = el;
  }

  private handleAlertsSlotChange(event: Event): void {
    slotChangeGetAssignedElements(event)?.map((el) => {
      if (el.nodeName === "CALCITE-ALERT") {
        (el as Alert["el"]).embedded = true;
      }
    });
  }

  //#endregion

  //#region Rendering

  private renderHeaderContent(): JsxNode {
    const {
      heading,
      headingLevel,
      description,
      hasHeaderContent,
      hasHeaderDescription,
      hasHeaderHeading,
      icon,
      scale,
    } = this;

    const showHeaderHeading = !!heading || hasHeaderHeading;
    const showHeaderDescription = !!description || hasHeaderDescription;
    const showHeaderTextContent = showHeaderHeading || showHeaderDescription;

    const iconNode = icon ? (
      <calcite-icon
        class={CSS.icon}
        flipRtl={this.iconFlipRtl}
        icon={icon}
        scale={getIconScale(scale)}
      />
    ) : null;

    const headingNode = (
      <Heading class={CSS.heading} hidden={!showHeaderHeading} level={headingLevel}>
        <slot
          hidden={!hasHeaderHeading}
          name={SLOTS.heading}
          onSlotChange={this.handleHeaderHeadingSlotChange}
        />
        {!hasHeaderHeading ? heading : null}
      </Heading>
    );

    const descriptionNode = (
      <span class={CSS.description} hidden={!showHeaderDescription}>
        <slot
          hidden={!hasHeaderDescription}
          name={SLOTS.description}
          onSlotChange={this.handleHeaderDescriptionSlotChange}
        />
        {!hasHeaderDescription ? description : null}
      </span>
    );

    return (
      <div
        class={{ [CSS.headerContent]: true, [CSS.headerNonSlottedContent]: true }}
        hidden={hasHeaderContent || !showHeaderTextContent}
        key="header-content"
      >
        {iconNode}
        <div class={CSS.headingTextContent}>
          {headingNode}
          {descriptionNode}
        </div>
      </div>
    );
  }

  private renderActionBar(): JsxNode {
    return (
      <div class={CSS.actionBarContainer} hidden={!this.hasActionBar}>
        <slot name={SLOTS.actionBar} onSlotChange={this.handleActionBarSlotChange} />
      </div>
    );
  }

  private renderHeaderSlottedContent(): JsxNode {
    return (
      <div
        class={{ [CSS.headerContent]: true, [CSS.headerSlottedContent]: true }}
        hidden={!this.hasHeaderContent}
        key="slotted-header-content"
      >
        <slot name={SLOTS.headerContent} onSlotChange={this.handleHeaderContentSlotChange} />
      </div>
    );
  }

  private renderHeaderStartActions(): JsxNode {
    const { hasStartActions } = this;

    return (
      <div
        class={{ [CSS.headerActionsStart]: true, [CSS.headerActions]: true }}
        hidden={!hasStartActions}
        key="header-actions-start"
      >
        <slot
          name={SLOTS.headerActionsStart}
          onSlotChange={this.handleHeaderActionsStartSlotChange}
        />
      </div>
    );
  }

  private renderHeaderActionsEnd(): JsxNode {
    const {
      hasEndActions,
      messages,
      closable,
      collapsed,
      collapseDirection,
      collapsible,
      hasMenuItems,
    } = this;
    const { collapse, expand, close } = messages;

    const icons = [ICONS.expand, ICONS.collapse];

    if (collapseDirection === "up") {
      icons.reverse();
    }

    const collapseNode = collapsible ? (
      <calcite-action
        aria={{ expanded: !collapsed }}
        icon={collapsed ? icons[0] : icons[1]}
        id={IDS.collapse}
        label={collapse}
        onClick={this.collapse}
        scale={this.scale}
        text={collapse}
        title={collapsed ? expand : collapse}
      />
    ) : null;

    const closeNode = closable ? (
      <calcite-action
        ariaLabel={close}
        icon={ICONS.close}
        id={IDS.close}
        onClick={this.closeClickHandler}
        scale={this.scale}
        text={close}
        title={close}
      />
    ) : null;

    const slotNode = (
      <slot name={SLOTS.headerActionsEnd} onSlotChange={this.handleHeaderActionsEndSlotChange} />
    );

    const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;

    return (
      <div
        class={{ [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }}
        hidden={!showContainer}
        key="header-actions-end"
      >
        {slotNode}
        {this.renderMenu()}
        {collapseNode}
        {closeNode}
      </div>
    );
  }

  private renderMenu(): JsxNode {
    const { hasMenuItems, messages, menuOpen, menuFlipPlacements, menuPlacement, scale } = this;

    return (
      <calcite-action-menu
        flipPlacements={menuFlipPlacements ?? ["top", "bottom"]}
        hidden={!hasMenuItems}
        key="menu"
        label={messages.options}
        open={menuOpen}
        overlayPositioning={this.overlayPositioning}
        placement={menuPlacement}
        scale={scale}
        topLayerDisabled={this.topLayerDisabled}
      >
        <calcite-action
          class={CSS.menuAction}
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.options}
        />
        <slot
          name={SLOTS.headerMenuActions}
          onSlotChange={this.handleHeaderMenuActionsSlotChange}
        />
      </calcite-action-menu>
    );
  }

  private renderHeaderNode(): JsxNode {
    const {
      hasHeaderContent,
      hasHeaderDescription,
      hasHeaderHeading,
      hasStartActions,
      hasEndActions,
      closable,
      collapsible,
      hasMenuItems,
      hasActionBar,
      hasContentTop,
      heading,
      description,
    } = this;

    const headerContentNode = this.renderHeaderContent();
    const hasDefaultHeaderContent =
      !!heading || !!description || hasHeaderHeading || hasHeaderDescription;

    const showHeaderContent =
      hasHeaderContent ||
      hasDefaultHeaderContent ||
      hasStartActions ||
      hasEndActions ||
      collapsible ||
      closable ||
      hasMenuItems ||
      hasActionBar ||
      hasContentTop;

    this.showHeaderContent = showHeaderContent;

    return (
      <header class={CSS.header} hidden={!(showHeaderContent || hasActionBar || hasContentTop)}>
        <div
          class={{ [CSS.headerContainer]: true, [CSS.headerContainerBorderEnd]: hasActionBar }}
          hidden={!showHeaderContent}
        >
          {this.renderHeaderStartActions()}
          {this.renderHeaderSlottedContent()}
          {headerContentNode}
          {this.renderHeaderActionsEnd()}
        </div>
        {this.renderActionBar()}
        {this.renderContentTop()}
      </header>
    );
  }

  private renderFooterNode(): JsxNode {
    const { hasFooterEndContent, hasFooterStartContent, hasFooterContent } = this;

    const showFooter = hasFooterStartContent || hasFooterEndContent || hasFooterContent;

    return (
      <footer class={CSS.footer} hidden={!showFooter}>
        <div class={CSS.footerContent} hidden={!hasFooterContent}>
          <slot name={SLOTS.footer} onSlotChange={this.handleFooterSlotChange} />
        </div>
        <div class={CSS.footerStart} hidden={hasFooterContent || !hasFooterStartContent}>
          <slot name={SLOTS.footerStart} onSlotChange={this.handleFooterStartSlotChange} />
        </div>
        <div class={CSS.footerEnd} hidden={hasFooterContent || !hasFooterEndContent}>
          <slot name={SLOTS.footerEnd} onSlotChange={this.handleFooterEndSlotChange} />
        </div>
      </footer>
    );
  }

  private renderContent(): JsxNode {
    return (
      <div
        class={CSS.contentWrapper}
        hidden={this.collapsible && this.collapsed}
        onScroll={this.panelScrollHandler}
        ref={this.setPanelScrollEl}
      >
        <slot />
        {this.renderFab()}
      </div>
    );
  }

  private renderContentBottom(): JsxNode {
    return (
      <div class={CSS.contentBottom} hidden={!this.hasContentBottom}>
        <slot name={SLOTS.contentBottom} onSlotChange={this.contentBottomSlotChangeHandler} />
      </div>
    );
  }

  private renderContentTop(): JsxNode {
    return (
      <div class={CSS.contentTop} hidden={!this.hasContentTop}>
        <slot name={SLOTS.contentTop} onSlotChange={this.contentTopSlotChangeHandler} />
      </div>
    );
  }

  private renderFab(): JsxNode {
    return (
      <div class={CSS.fabContainer} hidden={!this.hasFab}>
        <slot name={SLOTS.fab} onSlotChange={this.handleFabSlotChange} />
      </div>
    );
  }

  override render(): JsxNode {
    const { disabled, loading, closed, heading, description, focusTrapEnabled, closable } = this;
    const hasDialogRole = focusTrapEnabled && closable;

    const panelNode = (
      <div
        ariaBusy={loading}
        ariaDescription={hasDialogRole && description ? description : undefined}
        ariaLabel={hasDialogRole && heading ? heading : undefined}
        ariaLive={hasDialogRole ? "polite" : undefined}
        class={CSS.container}
        hidden={closed}
        ref={this.containerRef}
        role={hasDialogRole ? "dialog" : "article"}
      >
        {this.renderHeaderNode()}
        {this.renderContent()}
        {this.renderContentBottom()}
        {this.renderFooterNode()}
        <slot key="alerts" name={SLOTS.alerts} onSlotChange={this.handleAlertsSlotChange} />
      </div>
    );

    return (
      <this.interactiveContainer disabled={disabled}>
        {loading ? <calcite-scrim loading={loading} /> : null}
        {panelNode}
      </this.interactiveContainer>
    );
  }

  //#endregion
}
