import { isBrowser } from "../../utils/browser";

const listSelector = "calcite-list";
const listItemGroupSelector = "calcite-list-item-group";
const listItemSelector = "calcite-list-item";

export function openAncestors(el: HTMLCalciteListItemElement): void {
  const ancestor = el.parentElement?.closest(listItemSelector);

  if (!ancestor) {
    return;
  }

  ancestor.open = true;
  openAncestors(ancestor);
}

export function hasListItemChildren(slotEl: HTMLSlotElement): boolean {
  const assignedElements = slotEl.assignedElements({ flatten: true });

  const groupChildren = assignedElements
    .filter((el): el is HTMLCalciteListItemGroupElement => el?.matches(listItemGroupSelector))
    .map((group) => Array.from(group.querySelectorAll<HTMLCalciteListItemElement>(listItemSelector)))
    .flat();

  const listItemChildren = assignedElements.filter((el): el is HTMLCalciteListItemElement =>
    el?.matches(listItemSelector),
  );

  const listChildren = assignedElements.filter((el): el is HTMLCalciteListElement => el?.matches(listSelector));

  return [...listChildren, ...groupChildren, ...listItemChildren].length > 0;
}

export function updateListItemChildren(slotEl: HTMLSlotElement): void {
  const listItemChildren = slotEl
    .assignedElements({ flatten: true })
    .filter((el): el is HTMLCalciteListItemElement => el?.matches(listItemSelector));

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
