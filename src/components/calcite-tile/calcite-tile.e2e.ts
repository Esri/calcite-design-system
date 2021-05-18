import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  hidden,
  reflects,
  renders,
  inheritsDirection,
  honorsOwnDir
} from "../../tests/commonTests";

describe("calcite-tile", () => {
  it("renders", async () => renders("calcite-tile"));

  it("is accessible", async () => accessible(`<calcite-tile></calcite-tile>`));

  it("has defaults", async () =>
    defaults("calcite-tile", [
      { propertyName: "embed", defaultValue: false },
      { propertyName: "focused", defaultValue: false },
      { propertyName: "hidden", defaultValue: false }
    ]));

  it("reflects", async () =>
    reflects("calcite-tile", [
      { propertyName: "active", value: true },
      { propertyName: "embed", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "href", value: "http://www.esri.com" },
      { propertyName: "icon", value: "layers" },
      { propertyName: "theme", value: "light" }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-tile"));

  it("renders without a link by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile></calcite-tile>");
    const link = await page.find("calcite-tile >>> calcite-link");
    expect(link).toBeNull();
  });

  it("renders a link when href attribute is supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile href='http://www.esri.com'></calcite-tile>");

    const link = await page.find("calcite-tile >>> calcite-link");
    const anchor = await page.find("calcite-tile >>> calcite-link >>> a");
    expect(link).toEqualAttribute("href", "http://www.esri.com");
    expect(anchor).toEqualAttribute("href", "http://www.esri.com");
  });

  it("renders heading only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile heading='My Calcite Tile'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeNull();
    expect(heading).toEqualText("My Calcite Tile");
    expect(description).toBeNull();
  });

  it("renders icon only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile icon='layers'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeDefined();
    expect(heading).toBeNull();
    expect(description).toBeNull();
  });

  it("renders description only when supplied", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile description='My Calcite Tile Description.'></calcite-tile>");

    const icon = await page.find("calcite-tile >>> .icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toBeNull();
    expect(heading).toBeNull();
    expect(description).toEqualText("My Calcite Tile Description.");
  });

  it("renders large icon when only icon and heading are supplied", async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-tile icon="layers" heading="My Large Visual Calcite Tile"></calcite-tile>');

    const icon = await page.find("calcite-tile >>> calcite-icon");
    const heading = await page.find("calcite-tile >>> .heading");
    const description = await page.find("calcite-tile >>> .description");
    expect(icon).toEqualAttribute("icon", "layers");
    expect(icon).toEqualAttribute("scale", "l");
    expect(heading).toEqualText("My Large Visual Calcite Tile");
    expect(description).toBeNull();
  });

  describe("text directionality", () => {
    let html = "";

    describe("initial render", () => {
      beforeEach(() => {
        html = `
          <calcite-tile
            description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
            heading="Hello world!"
            href="#"
            icon="layer"
          ></calcite-tile>
        `;
      });

      it("should have default LTR direction, but no `dir` attribute", async () => {
        const page = await newE2EPage({ html });
        const el = await page.find("calcite-tile");
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
          await inheritsDirection("calcite-tile", "ltr"),
          await inheritsDirection("calcite-tile", "rtl")
        ]);
      });
    });

    describe(`when dir="rtl"`, () => {
      beforeEach(() => {
        html = `
          <calcite-tile
            description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
            heading="Hello world!"
            href="#"
            icon="layer"
            dir="rtl"
          ></calcite-tile>
        `;
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
