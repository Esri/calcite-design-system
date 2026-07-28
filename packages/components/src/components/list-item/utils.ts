import { isServer } from "lit";
import { closestElementCrossShadowBoundary, getRootNode } from "../../utils/dom";
import type { List } from "../list/list";
import type { ListItemGroup } from "../list-item-group/list-item-group";
import type { ListItem } from "./list-item";

export const listSelector = "calcite-list";
export const listItemGroupSelector = "calcite-list-item-group";
export const listItemSelector = "calcite-list-item";

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
  // Intentionally only supports direct descendants and slot assignments. Neutral wrappers
  // are not traversed unless they are themselves calcite-list/list-item/list-item-group.
  return elements.reduce(
    (acc, element) => {
      if (element.matches(listSelector)) {
        acc.lists.push(element);

        const nestedChildren = getListStructureFromElements(Array.from(element.children));

        acc.groups.push(...nestedChildren.groups);
        acc.lists.push(...nestedChildren.lists);
        acc.items.push(...nestedChildren.items);

        return acc;
      }

      if (isListItem(element)) {
        acc.items.push(element);

        const nestedChildren = getListStructureFromElements(Array.from(element.children));

        acc.groups.push(...nestedChildren.groups);
        acc.lists.push(...nestedChildren.lists);
        acc.items.push(...nestedChildren.items);

        return acc;
      }

      if (element.matches(listItemGroupSelector)) {
        const group = element;
        const nestedChildren = getListStructureFromElements(Array.from(group.children));

        acc.groups.push(group);
        acc.groups.push(...nestedChildren.groups);
        acc.lists.push(...nestedChildren.lists);
        acc.items.push(...nestedChildren.items);

        return acc;
      }

      if (element instanceof HTMLSlotElement) {
        const nestedChildren = getListStructureFromElements(element.assignedElements({ flatten: true }));

        acc.groups.push(...nestedChildren.groups);
        acc.lists.push(...nestedChildren.lists);
        acc.items.push(...nestedChildren.items);

        return acc;
      }

      return acc;
    },
    {
      groups: [],
      lists: [],
      items: [],
    } as {
      groups: ListItemGroup["el"][];
      lists: List["el"][];
      items: ListItem["el"][];
    },
  );
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
  const listItemChildren = getListStructureFromElements(slotEl.assignedElements({ flatten: true })).items;

  const filteredListItemChildren = listItemChildren.filter((listItem) => !listItem.filterHidden);

  listItemChildren.forEach((listItem) => {
    const index = filteredListItemChildren.indexOf(listItem);
    listItem.setPosition = index === -1 ? undefined : index + 1;
    listItem.setSize = index === -1 ? undefined : filteredListItemChildren.length;
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

export function isListItem(element: Element): element is ListItem["el"] {
  return element.tagName === "CALCITE-LIST-ITEM";
}
