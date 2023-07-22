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

  describe("hidden", () => {
    hidden("calcite-input-time-zone");
  });

  describe("renders", () => {
    renders("calcite-input-time-zone", { display: "block" });
  });

  it("is labelable", () => labelable("calcite-input-time-zone"));

  it("is reflects", () =>
    reflects("calcite-input-time-zone", [
      { propertyName: "disabled", value: true },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
    ]));

  it("has defaults", () =>
    defaults("calcite-input-time-zone", [
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "open", defaultValue: false },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "scale", defaultValue: "m" },
    ]));

  it("can be disabled", () =>
    disabled("calcite-input-time-zone", { shadowAriaAttributeTargetSelector: "calcite-combobox" }));

  it("supports translations", () => t9n("calcite-input-time-zone"));

  describe("fallback time zone offset list", () => {
    /*
     * We can only test the fallback list due to the lack of support for `Intl.DateTimeFormatOptions#timeZoneName` in Chromium v92 (bundled in Puppeteer v10).
     */

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

          expect(await input.getProperty("value")).toBe(offset);

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

      expect(await input.getProperty("value")).toBe(-360);

      const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

      expect(await timeZoneItem.getProperty("textLabel")).toMatch("GMT-6");
    });
  });
});
