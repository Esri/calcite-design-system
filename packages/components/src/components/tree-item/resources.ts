import type { TreeItem } from "./tree-item";

import { IconName } from "../icon/types";

export const CSS = {
  actionsEnd: "actions-end",
  checkbox: "checkbox",
  checkboxContainer: "checkbox-container",
  checkboxLabel: "checkbox-label",
  chevron: "chevron",
  childrenContainer: "children-container",
  iconStart: "icon-start",
  itemExpanded: "item--expanded",
  nodeAndActionsContainer: "node-actions-container",
  nodeContainer: "node-container",
  selectionIcon: "selection-icon",
};

export const SLOTS = {
  actionsEnd: "actions-end",
  children: "children",
};

export const ICONS: Record<string, IconName> = {
  blank: "blank",
  bulletPoint: "bullet-point",
  checkmark: "check",
  checkSquareF: "check-square-f",
  chevronRight: "chevron-right",
  minusSquareF: "minus-square-f",
  square: "square",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTreeItem(el: Element | null | EventTarget): el is TreeItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TREE-ITEM";
}
