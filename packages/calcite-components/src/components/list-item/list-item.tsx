import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { getElementDir, getFirstTabbable, slotChangeHasAssignedElement } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { SelectionMode, InteractionMode } from "../interfaces";
import { SelectionAppearance } from "../list/resources";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { SortableComponentItem } from "../../utils/sortableComponent";
import { MoveTo } from "../sort-handle/interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { SortHandle } from "../sort-handle/sort-handle";
import type { List } from "../list/list";
import T9nStrings from "./assets/t9n/list-item.t9n.en.json";
import { getDepth, hasListItemChildren } from "./utils";
import { CSS, activeCellTestAttribute, ICONS, SLOTS } from "./resources";
import { styles } from "./list-item.scss";

declare global {
  interface DeclareElements {
    "calcite-list-item": ListItem;
  }
}

const focusMap = new Map<List["el"], number>();
const listSelector = "calcite-list";

/**
 * @slot - A slot for adding `calcite-list`, `calcite-list-item` and `calcite-list-item-group` elements.
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the component.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the component.
 * @slot content - A slot for adding non-actionable, centered content in place of the `label` and `description` of the component.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the component.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component.
 * @slot content-bottom - A slot for adding content below the component's `label` and `description`.
 */
export class ListItem
  extends LitElement
  implements InteractiveComponent, LoadableComponent, SortableComponentItem
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private actionsEndEl = createRef<HTMLDivElement>();

  private actionsStartEl = createRef<HTMLDivElement>();

  private containerEl = createRef<HTMLDivElement>();

  private contentEl = createRef<HTMLDivElement>();

  private defaultSlotEl = createRef<HTMLSlotElement>();

  private handleGridEl = createRef<HTMLDivElement>();

  private sortHandleEl: SortHandle["el"];

  // #endregion

  // #region State Properties

  @state() hasActionsEnd = false;

  @state() hasActionsStart = false;

  @state() hasContentBottom = false;

  @state() hasContentEnd = false;

  @state() hasContentStart = false;

  @state() hasCustomContent = false;

  @state() level: number = null;

  @state() openable = false;

  @state() parentListEl: List["el"];

  // #endregion

  // #region Public Properties

  /**
   * Sets the item as focusable. Only one item should be focusable within a list.
   *
   * @private
   */
  @property() active = false;

  /**
   * Sets the item to display a border.
   *
   * @private
   */
  @property() bordered = false;

  /** When `true`, a close button is added to the component. */
  @property({ reflect: true }) closable = false;

  /** When `true`, hides the component. */
  @property({ reflect: true }) closed = false;

  /** A description for the component. Displays below the label text. */
  @property() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, the item is not draggable. */
  @property({ reflect: true }) dragDisabled = false;

  /**
   * When `true`, the component displays a draggable button.
   *
   * @private
   */
  @property() dragHandle = false;

  /**
   * Hides the component when filtered.
   *
   * @private
   */
  @property({ reflect: true }) filterHidden = false;

  /**
   * Specifies the interaction mode of the component - `"interactive"` (allows interaction styling and pointer changes on hover), `"static"` (does not allow interaction styling and pointer changes on hover), The `"static"` value should only be used when `selectionMode` is `"none"`.
   *
   * @private
   */
  @property() interactionMode: InteractionMode = null;

  /** The label text of the component. Displays above the description text. */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /** Provides additional metadata to the component. Primary use is for a filter on the parent `calcite-list`. */
  @property() metadata: Record<string, unknown>;

  /**
   * Sets the item to display a border.
   *
   * @private
   */
  @property() moveToItems: MoveTo[] = [];

  /** When `true`, the item is open to show child components. */
  @property({ reflect: true }) open = false;

  /** When `true` and the parent `calcite-list`'s `selectionMode` is `"single"`, `"single-persist"', or `"multiple"`, the component is selected. */
  @property({ reflect: true }) selected = false;

  /**
   * Specifies the selection appearance - `"icon"` (displays a checkmark or dot) or `"border"` (displays a border).
   *
   * @private
   */
  @property() selectionAppearance: SelectionAppearance = null;

  /**
   * Specifies the selection mode - `"multiple"` (allow any number of selected items), `"single"` (allow one selected item), `"single-persist"` (allow one selected item and prevent de-selection), or `"none"` (no selected items).
   *
   * @private
   */
  @property() selectionMode: Extract<
    "none" | "multiple" | "single" | "single-persist",
    SelectionMode
  > = null;

  /**
   * Used to determine what menu options are available in the sort-handle
   *
   * @private
   */
  @property() setPosition: number = null;

  /**
   * Used to determine what menu options are available in the sort-handle
   *
   * @private
   */
  @property() setSize: number = null;

  /** When `true`, displays and positions the sort handle. */
  @property() sortHandleOpen = false;

  /** When `true`, the component's content appears inactive. */
  @property({ reflect: true }) unavailable = false;

  /** The component's value. */
  @property() value: any;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    const {
      containerEl: { value: containerEl },
      parentListEl,
    } = this;
    const focusIndex = focusMap.get(parentListEl);

    if (typeof focusIndex === "number") {
      const cells = this.getGridCells();
      if (cells[focusIndex]) {
        this.focusCell(cells[focusIndex]);
      } else {
        containerEl?.focus();
      }
      return;
    }

    containerEl?.focus();
  }

  // #endregion

  // #region Events

  /**
   *
   * @private
   */
  calciteInternalFocusPreviousItem = createEvent({ cancelable: false });

  /**
   *
   * @private
   */
  calciteInternalListItemActive = createEvent({ cancelable: false });

  /**
   *
   * @private
   */
  calciteInternalListItemChange = createEvent({ cancelable: false });

  /**
   *
   * @private
   */
  calciteInternalListItemSelect = createEvent({ cancelable: false });

  /**
   *
   * @private
   */
  calciteInternalListItemSelectMultiple = createEvent<{
    selectMultiple: boolean;
  }>({ cancelable: false });

  /**
   *
   * @private
   */
  calciteInternalListItemToggle = createEvent({ cancelable: false });

  /** Fires when the close button is clicked. */
  calciteListItemClose = createEvent({ cancelable: false });

  /** Fires when the component is selected. */
  calciteListItemSelect = createEvent({ cancelable: false });

  /** Fires when the sort handle is requested to be closed and before the closing transition begins. */
  calciteListItemSortHandleBeforeClose = createEvent({ cancelable: false });

  /** Fires when the sort handle is added to the DOM but not rendered, and before the opening transition begins. */
  calciteListItemSortHandleBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the sort handle is closed and animation is complete. */
  calciteListItemSortHandleClose = createEvent({ cancelable: false });

  /** Fires when the sort handle is open and animation is complete. */
  calciteListItemSortHandleOpen = createEvent({ cancelable: false });

  /** Fires when the open button is clicked. */
  calciteListItemToggle = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen(
      "calciteInternalListItemGroupDefaultSlotChange",
      this.handleCalciteInternalListDefaultSlotChanges,
    );
    this.listen(
      "calciteInternalListDefaultSlotChange",
      this.handleCalciteInternalListDefaultSlotChanges,
    );
  }

  override connectedCallback(): void {
    const { el } = this;
    this.parentListEl = el.closest(listSelector);
    this.level = getDepth(el) + 1;
    this.setSelectionDefaults();
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("active") && (this.hasUpdated || this.active !== false)) {
      this.activeHandler(this.active);
    }

    if (changes.has("closed") && (this.hasUpdated || this.closed !== false)) {
      this.handleClosedChange();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange();
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.handleOpenChange();
    }

    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.handleSelectedChange();
    }

    if (changes.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== false)) {
      this.sortHandleOpenHandler();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  // #endregion

  // #region Private Methods

  private activeHandler(active: boolean): void {
    if (!active) {
      this.focusCell(null, false);
    }
  }

  private handleClosedChange(): void {
    this.emitCalciteInternalListItemChange();
  }

  private handleDisabledChange(): void {
    this.emitCalciteInternalListItemChange();
  }

  private handleOpenChange(): void {
    this.emitCalciteInternalListItemToggle();
  }

  private handleSelectedChange(): void {
    this.calciteInternalListItemSelect.emit();
  }

  private sortHandleOpenHandler(): void {
    if (!this.sortHandleEl) {
      return;
    }

    // we set the property instead of the attribute to ensure open/close events are emitted properly
    this.sortHandleEl.open = this.sortHandleOpen;
  }

  private handleCalciteInternalListDefaultSlotChanges(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.handleOpenableChange(this.defaultSlotEl.value);
  }

  private setSortHandleEl(el: SortHandle["el"]): void {
    this.sortHandleEl = el;
    this.sortHandleOpenHandler();
  }

  private handleSortHandleBeforeOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteListItemSortHandleBeforeOpen.emit();
  }

  private handleSortHandleBeforeClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteListItemSortHandleBeforeClose.emit();
  }

  private handleSortHandleClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.sortHandleOpen = false;
    this.calciteListItemSortHandleClose.emit();
  }

  private handleSortHandleOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.sortHandleOpen = true;
    this.calciteListItemSortHandleOpen.emit();
  }

  private emitInternalListItemActive(): void {
    this.calciteInternalListItemActive.emit();
  }

  private focusCellHandle(): void {
    this.handleCellFocusIn(this.handleGridEl.value);
  }

  private focusCellActionsStart(): void {
    this.handleCellFocusIn(this.actionsStartEl.value);
  }

  private focusCellContent(): void {
    this.handleCellFocusIn(this.contentEl.value);
  }

  private focusCellActionsEnd(): void {
    this.handleCellFocusIn(this.actionsEndEl.value);
  }

  private emitCalciteInternalListItemToggle(): void {
    this.calciteInternalListItemToggle.emit();
  }

  private emitCalciteInternalListItemChange(): void {
    this.calciteInternalListItemChange.emit();
  }

  private handleCloseClick(): void {
    this.closed = true;
    this.calciteListItemClose.emit();
  }

  private handleContentSlotChange(event: Event): void {
    this.hasCustomContent = slotChangeHasAssignedElement(event);
  }

  private handleActionsStartSlotChange(event: Event): void {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }

  private handleContentStartSlotChange(event: Event): void {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  }

  private handleContentEndSlotChange(event: Event): void {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  }

  private handleContentBottomSlotChange(event: Event): void {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  }

  private setSelectionDefaults(): void {
    const { parentListEl, selectionMode, selectionAppearance } = this;

    if (!parentListEl) {
      return;
    }

    if (!selectionMode) {
      this.selectionMode = parentListEl.selectionMode;
    }

    if (!selectionAppearance) {
      this.selectionAppearance = parentListEl.selectionAppearance;
    }
  }

  private handleOpenableChange(slotEl: HTMLSlotElement): void {
    if (!slotEl) {
      return;
    }

    this.openable = hasListItemChildren(slotEl);
  }

  private handleDefaultSlotChange(event: Event): void {
    this.handleOpenableChange(event.target as HTMLSlotElement);
  }

  private handleToggleClick(): void {
    this.toggle();
  }

  private toggle(value = !this.open): void {
    this.open = value;
    this.calciteListItemToggle.emit();
  }

  private handleItemClick(event: PointerEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    this.toggleSelected(event.shiftKey);
  }

  private toggleSelected(shiftKey: boolean): void {
    const { selectionMode, selected } = this;

    if (this.disabled) {
      return;
    }

    if (selectionMode === "multiple" || selectionMode === "single") {
      this.selected = !selected;
    } else if (selectionMode === "single-persist") {
      this.selected = true;
    }

    this.calciteInternalListItemSelectMultiple.emit({
      selectMultiple: shiftKey && selectionMode === "multiple",
    });
    this.calciteListItemSelect.emit();
  }

  private getGridCells(): HTMLDivElement[] {
    return [
      this.handleGridEl.value,
      this.actionsStartEl.value,
      this.contentEl.value,
      this.actionsEndEl.value,
    ].filter((el) => el && !el.hidden);
  }

  private handleItemKeyDown(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    const { key } = event;
    const composedPath = event.composedPath();
    const {
      containerEl: { value: containerEl },
      actionsStartEl: { value: actionsStartEl },
      actionsEndEl: { value: actionsEndEl },
      open,
      openable,
    } = this;

    const cells = this.getGridCells();
    const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));

    if (
      key === "Enter" &&
      !composedPath.includes(actionsStartEl) &&
      !composedPath.includes(actionsEndEl)
    ) {
      event.preventDefault();
      this.toggleSelected(event.shiftKey);
    } else if (key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (currentIndex === -1) {
        if (!open && openable) {
          this.toggle(true);
          this.focusCell(null);
        } else if (cells[0]) {
          this.focusCell(cells[0]);
        }
      } else if (cells[currentIndex] && cells[nextIndex]) {
        this.focusCell(cells[nextIndex]);
      }
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;
      if (currentIndex === -1) {
        this.focusCell(null);
        if (open && openable) {
          this.toggle(false);
        } else {
          this.calciteInternalFocusPreviousItem.emit();
        }
      } else if (currentIndex === 0) {
        this.focusCell(null);
        containerEl.focus();
      } else if (cells[currentIndex] && cells[prevIndex]) {
        this.focusCell(cells[prevIndex]);
      }
    }
  }

  private focusCellNull(): void {
    this.focusCell(null);
  }

  private handleCellFocusIn(focusEl: HTMLDivElement): void {
    this.setFocusCell(focusEl, getFirstTabbable(focusEl), true);
  }

  private setFocusCell(
    focusEl: HTMLDivElement | null,
    focusedEl: HTMLElement,
    saveFocusIndex: boolean,
  ): void {
    const { parentListEl } = this;

    if (saveFocusIndex) {
      focusMap.set(parentListEl, null);
    }

    const gridCells = this.getGridCells();

    gridCells.forEach((tableCell) => {
      tableCell.tabIndex = -1;
      tableCell.removeAttribute(activeCellTestAttribute);
    });

    if (!focusEl) {
      return;
    }

    focusEl.tabIndex = focusEl === focusedEl ? 0 : -1;
    focusEl.setAttribute(activeCellTestAttribute, "");

    if (saveFocusIndex) {
      focusMap.set(parentListEl, gridCells.indexOf(focusEl));
    }
  }

  private focusCell(focusEl: HTMLDivElement | null, saveFocusIndex = true): void {
    const focusedEl = getFirstTabbable(focusEl);
    this.setFocusCell(focusEl, focusedEl, saveFocusIndex);
    focusedEl?.focus();
  }

  // #endregion

  // #region Rendering

  private renderSelected(): JsxNode {
    const { selected, selectionMode, selectionAppearance } = this;

    if (selectionMode === "none" || selectionAppearance === "border") {
      return null;
    }

    return (
      <div
        class={{
          [CSS.selectionContainer]: true,
          [CSS.selectionContainerSingle]:
            selectionMode === "single" || selectionMode === "single-persist",
        }}
        key="selection-container"
        onClick={this.handleItemClick}
      >
        <calcite-icon
          icon={
            selected
              ? selectionMode === "multiple"
                ? ICONS.selectedMultiple
                : ICONS.selectedSingle
              : selectionMode === "multiple"
                ? ICONS.unselectedMultiple
                : ICONS.unselectedSingle
          }
          scale="s"
        />
      </div>
    );
  }

  private renderDragHandle(): JsxNode {
    const { label, dragHandle, dragDisabled, setPosition, setSize, moveToItems } = this;

    return dragHandle ? (
      <div
        ariaLabel={label}
        class={{ [CSS.dragContainer]: true, [CSS.gridCell]: true }}
        key="drag-handle-container"
        onFocusIn={this.focusCellHandle}
        ref={this.handleGridEl}
        role="gridcell"
      >
        <calcite-sort-handle
          disabled={dragDisabled}
          label={label}
          moveToItems={moveToItems}
          oncalciteSortHandleBeforeClose={this.handleSortHandleBeforeClose}
          oncalciteSortHandleBeforeOpen={this.handleSortHandleBeforeOpen}
          oncalciteSortHandleClose={this.handleSortHandleClose}
          oncalciteSortHandleOpen={this.handleSortHandleOpen}
          overlayPositioning="fixed"
          ref={this.setSortHandleEl}
          setPosition={setPosition}
          setSize={setSize}
        />
      </div>
    ) : null;
  }

  private renderOpen(): JsxNode {
    const { el, open, openable, messages } = this;
    const dir = getElementDir(el);
    const icon = open ? ICONS.open : dir === "rtl" ? ICONS.closedRTL : ICONS.closedLTR;
    const tooltip = open ? messages.collapse : messages.expand;

    return openable ? (
      <div
        class={CSS.openContainer}
        key="open-container"
        onClick={this.handleToggleClick}
        title={tooltip}
      >
        <calcite-icon icon={icon} key={icon} scale="s" />
      </div>
    ) : null;
  }

  private renderActionsStart(): JsxNode {
    const { label, hasActionsStart } = this;
    return (
      <div
        ariaLabel={label}
        class={{ [CSS.actionsStart]: true, [CSS.gridCell]: true }}
        hidden={!hasActionsStart}
        key="actions-start-container"
        onFocusIn={this.focusCellActionsStart}
        ref={this.actionsStartEl}
        role="gridcell"
      >
        <slot name={SLOTS.actionsStart} onSlotChange={this.handleActionsStartSlotChange} />
      </div>
    );
  }

  private renderActionsEnd(): JsxNode {
    const { label, hasActionsEnd, closable, messages } = this;
    return (
      <div
        ariaLabel={label}
        class={{ [CSS.actionsEnd]: true, [CSS.gridCell]: true }}
        hidden={!(hasActionsEnd || closable)}
        key="actions-end-container"
        onFocusIn={this.focusCellActionsEnd}
        ref={this.actionsEndEl}
        role="gridcell"
      >
        <slot name={SLOTS.actionsEnd} onSlotChange={this.handleActionsEndSlotChange} />
        {closable ? (
          <calcite-action
            appearance="transparent"
            class={CSS.close}
            icon={ICONS.close}
            key="close-action"
            label={messages.close}
            onClick={this.handleCloseClick}
            text={messages.close}
          />
        ) : null}
      </div>
    );
  }

  private renderContentStart(): JsxNode {
    const { hasContentStart } = this;
    return (
      <div class={CSS.contentStart} hidden={!hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotChange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  private renderCustomContent(): JsxNode {
    const { hasCustomContent } = this;
    return (
      <div class={CSS.customContent} hidden={!hasCustomContent}>
        <slot name={SLOTS.content} onSlotChange={this.handleContentSlotChange} />
      </div>
    );
  }

  private renderContentEnd(): JsxNode {
    const { hasContentEnd } = this;
    return (
      <div class={CSS.contentEnd} hidden={!hasContentEnd}>
        <slot name={SLOTS.contentEnd} onSlotChange={this.handleContentEndSlotChange} />
      </div>
    );
  }

  private renderContentBottom(): JsxNode {
    const { hasContentBottom } = this;
    return (
      <div class={CSS.contentBottom} hidden={!hasContentBottom}>
        <slot name={SLOTS.contentBottom} onSlotChange={this.handleContentBottomSlotChange} />
      </div>
    );
  }

  private renderDefaultContainer(): JsxNode {
    return (
      <div
        class={{
          [CSS.nestedContainer]: true,
          [CSS.nestedContainerOpen]: this.openable && this.open,
        }}
      >
        <slot onSlotChange={this.handleDefaultSlotChange} ref={this.defaultSlotEl} />
      </div>
    );
  }

  private renderContentProperties(): JsxNode {
    const { label, description, hasCustomContent } = this;

    return !hasCustomContent && (!!label || !!description) ? (
      <div class={CSS.content} key="content">
        {label ? (
          <div class={CSS.label} key="label">
            {label}
          </div>
        ) : null}
        {description ? (
          <div class={CSS.description} key="description">
            {description}
          </div>
        ) : null}
      </div>
    ) : null;
  }

  private renderContentContainer(): JsxNode {
    const { description, label, selectionMode, hasCustomContent, unavailable } = this;
    const hasCenterContent = hasCustomContent || !!label || !!description;
    const content = [
      this.renderContentStart(),
      this.renderCustomContent(),
      this.renderContentProperties(),
      this.renderContentEnd(),
    ];

    return (
      <div
        ariaLabel={label}
        class={{
          [CSS.gridCell]: true,
          [CSS.contentContainer]: true,
          [CSS.contentContainerUnavailable]: unavailable,
          [CSS.contentContainerSelectable]: selectionMode !== "none",
          [CSS.contentContainerHasCenterContent]: hasCenterContent,
        }}
        key="content-container"
        onClick={this.handleItemClick}
        onFocusIn={this.focusCellContent}
        ref={this.contentEl}
        role="gridcell"
      >
        {content}
      </div>
    );
  }

  override render(): JsxNode {
    const {
      openable,
      open,
      level,
      active,
      label,
      selected,
      selectionAppearance,
      selectionMode,
      interactionMode,
      closed,
      filterHidden,
      bordered,
      disabled,
    } = this;

    const showBorder = selectionMode !== "none" && selectionAppearance === "border";
    const borderSelected = showBorder && selected;
    const borderUnselected = showBorder && !selected;

    const containerInteractive =
      interactionMode === "interactive" ||
      (interactionMode === "static" &&
        selectionMode !== "none" &&
        selectionAppearance === "border");

    return (
      <InteractiveContainer disabled={disabled}>
        <div class={{ [CSS.wrapper]: true, [CSS.wrapperBordered]: bordered }}>
          <div
            ariaExpanded={openable ? open : null}
            ariaLabel={label}
            ariaLevel={level}
            ariaSelected={selected}
            class={{
              [CSS.row]: true,
              [CSS.container]: true,
              [CSS.containerHover]: containerInteractive,
              [CSS.containerBorder]: showBorder,
              [CSS.containerBorderSelected]: borderSelected,
              [CSS.containerBorderUnselected]: borderUnselected,
            }}
            hidden={closed || filterHidden}
            onFocus={this.focusCellNull}
            onFocusIn={this.emitInternalListItemActive}
            onKeyDown={this.handleItemKeyDown}
            ref={this.containerEl}
            role="row"
            tabIndex={active ? 0 : -1}
          >
            {this.renderDragHandle()}
            {this.renderSelected()}
            {this.renderOpen()}
            {this.renderActionsStart()}
            {this.renderContentContainer()}
            {this.renderActionsEnd()}
          </div>
          {this.renderContentBottom()}
        </div>
        {this.renderDefaultContainer()}
      </InteractiveContainer>
    );
  }

  // #endregion
}
