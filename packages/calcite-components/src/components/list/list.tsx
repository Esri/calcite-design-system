import Sortable from "sortablejs";
import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { SelectionMode, InteractionMode } from "../interfaces";
import { ItemData } from "../list-item/interfaces";
import { getListItemChildren, updateListItemChildren } from "../list-item/utils";
import {
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
} from "../../utils/sortableComponent";
import { SLOTS as STACK_SLOTS } from "../stack/resources";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { HandleNudge } from "../handle/interfaces";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { useT9n } from "../../controllers/useT9n";
import type { ListItem } from "../list-item/list-item";
import type { Handle } from "../handle/handle";
import type { Filter } from "../filter/filter";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import { styles } from "./list.scss";
import { ListDragDetail } from "./interfaces";
import T9nStrings from "./assets/t9n/list.t9n.en.json";
import { CSS, debounceTimeout, SelectionAppearance, SLOTS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-list": List;
  }
}

const listItemSelector = "calcite-list-item";
const parentSelector = "calcite-list-item-group, calcite-list-item" as const;

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 *
 * @slot - A slot for adding `calcite-list-item` elements.
 * @slot filter-actions-start - A slot for adding actionable `calcite-action` elements before the filter component.
 * @slot filter-actions-end - A slot for adding actionable `calcite-action` elements after the filter component.
 * @slot filter-no-results - When `filterEnabled` is `true`, a slot for adding content to display when no results are found.
 */
export class List
  extends LitElement
  implements InteractiveComponent, LoadableComponent, SortableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  dragSelector = listItemSelector;

  filterEl: Filter["el"];

  private focusableItems: ListItem["el"][] = [];

  handleSelector = "calcite-handle";

  private lastSelectedInfo: { selectedItem: ListItem["el"]; selected: boolean };

  private listItems: ListItem["el"][] = [];

  mutationObserver = createObserver("mutation", () =>
    this.updateListItems({ performFilter: true }),
  );

  private parentListEl: List["el"];

  sortable: Sortable;

  private updateListItems = debounce(
    (options?: { emitFilterChange?: boolean; performFilter?: boolean }): void => {
      const emitFilterChange = options?.emitFilterChange ?? false;
      const performFilter = options?.performFilter ?? false;

      const {
        selectionAppearance,
        selectionMode,
        interactionMode,
        dragEnabled,
        el,
        filterEl,
        filterEnabled,
      } = this;

      const items = Array.from(this.el.querySelectorAll(listItemSelector));

      items.forEach((item) => {
        item.selectionAppearance = selectionAppearance;
        item.selectionMode = selectionMode;
        item.interactionMode = interactionMode;
        if (item.closest("calcite-list") === el) {
          item.dragHandle = dragEnabled;
        }
      });

      if (this.parentListEl) {
        this.setUpSorting();
        return;
      }

      this.listItems = items;
      if (filterEnabled && performFilter) {
        this.dataForFilter = this.getItemData();

        if (filterEl) {
          filterEl.items = this.dataForFilter;
          this.filterAndUpdateData();
        }
      }
      this.visibleItems = this.listItems.filter((item) => !item.closed && !item.hidden);
      this.updateFilteredItems(emitFilterChange);
      this.borderItems();
      this.focusableItems = this.filteredItems.filter((item) => !item.disabled);
      this.setActiveListItem();
      this.updateSelectedItems();
      this.setUpSorting();
    },
    debounceTimeout,
  );

  private visibleItems: ListItem["el"][] = [];

  // #endregion

  // #region State Properties

  @state() assistiveText: string;

  @state() dataForFilter: ItemData = [];

  @state() hasFilterActionsEnd = false;

  @state() hasFilterActionsStart = false;

  @state() hasFilterNoResults = false;

  // #endregion

  // #region Public Properties

  /** When provided, the method will be called to determine whether the element can  move from the list. */
  @property() canPull: (detail: ListDragDetail) => boolean;

  /** When provided, the method will be called to determine whether the element can be added from another list. */
  @property() canPut: (detail: ListDragDetail) => boolean;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, `calcite-list-item`s are sortable via a draggable button. */
  @property({ reflect: true }) dragEnabled = false;

  /** When `true`, an input appears at the top of the component that can be used by end users to filter `calcite-list-item`s. */
  @property({ reflect: true }) filterEnabled = false;

  /** Placeholder text for the component's filter input field. */
  @property({ reflect: true }) filterPlaceholder: string;

  /** Specifies the properties to match against when filtering. If not set, all properties will be matched (label, description, metadata, value). */
  @property() filterProps: string[];

  /** Text for the component's filter input field. */
  @property({ reflect: true }) filterText: string;

  /**
   * The currently filtered `calcite-list-item` data.
   *
   * @readonly
   */
  @property() filteredData: ItemData = [];

  /**
   * The currently filtered `calcite-list-item`s.
   *
   * @readonly
   */
  @property() filteredItems: ListItem["el"][] = [];

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @property({ reflect: true }) group?: string;

  /**
   * Specifies the interaction mode of the component.
   *
   * `"interactive"` allows interaction styling and pointer changes on hover
   *
   * `"static"` does not allow interaction styling and pointer changes on hover
   *
   * The `"static"` value should only be used when `selectionMode` is `"none"`.
   */
  @property({ reflect: true }) interactionMode: InteractionMode = "interactive";

  /** Specifies an accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @notPublic
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @property() messages = useT9n<typeof T9nStrings>({ blocking: true });

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /**
   * One of the items within the list can be opened.
   *
   * @notPublic
   */
  @property() openable = false;

  /**
   * The currently selected items.
   *
   * @readonly
   */
  @property() selectedItems: ListItem["el"][] = [];

  /** Specifies the selection appearance - `"icon"` (displays a checkmark or dot) or `"border"` (displays a border). */
  @property({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  /**
   * Specifies the selection mode of the component, where:
   *
   * `"multiple"` allows any number of selections,
   *
   * `"single"` allows only one selection,
   *
   * `"single-persist"` allows one selection and prevents de-selection, and
   *
   * `"none"` does not allow any selections.
   */
  @property({ reflect: true }) selectionMode: Extract<
    "none" | "multiple" | "single" | "single-persist",
    SelectionMode
  > = "none";

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component's first focusable element.
   *
   * @returns {Promise<void>}
   */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    if (this.filterEnabled) {
      return this.filterEl?.setFocus();
    }

    return this.focusableItems.find((listItem) => listItem.active)?.setFocus();
  }

  // #endregion

  // #region Events

  /** Fires when the default slot has changes in order to notify parent lists. */
  calciteInternalListDefaultSlotChange = createEvent({ cancelable: false });

  /** Fires when the component's selected items have changed. */
  calciteListChange = createEvent({ cancelable: false });

  /** Fires when the component's dragging has ended. */
  calciteListDragEnd = createEvent<ListDragDetail>({ cancelable: false });

  /** Fires when the component's dragging has started. */
  calciteListDragStart = createEvent<ListDragDetail>({ cancelable: false });

  /** Fires when the component's filter has changed. */
  calciteListFilter = createEvent({ cancelable: false });

  /** Fires when the component's item order changes. */
  calciteListOrderChange = createEvent<ListDragDetail>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteInternalListItemToggle", this.handleCalciteListItemToggle);
    this.listen("calciteInternalFocusPreviousItem", this.handleCalciteInternalFocusPreviousItem);
    this.listen("calciteInternalListItemActive", this.handleCalciteInternalListItemActive);
    this.listen("calciteListItemSelect", this.handleCalciteListItemSelect);
    this.listen(
      "calciteInternalAssistiveTextChange",
      this.handleCalciteInternalAssistiveTextChange,
    );
    this.listen("calciteHandleNudge", this.handleCalciteHandleNudge);
    this.listen("calciteInternalListItemSelect", this.handleCalciteInternalListItemSelect);
    this.listen(
      "calciteInternalListItemSelectMultiple",
      this.handleCalciteInternalListItemSelectMultiple,
    );
    this.listen("calciteInternalListItemChange", this.handleCalciteInternalListItemChange);
    this.listen(
      "calciteInternalListItemGroupDefaultSlotChange",
      this.handleCalciteInternalListItemGroupDefaultSlotChange,
    );
  }

  override connectedCallback(): void {
    this.connectObserver();
    this.updateListItems({ performFilter: true });
    this.setUpSorting();
    this.setParentList();
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
    this.handleInteractionModeWarning();
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
    if (changes.has("filterText")) {
      this.handleFilterTextChange();
    }

    if (changes.has("filterProps")) {
      this.handleFilterPropsChange();
    }

    if (
      (changes.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== false)) ||
      changes.has("group") ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false)) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) ||
      (changes.has("selectionAppearance") &&
        (this.hasUpdated || this.selectionAppearance !== "icon"))
    ) {
      this.handleListItemChange();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.disconnectObserver();
    disconnectSortableComponent(this);
  }

  // #endregion

  // #region Private Methods

  private async handleFilterTextChange(): Promise<void> {
    this.performFilter();
  }

  private async handleFilterPropsChange(): Promise<void> {
    this.performFilter();
  }

  private handleListItemChange(): void {
    this.updateListItems({ performFilter: true });
  }

  private handleCalciteListItemToggle(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    this.borderItems();
  }

  private handleCalciteInternalFocusPreviousItem(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();

    const { focusableItems } = this;
    const currentIndex = focusableItems.findIndex((listItem) => listItem.active);

    const prevIndex = currentIndex - 1;

    if (focusableItems[prevIndex]) {
      this.focusRow(focusableItems[prevIndex]);
    }
  }

  private handleCalciteInternalListItemActive(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    const target = event.target as ListItem["el"];
    const { listItems } = this;

    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }

  private handleCalciteListItemSelect(): void {
    if (this.parentListEl) {
      return;
    }

    this.updateSelectedItems(true);
  }

  private handleCalciteInternalAssistiveTextChange(event: CustomEvent): void {
    this.assistiveText = event.detail.message;
    event.stopPropagation();
  }

  private handleCalciteHandleNudge(event: CustomEvent<HandleNudge>): void {
    if (this.parentListEl) {
      return;
    }

    this.handleNudgeEvent(event);
  }

  private handleCalciteInternalListItemSelect(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    const target = event.target as ListItem["el"];
    const { listItems, selectionMode } = this;

    if (target.selected && (selectionMode === "single" || selectionMode === "single-persist")) {
      listItems.forEach((listItem) => (listItem.selected = listItem === target));
    }

    this.updateSelectedItems();
  }

  private handleCalciteInternalListItemSelectMultiple(
    event: CustomEvent<{
      selectMultiple: boolean;
    }>,
  ): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    const { target, detail } = event;
    const { focusableItems, lastSelectedInfo } = this;
    const selectedItem = target as ListItem["el"];

    if (detail.selectMultiple && !!lastSelectedInfo) {
      const currentIndex = focusableItems.indexOf(selectedItem);
      const lastSelectedIndex = focusableItems.indexOf(lastSelectedInfo.selectedItem);
      const startIndex = Math.min(lastSelectedIndex, currentIndex);
      const endIndex = Math.max(lastSelectedIndex, currentIndex);

      focusableItems
        .slice(startIndex, endIndex + 1)
        .forEach((item) => (item.selected = lastSelectedInfo.selected));
    } else {
      this.lastSelectedInfo = { selectedItem, selected: selectedItem.selected };
    }
  }

  private handleCalciteInternalListItemChange(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    this.updateListItems();
  }

  private handleCalciteInternalListItemGroupDefaultSlotChange(event: CustomEvent): void {
    event.stopPropagation();
  }

  private connectObserver(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  private disconnectObserver(): void {
    this.mutationObserver?.disconnect();
  }

  private setUpSorting(): void {
    const { dragEnabled } = this;

    if (!dragEnabled) {
      return;
    }

    connectSortableComponent(this);
  }

  onGlobalDragStart(): void {
    this.disconnectObserver();
  }

  onGlobalDragEnd(): void {
    this.connectObserver();
  }

  onDragEnd(detail: ListDragDetail): void {
    this.calciteListDragEnd.emit(detail);
  }

  onDragStart(detail: ListDragDetail): void {
    this.calciteListDragStart.emit(detail);
  }

  onDragSort(detail: ListDragDetail): void {
    this.setParentList();
    this.updateListItems();

    this.calciteListOrderChange.emit(detail);
  }

  private setParentList(): void {
    this.parentListEl = this.el.parentElement?.closest("calcite-list");
  }

  private handleDefaultSlotChange(event: Event): void {
    updateListItemChildren(getListItemChildren(event.target as HTMLSlotElement));
    if (this.parentListEl) {
      this.calciteInternalListDefaultSlotChange.emit();
    }
  }

  private handleFilterActionsStartSlotChange(event: Event): void {
    this.hasFilterActionsStart = slotChangeHasAssignedElement(event);
  }

  private handleFilterActionsEndSlotChange(event: Event): void {
    this.hasFilterActionsEnd = slotChangeHasAssignedElement(event);
  }

  private handleFilterNoResultsSlotChange(event: Event): void {
    this.hasFilterNoResults = slotChangeHasAssignedElement(event);
  }

  private setActiveListItem(): void {
    const { focusableItems } = this;

    if (!focusableItems.some((item) => item.active)) {
      if (focusableItems[0]) {
        focusableItems[0].active = true;
      }
    }
  }

  private updateSelectedItems(emit = false): void {
    this.selectedItems = this.visibleItems.filter((item) => item.selected);
    if (emit) {
      this.calciteListChange.emit();
    }
  }

  private filterElements({
    el,
    filteredItems,
    visibleParents,
  }: {
    el: ListItem["el"] | ListItemGroup["el"];
    filteredItems: ListItem["el"][];
    visibleParents: WeakSet<ListItem["el"] | ListItemGroup["el"]>;
  }): void {
    const filterHidden = !visibleParents.has(el) && !filteredItems.includes(el as ListItem["el"]);

    el.filterHidden = filterHidden;

    const closestParent = el.parentElement.closest<ListItem["el"] | ListItemGroup["el"]>(
      parentSelector,
    );

    if (!closestParent) {
      return;
    }

    if (!filterHidden) {
      visibleParents.add(closestParent);
    }

    this.filterElements({
      el: closestParent,
      filteredItems,
      visibleParents,
    });
  }

  private allParentListItemsOpen(item: ListItem["el"]): boolean {
    const parentItem = item.parentElement?.closest(listItemSelector);

    if (!parentItem) {
      return true;
    } else if (!parentItem.open) {
      return false;
    }

    return this.allParentListItemsOpen(parentItem);
  }

  private borderItems(): void {
    const visibleItems = this.visibleItems.filter(
      (item) => !item.filterHidden && this.allParentListItemsOpen(item),
    );

    visibleItems.forEach(
      (item) => (item.bordered = item !== visibleItems[visibleItems.length - 1]),
    );
  }

  private updateFilteredItems(emit = false): void {
    const { visibleItems, filteredData, filterText } = this;

    const values = filteredData.map((item) => item.value);

    const lastDescendantItems = visibleItems?.filter((listItem) =>
      visibleItems.every((li) => li === listItem || !listItem.contains(li)),
    );

    const filteredItems =
      visibleItems.filter((item) => !filterText || values.includes(item.value)) || [];

    const visibleParents = new WeakSet<HTMLElement>();

    lastDescendantItems.forEach((listItem) =>
      this.filterElements({ el: listItem, filteredItems, visibleParents }),
    );

    this.filteredItems = filteredItems;

    if (emit) {
      this.calciteListFilter.emit();
    }
  }

  private updateFilteredData(emit = false): void {
    const { filterEl } = this;

    if (!filterEl) {
      return;
    }

    if (filterEl.filteredItems) {
      this.filteredData = filterEl.filteredItems as ItemData;
    }

    this.updateListItems({ emitFilterChange: emit });
  }

  private async filterAndUpdateData(): Promise<void> {
    await this.filterEl?.filter(this.filterText);
    this.updateFilteredData();
  }

  private performFilter(): void {
    const { filterEl, filterText, filterProps } = this;

    if (!filterEl) {
      return;
    }

    filterEl.value = filterText;
    filterEl.filterProps = filterProps;
    this.filterAndUpdateData();
  }

  private setFilterEl(el: Filter["el"]): void {
    this.filterEl = el;
    this.performFilter();
  }

  private handleFilterChange(event: CustomEvent): void {
    event.stopPropagation();
    const { value } = event.currentTarget as Filter["el"];
    this.filterText = value;
    this.updateFilteredData(true);
  }

  private getItemData(): ItemData {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      value: item.value,
    }));
  }

  private focusRow(focusEl: ListItem["el"]): void {
    const { focusableItems } = this;

    if (!focusEl) {
      return;
    }

    focusableItems.forEach((listItem) => (listItem.active = listItem === focusEl));

    focusEl.setFocus();
  }

  private isNavigable(listItem: ListItem["el"]): boolean {
    const parentListItemEl = listItem.parentElement?.closest(listItemSelector);

    if (!parentListItemEl) {
      return true;
    }

    return parentListItemEl.open && this.isNavigable(parentListItemEl);
  }

  private handleListKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || !!this.parentListEl) {
      return;
    }

    const { key } = event;
    const navigableItems = this.focusableItems.filter((listItem) => this.isNavigable(listItem));
    const currentIndex = navigableItems.findIndex((listItem) => listItem.active);

    if (key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = event.target === this.filterEl ? 0 : currentIndex + 1;

      if (navigableItems[nextIndex]) {
        this.focusRow(navigableItems[nextIndex]);
      }
    } else if (key === "ArrowUp") {
      event.preventDefault();

      if (currentIndex === 0 && this.filterEnabled) {
        this.filterEl?.setFocus();
        return;
      }

      const prevIndex = currentIndex - 1;

      if (navigableItems[prevIndex]) {
        this.focusRow(navigableItems[prevIndex]);
      }
    } else if (key === "Home") {
      event.preventDefault();
      const homeItem = navigableItems[0];

      if (homeItem) {
        this.focusRow(homeItem);
      }
    } else if (key === "End") {
      event.preventDefault();
      const endItem = navigableItems[navigableItems.length - 1];

      if (endItem) {
        this.focusRow(endItem);
      }
    }
  }

  private handleInteractionModeWarning(): void {
    if (
      this.interactionMode === "static" &&
      this.selectionMode !== "none" &&
      this.selectionAppearance === "border"
    ) {
      console.warn(`selection-appearance="border" requires interaction-mode="interactive"`);
    }
  }

  private handleNudgeEvent(event: CustomEvent<HandleNudge>): void {
    const { handleSelector, dragSelector } = this;
    const { direction } = event.detail;

    const composedPath = event.composedPath();

    const handle = composedPath.find(
      (el: HTMLElement): el is Handle["el"] => el?.tagName && el.matches(handleSelector),
    );

    const dragEl = composedPath.find(
      (el: HTMLElement): el is ListItem["el"] => el?.tagName && el.matches(dragSelector),
    );

    const parentEl = dragEl?.parentElement as List["el"];

    if (!parentEl) {
      return;
    }

    const { filteredItems } = this;

    const sameParentItems = filteredItems.filter((item) => item.parentElement === parentEl);

    const lastIndex = sameParentItems.length - 1;
    const oldIndex = sameParentItems.indexOf(dragEl);
    let newIndex: number;

    if (direction === "up") {
      newIndex = oldIndex === 0 ? lastIndex : oldIndex - 1;
    } else {
      newIndex = oldIndex === lastIndex ? 0 : oldIndex + 1;
    }

    this.disconnectObserver();
    handle.blurUnselectDisabled = true;

    const referenceEl =
      (direction === "up" && newIndex !== lastIndex) || (direction === "down" && newIndex === 0)
        ? sameParentItems[newIndex]
        : sameParentItems[newIndex].nextSibling;

    parentEl.insertBefore(dragEl, referenceEl);

    this.updateListItems();
    this.connectObserver();

    this.calciteListOrderChange.emit({
      dragEl,
      fromEl: parentEl,
      toEl: parentEl,
      newIndex,
      oldIndex,
    });

    handle.setFocus().then(() => (handle.blurUnselectDisabled = false));
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const {
      loading,
      label,
      disabled,
      dataForFilter,
      filterEnabled,
      filterPlaceholder,
      filterText,
      filteredItems,
      hasFilterActionsStart,
      hasFilterActionsEnd,
      hasFilterNoResults,
      filterProps,
    } = this;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div class={CSS.container}>
          {this.dragEnabled ? (
            <span ariaLive="assertive" class={CSS.assistiveText}>
              {this.assistiveText}
            </span>
          ) : null}
          {this.renderItemAriaLive()}
          {loading ? <calcite-scrim class={CSS.scrim} loading={loading} /> : null}
          <div
            ariaBusy={loading}
            ariaLabel={label || ""}
            class={CSS.table}
            onKeyDown={this.handleListKeydown}
            role="treegrid"
          >
            {filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (
              <div class={CSS.sticky} role="rowgroup">
                <div role="row">
                  <div role="columnheader">
                    <calcite-stack class={CSS.stack}>
                      <slot
                        name={SLOTS.filterActionsStart}
                        onSlotChange={this.handleFilterActionsStartSlotChange}
                        slot={STACK_SLOTS.actionsStart}
                      />
                      <calcite-filter
                        ariaLabel={filterPlaceholder}
                        disabled={disabled}
                        filterProps={filterProps}
                        items={dataForFilter}
                        oncalciteFilterChange={this.handleFilterChange}
                        placeholder={filterPlaceholder}
                        ref={this.setFilterEl}
                        value={filterText}
                      />
                      <slot
                        name={SLOTS.filterActionsEnd}
                        onSlotChange={this.handleFilterActionsEndSlotChange}
                        slot={STACK_SLOTS.actionsEnd}
                      />
                    </calcite-stack>
                  </div>
                </div>
              </div>
            ) : null}
            <div class={CSS.tableContainer} role="rowgroup">
              <slot onSlotChange={this.handleDefaultSlotChange} />
            </div>
          </div>
          <div
            ariaLive="polite"
            data-test-id="no-results-container"
            hidden={!(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length)}
          >
            <slot
              name={SLOTS.filterNoResults}
              onSlotChange={this.handleFilterNoResultsSlotChange}
            />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  private renderItemAriaLive(): JsxNode {
    const {
      messages,
      filteredItems,
      parentListEl,
      messages: { _lang: effectiveLocale },
      numberingSystem,
      filterEnabled,
      filterText,
      filteredData,
    } = this;

    numberStringFormatter.numberFormatOptions = {
      locale: effectiveLocale,
      numberingSystem,
    };

    return !parentListEl ? (
      <div ariaLive="polite" class={CSS.assistiveText}>
        {filterEnabled && filterText && filteredData?.length ? (
          <div key="aria-filter-enabled">{messages.filterEnabled}</div>
        ) : null}
        <div key="aria-item-count">
          {messages.total.replace(
            "{count}",
            numberStringFormatter.localize(filteredItems.length.toString()),
          )}
        </div>
        {filteredItems.length ? (
          <ol key="aria-item-list">
            {filteredItems.map((item) => (
              <li>{item.label}</li>
            ))}
          </ol>
        ) : null}
      </div>
    ) : null;
  }

  // #endregion
}
