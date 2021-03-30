import { newE2EPage } from "@stencil/core/testing";
import { accessible, HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-switch", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch switched></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");

    expect(calciteSwitch).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteSwitch).toHaveAttribute("switched");
  });

  it("is accessible", async () => accessible(`<calcite-switch></calcite-switch>`));

  it("is accessible: switched", async () => accessible(`<calcite-switch switched></calcite-switch>`));

  it("toggles the switched and checked attributes appropriately when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");

    expect(await calciteSwitch.getProperty("switched")).toBe(false);
    expect(await input.getProperty("checked")).toBe(false);

    await calciteSwitch.click();

    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("switched")).toBe(true);
    expect(await input.getProperty("checked")).toBe(true);
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

  it("doesn't emit when controlling switched attribute", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch></calcite-switch>");
    const element = await page.find("calcite-switch");
    const spy = await element.spyOnEvent("calciteSwitchChange");

    await element.setProperty("switched", true);
    await page.waitForChanges();
    await element.setProperty("switched", false);
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
    expect(calciteSwitch).not.toHaveAttribute("switched");
    expect(await calciteSwitch.getProperty("switched")).toBe(false);
  });

  it("toggles the switched and checked attributes when the checkbox is toggled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);

    const calciteSwitch = await page.find("calcite-switch");
    const input = await page.find("input");

    expect(await calciteSwitch.getProperty("switched")).toBe(false);
    expect(await input.getProperty("checked")).toBe(false);

    await calciteSwitch.setProperty("switched", true);
    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("switched")).toBe(true);
    expect(await input.getProperty("checked")).toBe(true);
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

    await paragraph.click();

    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("switched")).toBe(true);
    expect(await input.getProperty("checked")).toBe(true);
  });

  it("honors tabindex", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch></calcite-switch>`);
    await page.waitForChanges();
    const calciteSwitch = await page.find("calcite-switch");

    expect(await calciteSwitch.getProperty("tabIndex")).toBe(0);

    calciteSwitch.setAttribute("tabindex", "-1");

    await page.waitForChanges();
    await page.waitForChanges();

    expect(await calciteSwitch.getProperty("tabIndex")).toBe(-1);
  });

  it("renders requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-switch theme="dark" scale="l" ></calcite-switch>`);
    const element = await page.find("calcite-switch");

    expect(element).toEqualAttribute("theme", "dark");
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
