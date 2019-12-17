import { newE2EPage } from "@stencil/core/testing";
import { defaults, reflects, renders } from "../../tests/commonTests";
import { CSS } from "./resources";
import { scaleToPx } from "./utils";

describe("calcite-ui-icon", () => {
  it("has defaults", async () =>
    defaults("calcite-ui-icon", [
      { propertyName: "filled", defaultValue: false },
      { propertyName: "mirrored", defaultValue: false },
      { propertyName: "theme", defaultValue: "light" },
      { propertyName: "scale", defaultValue: "m" }
    ]));

  it("reflects", async () =>
    reflects("calcite-ui-icon", [
      { propertyName: "filled", value: true },
      { propertyName: "mirrored", value: true },
      { propertyName: "theme", value: "light" },
      { propertyName: "scale", value: "m" }
    ]));

  it("mirrors icon when enabled and in RTL", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-ui-icon icon='a-z'></calcite-ui-icon>`);
    const icon = await page.find(`calcite-ui-icon`);
    const mirroredIconSelector = `calcite-ui-icon >>> .${CSS.mirrored}`;

    expect(await page.find(mirroredIconSelector)).toBeNull();

    icon.setProperty("dir", "rtl");
    icon.setProperty("mirrored", true);
    await page.waitForChanges();

    expect(await page.find(mirroredIconSelector)).toBeTruthy();
  });

  describe("rendering", () => {
    it("basic", async () => renders("calcite-ui-icon"));

    it("uses path data to render icon", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-ui-icon icon='a-z'></calcite-ui-icon>");
      const path = await page.find(`calcite-ui-icon >>> .${CSS.icon} path`);

      expect(await path.getAttribute("d")).toBeTruthy();
    });

    it("supports both camelcase and kebab case for icon name", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-ui-icon icon='a-z'></calcite-ui-icon>");
      const icon = await page.find(`calcite-ui-icon`);
      const path = await page.find(`calcite-ui-icon >>> .${CSS.icon} path`);
      const iconPathData = await path.getAttribute("d");

      icon.setProperty("icon", "aZ");
      await page.waitForChanges();

      expect(await path.getAttribute("d")).toBe(iconPathData);
    });

    it("loads icon when it's close to viewport", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-ui-icon icon='a-z' style="margin-top: 1000px"></calcite-ui-icon>`
      );

      const icon = await page.find(`calcite-ui-icon`);
      let path = await page.find(`calcite-ui-icon >>> .${CSS.icon} path`);

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
            `<calcite-ui-icon icon='a-z' scale='${scale}'></calcite-ui-icon>`
          );
          const svg = await page.find(`calcite-ui-icon >>> .${CSS.icon}`);
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
