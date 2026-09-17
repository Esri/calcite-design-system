import { isServer } from "lit";
import { closestElementCrossShadowBoundary, getRootNode } from "../../utils/dom";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { List } from "../list/list";
import type { ListItem } from "./list-item";
import { isListItem } from "./resources";

export const listSelector = "calcite-list";
export const listItemGroupSelector = "calcite-list-item-group";
export const listItemSelector = "calcite-list-item";

function pushElementsInReverse(elementStack: Element[], elements: ArrayLike<Element>): void {
  for (let index = elements.length - 1; index >= 0; index--) {
    elementStack.push(elements[index]);
  }
}

export function getClosestAncestorInComposedTree<T extends Element>(element: Element, selector: string): T | null {
  const rootNode = getRootNode(element);
  const rootHost = "host" in rootNode ? rootNode.host : null;
  const startingElement = (element as Slottable).assignedSlot || element.parentElement || rootHost;

  return startingElement ? closestElementCrossShadowBoundary<T>(startingElement, selector) : null;
}

export function getListStructureFromElements(elements: Element[]): {
  groups: ListItemGroup["el"][];
  lists: List["el"][];
  items: ListItem["el"][];
} {
  // Intentionally only supports direct descendants and slot assignments
  const groups: ListItemGroup["el"][] = [];
  const lists: List["el"][] = [];
  const items: ListItem["el"][] = [];
  const elementStack: Element[] = [];

  pushElementsInReverse(elementStack, elements);

  while (elementStack.length > 0) {
    const element = elementStack.pop()!;

    if (element.matches(listSelector)) {
      lists.push(element);
    } else if (isListItem(element)) {
      items.push(element);
    } else if (element.matches(listItemGroupSelector)) {
      groups.push(element);
    } else if (element instanceof HTMLSlotElement) {
      pushElementsInReverse(elementStack, element.assignedElements({ flatten: true }));
      continue;
    } else {
      continue;
    }

    pushElementsInReverse(elementStack, element.children);
  }

  return { groups, lists, items };
}

export function expandedAncestors(el: ListItem["el"]): void {
  const ancestor = getClosestAncestorInComposedTree<ListItem["el"]>(el, listItemSelector);

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
  const { lists, items } = getListStructureFromElements(slotEl.assignedElements({ flatten: true }));

  return {
    lists,
    items,
  };
}

export function updateListItemChildren(slotEl: HTMLSlotElement): void {
  const listEl = getClosestAncestorInComposedTree<List["el"]>(slotEl, listSelector);
  const listItemChildren: ListItem["el"][] = [];

  getListStructureFromElements(slotEl.assignedElements({ flatten: true })).items.forEach((listItem) => {
    if (getClosestAncestorInComposedTree<List["el"]>(listItem, listSelector) === listEl) {
      listItemChildren.push(listItem);
    }
  });

  const visibleCount = listItemChildren.filter((listItem) => !listItem.filterHidden).length;
  let visiblePosition = 0;

  listItemChildren.forEach((listItem) => {
    if (listItem.filterHidden) {
      listItem.setPosition = undefined;
      listItem.setSize = undefined;
      return;
    }

    visiblePosition += 1;
    listItem.setPosition = visiblePosition;
    listItem.setSize = visibleCount;
  });
}

export function getDepth(element: HTMLElement, includeGroup = false): number {
  if (isServer) {
    return 0;
  }

  const selector = includeGroup ? `${listItemSelector}, ${listItemGroupSelector}` : listItemSelector;

  let depth = 0;
  let currentAncestor = getClosestAncestorInComposedTree<Element>(element, selector);

  while (currentAncestor) {
    depth += 1;
    currentAncestor = getClosestAncestorInComposedTree<Element>(currentAncestor, selector);
  }

  return depth;
}
