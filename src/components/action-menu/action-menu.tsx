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
import { CSS, SLOTS, ICONS } from "./resources";
import { focusElement, getSlotted, toAriaBoolean } from "../../utils/dom";
import { Fragment, VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { PopperPlacement, OverlayPositioning, ComputedPlacement } from "../../utils/popper";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];

/**
 * @slot - A slot for adding `calcite-action`s.
 * @slot trigger - A slot for adding a `calcite-action` to trigger opening the menu.
 * @slot tooltip - A slot for adding an tooltip for the menu.
 */
@Component({
  tag: "calcite-action-menu",
  styleUrl: "action-menu.scss",
  shadow: true
})
export class ActionMenu implements ConditionalSlotComponent {
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.getActions();
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.disconnectMenuButtonEl();
    disconnectConditionalSlotComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, the component is expanded.
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
  @Prop() flipPlacements?: ComputedPlacement[];

  /**
   *  Specifies the text string for the component.
   */
  @Prop() label!: string;

  /**
   * When true, the component is open.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(open: boolean): void {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }
    this.calciteActionMenuOpenChange.emit(open);

    this.setTooltipReferenceElement();
  }

  /** Determines the type of positioning to use for the overlaid content. If your element is in a fixed container, use the "fixed" value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   *
   * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
   */
  @Prop({ reflect: true }) placement: PopperPlacement = "auto";

  /**
   * Specifies the size of the component's trigger `calcite-action`.
   */
  @Prop({ reflect: true }) scale: Scale;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the `open` property has changed.
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

  menuButtonEl: HTMLCalciteActionElement;

  defaultMenuButtonEl: HTMLCalciteActionElement;

  menuEl: HTMLDivElement;

  actionElements: HTMLCalciteActionElement[] = [];

  mutationObserver = createObserver("mutation", () => this.getActions());

  guid = `calcite-action-menu-${guid()}`;

  menuId = `${this.guid}-menu`;

  menuButtonId = `${this.guid}-menu-button`;

  tooltipEl: HTMLCalciteTooltipElement;

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

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    focusElement(this.open ? this.menuEl : this.menuButtonEl);
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  connectMenuButtonEl = (): void => {
    const { el, menuButtonId, menuId, open, label } = this;
    const menuButtonEl =
      (getSlotted(el, SLOTS.trigger) as HTMLCalciteActionElement) || this.defaultMenuButtonEl;

    if (this.menuButtonEl === menuButtonEl) {
      return;
    }

    this.disconnectMenuButtonEl();

    this.menuButtonEl = menuButtonEl;

    this.setTooltipReferenceElement();

    if (!menuButtonEl) {
      return;
    }

    menuButtonEl.active = open;
    menuButtonEl.setAttribute("aria-controls", menuId);
    menuButtonEl.setAttribute("aria-expanded", toAriaBoolean(open));
    menuButtonEl.setAttribute("aria-haspopup", "true");

    if (!menuButtonEl.id) {
      menuButtonEl.id = menuButtonId;
    }

    if (!menuButtonEl.label) {
      menuButtonEl.label = label;
    }

    if (!menuButtonEl.text) {
      menuButtonEl.text = label;
    }

    menuButtonEl.addEventListener("click", this.menuButtonClick);
    menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
  };

  disconnectMenuButtonEl = (): void => {
    const { menuButtonEl } = this;

    if (!menuButtonEl) {
      return;
    }

    menuButtonEl.removeEventListener("click", this.menuButtonClick);
    menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
  };

  setDefaultMenuButtonEl = (el: HTMLCalciteActionElement): void => {
    this.defaultMenuButtonEl = el;
    this.connectMenuButtonEl();
  };

  renderMenuButton(): VNode {
    const { label, scale, expanded } = this;

    const menuButtonSlot = (
      <slot name={SLOTS.trigger}>
        <calcite-action
          class={CSS.defaultTrigger}
          icon={ICONS.menu}
          ref={this.setDefaultMenuButtonEl}
          scale={scale}
          text={label}
          textEnabled={expanded}
        />
      </slot>
    );

    return menuButtonSlot;
  }

  renderMenuItems(): VNode {
    const {
      actionElements,
      activeMenuItemIndex,
      open,
      menuId,
      menuButtonEl,
      label,
      placement,
      overlayPositioning,
      flipPlacements
    } = this;

    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        disablePointer
        flipPlacements={flipPlacements}
        label={label}
        offsetDistance={0}
        open={open}
        overlayPositioning={overlayPositioning}
        placement={placement}
        referenceElement={menuButtonEl}
      >
        <div
          aria-activedescendant={activeDescendantId}
          aria-labelledby={menuButtonEl?.id}
          class={CSS.menu}
          id={menuId}
          onClick={this.handleCalciteActionClick}
          onKeyDown={this.menuActionsContainerKeyDown}
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
        <slot name={SLOTS.tooltip} onSlotchange={this.updateTooltip} />
      </Fragment>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleCalciteActionClick = (): void => {
    this.open = false;
    this.setFocus();
  };

  menuButtonClick = (): void => {
    this.toggleOpen();
  };

  updateTooltip = (event: Event): void => {
    const tooltips = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true
      })
      .filter((el) => el?.matches("calcite-tooltip")) as HTMLCalciteTooltipElement[];

    this.tooltipEl = tooltips[0];
    this.setTooltipReferenceElement();
  };

  setTooltipReferenceElement = (): void => {
    const { tooltipEl, expanded, menuButtonEl, open } = this;

    if (tooltipEl) {
      tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : null;
    }
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
    const { el } = this;

    const actionElements = getSlotted(el, { all: true, matches: "calcite-action" }) as any;

    this.updateActions(actionElements);

    this.actionElements = actionElements;

    this.connectMenuButtonEl();
  };

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuButtonKeyDown = (event: KeyboardEvent): void => {
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

    if (key === "Escape") {
      this.toggleOpen(false);
      return;
    }

    if (!actionElements.length) {
      return;
    }

    if (this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      event.preventDefault();
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

  toggleOpenEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
  };

  toggleOpen = (value = !this.open): void => {
    this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
    this.open = value;
  };
}
