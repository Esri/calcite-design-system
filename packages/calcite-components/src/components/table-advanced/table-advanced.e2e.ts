import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";

describe("calcite-table-advanced", () => {
  describe("renders", () => {
    renders(html`<calcite-table-advanced caption="Simple table"> </calcite-table-advanced>`, { display: "flex" });
  });

  describe("defaults", () => {
    defaults("calcite-table-advanced", [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-table-advanced", [
      {
        propertyName: "scale",
        value: "m",
      },
    ]);
  });

  describe("hidden", () => {
    hidden("calcite-table-advanced");
  });

  describe("accessible", () => {
    describe("is accessible simple", () => {
      accessible(html`<calcite-table-advanced caption="Simple table"> </calcite-table-advanced>`);
    });

    it("TODO", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-table-advanced></calcite-table-advanced>`);

      await page.waitForChanges();
      const element = await page.find("calcite-table-advanced");
      expect(element).not.toBeNull();
    });
  });
});
