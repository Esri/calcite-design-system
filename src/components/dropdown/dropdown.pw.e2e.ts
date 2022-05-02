// my-component.e2e.ts
import { expect, Page } from "@playwright/test";

import { test, matchers } from "stencil-playwright";

expect.extend(matchers);

/**
 * Test helper for selected calcite-dropdown items. Expects items to have IDs to test against.
 */
async function assertSelectedItems(page: Page, expectedItemIds: string[]): Promise<void> {
  const selectedItemIds = await page.evaluate(() => {
    const dropdown = document.querySelector<HTMLCalciteDropdownElement>("calcite-dropdown");
    return dropdown.selectedItems.map((item) => item.id);
  });

  expect(selectedItemIds).toHaveLength(expectedItemIds.length);

  expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
}

test.describe("calcite-dropdown", async () => {
  test("renders", async ({ page }) => {
    await page.goto("/src/components/dropdown/test/renders.html");

    const element = page.locator("calcite-dropdown");
    expect(element).toBeDefined();
    expect(await element.getAttribute("calcite-hydrated")).toBe("");
  });

  test("renders multiple active items when group is in multi selection mode", async ({ page }) => {
    await page.goto("/src/components/dropdown/test/multiple-mode.html");
    const element = page.locator("calcite-dropdown");
    expect(element).toBeDefined();
    const trigger = page.locator("#trigger");
    const group1 = page.locator("calcite-dropdown-group[id='group-1']");
    const item1 = page.locator("calcite-dropdown-item[id='item-1']");
    const item2 = page.locator("calcite-dropdown-item[id='item-2']");
    const item3 = page.locator("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await page.spyOnEvent("calciteDropdownSelect");
    expect(await group1.getAttribute("selection-mode")).toBe("multi");
    await trigger.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-2"]);
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-2"]);
    await trigger.click();
    await page.waitForChanges();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3"]);
    expect(await item1.getAttribute("active")).toBe("");
    expect(await item2.getAttribute("active")).toBeNull();
    expect(await item3.getAttribute("active")).toBe("");
    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  test("renders just one active item when group is in single selection mode", async ({ page }) => {
    await page.goto("/src/components/dropdown/test/single-mode.html");
    const trigger = page.locator("#trigger");
    const group1 = page.locator("calcite-dropdown-group[id='group-1']");
    const item1 = page.locator("calcite-dropdown-item[id='item-1']");
    const item2 = page.locator("calcite-dropdown-item[id='item-2']");
    const item3 = page.locator("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await page.spyOnEvent("calciteDropdownSelect");
    expect(await group1.getAttribute("selection-mode")).toBe("single");
    await assertSelectedItems(page, ["item-2"]);
    await trigger.click();
    await page.waitForChanges();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-3"]);
    expect(await item1.getAttribute("active")).toBeNull();
    expect(await item2.getAttribute("active")).toBeNull();
    expect(await item3.getAttribute("active")).toBe("");
    expect(itemChangeSpy).toHaveReceivedEventTimes(2);
  });

  test("renders no active item when group is in none selection mode (and removes any active state set in dom on load)", async ({
    page
  }) => {
    await page.goto("/src/components/dropdown/test/none-mode.html");
    const trigger = page.locator("#trigger");
    const group1 = page.locator("calcite-dropdown-group[id='group-1']");
    const item1 = page.locator("calcite-dropdown-item[id='item-1']");
    const item2 = page.locator("calcite-dropdown-item[id='item-2']");
    const item3 = page.locator("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await page.spyOnEvent("calciteDropdownSelect");
    expect(await group1.getAttribute("selection-mode")).toBe("none");
    await assertSelectedItems(page, []);
    await trigger.click();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    await trigger.click();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    await trigger.click();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    expect(await item1.getAttribute("active")).toBeNull();
    expect(await item2.getAttribute("active")).toBeNull();
    expect(await item3.getAttribute("active")).toBeNull();
    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  test("renders the correct active state when parent contains groups of assorted selection modes", async ({ page }) => {
    await page.goto("/src/components/dropdown/test/assorted-modes.html");
    const trigger = page.locator("#trigger");
    const group1 = page.locator("calcite-dropdown-group[id='group-1']");
    const group2 = page.locator("calcite-dropdown-group[id='group-2']");
    const group3 = page.locator("calcite-dropdown-group[id='group-3']");
    const item1 = page.locator("calcite-dropdown-item[id='item-1']");
    const item2 = page.locator("calcite-dropdown-item[id='item-2']");
    const item3 = page.locator("calcite-dropdown-item[id='item-3']");
    const item4 = page.locator("calcite-dropdown-item[id='item-4']");
    const item5 = page.locator("calcite-dropdown-item[id='item-5']");
    const item6 = page.locator("calcite-dropdown-item[id='item-6']");
    const item7 = page.locator("calcite-dropdown-item[id='item-7']");
    const item8 = page.locator("calcite-dropdown-item[id='item-8']");
    const item9 = page.locator("calcite-dropdown-item[id='item-9']");
    const itemChangeSpy = await page.spyOnEvent("calciteDropdownSelect");
    expect(await group1.getAttribute("selection-mode")).toBe("multi");
    expect(await group2.getAttribute("selection-mode")).toBe("single");
    expect(await group3.getAttribute("selection-mode")).toBe("none");
    await assertSelectedItems(page, ["item-2", "item-5"]);

    await trigger.click();
    await page.waitForChanges();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-2", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item4.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-4"]);
    await trigger.click();
    await page.waitForChanges();
    await item6.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);
    await trigger.click();
    await page.waitForChanges();
    await item7.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);
    await trigger.click();
    await page.waitForChanges();
    await item9.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);

    expect(await item1.getAttribute("active")).toBe("");
    expect(await item2.getAttribute("active")).toBeNull();
    expect(await item3.getAttribute("active")).toBe("");
    expect(await item4.getAttribute("active")).toBeNull();
    expect(await item5.getAttribute("active")).toBeNull();
    expect(await item6.getAttribute("active")).toBe("");
    expect(await item7.getAttribute("active")).toBeNull();
    expect(await item8.getAttribute("active")).toBeNull();
    expect(await item9.getAttribute("active")).toBeNull();
    expect(itemChangeSpy).toHaveReceivedEventTimes(7);
  });
});
