// @ts-strict-ignore
import Sortable from "sortablejs";
import { debounce } from "lodash-es";
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { getRootNode, slotChangeHasAssignedElement } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { SelectionMode, InteractionMode, Scale } from "../interfaces";
import { ItemData } from "../list-item/interfaces";
import {
  isListItem,
  listItemGroupSelector,
  listItemSelector,
  listSelector,
  expandedAncestors,
  updateListItemChildren,
} from "../list-item/utils";
import {
  connectSortableComponent,
  disconnectSortableComponent,
  relatedDragElExpandTimeoutMS,
  SortableComponent,
} from "../../utils/sortableComponent";
import { SLOTS as STACK_SLOTS } from "../stack/resources";
import { componentFocusable } from "../../utils/component";
import { NumberingSystem, numberStringFormatter } from "../../utils/locale";
import { MoveEventDetail, MoveTo, ReorderEventDetail } from "../sort-handle/interfaces";
import { guid } from "../../utils/guid";
import { useT9n } from "../../controllers/useT9n";
import type { ListItem } from "../list-item/list-item";
import type { Filter } from "../filter/filter";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import { DEBOUNCE } from "../../utils/resources";
import { CSS, SelectionAppearance, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { ListElement } from "./interfaces";
import { ListDragDetail, ListDisplayMode, ListMoveDetail } from "./interfaces";
import { styles } from "./list.scss";

declare global {
  interface DeclareElements {
    "calcite-list": List;
  }
}

const parentSelector = `${listItemGroupSelector}, ${listItemSelector}`;

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 *
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 * @slot filter-actions-start - A slot for adding actionable `calcite-action` elements before the filter component.
 * @slot filter-actions-end - A slot for adding actionable `calcite-action` elements after the filter component.
 * @slot filter-no-results - When `filterEnabled` is `true`, a slot for adding content to display when no results are found.
 */
export class List extends LitElement implements InteractiveComponent, SortableComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  dragSelector = listItemSelector;

  filterEl: Filter["el"];

  defaultSlotEl: HTMLSlotElement;

  private focusableItems: ListItem["el"][] = [];

  private relatedDragEl: ListItem["el"];

  private relatedDragElTimer: number;

  handleSelector = "calcite-sort-handle";

  private lastSelectedInfo: { selectedItem: ListItem["el"]; selected: boolean };

  private listItems: ListItem["el"][] = [];

  private listItemGroups: ListItemGroup["el"][] = [];

  mutationObserver = createObserver("mutation", () => {
    this.willPerformFilter = true;
    this.updateListItems();
  });

  private parentListEl: List["el"];

  sortable: Sortable;

  private updateListItems = debounce((): void => {
    this.updateGroupItems();

    const {
      selectionAppearance,
      selectionMode,
      interactionMode,
      dragEnabled,
      el,
      filterEl,
      moveToItems,
      displayMode,
      scale,
      defaultSlotEl,
    } = this;

    const items = Array.from(this.el.querySelectorAll(listItemSelector));

    items.forEach((item) => {
      item.scale = scale;
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
      item.interactionMode = interactionMode;
      if (item.closest(listSelector) === el) {
        item.moveToItems = moveToItems.filter(
          (moveToItem) => moveToItem.element !== el && !item.contains(moveToItem.element),
        );
        item.dragHandle = dragEnabled;
        item.displayMode = displayMode;
      }
    });

    if (this.parentListEl) {
      this.setUpSorting();
      return;
    }

    this.listItems = items;
    if (this.filterEnabled && this.willPerformFilter) {
      this.willPerformFilter = false;
      this.dataForFilter = this.getItemData();

      if (filterEl) {
        filterEl.items = this.dataForFilter;
        this.filterAndUpdateData();
      }
    }
    this.visibleItems = this.listItems.filter((item) => !item.closed && !item.hidden);
    this.updateFilteredItems();
    this.borderItems();
    this.focusableItems = this.filteredItems.filter((item) => !item.disabled);
    this.setActiveListItem();
    this.updateSelectedItems();
    this.setUpSorting();
    if (defaultSlotEl) {
      updateListItemChildren(defaultSlotEl);
    }
  }, DEBOUNCE.nextTick);

  private visibleItems: ListItem["el"][] = [];

  /** TODO: [MIGRATION] this flag was used to work around an issue with debounce using the last args passed when invoking the debounced fn, causing events to not emit */
  private willFilterEmit: boolean = false;

  /** TODO: [MIGRATION] this flag was used to work around an issue with debounce using the last args passed when invoking the debounced fn, causing events to not emit */
  private willPerformFilter: boolean = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>({ blocking: true });

  private expandRelatedDragEl = (): void => {
    if (this.relatedDragEl) {
      this.relatedDragEl.expanded = true;
    }
  };

  //#endregion

  //#region State Properties

  @state() assistiveText: string;

  @state() dataForFilter: ItemData[] = [];

  @state() hasFilterActionsEnd = false;

  @state() hasFilterActionsStart = false;

  @state() hasFilterNoResults = false;

  @state() moveToItems: MoveTo[] = [];

  @state() get hasActiveFilter(): boolean {
    return (
      this.filterEnabled &&
      this.filterText &&
      this.filteredItems.length !== this.visibleItems.length
    );
  }

  @state() get showNoResultsContainer(): boolean {
    return (
      this.filterEnabled &&
      this.filterText &&
      this.hasFilterNoResults &&
      this.visibleItems.length &&
      !this.filteredItems.length
    );
  }

  //#endregion

  //#region Public Properties

  /** When provided, the method will be called to determine whether the element can move from the list. */
  @property() canPull: (detail: ListDragDetail) => boolean;

  /** When provided, the method will be called to determine whether the element can be added from another list. */
  @property() canPut: (detail: ListDragDetail) => boolean;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, `calcite-list-item`s are sortable via a draggable button. */
  @property({ reflect: true }) dragEnabled = false;

  /** When `true`, an input appears at the top of the component that can be used by end users to filter `calcite-list-item`s. */
  @property({ reflect: true }) filterEnabled = false;

  /**
   * Specifies a function to handle filtering.
   *
   * @example
   * myList.filterPredicate = (myListItem) => {
   *   // returns true to show the list item if some condition is met
   *   return myListItem.label.includes("someValue");
   * };
   */
  @property() filterPredicate?: (item: ListItem["el"]) => boolean;

  /** Specifies an accessible name for the filter input field. */
  @property({ reflect: true }) filterLabel: string;

  /** Placeholder text for the component's filter input field. */
  @property({ reflect: true }) filterPlaceholder: string;

  /** Specifies the properties to match against when filtering. If not set, all properties will be matched (label, description, metadata, value, group heading). */
  @property() filterProps: string[];

  /** Text for the component's filter input field. */
  @property({ reflect: true }) filterText: string;

  /**
   * The currently filtered `calcite-list-item` data.
   *
   * @readonly
   */
  @property() filteredData: ItemData[] = [];

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

  /**
   * Specifies an accessible name for the component.
   *
   * When `dragEnabled` is `true` and multiple list sorting is enabled with `group`, specifies the component's name for dragging between lists.
   *
   * @required
   */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the nesting behavior of `calcite-list-item`s, where
   *
   * `"flat"` displays `calcite-list-item`s in a uniform list, and
   *
   * `"nested"` displays `calcite-list-item`s under their parent element.
   *
   *  The parent component's behavior should follow throughout its child elements.
   *
   */
  @property({ reflect: true }) displayMode: ListDisplayMode = "flat";

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property() numberingSystem: NumberingSystem;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

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

  //#endregion

  //#region Public Methods

  /**
   * Emits a `calciteListMoveHalt` event.
   *
   * @private
   * @param dragDetail
   */
  @method()
  putFailed(dragDetail: ListDragDetail): void {
    this.calciteListMoveHalt.emit(dragDetail);
  }

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

  //#endregion

  //#region Events

  /**
   * Fires when the default slot has changes in order to notify parent lists.
   *
   * @private
   */
  calciteInternalListDefaultSlotChange = createEvent({ cancelable: false });

  /** Fires when the component's selected items have changed. */
  calciteListChange = createEvent({ cancelable: false });

  /** Fires when the component's dragging has ended. */
  calciteListDragEnd = createEvent<ListDragDetail>({ cancelable: false });

  /** Fires when the component's dragging has started. */
  calciteListDragStart = createEvent<ListDragDetail>({ cancelable: false });

  /** Fires when the component's filter has changed. */
  calciteListFilter = createEvent({ cancelable: false });

  /** Fires when a user attempts to move an element using the sort menu and 'canPut' or 'canPull' returns falsy. */
  calciteListMoveHalt = createEvent<ListDragDetail>({ cancelable: false });

  /** Fires when the component's item order changes. */
  calciteListOrderChange = createEvent<ListDragDetail>({ cancelable: false });

  //#endregion

  //#region Lifecycle

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
    this.listen("calciteSortHandleReorder", this.handleSortReorder);
    this.listen("calciteSortHandleMove", this.handleSortMove);
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
    this.willPerformFilter = true;
    this.updateListItems();
    this.setUpSorting();
    this.setParentList();
    this.setListItemGroups();
  }

  async load(): Promise<void> {
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
    if (changes.has("filterText") || changes.has("filterProps") || changes.has("filterPredicate")) {
      this.performFilter();
    }

    if (
      (changes.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== false)) ||
      changes.has("group") ||
      (changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false)) ||
      (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none")) ||
      (changes.has("selectionAppearance") &&
        (this.hasUpdated || this.selectionAppearance !== "icon")) ||
      (changes.has("displayMode") && this.hasUpdated) ||
      (changes.has("scale") && this.hasUpdated) ||
      (changes.has("filterPredicate") && this.hasUpdated)
    ) {
      this.handleListItemChange();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  override disconnectedCallback(): void {
    this.disconnectObserver();
    disconnectSortableComponent(this);
    clearTimeout(this.relatedDragElTimer);
  }

  //#endregion

  //#region Private Methods

  private handleListItemChange(): void {
    this.willPerformFilter = true;
    this.updateListItems();
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

  private handleSortReorder(event: CustomEvent<ReorderEventDetail>): void {
    if (this.parentListEl || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    this.handleReorder(event);
  }

  private handleSortMove(event: CustomEvent<MoveEventDetail>): void {
    if (this.parentListEl || event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    this.handleMove(event);
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
    clearTimeout(this.relatedDragElTimer);
    this.setDropSelected(false);
  }

  onDragMove({ relatedEl }: ListMoveDetail): void {
    if (relatedEl !== this.relatedDragEl) {
      clearTimeout(this.relatedDragElTimer);
      this.setDropSelected(false);
    }

    this.relatedDragEl = relatedEl;
    this.setDropSelected(true);

    if (relatedEl) {
      this.relatedDragElTimer = window.setTimeout(
        this.expandRelatedDragEl,
        relatedDragElExpandTimeoutMS,
      );
    }
  }

  onDragStart(detail: ListDragDetail): void {
    detail.dragEl.sortHandleOpen = false;
    clearTimeout(this.relatedDragElTimer);
    this.calciteListDragStart.emit(detail);
  }

  onDragSort(detail: ListDragDetail): void {
    this.setParentList();
    this.updateListItems();

    this.calciteListOrderChange.emit(detail);
  }

  private setDropSelected(value: boolean): void {
    if (this.relatedDragEl) {
      this.relatedDragEl.dropSelected = value;
    }
  }

  private setParentList(): void {
    this.parentListEl = this.el.parentElement?.closest(listSelector);
  }

  private handleDefaultSlotChange(): void {
    if (this.parentListEl) {
      this.calciteInternalListDefaultSlotChange.emit();
    }
  }

  private setListItemGroups(): void {
    this.listItemGroups = Array.from(this.el.querySelectorAll(listItemGroupSelector));
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

  private async updateSelectedItems(emit = false): Promise<void> {
    await this.updateComplete;

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
    el: ListElement;
    filteredItems: ListItem["el"][];
    visibleParents: WeakSet<ListElement>;
  }): void {
    const filterHidden = !visibleParents.has(el) && !filteredItems.includes(el as ListItem["el"]);

    el.filterHidden = filterHidden;

    const closestParent = el.parentElement.closest<ListElement>(parentSelector);

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

  private allParentListItemsExpanded(item: ListItem["el"]): boolean {
    const parentItem = item.parentElement?.closest(listItemSelector);

    if (!parentItem) {
      return true;
    } else if (!parentItem.expanded) {
      return false;
    }

    return this.allParentListItemsExpanded(parentItem);
  }

  private borderItems(): void {
    const visibleItems = this.visibleItems.filter(
      (item) => !item.filterHidden && this.allParentListItemsExpanded(item),
    );

    visibleItems.forEach(
      (item) => (item.bordered = item !== visibleItems[visibleItems.length - 1]),
    );
  }

  private updateFilteredItems(): void {
    const { visibleItems, filteredData, filterText, filterPredicate } = this;

    const lastDescendantItems = visibleItems?.filter((listItem) =>
      visibleItems.every((li) => li === listItem || !listItem.contains(li)),
    );

    const filteredItems = filterPredicate
      ? visibleItems.filter(filterPredicate)
      : !filterText
        ? visibleItems || []
        : filteredData.map((item) => item.el);

    const visibleParents = new WeakSet<HTMLElement>();

    lastDescendantItems.forEach((listItem) =>
      this.filterElements({ el: listItem, filteredItems, visibleParents }),
    );

    this.filteredItems = filteredItems;

    if (this.willFilterEmit) {
      this.willFilterEmit = false;
      this.calciteListFilter.emit();
    }
  }

  private updateFilteredData(): void {
    const { filterEl } = this;

    if (!filterEl) {
      return;
    }

    if (filterEl.filteredItems) {
      this.filteredData = filterEl.filteredItems as ItemData[];
    }

    this.updateListItems();
  }

  private async filterAndUpdateData(): Promise<void> {
    await this.filterEl?.filter(this.filterText);
    this.updateFilteredData();
  }

  private get effectiveFilterProps(): string[] {
    if (!this.filterProps) {
      return ["description", "label", "metadata", "heading"];
    }

    return this.filterProps.filter((prop) => prop !== "el");
  }

  private performFilter(): void {
    const { filterEl, filterText, effectiveFilterProps } = this;

    if (!filterEl) {
      return;
    }

    filterEl.value = filterText;
    filterEl.filterProps = effectiveFilterProps;
    this.filterAndUpdateData();
  }

  private setDefaultSlotEl(el: HTMLSlotElement): void {
    this.defaultSlotEl = el;
  }

  private setFilterEl(el: Filter["el"]): void {
    this.filterEl = el;
    this.performFilter();
  }

  private handleFilterChange(event: CustomEvent): void {
    event.stopPropagation();
    const { value } = event.currentTarget as Filter["el"];
    this.filterText = value;
    this.willFilterEmit = true;
    this.updateFilteredData();
  }

  private getItemData(): ItemData[] {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      heading: this.getGroupHeading(item),
      el: item,
    }));
  }

  private getGroupHeading(item: ListItem["el"]): string[] {
    const heading = this.listItemGroups
      .filter((group) => group.contains(item))
      .map((group) => group.heading);

    return heading;
  }

  private updateGroupItems(): void {
    const { el, group, scale } = this;

    const rootNode = getRootNode(el);

    const lists = group
      ? Array.from(
          rootNode.querySelectorAll<List["el"]>(`${listSelector}[group="${group}"]`),
        ).filter((list) => !list.disabled && list.dragEnabled)
      : [];

    this.moveToItems = lists.map((element) => ({
      element,
      label: element.label ?? element.id,
      id: guid(),
    }));

    const groupItems = Array.from(this.el.querySelectorAll(listItemGroupSelector));

    groupItems.forEach((item) => {
      item.scale = scale;
    });
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

    return parentListItemEl.expanded && this.isNavigable(parentListItemEl);
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

  private handleMove(event: CustomEvent<MoveEventDetail>): void {
    const { moveTo } = event.detail;

    const dragEl = event.target as ListItem["el"];
    const fromEl = dragEl?.parentElement as List["el"];
    const toEl = moveTo.element as List["el"];
    const fromElItems = Array.from(fromEl.children).filter(isListItem);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;

    if (!fromEl) {
      return;
    }

    if (
      fromEl.canPull?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) === false
    ) {
      this.calciteListMoveHalt.emit({ toEl, fromEl, dragEl, oldIndex, newIndex });
      return;
    }

    if (
      toEl.canPut?.({
        toEl,
        fromEl,
        dragEl,
        newIndex,
        oldIndex,
      }) === false
    ) {
      toEl.putFailed({ toEl, fromEl, dragEl, oldIndex, newIndex });
      return;
    }

    dragEl.sortHandleOpen = false;

    this.disconnectObserver();

    toEl.prepend(dragEl);
    expandedAncestors(dragEl);
    this.updateListItems();
    this.connectObserver();

    this.calciteListOrderChange.emit({
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex,
    });
  }

  private handleReorder(event: CustomEvent<ReorderEventDetail>): void {
    const { reorder } = event.detail;

    const dragEl = event.target as ListItem["el"];
    const parentEl = dragEl?.parentElement as List["el"];

    if (!parentEl) {
      return;
    }

    dragEl.sortHandleOpen = false;

    const sameParentItems = Array.from(parentEl.children).filter(isListItem);

    const lastIndex = sameParentItems.length - 1;
    const oldIndex = sameParentItems.indexOf(dragEl);
    let newIndex: number = oldIndex;

    switch (reorder) {
      case "top":
        newIndex = 0;
        break;
      case "bottom":
        newIndex = lastIndex;
        break;
      case "up":
        newIndex = oldIndex === 0 ? 0 : oldIndex - 1;
        break;
      case "down":
        newIndex = oldIndex === lastIndex ? lastIndex : oldIndex + 1;
        break;
    }

    this.disconnectObserver();

    const referenceEl =
      reorder === "up" || reorder === "top"
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
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const {
      loading,
      label,
      disabled,
      dataForFilter,
      filterEnabled,
      filterPlaceholder,
      filterText,
      filterLabel,
      hasFilterActionsStart,
      hasFilterActionsEnd,
      effectiveFilterProps,
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
                        filterProps={effectiveFilterProps}
                        items={dataForFilter}
                        label={filterLabel}
                        oncalciteFilterChange={this.handleFilterChange}
                        placeholder={filterPlaceholder}
                        ref={this.setFilterEl}
                        scale={this.scale}
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
              <slot onSlotChange={this.handleDefaultSlotChange} ref={this.setDefaultSlotEl} />
            </div>
          </div>
          <div
            ariaLive="polite"
            data-test-id="no-results-container"
            hidden={!this.showNoResultsContainer}
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
    } = this;

    numberStringFormatter.numberFormatOptions = {
      locale: effectiveLocale,
      numberingSystem,
    };

    return !parentListEl ? (
      <div ariaLive="polite" class={CSS.assistiveText}>
        {this.hasActiveFilter ? (
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

  //#endregion
}
