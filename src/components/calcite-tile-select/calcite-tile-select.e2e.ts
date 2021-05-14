import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  focusable,
  hidden,
  reflects,
  renders,
  inheritsDirection,
  honorsOwnDir
} from "../../tests/commonTests";
import { html } from "../../tests/utils";

describe("calcite-tile-select", () => {
  it("renders", async () => renders("calcite-tile-select"));

  it("is accessible", async () => accessible(`<calcite-tile-select></calcite-tile-select>`));

  it("has defaults", async () =>
    defaults("calcite-tile-select", [
      { propertyName: "checked", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "width", defaultValue: "auto" }
    ]));

  it("reflects", async () =>
    reflects("calcite-tile-select", [
      { propertyName: "checked", value: true },
      { propertyName: "description", value: "My Tile Select Description." },
      { propertyName: "disabled", value: true },
      { propertyName: "heading", value: "My Tile Select Heading" },
      { propertyName: "hidden", value: true },
      { propertyName: "icon", value: "layers" },
      { propertyName: "inputAlignment", value: "start" },
      { propertyName: "name", value: "my-tile-select" },
      { propertyName: "inputEnabled", value: true },
      { propertyName: "theme", value: "light" },
      { propertyName: "type", value: "radio" },
      { propertyName: "width", value: "auto" }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-tile-select"));

  it("renders a calcite-tile", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile-select></calcite-tile-select>");

    const tile = await page.find("calcite-tile-select >>> calcite-tile");
    expect(tile).toBeDefined();
  });

  it("renders a calcite-radio-button when in radio mode", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile-select name='radio' value='one'></calcite-tile-select>");

    const calciteRadio = await page.find("calcite-radio-button");
    const calciteCheckbox = await page.find("calcite-checkbox");
    const radio = await page.find("input[type='radio']");
    expect(calciteRadio).toBeDefined();
    expect(calciteCheckbox).toBeNull();
    expect(radio).toEqualAttribute("name", "radio");
    expect(radio).toEqualAttribute("value", "one");
  });

  it("renders a calcite-checkbox when in checkbox mode", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-tile-select name='checkbox-tile-select' value='one' type='checkbox'></calcite-tile-select>"
    );

    const calciteRadio = await page.find("calcite-radio-button");
    const calciteCheckbox = await page.find("calcite-checkbox");
    const checkbox = await page.find("input[type='checkbox']");
    expect(calciteRadio).toBeNull();
    expect(calciteCheckbox).toBeDefined();
    expect(checkbox).toEqualAttribute("name", "checkbox-tile-select");
    expect(checkbox).toEqualAttribute("value", "one");
  });

  it("removing a tile-select also removes its corresponding calcite-radio-button", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tile-select name="radio" value="first"></calcite-tile-select>
    `);

    let firstRadioButton = await page.find("calcite-radio-button");
    expect(await firstRadioButton.getProperty("name")).toBe("radio");
    expect(await firstRadioButton.getProperty("value")).toBe("first");

    await page.evaluate(() => {
      const firstTileSelect = document.querySelector("calcite-tile-select");
      firstTileSelect.parentNode.removeChild(firstTileSelect);
    });
    await page.waitForChanges();

    firstRadioButton = await page.find("calcite-radio-button");
    expect(firstRadioButton).toBeNull();
  });

  it("removing a tile-select also removes its corresponding calcite-checkbox", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-tile-select name="checky" value="first" type="checkbox"></calcite-tile-select>
    `);

    let firstRadioButton = await page.find("calcite-checkbox");
    expect(await firstRadioButton.getProperty("name")).toBe("checky");
    expect(await firstRadioButton.getProperty("value")).toBe("first");

    await page.evaluate(() => {
      const firstTileSelect = document.querySelector("calcite-tile-select");
      firstTileSelect.parentNode.removeChild(firstTileSelect);
    });
    await page.waitForChanges();

    firstRadioButton = await page.find("calcite-checkbox");
    expect(firstRadioButton).toBeNull();
  });

  it("focuses calcite-checkbox when setFocus method is called", async () =>
    focusable(html`<calcite-tile-select type="checkbox"></calcite-tile-select>`, {
      focusTargetSelector: "input[type=checkbox]"
    }));

  it("focuses calcite-radio-button when setFocus method is called", async () =>
    focusable(html`<calcite-tile-select type="radio"></calcite-tile-select>`, {
      focusTargetSelector: "input[type=radio]"
    }));

  describe("text directionality", () => {
    let html = "";

    describe("initial render", () => {
      beforeEach(() => {
        html = `
        <calcite-tile-select
          checked
          heading="Hello world!"
          icon="layer"
          input-enabled
          input-alignment="end"
          type="checkbox"
          value="one"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        ></calcite-tile-select>
        `;
      });

      it("should have default LTR direction, but no `dir` attribute", async () => {
        const page = await newE2EPage({ html });
        const el = await page.find("calcite-tile-select");
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
          await inheritsDirection("calcite-tile-select", "ltr"),
          await inheritsDirection("calcite-tile-select", "rtl")
        ]);
      });
    });

    describe(`when dir="rtl"`, () => {
      beforeEach(() => {
        html = `
        <calcite-tile-select
          checked
          heading="Hello world!"
          icon="layer"
          input-enabled
          input-alignment="end"
          type="checkbox"
          value="one"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          dir="rtl"
        ></calcite-tile-select>
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
