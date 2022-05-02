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
    await page.goto("/src/components/dropdown/test/multiple-active.html");
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

  /*
  it("renders just one active item when group is in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-dropdown>
      <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1" selection-mode="single">
        <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" active> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
    expect(group1).toEqualAttribute("selection-mode", "single");
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

    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(2);
  });

  it("renders no active item when group is in none selection mode (and removes any active state set in dom on load)", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-dropdown>
      <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1" selection-mode="none">
        <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" active> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
    expect(group1).toEqualAttribute("selection-mode", "none");
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
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  it("renders the correct active state when parent contains groups of assorted selection modes", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-dropdown>
      <calcite-button slot="dropdown-trigger" id="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1" selection-mode="multi">
        <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" active> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group id="group-2" selection-mode="single">
        <calcite-dropdown-item id="item-4"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-5" active> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-6"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group id="group-3" selection-mode="none">
        <calcite-dropdown-item id="item-7"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-8"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-9"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const group2 = await element.find("calcite-dropdown-group[id='group-2']");
    const group3 = await element.find("calcite-dropdown-group[id='group-3']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const item4 = await element.find("calcite-dropdown-item[id='item-4']");
    const item5 = await element.find("calcite-dropdown-item[id='item-5']");
    const item6 = await element.find("calcite-dropdown-item[id='item-6']");
    const item7 = await element.find("calcite-dropdown-item[id='item-7']");
    const item8 = await element.find("calcite-dropdown-item[id='item-8']");
    const item9 = await element.find("calcite-dropdown-item[id='item-9']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");

    expect(group1).toEqualAttribute("selection-mode", "multi");
    expect(group2).toEqualAttribute("selection-mode", "single");
    expect(group3).toEqualAttribute("selection-mode", "none");
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

    expect(item1).toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(item4).not.toHaveAttribute("active");
    expect(item5).not.toHaveAttribute("active");
    expect(item6).toHaveAttribute("active");
    expect(item7).not.toHaveAttribute("active");
    expect(item8).not.toHaveAttribute("active");
    expect(item9).not.toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(7);
  });

  */
});
