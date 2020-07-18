import { defaults, renders } from "../../tests/commonTests";

import { CSS, DEFAULT_STORAGE_KEY_PREFIX } from "./resources";
import { newE2EPage } from "@stencil/core/testing";

describe("calcite-color-picker", () => {
  it("renders", async () => renders("calcite-color-picker"));

  it("has a default color", async () =>
    defaults("calcite-color-picker", [
      {
        propertyName: "value",
        defaultValue: "#007AC2"
      }
    ]));

  it("emits color selection change", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-color-picker></calcite-color-picker>");
    const picker = await page.find("calcite-color-picker");

    const spy = await picker.spyOnEvent("calciteColorPickerColorChange");

    picker.setProperty("value", "#FF00FF");
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  it("has backdoor color prop for advanced use cases", async () => {
    const page = await newE2EPage({
      html: "<calcite-color-picker></calcite-color-picker>"
    });
    const picker = await page.find("calcite-color-picker");

    expect(await picker.getProperty("color")).toBeTruthy();
  });

  describe("saving colors", () => {
    const storageId = "test-storage-id";

    async function clearStorage(): Promise<void> {
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${storageId}`;
      const page = await newE2EPage();
      await page.setContent(`<calcite-color-picker></calcite-color-picker>`);
      await page.evaluate((storageKey) => localStorage.removeItem(storageKey), [storageKey]);
    }

    beforeAll(clearStorage);
    afterAll(clearStorage);

    it("it allows saving unique colors", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-color-picker storage-id=${storageId}></calcite-color-picker>`);

      const picker = await page.find("calcite-color-picker");
      const saveColor = await page.find(`calcite-color-picker >>> .${CSS.addColor}`);
      await saveColor.click();

      const color1 = "#FF00FF";
      const color2 = "#BEEFEE";

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color1);
      await page.waitForChanges();
      await saveColor.click();

      picker.setProperty("value", color2);
      await page.waitForChanges();
      await saveColor.click();

      let savedColors = await page.findAll(`calcite-color-picker >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });

    it("it loads saved colors", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-color-picker storage-id=${storageId}></calcite-color-picker>`);
      await page.waitForChanges();

      const savedColors = await page.findAll(`calcite-color-picker >>> .${CSS.savedColors} calcite-color-swatch`);
      expect(savedColors).toHaveLength(3);
    });
  });
});
