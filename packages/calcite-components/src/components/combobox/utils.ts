import { nodeListToArray } from "../../utils/dom";
import { ComboboxChildElement } from "./interfaces";
import { ComboboxChildSelector } from "./resources";
import { Build } from "@stencil/core";
import { Combobox } from "./combobox";

export function getAncestors(element: HTMLElement): ComboboxChildElement[] {
  const parent: ComboboxChildElement = element.parentElement?.closest(ComboboxChildSelector);
  const grandparent: ComboboxChildElement = parent?.parentElement?.closest(ComboboxChildSelector);
  return [parent, grandparent].filter((el) => el);
}

export function getItemAncestors(item: HTMLCalciteComboboxItemElement): HTMLCalciteComboboxItemElement[] {
  return (
    (item.ancestors?.filter((el) => el.nodeName === "CALCITE-COMBOBOX-ITEM") as HTMLCalciteComboboxItemElement[]) || []
  );
}

export function getItemChildren(item: HTMLCalciteComboboxItemElement): HTMLCalciteComboboxItemElement[] {
  return nodeListToArray(item.querySelectorAll("calcite-combobox-item"));
}

export function hasActiveChildren(node: HTMLCalciteComboboxItemElement): boolean {
  const items = nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
  return items.filter((item) => item.selected).length > 0;
}

export function getDepth(element: HTMLElement): number {
  if (!Build.isBrowser) {
    return 0;
  }

  const result = document.evaluate(
    "ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",
    element,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  return result.snapshotLength;
}

export function isSingleLike(selectionMode: Combobox["selectionMode"]): boolean {
  return selectionMode.includes("single");
}
