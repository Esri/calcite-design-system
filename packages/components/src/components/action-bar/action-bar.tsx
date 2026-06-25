import { debounce } from "es-toolkit";
import { PropertyValues } from "lit";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  state,
  ToEvents,
} from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useDirection } from "@arcgis/lumina/controllers";
import {
  getStylePixelValue,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale, SelectionAppearance } from "../interfaces";
import { OverlayPositioning } from "../../utils/floating-ui";
import { DEBOUNCE } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useCancelable } from "../../controllers/useCancelable";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Action } from "../action/action";
import { isAction } from "../action/resources";
import { getOverflowCount } from "../../utils/overflow";
import { type ActionMenu } from "../action-menu/action-menu";
import { guid } from "../../utils/guid";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, SLOTS } from "./resources";
import { overflowActions, queryActions } from "./utils";
import { styles } from "./action-bar.scss";

declare global {
  interface DeclareElements {
    "calcite-action-bar": ActionBar;
  }
}

/**
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the component.
 * @slot actions-end - A slot for adding `calcite-action`s that will appear at the end of the component, prior to the collapse/expand button.
 * @slot actions-start - A slot for adding `calcite-action`s that will appear at the start of the component. When `expandPosition` is `"start"`, actions in this slot will render after the collapse/expand button.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
export class ActionBar extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private actions: Action["el"][] = [];

  private navigationItems: Array<Action["el"] | ActionMenu["el"]> = [];

  private guid = guid();

  private containerRef = createRef<HTMLDivElement>();

  private direction = useDirection();

  private expandToggleEl?: Action["el"];

  private actionGroups: ActionGroup["el"][] = [];

  private mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

  private cancelable = useCancelable<this>()(this);

  private resize = debounce(({ width, height }: { width: number; height: number }): void => {
    const { expanded, expandDisabled, layout, overflowActionsDisabled, expandPosition } = this;

    if (
      overflowActionsDisabled ||
      (layout === "vertical" && !height) ||
      (layout === "horizontal" && !width) ||
      !this.containerRef.value
    ) {
      return;
    }

    this.updateGroups();

    const itemSizes = this.getItemSizes();

    const { actionGroups } = this;

    const actionsEndCount =
      this.hasActionsEnd || (!expandDisabled && expandPosition === "end") ? 1 : 0;

    const actionsStartCount =
      this.hasActionsStart || (!expandDisabled && expandPosition === "start") ? 1 : 0;

    const groupCount = actionGroups.length + actionsEndCount + actionsStartCount;

    let bufferSize = groupCount;
    const actionBarContainerStyle = getComputedStyle(this.containerRef.value);

    bufferSize +=
      getStylePixelValue(
        layout === "horizontal"
          ? actionBarContainerStyle.paddingInlineStart
          : actionBarContainerStyle.paddingBlockStart,
      ) +
      getStylePixelValue(
        layout === "horizontal"
          ? actionBarContainerStyle.paddingInlineEnd
          : actionBarContainerStyle.paddingBlockEnd,
      );

    if (actionGroups.length > 0) {
      actionGroups.forEach((actionGroup, i) => {
        const actionGroupStyle = getComputedStyle(actionGroup);
        const actionGroupGap = getStylePixelValue(actionGroupStyle.gap);
        const actionGroupGapQuantity = actionGroup.childElementCount - 1;
        bufferSize += actionGroupGap * actionGroupGapQuantity;
        if (i < actionGroups.length - 1) {
          bufferSize += getStylePixelValue(
            layout === "horizontal"
              ? actionGroupStyle.paddingInlineEnd
              : actionGroupStyle.paddingBlockEnd,
          );
          bufferSize += getStylePixelValue(
            layout === "horizontal"
              ? actionGroupStyle.borderInlineEndWidth
              : actionGroupStyle.borderBlockEndWidth,
          );
        }
      });
    }

    if (groupCount > 0) {
      for (let i = 1; i < groupCount; i++) {
        bufferSize += getStylePixelValue(actionBarContainerStyle.gap);
      }
    }

    const overflowCount = getOverflowCount({
      bufferSize,
      containerSize: layout === "horizontal" ? width : height,
      itemSizes,
    });

    overflowActions({
      actionGroups,
      expanded,
      overflowCount,
    });
  }, DEBOUNCE.resize);

  private resizeHandler = (entry: ResizeObserverEntry): void => {
    const { width, height } = entry.contentRect;
    this.resize({ width, height });
  };

  private resizeObserver = createObserver("resize", (entries) =>
    this.resizeHandlerEntries(entries),
  );

  private toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionBarToggle.emit();
  };

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private focusSetter = useSetFocus<this>()(this);

  private setExpandToggleEl = (el?: Action["el"]): void => {
    this.expandToggleEl = el;
  };

  //#endregion

  //#region State Properties

  @state() expandTooltip?: Tooltip["el"];

  @state() hasActionsEnd = false;

  @state() hasActionsStart = false;

  @state() activeDescendantId?: string;

  //#endregion

  //#region Public Properties

  /** Specifies an accessible name for the last `calcite-action-group`. */
  @property() actionsEndGroupLabel?: string;

  /** Specifies an accessible name for the first `calcite-action-group`. */
  @property() actionsStartGroupLabel?: string;

  /**
   * When `true`, the component is in a floating state.
   */
  @property({ reflect: true }) floating = false;

  /** When `true`, the expand-toggling behavior is disabled. */
  @property({ reflect: true }) expandDisabled = false;

  /**
   * When `true`, expands the component and its contents.
   * When a child `calcite-action` specifies `textEnabled` as `true`, its `text` initially displays adjacent to its `icon` regardless of expansion.
   */
  @property({ reflect: true }) expanded = false;

  /** Specifies the position of the expand `calcite-action`. */
  @property({ reflect: true }) expandPosition: Extract<"start" | "end", Position> = "end";

  /** Specifies the layout direction of the actions. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** Overrides individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** When `true`, disables automatically overflowing `calcite-action`s that won't fit into menus. */
  @property({ reflect: true }) overflowActionsDisabled = false;

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * When `expandDisabled` is `false`, specifies the expand toggle's chevron direction, where:
   *
   * `"start"` positions the expand toggle's chevron away from the start of the component when `expanded` is `false`, and
   * `"end"` positions the expand toggle's chevron away from the end of the component when `expanded` is `false`.
   *
   * When `expanded` is `true`, the chevron direction is reversed.
   */
  @property({ reflect: true }) position?: Extract<"start" | "end", Position>;

  /** Specifies the size of the expand `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the selection appearance of the component */
  @property({ reflect: true }) selectionAppearance: Extract<
    "neutral" | "highlight",
    SelectionAppearance
  > = "neutral";

  //#endregion

  //#region Public Methods

  /**
   * Overflows actions that won't fit into menus.
   *
   * @private
   */
  @method()
  async overflowActions(): Promise<void> {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.el, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component's content area is collapsed. */
  calciteActionBarCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteActionBarExpand = createEvent({ cancelable: false });

  /** Fires when the `expanded` property is toggled. */
  calciteActionBarToggle = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listen<ToEvents<ActionMenu>["calciteActionMenuOpen"]>(
      "calciteActionMenuOpen",
      this.actionMenuOpenHandler,
    );
    this.listen("keydown", this.handleKeyDown);
    this.listen("focusin", this.handleFocusIn);
  }

  override connectedCallback(): void {
    this.updateGroups();
    this.queryAndStoreNavigableItems();
    this.syncActiveDescendant();
    this.overflowActions();
    this.updateActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    this.cancelable.add(this.resize);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== false)) ||
      (changes.has("expandPosition") && (this.hasUpdated || this.expandPosition !== "end"))
    ) {
      this.overflowActions();
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
    }

    if (
      changes.has("overflowActionsDisabled") &&
      (this.hasUpdated || this.overflowActionsDisabled !== false)
    ) {
      this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    }

    if (changes.has("expanded") && this.hasUpdated) {
      this.expandedHandler();
      if (this.expanded) {
        this.calciteActionBarExpand.emit();
      } else {
        this.calciteActionBarCollapse.emit();
      }
    }

    if (
      changes.has("selectionAppearance") &&
      (this.hasUpdated || this.selectionAppearance !== "neutral")
    ) {
      this.updateActions();
    }
  }

  loaded(): void {
    this.overflowActions();
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  //#endregion

  //#region Private Methods

  private getItemSizes(): number[] {
    const { el, layout, expandToggleEl } = this;

    const actions = queryActions(el);

    if (expandToggleEl) {
      actions.push(expandToggleEl);
    }

    const clientSize = layout === "horizontal" ? "clientWidth" : "clientHeight";
    const fallbackSize = Math.max(...actions.map((action) => action[clientSize] || 0));
    return actions.map((action) => action[clientSize] || fallbackSize);
  }

  private expandedHandler(): void {
    const { el, expanded } = this;
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }

  private overflowActionsDisabledHandler(overflowActionsDisabled: boolean): void {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }

    this.resizeObserver?.observe(this.el);
    this.overflowActions();
  }

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    const actionMenu = event.target as ActionMenu["el"];

    if (actionMenu) {
      this.setActiveDescendantId(actionMenu.id);
    }

    if ((event.target as ActionGroup["el"]).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }

    if (actionMenu?.open) {
      this.syncActiveDescendantToActionMenu(actionMenu);
      return;
    }

    this.updateActions();
  }

  private mutationObserverHandler(): void {
    this.updateGroups();
    this.overflowActions();
    this.queryAndStoreNavigableItems();
    this.syncActiveDescendant();
    this.updateActions();
  }

  private resizeHandlerEntries(entries: ResizeObserverEntry[]): void {
    entries.forEach(this.resizeHandler);
  }

  private updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    groups.forEach((group) => {
      group.layout = this.layout;
      group.scale = this.scale;
    });

    this.ensureActionBarChildIds();
  }

  private handleDefaultSlotChange(): void {
    this.updateGroups();
    this.queryAndStoreNavigableItems();
    this.syncActiveDescendant();
    this.updateActions();
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
    this.overflowActions();
  }

  private handleActionsStartSlotChange(event: Event): void {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
    this.overflowActions();
  }

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = slotChangeGetAssignedElements(event).filter((el): el is Tooltip["el"] =>
      el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  }

  private updateActions(): void {
    this.actions.forEach((action) => {
      action.selectionAppearance = this.selectionAppearance;
      action.activeDescendant = action.id === this.activeDescendantId;
    });
  }

  private queryAndStoreNavigableItems(): void {
    this.ensureActionBarChildIds();

    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));

    const shadowActionMenus = this.actionGroups
      .flatMap((group) =>
        group.shadowRoot
          ? Array.from(group.shadowRoot.querySelectorAll("calcite-action-menu"))
          : [],
      )
      .filter((menu): menu is ActionMenu["el"] => {
        if (menu.hasAttribute("hidden")) {
          return false;
        }

        this.syncActionMenuId(menu);
        return !!menu.id;
      });

    const lightDomNavigationItems = Array.from(
      this.el.querySelectorAll("calcite-action, calcite-action-menu"),
    ).filter((el): el is Action["el"] | ActionMenu["el"] => {
      if (isAction(el)) {
        if (el.disabled || el.hasAttribute("hidden")) {
          return false;
        }

        const closestMenu = el.closest("calcite-action-menu");
        return !closestMenu;
      }

      if (el.hasAttribute("hidden")) {
        return false;
      }

      this.syncActionMenuId(el as ActionMenu["el"]);
      return !!el.id;
    });

    this.navigationItems = [...lightDomNavigationItems, ...shadowActionMenus];

    console.log("calcite-action-bar navigation items", {
      navigationItems: this.navigationItems.map((item) => ({
        id: item.id,
        tagName: item.tagName.toLowerCase(),
      })),
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const actionMenu = this.getEventActionMenu(event);

    if (actionMenu?.open) {
      this.syncActiveDescendantToActionMenu(actionMenu);
      return;
    }

    if (event.defaultPrevented) {
      return;
    }

    this.queryAndStoreNavigableItems();

    const current = this.getNavigationItemFromEvent(event) ?? this.getCurrentNavigationItem();

    if (!current || !this.navigationItems.length) {
      return;
    }

    const isVertical = this.layout !== "horizontal";

    switch (event.key) {
      case "ArrowDown":
        if (isVertical) {
          this.focusNavigationItem("next", current);
          event.preventDefault();
        }
        break;
      case "ArrowUp":
        if (isVertical) {
          this.focusNavigationItem("previous", current);
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if (!isVertical) {
          this.focusNavigationItem("next", current);
          event.preventDefault();
        }
        break;
      case "ArrowLeft":
        if (!isVertical) {
          this.focusNavigationItem("previous", current);
          event.preventDefault();
        }
        break;
      case "Home":
        this.focusNavigationItem("first", current);
        event.preventDefault();
        break;
      case "End":
        this.focusNavigationItem("last", current);
        event.preventDefault();
        break;
      case "Tab":
        this.setNavigationItemTabIndexes(current);
        this.syncActiveDescendant(current);
        break;
    }
  }

  private handleFocusIn(event: FocusEvent): void {
    this.queryAndStoreNavigableItems();

    const actionMenu = this.getEventActionMenu(event);
    if (actionMenu?.open) {
      this.syncActiveDescendantToActionMenu(actionMenu);
      return;
    }

    if (actionMenu) {
      this.setActiveDescendantId(actionMenu.id);
      this.syncActiveDescendant(actionMenu);
      return;
    }

    this.syncActiveDescendant(this.getNavigationItemFromEvent(event) ?? undefined);
  }

  private focusNavigationItem(
    direction: "next" | "previous" | "first" | "last",
    current: Action["el"] | ActionMenu["el"],
  ): void {
    const { navigationItems } = this;
    const currentIndex = navigationItems.findIndex(
      (item) => item === current || item.id === current.id,
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (direction === "first") {
      nextIndex = 0;
    } else if (direction === "last") {
      nextIndex = navigationItems.length - 1;
    } else if (direction === "next") {
      nextIndex = (currentIndex + 1) % navigationItems.length;
    } else {
      nextIndex = (currentIndex - 1 + navigationItems.length) % navigationItems.length;
    }

    const nextItem = navigationItems[nextIndex];

    if (nextItem?.matches("calcite-action-menu")) {
      this.setActiveDescendantId(this.getActionMenuId(nextItem));
    }

    if (nextItem && nextItem !== current) {
      this.focusItem(nextItem);
    }

    this.syncActiveDescendant(nextItem);
  }

  private focusItem(item: Action["el"] | ActionMenu["el"]): void {
    if ("setFocus" in item && typeof item.setFocus === "function") {
      void item.setFocus();
      return;
    }

    item.focus();
  }

  private getCurrentNavigationItem(): Action["el"] | ActionMenu["el"] {
    const { activeElement } = document;

    if (activeElement instanceof HTMLElement) {
      const activeItem = activeElement.matches("calcite-action, calcite-action-menu")
        ? activeElement
        : activeElement.closest("calcite-action, calcite-action-menu");

      if (
        activeItem &&
        this.navigationItems.includes(activeItem as Action["el"] | ActionMenu["el"])
      ) {
        return activeItem as Action["el"] | ActionMenu["el"];
      }

      const activeItemId = (activeItem as Action["el"] | ActionMenu["el"]).id;
      const activeNavigationItem = this.navigationItems.find((item) => item.id === activeItemId);
      if (activeNavigationItem) {
        return activeNavigationItem;
      }

      const activeActionMenu = activeElement.closest("calcite-action-menu");
      if (activeActionMenu) {
        const activeActionMenuId = this.getActionMenuId(activeActionMenu);
        const activeActionMenuItem = this.navigationItems.find(
          (item) => item.id === activeActionMenuId,
        );
        if (activeActionMenuItem) {
          return activeActionMenuItem;
        }
      }
    }

    if (this.activeDescendantId) {
      const activeDescendant = this.navigationItems.find(
        (item) => item.id === this.activeDescendantId,
      );
      if (activeDescendant) {
        return activeDescendant;
      }
    }

    return this.navigationItems[0];
  }

  private getEventActionMenu(event: Event): ActionMenu["el"] | null {
    const pathActionMenu = event
      .composedPath()
      .find(
        (pathEl): pathEl is ActionMenu["el"] =>
          pathEl instanceof HTMLElement && pathEl.matches("calcite-action-menu"),
      );

    if (pathActionMenu) {
      return pathActionMenu;
    }

    const target = event.target;
    if (target instanceof HTMLElement) {
      const closestActionMenu = target.closest("calcite-action-menu");
      if (closestActionMenu) {
        return closestActionMenu;
      }
    }

    return null;
  }

  private syncActiveDescendantToActionMenu(actionMenu: ActionMenu["el"]): void {
    const activeMenuItem =
      actionMenu.querySelector("calcite-action[active-descendant]") ||
      Array.from(actionMenu.querySelectorAll("calcite-action")).find(
        (action) => !action.disabled && !action.hidden,
      );

    this.setActiveDescendantId(activeMenuItem?.id || this.getActionMenuId(actionMenu));
    this.updateActions();
  }

  private getNavigationItemFromEvent(event: Event): Action["el"] | ActionMenu["el"] | null {
    const pathItem = event
      .composedPath()
      .find(
        (pathEl): pathEl is Action["el"] | ActionMenu["el"] =>
          pathEl instanceof HTMLElement &&
          pathEl.matches("calcite-action, calcite-action-menu") &&
          this.navigationItems.some((item) => item === pathEl || item.id === pathEl.id),
      );

    if (!pathItem) {
      return null;
    }

    return (
      this.navigationItems.find((item) => item === pathItem || item.id === pathItem.id) ?? null
    );
  }

  private ensureActionBarChildIds(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    const actions = Array.from(this.el.querySelectorAll("calcite-action"));

    groups.forEach((group, index) => {
      if (!group.id) {
        group.id = IDS.actionGroup(this.guid, index);
      }
    });

    actions.forEach((action, index) => {
      if (!action.id) {
        action.id = IDS.action(this.guid, index);
      }
    });
  }

  private syncActiveDescendant(activeItem?: Action["el"] | ActionMenu["el"]): void {
    this.queryAndStoreNavigableItems();

    const activeItemInNavigation = activeItem
      ? this.navigationItems.find((item) => item === activeItem || item.id === activeItem.id)
      : undefined;

    const current =
      activeItemInNavigation ||
      this.navigationItems.find((item) => item.id === this.activeDescendantId) ||
      this.getCurrentNavigationItem();

    this.setActiveDescendantId(this.getNavigationItemId(current));

    this.setNavigationItemTabIndexes(current);
    this.updateActions();
  }

  private getNavigationItemId(item?: Action["el"] | ActionMenu["el"]): string | undefined {
    if (!item) {
      return undefined;
    }

    if (item.matches("calcite-action-menu")) {
      return this.getActionMenuId(item);
    }

    return item.id;
  }

  private syncActionMenuId(actionMenu: ActionMenu["el"]): void {
    if (actionMenu.id) {
      return;
    }

    const existingId = this.getActionMenuId(actionMenu);
    if (existingId) {
      actionMenu.id = existingId;
    }
  }

  private getActionMenuId(actionMenu: ActionMenu["el"]): string | undefined {
    return (
      actionMenu.id ||
      (actionMenu.shadowRoot?.querySelector("[role='menu']") as HTMLElement | null)?.id ||
      undefined
    );
  }

  private setActiveDescendantId(id?: string): void {
    this.activeDescendantId = id;
    const toolbarEl = this.containerRef.value;

    console.log("calcite-action-bar active descendant", {
      activeDescendantId: this.activeDescendantId,
      navigationItems: this.navigationItems.map((item) => ({
        id: item.id,
        tagName: item.tagName.toLowerCase(),
      })),
    });

    if (this.activeDescendantId) {
      this.el.setAttribute("aria-activedescendant", this.activeDescendantId);
      toolbarEl?.setAttribute("aria-activedescendant", this.activeDescendantId);
    } else {
      this.el.removeAttribute("aria-activedescendant");
      toolbarEl?.removeAttribute("aria-activedescendant");
    }
  }

  private setNavigationItemTabIndexes(active: Action["el"] | ActionMenu["el"]): void {
    this.navigationItems.forEach((item) => {
      const isActive = item === active;

      if (isAction(item)) {
        if (isActive && !item.disabled && !item.hidden) {
          // action's internal button is tabbable by default, so we remove the attribute to avoid an extra tabbable element
          item.removeAttribute("tabindex");
        } else {
          item.tabIndex = -1;
        }
        return;
      }

      item.tabIndex = isActive ? 0 : -1;
    });
  }

  //#endregion

  //#region Rendering

  private renderExpandTooltipSlot(): JsxNode {
    return <slot name={SLOTS.expandTooltip} onSlotChange={this.handleTooltipSlotChange} />;
  }

  private renderExpandToggle(): JsxNode {
    const { el, expanded, toggleExpand, messages, position, scale } = this;

    return (
      <ExpandToggle
        collapseLabel={messages.collapseLabel}
        collapseText={messages.collapse}
        direction={this.direction}
        el={el}
        expanded={expanded}
        expandLabel={messages.expandLabel}
        expandText={messages.expand}
        position={position}
        ref={this.setExpandToggleEl}
        scale={scale}
        toggle={toggleExpand}
        tooltip={this.expandTooltip}
      />
    );
  }

  private renderActionsGroup(position: Extract<"start" | "end", Position>): JsxNode {
    const { expandDisabled, scale, layout, overlayPositioning, expandPosition } = this;

    const isStart = position === "start";
    const hasExpandToggle = !expandDisabled && expandPosition === position;

    const slotName = isStart ? SLOTS.actionsStart : SLOTS.actionsEnd;
    const onSlotChange = isStart
      ? this.handleActionsStartSlotChange
      : this.handleActionsEndSlotChange;
    const label = isStart ? this.actionsStartGroupLabel : this.actionsEndGroupLabel;
    const hidden = !hasExpandToggle && !(isStart ? this.hasActionsStart : this.hasActionsEnd);
    const className = isStart ? CSS.actionGroupStart : CSS.actionGroupEnd;

    return (
      <calcite-action-group
        class={className}
        hidden={hidden}
        label={label}
        layout={layout}
        overlayPositioning={overlayPositioning}
        scale={scale}
      >
        {isStart && hasExpandToggle ? this.renderExpandToggle() : null}
        <slot name={slotName} onSlotChange={onSlotChange} />
        {hasExpandToggle ? this.renderExpandTooltipSlot() : null}
        {!isStart && hasExpandToggle ? this.renderExpandToggle() : null}
      </calcite-action-group>
    );
  }

  override render(): JsxNode {
    return (
      <div
        aria-activedescendant={this.activeDescendantId}
        ariaOrientation={this.layout === "horizontal" ? "horizontal" : "vertical"}
        class={CSS.container}
        ref={this.containerRef}
        role="toolbar"
      >
        {this.renderActionsGroup("start")}
        <slot onSlotChange={this.handleDefaultSlotChange} />
        {this.renderActionsGroup("end")}
      </div>
    );
  }

  //#endregion
}
