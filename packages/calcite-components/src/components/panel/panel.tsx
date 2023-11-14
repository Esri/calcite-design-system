import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  focusFirstTabbable,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
  toAriaBoolean,
} from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Heading, HeadingLevel } from "../functional/Heading";
import { CSS, ICONS, SLOTS } from "./resources";

import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { PanelMessages } from "./assets/panel/t9n";
import { toTestObject } from "../../utils/component";

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 * @slot header-actions-start - A slot for adding actions or content to the start side of the header.
 * @slot header-actions-end - A slot for adding actions or content to the end side of the header.
 * @slot header-content - A slot for adding custom content to the header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - [Deprecated] Use the `"footer"` slot instead. A slot for adding `calcite-button`s to the component's footer.
 * @slot footer - A slot for adding custom content to the footer.
 */
@Component({
  tag: "calcite-panel",
  styleUrl: "panel.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Panel
  implements InteractiveComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** When `true`, the component will be hidden. */
  @Prop({ mutable: true, reflect: true }) closed = false;

  /**
   *  When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** When `true`, displays a close button in the trailing side of the header. */
  @Prop({ reflect: true }) closable = false;

  /**
   * When `true`, hides the component's content area.
   */
  @Prop({ reflect: true }) collapsed = false;

  /**
   * Specifies the direction of the collapse.
   *
   * @internal
   */
  @Prop() collapseDirection: "down" | "up" = "down";

  /**
   * When `true`, the component is collapsible.
   */
  @Prop({ reflect: true }) collapsible = false;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /** A description for the component. */
  @Prop() description: string;

  /**
   * When `true`, the action menu items in the `header-menu-actions` slot are open.
   */
  @Prop({ reflect: true }) menuOpen = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<PanelMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: PanelMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    this.resizeObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePanelElement;

  containerEl: HTMLElement;

  panelScrollEl: HTMLElement;

  resizeObserver = createObserver("resize", () => this.resizeHandler());

  @State() hasStartActions = false;

  @State() hasEndActions = false;

  @State() hasMenuItems = false;

  @State() hasHeaderContent = false;

  @State() hasActionBar = false;

  @State() hasFooterContent = false;

  @State() hasFooterActions = false;

  @State() hasFab = false;

  @State() defaultMessages: PanelMessages;

  @State() effectiveLocale = "";

  @State() showHeaderContent = false;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the close button is clicked.
   */
  @Event({ cancelable: false }) calcitePanelClose: EventEmitter<void>;

  /**
   * Fires when the collapse button is clicked.
   */
  @Event({ cancelable: false }) calcitePanelToggle: EventEmitter<void>;

  /**
   * Fires when the content is scrolled.
   */
  @Event({ cancelable: false }) calcitePanelScroll: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  resizeHandler = (): void => {
    const { panelScrollEl } = this;

    if (
      !panelScrollEl ||
      typeof panelScrollEl.scrollHeight !== "number" ||
      typeof panelScrollEl.offsetHeight !== "number"
    ) {
      return;
    }

    panelScrollEl.tabIndex = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight ? 0 : -1;
  };

  setContainerRef = (node: HTMLElement): void => {
    this.containerEl = node;
  };

  panelKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.closable && event.key === "Escape" && !event.defaultPrevented) {
      this.close();
      event.preventDefault();
    }
  };

  close = (): void => {
    this.closed = true;
    this.calcitePanelClose.emit();
  };

  collapse = (): void => {
    this.collapsed = !this.collapsed;
    this.calcitePanelToggle.emit();
  };

  panelScrollHandler = (): void => {
    this.calcitePanelScroll.emit();
  };

  handleHeaderActionsStartSlotChange = (event: Event): void => {
    this.hasStartActions = slotChangeHasAssignedElement(event);
  };

  handleHeaderActionsEndSlotChange = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };

  handleHeaderMenuActionsSlotChange = (event: Event): void => {
    this.hasMenuItems = slotChangeHasAssignedElement(event);
  };

  handleActionBarSlotChange = (event: Event): void => {
    const actionBars = slotChangeGetAssignedElements(event).filter((el) =>
      el?.matches("calcite-action-bar")
    ) as HTMLCalciteActionBarElement[];

    actionBars.forEach((actionBar) => (actionBar.layout = "horizontal"));

    this.hasActionBar = !!actionBars.length;
  };

  handleHeaderContentSlotChange = (event: Event): void => {
    this.hasHeaderContent = slotChangeHasAssignedElement(event);
  };

  handleFooterSlotChange = (event: Event): void => {
    this.hasFooterContent = slotChangeHasAssignedElement(event);
  };

  handleFooterActionsSlotChange = (event: Event): void => {
    this.hasFooterActions = slotChangeHasAssignedElement(event);
  };

  handleFabSlotChange = (event: Event): void => {
    this.hasFab = slotChangeHasAssignedElement(event);
  };

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.containerEl);
  }

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
   * @returns - promise that resolves once the content is scrolled to.
   */
  @Method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    this.panelScrollEl?.scrollTo(options);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeaderContent(): VNode {
    const { heading, headingLevel, description, hasHeaderContent } = this;
    const headingNode = heading ? (
      <Heading class={CSS.heading} level={headingLevel}>
        {heading}
      </Heading>
    ) : null;

    const descriptionNode = description ? <span class={CSS.description}>{description}</span> : null;

    return !hasHeaderContent && (headingNode || descriptionNode) ? (
      <div class={CSS.headerContent} key="header-content">
        {headingNode}
        {descriptionNode}
      </div>
    ) : null;
  }

  renderActionBar(): VNode {
    return (
      <div class={CSS.actionBarContainer} hidden={!this.hasActionBar}>
        <slot name={SLOTS.actionBar} onSlotchange={this.handleActionBarSlotChange} />
      </div>
    );
  }

  renderHeaderSlottedContent(): VNode {
    return (
      <div class={CSS.headerContent} hidden={!this.hasHeaderContent} key="slotted-header-content">
        <slot name={SLOTS.headerContent} onSlotchange={this.handleHeaderContentSlotChange} />
      </div>
    );
  }

  renderHeaderStartActions(): VNode {
    const { hasStartActions } = this;

    return (
      <div
        class={{ [CSS.headerActionsStart]: true, [CSS.headerActions]: true }}
        hidden={!hasStartActions}
        key="header-actions-start"
      >
        <slot
          name={SLOTS.headerActionsStart}
          onSlotchange={this.handleHeaderActionsStartSlotChange}
        />
      </div>
    );
  }

  renderHeaderActionsEnd(): VNode {
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
        aria-expanded={toAriaBoolean(!collapsed)}
        aria-label={collapse}
        icon={collapsed ? icons[0] : icons[1]}
        onClick={this.collapse}
        text={collapse}
        title={collapsed ? expand : collapse}
        {...toTestObject("id", "collapse")}
      />
    ) : null;

    const closeNode = closable ? (
      <calcite-action
        aria-label={close}
        icon={ICONS.close}
        onClick={this.close}
        text={close}
        title={close}
        {...toTestObject("id", "close")}
      />
    ) : null;

    const slotNode = (
      <slot name={SLOTS.headerActionsEnd} onSlotchange={this.handleHeaderActionsEndSlotChange} />
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

  renderMenu(): VNode {
    const { hasMenuItems, messages, menuOpen } = this;

    return (
      <calcite-action-menu
        flipPlacements={["top", "bottom"]}
        hidden={!hasMenuItems}
        key="menu"
        label={messages.options}
        open={menuOpen}
        placement="bottom-end"
      >
        <calcite-action
          icon={ICONS.menu}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.options}
        />
        <slot
          name={SLOTS.headerMenuActions}
          onSlotchange={this.handleHeaderMenuActionsSlotChange}
        />
      </calcite-action-menu>
    );
  }

  renderHeaderNode(): VNode {
    const {
      hasHeaderContent,
      hasStartActions,
      hasEndActions,
      closable,
      collapsible,
      hasMenuItems,
      hasActionBar,
    } = this;

    const headerContentNode = this.renderHeaderContent();

    const showHeaderContent =
      hasHeaderContent ||
      !!headerContentNode ||
      hasStartActions ||
      hasEndActions ||
      collapsible ||
      closable ||
      hasMenuItems;

    this.showHeaderContent = showHeaderContent;

    return (
      <header class={CSS.header} hidden={!(showHeaderContent || hasActionBar)}>
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
      </header>
    );
  }

  renderFooterNode(): VNode {
    const { hasFooterContent, hasFooterActions } = this;

    const showFooter = hasFooterContent || hasFooterActions;

    return (
      <footer class={CSS.footer} hidden={!showFooter}>
        <slot key="footer-slot" name={SLOTS.footer} onSlotchange={this.handleFooterSlotChange} />
        <slot
          key="footer-actions-slot"
          name={SLOTS.footerActions}
          onSlotchange={this.handleFooterActionsSlotChange}
        />
      </footer>
    );
  }

  setPanelScrollEl = (el: HTMLElement): void => {
    this.panelScrollEl = el;
    this.resizeObserver?.disconnect();

    if (el) {
      this.resizeObserver?.observe(el);
      this.resizeHandler();
    }
  };

  renderContent(): VNode {
    return (
      <div
        class={CSS.contentWrapper}
        hidden={this.collapsible && this.collapsed}
        onScroll={this.panelScrollHandler}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setPanelScrollEl}
      >
        <slot />
        {this.renderFab()}
      </div>
    );
  }

  renderFab(): VNode {
    return (
      <div class={CSS.fabContainer} hidden={!this.hasFab}>
        <slot name={SLOTS.fab} onSlotchange={this.handleFabSlotChange} />
      </div>
    );
  }

  render(): VNode {
    const { loading, panelKeyDownHandler, closed, closable } = this;

    const panelNode = (
      <article
        aria-busy={toAriaBoolean(loading)}
        class={CSS.container}
        hidden={closed}
        onKeyDown={panelKeyDownHandler}
        tabIndex={closable ? 0 : -1}
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={this.setContainerRef}
      >
        {this.renderHeaderNode()}
        {this.renderContent()}
        {this.renderFooterNode()}
      </article>
    );

    return (
      <Fragment>
        {loading ? <calcite-scrim loading={loading} /> : null}
        {panelNode}
      </Fragment>
    );
  }
}
