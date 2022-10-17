import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch,
  h,
  VNode,
  Fragment,
  State
} from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { Scale } from "../interfaces";
import { HeadingLevel, Heading } from "../functional/Heading";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding custom content.
 * @slot header-actions-start - A slot for adding actions or content to the start side of the header.
 * @slot header-actions-end - A slot for adding actions or content to the end side of the header.
 * @slot header-content - A slot for adding custom content to the header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding buttons to the footer.
 * @slot footer - A slot for adding custom content to the footer.
 */
@Component({
  tag: "calcite-panel",
  styleUrl: "panel.scss",
  shadow: true
})
export class Panel implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, hides the component.
   *
   * @deprecated use `closed` instead.
   */
  @Prop({ mutable: true, reflect: true }) dismissed = false;

  /** When `true`, the component will be hidden. */
  @Prop({ mutable: true, reflect: true }) closed = false;

  @Watch("dismissed")
  dismissedHandler(value: boolean): void {
    this.closed = value;
    this.calcitePanelDismissedChange.emit();
  }

  @Watch("closed")
  closedHandler(value: boolean): void {
    this.dismissed = value;
  }

  /**
   * When provided, this method will be called before it is removed from the parent flow.
   *
   * @deprecated use `calcite-flow-item` instead.
   */
  @Prop() beforeBack?: () => Promise<void>;

  /**
   *  When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, a close button is added to the component.
   *
   * @deprecated use `closable` instead
   */
  @Prop({ mutable: true, reflect: true }) dismissible = false;

  @Watch("dismissible")
  dismissibleHandler(value: boolean): void {
    this.closable = value;
  }

  /** When `true`, displays a close button in the trailing side of the header. */
  @Prop({ mutable: true, reflect: true }) closable = false;

  @Watch("closable")
  closableHandler(value: boolean): void {
    this.dismissible = value;
  }

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * When `true`, displays a back button in the header.
   *
   * @deprecated use `calcite-flow-item` instead.
   */
  @Prop({ reflect: true }) showBackButton = false;

  /**
   * Accessible name for the component's back button. The back button will only be shown when `showBackButton` is `true`.
   *
   * @deprecated use `calcite-flow-item` instead.
   */
  @Prop() intlBack?: string;

  /**
   * Specifies the maximum height of the component.
   */
  @Prop({ reflect: true }) heightScale?: Scale;

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) widthScale?: Scale;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Accessible name for the component's close button. The close button will only be shown when `closeable` is `true`.
   */
  @Prop() intlClose?: string;

  /**
   * Accessible name for the component's actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * The component header text.
   */
  @Prop() heading?: string;

  /**
   * Summary text. A description displayed underneath the heading.
   *
   * @deprecated use `description` instead.
   */
  @Prop() summary?: string;

  /** A description for the component. */
  @Prop() description: string;

  /**
   * When `true`, the action menu items in the `header-menu-actions` slot are open.
   */
  @Prop({ reflect: true }) menuOpen = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePanelElement;

  backButtonEl: HTMLCalciteActionElement;

  closeButtonEl: HTMLCalciteActionElement;

  containerEl: HTMLElement;

  panelScrollEl: HTMLElement;

  resizeObserver = createObserver("resize", () => this.resizeHandler());

  @State() hasStartActions = false;

  @State() hasEndActions = false;

  @State() hasMenuItems = false;

  @State() hasHeaderContent = false;

  @State() hasFooterContent = false;

  @State() hasFooterActions = false;

  @State() hasFab = false;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    const isClosed = this.dismissed || this.closed;
    const isClosable = this.dismissible || this.closable;

    if (isClosed) {
      this.dismissedHandler(isClosed);
      this.closedHandler(isClosed);
    }

    if (isClosable) {
      this.dismissibleHandler(isClosable);
      this.closableHandler(isClosable);
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
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
   * Fires when the close button is clicked.
   *
   * @deprecated use `calcitePanelClose` instead.
   */
  @Event({ cancelable: false }) calcitePanelDismiss: EventEmitter<void>;

  /**
   * Fires when there is a change to the `dismissed` property value .
   *
   * @deprecated use `calcitePanelClose` instead.
   */
  @Event({ cancelable: false }) calcitePanelDismissedChange: EventEmitter<void>;

  /**
   * Fires when the content is scrolled.
   */
  @Event({ cancelable: false }) calcitePanelScroll: EventEmitter<void>;

  /**
   * Fires when the back button is clicked.
   *
   * @deprecated use `calcite-flow-item` instead.
   */
  @Event({ cancelable: false }) calcitePanelBackClick: EventEmitter<void>;

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

  setCloseRef = (node: HTMLCalciteActionElement): void => {
    this.closeButtonEl = node;
  };

  setBackRef = (node: HTMLCalciteActionElement): void => {
    this.backButtonEl = node;
  };

  panelKeyDownHandler = (event: KeyboardEvent): void => {
    if (this.closable && event.key === "Escape" && !event.defaultPrevented) {
      this.close();
      event.preventDefault();
    }
  };

  close = (): void => {
    this.closed = true;
    this.calcitePanelDismiss.emit();
    this.calcitePanelClose.emit();
  };

  panelScrollHandler = (): void => {
    this.calcitePanelScroll.emit();
  };

  backButtonClick = (): void => {
    this.calcitePanelBackClick.emit();
  };

  handleHeaderActionsStartSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasStartActions = !!elements.length;
  };

  handleHeaderActionsEndSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasEndActions = !!elements.length;
  };

  handleHeaderMenuActionsSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasMenuItems = !!elements.length;
  };

  handleHeaderContentSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasHeaderContent = !!elements.length;
  };

  handleFooterSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasFooterContent = !!elements.length;
  };

  handleFooterActionsSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasFooterActions = !!elements.length;
  };

  handleFabSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasFab = !!elements.length;
  };

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  @Method()
  async setFocus(focusId?: "back-button" | "dismiss-button"): Promise<void> {
    const { backButtonEl, closeButtonEl, containerEl } = this;

    if (focusId === "back-button") {
      backButtonEl?.setFocus();
      return;
    }

    if (focusId === "dismiss-button") {
      closeButtonEl?.setFocus();
      return;
    }

    if (backButtonEl) {
      backButtonEl.setFocus();
      return;
    }

    if (closeButtonEl) {
      closeButtonEl.setFocus();
      return;
    }

    containerEl?.focus();
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
   * @param options
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

  renderBackButton(): VNode {
    const { el } = this;

    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        aria-label={label}
        class={CSS.backButton}
        icon={icon}
        key="back-button"
        onClick={backButtonClick}
        ref={this.setBackRef}
        scale="s"
        slot={SLOTS.headerActionsStart}
        text={label}
      />
    ) : null;
  }

  renderHeaderContent(): VNode {
    const { heading, headingLevel, summary, description, hasHeaderContent } = this;
    const headingNode = heading ? (
      <Heading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
        {heading}
      </Heading>
    ) : null;

    const descriptionNode =
      description || summary ? <span class={CSS.description}>{description || summary}</span> : null;

    return !hasHeaderContent && (headingNode || descriptionNode) ? (
      <div class={CSS.headerContent} key="header-content">
        {headingNode}
        {descriptionNode}
      </div>
    ) : null;
  }

  /**
   * Allows user to override the entire header-content node.
   */
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
    const { close, hasEndActions, intlClose, closable } = this;
    const text = intlClose || TEXT.close;

    const closableNode = closable ? (
      <calcite-action
        aria-label={text}
        icon={ICONS.close}
        onClick={close}
        ref={this.setCloseRef}
        text={text}
      />
    ) : null;

    const slotNode = (
      <slot name={SLOTS.headerActionsEnd} onSlotchange={this.handleHeaderActionsEndSlotChange} />
    );

    const showContainer = hasEndActions || closableNode;

    return (
      <div
        class={{ [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }}
        hidden={!showContainer}
        key="header-actions-end"
      >
        {slotNode}
        {closableNode}
      </div>
    );
  }

  renderMenu(): VNode {
    const { hasMenuItems, intlOptions, menuOpen } = this;

    return (
      <calcite-action-menu
        flipPlacements={["top", "bottom"]}
        hidden={!hasMenuItems}
        key="menu"
        label={intlOptions || TEXT.options}
        open={menuOpen}
        placement="bottom-end"
      >
        <calcite-action
          icon={ICONS.menu}
          slot={ACTION_MENU_SLOTS.trigger}
          text={intlOptions || TEXT.options}
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
      showBackButton,
      hasHeaderContent,
      hasStartActions,
      hasEndActions,
      closable,
      hasMenuItems
    } = this;

    const headerContentNode = this.renderHeaderContent();

    const showHeader =
      showBackButton ||
      hasHeaderContent ||
      headerContentNode ||
      hasStartActions ||
      hasEndActions ||
      closable ||
      hasMenuItems;

    return (
      <header class={CSS.header} hidden={!showHeader}>
        {this.renderBackButton()}
        {this.renderHeaderStartActions()}
        {this.renderHeaderSlottedContent()}
        {headerContentNode}
        {this.renderHeaderActionsEnd()}
        {this.renderMenu()}
      </header>
    );
  }

  renderFooterNode(): VNode {
    const { hasFooterContent, hasFooterActions } = this;

    const showFooter = hasFooterContent || hasFooterActions;

    return (
      <footer class={CSS.footer} hidden={!showFooter} key="footer">
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
    const { hasFab } = this;

    const defaultSlotNode: VNode = <slot key="default-slot" />;
    const contentWrapperKey = "content-wrapper";

    const containerNode = hasFab ? (
      <section class={CSS.contentContainer}>{defaultSlotNode}</section>
    ) : (
      defaultSlotNode
    );

    return (
      <div
        class={{ [CSS.contentWrapper]: true, [CSS.contentHeight]: true }}
        key={contentWrapperKey}
        onScroll={this.panelScrollHandler}
        ref={this.setPanelScrollEl}
      >
        {containerNode}
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
        ref={this.setContainerRef}
        tabIndex={closable ? 0 : -1}
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
