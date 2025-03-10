import { isBrowser } from "../../utils/browser";
import type { List } from "../list/list";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { ListItem } from "./list-item";

export const listSelector = "calcite-list";
export const listItemGroupSelector = "calcite-list-item-group";
export const listItemSelector = "calcite-list-item";

export function expandedAncestors(el: ListItem["el"]): void {
  const ancestor = el.parentElement?.closest(listItemSelector);

  if (!ancestor) {
    return;
  }

  ancestor.open = true;
  expandedAncestors(ancestor);
}

export function getListItemChildren(slotEl: HTMLSlotElement): {
  lists: List["el"][];
  items: ListItem["el"][];
} {
  const assignedElements = slotEl.assignedElements({ flatten: true });

  const groupChildren = assignedElements
    .filter((el): el is ListItemGroup["el"] => el?.matches(listItemGroupSelector))
    .map((group) => Array.from(group.querySelectorAll<ListItem["el"]>(listItemSelector)))
    .flat();

  const listItemChildren = assignedElements.filter((el): el is ListItem["el"] => el?.matches(listItemSelector));

  const listChildren = assignedElements.filter((el): el is List["el"] => el?.matches(listSelector));

  return {
    lists: listChildren,
    items: groupChildren.concat(listItemChildren),
  };
}

export function updateListItemChildren(slotEl: HTMLSlotElement): void {
  const listItemChildren = slotEl
    .assignedElements({ flatten: true })
    .filter((el): el is ListItem["el"] => el.matches(listItemSelector));

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

export function isListItem(element: Element): element is ListItem["el"] {
  return element.tagName === "CALCITE-LIST-ITEM";
}
