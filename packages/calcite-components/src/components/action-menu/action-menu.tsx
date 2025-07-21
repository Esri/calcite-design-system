// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  Fragment,
  h,
  method,
  state,
  JsxNode,
} from "@arcgis/lumina";
import { getRoundRobinIndex } from "../../utils/array";
import { toAriaBoolean } from "../../utils/dom";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";
import { Appearance, Scale } from "../interfaces";
import type { Action } from "../action/action";
import type { Tooltip } from "../tooltip/tooltip";
import { Popover } from "../popover/popover";
import { useSetFocus } from "../../controllers/useSetFocus";
import { CSS, ICONS, IDS, SLOTS } from "./resources";
import { styles } from "./action-menu.scss";

declare global {
  interface DeclareElements {
    "calcite-action-menu": ActionMenu;
  }
}

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];

/**
 * @slot - A slot for adding `calcite-action`s.
 * @slot trigger - A slot for adding a `calcite-action` to trigger opening the menu.
 * @slot tooltip - A slot for adding a tooltip for the menu.
 */
export class ActionMenu extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = guid();

  private actionElements: Action["el"][] = [];

  private defaultMenuButtonEl: Action["el"];

  private menuButtonClick = (): void => {
    this.toggleOpen();
  };

  private menuButtonId = IDS.button(this.guid);

  private menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements, activeMenuItemIndex, open } = this;

    if (!actionElements.length) {
      return;
    }

    if (isActivationKey(key)) {
      event.preventDefault();

      if (!open) {
        this.toggleOpen();
        return;
      }

      const action = actionElements[activeMenuItemIndex];
      if (action) {
        action.click();
      } else {
        this.toggleOpen(false);
      }
    }

    if (key === "Tab") {
      this.open = false;
      return;
    }

    if (key === "Escape") {
      this.toggleOpen(false);
      event.preventDefault();
      return;
    }

    this.handleActionNavigation(event, key, actionElements);
  };

  private menuId = IDS.menu(this.guid);

  private _open = false;

  private popoverEl: Popover["el"];

  private slottedMenuButtonEl: Action["el"];

  private tooltipEl: Tooltip["el"];

  private updateAction = (action: Action["el"], index: number): void => {
    const { guid, activeMenuItemIndex } = this;
    const id = IDS.action(guid, index);
    action.tabIndex = -1;
    action.setAttribute("role", "menuitem");

    if (!action.id) {
      action.id = id;
    }

    // Used to style the "activeMenuItemIndex" action using token focus styling.
    action.activeDescendant = index === activeMenuItemIndex;
  };

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() activeMenuItemIndex = -1;

  @state() menuButtonEl: Action["el"];

  // #endregion

  // #region Public Properties

  /** Specifies the appearance of the component. */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** When `true`, the component is expanded. */
  @property({ reflect: true }) expanded = false;

  /** Specifies the component's fallback slotted content `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /**
   * Specifies the text string for the component.
   *
   * @required
   */
  @property() label: string;

  /** When `true`, the component is open. */
  @property({ reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(open: boolean) {
    const oldOpen = this._open;
    if (open !== oldOpen) {
      this._open = open;
      this.openHandler(open);
    }
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the component will be positioned relative to the `referenceElement`. */
  @property({ reflect: true }) placement: LogicalPlacement = "auto";

  /** Specifies the size of the component's trigger `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.menuButtonEl;
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the `open` property is toggled. */
  calciteActionMenuOpen = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.connectMenuButtonEl();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && (this.hasUpdated || this.expanded !== false)) {
      this.expandedHandler();
    }

    if (
      changes.has("activeMenuItemIndex") &&
      (this.hasUpdated || this.activeMenuItemIndex !== -1)
    ) {
      this.updateActions(this.actionElements);
    }
  }

  override disconnectedCallback(): void {
    this.disconnectMenuButtonEl();
  }

  // #endregion

  // #region Private Methods

  private expandedHandler(): void {
    this.open = false;
    this.setTooltipReferenceElement();
  }

  private openHandler(open: boolean): void {
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }

    if (this.popoverEl) {
      this.popoverEl.open = open;
    }

    this.activeMenuItemIndex = this.open ? 0 : -1;
    this.calciteActionMenuOpen.emit();
    this.setTooltipReferenceElement();
  }

  private connectMenuButtonEl(): void {
    const { menuButtonId, menuId, open, label } = this;
    const menuButtonEl = this.slottedMenuButtonEl || this.defaultMenuButtonEl;

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

    menuButtonEl.addEventListener(
      "click",
      this.menuButtonClick,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    menuButtonEl.addEventListener(
      "keydown",
      this.menuButtonKeyDown,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
  }

  private disconnectMenuButtonEl(): void {
    const { menuButtonEl } = this;

    if (!menuButtonEl) {
      return;
    }

    menuButtonEl.removeEventListener(
      "click",
      this.menuButtonClick,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;
    menuButtonEl.removeEventListener(
      "keydown",
      this.menuButtonKeyDown,
    ) /* TODO: [MIGRATION] If possible, refactor to use on* JSX prop or this.listen()/this.listenOn() utils - they clean up event listeners automatically, thus prevent memory leaks */;

    this.menuButtonEl = null;
  }

  private setMenuButtonEl(event: Event): void {
    const actions = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .filter((el): el is Action["el"] => el?.matches("calcite-action"));

    this.slottedMenuButtonEl = actions[0];
    this.connectMenuButtonEl();
  }

  private setDefaultMenuButtonEl(el: Action["el"]): void {
    this.defaultMenuButtonEl = el;

    if (el) {
      this.connectMenuButtonEl();
    }
  }

  private setPopoverEl(el: Popover["el"]): void {
    if (!el) {
      return;
    }
    this.popoverEl = el;
    el.open = this.open;
  }

  private handleCalciteActionClick(): void {
    this.open = false;
    this.setFocus();
  }

  private updateTooltip(event: Event): void {
    const tooltips = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .filter((el): el is Tooltip["el"] => el?.matches("calcite-tooltip"));

    this.tooltipEl = tooltips[0];
    this.setTooltipReferenceElement();
  }

  private setTooltipReferenceElement(): void {
    const { tooltipEl, expanded, menuButtonEl, open } = this;

    if (tooltipEl) {
      tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : null;
    }
  }

  private updateActions(actions: Action["el"][]): void {
    actions?.forEach(this.updateAction);
  }

  private async handleDefaultSlotChange(event: Event): Promise<void> {
    const actions = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .reduce<Action["el"][]>((previousValue, currentValue) => {
        if (currentValue?.matches("calcite-action")) {
          previousValue.push(currentValue as Action["el"]);
          return previousValue;
        }

        if (currentValue?.matches("calcite-action-group")) {
          return previousValue.concat(Array.from(currentValue.querySelectorAll("calcite-action")));
        }

        return previousValue;
      }, []);

    await this.componentOnReady();
    this.actionElements = actions.filter((action) => !action.disabled && !action.hidden);
  }

  private isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  private handleActionNavigation(event: KeyboardEvent, key: string, actions: Action["el"][]): void {
    if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      return;
    }

    event.preventDefault();

    if (!this.open) {
      this.toggleOpen();

      if (key === "Home" || key === "ArrowDown") {
        this.activeMenuItemIndex = 0;
      }

      if (key === "End" || key === "ArrowUp") {
        this.activeMenuItemIndex = actions.length - 1;
      }

      return;
    }

    if (key === "Home") {
      this.activeMenuItemIndex = 0;
    }

    if (key === "End") {
      this.activeMenuItemIndex = actions.length - 1;
    }

    const currentIndex = this.activeMenuItemIndex;

    if (key === "ArrowUp") {
      this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
    }

    if (key === "ArrowDown") {
      this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
    }
  }

  private toggleOpen(value = !this.open): void {
    this.open = value;
  }

  private handlePopoverOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.open = true;
    this.setFocus();
  }

  private handlePopoverClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.open = false;
  }

  // #endregion

  // #region Rendering

  private renderMenuButton(): JsxNode {
    const { appearance, label, scale, expanded } = this;

    const menuButtonSlot = (
      <slot name={SLOTS.trigger} onSlotChange={this.setMenuButtonEl}>
        <calcite-action
          appearance={appearance}
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

  private renderMenuItems(): JsxNode {
    const {
      actionElements,
      activeMenuItemIndex,
      menuId,
      menuButtonEl,
      label,
      placement,
      overlayPositioning,
      flipPlacements,
    } = this;

    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        autoClose={true}
        flipPlacements={flipPlacements}
        focusTrapDisabled={true}
        label={label}
        offsetDistance={0}
        oncalcitePopoverClose={this.handlePopoverClose}
        oncalcitePopoverOpen={this.handlePopoverOpen}
        overlayPositioning={overlayPositioning}
        placement={placement}
        pointerDisabled={true}
        ref={this.setPopoverEl}
        referenceElement={menuButtonEl}
        triggerDisabled={true}
      >
        <div
          aria-activedescendant={activeDescendantId}
          aria-labelledby={menuButtonEl?.id}
          class={CSS.menu}
          id={menuId}
          onClick={this.handleCalciteActionClick}
          role="menu"
          tabIndex={-1}
        >
          <slot onSlotChange={this.handleDefaultSlotChange} />
        </div>
      </calcite-popover>
    );
  }

  override render(): JsxNode {
    return (
      <>
        {this.renderMenuButton()}
        {this.renderMenuItems()}
        <slot name={SLOTS.tooltip} onSlotChange={this.updateTooltip} />
      </>
    );
  }

  // #endregion
}
