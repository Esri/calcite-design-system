import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, disabled } from "../../tests/commonTests";
import { GlobalTestProps, waitForTimeout } from "../../tests/utils";
import { CSS as CHIP_CSS } from "../chip/resources";

describe("calcite-chip-group", () => {
  describe("renders", () => {
    renders("<calcite-chip-group><calcite-chip></calcite-chip></calcite-chip-group>", {
      display: "flex",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-chip-group");
  });

  describe("disabled", () => {
    disabled("<calcite-chip-group><calcite-chip></calcite-chip></calcite-chip-group>", {
      focusTarget: "child",
    });
  });

  describe("is accessible in selection mode none (default)", () => {
    accessible(
      html`<calcite-chip-group label="test-label">
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
      </calcite-chip-group>`,
    );
  });

  describe("is accessible in selection mode single", () => {
    accessible(
      html` <calcite-chip-group label="test-label" selection-mode="single">
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
      </calcite-chip-group>`,
    );
  });

  describe("is selection mode single persists", () => {
    accessible(
      html`<calcite-chip-group label="test-label" selection-mode="single-persist">
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
      </calcite-chip-group>`,
    );
  });

  describe("is accessible in selection mode multiple", () => {
    accessible(
      html`<calcite-chip-group label="test-label" selection-mode="multiple">
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
      </calcite-chip-group>`,
    );
  });

  describe("selection modes function as intended", () => {
    it("selection mode single allows one or no chips to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip id="chip-2" selected label="test-label"></calcite-chip>
          <calcite-chip id="chip-3" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");

      const chipGroupSelectSpy = await element.spyOnEvent("calciteChipGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      const chipSelectSpy1 = await chip1.spyOnEvent("calciteChipSelect");
      const chipSelectSpy2 = await chip2.spyOnEvent("calciteChipSelect");
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(chipSelectSpy1).toHaveReceivedEventTimes(0);
      expect(chipSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip2.id] });

      await chip1.click();
      await page.waitForChanges();

      expect(await chipGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await chipSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await chipSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(chipSelectSpy1).toHaveReceivedEventTimes(1);
      expect(chipSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip2.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(chipSelectSpy1).toHaveReceivedEventTimes(1);
      expect(chipSelectSpy2).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });
    });

    it("selection mode none (default) allows no chip to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label">
          <calcite-chip id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip id="chip-2" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chipGroupSelectSpy = await element.spyOnEvent("calciteChipGroupSelect");
      await assertSelectedItems.setUpEvents(page);
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await chip1.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });
    });

    it("selection mode single-persist allows one chip to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single-persist">
          <calcite-chip id="chip-1" selected label="test-label"></calcite-chip>
          <calcite-chip id="chip-2" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chipGroupSelectSpy = await element.spyOnEvent("calciteChipGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id] });

      await chip1.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip2.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip2.id] });
    });

    it("selection mode multiple allows none, one, or multiple to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip id="chip-2" label="test-label"></calcite-chip>
          <calcite-chip id="chip-3" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");

      const chipGroupSelectSpy = await element.spyOnEvent("calciteChipGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await chip1.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id, chip2.id] });

      await chip3.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id, chip2.id, chip3.id] });

      await chip1.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [chip2.id, chip3.id] });

      await chip2.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(5);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip3.id] });

      await chip3.click();
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(6);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });
    });
  });

  describe("focus and interaction function as intended", () => {
    it("navigation with keyboard works as expected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip id="chip-2" label="test-label"></calcite-chip>
          <calcite-chip id="chip-3" label="test-label"></calcite-chip>
          <calcite-chip id="chip-4" label="test-label"></calcite-chip>
          <calcite-chip id="chip-5" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );

      const element = await page.find("calcite-chip-group");
      const chipGroupSelectSpy = await element.spyOnEvent("calciteChipGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");
      const chip4 = await page.find("#chip-4");
      const chip5 = await page.find("#chip-5");

      await chip1.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id] });

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip2.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip3.id);

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip5.id);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id, chip5.id] });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id, chip4.id, chip5.id] });

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(chipGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [chip1.id, chip5.id] });

      await page.keyboard.press("Home");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip5.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);
    });

    it("when chips are selectable, and a chip is focused, using tab will focus the close button", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip closable id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-2" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-3" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-4" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-5" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );

      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");
      const chip4 = await page.find("#chip-4");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.$eval(`#${chip1.id}`, (el) => el.shadowRoot.activeElement.className)).toEqual(CHIP_CSS.close);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip2.id);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.$eval(`#${chip2.id}`, (el) => el.shadowRoot.activeElement.className)).toEqual(CHIP_CSS.close);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip3.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip4.id);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.$eval(`#${chip4.id}`, (el) => el.shadowRoot.activeElement.className)).toEqual(CHIP_CSS.close);
    });

    it("when closing a chip, focus the previous chip, or if the first chip is closed, focus the 'next first chip'", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip closable id="chip-1" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-2" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-3" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-4" label="test-label"></calcite-chip>
          <calcite-chip closable id="chip-5" label="test-label"></calcite-chip>
        </calcite-chip-group>`,
      );

      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");
      const chip4 = await page.find("#chip-4");
      const chip5 = await page.find("#chip-5");
      const closeButton1 = await page.find(`#${chip1.id} >>> .${CHIP_CSS.close}`);
      const closeButton3 = await page.find(`#${chip3.id} >>> .${CHIP_CSS.close}`);
      const closeButton5 = await page.find(`#${chip5.id} >>> .${CHIP_CSS.close}`);

      await closeButton3.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip2.id);

      await closeButton1.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip2.id);

      await closeButton5.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip4.id);
    });
  });

  it("selectedItems property is correctly populated at load when property is set on chips in DOM", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-chip-group label="test-label" selection-mode="multiple">
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip label="test-label"></calcite-chip>
        <calcite-chip id="chip-4" selected label="test-label"></calcite-chip>
        <calcite-chip id="chip-5" selected label="test-label"></calcite-chip>
      </calcite-chip-group>`,
    );
    const element = await page.find("calcite-chip-group");
    const chip4 = await page.find("#chip-4");
    const chip5 = await page.find("#chip-5");
    await page.waitForChanges();

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await assertSelectedItems(page, { expectedItemIds: [chip4.id, chip5.id] });
  });
});

// Borrowed from Dropdown until a generic utility is set up.
interface SelectedItemsAssertionOptions {
  /**
   * IDs from items to assert selection
   */
  expectedItemIds: string[];
}

/**
 * Test helper for selected calcite-chip-group items. Expects items to have IDs to test against.
 *
 * Note: assertSelectedItems.setUpEvents must be called before using this method
 *
 * @param page
 * @param root0
 * @param root0.expectedItemIds
 */
async function assertSelectedItems(page: E2EPage, { expectedItemIds }: SelectedItemsAssertionOptions): Promise<void> {
  waitForTimeout(100);
  const selectedItemIds = await page.evaluate(() => {
    const chipGroup = document.querySelector<HTMLCalciteChipGroupElement>("calcite-chip-group");
    return chipGroup.selectedItems.map((item) => item.id);
  });

  expect(selectedItemIds).toHaveLength(expectedItemIds.length);

  expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
}

type SelectionEventTestWindow = GlobalTestProps<{ eventDetail: Selection }>;

/**
 * Helper to wire up the page to assert on the event detail
 *
 * @param page
 */
assertSelectedItems.setUpEvents = async (page: E2EPage) => {
  await page.evaluate(() => {
    document.addEventListener("calciteChipGroupSelect", ({ detail }: CustomEvent<Selection>) => {
      (window as SelectionEventTestWindow).eventDetail = detail;
    });
  });
};
