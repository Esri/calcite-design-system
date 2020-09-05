import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h
} from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { focusElement, getElementDir, getSlotted, getElementTheme } from "../utils/dom";
import { CSS_UTILITY } from "../utils/resources";
import { VNode } from "@stencil/core/internal";
import { CalciteScale, CalciteTheme } from "../interfaces";
import { getRoundRobinIndex } from "../utils/array";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

/**
 * @slot header-content - A slot for adding content in the center of the header.
 * @slot header-leading-content - A slot for adding a `calcite-action` on the leading side of the header.
 * @slot header-trailing-content - A slot for adding a `calcite-action` on the trailing side of the header.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the panel.
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
   * Shows a back button in the header.
   */
  @Prop() showBackButton = false;

  /**
   * 'Back' text string.
   */
  @Prop() intlBack?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Specifies the maxiumum height of the panel.
   */
  @Prop({ reflect: true }) heightScale: CalciteScale;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
   */
  @Prop() intlClose?: string;

  /**
   * Used to set the component's color scheme.
   */

  @Prop({ reflect: true }) theme: CalciteTheme;
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

  dismissButtonEl: HTMLCalciteActionElement;

  menuButtonEl: HTMLCalciteActionElement;

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

  queryActions(): HTMLCalciteActionElement[] {
    return getSlotted<HTMLCalciteActionElement>(this.el, SLOTS.headerActionsEnd, {
      all: true
    });
  }

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  toggleMenuOpen = (): void => {
    this.menuOpen = !this.menuOpen;
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
  //  Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(focusId?: "dismiss-button"): Promise<void> {
    if (focusId === "dismiss-button") {
      this.dismissButtonEl?.setFocus();
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
    const rtl = getElementDir(this.el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        slot={SLOTS.headerActionsStart}
        key="back-button"
        aria-label={label}
        text={label}
        class={CSS.backButton}
        onClick={backButtonClick}
        icon={icon}
      />
    ) : null;
  }

  renderHeaderContent(): VNode {
    const { heading, summary } = this;
    const headingNode = heading ? <h4 class={CSS.heading}>{heading}</h4> : null;
    const summaryNode = summary ? <span class={CSS.summary}>{summary}</span> : null;

    return (
      <div key="header-content" class={CSS.headerContent}>
        {headingNode}
        {summaryNode}
      </div>
    );
  }

  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent(): VNode {
    return (
      <div key="header-content" class={CSS.headerContent}>
        <slot name={SLOTS.headerContent} />
      </div>
    );
  }

  renderHeaderEndContent(): VNode {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;

    const dismissibleNode = dismissible ? (
      <calcite-action
        ref={(dismissButtonEl): HTMLCalciteActionElement =>
          (this.dismissButtonEl = dismissButtonEl)
        }
        aria-label={text}
        text={text}
        onClick={dismiss}
        icon={ICONS.close}
      />
    ) : null;

    const slotNode = <slot name={SLOTS.headerActionsEnd} />;
    const hasEndActions = getSlotted(el, SLOTS.headerActionsEnd);

    return hasEndActions || dismissibleNode ? (
      <div key="header-trailing-content" class={CSS.headerActionsEnd}>
        {slotNode}
        {dismissibleNode}
      </div>
    ) : null;
  }

  renderMenuItems(): VNode {
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
          <slot name={SLOTS.headerMenuActions} />
        </div>
      </calcite-popover>
    );
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

  renderMenu(): VNode {
    const hasMenuItems = getSlotted(this.el, SLOTS.headerMenuActions);

    return hasMenuItems ? (
      <div class={CSS.menuContainer} onKeyDown={this.menuActionsContainerKeyDown}>
        {this.renderMenuButton()}
        {this.renderMenuItems()}
      </div>
    ) : null;
  }

  renderHeaderNode(): VNode {
    const hasHeaderSlotContent = getSlotted(this.el, SLOTS.headerContent);
    const backButtonNode = this.renderBackButton();
    const hasStartActions = getSlotted(this.el, SLOTS.headerActionsStart);
    const headerContentNode = hasHeaderSlotContent
      ? this.renderHeaderSlottedContent()
      : this.renderHeaderContent();
    const endActionsNode = this.renderHeaderEndContent();
    const headerMenuNode = this.renderMenu();

    return hasStartActions || headerContentNode || endActionsNode ? (
      <header class={CSS.header}>
        {backButtonNode}
        <slot name={SLOTS.headerActionsStart} />
        {headerContentNode}
        {endActionsNode}
        {headerMenuNode}
      </header>
    ) : null;
  }

  renderFooter(): VNode {
    const { el } = this;

    const hasFooter = getSlotted(el, SLOTS.footer);

    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footer} />
      </footer>
    ) : null;
  }

  renderContent(): VNode {
    return (
      <section tabIndex={0} class={CSS.contentContainer} onScroll={this.panelScrollHandler}>
        <slot />
        {this.renderFab()}
      </section>
    );
  }

  renderFab(): VNode {
    const hasFab = getSlotted(this.el, SLOTS.fab);

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
        onKeyUp={panelKeyUpHandler}
        tabIndex={dismissible ? 0 : -1}
        hidden={dismissible && dismissed}
        ref={(containerEl): HTMLElement => (this.containerEl = containerEl)}
        class={{
          [CSS.container]: true,
          [CSS_UTILITY.rtl]: rtl
        }}
      >
        {this.renderHeaderNode()}
        {this.renderContent()}
        {this.renderFooter()}
      </article>
    );

    return (
      <Host>
        {loading || disabled ? (
          <calcite-scrim theme={getElementTheme(el)} loading={loading}>
            {panelNode}
          </calcite-scrim>
        ) : (
          panelNode
        )}
      </Host>
    );
  }
}
