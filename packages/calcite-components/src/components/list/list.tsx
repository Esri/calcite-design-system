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
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { SelectionMode } from "../interfaces";
import { ItemData } from "../list-item/interfaces";
import { MAX_COLUMNS } from "../list-item/resources";
import { getListItemChildren, updateListItemChildren } from "../list-item/utils";
import { CSS, debounceTimeout, SelectionAppearance, SLOTS } from "./resources";
import {
  DragDetail,
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
  dragActive,
} from "../../utils/sortableComponent";
import { SLOTS as STACK_SLOTS } from "../stack/resources";

const listItemSelector = "calcite-list-item";
const listItemSelectorDirect = `:scope > calcite-list-item`;
const parentSelector = "calcite-list-item-group, calcite-list-item";

import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { HandleNudge } from "../handle/interfaces";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 *
 * @slot - A slot for adding `calcite-list-item` elements.
 * @slot filter-actions-start - A slot for adding actionable `calcite-action` elements before the filter component.
 * @slot filter-actions-end - A slot for adding actionable `calcite-action` elements after the filter component.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true,
})
export class List implements InteractiveComponent, LoadableComponent, SortableComponent {
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
  @Prop() canPull: (detail: DragDetail) => boolean;

  /**
   * When provided, the method will be called to determine whether the element can be added from another list.
   */
  @Prop() canPut: (detail: DragDetail) => boolean;

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
   * Specifies the selection mode - `"multiple"` (allow any number of selected items), `"single"` (allow one selected item), `"single-persist"` (allow one selected item and prevent de-selection), or `"none"` (no selected items).
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
    this.updateListItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when any of the list item selections have changed.
   */
  @Event({ cancelable: false }) calciteListChange: EventEmitter<void>;

  /**
   * Emits when the component's filter has changed.
   */
  @Event({ cancelable: false }) calciteListFilter: EventEmitter<void>;

  /**
   * Emitted when the order of the list has changed.
   */
  @Event({ cancelable: false }) calciteListOrderChange: EventEmitter<DragDetail>;

  /**
   * Emitted when the default slot has changes in order to notify parent lists.
   */
  @Event({ cancelable: false }) calciteInternalListDefaultSlotChange: EventEmitter<void>;

  @Listen("calciteInternalFocusPreviousItem")
  handleCalciteInternalFocusPreviousItem(event: CustomEvent): void {
    if (this.parentListEl) {
      return;
    }

    event.stopPropagation();

    const { enabledListItems } = this;
    const currentIndex = enabledListItems.findIndex((listItem) => listItem.active);

    const prevIndex = currentIndex - 1;

    if (enabledListItems[prevIndex]) {
      this.focusRow(enabledListItems[prevIndex]);
    }
  }

  @Listen("calciteInternalListItemActive")
  handleCalciteInternalListItemActive(event: CustomEvent): void {
    if (!!this.parentListEl) {
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
    if (!!this.parentListEl) {
      return;
    }

    this.updateSelectedItems(true);
  }

  @Listen("calciteInternalHandleChange")
  handleCalciteInternalHandleChange(event: CustomEvent): void {
    this.assistiveText = event.detail.message;
    event.stopPropagation();
  }

  @Listen("calciteHandleNudge")
  handleCalciteHandleNudge(event: CustomEvent<HandleNudge>): void {
    if (!!this.parentListEl) {
      return;
    }

    this.handleNudgeEvent(event);
  }

  @Listen("calciteInternalListItemSelect")
  handleCalciteInternalListItemSelect(event: CustomEvent): void {
    if (!!this.parentListEl) {
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

  @Listen("calciteInternalListItemChange")
  handleCalciteInternalListItemChange(event: CustomEvent): void {
    if (!!this.parentListEl) {
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
    if (dragActive(this)) {
      return;
    }

    this.connectObserver();
    this.updateListItems();
    this.setUpSorting();
    connectInteractive(this);
    this.setParentList();
  }

  disconnectedCallback(): void {
    if (dragActive(this)) {
      return;
    }

    this.disconnectObserver();
    disconnectSortableComponent(this);
    disconnectInteractive(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListElement;

  @State() assistiveText: string;

  @State() dataForFilter: ItemData = [];

  dragSelector = "calcite-list-item";

  enabledListItems: HTMLCalciteListItemElement[] = [];

  filterEl: HTMLCalciteFilterElement;

  handleSelector = "calcite-handle";

  @State() hasFilterActionsEnd = false;

  @State() hasFilterActionsStart = false;

  listItems: HTMLCalciteListItemElement[] = [];

  mutationObserver = createObserver("mutation", () => this.updateListItems());

  parentListEl: HTMLCalciteListElement;

  sortable: Sortable;

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

    return this.enabledListItems.find((listItem) => listItem.active)?.setFocus();
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
      hasFilterActionsStart,
      hasFilterActionsEnd,
    } = this;
    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.container}>
          {this.dragEnabled ? (
            <span aria-live="assertive" class={CSS.assistiveText}>
              {this.assistiveText}
            </span>
          ) : null}
          {loading ? <calcite-scrim class={CSS.scrim} loading={loading} /> : null}
          <table
            aria-busy={toAriaBoolean(loading)}
            aria-label={label || ""}
            class={CSS.table}
            onKeyDown={this.handleListKeydown}
            role="treegrid"
          >
            {filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? (
              <thead>
                <tr class={{ [CSS.sticky]: true }}>
                  <th colSpan={MAX_COLUMNS}>
                    <calcite-stack class={CSS.stack}>
                      <slot
                        name={SLOTS.filterActionsStart}
                        onSlotchange={this.handleFilterActionsStartSlotChange}
                        slot={STACK_SLOTS.actionsStart}
                      />
                      <calcite-filter
                        aria-label={filterPlaceholder}
                        disabled={loading || disabled}
                        items={dataForFilter}
                        onCalciteFilterChange={this.handleFilterChange}
                        placeholder={filterPlaceholder}
                        value={filterText}
                        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                        ref={this.setFilterEl}
                      />
                      <slot
                        name={SLOTS.filterActionsEnd}
                        onSlotchange={this.handleFilterActionsEndSlotChange}
                        slot={STACK_SLOTS.actionsEnd}
                      />
                    </calcite-stack>
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody class={CSS.tableContainer}>
              <slot onSlotchange={this.handleDefaultSlotChange} />
            </tbody>
          </table>
        </div>
      </InteractiveContainer>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

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

  onDragStart(): void {
    this.disconnectObserver();
  }

  onDragEnd(): void {
    this.connectObserver();
  }

  onDragSort(detail: DragDetail): void {
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

  private setActiveListItem = (): void => {
    const { enabledListItems } = this;

    if (!enabledListItems.some((item) => item.active)) {
      if (enabledListItems[0]) {
        enabledListItems[0].active = true;
      }
    }
  };

  private updateSelectedItems = (emit = false): void => {
    this.selectedItems = this.enabledListItems.filter((item) => item.selected);
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
    const hidden =
      !visibleParents.has(el) && !filteredItems.includes(el as HTMLCalciteListItemElement);

    el.hidden = hidden;

    const closestParent = el.parentElement.closest(parentSelector) as
      | HTMLCalciteListItemElement
      | HTMLCalciteListItemGroupElement;

    if (!closestParent) {
      return;
    }

    if (!hidden) {
      visibleParents.add(closestParent);
    }

    this.filterElements({
      el: closestParent,
      filteredItems,
      visibleParents,
    });
  }

  private updateFilteredItems = (emit = false): void => {
    const { listItems, filteredData, filterText } = this;

    const values = filteredData.map((item) => item.value);

    const lastDescendantItems = listItems?.filter((listItem) =>
      listItems.every((li) => li === listItem || !listItem.contains(li))
    );

    const filteredItems =
      listItems.filter((item) => !filterText || values.includes(item.value)) || [];

    const visibleParents = new WeakSet<HTMLElement>();

    lastDescendantItems.forEach((listItem) =>
      this.filterElements({ el: listItem, filteredItems, visibleParents })
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

    this.updateListItems(emit);
  }

  private async performFilter(): Promise<void> {
    const { filterEl, filterText } = this;

    if (!filterEl) {
      return;
    }

    filterEl.value = filterText;
    await filterEl.filter(filterText);
    this.updateFilteredData();
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

  private updateListItems = debounce((emit = false): void => {
    const { selectionAppearance, selectionMode, dragEnabled } = this;

    if (!!this.parentListEl) {
      const items = this.queryListItems(true);

      items.forEach((item) => {
        item.dragHandle = dragEnabled;
      });

      this.setUpSorting();
      return;
    }

    const items = this.queryListItems();
    items.forEach((item) => {
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
    });
    const dragItems = this.queryListItems(true);
    dragItems.forEach((item) => {
      item.dragHandle = dragEnabled;
    });
    this.listItems = items;
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
      if (this.filterEl) {
        this.filterEl.items = this.dataForFilter;
      }
    }
    this.updateFilteredItems(emit);
    this.enabledListItems = this.filteredItems.filter((item) => !item.disabled && !item.closed);
    this.setActiveListItem();
    this.updateSelectedItems(emit);
    this.setUpSorting();
  }, debounceTimeout);

  private queryListItems = (direct = false): HTMLCalciteListItemElement[] => {
    return Array.from(this.el.querySelectorAll(direct ? listItemSelectorDirect : listItemSelector));
  };

  private focusRow = (focusEl: HTMLCalciteListItemElement): void => {
    const { enabledListItems } = this;

    if (!focusEl) {
      return;
    }

    enabledListItems.forEach((listItem) => (listItem.active = listItem === focusEl));

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
    const filteredItems = this.enabledListItems.filter((listItem) => this.isNavigable(listItem));
    const currentIndex = filteredItems.findIndex((listItem) => listItem.active);

    if (key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = event.target === this.filterEl ? 0 : currentIndex + 1;

      if (filteredItems[nextIndex]) {
        this.focusRow(filteredItems[nextIndex]);
      }
    } else if (key === "ArrowUp") {
      event.preventDefault();

      if (currentIndex === 0 && this.filterEnabled) {
        this.filterEl?.setFocus();
        return;
      }

      const prevIndex = currentIndex - 1;

      if (filteredItems[prevIndex]) {
        this.focusRow(filteredItems[prevIndex]);
      }
    } else if (key === "Home") {
      event.preventDefault();
      const homeItem = filteredItems[0];

      if (homeItem) {
        this.focusRow(homeItem);
      }
    } else if (key === "End") {
      event.preventDefault();
      const endItem = filteredItems[filteredItems.length - 1];

      if (endItem) {
        this.focusRow(endItem);
      }
    }
  };

  handleNudgeEvent(event: CustomEvent<HandleNudge>): void {
    const { direction } = event.detail;

    const composedPath = event.composedPath();

    const handle = composedPath.find(
      (el: HTMLElement) => el.tagName === "CALCITE-HANDLE"
    ) as HTMLCalciteHandleElement;

    const sortItem = composedPath.find(
      (el: HTMLElement) => el.tagName === "CALCITE-LIST-ITEM"
    ) as HTMLCalciteListItemElement;

    const parentEl = sortItem?.parentElement;

    if (!parentEl) {
      return;
    }

    const { enabledListItems } = this;

    const sameParentItems = enabledListItems.filter((item) => item.parentElement === parentEl);

    const lastIndex = sameParentItems.length - 1;
    const oldIndex = sameParentItems.indexOf(sortItem);
    let appendInstead = false;
    let newIndex: number;

    if (direction === "up") {
      if (oldIndex === 0) {
        appendInstead = true;
        newIndex = lastIndex;
      } else {
        newIndex = oldIndex - 1;
      }
    } else {
      if (oldIndex === lastIndex) {
        newIndex = 0;
      } else if (oldIndex === lastIndex - 1) {
        appendInstead = true;
        newIndex = lastIndex;
      } else {
        newIndex = oldIndex + 2;
      }
    }

    this.disconnectObserver();

    if (appendInstead) {
      parentEl.appendChild(sortItem);
    } else {
      parentEl.insertBefore(sortItem, sameParentItems[newIndex]);
    }

    this.updateListItems();
    this.connectObserver();

    this.calciteListOrderChange.emit({
      dragEl: sortItem,
      fromEl: parentEl,
      toEl: parentEl,
      newIndex,
      oldIndex,
    });

    handle.setFocus().then(() => {
      handle.activated = true;
    });
  }
}
