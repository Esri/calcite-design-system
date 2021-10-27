import { newE2EPage } from "@stencil/core/testing";
import { accessible, HYDRATED_ATTR, labelable } from "../../tests/commonTests";

describe("calcite-switch", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch checked></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");

    expect(calciteSwitch).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteSwitch).toHaveAttribute("checked");
  });

  it("is accessible", async () => accessible(`<calcite-switch label="test-label"></calcite-switch>`));

  it("is accessible: checked", async () => accessible(`<calcite-switch label="test-label" checked></calcite-switch>`));

  it("is labelable", async () => labelable("calcite-switch", { propertyToToggle: "checked" }));

  it("toggles the checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");

    expect(await calciteSwitch.getProperty("checked")).toBe(false);

    await calciteSwitch.click();

    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("checked")).toBe(true);
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");

    const changeEvent = await calciteSwitch.spyOnEvent("calciteSwitchChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await calciteSwitch.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveFirstReceivedEventDetail({ switched: true });
  });

  it("doesn't emit when controlling checked attribute", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch></calcite-switch>");
    const element = await page.find("calcite-switch");
    const spy = await element.spyOnEvent("calciteSwitchChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it("does not toggle when disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch disabled></calcite-switch>`);
    const calciteSwitch = await page.find("calcite-switch");
    const changeEvent = await calciteSwitch.spyOnEvent("calciteSwitchChange");
    expect(changeEvent).toHaveReceivedEventTimes(0);
    await calciteSwitch.click();
    expect(changeEvent).toHaveReceivedEventTimes(0);
    expect(calciteSwitch).not.toHaveAttribute("checked");
    expect(await calciteSwitch.getProperty("checked")).toBe(false);
  });

  it("toggles the checked attributes when the checkbox is toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");

    expect(await calciteSwitch.getProperty("checked")).toBe(false);

    await calciteSwitch.setProperty("checked", true);
    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("checked")).toBe(true);
  });

  it("renders requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch scale="l" ></calcite-switch>`);
    const element = await page.find("calcite-switch");

    expect(element).toEqualAttribute("scale", "l");
  });

  it("renders default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-switch></calcite-switch>`);

    await page.waitForChanges();

    const element = await page.find("calcite-switch");
    expect(element).toEqualAttribute("scale", "m");
  });
});
