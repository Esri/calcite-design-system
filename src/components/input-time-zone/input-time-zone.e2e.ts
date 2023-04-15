import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  hidden,
  labelable,
  reflects,
  renders,
  t9n
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-input-time-zone", () => {
  describe("accessible", () => {
    accessible("calcite-input-time-zone");
  });

  describe("hidden", () => {
    hidden("calcite-input-time-zone");
  });

  describe("renders", () => {
    renders("calcite-input-time-zone", { display: "block" });
  });

  it("is focusable", () => focusable("calcite-input-time-zone"));

  it("is labelable", () => labelable("calcite-input-time-zone"));

  it("is reflects", () => reflects("calcite-input-time-zone", []));

  it("has defaults", () => defaults("calcite-input-time-zone", []));

  it("can be disabled", () =>
    disabled("calcite-input-time-zone", { shadowAriaAttributeTargetSelector: "calcite-combobox" }));

  it("supports translations", () => t9n("calcite-input-time-zone"));

  it("selects user's matching timezone offset by default", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);

    const input = await page.find("calcite-input-time-zone");

    expect(await input.getProperty("value")).toBe(-420);

    const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

    expect(await timeZoneItem.getProperty("textLabel")).toMatch("GMT-7");
  });

  it("allows users to preselect a timezone offset", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone("America/Los_Angeles");
    await page.setContent(html`<calcite-input-time-zone value="-360"></calcite-input-time-zone>`);

    const input = await page.find("calcite-input-time-zone");

    expect(await input.getProperty("value")).toBe(-360);

    const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

    // we assert on the fallback item as our current Stencil/Puppeteer setup doesn't support time zone options in Intl.
    expect(await timeZoneItem.getProperty("textLabel")).toMatch("GMT-6");
  });
});
