import { describe, expect, it } from "vitest";
import {
  getCompactSelectionDisplayBreakpoint,
  getFitCompactDisplayState,
  getPlaceholderWidth,
  getSelectedItems,
  orderValuesByPrevious,
  syncAncestorSelection,
} from "./utils";

type MockComboboxItem = HTMLElement & {
  ancestors?: MockComboboxItem[];
  disabled?: boolean;
  heading?: string;
  selected?: boolean;
  value?: string;
};

function createMockItem({
  disabled = false,
  heading,
  selected = false,
  value,
}: {
  disabled?: boolean;
  heading: string;
  selected?: boolean;
  value: string;
}): MockComboboxItem {
  const item = document.createElement("calcite-combobox-item") as MockComboboxItem;
  item.disabled = disabled;
  item.heading = heading;
  item.selected = selected;
  item.value = value;
  return item;
}

describe(orderValuesByPrevious, () => {
  it("preserves the previous selected value order when possible", () => {
    expect(orderValuesByPrevious(["gamma", "alpha", "beta"], ["alpha", "beta"])).toEqual(["alpha", "beta", "gamma"]);
  });

  it("preserves duplicate selected values", () => {
    expect(orderValuesByPrevious(["one", "two", "one"], ["one", "two"])).toEqual(["one", "two", "one"]);
  });
});

describe(getSelectedItems, () => {
  it("returns only the deepest selected items in ancestors mode", () => {
    const parent = createMockItem({ heading: "parent", selected: true, value: "parent" });
    const child = createMockItem({ heading: "child", selected: true, value: "child" });

    parent.append(child);

    expect(getSelectedItems([parent, child] as any, "ancestors")).toEqual([child]);
  });

  it("returns the first selected item in single mode", () => {
    const first = createMockItem({ heading: "one", selected: true, value: "one" });
    const second = createMockItem({ heading: "two", selected: true, value: "two" });

    expect(getSelectedItems([first, second] as any, "single")).toEqual([first]);
  });
});

describe(syncAncestorSelection, () => {
  it("selects ancestors when a child is selected", () => {
    const parent = createMockItem({ heading: "parent", value: "parent" });
    const child = createMockItem({ heading: "child", value: "child" });
    child.ancestors = [parent];

    parent.append(child);

    syncAncestorSelection(child as any, true);

    expect(parent.selected).toBe(true);
  });

  it("clears descendants and ancestors when the selected branch is toggled off", () => {
    const parent = createMockItem({ heading: "parent", selected: true, value: "parent" });
    const child = createMockItem({ heading: "child", selected: true, value: "child" });
    child.ancestors = [parent];

    const grandchild = createMockItem({ heading: "grandchild", selected: true, value: "grandchild" });
    grandchild.ancestors = [child, parent];

    child.append(grandchild);
    parent.append(child);
    child.selected = false;

    syncAncestorSelection(child as any, false);

    expect(parent.selected).toBe(false);
    expect(child.selected).toBe(false);
    expect(grandchild.selected).toBe(false);
  });
});

describe("chip layout helpers", () => {
  it("falls back to a minimum placeholder width when text measurement is unavailable", () => {
    expect(
      getPlaceholderWidth({
        fontSize: "16px",
        inputMinWidth: 48,
        measuredPlaceholderWidth: 0,
        placeholder: "Select an item",
      }),
    ).toBeGreaterThanOrEqual(48);
  });

  it("computes fit compact display state", () => {
    expect(
      getFitCompactDisplayState({
        chipContainerElGap: 8,
        chipContainerElWidth: 120,
        deferFitChipCountRender: false,
        inputMinWidth: 48,
        placeholderWidth: 140,
        selectedChipCountWidth: 36,
        selectedHiddenChipsCount: 2,
        selectedIndicatorChipWidth: 28,
      }),
    ).toEqual({
      hiddenChipIndicatorWidth: 36,
      hideSelectedChips: true,
      reservedPlaceholderInputWidth: 140,
    });
  });

  it("computes a compact selection breakpoint", () => {
    expect(
      getCompactSelectionDisplayBreakpoint({
        chipContainerElGap: 8,
        inputWidth: 72,
        largestSelectedIndicatorChipWidth: 32,
      }),
    ).toBe(112);
  });
});
