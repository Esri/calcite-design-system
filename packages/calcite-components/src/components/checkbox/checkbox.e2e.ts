import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  disabled,
  focusable,
  formAssociated,
  HYDRATED_ATTR,
  labelable,
  hidden,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-checkbox", () => {
  describe("honors hidden attribute", () => {
    hidden("calcite-checkbox");
  });

  describe("accessible", () => {
    accessible(
      `<calcite-label><calcite-checkbox id="example" name="example" value="one"></calcite-checkbox> label</calcite-label>`
    );
  });

  describe("accessible without calcite-label", () => {
    accessible(`<calcite-checkbox label="label" id="example" name="example" value="one"></calcite-checkbox>`);
  });

  describe("labelable", () => {
    labelable("calcite-checkbox", { propertyToToggle: "checked", shadowFocusTargetSelector: ".toggle" });
  });

  describe("is form-associated", () => {
    formAssociated("calcite-checkbox", { testValue: true, inputType: "checkbox" });
  });

  describe("disabled", () => {
    disabled("calcite-checkbox");
  });

  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("toggles the checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(false);

    await calciteCheckbox.click();
    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(true);

    // helps test click behavior via HTMLElement.click()
    await calciteCheckbox.callMethod("click");
    await page.waitForChanges();

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(false);
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-checkbox></calcite-checkbox>`);

    const calciteCheckbox = await page.find("calcite-checkbox");

    const changeEvent = await calciteCheckbox.spyOnEvent("calciteCheckboxChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await calciteCheckbox.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("doesn't emit when controlling checked attribute", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox value='test-value'></calcite-checkbox>");
    const element = await page.find("calcite-checkbox");
    const spy = await element.spyOnEvent("calciteCheckboxChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it("removes the indeterminate attribute when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox indeterminate></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute("indeterminate");

    await calciteCheckbox.click();

    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("behaves as expected when wrapped in a calcite-label with inline layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const checkboxes = await page.findAll("calcite-checkbox");
    expect(checkboxes.length).toEqual(1);
  });

  it("behaves as expected when wrapped in a calcite-label with inline-space-between layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline-space-between"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const checkboxes = await page.findAll("calcite-checkbox");
    expect(checkboxes.length).toEqual(1);
  });

  it("resets to initial value when form reset event is triggered", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form>
        <calcite-checkbox id="unchecked"></calcite-checkbox>
        <calcite-checkbox id="checked" checked></calcite-checkbox>
      </form>
    `);

    const unchecked = await page.find("#unchecked");
    expect(await unchecked.getProperty("checked")).toBe(false);

    await unchecked.click();
    expect(await unchecked.getProperty("checked")).toBe(true);

    const checked = await page.find("#checked");
    expect(await checked.getProperty("checked")).toBe(true);

    await checked.click();
    expect(await checked.getProperty("checked")).toBe(false);

    await page.evaluate(() => {
      const form = document.querySelector("form");
      form.reset();
    });
    await page.waitForChanges();

    expect(await unchecked.getProperty("checked")).toBe(false);
    expect(await checked.getProperty("checked")).toBe(true);
  });

  describe("is focusable", () => {
    focusable("calcite-checkbox", {
      shadowFocusTargetSelector: ".toggle",
    });
  });

  describe("WCAG AA recommended minimum 24px click area", () => {
    it("small checkbox allows clicks 5px around all sides", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-checkbox scale="s"></calcite-checkbox>`);
      const checkbox = await page.find("calcite-checkbox");
      const { left, top, right, bottom } = await page.evaluate(() =>
        document.querySelector("calcite-checkbox").getBoundingClientRect().toJSON()
      );

      const maxExtraPixels = 5;

      await page.mouse.click(left - maxExtraPixels, top - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, top + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(left - maxExtraPixels, bottom - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, bottom + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(right + maxExtraPixels + 1, bottom + maxExtraPixels + 1);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);
    });

    it("medium checkbox allows clicks 4px around all sides", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-checkbox scale="m"></calcite-checkbox>`);
      const checkbox = await page.find("calcite-checkbox");
      const { left, top, right, bottom } = await page.evaluate(() =>
        document.querySelector("calcite-checkbox").getBoundingClientRect().toJSON()
      );

      console.log(left, top, right, bottom);

      const maxExtraPixels = 4;

      await page.mouse.click(left - maxExtraPixels, top - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, top + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(left - maxExtraPixels, bottom - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, bottom + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(right + maxExtraPixels + 1, bottom + maxExtraPixels + 1);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);
    });

    it("large checkbox allows clicks 3px around all sides", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-checkbox scale="l"></calcite-checkbox>`);
      const checkbox = await page.find("calcite-checkbox");
      const { left, top, right, bottom } = await page.evaluate(() =>
        document.querySelector("calcite-checkbox").getBoundingClientRect().toJSON()
      );

      console.log(left, top, right, bottom);

      const maxExtraPixels = 3;

      await page.mouse.click(left - maxExtraPixels, top - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, top + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(left - maxExtraPixels, bottom - maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(true);

      await page.mouse.click(right + maxExtraPixels, bottom + maxExtraPixels);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);

      await page.mouse.click(right + maxExtraPixels + 1, bottom + maxExtraPixels + 1);
      await page.waitForChanges();

      expect(await checkbox.getProperty("checked")).toBe(false);
    });
  });
});
