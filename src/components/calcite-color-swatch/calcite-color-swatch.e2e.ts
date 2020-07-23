import { newE2EPage } from "@stencil/core/testing";
import { CSS } from "./resources";
import { defaults, reflects, renders } from "../../tests/commonTests";

describe("calcite-color-swatch", () => {
  it("renders", () => renders("calcite-color-swatch"));

  it("has defaults", () =>
    defaults("calcite-color-swatch", [
      {
        propertyName: "active",
        defaultValue: false
      }
    ]));

  it("reflects", () =>
    reflects("calcite-color-swatch", [
      {
        propertyName: "active",
        value: true
      }
    ]));

  describe("has accepts CSS color strings", () => {
    it("supports rgb", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-swatch color='rgb(255, 255, 255)'></calcite-color-swatch>"
      });
      const swatch = await page.find(`calcite-color-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 255, 255)");
    });

    it("supports keywords", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-swatch color='chartreuse'></calcite-color-swatch>"
      });
      const swatch = await page.find(`calcite-color-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(127, 255, 0)");
    });

    it("supports hsl", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-swatch color='hsl(120, 100%, 97%)'></calcite-color-swatch>"
      });
      const swatch = await page.find(`calcite-color-swatch >>> .${CSS.swatch} rect`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(240, 255, 240)");
    });

    it("supports hex", async () => {
      const page = await newE2EPage({
        html: "<calcite-color-swatch color='#ff8200'></calcite-color-swatch>"
      });
      const swatch = await page.find(`calcite-color-swatch >>> .${CSS.swatch} rect`);

      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 130, 0)");
    });
  });

  it("has an active state", async () => {
    // this is probably better suited for a screenshot test

    const page = await newE2EPage({
      html: "<calcite-color-swatch color'#beefee'></calcite-color-swatch>"
    });
    const swatchRect = await page.find(`calcite-color-swatch >>> .${CSS.swatch} rect`);

    expect(swatchRect.getAttribute("rx")).toBe("0");

    const swatch = await page.find(`calcite-color-swatch`);
    swatch.setProperty("active", true);
    await page.waitForChanges();

    expect(swatchRect.getAttribute("rx")).toBe("100%");
  });
});
