import { isServer } from "lit";
import { nodeListToArray } from "../../utils/dom";
import { ComboboxItem } from "../combobox-item/combobox-item";
import { ComboboxChildElement } from "./types";
import { ComboboxItemGroupSelector, ComboboxItemSelector, AllComboboxChildrenSelector } from "./resources";
import { Combobox } from "./combobox";

export function getAncestors(element: HTMLElement): ComboboxChildElement[] {
  const parent = element.parentElement?.closest<ComboboxChildElement>(AllComboboxChildrenSelector);
  const grandparent = parent?.parentElement?.closest<ComboboxChildElement>(AllComboboxChildrenSelector);
  return [parent, grandparent].filter((el) => !!el);
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
      const parent = result.snapshotItem(i)!;
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
  return item.shortHeading || item.heading;
}

export function orderByPrevious<T>(items: T[], previousItems: T[]): T[] {
  if (items.length < 2 || previousItems.length === 0) {
    return items;
  }

  const previousItemOrder = new Map(previousItems.map((item, index) => [item, index]));

  return [...items].sort((a, b) => {
    const aOrder = previousItemOrder.get(a);
    const bOrder = previousItemOrder.get(b);

    if (aOrder !== undefined && bOrder !== undefined) {
      return aOrder - bOrder;
    }

    if (aOrder !== undefined) {
      return -1;
    }

    if (bOrder !== undefined) {
      return 1;
    }

    return 0;
  });
}

function consumeValue(counts: Map<string, number>, value: string): boolean {
  const count = counts.get(value) ?? 0;

  if (count === 0) {
    return false;
  }

  if (count === 1) {
    counts.delete(value);
  } else {
    counts.set(value, count - 1);
  }

  return true;
}

export function orderValuesByPrevious(selectedValues: string[], previousValues: string[]): string[] {
  if (selectedValues.length < 2 || previousValues.length === 0) {
    return selectedValues;
  }

  const selectedValueCounts = new Map<string, number>();

  selectedValues.forEach((value) => {
    selectedValueCounts.set(value, (selectedValueCounts.get(value) ?? 0) + 1);
  });

  const orderedSelectedValues = previousValues.filter((value) => consumeValue(selectedValueCounts, value));

  if (orderedSelectedValues.length === 0) {
    return selectedValues;
  }

  selectedValues.forEach((value) => {
    if (consumeValue(selectedValueCounts, value)) {
      orderedSelectedValues.push(value);
    }
  });

  return orderedSelectedValues;
}
