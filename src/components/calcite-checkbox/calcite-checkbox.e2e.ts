import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, HYDRATED_ATTR, labelable } from "../../tests/commonTests";

describe("calcite-checkbox", () => {
  it("is accessible", async () =>
    accessible(
      `<calcite-label><calcite-checkbox id="example" name="example" value="one"></calcite-checkbox> label</calcite-label>`
    ));

  it("is accessible without calcite-label", async () =>
    accessible(`<calcite-checkbox label="label" id="example" name="example" value="one"></calcite-checkbox>`));

  it("is labelable", async () => labelable("calcite-checkbox", { propertyToToggle: "checked" }));

  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("correctly creates a hidden checkbox input", async () => {
    const testName = "test-name";
    const testValue = "test-value";
    const page = await newE2EPage();
    await page.setContent(`<calcite-checkbox checked name="${testName}" value="${testValue}"></calcite-checkbox>`);

    const input = await page.find("input");

    expect(input).toEqualAttribute("type", "checkbox");
    expect(input).toEqualAttribute("name", testName);
    expect(input).toEqualAttribute("value", testValue);
    expect(input).toHaveAttribute("checked");
  });

  it("toggles the checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(false);
    expect(input).not.toHaveAttribute("checked");
    expect(await input.getProperty("checked")).toBe(false);

    await calciteCheckbox.click();

    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(await calciteCheckbox.getProperty("checked")).toBe(true);
    expect(await input.getProperty("checked")).toBe(true);
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

  it("does not toggle when clicked if disabled", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox disabled></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(input).not.toHaveAttribute("checked");

    await calciteCheckbox.click();

    await page.waitForChanges();

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(input).not.toHaveAttribute("checked");
  });

  it("removes the indeterminate attribute when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox indeterminate></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute("indeterminate");

    await calciteCheckbox.click();

    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("removing a checkbox also removes the hidden <input type=checkbox> element", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-checkbox name="checky" id="first" value="one"></calcite-checkbox>
    `);

    let input = await page.find("input");
    expect(input).toBeTruthy();

    await page.evaluate(() => {
      const checkbox = document.querySelector("calcite-checkbox");
      checkbox.parentNode.removeChild(checkbox);
    });
    await page.waitForChanges();

    input = await page.find("input");

    expect(input).toBeFalsy();
  });

  it("behaves as expected when wrapped in a calcite-label with inline layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const inputs = await page.findAll("input");
    expect(inputs.length).toEqual(1);
  });

  it("behaves as expected when wrapped in a calcite-label with inline-space-between layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline-space-between"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const inputs = await page.findAll("input");
    expect(inputs.length).toEqual(1);
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

  it("is focusable", () =>
    focusable("calcite-checkbox", {
      focusTargetSelector: "input[type=checkbox]"
    }));
});
