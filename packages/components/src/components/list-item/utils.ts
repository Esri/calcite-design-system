import { isServer } from "lit";
import { getRootNode } from "../../utils/dom";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import { isListItemGroup } from "../list-item-group/resources";
import type { List } from "../list/list";
import { isList } from "../list/resources";
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
  let currentElement: Element | null = element;

  while (currentElement) {
    const rootNode = getRootNode(currentElement);
    const rootHost = "host" in rootNode ? rootNode.host : null;
    currentElement = (currentElement as Slottable).assignedSlot || currentElement.parentElement || rootHost;

    if (currentElement?.matches(selector)) {
      return currentElement as T;
    }
  }

  return null;
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

    if (isList(element)) {
      lists.push(element);
    } else if (isListItem(element)) {
      items.push(element);
    } else if (isListItemGroup(element)) {
      groups.push(element);
    } else if (element instanceof HTMLSlotElement) {
      pushElementsInReverse(elementStack, element.assignedElements({ flatten: true }));
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

  const siblingGroups = new Map<Element | null, Map<HTMLSlotElement | null, ListItem["el"][]>>();

  listItemChildren.forEach((listItem) => {
    if (listItem.filterHidden) {
      listItem.setPosition = undefined;
      listItem.setSize = undefined;
      return;
    }

    const parentGroups = siblingGroups.get(listItem.parentElement) ?? new Map();
    const siblings = parentGroups.get(listItem.assignedSlot) ?? [];
    siblings.push(listItem);
    parentGroups.set(listItem.assignedSlot, siblings);
    siblingGroups.set(listItem.parentElement, parentGroups);
  });

  siblingGroups.forEach((parentGroups) => {
    parentGroups.forEach((siblings) => {
      siblings.forEach((listItem, index) => {
        listItem.setPosition = index + 1;
        listItem.setSize = siblings.length;
      });
    });
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
