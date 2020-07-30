import { Component, Element, Event, EventEmitter, Host, Listen, Prop, h } from "@stencil/core";
import { VNode } from "@stencil/core/internal";
import { focusElement, getElementDir, getSlotted, getElementTheme } from "../utils/dom";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { SLOTS as PANEL_SLOTS } from "../calcite-panel/resources";
import { getRoundRobinIndex } from "../utils/array";
import { CalciteScale, CalciteTheme } from "../interfaces";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

/**
 * @slot menu-actions - A slot for adding `calcite-action`s to a menu under the `...` in the header. These actions are displayed when the menu is open.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the flow item.
 */
@Component({
  tag: "calcite-flow-item",
  styleUrl: "calcite-flow-item.scss",
  shadow: true
})
export class CalciteFlowItem {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When provided, this method will be called before it is removed from the parent flow.
   */
  @Prop() beforeBack?: () => Promise<void>;

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies the maxiumum height of the panel that this wraps.
   */
  @Prop({ reflect: true }) heightScale: CalciteScale;

  /**
   * Heading text.
   */
  @Prop() heading: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true }) menuOpen = false;

  /**
   * Shows a back button in the header.
   */
  @Prop() showBackButton = false;

  /**
   * Summary text. A description displayed underneath the heading.
   */
  @Prop() summary?: string;

  /**
   * 'Back' text string.
   */
  @Prop() intlBack?: string;

  /**
   * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
   */
  @Prop() intlClose?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Used to set the component's color scheme.
   */
  @Prop({ reflect: true }) theme: CalciteTheme;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the back button has been clicked.
   */

  @Event() calciteFlowItemBackClick: EventEmitter;

  /**
   * Emitted when the content has been scrolled.
   */

  @Event() calciteFlowItemScroll: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowItemElement;

  menuButtonEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  @Listen("calcitePanelScroll")
  handleCalcitePanelScroll(event: CustomEvent): void {
    event.stopPropagation();
    this.calciteFlowItemScroll.emit();
  }

  queryActions(): HTMLCalciteActionElement[] {
    return getSlotted<HTMLCalciteActionElement>(this.el, SLOTS.menuActions, {
      all: true
    });
  }

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  toggleMenuOpen = (): void => {
    this.menuOpen = !this.menuOpen;
  };

  backButtonClick = (): void => {
    this.calciteFlowItemBackClick.emit();
  };

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { menuOpen } = this;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;

    if (!length) {
      return;
    }

    event.preventDefault();

    if (!menuOpen) {
      this.menuOpen = true;
    }

    if (key === "ArrowUp") {
      const lastAction = actions[length - 1];
      focusElement(lastAction);
    }

    if (key === "ArrowDown") {
      const firstAction = actions[0];
      focusElement(firstAction);
    }
  };

  menuActionsKeydown = (event: KeyboardEvent): void => {
    const { key, target } = event;

    if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
      return;
    }

    const actions = this.queryActions();
    const { length } = actions;
    const currentIndex = actions.indexOf(target as HTMLCalciteActionElement);

    if (!length || currentIndex === -1) {
      return;
    }

    event.preventDefault();

    if (key === "ArrowUp") {
      const value = getRoundRobinIndex(currentIndex - 1, length);
      const previousAction = actions[value];
      focusElement(previousAction);
    }

    if (key === "ArrowDown") {
      const value = getRoundRobinIndex(currentIndex + 1, length);
      const nextAction = actions[value];
      focusElement(nextAction);
    }
  };

  menuActionsContainerKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "Escape") {
      this.menuOpen = false;
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderBackButton(rtl: boolean): VNode {
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        slot={PANEL_SLOTS.headerLeadingContent}
        key="back-button"
        aria-label={label}
        text={label}
        class={CSS.backButton}
        onClick={backButtonClick}
        icon={icon}
      />
    ) : null;
  }

  renderMenuButton(): VNode {
    const { menuOpen, intlOpen, intlClose } = this;
    const closeLabel = intlClose || TEXT.close;
    const openLabel = intlOpen || TEXT.open;

    const menuLabel = menuOpen ? closeLabel : openLabel;

    return (
      <calcite-action
        class={CSS.menuButton}
        aria-label={menuLabel}
        text={menuLabel}
        ref={(menuButtonEl): HTMLCalciteActionElement => (this.menuButtonEl = menuButtonEl)}
        onClick={this.toggleMenuOpen}
        onKeyDown={this.menuButtonKeyDown}
        icon={ICONS.menu}
      />
    );
  }

  renderMenuActions(): VNode {
    const { el, menuOpen, menuButtonEl } = this;

    return (
      <calcite-popover
        referenceElement={menuButtonEl}
        theme={getElementTheme(el)}
        open={menuOpen}
        offsetDistance={0}
        disablePointer={true}
        placement="bottom-end"
        flipPlacements={["bottom-end", "top-end"]}
        onKeyDown={this.menuActionsKeydown}
      >
        <div class={CSS.menu}>
          <slot name={SLOTS.menuActions} />
        </div>
      </calcite-popover>
    );
  }

  renderFooterActions(): VNode {
    const hasFooterActions = !!getSlotted(this.el, SLOTS.footerActions);

    return hasFooterActions ? (
      <div slot={PANEL_SLOTS.footer} class={CSS.footerActions}>
        <slot name={SLOTS.footerActions} />
      </div>
    ) : null;
  }

  renderSingleActionContainer(): VNode {
    return (
      <div class={CSS.singleActionContainer}>
        <slot name={SLOTS.menuActions} />
      </div>
    );
  }

  renderMenuActionsContainer(): VNode {
    return (
      <div class={CSS.menuContainer} onKeyDown={this.menuActionsContainerKeyDown}>
        {this.renderMenuButton()}
        {this.renderMenuActions()}
      </div>
    );
  }

  renderHeaderLeadingContent(): VNode {
    const hasLeadingActions = getSlotted(this.el, SLOTS.leadingActions);
    return hasLeadingActions ? (
      <div slot={PANEL_SLOTS.headerLeadingContent} class={CSS.leadingActions}>
        <slot name={SLOTS.leadingActions}></slot>
      </div>
    ) : null;
  }

  renderHeaderActions(): VNode {
    const menuActions = getSlotted(this.el, SLOTS.menuActions, { all: true });
    const actionCount = menuActions.length;

    const menuActionsNodes =
      actionCount === 1
        ? this.renderSingleActionContainer()
        : actionCount
        ? this.renderMenuActionsContainer()
        : null;

    return menuActionsNodes ? (
      <div slot={PANEL_SLOTS.headerTrailingContent} class={CSS.headerActions}>
        {menuActionsNodes}
      </div>
    ) : null;
  }

  renderHeading(): VNode {
    const { heading } = this;

    return heading ? (
      <h2 class={CSS.heading} slot={PANEL_SLOTS.headerContent}>
        {heading}
      </h2>
    ) : null;
  }

  renderSummary(): VNode {
    const { summary } = this;

    return summary ? <span class={CSS.summary}>{summary}</span> : null;
  }

  renderHeader(): VNode {
    const headingNode = this.renderHeading();
    const summaryNode = this.renderSummary();

    return headingNode || summaryNode ? (
      <div class={CSS.header} slot={PANEL_SLOTS.headerContent}>
        {headingNode}
        {summaryNode}
      </div>
    ) : null;
  }

  renderFab(): VNode {
    const hasFab = getSlotted(this.el, SLOTS.fab);
    return hasFab ? (
      <div class={CSS.fabContainer} slot={PANEL_SLOTS.fab}>
        <slot name={SLOTS.fab} />
      </div>
    ) : null;
  }

  render(): VNode {
    const { el } = this;
    const dir = getElementDir(el);

    return (
      <Host>
        <calcite-panel
          loading={this.loading}
          disabled={this.disabled}
          theme={getElementTheme(el)}
          height-scale={this.heightScale}
          dir={dir}
        >
          {this.renderBackButton(dir === "rtl")}
          {this.renderHeaderLeadingContent()}
          {this.renderHeader()}
          {this.renderHeaderActions()}
          <slot />
          {this.renderFooterActions()}
          {this.renderFab()}
        </calcite-panel>
      </Host>
    );
  }
}
