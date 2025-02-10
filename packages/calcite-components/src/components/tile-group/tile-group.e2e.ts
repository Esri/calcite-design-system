import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, defaults, disabled, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { createSelectedItemsAsserter, findAll, isElementFocused } from "../../tests/utils";
import type { TileGroup } from "./tile-group";

describe("calcite-tile-group", () => {
  describe("accessible", () => {
    describe("accessible in selection-mode none", () => {
      accessible(html`
        <calcite-tile-group>
          <calcite-tile label="item-1"></calcite-tile>
          <calcite-tile label="item-2"></calcite-tile>
        </calcite-tile-group>
      `);
    });
    describe("accessible in selection-mode single", () => {
      accessible(html`
        <calcite-tile-group selection-mode="single">
          <calcite-tile label="item-1"></calcite-tile>
          <calcite-tile label="item-2"></calcite-tile>
        </calcite-tile-group>
      `);
    });
    describe("accessible in selection-mode single-persist", () => {
      accessible(html`
        <calcite-tile-group selection-mode="single-persist">
          <calcite-tile label="item-1"></calcite-tile>
          <calcite-tile label="item-2"></calcite-tile>
        </calcite-tile-group>
      `);
    });
    describe("accessible in selection-mode multiple", () => {
      accessible(html`
        <calcite-tile-group selection-mode="multiple">
          <calcite-tile label="item-1"></calcite-tile>
          <calcite-tile label="item-2"></calcite-tile>
        </calcite-tile-group>
      `);
    });
    describe("accessible as links", () => {
      accessible(html`
        <calcite-tile-group>
          <calcite-tile label="item-1" href="#"></calcite-tile>
          <calcite-tile label="item-2" href="#"></calcite-tile>
        </calcite-tile-group>
      `);
    });
  });

  describe("defaults", () => {
    defaults("calcite-tile-group", [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selectionAppearance", defaultValue: "icon" },
      { propertyName: "selectionMode", defaultValue: "none" },
    ]);

    it("selectedItems property is set correctly at load when tiles include the selected attribute in initial HTML", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="multiple">
          <calcite-tile label="test-label"></calcite-tile>
          <calcite-tile label="test-label"></calcite-tile>
          <calcite-tile label="test-label"></calcite-tile>
          <calcite-tile id="item-4" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-5" selected label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      const item4 = await page.find("#item-4");
      const item5 = await page.find("#item-5");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      await selectedItemAsserter([item4.id, item5.id]);
    });
  });

  describe("disabled", () => {
    disabled(
      html` <calcite-tile-group>
        <calcite-tile></calcite-tile>
        <calcite-tile></calcite-tile>
        <calcite-tile></calcite-tile>
      </calcite-tile-group>`,
      { focusTarget: "child" },
    );
  });

  describe("hidden", () => {
    hidden("calcite-tile-group");
  });

  describe("reflects", () => {
    reflects("calcite-tile-group", [
      { propertyName: "layout", value: "horizontal" },
      { propertyName: "scale", value: "m" },
      { propertyName: "selectionAppearance", value: "icon" },
      { propertyName: "selectionMode", value: "none" },
    ]);
  });

  describe("renders", () => {
    renders("calcite-tile-group", { display: "inline-block" });
  });

  describe("keyboard", () => {
    it("focuses tiles with the tab key and arrow keys and allows selection with the enter and space key", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="multiple">
          <calcite-tile id="item-1" label="test-label"></calcite-tile>
          <calcite-tile id="item-2" label="test-label"></calcite-tile>
          <calcite-tile id="item-3" label="test-label"></calcite-tile>
          <calcite-tile id="item-4" label="test-label"></calcite-tile>
          <calcite-tile id="item-5" label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      const element = await page.find("calcite-tile-group");
      const groupSelectSpy = await element.spyOnEvent("calciteTileGroupSelect");
      const item1 = await page.find("#item-1");
      const item4 = await page.find("#item-4");
      const item5 = await page.find("#item-5");

      await item1.click();
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-1")).toBe(true);

      await selectedItemAsserter([item1.id]);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-2")).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-3")).toBe(true);

      await page.keyboard.press("End");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-5")).toBe(true);

      await page.keyboard.press("Space");
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(2);

      await selectedItemAsserter([item1.id, item5.id]);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-4")).toBe(true);

      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(3);

      await selectedItemAsserter([item1.id, item4.id, item5.id]);

      await page.keyboard.press("Space");
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(4);

      await selectedItemAsserter([item1.id, item5.id]);

      await page.keyboard.press("Home");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-1")).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-5")).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#item-1")).toBe(true);
    });
  });

  describe("prop passing", () => {
    it("tiles receive parent scale prop on initial load and when scale attribute is mutated", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group scale="s">
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
          <calcite-tile></calcite-tile>
        </calcite-tile-group>
      `);

      let tiles = await findAll(page, "calcite-tile");
      tiles.forEach((tile) => {
        expect(tile.getAttribute("scale")).toBe("s");
      });

      await page.$eval("calcite-tile-group", (element: TileGroup["el"]) => element.setAttribute("scale", "l"));
      await page.waitForChanges();

      tiles = await findAll(page, "calcite-tile");
      tiles.forEach((tile) => {
        expect(tile.getAttribute("scale")).toBe("l");
      });
    });
  });

  describe("selection modes", () => {
    it("none selection mode (default) allows no item to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label">
          <calcite-tile id="item-1" label="test-label"></calcite-tile>
          <calcite-tile id="item-2" label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      const element = await page.find("calcite-tile-group");
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const itemGroupSelectSpy = await element.spyOnEvent("calciteTileGroupSelect");

      expect(itemGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await selectedItemAsserter([]);
      await item1.click();
      await page.waitForChanges();

      expect(itemGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await selectedItemAsserter([]);

      await item2.click();
      await page.waitForChanges();

      expect(itemGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await selectedItemAsserter([]);

      await item2.click();
      await page.waitForChanges();

      expect(itemGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await selectedItemAsserter([]);
    });

    it("single selection-mode allows only 1 item to be selected and allows deselecting", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="single">
          <calcite-tile id="item-1" label="test-label"></calcite-tile>
          <calcite-tile id="item-2" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-3" label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      const element = await page.find("calcite-tile-group");
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const groupSelectSpy = await element.spyOnEvent("calciteTileGroupSelect");
      const tileSelectSpy1 = await item1.spyOnEvent("calciteTileSelect");
      const tileSelectSpy2 = await item2.spyOnEvent("calciteTileSelect");

      expect(groupSelectSpy).toHaveReceivedEventTimes(0);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(0);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(0);

      await selectedItemAsserter([item2.id]);

      await item1.click();
      await page.waitForChanges();

      expect(await groupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await tileSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(false);

      await selectedItemAsserter([item1.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(2);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item2.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(3);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(2);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);

      await selectedItemAsserter([]);
    });

    it("single-persist selection-mode allows only 1 item to be selected and disallows deselecting", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="single-persist">
          <calcite-tile id="item-1" label="test-label"></calcite-tile>
          <calcite-tile id="item-2" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-3" label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      const element = await page.find("calcite-tile-group");
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const groupSelectSpy = await element.spyOnEvent("calciteTileGroupSelect");
      const tileSelectSpy1 = await item1.spyOnEvent("calciteTileSelect");
      const tileSelectSpy2 = await item2.spyOnEvent("calciteTileSelect");

      expect(groupSelectSpy).toHaveReceivedEventTimes(0);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(0);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(0);

      await selectedItemAsserter([item2.id]);

      await item1.click();
      await page.waitForChanges();

      expect(await groupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await tileSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(false);

      await selectedItemAsserter([item1.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(2);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item2.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(2);
      expect(tileSelectSpy1).toHaveReceivedEventTimes(1);
      expect(tileSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item2.id]);
    });

    it("multiple selection-mode allows multiple items to be selected and allows deselecting", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="multiple">
          <calcite-tile id="item-1" label="test-label"></calcite-tile>
          <calcite-tile id="item-2" label="test-label"></calcite-tile>
          <calcite-tile id="item-3" label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-tile-group",
        "calciteTileGroupSelect",
      );

      const element = await page.find("calcite-tile-group");
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const item3 = await page.find("#item-3");
      const groupSelectSpy = await element.spyOnEvent("calciteTileGroupSelect");

      expect(groupSelectSpy).toHaveReceivedEventTimes(0);

      await selectedItemAsserter([]);

      await item1.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await item3.getProperty("selected")).toBe(false);

      await selectedItemAsserter([item1.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(true);
      expect(await item3.getProperty("selected")).toBe(false);

      await selectedItemAsserter([item1.id, item2.id]);

      await item3.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await item1.getProperty("selected")).toBe(true);
      expect(await item2.getProperty("selected")).toBe(true);
      expect(await item3.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item1.id, item2.id, item3.id]);

      await item1.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(true);
      expect(await item3.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item2.id, item3.id]);

      await item2.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(5);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await item3.getProperty("selected")).toBe(true);

      await selectedItemAsserter([item3.id]);

      await item3.click();
      await page.waitForChanges();

      expect(groupSelectSpy).toHaveReceivedEventTimes(6);
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await item3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await selectedItemAsserter([]);
    });

    it("single selection mode allows only one tile with selected attribute", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="single">
          <calcite-tile id="item-1" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-2" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-3" selected label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const item3 = await page.find("#item-3");
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await item3.getProperty("selected")).toBe(true);
    });

    it("single-persist selection mode allows only one tile with selected attribute", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-tile-group label="test-label" selection-mode="single-persist">
          <calcite-tile id="item-1" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-2" selected label="test-label"></calcite-tile>
          <calcite-tile id="item-3" selected label="test-label"></calcite-tile>
        </calcite-tile-group>
      `);
      await page.waitForChanges();
      const item1 = await page.find("#item-1");
      const item2 = await page.find("#item-2");
      const item3 = await page.find("#item-3");
      expect(await item1.getProperty("selected")).toBe(false);
      expect(await item2.getProperty("selected")).toBe(false);
      expect(await item3.getProperty("selected")).toBe(true);
    });
  });
});
