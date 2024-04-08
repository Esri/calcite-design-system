import { debounce } from "lodash-es";
import { getRoundRobinIndex } from "../../utils/array";
import { focusElement, getSlotted } from "../../utils/dom";
import { SLOTS } from "../pick-list-group/resources";
import { ValueList } from "../value-list/value-list";
import { PickList } from "./pick-list";

type Lists = PickList | ValueList;
type ListItemElement<T> = T extends PickList ? HTMLCalcitePickListItemElement : HTMLCalciteValueListItemElement;
type List<T> = T extends PickList ? PickList : ValueList;

export type ListFocusId = "filter";

export function mutationObserverCallback<T extends Lists>(this: List<T>): void {
  this.setUpItems();
  this.setUpFilter();
  this.deselectRemovedItems();
}

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

// --------------------------------------------------------------------------
//
//  Lifecycle
//
// --------------------------------------------------------------------------

export function initialize<T extends Lists>(this: List<T>): void {
  this.setUpItems();
  this.setUpFilter();
  this.emitCalciteListChange = debounce(internalCalciteListChangeEvent.bind(this), 0);
  this.emitCalciteListFilter = debounce(internalCalciteListFilterEvent.bind(this), 0);
}

export function initializeObserver<T extends Lists>(this: List<T>): void {
  this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
}

export function cleanUpObserver<T extends Lists>(this: List<T>): void {
  this.mutationObserver?.disconnect();
}

// --------------------------------------------------------------------------
//
//  Listeners
//
// --------------------------------------------------------------------------

export function calciteListItemChangeHandler<T extends Lists>(this: List<T>, event: CustomEvent): void {
  const { selectedValues } = this;
  const { item, value, selected, shiftPressed } = event.detail;

  if (selected) {
    if (this.multiple && shiftPressed) {
      this.selectSiblings(item);
    }

    if (!this.multiple) {
      this.deselectSiblingItems(item);
    }

    selectedValues.set(value, item);
  } else {
    selectedValues.delete(value);

    if (this.multiple && shiftPressed) {
      this.selectSiblings(item, true);
    }
  }

  if (!this.multiple) {
    toggleSingleSelectItemTabbing(item, selected);

    if (selected) {
      focusElement(item);
    }
  }

  this.lastSelectedItem = item;
  this.emitCalciteListChange();
}

export function calciteInternalListItemValueChangeHandler<T extends Lists>(this: List<T>, event: CustomEvent): void {
  const oldValue = event.detail.oldValue;
  const selectedValues = this.selectedValues as Map<string, ListItemElement<T>>;

  if (selectedValues.has(oldValue)) {
    const item = selectedValues.get(oldValue);
    selectedValues.delete(oldValue);
    selectedValues.set(event.detail.newValue, item);
  }
  event.stopPropagation();
}

// --------------------------------------------------------------------------
//
//  Private Methods
//
// --------------------------------------------------------------------------

function isValidNavigationKey(key: string): boolean {
  return !!SUPPORTED_ARROW_KEYS.find((k) => k === key);
}

export function calciteListFocusOutHandler<T extends Lists>(this: List<T>, event: FocusEvent): void {
  const { el, items, multiple, selectedValues } = this;

  if (multiple) {
    return;
  }

  const focusedInside = el.contains(event.relatedTarget as Node | null);
  if (focusedInside) {
    return;
  }

  filterOutDisabled(items).forEach((item) => {
    toggleSingleSelectItemTabbing(
      item,
      selectedValues.size === 0 ? item.contains(event.target as HTMLElement) || event.target === item : item.selected,
    );
  });
}

export function keyDownHandler<T extends Lists>(this: List<T>, event: KeyboardEvent): void {
  const { key, target } = event;

  if (!isValidNavigationKey(key)) {
    return;
  }

  const { items, multiple, selectionFollowsFocus } = this;
  const { length: totalItems } = items;
  const currentIndex = (items as ListItemElement<T>[]).indexOf(target as ListItemElement<T>);

  if (!totalItems || currentIndex === -1) {
    return;
  }

  event.preventDefault();

  const index = moveItemIndex(this, target as ListItemElement<T>, key === "ArrowUp" ? "up" : "down");
  const item = items[index];

  items.forEach((i: HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement) =>
    toggleSingleSelectItemTabbing(i, i === item),
  );

  if (!multiple && selectionFollowsFocus) {
    item.selected = true;
  }

  focusElement(item);
}

export function moveItemIndex<T extends Lists>(
  list: List<T>,
  item: ListItemElement<T>,
  direction: "up" | "down",
): number {
  const { items } = list;
  const { length: totalItems } = items;
  const currentIndex = (items as ListItemElement<T>[]).indexOf(item);
  const directionFactor = direction === "up" ? -1 : 1;
  let moveOffset = 1;
  let index = getRoundRobinIndex(currentIndex + directionFactor * moveOffset++, totalItems);
  const firstMovedIndex = index;

  while (items[index].disabled) {
    index = getRoundRobinIndex(currentIndex + directionFactor * moveOffset++, totalItems);

    if (index === firstMovedIndex) {
      break;
    }
  }

  return index;
}

export function getItemIndex<T extends Lists>(list: List<T>, item: ListItemElement<T>): number {
  const { items } = list;
  return (items as ListItemElement<T>[]).indexOf(item);
}

function filterOutDisabled<T extends Lists>(items: ListItemElement<T>[]): ListItemElement<T>[] {
  return items.filter((item) => !item.disabled);
}

export function internalCalciteListFilterEvent<T extends Lists>(this: List<T>): void {
  this.calciteListFilter.emit();
}

export function internalCalciteListChangeEvent<T extends Lists>(this: List<T>): void {
  this.calciteListChange.emit(this.selectedValues as any);
}

export function removeItem<T extends Lists, U extends ListItemElement<T>>(this: List<T>, event: CustomEvent): void {
  if (event.defaultPrevented) {
    return;
  }

  const item = event.target as U;
  const selectedValues = this.selectedValues as Map<string, U>;

  if (item.parentElement.tagName === "CALCITE-PICK-LIST-GROUP" && item.slot === SLOTS.parentItem) {
    item.parentElement.remove();
    Array.from(item.parentElement.children).forEach((item: U) => selectedValues.delete(item.value));
  } else {
    item.remove();
    selectedValues.delete(item.value);
  }

  this.emitCalciteListChange();
}

function toggleSingleSelectItemTabbing<T extends Lists>(item: ListItemElement<T>, selectable: boolean): void {
  if (item.disabled) {
    return;
  }

  // using attribute intentionally
  if (selectable) {
    item.removeAttribute("tabindex");
  } else {
    item.setAttribute("tabindex", "-1");
  }
}

export async function setFocus<T extends Lists>(this: List<T>, focusId: ListFocusId): Promise<void> {
  if (this.filterEnabled && focusId === "filter") {
    await focusElement(this.filterEl);
    return;
  }

  const { items, multiple, selectionFollowsFocus } = this;

  if (items.length === 0) {
    return;
  }

  if (multiple) {
    return filterOutDisabled(items)[0]?.setFocus();
  }

  const filtered = filterOutDisabled(items);
  const focusTarget = filtered.find((item) => item.selected) || filtered[0];

  if (selectionFollowsFocus && focusTarget) {
    focusTarget.selected = true;
  }

  return focusTarget.setFocus();
}

export function setUpItems<T extends Lists>(
  this: List<T>,
  tagName: T extends PickList ? "calcite-pick-list-item" : "calcite-value-list-item",
): void {
  (this.items as ListItemElement<T>[]) = Array.from(this.el.querySelectorAll<ListItemElement<T>>(tagName));
  let hasSelected = false;

  const { items } = this;

  items.forEach((item) => {
    item.icon = this.getIconType();
    if (!this.multiple) {
      item.deselectDisabled = true;
      toggleSingleSelectItemTabbing(item, false);
    }
    if (item.selected) {
      hasSelected = true;
      toggleSingleSelectItemTabbing(item, true);
      this.selectedValues.set(item.value, item);
    }
  });

  const [first] = items;

  if (!hasSelected && first && !first.disabled) {
    toggleSingleSelectItemTabbing(first, true);
  }
}

export function setUpFilter<T extends Lists>(this: List<T>): void {
  if (this.filterEnabled) {
    this.dataForFilter = this.getItemData();
  }
}

export function deselectRemovedItems<T extends Lists>(this: List<T>): void {
  const selectedValues = this.selectedValues as Map<string, ListItemElement<T>>;
  const itemValues = this.items.map(({ value }) => value);

  selectedValues.forEach((selectedItem) => {
    if (!itemValues.includes(selectedItem.value)) {
      this.selectedValues.delete(selectedItem.value);
    }
  });
}

export function deselectSiblingItems<T extends Lists>(this: List<T>, item: ListItemElement<T>): void {
  this.items.forEach((currentItem) => {
    if (currentItem.value !== item.value) {
      currentItem.toggleSelected(false);
      if (this.selectedValues.has(currentItem.value)) {
        this.selectedValues.delete(currentItem.value);
      }
    }
  });
}

export function selectSiblings<T extends Lists>(this: List<T>, item: ListItemElement<T>, deselect = false): void {
  if (!this.lastSelectedItem) {
    return;
  }
  const { items } = this;
  const start = items.findIndex((currentItem) => {
    return currentItem.value === this.lastSelectedItem.value;
  });
  const end = items.findIndex((currentItem) => {
    return currentItem.value === item.value;
  });
  items.slice(Math.min(start, end), Math.max(start, end)).forEach((currentItem) => {
    currentItem.toggleSelected(!deselect);
    if (!deselect) {
      this.selectedValues.set(currentItem.value, currentItem);
    } else {
      this.selectedValues.delete(currentItem.value);
    }
  });
}

let groups: Set<HTMLCalcitePickListGroupElement>;

export function handleFilter<T extends Lists>(this: List<T>, emit = false): void {
  const { filteredData, filterText } = this;

  const values = filteredData.map((item: ItemData[number]) => item.value);
  let hasSelectedMatch = false;

  if (!groups) {
    groups = new Set<HTMLCalcitePickListGroupElement>();
  }

  const matchedItems =
    (this.items as ListItemElement<T>[])?.filter((item) => {
      const parent = item.parentElement;
      const grouped = parent.matches("calcite-pick-list-group");

      if (grouped) {
        groups.add(parent as HTMLCalcitePickListGroupElement);
      }

      const matches = filterText ? values.includes(item.value) : true;

      item.hidden = !matches;

      if (!hasSelectedMatch) {
        hasSelectedMatch = matches && item.selected;
      }

      return matches;
    }) || [];

  groups.forEach((group) => {
    const hasAtLeastOneMatch = matchedItems.some((item) => group.contains(item));
    group.hidden = !hasAtLeastOneMatch;

    if (!hasAtLeastOneMatch) {
      return;
    }

    const parentItem = getSlotted<ListItemElement<T>>(group, "parent-item");

    if (parentItem) {
      parentItem.hidden = false;

      if (matchedItems.includes(parentItem)) {
        Array.from(group.children as HTMLCollectionOf<HTMLCalcitePickListElement>).forEach(
          (child) => (child.hidden = false),
        );
      }
    }
  });

  groups.clear();

  if (matchedItems.length > 0 && !hasSelectedMatch && !this.multiple) {
    toggleSingleSelectItemTabbing(matchedItems[0], true);
  }

  this.setFilteredItems(matchedItems as any[]);

  if (emit) {
    this.emitCalciteListFilter();
  }
}

export function handleInitialFilter<T extends Lists>(this: List<T>): void {
  const filteredItems = this.filterEl?.filteredItems as ItemData;

  if (filteredItems) {
    this.filteredData = filteredItems;
  }

  this.handleFilter();
}

export function handleFilterEvent<T extends Lists>(this: List<T>, event: CustomEvent): void {
  event.stopPropagation();
  const { filteredItems, value } = event.currentTarget as HTMLCalciteFilterElement;

  this.filterText = value;
  this.filteredData = filteredItems as ItemData;

  this.handleFilter(true);
}

export type ItemData = {
  label: string;
  description: string;
  metadata: Record<string, unknown>;
  value: string;
}[];

export function getItemData<T extends Lists>(this: List<T>): ItemData {
  return (this.items as ListItemElement<T>[]).map((item) => ({
    label: item.label,
    description: item.description,
    metadata: item.metadata,
    value: item.value,
  }));
}
