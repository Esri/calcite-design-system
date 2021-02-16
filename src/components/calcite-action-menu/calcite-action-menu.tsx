import { Component, Host, h, Element, Prop, Watch, State, forceUpdate } from "@stencil/core";
import { CSS, ICONS, TEXT } from "./resources";
import { focusElement } from "../../utils/dom";
import { VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { PopperPlacement } from "../../utils/popper";
import { Placement } from "@popperjs/core";
import { guid } from "../../utils/guid";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];

@Component({
  tag: "calcite-action-menu",
  styleUrl: "calcite-action-menu.scss",
  shadow: true
})
/**
 * @slot - A slot for adding `calcite-action`s.
 */
export class CalciteActionMenu {
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.observer.observe(this.el, { childList: true, subtree: true });
    this.getActions();
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Indicates whether widget is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.open = false;
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: Placement[];

  /**
   * 'Options' text string for the actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * 'Close' text string for the menu.
   */
  @Prop() intlClose?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Offset the position of the menu away from the reference element.
   */
  @Prop({ reflect: true }) offsetDistance = 0;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionMenuElement;

  menuButtonEl: HTMLCalciteActionElement;

  menuEl: HTMLDivElement;

  actions: HTMLCalciteActionElement[] = [];

  observer = new MutationObserver(() => this.getActions());

  guid = `calcite-action-menu-${guid()}`;

  menuId = `${this.guid}-menu`;

  menuButtonId = `${this.guid}-menu-button`;

  @State() activeMenuItemIndex = -1;

  @Watch("activeMenuItemIndex")
  activeMenuItemIndexHandler(): void {
    this.getActions();
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenuButton(): VNode {
    const { menuButtonId, menuId, open, intlOpen, intlOptions, intlClose, expanded } = this;
    const closeLabel = intlClose || TEXT.close;
    const openLabel = intlOpen || TEXT.open;
    const optionsText = intlOptions || TEXT.options;
    const menuLabel = open ? closeLabel : openLabel;

    return (
      <calcite-action
        active={open}
        aria-controls={menuId}
        aria-expanded={open.toString()}
        aria-haspopup="true"
        aria-label={menuLabel}
        class={CSS.menuButton}
        icon={ICONS.menu}
        id={menuButtonId}
        label={menuLabel}
        onClick={this.menuButtonClick}
        onKeyDown={this.menuButtonKeyDown}
        onKeyUp={this.menuButtonKeyUp}
        ref={this.setMenuButonRef}
        text={optionsText}
        textEnabled={expanded}
      />
    );
  }

  renderMenuItems(): VNode {
    const {
      actions,
      activeMenuItemIndex,
      open,
      menuButtonId,
      menuId,
      menuButtonEl,
      intlOptions,
      offsetDistance,
      placement
    } = this;
    const label = intlOptions || TEXT.options;
    const activeAction = actions[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        disablePointer={true}
        label={label}
        offsetDistance={offsetDistance}
        open={open}
        placement={placement}
        referenceElement={menuButtonEl}
      >
        <div
          aria-activedescendant={activeDescendantId}
          aria-labelledby={menuButtonId}
          class={CSS.menu}
          id={menuId}
          onKeyDown={this.menuActionsContainerKeyDown}
          onKeyUp={this.menuActionsContainerKeyUp}
          ref={(el) => (this.menuEl = el)}
          role="menu"
          tabIndex={-1}
        >
          <slot />
        </div>
      </calcite-popover>
    );
  }

  render(): VNode {
    return (
      <Host>
        <div class={CSS.menuContainer}>
          {this.renderMenuButton()}
          {this.renderMenuItems()}
        </div>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  menuButtonClick = (): void => {
    this.toggleOpen();
  };

  setMenuButonRef = (node: HTMLCalciteActionElement): void => {
    this.menuButtonEl = node;
  };

  updateAction = (action: HTMLCalciteActionElement, index: number): void => {
    action.tabIndex = -1;
    action.setAttribute("role", "menuitem");

    if (!action.id) {
      action.id = `${this.guid}-action-${index}`;
    }

    action.active = index === this.activeMenuItemIndex;
  };

  getActions = (): void => {
    const actions = this.el
      .querySelector("slot")
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === "CALCITE-ACTION") as HTMLCalciteActionElement[];

    actions.forEach(this.updateAction);

    this.actions = actions;
  };

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuButtonKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;

    if (SUPPORTED_BUTTON_NAV_KEYS.indexOf(key) === -1) {
      return;
    }

    event.preventDefault();

    const { actions } = this;

    if (!actions || actions.length === 0) {
      return;
    }

    this.toggleOpen(true);

    this.handleActionNavigation(key, actions);
  };

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (SUPPORTED_BUTTON_NAV_KEYS.indexOf(key) === -1) {
      return;
    }

    event.preventDefault();
  };

  menuActionsContainerKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === "Tab") {
      this.open = false;
      return;
    }

    if (key === " " || key === "Enter") {
      event.preventDefault();
      const { actions } = this;
      const action = actions[this.activeMenuItemIndex];
      action?.click();
      this.toggleOpen(false);
      return;
    }

    if (SUPPORTED_MENU_NAV_KEYS.indexOf(key) !== -1) {
      event.preventDefault();
    }
  };

  menuActionsContainerKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;

    const isNavigationKey = SUPPORTED_MENU_NAV_KEYS.indexOf(key) !== -1;

    if (isNavigationKey) {
      event.preventDefault();
    }

    if (key === "Escape") {
      this.toggleOpen(false);
      return;
    }

    const { actions } = this;

    if (!actions || actions.length === 0) {
      return;
    }

    if (isNavigationKey) {
      this.handleActionNavigation(key, actions);
      return;
    }
  };

  handleActionNavigation = (key: string, actions: HTMLCalciteActionElement[]): void => {
    const currentIndex = this.activeMenuItemIndex;

    if (key === "Home") {
      this.activeMenuItemIndex = 0;
    }

    if (key === "End") {
      this.activeMenuItemIndex = actions.length - 1;
    }

    if (key === "ArrowUp") {
      this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
    }

    if (key === "ArrowDown") {
      this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
    }
  };

  toggleOpen = (value = !this.open): void => {
    this.open = value;
    this.activeMenuItemIndex = -1;

    forceUpdate(this);

    // todo: better focus??
    if (value) {
      //focusElement(this.menuEl);
      setTimeout(() => focusElement(this.menuEl), 0);
    } else {
      //focusElement(this.menuButtonEl);
      setTimeout(() => focusElement(this.menuButtonEl), 0);
    }
  };
}
