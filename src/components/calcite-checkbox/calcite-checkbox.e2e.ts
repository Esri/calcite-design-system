import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-checkbox", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteCheckbox).toEqualAttribute("role", "checkbox");
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
    expect(input).not.toHaveAttribute("checked");

    calciteCheckbox.click();

    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(input).toHaveAttribute("checked");
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

  it("does not toggle when clicked if disabled", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox disabled></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(input).not.toHaveAttribute("checked");

    calciteCheckbox.click();

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

  it("toggles when the wrapping label is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <label>
        <calcite-checkbox></calcite-checkbox>
        <p>hello!</p>
      </label>
      `);

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");
    const paragraph = await page.find("p");

    paragraph.click();

    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(input).toHaveAttribute("checked");
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

    const inputs = await page.findAll("calcite-label >>> input");
    expect(inputs.length).toEqual(1);
  });

  it("behaves as expected when wrapped in a calcite-label with inline-space-between layout mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label layout="inline-space-between"><calcite-checkbox></calcite-checkbox>Label</calcite-label>
    `);

    const inputs = await page.findAll("calcite-label >>> input");
    expect(inputs.length).toEqual(1);
  });
});
