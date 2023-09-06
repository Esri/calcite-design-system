import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { toGMTLabel } from "./utils";

describe("calcite-input-time-zone", () => {
  describe("accessible", () => {
    accessible("calcite-input-time-zone");
  });

  describe("focusable", () => {
    focusable("calcite-input-time-zone");
  });

  describe("formAssociated", () => {
    formAssociated("calcite-input-time-zone", { testValue: "-360", clearable: false });
  });

  describe("hidden", () => {
    hidden("calcite-input-time-zone");
  });

  describe("renders", () => {
    renders("calcite-input-time-zone", { display: "block" });
  });

  describe("labelable", () => {
    labelable("calcite-input-time-zone");
  });

  describe("reflects", () => {
    reflects("calcite-input-time-zone", [
      { propertyName: "disabled", value: true },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-input-time-zone", [
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "open", defaultValue: false },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("disabled", () => {
    disabled("calcite-input-time-zone", { shadowAriaAttributeTargetSelector: "calcite-combobox" });
  });

  describe("t9n", () => {
    t9n("calcite-input-time-zone");
  });

  describe("selects user's matching timezone offset by default", () => {
    const timeZoneNamesAndOffsets = [
      { name: "America/Los_Angeles", offset: -420 },
      { name: "Europe/London", offset: 60 },
    ];

    timeZoneNamesAndOffsets.forEach(({ name, offset }) => {
      it(`selects default timezone for "${name}"`, async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(name);
        await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);
        await page.waitForTimeout(1000);

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(toGMTLabel(offset / 60));
      });
    });
  });

  it("allows users to preselect a timezone offset", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(html`<calcite-input-time-zone value="-360"></calcite-input-time-zone>`);

    const input = await page.find("calcite-input-time-zone");

    expect(await input.getProperty("value")).toBe("-360");

    const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

    expect(await timeZoneItem.getProperty("textLabel")).toMatch("GMT-6");
  });

  it("does not allow users to deselect a timezone offset", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(html`<calcite-input-time-zone value="-360" open></calcite-input-time-zone>`);
    await page.waitForChanges();

    let selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
    await selectedTimeZoneItem.click();
    await page.waitForChanges();

    selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
    const input = await page.find("calcite-input-time-zone");

    expect(await input.getProperty("value")).toBe("-360");
    expect(await selectedTimeZoneItem.getProperty("textLabel")).toMatch("GMT-6");
  });
});
