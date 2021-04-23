import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h,
  VNode
} from "@stencil/core";
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, getSlotted } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { Scale, Theme } from "../interfaces";
import { HeadingLevel, CalciteHeading } from "../functional/CalciteHeading";

/**
 * @slot header-actions-start - a slot for adding actions or content to the start side of the panel header.
 * @slot header-actions-end - a slot for adding actions or content to the end side of the panel header.
 * @slot header-content - a slot for adding custom content to the header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot fab - a slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - a slot for adding buttons to the footer.
 * @slot footer - a slot for adding custom content to the footer.
 */
@Component({
  tag: "calcite-panel",
  styleUrl: "calcite-panel.scss",
  shadow: true
})
export class CalcitePanel {
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
   * Specifies the maxiumum height of the panel.
   */
  @Prop({ reflect: true }) heightScale: Scale;

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
   * Used to set the component's color scheme.
   */

  @Prop({ reflect: true }) theme: Theme;

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

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePanelElement;

  backButtonEl: HTMLCalciteActionElement;

  dismissButtonEl: HTMLCalciteActionElement;

  containerEl: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the close button has been clicked.
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

  setContainerRef = (node: HTMLElement): void => {
    this.containerEl = node;
  };

  setDismissRef = (node: HTMLCalciteActionElement): void => {
    this.dismissButtonEl = node;
  };

  setBackRef = (node: HTMLCalciteActionElement): void => {
    this.backButtonEl = node;
  };

  panelKeyUpHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.dismiss();
    }
  };

  dismiss = (): void => {
    this.dismissed = true;
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
      <CalciteHeading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
        {heading}
      </CalciteHeading>
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
      <div class={CSS.headerContent} key="header-content">
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
        label={intlOptions || TEXT.options}
        open={menuOpen}
        placement="bottom-end"
      >
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

  /**
   * Allows user to override the entire footer node.
   */
  renderFooterSlottedContent(): VNode {
    const { el } = this;

    const hasFooterSlottedContent = getSlotted(el, SLOTS.footer);

    return hasFooterSlottedContent ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footer} />
      </footer>
    ) : null;
  }

  renderFooterActions(): VNode {
    const { el } = this;

    const hasFooterActions = getSlotted(el, SLOTS.footerActions);

    return hasFooterActions ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerActions} />
      </footer>
    ) : null;
  }

  renderContent(): VNode {
    return (
      <section class={CSS.contentContainer} onScroll={this.panelScrollHandler} tabIndex={0}>
        <slot />
        {this.renderFab()}
      </section>
    );
  }

  renderFab(): VNode {
    const { el } = this;

    const hasFab = getSlotted(el, SLOTS.fab);

    return hasFab ? (
      <div class={CSS.fabContainer}>
        <slot name={SLOTS.fab} />
      </div>
    ) : null;
  }

  render(): VNode {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;

    const rtl = getElementDir(el) === "rtl";

    const panelNode = (
      <article
        aria-busy={loading.toString()}
        class={{
          [CSS.container]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
        hidden={dismissible && dismissed}
        onKeyUp={panelKeyUpHandler}
        ref={this.setContainerRef}
        tabIndex={dismissible ? 0 : -1}
      >
        {this.renderHeaderNode()}
        {this.renderContent()}
        {this.renderFooterSlottedContent() || this.renderFooterActions()}
      </article>
    );

    return (
      <Host>
        {loading || disabled ? <calcite-scrim loading={loading} /> : null}
        {panelNode}
      </Host>
    );
  }
}
