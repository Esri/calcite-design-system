import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import Sortable from "sortablejs";
import { debounce } from "lodash-es";
import { slotChangeHasAssignedElement, toAriaBoolean } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { SelectionMode } from "../interfaces";
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
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  connectLocalized,
  disconnectLocalized,
  LocalizedComponent,
  NumberingSystem,
  numberStringFormatter,
} from "../../utils/locale";
import { CSS, debounceTimeout, SelectionAppearance, SLOTS } from "./resources";
import { ListMessages } from "./assets/list/t9n";
import { ListDragDetail } from "./interfaces";

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
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class List
  implements
    InteractiveComponent,
    LoadableComponent,
    LocalizedComponent,
    SortableComponent,
    T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When provided, the method will be called to determine whether the element can  move from the list.
   */
  @Prop() canPull: (detail: ListDragDetail) => boolean;

  /**
   * When provided, the method will be called to determine whether the element can be added from another list.
   */
  @Prop() canPut: (detail: ListDragDetail) => boolean;

  /**
   * When `true`, `calcite-list-item`s are sortable via a draggable button.
   */
  @Prop({ reflect: true }) dragEnabled = false;

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @Prop({ reflect: true }) group?: string;

  /**
   * When `true`, an input appears at the top of the component that can be used by end users to filter `calcite-list-item`s.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * The currently filtered `calcite-list-item`s.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: HTMLCalciteListItemElement[] = [];

  /**
   * The currently filtered `calcite-list-item` data.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredData: ItemData = [];

  /**
   * Placeholder text for the component's filter input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * Text for the component's filter input field.
   */
  @Prop({ reflect: true, mutable: true }) filterText: string;

  @Watch("filterText")
  async handleFilterTextChange(): Promise<void> {
    this.performFilter();
  }

  /**
   * Specifies an accessible name for the component.
   */
  @Prop() label: string;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Specifies the properties to match against when filtering. If not set, all properties will be matched (label, description, metadata, value).
   */
  @Prop() filterProps: string[];

  @Watch("filterProps")
  async handleFilterPropsChange(): Promise<void> {
    this.performFilter();
  }

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ListMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ListMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Specifies the Unicode numeral system used by the component for localization.
   */
  @Prop() numberingSystem: NumberingSystem;

  /**
   * One of the items within the list can be opened.
   *
   * @internal
   */
  @Prop() openable = false;

  /**
   * The currently selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteListItemElement[] = [];

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
  @Prop({ reflect: true }) selectionMode: Extract<
    "none" | "multiple" | "single" | "single-persist",
    SelectionMode
  > = "none";

  /**
   * Specifies the selection appearance - `"icon"` (displays a checkmark or dot) or `"border"` (displays a border).
   */
  @Prop({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  @Watch("filterEnabled")
  @Watch("group")
  @Watch("dragEnabled")
  @Watch("selectionMode")
  @Watch("selectionAppearance")
  handleListItemChange(): void {
    this.updateListItems({ performFilter: true });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Fires when the component's selected items have changed.
   */
  @Event({ cancelable: false }) calciteListChange: EventEmitter<void>;

  /**
   * Fires when the component's dragging has ended.
   */
  @Event({ cancelable: false }) calciteListDragEnd: EventEmitter<ListDragDetail>;

  /**
   * Fires when the component's dragging has started.
   */
  @Event({ cancelable: false }) calciteListDragStart: EventEmitter<ListDragDetail>;

  /**
   * Fires when the component's filter has changed.
   */
  @Event({ cancelable: false }) calciteListFilter: EventEmitter<void>;

  /**
   * Fires when the component's item order changes.
   */
  @Event({ cancelable: false }) calciteListOrderChange: EventEmitter<ListDragDetail>;

  /**
   * Fires when the default slot has changes in order to notify parent lists.
   */
  @Event({ cancelable: false }) calciteInternalListDefaultSlotChange: EventEmitter<void>;

  @Listen("calciteInternalListItemToggle")
  handleCalciteListItemToggle(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    this.borderItems();
  }

  @Listen("calciteInternalFocusPreviousItem")
  handleCalciteInternalFocusPreviousItem(event: CustomEvent): void {
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

  @Listen("calciteInternalListItemActive")
  handleCalciteInternalListItemActive(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems } = this;

    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }

  @Listen("calciteListItemSelect")
  handleCalciteListItemSelect(): void {
    if (this.parentListEl) {
      return;
    }

    this.updateSelectedItems(true);
  }

  @Listen("calciteInternalAssistiveTextChange")
  handleCalciteInternalAssistiveTextChange(event: CustomEvent): void {
    this.assistiveText = event.detail.message;
    event.stopPropagation();
  }

  @Listen("calciteHandleNudge")
  handleCalciteHandleNudge(event: CustomEvent<HandleNudge>): void {
    if (this.parentListEl) {
      return;
    }

    this.handleNudgeEvent(event);
  }

  @Listen("calciteInternalListItemSelect")
  handleCalciteInternalListItemSelect(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems, selectionMode } = this;

    if (target.selected && (selectionMode === "single" || selectionMode === "single-persist")) {
      listItems.forEach((listItem) => (listItem.selected = listItem === target));
    }

    this.updateSelectedItems();
  }

  @Listen("calciteInternalListItemSelectMultiple")
  handleCalciteInternalListItemSelectMultiple(
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
    const selectedItem = target as HTMLCalciteListItemElement;

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

  @Listen("calciteInternalListItemChange")
  handleCalciteInternalListItemChange(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();
    this.updateListItems();
  }

  @Listen("calciteInternalListItemGroupDefaultSlotChange")
  handleCalciteInternalListItemGroupDefaultSlotChange(event: CustomEvent): void {
    event.stopPropagation();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.connectObserver();
    this.updateListItems({ performFilter: true });
    this.setUpSorting();
    this.setParentList();
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    this.disconnectObserver();
    disconnectSortableComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ListMessages;

  @Element() el: HTMLCalciteListElement;

  @State() assistiveText: string;

  @State() dataForFilter: ItemData = [];

  dragSelector = listItemSelector;

  filterEl: HTMLCalciteFilterElement;

  focusableItems: HTMLCalciteListItemElement[] = [];

  handleSelector = "calcite-handle";

  @State() hasFilterActionsEnd = false;

  @State() hasFilterActionsStart = false;

  @State() hasFilterNoResults = false;

  listItems: HTMLCalciteListItemElement[] = [];

  mutationObserver = createObserver("mutation", () =>
    this.updateListItems({ performFilter: true }),
  );

  visibleItems: HTMLCalciteListItemElement[] = [];

  parentListEl: HTMLCalciteListElement;

  sortable: Sortable;

  private lastSelectedInfo: { selectedItem: HTMLCalciteListItemElement; selected: boolean };

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component's first focusable element.
   *
   * @returns {Promise<void>}
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    if (this.filterEnabled) {
      return this.filterEl?.setFocus();
    }

    return this.focusableItems.find((listItem) => listItem.active)?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
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
            <span aria-live="assertive" class={CSS.assistiveText}>
              {this.assistiveText}
            </span>
          ) : null}
          {this.renderItemAriaLive()}
          {loading ? <calcite-scrim class={CSS.scrim} loading={loading} /> : null}
          <div
            aria-busy={toAriaBoolean(loading)}
            aria-label={label || ""}
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
                        onSlotchange={this.handleFilterActionsStartSlotChange}
                        slot={STACK_SLOTS.actionsStart}
                      />
                      <calcite-filter
                        aria-label={filterPlaceholder}
                        disabled={disabled}
                        filterProps={filterProps}
                        items={dataForFilter}
                        onCalciteFilterChange={this.handleFilterChange}
                        placeholder={filterPlaceholder}
                        ref={this.setFilterEl}
                        value={filterText}
                      />
                      <slot
                        name={SLOTS.filterActionsEnd}
                        onSlotchange={this.handleFilterActionsEndSlotChange}
                        slot={STACK_SLOTS.actionsEnd}
                      />
                    </calcite-stack>
                  </div>
                </div>
              </div>
            ) : null}
            <div class={CSS.tableContainer} role="rowgroup">
              <slot onSlotchange={this.handleDefaultSlotChange} />
            </div>
          </div>
          <div
            aria-live="polite"
            data-test-id="no-results-container"
            hidden={!(hasFilterNoResults && filterEnabled && filterText && !filteredItems.length)}
          >
            <slot
              name={SLOTS.filterNoResults}
              onSlotchange={this.handleFilterNoResultsSlotChange}
            />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private renderItemAriaLive(): VNode {
    const {
      messages,
      filteredItems,
      parentListEl,
      effectiveLocale,
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
      <div aria-live="polite" class={CSS.assistiveText}>
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

  private handleDefaultSlotChange = (event: Event): void => {
    updateListItemChildren(getListItemChildren(event.target as HTMLSlotElement));
    if (this.parentListEl) {
      this.calciteInternalListDefaultSlotChange.emit();
    }
  };

  private handleFilterActionsStartSlotChange = (event: Event): void => {
    this.hasFilterActionsStart = slotChangeHasAssignedElement(event);
  };

  private handleFilterActionsEndSlotChange = (event: Event): void => {
    this.hasFilterActionsEnd = slotChangeHasAssignedElement(event);
  };

  private handleFilterNoResultsSlotChange = (event: Event): void => {
    this.hasFilterNoResults = slotChangeHasAssignedElement(event);
  };

  private setActiveListItem = (): void => {
    const { focusableItems } = this;

    if (!focusableItems.some((item) => item.active)) {
      if (focusableItems[0]) {
        focusableItems[0].active = true;
      }
    }
  };

  private updateSelectedItems = (emit = false): void => {
    this.selectedItems = this.visibleItems.filter((item) => item.selected);
    if (emit) {
      this.calciteListChange.emit();
    }
  };

  private filterElements({
    el,
    filteredItems,
    visibleParents,
  }: {
    el: HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement;
    filteredItems: HTMLCalciteListItemElement[];
    visibleParents: WeakSet<HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement>;
  }): void {
    const filterHidden =
      !visibleParents.has(el) && !filteredItems.includes(el as HTMLCalciteListItemElement);

    el.filterHidden = filterHidden;

    const closestParent = el.parentElement.closest<
      HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement
    >(parentSelector);

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

  private allParentListItemsOpen(item: HTMLCalciteListItemElement): boolean {
    const parentItem = item.parentElement?.closest(listItemSelector);

    if (!parentItem) {
      return true;
    } else if (!parentItem.open) {
      return false;
    }

    return this.allParentListItemsOpen(parentItem);
  }

  private borderItems = (): void => {
    const visibleItems = this.visibleItems.filter(
      (item) => !item.filterHidden && this.allParentListItemsOpen(item),
    );

    visibleItems.forEach(
      (item) => (item.bordered = item !== visibleItems[visibleItems.length - 1]),
    );
  };

  private updateFilteredItems = (emit = false): void => {
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
  };

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

  private setFilterEl = (el: HTMLCalciteFilterElement): void => {
    this.filterEl = el;
    this.performFilter();
  };

  private handleFilterChange = (event: CustomEvent): void => {
    event.stopPropagation();
    const { value } = event.currentTarget as HTMLCalciteFilterElement;
    this.filterText = value;
    this.updateFilteredData(true);
  };

  private getItemData = (): ItemData => {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      value: item.value,
    }));
  };

  private updateListItems = debounce(
    (options?: { emitFilterChange?: boolean; performFilter?: boolean }): void => {
      const emitFilterChange = options?.emitFilterChange ?? false;
      const performFilter = options?.performFilter ?? false;

      const { selectionAppearance, selectionMode, dragEnabled, el, filterEl, filterEnabled } = this;

      const items = Array.from(this.el.querySelectorAll(listItemSelector));

      items.forEach((item) => {
        item.selectionAppearance = selectionAppearance;
        item.selectionMode = selectionMode;
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

  private focusRow = (focusEl: HTMLCalciteListItemElement): void => {
    const { focusableItems } = this;

    if (!focusEl) {
      return;
    }

    focusableItems.forEach((listItem) => (listItem.active = listItem === focusEl));

    focusEl.setFocus();
  };

  private isNavigable = (listItem: HTMLCalciteListItemElement): boolean => {
    const parentListItemEl = listItem.parentElement?.closest(listItemSelector);

    if (!parentListItemEl) {
      return true;
    }

    return parentListItemEl.open && this.isNavigable(parentListItemEl);
  };

  private handleListKeydown = (event: KeyboardEvent): void => {
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
  };

  handleNudgeEvent(event: CustomEvent<HandleNudge>): void {
    const { handleSelector, dragSelector } = this;
    const { direction } = event.detail;

    const composedPath = event.composedPath();

    const handle = composedPath.find(
      (el: HTMLElement): el is HTMLCalciteHandleElement =>
        el?.tagName && el.matches(handleSelector),
    );

    const dragEl = composedPath.find(
      (el: HTMLElement): el is HTMLCalciteListItemElement =>
        el?.tagName && el.matches(dragSelector),
    );

    const parentEl = dragEl?.parentElement as HTMLCalciteListElement;

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
}
