import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden } from "../../tests/commonTests";
import { CSS as CHIP_CSS } from "../chip/resources";

describe("calcite-chip-group", () => {
  it("renders", async () =>
    renders("<calcite-chip-group><calcite-chip></calcite-chip><calcite-chip></calcite-chip></calcite-chip-group>", {
      display: "flex"
    }));

  it("honors hidden attribute", async () => hidden("calcite-chip-group"));

  describe("is accessible", () => {
    it("is accessible in selection mode none (default)", async () => {
      await accessible(
        html`<calcite-chip-group label="test-label">
          <calcite-chip value="test"></calcite-chip>
          <calcite-chip value="test"></calcite-chip>
        </calcite-chip-group>`
      );
    });

    it("is accessible in selection mode single", async () => {
      await accessible(
        html` <calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip value="test"></calcite-chip>
          <calcite-chip value="test"></calcite-chip>
        </calcite-chip-group>`
      );
    });

    it("is accessible in selection mode single-persist", async () => {
      await accessible(
        html`<calcite-chip-group label="test-label" selection-mode="single-persist">
          <calcite-chip value="test"></calcite-chip>
          <calcite-chip value="test"></calcite-chip>
        </calcite-chip-group>`
      );
    });

    it("is accessible in selection mode multiple", async () => {
      await accessible(
        html`<calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip value="test"></calcite-chip>
          <calcite-chip value="test"></calcite-chip>
        </calcite-chip-group>`
      );
    });
  });

  describe("selection modes function as intended", () => {
    it("selection mode single allows one or no chips to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip id="chip-1" value="test"></calcite-chip>
          <calcite-chip id="chip-2" selected value="test"></calcite-chip>
          <calcite-chip id="chip-3" value="test"></calcite-chip>
        </calcite-chip-group>`
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");

      const eventSpy = await element.spyOnEvent("calciteChipGroupSelect");
      const eventSpyChip1 = await chip1.spyOnEvent("calciteChipSelect");
      const eventSpyChip2 = await chip2.spyOnEvent("calciteChipSelect");

      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(eventSpyChip1).toHaveReceivedEventTimes(0);
      expect(eventSpyChip2).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip1.click();
      await page.waitForChanges();

      expect(await eventSpy).toHaveReceivedEventTimes(1);
      expect(await eventSpyChip1).toHaveReceivedEventTimes(1);
      expect(await eventSpyChip2).toHaveReceivedEventTimes(0);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(eventSpyChip1).toHaveReceivedEventTimes(1);
      expect(eventSpyChip2).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(eventSpyChip1).toHaveReceivedEventTimes(1);
      expect(eventSpyChip2).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
    });

    it("selection mode none (default) allows no chip to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label">
          <calcite-chip id="chip-1" value="test"></calcite-chip>
          <calcite-chip id="chip-2" value="test"></calcite-chip>
        </calcite-chip-group>`
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const eventSpy = await element.spyOnEvent("calciteChipGroupSelect");
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await chip1.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
    });

    it("selection mode single-persist allows one chip to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single-persist">
          <calcite-chip id="chip-1" selected value="test"></calcite-chip>
          <calcite-chip id="chip-2" value="test"></calcite-chip>
        </calcite-chip-group>`
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const eventSpy = await element.spyOnEvent("calciteChipGroupSelect");
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip1.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);
    });

    it("selection mode multiple allows none, one, or multiple to be selected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip id="chip-1" value="test"></calcite-chip>
          <calcite-chip id="chip-2" value="test"></calcite-chip>
          <calcite-chip id="chip-3" value="test"></calcite-chip>
        </calcite-chip-group>`
      );
      await page.waitForChanges();

      const element = await page.find("calcite-chip-group");
      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");

      const eventSpy = await element.spyOnEvent("calciteChipGroupSelect");
      expect(eventSpy).toHaveReceivedEventTimes(0);
      expect(await element.getProperty("selectedItems")).toEqual([]);

      await chip1.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);

      await chip3.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(await chip1.getProperty("selected")).toBe(true);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(3);

      await chip1.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(4);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(true);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(2);

      await chip2.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(5);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(true);
      expect(await element.getProperty("selectedItems")).toHaveLength(1);

      await chip3.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(6);
      expect(await chip1.getProperty("selected")).toBe(false);
      expect(await chip2.getProperty("selected")).toBe(false);
      expect(await chip3.getProperty("selected")).toBe(false);
      expect(await element.getProperty("selectedItems")).toEqual([]);
    });
  });

  describe("focus and interaction function as intended", () => {
    it("navigation with keyboard works as expected", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip id="chip-1" value="test"></calcite-chip>
          <calcite-chip id="chip-2" value="test"></calcite-chip>
          <calcite-chip id="chip-3" value="test"></calcite-chip>
          <calcite-chip id="chip-4" value="test"></calcite-chip>
          <calcite-chip id="chip-5" value="test"></calcite-chip>
        </calcite-chip-group>`
      );

      const chip1 = await page.find("#chip-1");
      const chip2 = await page.find("#chip-2");
      const chip3 = await page.find("#chip-3");
      const chip4 = await page.find("#chip-4");
      const chip5 = await page.find("#chip-5");

      await chip1.click();
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip1.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip2.id);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip3.id);

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip5.id);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(chip4.id);

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
          <calcite-chip closable id="chip-1" value="test"></calcite-chip>
          <calcite-chip closable id="chip-2" value="test"></calcite-chip>
          <calcite-chip closable id="chip-3" value="test"></calcite-chip>
          <calcite-chip closable id="chip-4" value="test"></calcite-chip>
          <calcite-chip closable id="chip-5" value="test"></calcite-chip>
        </calcite-chip-group>`
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
          <calcite-chip closable id="chip-1" value="test"></calcite-chip>
          <calcite-chip closable id="chip-2" value="test"></calcite-chip>
          <calcite-chip closable id="chip-3" value="test"></calcite-chip>
          <calcite-chip closable id="chip-4" value="test"></calcite-chip>
          <calcite-chip closable id="chip-5" value="test"></calcite-chip>
        </calcite-chip-group>`
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
        <calcite-chip id="chip-1" value="test"></calcite-chip>
        <calcite-chip id="chip-2" value="test"></calcite-chip>
        <calcite-chip id="chip-3" value="test"></calcite-chip>
        <calcite-chip selected id="chip-4" value="test"></calcite-chip>
        <calcite-chip selected id="chip-5" value="test"></calcite-chip>
      </calcite-chip-group>`
    );
    const element = await page.find("calcite-chip-group");
    await page.waitForChanges();

    expect(await element.getProperty("selectedItems")).toHaveLength(2);
  });
});
