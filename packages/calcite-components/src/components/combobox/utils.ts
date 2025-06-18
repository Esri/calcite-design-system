// @ts-strict-ignore
import { isServer } from "lit";
import { nodeListToArray } from "../../utils/dom";
import { ComboboxItem } from "../combobox-item/combobox-item";
import { ComboboxChildElement } from "./interfaces";
import { ComboboxItemGroupSelector, ComboboxItemSelector, AllComboboxChildrenSelector } from "./resources";
import { Combobox } from "./combobox";

export function getAncestors(element: HTMLElement): ComboboxChildElement[] {
  const parent: ComboboxChildElement = element.parentElement?.closest(AllComboboxChildrenSelector);
  const grandparent: ComboboxChildElement = parent?.parentElement?.closest(AllComboboxChildrenSelector);
  return [parent, grandparent].filter((el) => el);
}

export function getItemAncestors(item: ComboboxItem["el"]): ComboboxItem["el"][] {
  return item.ancestors?.filter((el): el is ComboboxItem["el"] => el.nodeName === "CALCITE-COMBOBOX-ITEM") || [];
}

export function getItemChildren(item: ComboboxItem["el"]): ComboboxItem["el"][] {
  return nodeListToArray(item.querySelectorAll("calcite-combobox-item"));
}

export function hasActiveChildren(node: ComboboxItem["el"]): boolean {
  const items = nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
  return items.filter((item) => item.selected).length > 0;
}

export function getDepth(element: ComboboxChildElement): number {
  if (isServer) {
    return 0;
  }

  const result = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    element,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );

  const depth = result.snapshotLength;

  if (depth > 0 && element.nodeName === ComboboxItemSelector) {
    for (let i = 0; i < depth; i++) {
      const parent = result.snapshotItem(i);
      if (parent.nodeName === ComboboxItemGroupSelector) {
        return depth;
      }
    }
  } else if (element.nodeName === ComboboxItemGroupSelector) {
    return depth;
  }

  return depth + 1;
}

export function isSingleLike(selectionMode: Combobox["selectionMode"]): boolean {
  return selectionMode.includes("single");
}

export function getLabel(item: ComboboxItem["el"]): string {
  return item.shortHeading || item.heading || item.textLabel;
}
