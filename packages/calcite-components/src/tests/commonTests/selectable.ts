import { E2EPage } from "@stencil/core/testing";
import { GlobalTestProps } from "../../tests/utils";

interface SelectedItemsAssertionOptions {
  /**
   * IDs from items to assert selection
   */
  expectedItemIds: string[];
}

/**
 * Test helper for selected items. Expects items to have IDs to test against.
 *
 * Note: selectable.setUpEvents must be called before using this method
 *
 * @param groupElementTagName - The custom element tag name
 * @param page - The E2EPage instance
 * @param SelectedItemsAssertionOptions - Object containing selectable test assertion options
 * @param SelectedItemsAssertionOptions.expectedItemIds - An array of ids to expect to be selected from an interaction
 */
export async function selectable(groupElementTagName: string, page: E2EPage, { expectedItemIds }: SelectedItemsAssertionOptions): Promise<void> {
  await page.waitForTimeout(100);
  const selectedItemIds = await page.evaluate((groupElementTagName) => {
    const group = document.querySelector(groupElementTagName);
    return (group as any).selectedItems.map((item) => item.id);
  }, groupElementTagName);

  expect(selectedItemIds).toHaveLength(expectedItemIds.length);

  expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
}

type SelectionEventTestWindow = GlobalTestProps<{ eventDetail: Selection }>;

/**
 * Helper to wire up the page to assert on the event detail
 *
 * @param eventName - The name of the CustomEvent
 * @param page - The E2EPage instance
 */
selectable.setUpEvents = async (eventName: string, page: E2EPage) => {
  await page.evaluate((eventName) => {
    document.addEventListener(eventName as any, ({ detail }: CustomEvent<Selection>) => {
      (window as SelectionEventTestWindow).eventDetail = detail;
    });
  }, eventName);
};