import { newE2EPage } from "@stencil/core/testing";

describe("calcite-switch", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch switched></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");

    expect(calciteSwitch).toHaveClass("hydrated");
    expect(calciteSwitch).toEqualAttribute("role", "checkbox");
    expect(calciteSwitch).toHaveAttribute("switched");
  });

  it("correctly creates a proxy checkbox if none is provided", async () => {
    const testName = "test-name";
    const testValue = "test-value";
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-switch switched name="${testName}" value="${testValue}"></calcite-switch>`
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
      <calcite-switch name="switch-name" value="switch-value" switched>
        <input type="checkbox" id="${inputID}" name="${inputName}" value="${inputValue}"/>
      </calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");

    expect(input).toEqualAttribute("id", inputID);
    expect(input).not.toHaveAttribute("checked");
    expect(calciteSwitch).toEqualAttribute("name", inputName);
    expect(calciteSwitch).toEqualAttribute("value", inputValue);
  });

  it("toggles the switched and checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");

    expect(calciteSwitch).not.toHaveAttribute("switched");
    expect(input).not.toHaveAttribute("checked");

    calciteSwitch.click();

    await page.waitForChanges();

    expect(calciteSwitch).toHaveAttribute("switched");
    expect(input).toHaveAttribute("checked");
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");

    const changeEvent = await calciteSwitch.spyOnEvent("calciteSwitchChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await calciteSwitch.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  // Not sure why this is failing
  it("toggles the switched and checked attributes when the checkbox is toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-switch>
      <input type="checkbox" />
    </calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");

    expect(calciteSwitch).not.toHaveAttribute("switched");
    expect(input).not.toHaveAttribute("checked");

    await page.$eval("input", element => {
      element.setAttribute("checked", "");
    });

    await page.waitForChanges();

    expect(calciteSwitch).toHaveAttribute("switched");
    expect(input).toHaveAttribute("checked");
  });

  it("toggles when the wrapping label is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <label>
        <calcite-switch></calcite-switch>
        <p>hello!</p>
      </label>
      `);

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");
    const paragraph = await page.find("p");

    paragraph.click();

    await page.waitForChanges();

    expect(calciteSwitch).toHaveAttribute("switched");
    expect(input).toHaveAttribute("checked");
  });

  it("honors tabindex", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);
    await page.waitForChanges();
    const calciteSwitch = await page.find("calcite-switch");

    expect(await calciteSwitch.getProperty("tabIndex")).toBe(0);

    calciteSwitch.setAttribute("tabindex", "-1");
    await page.waitForChanges();
    expect(await calciteSwitch.getProperty("tabIndex")).toBe(-1);
  });

  it("renders requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-switch theme="dark" scale="l" color="red"></calcite-switch>`
    );

    const element = await page.find("calcite-switch");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("color", "red");
  });

  it("validates incorrect props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-switch theme="zip" scale="zop" color="zim"></calcite-switch>`
    );

    const element = await page.find("calcite-switch");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
  });

  it("renders default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-switch></calcite-switch>`);

    const element = await page.find("calcite-switch");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
  });
});
