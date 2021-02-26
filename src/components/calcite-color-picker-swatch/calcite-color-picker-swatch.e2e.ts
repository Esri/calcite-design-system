import { newE2EPage } from "@stencil/core/testing";
import { CSS } from "./resources";
import { accessible, defaults, reflects, renders } from "../../tests/commonTests";

describe("calcite-color-picker-swatch", () => {
  it("renders", () => renders("calcite-color-picker-swatch"));

  it("is accessible", async () => {
    await accessible("calcite-color-picker-swatch");
    await accessible(`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`);
    await accessible(`<calcite-color-picker-swatch color='#c0ffee'></calcite-color-picker-swatch>`);
    await accessible(`<calcite-color-picker-swatch active color='#c0ffee'></calcite-color-picker-swatch>`);
  });

  it("has defaults", () =>
    defaults("calcite-color-picker-swatch", [
      {
        propertyName: "active",
        defaultValue: false
      }
    ]));

  it("reflects", () =>
    reflects("calcite-color-picker-swatch", [
      {
        propertyName: "active",
        value: true
      }
    ]));

  describe("accepts CSS color strings", () => {
    it("supports rgb", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-picker-swatch color='rgb(255, 255, 255)'></calcite-color-picker-swatch>"
      });
      const swatch = await page.find(`calcite-color-picker-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 255, 255)");
    });

    it("supports keywords", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-picker-swatch color='chartreuse'></calcite-color-picker-swatch>"
      });
      const swatch = await page.find(`calcite-color-picker-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(127, 255, 0)");
    });

    it("supports hsl", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-picker-swatch color='hsl(120, 100%, 97%)'></calcite-color-picker-swatch>"
      });
      const swatch = await page.find(`calcite-color-picker-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(240, 255, 240)");
    });

    it("supports hex", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-picker-swatch color='#ff8200'></calcite-color-picker-swatch>"
      });
      const swatch = await page.find(`calcite-color-picker-swatch >>> .${CSS.swatch} rect`);

      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 130, 0)");
    });
  });

  it("has an active state", async () => {
    // this is probably better suited for a screenshot test

    const page = await newE2EPage({
      html: "<calcite-color-picker-swatch color'#beefee'></calcite-color-picker-swatch>"
    });
    const swatchRect = await page.find(`calcite-color-picker-swatch >>> .${CSS.swatch} rect`);

    expect(swatchRect.getAttribute("rx")).toBe("0");

    const swatch = await page.find(`calcite-color-picker-swatch`);
    swatch.setProperty("active", true);
    await page.waitForChanges();

    expect(swatchRect.getAttribute("rx")).toBe("100%");
  });
});
