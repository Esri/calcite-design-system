import { newE2EPage } from "@stencil/core/testing";

describe("calcite-checkbox", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-checkbox></calcite-checkbox>");

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveClass("hydrated");
    expect(calciteCheckbox).toEqualAttribute("role", "checkbox");
    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  it("correctly creates a proxy checkbox if none is provided", async () => {
    const testName = "test-name";
    const testValue = "test-value";
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-checkbox checked name="${testName}" value="${testValue}"></calcite-checkbox>`
    );

    const input = await page.find("input");

    expect(input).toEqualAttribute("type", "checkbox");
    expect(input).toEqualAttribute("name", testName);
    expect(input).toEqualAttribute("value", testValue);
    expect(input).toHaveAttribute("checked");
  });

  it("overrides the switch attributes with user-provided checkbox if it exists", async () => {
    const inputName = "input-name";
    const inputValue = "input-value";
    const inputID = "input-id";

    const page = await newE2EPage();
    await page.setContent(`
      <calcite-checkbox name="switch-name" value="switch-value" checked>
        <input
          type="checkbox"
          id="${inputID}"
          name="${inputName}"
          value="${inputValue}"
        />
      </calcite-checkbox>`);

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");

    expect(input).toEqualAttribute("id", inputID);
    expect(input).not.toHaveAttribute("checked");
    expect(calciteCheckbox).toEqualAttribute("name", inputName);
    expect(calciteCheckbox).toEqualAttribute("value", inputValue);
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

    const changeEvent = await calciteCheckbox.spyOnEvent(
      "calciteCheckboxChange"
    );

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
    await page.setContent(
      "<calcite-checkbox indeterminate></calcite-checkbox>"
    );

    const calciteCheckbox = await page.find("calcite-checkbox");

    expect(calciteCheckbox).toHaveAttribute("indeterminate");

    await calciteCheckbox.click();

    expect(calciteCheckbox).not.toHaveAttribute("indeterminate");
  });

  // Not sure why this is failing; it works in real life
  it("toggles the checked attributes when the inner checkbox is toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-checkbox>
      <input type="checkbox" />
    </calcite-checkbox>`);

    const calciteCheckbox = await page.find("calcite-checkbox");
    const input = await page.find("input");

    expect(calciteCheckbox).not.toHaveAttribute("checked");
    expect(input).not.toHaveAttribute("checked");

    await page.$eval("input", element => {
      element.setAttribute("checked", "");
    });

    await page.waitForChanges();

    expect(calciteCheckbox).toHaveAttribute("checked");
    expect(input).toHaveAttribute("checked");
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
});
