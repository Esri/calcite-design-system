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
import { createRef } from "lit/directives/ref.js";
import { getRoundRobinIndex } from "../../utils/array";
import { toAriaBoolean } from "../../utils/aria";
import {
  FlipPlacement,
  LogicalPlacement,
  OverlayPositioning,
} from "../../controllers/useFloatingUi";
import { getSlotAssignedElements } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";
import { Appearance, Scale } from "../interfaces";
import type { Action } from "../action/action";
import { isAction } from "../action/resources";
import type { ActionGroup } from "../action-group/action-group";
import { isActionGroup } from "../action-group/resources";
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
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private guid = guid();

  private _actions: Action["el"][] = [];

  private navigableActions: Action["el"][] = [];

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private triggerSlotRef = createRef<HTMLSlotElement>();

  private defaultMenuButtonEl?: Action["el"];

  private menuButtonClick = (): void => {
    this.toggleOpen();
  };

  private menuButtonId = IDS.button(this.guid);

  private menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { activeMenuItemIndex, navigableActions, open } = this;

    if (!navigableActions.length) {
      return;
    }

    if (isActivationKey(key)) {
      event.preventDefault();

      if (!open) {
        this.toggleOpen();
        return;
      }

      const action = navigableActions[activeMenuItemIndex];
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

    this.handleActionNavigation(event, key, navigableActions);
  };

  private menuId = IDS.menu(this.guid);

  private _open = false;

  private popoverEl?: Popover["el"];

  private slottedMenuButtonEl?: Action["el"];

  private tooltipEl?: Tooltip["el"];

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

  private mouseDownHandler = (event: MouseEvent): void => {
    if (!(event.composedPath() as Element[]).some(isAction)) {
      return;
    }

    this.activeMenuItemIndex = this.navigableActions.findIndex((action) => action === event.target);
  };

  //#endregion

  //#region State Properties

  @state() activeMenuItemIndex = -1;

  @state() menuButtonEl?: Action["el"];

  //#endregion

  //#region Public Properties

  /** Specifies the appearance of the component. */
  @property({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /** When `true`, expands the component and its contents. */
  @property({ reflect: true }) expanded = false;

  /** @copyDoc */
  @property() flipPlacements?: FlipPlacement[];

  /**
   * @copyDoc
   * @required
   */
  @property() label!: string;

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

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Determines where the component will be positioned relative to the `referenceElement`. */
  @property({ reflect: true }) placement: LogicalPlacement = "auto";

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /** Specifies the size of the component's trigger `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the `calcite-action`s in the menu.
   *
   * @internal
   * @readonly
   */
  @property({ attribute: false }) get actions(): Action["el"][] {
    return this._actions;
  }

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.menuButtonEl, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's content area is collapsed. */
  calciteActionMenuCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteActionMenuExpand = createEvent({ cancelable: false });

  /** Fires when the `open` property is toggled. */
  calciteActionMenuOpen = createEvent({ cancelable: false });

  /** Fires after the component's slotted `calcite-action`s change. */
  calciteInternalActionMenuActionsChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen<CustomEvent<void>>(
      "calciteInternalActionGroupActionsChange",
      this.handleActionGroupActionsChange,
    );
  }

  override connectedCallback(): void {
    this.connectMenuButtonEl();
    this.listen("mousedown", this.mouseDownHandler);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && (this.hasUpdated || this.expanded !== false)) {
      this.expandedHandler();
    }

    if (
      changes.has("activeMenuItemIndex") &&
      (this.hasUpdated || this.activeMenuItemIndex !== -1)
    ) {
      this.updateActions(this.navigableActions);
    }

    if (changes.has("expanded") && this.hasUpdated) {
      if (this.expanded) {
        this.calciteActionMenuExpand.emit();
      } else {
        this.calciteActionMenuCollapse.emit();
      }
    }
  }

  override disconnectedCallback(): void {
    this.disconnectMenuButtonEl();
  }

  //#endregion

  //#region Private Methods

  private expandedHandler(): void {
    this.open = false;
    this.setTooltipReferenceElement();
  }

  private openHandler(open: boolean): void {
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
      this.menuButtonEl.aria = {
        expanded: open,
      };
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

    this.menuButtonEl = undefined;
  }

  private syncActions(): void {
    const triggerSlot = this.triggerSlotRef.value;
    const triggerActions = triggerSlot
      ? getSlotAssignedElements<Action["el"]>(triggerSlot, "calcite-action").filter(
          (action) => !action.classList.contains(CSS.defaultTrigger),
        )
      : [];
    const triggerActionsSet = new Set(triggerActions);

    const defaultActions = this.defaultSlotRef.value
      ? getSlotAssignedElements(this.defaultSlotRef.value).flatMap((element) => {
          if (isAction(element)) {
            return element;
          }

          if (isActionGroup(element)) {
            return element.actions;
          }

          return [];
        })
      : [];

    const dedupedActions: Action["el"][] = [];
    const seenActions = new Set<Action["el"]>();

    [...triggerActions, ...defaultActions].forEach((action) => {
      if (seenActions.has(action)) {
        return;
      }

      seenActions.add(action);
      dedupedActions.push(action);
    });

    this._actions = dedupedActions;
    this.navigableActions = dedupedActions.filter(
      (action) => !triggerActionsSet.has(action) && !action.disabled && !action.hidden,
    );

    if (!this.open || !this.navigableActions.length) {
      this.activeMenuItemIndex = -1;
    } else if (
      this.activeMenuItemIndex < 0 ||
      this.activeMenuItemIndex >= this.navigableActions.length
    ) {
      this.activeMenuItemIndex = 0;
    }

    this.updateActions(this.navigableActions);
  }

  private setMenuButtonEl(): void {
    this.slottedMenuButtonEl = this.triggerSlotRef.value
      ? getSlotAssignedElements<Action["el"]>(this.triggerSlotRef.value, "calcite-action")[0]
      : undefined;
    this.connectMenuButtonEl();
  }

  private syncActionsAndEmitChange(): void {
    this.syncActions();
    this.calciteInternalActionMenuActionsChange.emit();
  }

  private handleTriggerSlotChange(): void {
    this.setMenuButtonEl();
    this.syncActionsAndEmitChange();
  }

  private setDefaultMenuButtonEl(el: Action["el"]): void {
    this.defaultMenuButtonEl = el;
    this.connectMenuButtonEl();
  }

  private setPopoverEl(el: Popover["el"]): void {
    if (!el) {
      return;
    }
    this.popoverEl = el;
    el.open = this.open;
  }

  private handleCalciteActionClick(event): void {
    if (this.navigableActions.some((action) => event.composedPath().includes(action))) {
      this.open = false;
      this.setFocus();
    }
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
      tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : undefined;
    }
  }

  private updateActions(actions: Action["el"][]): void {
    actions.forEach(this.updateAction);
  }

  private async handleDefaultSlotChange(): Promise<void> {
    await this.componentOnReady();
    this.syncActionsAndEmitChange();
  }

  private handleActionGroupActionsChange(event: CustomEvent<void>): void {
    const group = event.target as ActionGroup["el"];

    const slottedActionGroups = this.defaultSlotRef.value
      ? getSlotAssignedElements(this.defaultSlotRef.value).filter(
          (element): element is ActionGroup["el"] => isActionGroup(element),
        )
      : [];

    if (!slottedActionGroups.includes(group)) {
      return;
    }

    this.syncActionsAndEmitChange();
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

  //#endregion

  //#region Rendering

  private renderMenuButton(): JsxNode {
    const { appearance, label, scale, expanded } = this;

    const menuButtonSlot = (
      <slot
        name={SLOTS.trigger}
        onSlotChange={this.handleTriggerSlotChange}
        ref={this.triggerSlotRef}
      >
        <calcite-action
          appearance={appearance}
          aria={{ expanded }}
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
      navigableActions,
      activeMenuItemIndex,
      menuId,
      menuButtonEl,
      label,
      placement,
      overlayPositioning,
      flipPlacements,
    } = this;

    const activeAction = navigableActions[activeMenuItemIndex];
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
        scale={this.scale}
        topLayerDisabled={this.topLayerDisabled}
        triggerDisabled={true}
      >
        <div
          aria-activedescendant={activeDescendantId ?? undefined}
          aria-labelledby={menuButtonEl?.id}
          class={CSS.menu}
          id={menuId}
          onClick={this.handleCalciteActionClick}
          role="menu"
          tabIndex={-1}
        >
          <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
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

  //#endregion
}
