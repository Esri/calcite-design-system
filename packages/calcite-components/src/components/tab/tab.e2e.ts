import { newE2EPage } from "@stencil/core/testing";
import { defaults, renders, hidden } from "../../tests/commonTests";

describe("calcite-tab", () => {
  const tabHtml = "<calcite-tab>A tab</calcite-tab>";
  const tabHtmlSelected = "<calcite-tab selected>A tab</calcite-tab>";

  describe("renders", () => {
    renders(tabHtml, { display: "none", visible: false });
    renders(tabHtmlSelected, { display: "block", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tab");
  });

  describe("defaults", () => {
    defaults("calcite-tab", [
      { propertyName: "tab", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("when nested within calcite-tabs component", () => {
    it("should render with medium scale", async () => {
      const page = await newE2EPage({
        html: `<calcite-tabs>${tabHtml}</calcite-tabs>`,
      });
      const element = await page.find("calcite-tab");
      expect(await element.getProperty("scale")).toBe("m");
      expect(await (await element.getComputedStyle())["font-size"]).toEqual("14px");
      expect(await (await element.getComputedStyle())["line-height"]).toEqual("16px"); // 1rem
    });

    describe("when tabs scale is small", () => {
      it("should render with small scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="s">${tabHtml}</calcite-tabs>`,
        });
        const element = await page.find("calcite-tab");
        expect(await element.getProperty("scale")).toBe("s");
        expect(await (await element.getComputedStyle())["font-size"]).toEqual("12px");
        expect(await (await element.getComputedStyle())["line-height"]).toEqual("16px"); // 1rem
      });
    });

    describe("when tabs scale is large", () => {
      it("should render with large scale", async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="l">${tabHtml}</calcite-tabs>`,
        });
        const element = await page.find("calcite-tab");
        expect(await element.getProperty("scale")).toBe("l");
        expect(await (await element.getComputedStyle())["font-size"]).toEqual("16px");
        expect(await (await element.getComputedStyle())["line-height"]).toEqual("20px"); // 1.25rem
      });
    });
  });
});
