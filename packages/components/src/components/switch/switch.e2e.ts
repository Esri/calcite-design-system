import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import type { Switch } from "./switch";

it("renders with correct default attributes", async () => {
  const page = await newE2EPage();
  await page.setContent("<calcite-switch checked></calcite-switch>");

  const calciteSwitch = await page.find("calcite-switch");

  expect(calciteSwitch).toHaveAttribute("checked");
});

it("toggles the checked attributes appropriately when clicked", async () => {
  const page = await newE2EPage();
  await page.setContent("<calcite-switch></calcite-switch>");

  const calciteSwitch = await page.find("calcite-switch");

  expect(await calciteSwitch.getProperty("checked")).toBe(false);

  await calciteSwitch.click();

  await page.waitForChanges();

  expect(await calciteSwitch.getProperty("checked")).toBe(true);
});

it("toggles the checked attributes appropriately when click is called", async () => {
  const page = await newE2EPage();
  await page.setContent("<calcite-switch></calcite-switch>");
  const calciteSwitch = await page.find("calcite-switch");

  expect(await calciteSwitch.getProperty("checked")).toBe(false);

  await page.$eval("calcite-switch", (component: Switch["el"]) => {
    component.click();
  });

  expect(await calciteSwitch.getProperty("checked")).toBe(true);

  // helps test click behavior via HTMLElement.click()
  await calciteSwitch.callMethod("click");
  await page.waitForChanges();

  expect(await calciteSwitch.getProperty("checked")).toBe(false);
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
