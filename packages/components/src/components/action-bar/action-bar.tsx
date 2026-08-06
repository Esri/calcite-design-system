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
  focusElementInGroup,
  getSlotAssignedElements,
  getStylePixelValue,
  slotChangeGetAssignedElements,
} from "../../utils/dom";
import { createObserver } from "../../utils/observers";
import { ExpandToggle, toggleActionBarChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale, SelectionAppearance } from "../interfaces";
import type { OverlayPositioning } from "../../controllers/useFloatingUi";
import { DEBOUNCE } from "../../utils/resources";
import { useT9n } from "../../controllers/useT9n";
import { useCancelable } from "../../controllers/useCancelable";
import { logger } from "../../utils/logger";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Action } from "../action/action";
import { isAction } from "../action/resources";
import { isActionGroup, SLOTS as ACTION_GROUP_SLOTS } from "../action-group/resources";
import { isActionMenu } from "../action-menu/resources";
import { getOverflowCount } from "../../utils/overflow";
import { type ActionMenu } from "../action-menu/action-menu";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
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

    this.updateGroups();

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
        const actionGroupGap = getStylePixelValue(actionGroupStyle.gap);
        const defaultActionsCount = actionGroup.actions.filter(
          (action) => action.slot !== ACTION_GROUP_SLOTS.menuActions,
        ).length;
        const hasMenuActions = actionGroup.actions.some(
          (action) => action.slot === ACTION_GROUP_SLOTS.menuActions,
        );
        const actionGroupItemCount = defaultActionsCount + (hasMenuActions ? 1 : 0);
        const actionGroupGapQuantity = Math.max(actionGroupItemCount - 1, 0);
        bufferSize += actionGroupGap * actionGroupGapQuantity;

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

    const overflowCount = getOverflowCount({
      bufferSize,
      containerSize: layout === "horizontal" ? width : height,
      itemSizes,
    });

    this.runOverflowActions({
      actionGroups: slottedActionGroups,
      expanded,
      overflowCount,
    });
  }, DEBOUNCE.resize);

  private resizeHandler = (entry: ResizeObserverEntry): void => {
    if (this.usesWrap) {
      this.scheduleLineMeasure();
      return;
    }

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

  private setExpandToggleEl = (el: Action["el"] | undefined): void => {
    this.expandToggleEl = el;
  };

  //#endregion

  //#region State Properties

  @state() expandTooltip?: Tooltip["el"];

  @state() hasActionsEnd = false;

  @state() hasActionsStart = false;

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
    this.listen<CustomEvent<void>>(
      "calciteInternalActionGroupActionsChange",
      this.handleActionGroupActionsChange,
    );
    this.listen<CustomEvent<void>>(
      "calciteInternalActionMenuActionsChange",
      this.handleActionMenuActionsChange,
    );
    this.listen("keydown", this.handleKeyDown);
  }

  override connectedCallback(): void {
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

    const actions = [...this.actions];

    if (expandToggleEl) {
      actions.push(expandToggleEl);
    }

    const clientSize = layout === "horizontal" ? "clientWidth" : "clientHeight";
    const fallbackSize = Math.max(...actions.map((action) => action[clientSize] || 0));
    return actions.map((action) => action[clientSize] || fallbackSize);
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

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    const composedPath = event.composedPath();
    const source = composedPath.find(
      (element): element is ActionGroup["el"] | ActionMenu["el"] =>
        isActionGroup(element as Element) || isActionMenu(element as Element),
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

  private resizeHandlerEntries(entries: ResizeObserverEntry[]): void {
    entries.forEach(this.resizeHandler);
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
    const tooltips = slotChangeGetAssignedElements(event).filter((el): el is Tooltip["el"] =>
      el?.matches("calcite-tooltip"),
    );

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

  private getNavigableActions(): Action["el"][] {
    return this.actions.filter(
      (action) => !action.disabled && action.slot !== ACTION_GROUP_SLOTS.menuActions,
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const actions = this.getNavigableActions();
    const current = document.activeElement;

    if (!isAction(current) || !actions.includes(current)) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        focusElementInGroup(actions, current, "next", true);
        event.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        focusElementInGroup(actions, current, "previous", true);
        event.preventDefault();
        break;
      case "Home":
        focusElementInGroup(actions, current, "first", true);
        event.preventDefault();
        break;
      case "End":
        focusElementInGroup(actions, current, "last", true);
        event.preventDefault();
        break;
      case "Tab":
        this.setActionTabIndexes(current);
        break;
    }
  }

  private setActionTabIndexes(active: Action["el"]): void {
    this.actions.forEach((action) => {
      const tabIndex = !action.disabled && action === active ? 0 : -1;

      if (tabIndex === 0) {
        // action's internal button is tabbable by default, so we remove the attribute to avoid an extra tabbable element
        action.removeAttribute("tabindex");
      } else {
        action.tabIndex = tabIndex;
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
    const hidden = !hasExpandToggle && !hasActions;
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
