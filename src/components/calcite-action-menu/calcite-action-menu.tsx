import { Component, Host, h, Element, Prop, Watch, State } from "@stencil/core";
import { CSS, ICONS, TEXT } from "./resources";
import { focusElement } from "../../utils/dom";
import { VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { PopperPlacement } from "../../utils/popper";
import { Placement } from "@popperjs/core";
import { guid } from "../../utils/guid";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const MENU_ANIMATION_DELAY_MS = 50;

/**
 * @slot - A slot for adding `calcite-action`s.
 */
@Component({
  tag: "calcite-action-menu",
  styleUrl: "calcite-action-menu.scss",
  shadow: true
})
export class CalciteActionMenu {
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    this.getActions();
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
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

  actionElements: HTMLCalciteActionElement[] = [];

  mutationObserver = new MutationObserver(() => this.getActions());

  guid = `calcite-action-menu-${guid()}`;

  menuId = `${this.guid}-menu`;

  menuButtonId = `${this.guid}-menu-button`;

  @State() activeMenuItemIndex = -1;

  @Watch("activeMenuItemIndex")
  activeMenuItemIndexHandler(): void {
    this.updateActions(this.actionElements);
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenuButton(): VNode {
    const { menuButtonId, menuId, open, intlOptions, expanded } = this;
    const optionsText = intlOptions || TEXT.options;

    return (
      <calcite-action
        active={open}
        aria-controls={menuId}
        aria-expanded={open.toString()}
        aria-haspopup="true"
        class={CSS.menuButton}
        icon={ICONS.menu}
        id={menuButtonId}
        label={optionsText}
        onClick={this.menuButtonClick}
        onKeyDown={this.menuButtonKeyDown}
        onKeyUp={this.menuButtonKeyUp}
        ref={this.setMenuButtonRef}
        text={optionsText}
        textEnabled={expanded}
      />
    );
  }

  renderMenuItems(): VNode {
    const {
      actionElements,
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
    const activeAction = actionElements[activeMenuItemIndex];
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
        {this.renderMenuButton()}
        {this.renderMenuItems()}
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

  setMenuButtonRef = (node: HTMLCalciteActionElement): void => {
    this.menuButtonEl = node;
  };

  updateAction = (action: HTMLCalciteActionElement, index: number): void => {
    const { guid, activeMenuItemIndex } = this;
    const id = `${guid}-action-${index}`;

    action.tabIndex = -1;
    action.setAttribute("role", "menuitem");

    if (!action.id) {
      action.id = id;
    }

    action.active = index === activeMenuItemIndex;
  };

  updateActions = (actions: HTMLCalciteActionElement[]): void => {
    actions?.forEach(this.updateAction);
  };

  getActions = (): void => {
    const actionElements =
      (this.el
        .querySelector("slot")
        ?.assignedElements({ flatten: true })
        .filter((el) => el.tagName === "CALCITE-ACTION") as HTMLCalciteActionElement[]) || [];

    this.updateActions(actionElements);

    this.actionElements = actionElements;
  };

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuButtonKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements } = this;

    if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
      return;
    }

    event.preventDefault();

    if (!actionElements.length) {
      return;
    }

    this.toggleOpen(true);
    this.handleActionNavigation(key, actionElements);
  };

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
      return;
    }

    event.preventDefault();
  };

  menuActionsContainerKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements, activeMenuItemIndex } = this;

    if (key === "Tab") {
      this.open = false;
      return;
    }

    if (key === " " || key === "Enter") {
      event.preventDefault();
      const action = actionElements[activeMenuItemIndex];
      action ? action.click() : this.toggleOpen(false);
      return;
    }

    if (this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      event.preventDefault();
    }
  };

  menuActionsContainerKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements } = this;

    if (key === "Escape") {
      this.toggleOpen(false);
      return;
    }

    if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      return;
    }

    event.preventDefault();

    if (!actionElements.length) {
      return;
    }

    this.handleActionNavigation(key, actionElements);
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

    if (value) {
      setTimeout(() => focusElement(this.menuEl), MENU_ANIMATION_DELAY_MS);
    } else {
      focusElement(this.menuButtonEl);
    }
  };
}
