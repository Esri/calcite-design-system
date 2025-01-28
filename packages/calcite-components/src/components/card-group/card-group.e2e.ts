// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, disabled, themed } from "../../tests/commonTests";
import { CSS } from "../card/resources";
import { createSelectedItemsAsserter } from "../../tests/utils";

describe("calcite-card-group", () => {
  describe("renders", () => {
    renders("<calcite-card-group label='test-label'><calcite-card></calcite-card></calcite-card-group>", {
      display: "block",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-card-group");
  });

  describe("disabled", () => {
    disabled("<calcite-card-group><calcite-card></calcite-card></calcite-card-group>", { focusTarget: "none" });
  });

  describe("is accessible in selection mode none (default)", () => {
    accessible(
      html`<calcite-card-group label="test-label-group">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label-2"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode single", () => {
    accessible(
      html` <calcite-card-group label="test-label-group" selection-mode="single">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label-2"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode single-persist", () => {
    accessible(
      html`<calcite-card-group label="test-label-group" selection-mode="single-persist">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label-2"><span slot="heading">Heading</span></calcite-card>
      </calcite-card-group>`,
    );
  });

  describe("is accessible in selection mode multiple", () => {
    accessible(
      html`<calcite-card-group label="test-label-group" selection-mode="multiple">
        <calcite-card label="test-label"><span slot="heading">Heading</span></calcite-card>
        <calcite-card label="test-label-2"><span slot="heading">Heading</span></calcite-card>
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
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-card-group",
        "calciteCardGroupSelect",
      );

      const cardSelectSpy1 = await card1.spyOnEvent("calciteCardSelect");
      const cardSelectSpy2 = await card2.spyOnEvent("calciteCardSelect");
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(0);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card2.id]);

      card1CheckAction.click();
      await page.waitForChanges();
      expect(await cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await cardSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card1.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card2.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(cardSelectSpy1).toHaveReceivedEventTimes(1);
      expect(cardSelectSpy2).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);
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
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-card-group",
        "calciteCardGroupSelect",
      );

      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card1.id]);

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card1.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card2.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card2.id]);
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
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-card-group",
        "calciteCardGroupSelect",
      );

      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card1.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([card1.id, card2.id]);

      card3CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await card1.getProperty("selected")).toBe(true);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await selectedItemAsserter([card1.id, card2.id, card3.id]);

      card1CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(true);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([card2.id, card3.id]);

      card2CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(5);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card3.id]);

      card3CheckAction.click();
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(6);
      expect(await card1.getProperty("selected")).toBe(false);
      expect(await card2.getProperty("selected")).toBe(false);
      expect(await card3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);
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
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-card-group",
        "calciteCardGroupSelect",
      );

      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card3 = await page.find("#card-3");
      const card4 = await page.find("#card-4");
      const card5 = await page.find("#card-5");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);

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
      await selectedItemAsserter([card5.id]);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([card4.id, card5.id]);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([card5.id]);

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
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-card-group",
        "calciteCardGroupSelect",
      );

      const card1 = await page.find("#card-1");
      const card2 = await page.find("#card-2");
      const card3 = await page.find("#card-3");
      const card4 = await page.find("#card-4");
      const card5 = await page.find("#card-5");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);

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
      await selectedItemAsserter([]);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(card4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(cardGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);

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
    const selectedItemAsserter = await createSelectedItemsAsserter(
      page,
      "calcite-card-group",
      "calciteCardGroupSelect",
    );

    await page.waitForChanges();

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
    await selectedItemAsserter([card4.id, card5.id]);
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-card-group", {
        "--calcite-card-group-space": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "gap",
        },
      });
    });
    describe("deprecated", () => {
      themed("calcite-card-group", {
        "--calcite-card-group-gap": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "gap",
        },
      });
    });
  });
});
