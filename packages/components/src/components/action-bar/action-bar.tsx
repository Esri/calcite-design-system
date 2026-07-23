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
import { logger } from "../../utils/logger";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { Action } from "../action/action";
import { isAction } from "../action/resources";
import { getOverflowCount } from "../../utils/overflow";
import { type ActionMenu } from "../action-menu/action-menu";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
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

  private containerRef = createRef<HTMLDivElement>();

  private direction = useDirection();

  private expandToggleEl?: Action["el"];

  private actionGroups: ActionGroup["el"][] = [];

  private defaultSlotItems: HTMLElement[] = [];

  private actionsStartRef = createRef<ActionGroup["el"]>();

  private actionsEndRef = createRef<ActionGroup["el"]>();

  private lineMeasureFrame?: number;

  private mutationObserver = createObserver("mutation", () => this.mutationObserverHandler());

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

    const { actionGroups } = this;

    const actionsEndCount =
      this.hasActionsEnd || (!expandToggleDisabled && expandPosition === "end") ? 1 : 0;

    const actionsStartCount =
      this.hasActionsStart || (!expandToggleDisabled && expandPosition === "start") ? 1 : 0;

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
   * When `true`, expands the component and its contents.
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
   * When `expandToggleDisabled` is `false`, specifies the expand toggle's chevron direction, where:
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
    this.listen("keydown", this.handleKeyDown);
  }

  override connectedCallback(): void {
    this.updateGroups();
    this.updateActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
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

  private overflowModeHandler(): void {
    if (this.overflowMode === "none") {
      this.resizeObserver?.disconnect();
    } else {
      this.resizeObserver?.observe(this.el);
    }

    this.overflowActions();
  }

  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    if ((event.target as ActionGroup["el"]).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  }

  private mutationObserverHandler(): void {
    this.updateGroups();
    this.overflowActions();
    this.queryAndStoreActions();
    this.updateActions();
  }

  private resizeHandlerEntries(entries: ResizeObserverEntry[]): void {
    entries.forEach(this.resizeHandler);
  }

  private updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    this.hasActionGroups = groups.some((group) => !group.slot);
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

    const start = this.actionsStartRef.value;
    if (start && !start.hidden) {
      items.push(start);
    }

    this.defaultSlotItems.forEach((el) => {
      if (!el.hidden) {
        items.push(el);
      }
    });

    const end = this.actionsEndRef.value;
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

    const crossOffset = (item: HTMLElement): number => {
      const rect = item.getBoundingClientRect();
      if (horizontal) {
        return rect.top - containerRect.top;
      }
      return rtl ? containerRect.right - rect.right : rect.left - containerRect.left;
    };

    const lineOffsets: number[] = [];
    let previousOffset: number | null = null;

    items.forEach((item) => {
      const offset = crossOffset(item);

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

  private handleDefaultSlotChange(event: Event): void {
    this.defaultSlotItems = slotChangeGetAssignedElements<HTMLElement>(
      event,
      "calcite-action, calcite-action-group",
    );
    this.updateGroups();
    this.queryAndStoreActions();
    this.updateActions();

    if (this.usesWrap) {
      this.scheduleLineMeasure();
    }
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
    });
  }

  private queryAndStoreActions(): void {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.queryAndStoreActions();
    const actions = this.actions.filter((action) => !action.disabled);
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

    const slotName = isStart ? SLOTS.actionsStart : SLOTS.actionsEnd;
    const onSlotChange = isStart
      ? this.handleActionsStartSlotChange
      : this.handleActionsEndSlotChange;
    const label = isStart ? this.actionsStartGroupLabel : this.actionsEndGroupLabel;
    const hidden = !hasExpandToggle && !(isStart ? this.hasActionsStart : this.hasActionsEnd);

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
        ref={isStart ? this.actionsStartRef : this.actionsEndRef}
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
        ariaOrientation={this.layout === "horizontal" ? "horizontal" : "vertical"}
        class={{
          [CSS.container]: true,
          [CSS.hasActionGroups]: this.hasActionGroups,
        }}
        ref={this.containerRef}
        role="toolbar"
      >
        {this.renderActionsGroup("start")}
        <slot onSlotChange={this.handleDefaultSlotChange} />
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
