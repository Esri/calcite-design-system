import { LitElement } from "@arcgis/lumina";
import { expect, onTestFinished } from "vitest";

interface Selectable extends LitElement {
  selectedItems: HTMLElement[];
}

interface SelectedItemsAssertionOptions {
  /** IDs from items to assert selection */
  expectedItemIds: string[];
}

export interface SelectedItemsAsserter {
  (expectedItemIds: SelectedItemsAssertionOptions["expectedItemIds"]): void;
}

/**
 * Creates a selected items asserter for a selectable component.
 *
 * @example
 *
 * const { el } = await mount(
 *   <calcite-dropdown>
 *     <calcite-button slot="trigger">Open</calcite-button>
 *     <calcite-dropdown-group data-testid="group-1" selection-mode="single">
 *       <calcite-dropdown-item data-testid="item-1">1</calcite-dropdown-item>
 *       <calcite-dropdown-item data-testid="item-2" selected>2</calcite-dropdown-item>
 *       <calcite-dropdown-item data-testid="item-3">3</calcite-dropdown-item>
 *     </calcite-dropdown-group>
 *   </calcite-dropdown>
 * );
 *
 * const assertSelectedItems = createSelectedItemsAsserter(el, "calciteDropdownSelect");
 * const item2 = page.getByTestId("item-2");
 * await item2.click();
 * await assertSelectedItems(["item-2"]);
 */
export function createSelectedItemsAsserter(
  selectable: HTMLElement,
  selectionEventName: string,
  idAttributeName: string = "data-testid",
): SelectedItemsAsserter {
  let lastSelectedItems: HTMLElement[] = [];
  const abortController = new AbortController();
  selectable.addEventListener(
    selectionEventName,
    () => {
      lastSelectedItems = (selectable as Selectable).selectedItems.slice();
    },
    { signal: abortController.signal },
  );

  onTestFinished(() => abortController.abort());

  return (expectedItemIds: SelectedItemsAssertionOptions["expectedItemIds"]) => {
    expect((selectable as Selectable).selectedItems).toHaveLength(expectedItemIds.length);
    lastSelectedItems.forEach((item, index) => {
      expect(item).toHaveAttribute(idAttributeName, expectedItemIds[index]);
    });
  };
}
