import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  reflects,
  renders
} from "../../tests/commonTests";
import { CSS } from "./resources";
import { scaleToPx } from "./utils";

describe("calcite-icon", () => {
  it("has defaults", async () =>
    defaults("calcite-icon", [
      { propertyName: "filled", defaultValue: false },
      { propertyName: "mirrored", defaultValue: false },
      { propertyName: "theme", defaultValue: "light" },
      { propertyName: "scale", defaultValue: "m" }
    ]));

  it("reflects", async () =>
    reflects("calcite-icon", [
      { propertyName: "filled", value: true },
      { propertyName: "mirrored", value: true },
      { propertyName: "theme", value: "light" },
      { propertyName: "scale", value: "m" }
    ]));

  it("is accessible", async () =>
    accessible(`<calcite-icon icon="a-z" text-label="sort options"></calcite-icon>`));

  it("mirrors icon when enabled and in RTL", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
    const icon = await page.find(`calcite-icon`);
    const mirroredIconSelector = `calcite-icon >>> .${CSS.mirrored}`;

    expect(await page.find(mirroredIconSelector)).toBeNull();

    icon.setProperty("dir", "rtl");
    icon.setProperty("mirrored", true);
    await page.waitForChanges();

    expect(await page.find(mirroredIconSelector)).toBeTruthy();
  });

  describe("rendering", () => {
    it("basic", async () => renders("calcite-icon"));

    it("uses path data to render icon", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
      await page.waitForChanges();
      const path = await page.find(`calcite-icon >>> path`);

      expect(await path.getAttribute("d")).toBeTruthy();

    });

    it("supports both camelcase and kebab case for icon name", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-icon icon="a-z"></calcite-icon>`);
      await page.waitForChanges();
      const icon = await page.find(`calcite-icon`);
      const path = await page.find(`calcite-icon >>> path`);
      const iconPathData = await path.getAttribute("d");

      icon.setProperty("icon", "aZ");
      await page.waitForChanges();

      expect(await path.getAttribute("d")).toBe(iconPathData);
    });

    it("loads icon when it's close to viewport", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-icon icon="a-z" style="margin-top: 1000px"></calcite-icon>`
      );
      await page.waitForChanges();

      const icon = await page.find(`calcite-icon`);
      let path = await page.find(`calcite-icon >>> path`);

      expect(await path.getAttribute("d")).toBeNull();

      icon.setProperty("style", null);
      await page.waitForChanges();

      expect(await path.getAttribute("d")).toBeTruthy();
    });

    describe("scales", () => {
      const scales = ["s", "m", "l"];

      scales.forEach(scale =>
        it(`${scale} scale`, async () => {
          const page = await newE2EPage();
          await page.setContent(
            `<calcite-icon icon="a-z" scale="${scale}"></calcite-icon>`
          );
          const svg = await page.find(`calcite-icon >>> svg`);
          const sizeInPx = scaleToPx[scale];

          expect(await svg.getAttribute("width")).toBe(`${sizeInPx}`);
          expect(await svg.getAttribute("height")).toBe(`${sizeInPx}`);
          expect(await svg.getAttribute("viewBox")).toBe(
            `0 0 ${sizeInPx} ${sizeInPx}`
          );
        })
      );
    });
  });
});
