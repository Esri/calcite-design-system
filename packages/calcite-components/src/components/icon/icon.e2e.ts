import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";
import { CSS } from "./resources";
import { scaleToPx } from "./utils";

describe("calcite-icon", () => {
  describe("honors hidden attribute", () => {
    hidden("calcite-icon");
  });

  describe("defaults", () => {
    defaults("calcite-icon", [
      { propertyName: "flipRtl", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-icon", [
      { propertyName: "flipRtl", value: true },
      { propertyName: "scale", value: "m" },
    ]);
  });

  describe("accessible", () => {
    accessible(`<calcite-icon icon="a-z" text-label="sort options"></calcite-icon>`);
  });

  it("flips icon when enabled and in RTL", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
    const icon = await page.find(`calcite-icon`);
    const flipRtlIconSelector = `calcite-icon >>> .${CSS.flipRtl}`;

    expect(await page.find(flipRtlIconSelector)).toBeNull();

    icon.setProperty("dir", "rtl");
    icon.setProperty("flipRtl", true);
    await page.waitForChanges();

    expect(await page.find(flipRtlIconSelector)).toBeTruthy();
  });

  describe("rendering", () => {
    describe("renders", () => {
      renders("calcite-icon", { display: "inline-flex" });
    });

    it("uses path data to render icon", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
      await page.waitForChanges();
      const path = await page.find(`calcite-icon >>> path`);

      expect(path.getAttribute("d")).toBeTruthy();
    });

    it("supports both camelcase and kebab case for icon name", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
      await page.waitForChanges();
      const icon = await page.find(`calcite-icon`);
      const path = await page.find(`calcite-icon >>> path`);
      const iconPathData = path.getAttribute("d");

      icon.setProperty("icon", "aZ");
      await page.waitForChanges();

      expect(path.getAttribute("d")).toBe(iconPathData);
    });

    it.skip("loads icon when it's close to viewport", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-icon icon="a-z" style="margin-top: 1000px"></calcite-icon>`);
      await page.waitForChanges();

      const icon = await page.find(`calcite-icon`);
      const path = await page.find(`calcite-icon >>> path`);

      expect(path.getAttribute("d")).toBeFalsy();

      icon.setProperty("style", null);
      await page.waitForChanges();

      expect(path.getAttribute("d")).toBeTruthy();
    });

    describe("scales", () => {
      const scales = ["s", "m", "l"];

      scales.forEach((scale) =>
        it(`${scale} scale`, async () => {
          const page = await newE2EPage();
          await page.setContent(`<calcite-icon icon="a-z" scale="${scale}"></calcite-icon>`);
          const calciteIcon = await page.find(`calcite-icon`);
          const calciteIconComputedStyle = await calciteIcon.getComputedStyle();
          const svg = await page.find(`calcite-icon >>> svg`);
          const sizeInPx = scaleToPx[scale];

          expect(calciteIconComputedStyle.height).toBe(`${sizeInPx}px`);
          expect(calciteIconComputedStyle.width).toBe(`${sizeInPx}px`);
          expect(svg.getAttribute("width")).toBe("100%");
          expect(svg.getAttribute("height")).toBe("100%");
          expect(svg.getAttribute("viewBox")).toBe(`0 0 ${sizeInPx} ${sizeInPx}`);
        }),
      );
    });
  });
});
