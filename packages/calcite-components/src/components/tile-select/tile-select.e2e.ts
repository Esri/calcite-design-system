import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tile-select", () => {
  describe("renders", () => {
    renders("calcite-tile-select", { display: "block" });
  });

  describe("accessible", () => {
    accessible(`<calcite-tile-select heading="label"></calcite-tile-select>`);
  });

  describe("defaults", () => {
    defaults("calcite-tile-select", [
      { propertyName: "checked", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "width", defaultValue: "auto" },
    ]);
  });

  describe("reflects", () => {
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
      { propertyName: "type", value: "radio" },
      { propertyName: "width", value: "auto" },
    ]);
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tile-select");
  });

  describe("disabled", () => {
    disabled(
      "calcite-tile-select",

      /* focusing on child since tile appends to light DOM */
      { focusTarget: "child" }
    );
  });

  it("renders a calcite-tile", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile-select></calcite-tile-select>");

    const tile = await page.find("calcite-tile-select >>> calcite-tile");
    expect(tile).toBeDefined();
  });

  it("renders a calcite-radio-button when in radio mode", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-tile-select name='radio' heading='test' value='one'></calcite-tile-select>");
    const calciteRadio = await page.find("calcite-radio-button");
    const calciteCheckbox = await page.find("calcite-checkbox");
    expect(calciteRadio).toBeDefined();
    expect(calciteCheckbox).toBeNull();
    expect(await calciteRadio.getProperty("label")).toBe("test");
  });

  it("renders a calcite-checkbox when in checkbox mode", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-tile-select name='checkbox-tile-select' heading='test' value='one' type='checkbox'></calcite-tile-select>"
    );

    const calciteRadio = await page.find("calcite-radio-button");
    const calciteCheckbox = await page.find("calcite-checkbox");
    expect(calciteRadio).toBeNull();
    expect(calciteCheckbox).toBeDefined();
    expect(await calciteCheckbox.getProperty("label")).toBe("test");
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

  describe("focuses calcite-checkbox when setFocus method is called", () => {
    focusable(html`<calcite-tile-select type="checkbox"></calcite-tile-select>`, {
      focusTargetSelector: "calcite-checkbox",
    });
  });

  describe("focuses calcite-radio-button when setFocus method is called", () => {
    focusable(html`<calcite-tile-select type="radio"></calcite-tile-select>`, {
      focusTargetSelector: "calcite-radio-button",
    });
  });

  it("emits change event on checkbox toggle and suppresses internal checkbox change event", async () => {
    const page = await newE2EPage({
      html: html`<calcite-tile-select type="checkbox" input-enabled></calcite-tile-select>`,
    });

    const tileSelectSpy = await page.spyOnEvent("calciteTileSelectChange");
    const checkboxSpy = await page.spyOnEvent("calciteCheckboxChange");
    const element = await page.find("calcite-tile-select");

    expect(await element.getProperty("checked")).toBe(false);

    await element.click();

    expect(await element.getProperty("checked")).toBe(true);
    expect(tileSelectSpy).toHaveReceivedEvent();
    expect(checkboxSpy).not.toHaveReceivedEvent();

    await element.click();

    expect(await element.getProperty("checked")).toBe(false);
    expect(tileSelectSpy).toHaveReceivedEvent();
    expect(checkboxSpy).not.toHaveReceivedEvent();
  });

  it("emits change event on radio check and suppresses internal radio change event", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-tile-select name="change" type="radio" input-enabled value="one"></calcite-tile-select>
        <calcite-tile-select name="change" type="radio" input-enabled value="two"></calcite-tile-select>
      `,
    });

    const tileSelectSpy = await page.spyOnEvent("calciteTileSelectChange");
    const radioButtonSpy = await page.spyOnEvent("calciteRadioButtonChange");
    const one = await page.find('calcite-tile-select[value="one"]');
    const two = await page.find('calcite-tile-select[value="two"]');

    expect(await one.getProperty("checked")).toBe(false);
    expect(await two.getProperty("checked")).toBe(false);

    await one.click();

    expect(await one.getProperty("checked")).toBe(true);
    expect(await two.getProperty("checked")).toBe(false);
    expect(tileSelectSpy).toHaveReceivedEventTimes(1);
    expect(radioButtonSpy).not.toHaveReceivedEvent();

    await two.click();

    expect(await one.getProperty("checked")).toBe(false);
    expect(await two.getProperty("checked")).toBe(true);
    expect(tileSelectSpy).toHaveReceivedEventTimes(2);
    expect(radioButtonSpy).not.toHaveReceivedEvent();
  });
});
