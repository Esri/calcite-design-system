import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, disabled } from "../../tests/commonTests";
import { GlobalTestProps } from "../../tests/utils";
import { CSS } from "../card/resources";

describe("calcite-card-group", () => {
  describe("renders", () => {
    renders("<calcite-card-group><calcite-card></calcite-card></calcite-card-group>", {
      display: "block",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-card-group");
  });

  describe("disabled", () => {
    disabled("<calcite-card-group><calcite-card></calcite-card></calcite-card-group>", {
      focusTarget: "child",
    });
  });

  describe("is accessible in selection mode none (default)", () => {
    accessible(
      html`<calcite-card-group label="test-label">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode single", () => {
    accessible(
      html` <calcite-card-group label="test-label" selection-mode="single">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode single-persist", () => {
    accessible(
      html`<calcite-card-group label="test-label" selection-mode="single-persist">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode multiple", () => {
    accessible(
      html`<calcite-card-group label="test-label" selection-mode="multiple">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("selection modes function as intended", () => {
    it("selection mode single allows one or no cards to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-card-group label="test-label" selection-mode="single">
          <calcite-card id="card-1" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-2" selected label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-3" label="test-label"><span slot="heading">Heading</span></calcite-card>
        </calcite-card-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-card-group");
      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card1CheckAction = await page.find(`#card-1 >>> .${CSS.checkboxWrapper}`);
      const card2CheckAction = await page.find(`#card-2 >>> .${CSS.checkboxWrapper}`);

      const cardGroupSelectSpy = await element.spyOnEvent("calciteCardGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      const cardSelectSpy1 = await card1.spyOnEvent("calciteCardSelect");
      const cardSelectSpy2 = await card2.spyOnEvent("calciteCardSelect");
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(0);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card2.id] });

      card1CheckAction.click();
      await page.waitForChanges();
      expect(await cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await cardSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card1.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card2.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });
    });

    it("selection mode single-persist allows one card to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-card-group label="test-label" selection-mode="single-persist">
          <calcite-card id="card-1" selected label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-2" label="test-label"><span slot="heading">Heading</span></calcite-card>
        </calcite-card-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-card-group");
      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card1CheckAction = await page.find(`#card-1 >>> .${CSS.checkboxWrapper}`);
      const card2CheckAction = await page.find(`#card-2 >>> .${CSS.checkboxWrapper}`);

      const cardGroupSelectSpy = await element.spyOnEvent("calciteCardGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card1.id] });

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card1.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card2.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card2.id] });
    });

    it("selection mode multiple allows none, one, or multiple to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-card-group label="test-label" selection-mode="multiple">
          <calcite-card id="card-1" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-2" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-3" label="test-label"><span slot="heading">Heading</span></calcite-card>
        </calcite-card-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-card-group");
      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card3 = await page.find("#card-3");
      const card1CheckAction = await page.find(`#card-1 >>> .${CSS.checkboxWrapper}`);
      const card2CheckAction = await page.find(`#card-2 >>> .${CSS.checkboxWrapper}`);
      const card3CheckAction = await page.find(`#card-3 >>> .${CSS.checkboxWrapper}`);

      const cardGroupSelectSpy = await element.spyOnEvent("calciteCardGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card1.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [card1.id, card2.id] });

      card3CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await assertSelectedItems(page, { expectedItemIds: [card1.id, card2.id, card3.id] });

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [card2.id, card3.id] });

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(5);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card3.id] });

      card3CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(6);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await assertSelectedItems(page, { expectedItemIds: [] });
    });
  });

  describe("focus and interaction function as intended", () => {
    it("navigation and selection with keyboard works as expected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-card-group label="test-label" selection-mode="multiple">
          <calcite-card id="card-1" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-2" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-3" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-4" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-5" label="test-label"><span slot="heading">Heading</span></calcite-card>
        </calcite-card-group>`,
      );

      const element = await page.find("calcite-card-group");
      const cardGroupSelectSpy = await element.spyOnEvent("calciteCardGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card3 = await page.find("#card-3");
      const card4 = await page.find("#card-4");
      const card5 = await page.find("#card-5");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card2.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card3.id);

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card5.id);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card5.id] });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await assertSelectedItems(page, { expectedItemIds: [card4.id, card5.id] });

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await assertSelectedItems(page, { expectedItemIds: [card5.id] });

      await page.keyboard.press("Home");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card5.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
    });
    it("navigation with keyboard works as expected when selection mode none (default)", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-card-group label="test-label">
          <calcite-card id="card-1" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-2" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-3" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-4" label="test-label"><span slot="heading">Heading</span></calcite-card>
          <calcite-card id="card-5" label="test-label"><span slot="heading">Heading</span></calcite-card>
        </calcite-card-group>`,
      );

      const element = await page.find("calcite-card-group");
      const cardGroupSelectSpy = await element.spyOnEvent("calciteCardGroupSelect");
      await assertSelectedItems.setUpEvents(page);

      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card3 = await page.find("#card-3");
      const card4 = await page.find("#card-4");
      const card5 = await page.find("#card-5");

      card1.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card2.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card3.id);

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card5.id);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await assertSelectedItems(page, { expectedItemIds: [] });

      await page.keyboard.press("Home");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card5.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
    });
  });

  it("selectedItems property is correctly populated at load when property is set on cards in DOM", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-card-group label="test-label" selection-mode="multiple">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card id="card-4" selected label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card id="card-5" selected label="test-label"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
    const element = await page.find("calcite-card-group");
    const card4 = await page.find("#card-4");
    const card5 = await page.find("#card-5");
    await page.waitForChanges();

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await assertSelectedItems(page, { expectedItemIds: [card4.id, card5.id] });
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
 * Test helper for selected calcite-card-group items. Expects items to have IDs to test against.
 *
 * Note: assertSelectedItems.setUpEvents must be called before using this method
 *
 * @param page
 * @param root0
 * @param root0.expectedItemIds
 */
async function assertSelectedItems(page: E2EPage, { expectedItemIds }: SelectedItemsAssertionOptions): Promise<void> {
  await page.waitForTimeout(100);
  const selectedItemIds = await page.evaluate(() => {
    const cardGroup = document.querySelector<HTMLCalciteCardGroupElement>("calcite-card-group");
    return cardGroup.selectedItems.map((item) => item.id);
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
    document.addEventListener("calciteCardGroupSelect", ({ detail }: CustomEvent<Selection>) => {
      (window as SelectionEventTestWindow).eventDetail = detail;
    });
  });
};
