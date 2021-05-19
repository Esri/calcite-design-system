import {
  Component,
  h,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  Watch,
  Method,
  State
} from "@stencil/core";
import { CSS, ICONS, SLOTS } from "./resources";
import { focusElement, getSlotted } from "../../utils/dom";
import { forceUpdate, Fragment, VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { PopperPlacement, OverlayPositioning } from "../../utils/popper";
import { Placement } from "@popperjs/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const MENU_ANIMATION_DELAY_MS = 50;

/**
 * @slot - A slot for adding `calcite-action`s.
 * @slot tooltip - a slot for adding an tooltip for the menu.
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
    this.setTooltipReferenceElement();
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: Placement[];

  /**
   *  Text string for the actions menu.
   */
  @Prop() label!: string;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(open: boolean): void {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    this.calciteActionMenuOpenChange.emit(open);
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the referenceElement.
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  /**
   * Specifies the size of the action.
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the open property has changed.
   */
  @Event() calciteActionMenuOpenChange: EventEmitter;

  @Listen("click", { target: "window" })
  closeCalciteActionMenuOnClick(event: Event): void {
    const composedPath = event.composedPath();

    if (composedPath.includes(this.el)) {
      return;
    }

    this.open = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionMenuElement;

  menuFocusTimeout: number;

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
  //  Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.open ? this.menuEl : this.menuButtonEl);
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenuButton(): VNode {
    const { el, menuButtonId, menuId, open, label, expanded, scale } = this;

    const actionNode = (
      <calcite-action
        active={open}
        aria-controls={menuId}
        aria-expanded={open.toString()}
        aria-haspopup="true"
        class={CSS.menuButton}
        icon={ICONS.menu}
        id={menuButtonId}
        label={label}
        onClick={this.menuButtonClick}
        onKeyDown={this.menuButtonKeyDown}
        onKeyUp={this.menuButtonKeyUp}
        ref={this.setMenuButtonRef}
        scale={scale}
        text={label}
        textEnabled={expanded}
      />
    );

    return getSlotted(el, SLOTS.tooltip) ? (
      <calcite-tooltip-manager>{actionNode}</calcite-tooltip-manager>
    ) : (
      actionNode
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
      label,
      placement,
      overlayPositioning
    } = this;

    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        label={label}
        open={open}
        overlayPositioning={overlayPositioning}
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
      <Fragment>
        {this.renderMenuButton()}
        {this.renderMenuItems()}
        <slot name={SLOTS.tooltip} />
      </Fragment>
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

  setTooltipReferenceElement = (): void => {
    const { el, expanded, menuButtonEl } = this;

    const slotted = getSlotted(el, SLOTS.tooltip);
    const tooltip =
      slotted?.tagName === "SLOT" ? (slotted as HTMLSlotElement).assignedElements()[0] : slotted;

    if (tooltip?.tagName === "CALCITE-TOOLTIP") {
      (tooltip as HTMLCalciteTooltipElement).referenceElement = !expanded && menuButtonEl;
    }
  };

  setMenuButtonRef = (node: HTMLCalciteActionElement): void => {
    this.menuButtonEl = node;
    this.setTooltipReferenceElement();
    forceUpdate(this);
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

  getAssignedElements(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll("slot"))
      .map((slot) => slot.assignedElements({ flatten: true }) as HTMLElement[])
      .reduce((ar, val) => ar.concat(val), []);
  }

  getActions = (): void => {
    const { el } = this;

    const assignedActions = this.getAssignedElements().filter(
      (element) => element.tagName === "CALCITE-ACTION"
    ) as HTMLCalciteActionElement[];

    const actionElements = assignedActions.length
      ? assignedActions
      : Array.from(el.querySelectorAll("calcite-action"));

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
    clearTimeout(this.menuFocusTimeout);

    if (value) {
      this.menuFocusTimeout = window.setTimeout(() => this.setFocus(), MENU_ANIMATION_DELAY_MS);
    } else {
      this.setFocus();
    }
  };
}
