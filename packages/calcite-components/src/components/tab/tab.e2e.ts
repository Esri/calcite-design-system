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
    const scales = [
      { name: "medium", scale: "m", fontSize: "14px", lineHeight: "16px" },
      { name: "small", scale: "s", fontSize: "12px", lineHeight: "16px" },
      { name: "large", scale: "l", fontSize: "16px", lineHeight: "20px" },
    ];

    scales.forEach(({ name, scale, fontSize, lineHeight }) => {
      it(`should render with ${name} scale`, async () => {
        const page = await newE2EPage({
          html: `<calcite-tabs scale="${scale}">${tabHtml}</calcite-tabs>`,
        });
        const element = await page.find("calcite-tab");
        expect(await element.getProperty("scale")).toBe(scale);

        const section = await page.find(`calcite-tab >>> section`);
        expect(await (await section.getComputedStyle())["font-size"]).toEqual(fontSize);
        expect(await (await section.getComputedStyle())["line-height"]).toEqual(lineHeight);
      });
    });
  });
});
