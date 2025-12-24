import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "../../../support/formatting";
import { accessible } from "../../tests/commonTests";
import { defaults, reflects, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("calcite-table-advanced", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-table-advanced"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-table-advanced"),
      [
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-table-advanced"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-table-advanced"), {
      display: "flex",
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-table-advanced"));
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
