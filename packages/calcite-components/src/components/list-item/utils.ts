import { isBrowser } from "../../utils/browser";
import type { List } from "../list/list";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { ListItem } from "./list-item";

const listSelector = "calcite-list";
const listItemGroupSelector = "calcite-list-item-group";
const listItemSelector = "calcite-list-item";

export function getListItemChildLists(slotEl: HTMLSlotElement): List["el"][] {
  return Array.from(
    slotEl.assignedElements({ flatten: true }).filter((el): el is List["el"] => el.matches(listSelector)),
  );
}

export function getListItemChildren(slotEl: HTMLSlotElement): ListItem["el"][] {
  const assignedElements = slotEl.assignedElements({ flatten: true });

  const listItemGroupChildren = assignedElements
    .filter((el): el is ListItemGroup["el"] => el?.matches(listItemGroupSelector))
    .map((group) => Array.from(group.querySelectorAll(listItemSelector)))
    .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

  const listItemChildren = assignedElements.filter((el): el is ListItem["el"] => el?.matches(listItemSelector));

  const listItemListChildren = assignedElements
    .filter((el): el is List["el"] => el?.matches(listSelector))
    .map((list) => Array.from(list.querySelectorAll(listItemSelector)))
    .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

  return [...listItemListChildren, ...listItemGroupChildren, ...listItemChildren];
}

export function updateListItemChildren(listItemChildren: ListItem["el"][]): void {
  listItemChildren.forEach((listItem) => {
    listItem.setPosition = listItemChildren.indexOf(listItem) + 1;
    listItem.setSize = listItemChildren.length;
  });
}

export function getDepth(element: HTMLElement, includeGroup = false): number {
  if (!isBrowser()) {
    return 0;
  }

  const expression = includeGroup
    ? "ancestor::calcite-list-item | ancestor::calcite-list-item-group"
    : "ancestor::calcite-list-item";

  const result = document.evaluate(expression, element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  return result.snapshotLength;
}
