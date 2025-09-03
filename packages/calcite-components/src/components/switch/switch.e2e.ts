import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  disabled,
  focusable,
  formAssociated,
  hidden,
  HYDRATED_ATTR,
  internalLabel,
  labelable,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import type { Switch } from "./switch";
import { CSS } from "./resources";

describe("calcite-switch", () => {
  it("renders with correct default attributes", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-switch checked></calcite-switch>");

    const calciteSwitch = await page.find("calcite-switch");

    expect(calciteSwitch).toHaveAttribute(HYDRATED_ATTR);
    expect(calciteSwitch).toHaveAttribute("checked");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-switch");
  });

  describe("accessible", () => {
    accessible(`<calcite-switch label="test-label"></calcite-switch>`);
  });

  describe("accessible: checked", () => {
    accessible(`<calcite-switch label="test-label" checked></calcite-switch>`);
  });

  describe("labelable", () => {
    labelable("calcite-switch", { propertyToToggle: "checked" });
  });

  describe("is form-associated", () => {
    formAssociated("calcite-switch", { testValue: true, inputType: "checkbox" });
  });

  describe("disabled", () => {
    disabled("calcite-switch");
  });

  describe("focusable", () => {
    focusable("calcite-switch");
  });

  describe("InternalLabel", () => {
    internalLabel(`calcite-switch`);
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

  describe("themed", () => {
    describe("default", () => {
      themed(html`calcite-switch`, {
        "--calcite-switch-background-color": {
          shadowSelector: `.${CSS.track}`,
          targetProp: "backgroundColor",
        },
        "--calcite-switch-background-color-hover": {
          shadowSelector: `.${CSS.track}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-switch-corner-radius": {
          shadowSelector: `.${CSS.track}`,
          targetProp: "borderRadius",
        },
        "--calcite-switch-handle-background-color": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "backgroundColor",
        },
      });
    });

    describe("deprecated", () => {
      themed(html`calcite-switch`, {
        "--calcite-switch-border-color": {
          shadowSelector: `.${CSS.track}`,
          targetProp: "borderColor",
        },
        "--calcite-switch-handle-border-color": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "borderColor",
        },
        "--calcite-switch-handle-shadow": {
          shadowSelector: `.${CSS.handle}`,
          targetProp: "boxShadow",
        },
      });
    });
  });
});
