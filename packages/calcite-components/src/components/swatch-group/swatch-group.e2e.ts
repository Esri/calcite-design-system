import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, disabled } from "../../tests/commonTests";
import { createSelectedItemsAsserter } from "../../tests/utils/puppeteer";

describe("calcite-swatch-group", () => {
  describe("renders", () => {
    renders("<calcite-swatch-group><calcite-swatch></calcite-swatch></calcite-swatch-group>", {
      display: "block",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-swatch-group");
  });

  describe("disabled", () => {
    disabled("<calcite-swatch-group><calcite-swatch></calcite-swatch></calcite-swatch-group>", {
      focusTarget: "child",
    });
  });

  describe("is accessible in selection mode none (default)", () => {
    accessible(
      html`<calcite-swatch-group label="test-label">
        <calcite-swatch label="test-label"></calcite-swatch>
        <calcite-swatch label="test-label"></calcite-swatch>
      </calcite-swatch-group>`,
    );
  });

  describe("is accessible in selection mode single", () => {
    accessible(
      html` <calcite-swatch-group label="test-label" selection-mode="single">
        <calcite-swatch label="test-label"></calcite-swatch>
        <calcite-swatch label="test-label"></calcite-swatch>
      </calcite-swatch-group>`,
    );
  });

  describe("is selection mode single persists", () => {
    accessible(
      html`<calcite-swatch-group label="test-label" selection-mode="single-persist">
        <calcite-swatch label="test-label"></calcite-swatch>
        <calcite-swatch label="test-label"></calcite-swatch>
      </calcite-swatch-group>`,
    );
  });

  describe("is accessible in selection mode multiple", () => {
    accessible(
      html`<calcite-swatch-group label="test-label" selection-mode="multiple">
        <calcite-swatch label="test-label"></calcite-swatch>
        <calcite-swatch label="test-label"></calcite-swatch>
      </calcite-swatch-group>`,
    );
  });

  describe("selection modes function as intended", () => {
    it("selection mode single allows one or no swatches to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="single">
          <calcite-swatch id="swatch-1" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-2" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-3" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-swatch-group");
      const swatch1 = await page.find("#swatch-1");
      const swatch2 = await page.find("#swatch-2");

      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch1.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch2.spyOnEvent("calciteSwatchSelect");
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch2.id]);

      await swatch1.click();
      await page.waitForChanges();

      expect(await swatchGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await swatchSelectSpy1).toHaveReceivedEventTimes(1);
      expect(await swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await swatch1.getProperty("selected")).toBe(true);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch1.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(1);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(1);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch2.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(1);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(2);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);
    });

    it("selection mode none (default) allows no swatch to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label">
          <calcite-swatch id="swatch-1" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-2" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-swatch-group");
      const swatch1 = await page.find("#swatch-1");
      const swatch2 = await page.find("#swatch-2");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);

      await swatch1.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);
    });

    it("selection mode single-persist allows one swatch to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="single-persist">
          <calcite-swatch id="swatch-1" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-2" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-swatch-group");
      const swatch1 = await page.find("#swatch-1");
      const swatch2 = await page.find("#swatch-2");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch1.id]);

      await swatch1.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await swatch1.getProperty("selected")).toBe(true);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch1.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch2.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch2.id]);
    });

    it("selection mode multiple allows none, one, or multiple to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch id="swatch-1" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-2" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-3" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      await page.waitForChanges();

      const element = await page.find("calcite-swatch-group");
      const swatch1 = await page.find("#swatch-1");
      const swatch2 = await page.find("#swatch-2");
      const swatch3 = await page.find("#swatch-3");

      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);

      await swatch1.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(1);
      expect(await swatch1.getProperty("selected")).toBe(true);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await swatch3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch1.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await swatch1.getProperty("selected")).toBe(true);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await swatch3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch1.id, swatch2.id]);

      await swatch3.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await swatch1.getProperty("selected")).toBe(true);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await swatch3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await selectedItemAsserter([swatch1.id, swatch2.id, swatch3.id]);

      await swatch1.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(true);
      expect(await swatch3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch2.id, swatch3.id]);

      await swatch2.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(5);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await swatch3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch3.id]);

      await swatch3.click();
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(6);
      expect(await swatch1.getProperty("selected")).toBe(false);
      expect(await swatch2.getProperty("selected")).toBe(false);
      expect(await swatch3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
      await selectedItemAsserter([]);
    });
  });

  describe("focus and interaction function as intended", () => {
    it("navigation with keyboard works as expected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch id="swatch-1" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-2" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-3" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );

      const element = await page.find("calcite-swatch-group");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatch1 = await page.find("#swatch-1");
      const swatch2 = await page.find("#swatch-2");
      const swatch3 = await page.find("#swatch-3");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");

      await swatch1.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch1.id);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch1.id]);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch2.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch3.id);

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch5.id);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(2);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch1.id, swatch5.id]);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch4.id);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(3);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await selectedItemAsserter([swatch1.id, swatch4.id, swatch5.id]);

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(4);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch1.id, swatch5.id]);

      await page.keyboard.press("Home");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch1.id);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch5.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch1.id);
    });

    it("selectedItems property is correctly populated at load when property is set on swatches in DOM", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" selected label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );
      await page.waitForChanges();

      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch4.id, swatch5.id]);
    });
  });

  describe("programmatically selecting Swatches", () => {
    it("programmatically setting selected on a swatch should update the component but not emit public events", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="single">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch5.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);

      await swatch5.toggleAttribute("selected", true);
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch5.id]);
    });

    it("programmatically setting selected on a swatch in single-persist should update the component but not emit public events", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="single-persist">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch5.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);

      swatch4.removeAttribute("selected");
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);

      swatch5.toggleAttribute("selected", true);
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch5.id]);

      swatch4.toggleAttribute("selected", true);
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);
    });
    it("programmatically setting selected on a swatch in multiple should update the component but not emit public events", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch5.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);

      swatch5.toggleAttribute("selected", true);
      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch4.id, swatch5.id]);
    });
  });

  describe("updating component after page load", () => {
    it("should update selected items without emitting event if swatches are added after page load in multiple", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" selected label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch5.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch4.id, swatch5.id]);

      await page.evaluate(() => {
        const group = document.querySelector("calcite-swatch-group");
        const newSwatch = document.createElement("calcite-swatch");
        newSwatch.id = "swatch-6";
        newSwatch.selected = true;
        group.appendChild(newSwatch);
      });

      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);
      await selectedItemAsserter([swatch4.id, swatch5.id, "swatch-6"]);
    });

    it("should update selected items without emitting event if swatches are added after page load in single", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-swatch-group label="test-label" selection-mode="single">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);

      await page.evaluate(() => {
        const group = document.querySelector("calcite-swatch-group");
        const newSwatch = document.createElement("calcite-swatch");
        newSwatch.id = "swatch-6";
        newSwatch.selected = true;
        group.appendChild(newSwatch);
      });

      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter(["swatch-6"]);
    });

    it("should update selected items without emitting event if swatches are removed after page load", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-swatch-group label="test-label" selection-mode="multiple">
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-4" selected label="test-label"></calcite-swatch>
          <calcite-swatch id="swatch-5" selected label="test-label"></calcite-swatch>
        </calcite-swatch-group>`,
      );
      const element = await page.find("calcite-swatch-group");
      const swatch4 = await page.find("#swatch-4");
      const swatch5 = await page.find("#swatch-5");
      const swatchGroupSelectSpy = await element.spyOnEvent("calciteSwatchGroupSelect");
      const selectedItemAsserter = await createSelectedItemsAsserter(
        page,
        "calcite-swatch-group",
        "calciteSwatchGroupSelect",
      );

      const swatchSelectSpy1 = await swatch4.spyOnEvent("calciteSwatchSelect");
      const swatchSelectSpy2 = await swatch5.spyOnEvent("calciteSwatchSelect");
      await page.waitForChanges();

      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);
      await selectedItemAsserter([swatch4.id, swatch5.id]);

      await page.evaluate(() => {
        document.querySelector("calcite-swatch:last-child").remove();
      });

      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
      await selectedItemAsserter([swatch4.id]);

      await page.evaluate(() => {
        document.querySelector("calcite-swatch:last-child").remove();
      });

      await page.waitForChanges();
      expect(swatchGroupSelectSpy).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy1).toHaveReceivedEventTimes(0);
      expect(swatchSelectSpy2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(0);
      await selectedItemAsserter([]);
    });
  });
});
