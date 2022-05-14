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
  Fragment
} from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, getSlotted, toAriaBoolean } from "../../utils/dom";
import { Scale } from "../interfaces";
import { HeadingLevel, Heading } from "../functional/Heading";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";

/**
 * @slot - A slot for adding custom content.
 * @slot header-actions-start - A slot for adding actions or content to the start side of the panel header.
 * @slot header-actions-end - A slot for adding actions or content to the end side of the panel header.
 * @slot header-content - A slot for adding custom content to the header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a dropdown.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding buttons to the footer.
 * @slot footer - A slot for adding custom content to the footer.
 */
@Component({
  tag: "calcite-panel",
  styleUrl: "panel.scss",
  shadow: true
})
export class Panel implements ConditionalSlotComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Hides the panel.
   */
  @Prop({ mutable: true, reflect: true }) dismissed = false;

  @Watch("dismissed")
  dismissedHandler(): void {
    this.calcitePanelDismissedChange.emit();
  }

  /**
   * When provided, this method will be called before it is removed from the parent flow.
   */
  @Prop() beforeBack?: () => Promise<void>;

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Displays a close button in the trailing side of the header.
   */
  @Prop({ reflect: true }) dismissible = false;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop() headingLevel: HeadingLevel;

  /**
   * Shows a back button in the header.
   */
  @Prop({ reflect: true }) showBackButton = false;

  /**
   * 'Back' text string.
   */
  @Prop() intlBack?: string;

  /**
   * Specifies the maximum height of the panel.
   */
  @Prop({ reflect: true }) heightScale?: Scale;

  /**
   * This sets width of the panel.
   */
  @Prop({ reflect: true }) widthScale?: Scale;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
   */
  @Prop() intlClose?: string;

  /**
   * 'Options' text string for the actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * Heading text.
   */
  @Prop() heading?: string;

  /**
   * Summary text. A description displayed underneath the heading.
   */
  @Prop() summary?: string;

  /**
   * Opens the action menu.
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

  dismissButtonEl: HTMLCalciteActionElement;

  containerEl: HTMLElement;

  panelScrollEl: HTMLElement;

  resizeObserver = createObserver("resize", () => this.resizeHandler());

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    this.resizeObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the close button has been clicked.
   */
  @Event() calcitePanelDismiss: EventEmitter;

  /**
   * Emitted when the close button has been clicked.
   *
   * @deprecated use calcitePanelDismiss instead.
   */
  @Event() calcitePanelDismissedChange: EventEmitter;

  /**
   * Emitted when the content has been scrolled.
   */
  @Event() calcitePanelScroll: EventEmitter;

  /**
   * Emitted when the back button has been clicked.
   */
  @Event() calcitePanelBackClick: EventEmitter;

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

  setDismissRef = (node: HTMLCalciteActionElement): void => {
    this.dismissButtonEl = node;
  };

  setBackRef = (node: HTMLCalciteActionElement): void => {
    this.backButtonEl = node;
  };

  panelKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.dismiss();
    }
  };

  dismiss = (): void => {
    this.dismissed = true;
    this.calcitePanelDismiss.emit();
  };

  panelScrollHandler = (): void => {
    this.calcitePanelScroll.emit();
  };

  backButtonClick = (): void => {
    this.calcitePanelBackClick.emit();
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
  async setFocus(focusId?: "dismiss-button" | "back-button"): Promise<void> {
    if (focusId === "dismiss-button") {
      this.dismissButtonEl?.setFocus();
      return;
    }

    if (focusId === "back-button") {
      this.backButtonEl?.setFocus();
      return;
    }

    this.containerEl?.focus();
  }

  /**
   * Scrolls panel content to a particular set of coordinates.
   *
   * ```
   *   myCalcitePanel.scrollContentTo({
   *     left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *     top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *     behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   *   });
   * ```
   *
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
    const { heading, headingLevel, summary } = this;
    const headingNode = heading ? (
      <Heading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
        {heading}
      </Heading>
    ) : null;

    const summaryNode = summary ? <span class={CSS.summary}>{summary}</span> : null;

    return headingNode || summaryNode ? (
      <div class={CSS.headerContent} key="header-content">
        {headingNode}
        {summaryNode}
      </div>
    ) : null;
  }

  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent(): VNode {
    return (
      <div class={CSS.headerContent} key="slotted-header-content">
        <slot name={SLOTS.headerContent} />
      </div>
    );
  }

  renderHeaderStartActions(): VNode {
    const { el } = this;
    const hasStartActions = getSlotted(el, SLOTS.headerActionsStart);
    return hasStartActions ? (
      <div
        class={{ [CSS.headerActionsStart]: true, [CSS.headerActions]: true }}
        key="header-actions-start"
      >
        <slot name={SLOTS.headerActionsStart} />
      </div>
    ) : null;
  }

  renderHeaderActionsEnd(): VNode {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;

    const dismissibleNode = dismissible ? (
      <calcite-action
        aria-label={text}
        icon={ICONS.close}
        onClick={dismiss}
        ref={this.setDismissRef}
        text={text}
      />
    ) : null;

    const slotNode = <slot name={SLOTS.headerActionsEnd} />;
    const hasEndActions = getSlotted(el, SLOTS.headerActionsEnd);

    return hasEndActions || dismissibleNode ? (
      <div
        class={{ [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }}
        key="header-actions-end"
      >
        {slotNode}
        {dismissibleNode}
      </div>
    ) : null;
  }

  renderMenu(): VNode {
    const { el, intlOptions, menuOpen } = this;

    const hasMenuItems = getSlotted(el, SLOTS.headerMenuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        flipPlacements={["top", "bottom"]}
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
        <slot name={SLOTS.headerMenuActions} />
      </calcite-action-menu>
    ) : null;
  }

  renderHeaderNode(): VNode {
    const { el, showBackButton } = this;

    const backButtonNode = this.renderBackButton();

    const hasHeaderSlottedContent = getSlotted(el, SLOTS.headerContent);
    const headerContentNode = hasHeaderSlottedContent
      ? this.renderHeaderSlottedContent()
      : this.renderHeaderContent();

    const actionsNodeStart = this.renderHeaderStartActions();
    const actionsNodeEnd = this.renderHeaderActionsEnd();
    const headerMenuNode = this.renderMenu();

    return actionsNodeStart ||
      headerContentNode ||
      actionsNodeEnd ||
      headerMenuNode ||
      showBackButton ? (
      <header class={CSS.header}>
        {backButtonNode}
        {actionsNodeStart}
        {headerContentNode}
        {actionsNodeEnd}
        {headerMenuNode}
      </header>
    ) : null;
  }

  renderFooterNode(): VNode {
    const { el } = this;

    const hasFooterSlottedContent = getSlotted(el, SLOTS.footer);
    const hasFooterActions = getSlotted(el, SLOTS.footerActions);

    return hasFooterSlottedContent || hasFooterActions ? (
      <footer class={CSS.footer} key="footer">
        {hasFooterSlottedContent ? <slot key="footer-slot" name={SLOTS.footer} /> : null}
        {hasFooterActions ? <slot key="footer-actions-slot" name={SLOTS.footerActions} /> : null}
      </footer>
    ) : null;
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
    const { el } = this;
    const hasFab = getSlotted(el, SLOTS.fab);

    const defaultSlotNode: VNode = <slot key="default-slot" />;
    const contentWrapperKey = "content-wrapper";

    return hasFab ? (
      <div
        class={{ [CSS.contentWrapper]: true, [CSS.contentHeight]: true }}
        key={contentWrapperKey}
        onScroll={this.panelScrollHandler}
        ref={this.setPanelScrollEl}
      >
        <section class={CSS.contentContainer}>{defaultSlotNode}</section>
        {this.renderFab()}
      </div>
    ) : (
      <section
        class={{ [CSS.contentWrapper]: true, [CSS.contentContainer]: true }}
        key={contentWrapperKey}
        onScroll={this.panelScrollHandler}
        ref={this.setPanelScrollEl}
      >
        {defaultSlotNode}
      </section>
    );
  }

  renderFab(): VNode {
    return (
      <div class={CSS.fabContainer}>
        <slot name={SLOTS.fab} />
      </div>
    );
  }

  render(): VNode {
    const { dismissed, dismissible, loading, panelKeyDownHandler } = this;

    const panelNode = (
      <article
        aria-busy={toAriaBoolean(loading)}
        class={CSS.container}
        hidden={dismissible && dismissed}
        onKeyDown={panelKeyDownHandler}
        ref={this.setContainerRef}
        tabIndex={dismissible ? 0 : -1}
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
