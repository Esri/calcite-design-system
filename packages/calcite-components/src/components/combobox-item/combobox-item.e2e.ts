import { describe, it, expect } from "vitest";
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { defaults, disabled, hidden, reflects, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-combobox-item", () => {
  describe("defaults", () => {
    defaults("calcite-combobox-item", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "filterDisabled", defaultValue: undefined },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "shortHeading", defaultValue: undefined },
      { propertyName: "textLabel", defaultValue: undefined },
      { propertyName: "value", defaultValue: undefined },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-combobox-item", [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "filterDisabled", value: true },
      { propertyName: "icon", value: "banana" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "selected", value: true },
    ]);
  });

  describe("renders", () => {
    renders("calcite-combobox-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-combobox-item");
  });

  describe("slots", () => {
    slots("calcite-combobox-item", SLOTS, true);
  });

  describe("disabled", () => {
    disabled("calcite-combobox-item", { focusTarget: "none" });
  });

  it("should emit calciteInternalComboboxItemChange", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-combobox-item></calcite-combobox-item>");

    const element = await page.find("calcite-combobox-item");

    const eventSpy = await element.spyOnEvent("calciteInternalComboboxItemChange");

    await page.waitForChanges();

    expect(eventSpy).not.toHaveReceivedEvent();

    element.setProperty("selected", true);
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(1);

    element.setProperty("textLabel", "hello");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(2);

    element.setProperty("heading", "hello");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(3);

    element.setProperty("label", "hello");
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(4);

    element.setProperty("disabled", true);
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEventTimes(5);
  });
});
