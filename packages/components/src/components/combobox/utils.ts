import { isServer } from "lit";
import { nodeListToArray } from "../../utils/dom";
import { ComboboxItem } from "../combobox-item/combobox-item";
import { ComboboxChildElement } from "./interfaces";
import { ComboboxItemGroupSelector, ComboboxItemSelector, AllComboboxChildrenSelector } from "./resources";
import { Combobox } from "./combobox";

const placeholderWidthMultiplier = 0.55;

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

export function getSelectedItems(
  items: ComboboxItem["el"][],
  selectionMode: Combobox["selectionMode"],
): ComboboxItem["el"][] {
  if (isSingleLike(selectionMode)) {
    const match = items.find(({ selected }) => selected);
    return match ? [match] : [];
  }

  return items.filter((item) => item.selected && (selectionMode !== "ancestors" || !hasActiveChildren(item)));
}

export function hasActiveChildren(node: ComboboxItem["el"]): boolean {
  const items = nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
  return items.filter((item) => item.selected).length > 0;
}

export function syncAncestorSelection(item: ComboboxItem["el"], value: boolean): void {
  const ancestors = getItemAncestors(item);
  const children = getItemChildren(item);

  if (value) {
    ancestors.forEach((ancestor) => {
      if (!ancestor.disabled) {
        ancestor.selected = true;
      }
    });

    return;
  }

  children.forEach((child) => {
    if (!child.disabled) {
      child.selected = false;
    }
  });

  ancestors.forEach((ancestor) => {
    if (!hasActiveChildren(ancestor)) {
      ancestor.selected = false;
    }
  });
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

export function getPlaceholderWidth({
  fontSize,
  inputMinWidth,
  measuredPlaceholderWidth,
  placeholder,
}: {
  fontSize: string;
  inputMinWidth: number;
  measuredPlaceholderWidth: number;
  placeholder?: string;
}): number {
  return measuredPlaceholderWidth > 0
    ? measuredPlaceholderWidth
    : Math.max(
        inputMinWidth,
        Math.round((placeholder?.length || 0) * (parseFloat(fontSize) || inputMinWidth) * placeholderWidthMultiplier),
      );
}

export function shouldUseFitCompactDisplay({
  chipContainerElGap,
  chipContainerElWidth,
  hiddenChipIndicatorWidth,
  inputMinWidth,
  placeholderWidth,
  reservedPlaceholderInputWidth,
}: {
  chipContainerElGap: number;
  chipContainerElWidth: number;
  hiddenChipIndicatorWidth: number;
  inputMinWidth: number;
  placeholderWidth: number;
  reservedPlaceholderInputWidth: number;
}): boolean {
  const availableHorizontalChipElSpaceWithPlaceholder = Math.round(
    chipContainerElWidth -
      (hiddenChipIndicatorWidth + chipContainerElGap + reservedPlaceholderInputWidth + chipContainerElGap),
  );
  const placeholderIsReallyLong = placeholderWidth > inputMinWidth * 2;

  return placeholderIsReallyLong && availableHorizontalChipElSpaceWithPlaceholder <= 0;
}

export function getFitCompactDisplayState({
  chipContainerElGap,
  chipContainerElWidth,
  deferFitChipCountRender,
  inputMinWidth,
  placeholderWidth,
  selectedChipCountWidth,
  selectedHiddenChipsCount,
  selectedIndicatorChipWidth,
}: {
  chipContainerElGap: number;
  chipContainerElWidth: number;
  deferFitChipCountRender: boolean;
  inputMinWidth: number;
  placeholderWidth: number;
  selectedChipCountWidth: number;
  selectedHiddenChipsCount: number;
  selectedIndicatorChipWidth: number;
}): {
  hiddenChipIndicatorWidth: number;
  hideSelectedChips: boolean;
  reservedPlaceholderInputWidth: number;
} {
  const hiddenChipIndicatorWidth =
    deferFitChipCountRender || selectedHiddenChipsCount <= 0 ? 0 : selectedChipCountWidth || selectedIndicatorChipWidth;
  const reservedPlaceholderInputWidth = Math.max(inputMinWidth, placeholderWidth);
  const hideSelectedChips = shouldUseFitCompactDisplay({
    chipContainerElGap,
    chipContainerElWidth,
    hiddenChipIndicatorWidth,
    inputMinWidth,
    placeholderWidth,
    reservedPlaceholderInputWidth,
  });

  return {
    hiddenChipIndicatorWidth,
    hideSelectedChips,
    reservedPlaceholderInputWidth,
  };
}

export function getCompactSelectionDisplayBreakpoint({
  chipContainerElGap,
  inputWidth,
  largestSelectedIndicatorChipWidth,
}: {
  chipContainerElGap: number;
  inputWidth: number;
  largestSelectedIndicatorChipWidth: number;
}): number {
  return Math.round(largestSelectedIndicatorChipWidth + chipContainerElGap + inputWidth);
}
