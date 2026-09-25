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
  closestElementCrossShadowBoundary,
  filterDirectChildren,
  getSlotAssignedElements,
  getStylePixelValue,
  slotChangeGetAssignedElements,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { ExpandToggle, toggleActionBarChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale, SelectionAppearance, ActiveDescendantElement } from "../types";
import { OverlayPositioning } from "../../utils/floating-ui";
import { DEBOUNCE } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useCancelable } from "../../controllers/useCancelable";
import { logger } from "../../utils/logger";
import type { Tooltip } from "../tooltip/tooltip";
import { isTooltip } from "../tooltip/resources";
import type { ActionGroup } from "../action-group/action-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Action } from "../action/action";
import { isAction } from "../action/resources";
import { isActionGroup } from "../action-group/resources";
import { isActionMenu, SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { type ActionMenu } from "../action-menu/action-menu";
import { guid } from "../../utils/guid";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, IDS, SLOTS } from "./resources";
import { ActionBarItem, getWrapItemCrossOffset, overflowActions, queryActions } from "./utils";
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

  private currentFocusItem?: Action["el"] | ActionMenu["el"];

  private guid = guid();

  private containerRef = createRef<HTMLDivElement>();

  private defaultSlotRef = createRef<HTMLSlotElement>();

  private actionsStartSlotRef = createRef<HTMLSlotElement>();

  private actionsEndSlotRef = createRef<HTMLSlotElement>();

  private actionsStartGroupRef = createRef<ActionGroup["el"]>();

  private actionsEndGroupRef = createRef<ActionGroup["el"]>();

  private direction = useDirection();

  private expandToggleEl?: Action["el"];

  private defaultSlotItems: ActionBarItem[] = [];

  private actionGroups: ActionGroup["el"][] = [];

  private actionMenuIdIndex = 0;

  private mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

  private actionMenus: ActionMenu["el"][] = [];

  private actionsStart: ActionBarItem[] = [];

  private actionsStartGroups: ActionGroup["el"][] = [];

  private actionsEnd: ActionBarItem[] = [];

  private actionsEndGroups: ActionGroup["el"][] = [];

  private overflowPassId = 0;

  // Suppresses the temporary actions-change event emitted while an overflow pass is mutating a group.
  private suppressedActionGroupActionsChange = new WeakMap<ActionGroup["el"], number>();

  private lineMeasureFrame?: number;

  private cancelable = useCancelable<this>()(this);

  private resize = debounce(({ width, height }: { width: number; height: number }): void => {
    const { expanded, expandToggleDisabled, layout, expandPosition } = this;

    this.updateGroups();

    // resize is debounced, so the container ref may be empty when it runs — the action-bar can be torn down (or not yet rendered) between scheduling and execution.
    if (!this.containerRef.value) {
      return;
    }

    if (this.usesWrap) {
      this.scheduleLineMeasure();
      return;
    }

    if (
      this.overflowMode !== "collapse" ||
      (layout === "vertical" && !height) ||
      (layout === "horizontal" && !width)
    ) {
      return;
    }

    const itemSizes = this.getItemSizes();

    const {
      actionGroups: defaultActionGroups,
      actionsEnd,
      actionsEndGroups,
      actionsStart,
      actionsStartGroups,
      defaultSlotItems,
    } = this;
    const slottedActionGroups = [
      ...actionsStartGroups,
      ...defaultActionGroups,
      ...actionsEndGroups,
    ];

    const actionsEndCount =
      this.hasActionsEnd || (!expandToggleDisabled && expandPosition === "end") ? 1 : 0;

    const actionsStartCount =
      this.hasActionsStart || (!expandToggleDisabled && expandPosition === "start") ? 1 : 0;

    const visibleSectionCount = defaultSlotItems.length + actionsEndCount + actionsStartCount;

    let bufferSize = visibleSectionCount;
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

    if (slottedActionGroups.length > 0) {
      const lastSlottedActionGroupIndex = slottedActionGroups.length - 1;

      slottedActionGroups.forEach((actionGroup, index) => {
        const actionGroupStyle = getComputedStyle(actionGroup);

        if (index !== lastSlottedActionGroupIndex) {
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

    const addWrappedSectionGap = (
      items: ActionBarItem[],
      wrapper: ActionGroup["el"] | undefined,
      hasExpandToggle: boolean,
    ): void => {
      if (!wrapper || items.length < 1) {
        return;
      }

      const wrapperStyle = getComputedStyle(wrapper);
      const wrapperGap = getStylePixelValue(wrapperStyle.gap);
      const wrapperItemCount = items.length + (hasExpandToggle ? 1 : 0);

      bufferSize += wrapperGap * Math.max(wrapperItemCount - 1, 0);
    };

    const hasExpandToggleAtStart = !expandToggleDisabled && expandPosition === "start";
    const hasExpandToggleAtEnd = !expandToggleDisabled && expandPosition === "end";

    addWrappedSectionGap(actionsStart, this.actionsStartGroupRef.value, hasExpandToggleAtStart);
    addWrappedSectionGap(actionsEnd, this.actionsEndGroupRef.value, hasExpandToggleAtEnd);

    if (visibleSectionCount > 1) {
      bufferSize += getStylePixelValue(actionBarContainerStyle.gap) * (visibleSectionCount - 1);
    }

    const containerSize = layout === "horizontal" ? width : height;
    const itemSize = itemSizes.reduce((total, size) => total + size, 0);
    const fallbackItemSize = Math.max(...itemSizes, 0);
    const clientSize: "clientWidth" | "clientHeight" =
      layout === "horizontal" ? "clientWidth" : "clientHeight";
    let overflowCount = itemSizes.length;

    for (
      let candidateOverflowCount = 0;
      candidateOverflowCount <= itemSizes.length;
      candidateOverflowCount++
    ) {
      const overflowState = {
        clientSize,
        fallbackItemSize,
        itemSizeAdjustment: 0,
        remainingCount: candidateOverflowCount,
      };
      const actionGroupGapSize = [...slottedActionGroups]
        .reverse()
        .reduce((gapSize, actionGroup) => {
          const visibleItemCount = this.getVisibleActionGroupItemCount(actionGroup, overflowState);
          const gap = getStylePixelValue(getComputedStyle(actionGroup).gap);

          return gapSize + gap * Math.max(visibleItemCount - 1, 0);
        }, 0);
      if (
        itemSize + overflowState.itemSizeAdjustment + bufferSize + actionGroupGapSize <=
        containerSize
      ) {
        overflowCount = candidateOverflowCount;
        break;
      }
    }

    this.runOverflowActions({
      actionGroups: slottedActionGroups,
      expanded,
      overflowCount,
    });
  }, DEBOUNCE.resize);

  private resizeObserver = createObserver("resize", () => this.resizeHandlerEntries());

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

  /** Whether any action groups are slotted in the default slot; enables wrap-mode group dividers. */
  @state() hasActionGroups = false;

  /** Cross-axis offsets (px) of each wrapped line after the first; drives the divider overlay. */
  @state() lineOffsets: number[] = [];

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

  /** When `true`, the expand/collapse toggle button is not shown. */
  @property({ reflect: true }) expandToggleDisabled = false;

  /**
   * When `true`, the expand/collapse toggle button is not shown.
   *
   * @deprecated in v5.2.0, removal target v6.0.0 - Use `expandToggleDisabled` instead.
   */
  @property({ reflect: true })
  get expandDisabled(): boolean {
    return this.expandToggleDisabled;
  }
  set expandDisabled(value: boolean) {
    logger.deprecated("property", {
      component: this,
      name: "expandDisabled",
      removalVersion: 6,
      suggested: "expandToggleDisabled",
    });
    this.expandToggleDisabled = value;
  }

  /**
   * When `true`, expands the component.
   *
   * The `expanded` or `textEnabled` state of `calcite-action`, `calcite-action-group`, and `calcite-action-menu` children is synced when this property is toggled, not during initialization.
   * When a child `calcite-action` specifies `textEnabled` as `true`, its `text` initially displays adjacent to its `icon` regardless of expansion.
   */
  @property({ reflect: true }) expanded = false;

  /** Specifies the position of the expand `calcite-action`. */
  @property({ reflect: true }) expandPosition: Extract<"start" | "end", Position> = "end";

  /** Specifies the layout direction of the actions. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /**
   * Specifies how the component handles `calcite-action`s that overflow the available space, where:
   *
   * `"collapse"` overflows actions that won't fit into menus,
   *
   * `"wrap"` allows the actions to wrap onto multiple lines, adding dividers between the wrapped rows
   * or columns (has no effect when `layout` is `"grid"`), and
   *
   * `"none"` applies no overflow handling.
   */
  @property({ reflect: true }) overflowMode: "collapse" | "wrap" | "none" = "collapse";

  /** @copyDoc */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When `true`, disables automatically overflowing `calcite-action`s that won't fit into menus.
   *
   * @deprecated in v5.2.0, removal target v7.0.0 - Use `overflowMode="none"` instead.
   */
  @property({ reflect: true })
  get overflowActionsDisabled(): boolean {
    return this.overflowMode === "none";
  }
  set overflowActionsDisabled(value: boolean) {
    logger.deprecated("property", {
      component: this,
      name: "overflowActionsDisabled",
      removalVersion: 7,
      suggested: 'overflowMode="none"',
    });
    this.overflowMode = value ? "none" : "collapse";
  }

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * When `expandToggleDisabled` is `false`, specifies the expand toggle's chevron direction.
   *
   * - `"start"` positions the expand toggle's chevron away from the start of the component when `expanded` is `false`.
   * - `"end"` positions the expand toggle's chevron away from the end of the component when `expanded` is `false`.
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
    if (this.overflowMode !== "collapse") {
      if (this.usesWrap) {
        this.scheduleLineMeasure();
      }

      return;
    }

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
    this.listen<ToEvents<ActionMenu>["calciteInternalActiveDescendantChange"]>(
      "calciteInternalActiveDescendantChange",
      this.calciteInternalActiveDescendantChangeHandler,
    );
    this.listen<CustomEvent<void>>(
      "calciteInternalActionGroupActionsChange",
      this.handleActionGroupActionsChange,
    );
    this.listen<CustomEvent<void>>(
      "calciteInternalActionMenuActionsChange",
      this.handleActionMenuActionsChange,
    );
    this.listen("click", this.handleFocusIn);
    this.listen("keydown", this.handleKeyDown);
    this.listen("focusin", this.handleFocusIn);
    this.listen("focusout", this.handleFocusOut);
  }

  override connectedCallback(): void {
    this.updateGroups();
    this.updateNavigationItems();
    this.syncActiveDescendant();
    this.overflowActions();
    this.updateActions();
    this.mutationObserver?.observe(this.el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["selection-mode", "overflow-actions-disabled"],
    });
    this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    this.overflowModeHandler();
    this.cancelable.add(this.resize);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== false)) ||
      (changes.has("expandToggleDisabled") &&
        (this.hasUpdated || this.expandToggleDisabled !== false)) ||
      (changes.has("expandPosition") && (this.hasUpdated || this.expandPosition !== "end"))
    ) {
      this.overflowActions();
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
      this.overflowModeHandler();

      if (!this.usesWrap) {
        this.updateLines();
      }
    }

    if (
      changes.has("overflowActionsDisabled") &&
      (this.hasUpdated || this.overflowActionsDisabled !== false)
    ) {
      this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    }
    if (changes.has("overflowMode") && (this.hasUpdated || this.overflowMode !== "collapse")) {
      if (!this.usesWrap && this.lineMeasureFrame != null) {
        cancelAnimationFrame(this.lineMeasureFrame);
        this.lineMeasureFrame = undefined;
      }

      if (this.usesWrap) {
        this.scheduleLineMeasure();
      } else {
        this.updateLines();
      }
      this.overflowModeHandler();
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
    this.syncDefaultSlot();
    this.syncActionsStartSlot();
    this.syncActionsEndSlot();
    this.syncActionsState();
    this.overflowActions();
  }

  override updated(): void {
    if (this.usesWrap && this.lineMeasureFrame == null) {
      this.scheduleLineMeasure();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    if (this.lineMeasureFrame != null) {
      cancelAnimationFrame(this.lineMeasureFrame);
      this.lineMeasureFrame = undefined;
    }
  }

  //#endregion

  //#region Private Methods

  private getItemSizes(): number[] {
    const { layout, expandToggleEl } = this;
    const clientSize = layout === "horizontal" ? "clientWidth" : "clientHeight";

    const itemSizes = this.actions.map((action) => action[clientSize] || 0);
    const slottedActionGroupMenus = this.getTrackedActionGroups().flatMap((group) =>
      filterDirectChildren<ActionMenu["el"]>(group, "calcite-action-menu"),
    );

    slottedActionGroupMenus.forEach((menu) => {
      const triggerAction = menu.actions.find(
        (action) => action.slot === ACTION_MENU_SLOTS.trigger,
      );

      // Use the host element size when no custom trigger is slotted.
      itemSizes.push((triggerAction ?? menu)[clientSize] || 0);
    });

    if (expandToggleEl) {
      itemSizes.push(expandToggleEl[clientSize] || 0);
    }

    const fallbackSize = Math.max(...itemSizes, 0);
    return itemSizes.map((size) => size || fallbackSize);
  }

  private getVisibleActionGroupItemCount(
    actionGroup: ActionGroup["el"],
    overflowState: {
      clientSize: "clientWidth" | "clientHeight";
      fallbackItemSize: number;
      itemSizeAdjustment: number;
      remainingCount: number;
    },
  ): number {
    const directActions = actionGroup.actions
      .filter((action) => action.parentElement === actionGroup)
      .reverse();
    const canOverflowGroup = directActions.length > 2 && !actionGroup.overflowActionsDisabled;
    let overflowedActionCount = 0;
    let visibleActionCount = directActions.length;

    directActions.forEach((action) => {
      if (
        overflowState.remainingCount < 1 ||
        !canOverflowGroup ||
        visibleActionCount < 2 ||
        action.overflowDisabled
      ) {
        return;
      }

      visibleActionCount--;
      overflowedActionCount++;
      overflowState.remainingCount--;
      overflowState.itemSizeAdjustment -=
        action[overflowState.clientSize] || overflowState.fallbackItemSize;
    });

    if (overflowedActionCount > 0) {
      const menu = actionGroup.shadowRoot?.querySelector("calcite-action-menu");
      const triggerAction = menu?.actions.find(
        (action) => action.slot === ACTION_MENU_SLOTS.trigger,
      );

      overflowState.itemSizeAdjustment +=
        (triggerAction ?? menu)?.[overflowState.clientSize] || overflowState.fallbackItemSize;
    }

    const directActionMenuCount = filterDirectChildren<ActionMenu["el"]>(
      actionGroup,
      "calcite-action-menu",
    ).length;

    return visibleActionCount + directActionMenuCount + (overflowedActionCount > 0 ? 1 : 0);
  }

  private expandedHandler(): void {
    this.syncActionsState(true);
    this.overflowActions();
  }

  private overflowModeHandler(): void {
    if (this.overflowMode === "none") {
      this.resizeObserver?.disconnect();
    } else {
      this.resizeObserver?.observe(this.el);
    }
    this.overflowActions();
  }

  private overflowActionsDisabledHandler(overflowActionsDisabled: boolean): void {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }

    this.resizeObserver?.observe(this.el);
    if (this.containerRef.value) {
      this.resizeObserver?.observe(this.containerRef.value);
    }
    this.overflowActions();
  }

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    const composedPath = event.composedPath();
    const source = composedPath.find(
      (element): element is ActionGroup["el"] | ActionMenu["el"] =>
        isActionGroup(element) || isActionMenu(element),
    );

    if (!source) {
      return;
    }

    if ((isActionGroup(source) && !source.menuOpen) || (isActionMenu(source) && !source.open)) {
      return;
    }

    this.getTrackedActionGroups().forEach((group) => {
      if (!composedPath.includes(group)) {
        group.menuOpen = false;
      }
    });

    this.getTrackedActionMenus().forEach((menu) => {
      if (!composedPath.includes(menu)) {
        menu.open = false;
      }
    });

    this.updateActions();
  }

  private mutationObserverHandler(): void {
    this.updateGroups();
    this.overflowActions();
    this.updateNavigationItems();
    this.syncActiveDescendant();
    this.updateActions();
  }

  // Overflow is a two-step pass: capture each group's current direct-action slot state,
  // run the overflow mutation, then suppress any transient actions-change event emitted
  // by groups whose direct children were just moved.
  private runOverflowActions({
    actionGroups,
    expanded,
    overflowCount,
  }: {
    actionGroups: ActionGroup["el"][];
    expanded: boolean;
    overflowCount: number;
  }): void {
    const overflowPassId = ++this.overflowPassId;

    const slotStateByGroup = new Map<ActionGroup["el"], string>();
    actionGroups.forEach((group) => {
      const directActions = group.actions.filter((action) => action.parentElement === group);
      slotStateByGroup.set(group, directActions.map((action) => action.slot ?? "").join("|"));
    });

    overflowActions({
      actionGroups,
      expanded,
      overflowCount,
    });

    actionGroups.forEach((group) => {
      const directActions = group.actions.filter((action) => action.parentElement === group);
      const nextSlotState = directActions.map((action) => action.slot ?? "").join("|");

      if (slotStateByGroup.get(group) !== nextSlotState) {
        this.suppressedActionGroupActionsChange.set(group, overflowPassId);
        this.queueSuppressedActionGroupActionsChangeCleanup(group, overflowPassId);
      }
    });
  }

  private queueSuppressedActionGroupActionsChangeCleanup(
    group: ActionGroup["el"],
    overflowPassId: number,
  ): void {
    // Defer cleanup until the overflow mutation has finished propagating so the next actions-change event from this pass is still suppressed.
    queueMicrotask(() => {
      if (this.suppressedActionGroupActionsChange.get(group) === overflowPassId) {
        this.suppressedActionGroupActionsChange.delete(group);
      }
    });
  }

  private resizeHandlerEntries(): void {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }

  private getSectionWrapperGroups(): ActionGroup["el"][] {
    return [this.actionsStartGroupRef.value, this.actionsEndGroupRef.value].filter(
      (group): group is ActionGroup["el"] => !!group,
    );
  }

  private updateGroups(): void {
    const groups = [
      ...this.actionGroups,
      ...this.actionsStartGroups,
      ...this.actionsEndGroups,
      ...this.getSectionWrapperGroups(),
    ];

    this.hasActionGroups = this.actionGroups.length > 0;

    groups.forEach((group) => {
      group.layout = this.layout;
      group.scale = this.scale;
    });

    this.ensureActionBarChildIds();
    void this.syncNavItemsAfterRender();
  }

  private async syncNavItemsAfterRender(): Promise<void> {
    const { actionGroups } = this;

    await Promise.all(actionGroups.map((group) => group.componentOnReady()));

    if (!this.el.isConnected) {
      return;
    }

    this.updateNavigationItems();
    this.syncActiveDescendant();
    this.updateActions();
  }

  /**
   * Whether wrap dividers are active. True for `"horizontal"`/`"vertical"` when the overflow mode is
   * `"wrap"`.
   */
  private get usesWrap(): boolean {
    return this.overflowMode === "wrap" && this.layout !== "grid";
  }

  /**
   * Coalesces line measurement into a single animation frame so repeated renders/resizes don't each
   * force a synchronous layout read. A frame-aligned update avoids the latency a time-based debounce
   * would add for this visual measurement.
   */
  private scheduleLineMeasure(): void {
    if (this.lineMeasureFrame != null) {
      cancelAnimationFrame(this.lineMeasureFrame);
    }

    this.lineMeasureFrame = requestAnimationFrame(() => {
      this.lineMeasureFrame = undefined;
      this.updateLines();
    });
  }

  /** Returns the flex items that participate in wrapping, in flow order. */
  private getWrapItems(): HTMLElement[] {
    const items: HTMLElement[] = [];

    const start = this.actionsStartGroupRef.value;
    if (start && !start.hidden) {
      items.push(start);
    }

    this.defaultSlotItems.forEach((el) => {
      if (!el.hidden) {
        items.push(el);
      }
    });

    const end = this.actionsEndGroupRef.value;
    if (end && !end.hidden) {
      items.push(end);
    }

    return items;
  }

  /**
   * Measures where the content wraps and records the cross-axis offset of each wrapped line (after
   * the first) so the overlay can draw a full-length divider there.
   */
  private updateLines(): void {
    const container = this.containerRef.value;

    if (!container || !this.usesWrap) {
      if (this.lineOffsets.length > 0) {
        this.lineOffsets = [];
      }
      return;
    }

    const horizontal = this.layout === "horizontal";
    const rtl = this.direction === "rtl";
    const containerRect = container.getBoundingClientRect();
    const items = this.getWrapItems();

    const lineOffsets: number[] = [];
    let previousOffset: number | null = null;

    items.forEach((item) => {
      const offset = getWrapItemCrossOffset({ item, containerRect, horizontal, rtl });

      if (previousOffset !== null && Math.abs(offset - previousOffset) > 1) {
        lineOffsets.push(offset);
      }

      previousOffset = offset;
    });

    const changed =
      lineOffsets.length !== this.lineOffsets.length ||
      lineOffsets.some((value, index) => value !== this.lineOffsets[index]);

    if (changed) {
      this.lineOffsets = lineOffsets;
    }
  }

  private handleDefaultSlotChange(): void {
    this.updateGroups();
    this.updateNavigationItems();
    this.syncActiveDescendant();
    this.updateActions();

    this.syncSlotAndActions(() => this.syncDefaultSlot());

    if (this.usesWrap) {
      this.scheduleLineMeasure();
    }
  }

  private handleActionsEndSlotChange(): void {
    this.syncSlotAndActions(() => this.syncActionsEndSlot());
  }

  private handleActionsStartSlotChange(): void {
    this.syncSlotAndActions(() => this.syncActionsStartSlot());
  }

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = slotChangeGetAssignedElements(event).filter(isTooltip);

    this.expandTooltip = tooltips[0];
  }

  private updateActions(): void {
    const actions = new Set<Action["el"]>(this.actions);

    this.getTrackedActionMenus().forEach((menu) => {
      menu.actions.forEach((action) => actions.add(action));
    });

    actions.forEach((action) => {
      action.selectionAppearance = this.selectionAppearance;
    });
    this.updateActiveDescendantElements();
  }

  private updateNavigationItems(): void {
    this.ensureActionBarChildIds();

    const navigationItems: Array<Action["el"] | ActionMenu["el"]> = [];
    const internalStartGroup = this.actionsStartGroupRef.value;
    const internalEndGroup = this.actionsEndGroupRef.value;

    if (internalStartGroup) {
      navigationItems.push(...this.getActionGroupNavigationItems(internalStartGroup));
    }

    Array.from(this.el.children).forEach((child) => {
      if (child.slot === SLOTS.actionsStart || child.slot === SLOTS.actionsEnd) {
        return;
      }

      if (isAction(child)) {
        if (this.isNavigableAction(child)) {
          navigationItems.push(child);
        }
        return;
      }

      if (child.matches("calcite-action-menu")) {
        const actionMenu = child;

        if (this.isNavigableActionMenu(actionMenu)) {
          navigationItems.push(actionMenu);
        }
        return;
      }

      if (child.matches("calcite-action-group")) {
        const actionGroup = child;

        navigationItems.push(...this.getActionGroupNavigationItems(actionGroup));
      }
    });

    if (internalEndGroup) {
      navigationItems.push(...this.getActionGroupNavigationItems(internalEndGroup));
    }

    this.navigationItems = navigationItems;
  }

  private getActionGroupNavigationItems(
    actionGroup: ActionGroup["el"],
  ): Array<Action["el"] | ActionMenu["el"]> {
    if (actionGroup.hasAttribute("hidden")) {
      return [];
    }

    const actions = [
      ...Array.from(actionGroup.querySelectorAll("calcite-action")),
      ...Array.from(actionGroup.querySelectorAll("slot")).flatMap((slot) =>
        slot.assignedElements({ flatten: true }).filter((el): el is Action["el"] => isAction(el)),
      ),
    ].filter((action) => this.isNavigableAction(action));

    const actionMenu = actionGroup.shadowRoot?.querySelector("calcite-action-menu");

    return actionMenu && this.isNavigableActionMenu(actionMenu)
      ? [...actions, actionMenu]
      : actions;
  }

  private isNavigableAction(action: Action["el"]): boolean {
    return (
      !action.disabled &&
      !action.hasAttribute("hidden") &&
      action.slot !== "menu-actions" &&
      !action.closest("calcite-action-menu")
    );
  }

  private isNavigableActionMenu(actionMenu: ActionMenu["el"]): boolean {
    if (actionMenu.hasAttribute("hidden")) {
      return false;
    }

    this.syncActionMenuId(actionMenu);
    return !!actionMenu.id;
  }

  private calciteInternalActiveDescendantChangeHandler(event: CustomEvent<void>): void {
    const actionMenu = this.getEventActionMenu(event);

    if (!actionMenu?.open) {
      return;
    }

    event.stopPropagation();
    if (!actionMenu.activeDescendantElement) {
      void this.syncActiveDescendantToActionMenu(actionMenu);
      return;
    }

    this.setActiveDescendantElement(actionMenu.activeDescendantElement);
  }

  private syncActions(): void {
    this.actions = queryActions([
      ...this.actionsStart,
      ...this.defaultSlotItems,
      ...this.actionsEnd,
    ]);
  }

  private syncActionsAndOverflow(): void {
    this.syncActionsState();
    this.overflowActions();
  }

  private syncSlotAndActions(syncSlot: () => void): void {
    syncSlot();
    this.syncActionsAndOverflow();
  }

  private syncActionsState(syncExpandedState = false): void {
    this.syncActions();
    this.updateActions();

    if (!syncExpandedState) {
      return;
    }

    toggleActionBarChildActionText({
      actions: this.actions,
      expandables: [
        ...this.getTrackedActionGroups(),
        ...this.getTrackedActionMenus(),
        ...this.getSectionWrapperGroups(),
      ],
      expanded: this.expanded,
    });
  }

  private getTrackedActionGroups(): ActionGroup["el"][] {
    return [...this.actionGroups, ...this.actionsStartGroups, ...this.actionsEndGroups];
  }

  private getTrackedActionMenus(): ActionMenu["el"][] {
    return [...this.actionMenus, ...this.actionsStart, ...this.actionsEnd].filter(
      (item): item is ActionMenu["el"] => isActionMenu(item),
    );
  }

  private getAssignedActionBarItems(slot?: HTMLSlotElement | null): ActionBarItem[] {
    if (!slot) {
      return [];
    }

    return getSlotAssignedElements(slot).filter(
      (element): element is ActionBarItem =>
        isAction(element) || isActionGroup(element) || isActionMenu(element),
    );
  }

  private syncDefaultSlot(): void {
    this.defaultSlotItems = this.getAssignedActionBarItems(this.defaultSlotRef.value);
    this.actionGroups = this.defaultSlotItems.filter((item) => isActionGroup(item));
    this.actionMenus = this.defaultSlotItems.filter((item) => isActionMenu(item));
    this.updateGroups();
  }

  private syncActionsStartSlot(): void {
    this.actionsStart = this.getAssignedActionBarItems(this.actionsStartSlotRef.value);
    this.actionsStartGroups = this.actionsStart.filter((item): item is ActionGroup["el"] =>
      isActionGroup(item),
    );
    this.hasActionsStart = this.actionsStart.length > 0;
    this.updateGroups();
  }

  private syncActionsEndSlot(): void {
    this.actionsEnd = this.getAssignedActionBarItems(this.actionsEndSlotRef.value);
    this.actionsEndGroups = this.actionsEnd.filter((item): item is ActionGroup["el"] =>
      isActionGroup(item),
    );
    this.hasActionsEnd = this.actionsEnd.length > 0;
    this.updateGroups();
  }

  private handleActionGroupActionsChange(event: CustomEvent<void>): void {
    const group = event.target as ActionGroup["el"];

    const trackedGroups = this.getTrackedActionGroups();

    if (!trackedGroups.includes(group)) {
      return;
    }

    if (this.suppressedActionGroupActionsChange.has(group)) {
      return;
    }

    this.syncActionsAndOverflow();
  }

  private handleActionMenuActionsChange(event: CustomEvent<void>): void {
    const menu = event.target as ActionMenu["el"];

    if (!this.getTrackedActionMenus().includes(menu)) {
      return;
    }

    this.syncActionsAndOverflow();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const actionMenu = this.getEventActionMenu(event) || this.getOpenActionMenu();

    if (actionMenu?.open) {
      if (event.key === "Escape") {
        return;
      }
      return;
    }

    if (event.defaultPrevented) {
      return;
    }

    this.updateNavigationItems();

    const current = this.getNavigationItemFromEvent(event) ?? this.getCurrentNavigationItem();

    if (!current || !this.navigationItems.length) {
      return;
    }

    const isVertical = this.layout !== "horizontal";

    const currentGroup = this.getNavigationItemActionGroup(current);
    const secondaryNextKey = isVertical ? "ArrowRight" : "ArrowDown";
    const secondaryPreviousKey = isVertical ? "ArrowLeft" : "ArrowUp";
    const isClosedActionMenu = current.matches("calcite-action-menu") && !current.open;

    if (
      (currentGroup?.selectionMode === "multiple" || currentGroup?.selectionMode === "none") &&
      (event.key === secondaryNextKey || event.key === secondaryPreviousKey) &&
      !isClosedActionMenu
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.handleSecondaryArrowActionMenuOpen(event, current, isVertical)) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        if (isVertical) {
          this.focusNavigationItem("next", current);
          event.preventDefault();
          event.stopPropagation();
        } else if (this.focusActionGroupItem("next", current)) {
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case "ArrowUp":
        if (isVertical) {
          this.focusNavigationItem("previous", current);
          event.preventDefault();
          event.stopPropagation();
        } else if (this.focusActionGroupItem("previous", current)) {
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case "ArrowRight":
        if (!isVertical) {
          this.focusNavigationItem("next", current);
          event.preventDefault();
          event.stopPropagation();
        } else if (this.focusActionGroupItem("next", current)) {
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case "ArrowLeft":
        if (!isVertical) {
          this.focusNavigationItem("previous", current);
          event.preventDefault();
          event.stopPropagation();
        } else if (this.focusActionGroupItem("previous", current)) {
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case "Home":
        this.focusNavigationItem("first", current);
        event.preventDefault();
        event.stopPropagation();
        break;
      case "End":
        this.focusNavigationItem("last", current);
        event.preventDefault();
        event.stopPropagation();
        break;
      case "Tab":
        this.setNavigationItemTabIndexes(current);
        this.syncActiveDescendant(current);
        if (event.shiftKey && isClosedActionMenu) {
          current.tabIndex = -1;
          setTimeout(() => {
            if (this.currentFocusItem === current) {
              current.tabIndex = 0;
            }
          });
        }
        break;
    }
  }

  private handleSecondaryArrowActionMenuOpen(
    event: KeyboardEvent,
    current: Action["el"] | ActionMenu["el"],
    isVertical: boolean,
  ): boolean {
    if (!current.matches("calcite-action-menu") || current.open) {
      return false;
    }

    const menuFirstItemOpenKey = isVertical ? "ArrowRight" : "ArrowUp";
    const menuLastItemOpenKey = isVertical ? "ArrowLeft" : "ArrowDown";

    if (event.key !== menuFirstItemOpenKey && event.key !== menuLastItemOpenKey) {
      return false;
    }

    event.preventDefault();
    event.stopPropagation();
    this.openActionMenuAndFocusBoundaryItem(
      current,
      event.key === menuFirstItemOpenKey ? "first" : "last",
    );

    return true;
  }

  private openActionMenuAndFocusBoundaryItem(
    actionMenu: ActionMenu["el"],
    boundary: "first" | "last",
  ): void {
    actionMenu.open = true;
    void this.focusActionMenuBoundaryItem(actionMenu, boundary);
  }

  private async focusActionMenuBoundaryItem(
    actionMenu: ActionMenu["el"],
    boundary: "first" | "last",
  ): Promise<void> {
    await actionMenu.componentOnReady();

    if (!actionMenu.open) {
      return;
    }

    await actionMenu.setFocus();

    const triggerAction = actionMenu.actions.find(
      (action) => action.slot === ACTION_MENU_SLOTS.trigger,
    );

    (triggerAction ?? actionMenu).dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        composed: true,
        key: boundary === "first" ? "Home" : "End",
      }),
    );
  }

  private handleFocusIn(event: FocusEvent | MouseEvent): void {
    this.updateNavigationItems();

    const focusedItem = this.getNavigationItemFromEvent(event);

    if (event instanceof MouseEvent) {
      if (event.detail > 0 && focusedItem && isAction(focusedItem)) {
        void focusedItem.setFocus();
        this.setActiveDescendantElement(focusedItem);
      }
      return;
    }

    const actionMenu = this.getEventActionMenu(event) || this.getOpenActionMenu();

    if (actionMenu?.open) {
      void this.syncActiveDescendantToActionMenu(actionMenu);
      return;
    }

    if (focusedItem?.matches("calcite-action-menu") && actionMenu) {
      if (this.isForwardFocusIn(event)) {
        const defaultNavigationItem = this.getDefaultNavigationItem();

        if (defaultNavigationItem && defaultNavigationItem !== focusedItem) {
          this.setNavigationItemTabIndexes(defaultNavigationItem);
          this.focusItem(defaultNavigationItem);
          return;
        }
      }

      this.syncClosedActionMenu(actionMenu);
      return;
    }

    this.syncActiveDescendant(focusedItem ?? undefined);
  }
  private isForwardFocusIn(focusEvent: FocusEvent): boolean {
    const { relatedTarget } = focusEvent;

    if (!(relatedTarget instanceof Element)) {
      return false;
    }

    if (closestElementCrossShadowBoundary(relatedTarget, "calcite-action-bar") === this.el) {
      return false;
    }

    return !!(relatedTarget.compareDocumentPosition(this.el) & Node.DOCUMENT_POSITION_FOLLOWING);
  }

  private handleFocusOut(event: FocusEvent): void {
    const { relatedTarget } = event;

    if (
      relatedTarget instanceof Element &&
      closestElementCrossShadowBoundary(relatedTarget, "calcite-action-bar") === this.el
    ) {
      return;
    }

    this.setActiveDescendantElement();
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

  private focusActionGroupItem(
    direction: "next" | "previous",
    current: Action["el"] | ActionMenu["el"],
  ): boolean {
    const currentGroup = this.getNavigationItemActionGroup(current);

    if (!currentGroup) {
      return false;
    }

    if (currentGroup.selectionMode === "multiple" || currentGroup.selectionMode === "none") {
      return false;
    }

    const groupItems = this.navigationItems.filter(
      (item) => this.getNavigationItemActionGroup(item) === currentGroup,
    );
    const currentIndex = groupItems.findIndex((item) => item === current || item.id === current.id);

    if (groupItems.length < 2 || currentIndex === -1) {
      return false;
    }

    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % groupItems.length
        : (currentIndex - 1 + groupItems.length) % groupItems.length;

    const nextItem = groupItems[nextIndex];

    if (!nextItem || nextItem === current) {
      return false;
    }

    if (nextItem.matches("calcite-action-menu")) {
      this.setActiveDescendantId(this.getActionMenuId(nextItem));
    }

    this.focusItem(nextItem);
    this.syncActiveDescendant(nextItem);

    return true;
  }

  private getNavigationItemActionGroup(
    item: Action["el"] | ActionMenu["el"],
  ): ActionGroup["el"] | null {
    return closestElementCrossShadowBoundary(item, "calcite-action-group");
  }

  private focusItem(item: Action["el"] | ActionMenu["el"]): void {
    if (item.matches("calcite-action-menu")) {
      const triggerAction = [
        item.querySelector("calcite-action[slot='trigger']"),
        item.shadowRoot?.querySelector("calcite-action"),
      ].find((el): el is Action["el"] => !!el && isAction(el));

      if ("setFocus" in item && typeof item.setFocus === "function") {
        void item.setFocus().then(() => {
          if (!item.matches(":focus-within") && triggerAction) {
            void triggerAction.setFocus();
          }
        });
        return;
      }

      if (triggerAction) {
        void triggerAction.setFocus();
        return;
      }
    }

    if ("setFocus" in item && typeof item.setFocus === "function") {
      void item.setFocus();
      return;
    }

    item.focus();
  }

  private getCurrentNavigationItem(): Action["el"] | ActionMenu["el"] | undefined {
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

      if (activeItem) {
        const activeItemId = (activeItem as Action["el"] | ActionMenu["el"]).id;
        const activeNavigationItem = this.navigationItems.find((item) => item.id === activeItemId);
        if (activeNavigationItem) {
          return activeNavigationItem;
        }
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

    const currentFocusItem = this.getCurrentFocusItem();

    if (currentFocusItem) {
      return currentFocusItem;
    }

    return this.getDefaultNavigationItem();
  }

  private getCurrentFocusItem(): Action["el"] | ActionMenu["el"] | undefined {
    const { currentFocusItem } = this;

    return currentFocusItem
      ? this.navigationItems.find(
          (item) => item === currentFocusItem || item.id === currentFocusItem.id,
        )
      : undefined;
  }

  private getDefaultNavigationItem(): Action["el"] | ActionMenu["el"] | undefined {
    return (
      this.navigationItems.find(
        (item): item is Action["el"] => isAction(item) && item !== this.expandToggleEl,
      ) || this.navigationItems[0]
    );
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

  private getOpenActionMenu(): ActionMenu["el"] | undefined {
    return this.navigationItems.find(
      (item): item is ActionMenu["el"] => item.matches("calcite-action-menu") && item.open,
    );
  }

  private async syncActiveDescendantToActionMenu(actionMenu: ActionMenu["el"]): Promise<void> {
    let menuActions = this.getActionMenuActions(actionMenu);
    let activeMenuItem = this.getActiveActionMenuItem(menuActions);

    if (!activeMenuItem && actionMenu.open) {
      await actionMenu.componentOnReady();

      if (!actionMenu.open) {
        return;
      }

      menuActions = this.getActionMenuActions(actionMenu);
      activeMenuItem = this.getActiveActionMenuItem(menuActions);
    }

    if (!activeMenuItem) {
      return;
    }

    this.setActiveDescendantElement(activeMenuItem);
  }

  private getActiveActionMenuItem(menuActions: Action["el"][]): Action["el"] | undefined {
    return (
      menuActions.find((action) => action.activeDescendant) ||
      menuActions.find((action) => !action.disabled && !action.hidden)
    );
  }

  private setActiveDescendantElement(activeDescendantElement?: ActiveDescendantElement): void {
    this.setActiveDescendantId(activeDescendantElement?.id);
    this.updateActiveDescendantElements();
  }

  private updateActiveDescendantElements(): void {
    this.actions.forEach((action) => {
      action.activeDescendant = action.id === this.activeDescendantId;
    });
  }

  private syncClosedActionMenu(actionMenu: ActionMenu["el"]): void {
    this.updateNavigationItems();
    const navigationActionMenu = this.navigationItems.find(
      (item) => item === actionMenu || item.id === actionMenu.id,
    );

    if (navigationActionMenu) {
      this.setNavigationItemTabIndexes(navigationActionMenu);
    }

    this.setActiveDescendantElement();
  }

  private getActionMenuActions(actionMenu: ActionMenu["el"]): Action["el"][] {
    const directActions = Array.from(actionMenu.querySelectorAll("calcite-action"));
    const slottedActions = [
      ...Array.from(actionMenu.querySelectorAll("slot")),
      ...Array.from(actionMenu.shadowRoot?.querySelectorAll("slot") ?? []),
    ].flatMap((slot) =>
      slot.assignedElements({ flatten: true }).flatMap((el) => {
        if (isAction(el)) {
          return [el];
        }

        if (el instanceof HTMLSlotElement) {
          return el
            .assignedElements({ flatten: true })
            .filter((assignedEl): assignedEl is Action["el"] => isAction(assignedEl));
        }

        return [];
      }),
    );

    return [...directActions, ...slottedActions].filter(
      (action) => action.slot !== ACTION_MENU_SLOTS.trigger,
    );
  }

  private getNavigationItemFromEvent(event: Event): Action["el"] | ActionMenu["el"] | null {
    for (const pathEl of event.composedPath()) {
      if (
        !(pathEl instanceof HTMLElement) ||
        !pathEl.matches("calcite-action, calcite-action-menu")
      ) {
        continue;
      }

      const navigationItem = this.navigationItems.find(
        (item) => item === pathEl || item.id === pathEl.id,
      );

      if (navigationItem) {
        return navigationItem;
      }

      const actionMenu = pathEl.closest("calcite-action-menu");
      if (actionMenu) {
        const actionMenuId = this.getActionMenuId(actionMenu);
        const actionMenuNavigationItem = this.navigationItems.find(
          (item) => item === actionMenu || item.id === actionMenuId,
        );

        if (actionMenuNavigationItem) {
          return actionMenuNavigationItem;
        }
      }
    }

    return null;
  }

  private ensureActionBarChildIds(): void {
    const groups = Array.from(this.el.getElementsByTagName("calcite-action-group"));
    const actions = Array.from(this.el.getElementsByTagName("calcite-action"));

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
    this.updateNavigationItems();

    const activeItemInNavigation = activeItem
      ? this.navigationItems.find((item) => item === activeItem || item.id === activeItem.id)
      : undefined;

    const current =
      activeItemInNavigation ||
      this.navigationItems.find((item) => item.id === this.activeDescendantId) ||
      this.getCurrentNavigationItem();

    if (!current) {
      this.setActiveDescendantElement();
      return;
    }

    this.setNavigationItemTabIndexes(current);

    const activeDescendantId = this.el.matches(":focus-within")
      ? this.getNavigationItemId(current)
      : undefined;

    this.setActiveDescendantId(activeDescendantId);
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
    actionMenu.id = existingId || `${this.guid}-action-menu-${this.actionMenuIdIndex++}`;
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

    if (this.activeDescendantId) {
      this.el.setAttribute("aria-activedescendant", this.activeDescendantId);
      toolbarEl?.setAttribute("aria-activedescendant", this.activeDescendantId);
    } else {
      this.el.removeAttribute("aria-activedescendant");
      toolbarEl?.removeAttribute("aria-activedescendant");
    }
  }

  private setNavigationItemTabIndexes(active: Action["el"] | ActionMenu["el"]): void {
    this.currentFocusItem = active;

    this.navigationItems.forEach((item) => {
      const isActive = item === active || item.id === active.id;

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

      const triggerAction =
        item.querySelector("calcite-action[slot='trigger']") ||
        item.shadowRoot?.querySelector("calcite-action");

      if (triggerAction) {
        triggerAction.setAttribute("tabindex", "-1");
      }
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
    const { expandToggleDisabled, scale, layout, overlayPositioning, expandPosition } = this;

    const isStart = position === "start";
    const hasExpandToggle = !expandToggleDisabled && expandPosition === position;
    const hasActions = isStart ? this.hasActionsStart : this.hasActionsEnd;

    const slotName = isStart ? SLOTS.actionsStart : SLOTS.actionsEnd;
    const onSlotChange = isStart
      ? this.handleActionsStartSlotChange
      : this.handleActionsEndSlotChange;
    const label = isStart ? this.actionsStartGroupLabel : this.actionsEndGroupLabel;
    const hidden =
      !hasExpandToggle && !hasActions && !(isStart ? this.hasActionsStart : this.hasActionsEnd);
    // const hidden = !hasExpandToggle && !hasActions;
    const actionGroupRef = isStart ? this.actionsStartGroupRef : this.actionsEndGroupRef;
    const slotRef = isStart ? this.actionsStartSlotRef : this.actionsEndSlotRef;
    const expandToggle = hasExpandToggle ? this.renderExpandToggle() : null;

    return (
      <calcite-action-group
        class={{
          [CSS.actionGroupStart]: isStart,
          [CSS.actionGroupEnd]: !isStart,
        }}
        hidden={hidden}
        label={label}
        layout={layout}
        overlayPositioning={overlayPositioning}
        ref={actionGroupRef}
        scale={scale}
      >
        {isStart ? expandToggle : null}
        <slot name={slotName} onSlotChange={onSlotChange} ref={slotRef} />
        {hasExpandToggle ? this.renderExpandTooltipSlot() : null}
        {isStart ? null : expandToggle}
      </calcite-action-group>
    );
  }

  override render(): JsxNode {
    const ariaOrientation = this.layout === "horizontal" ? "horizontal" : "vertical";

    return (
      <div
        aria-activedescendant={this.activeDescendantId}
        ariaOrientation={ariaOrientation}
        class={{
          [CSS.container]: true,
          [CSS.hasActionGroups]: this.hasActionGroups,
        }}
        ref={this.containerRef}
        role="toolbar"
      >
        {this.renderActionsGroup("start")}
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotRef} />
        {this.renderActionsGroup("end")}
        {this.usesWrap ? (
          <div ariaHidden="true" class={CSS.lineOverlay}>
            {this.lineOffsets.map((offset) => (
              <div
                class={CSS.line}
                style={`--calcite-internal-action-bar-line-offset: ${offset}px`}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  //#endregion
}
