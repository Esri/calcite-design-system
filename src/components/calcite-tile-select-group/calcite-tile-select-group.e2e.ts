import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, reflects, renders, inheritsDirection, honorsOwnDir } from "../../tests/commonTests";

describe("calcite-tile-select-group", () => {
  it("renders", async () => renders("calcite-tile-select-group"));

  it("is accessible", async () => accessible(`<calcite-tile-select-group></calcite-tile-select-group>`));

  it("has defaults", async () =>
    defaults("calcite-tile-select-group", [{ propertyName: "layout", defaultValue: "horizontal" }]));

  it("reflects", async () => reflects("calcite-tile-select-group", [{ propertyName: "layout", value: "horizontal" }]));

  describe("text directionality", () => {
    const groupContent = `<calcite-tile-select input-enabled input-alignment="end" icon="layers" name="end-checkbox-one" type="checkbox"
      heading="Tile title lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
    </calcite-tile-select>
    <calcite-tile-select input-enabled input-alignment="end" icon="layers" name="end-checkbox-two" type="checkbox"
      heading="Tile title lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
    </calcite-tile-select>
    <calcite-tile-select checked input-enabled input-alignment="end" icon="layers" name="end-checkbox-three"
      type="checkbox" heading="Tile title lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall.">
    </calcite-tile-select>`;
    let html = "";

    describe("initial render", () => {
      beforeEach(() => {
        html = `<calcite-tile-select-group>${groupContent}</calcite-tile-select-group>`;
      });

      it("should have default LTR direction, but no `dir` attribute", async () => {
        const page = await newE2EPage({ html });
        const el = await page.find("calcite-tile-select-group");
        const elStyles = await el.getComputedStyle();
        expect(elStyles["direction"]).toEqual("ltr");
        expect(el.getAttribute("dir")).toBeNull();
      });

      it("matches a screenshot", async () => {
        const page = await newE2EPage({ html });
        // 1: screenshot diff for LTR
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });

    describe("when inheriting direction from further up the DOM tree", () => {
      it("should honor ancestor's `dir` attribute, and not have its own `dir` attribute", async () => {
        await Promise.all([
          await inheritsDirection("calcite-tile-select-group", "ltr"),
          await inheritsDirection("calcite-tile-select-group", "rtl")
        ]);
      });
    });

    describe(`when dir="rtl"`, () => {
      beforeEach(() => {
        html = `<calcite-tile-select-group dir="rtl">${groupContent}</calcite-tile-select-group>`;
      });

      it("should render with text direction based on `dir` value", async () => honorsOwnDir(html, "rtl"));

      it("matches a screenshot", async () => {
        const page = await newE2EPage({ html });
        // 2: screenshot diff for RTL
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });
  });
});
