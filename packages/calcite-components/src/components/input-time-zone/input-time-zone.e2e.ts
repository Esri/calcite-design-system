import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
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
import { toUserFriendlyName } from "./utils";

describe("calcite-input-time-zone", () => {
  describe.skip("accessible", () => {
    accessible(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`));
  });

  describe.skip("focusable", () => {
    focusable(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`));
  });

  describe.skip("formAssociated", () => {
    formAssociated(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`), {
      testValue: "-360",
      clearable: false,
    });
  });

  describe.skip("hidden", () => {
    hidden(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`));
  });

  describe.skip("renders", () => {
    renders(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`), { display: "block" });
  });

  describe.skip("labelable", () => {
    labelable(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`));
  });

  describe.skip("reflects", () => {
    reflects(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`), [
      { propertyName: "disabled", value: true },
      { propertyName: "maxItems", value: 0 },
      { propertyName: "mode", value: "offset" },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
    ]);
  });

  describe.skip("defaults", () => {
    defaults(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`), [
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "maxItems", defaultValue: 0 },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "mode", defaultValue: "offset" },
      { propertyName: "open", defaultValue: false },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe.skip("disabled", () => {
    disabled(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`), {
      shadowAriaAttributeTargetSelector: "calcite-combobox",
    });
  });

  describe.skip("t9n", () => {
    t9n(addTimeZoneNamePolyfill(html` <calcite-input-time-zone></calcite-input-time-zone>`));
  });

  const testTimeZoneNamesAndOffsets = [
    { name: "America/Los_Angeles", offset: -420, label: "GMT-7" },
    { name: "America/Denver", offset: -360, label: "GMT-6" },
    { name: "Europe/London", offset: 60, label: "GMT+1" },
  ];

  describe("mode", () => {
    describe("offset (default)", () => {
      describe("selects user's matching time zone offset on initialization", () => {
        testTimeZoneNamesAndOffsets.forEach(({ name, offset, label }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(addTimeZoneNamePolyfill(html`<calcite-input-time-zone></calcite-input-time-zone>`));
            await page.waitForChanges();

            const input = await page.find("calcite-input-time-zone");
            expect(await input.getProperty("value")).toBe(`${offset}`);

            const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

            expect(await timeZoneItem.getProperty("textLabel")).toMatch(label);
          });
        });
      });

      it("allows users to preselect a time zone offset", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await addTimeZoneNamePolyfill(
            html` <calcite-input-time-zone value="${testTimeZoneNamesAndOffsets[1].offset}"></calcite-input-time-zone>`
          )
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneNamesAndOffsets[1].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneNamesAndOffsets[1].label);
      });

      it("ignores invalid values", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await addTimeZoneNamePolyfill(html` <calcite-input-time-zone value="9000"></calcite-input-time-zone>`)
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneNamesAndOffsets[0].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneNamesAndOffsets[0].label);
      });

      it("omits filtered or non-localized time zones (incoming to browser)", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await addTimeZoneNamePolyfill(html` <calcite-input-time-zone value="60"></calcite-input-time-zone>`)
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneNamesAndOffsets[2].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneNamesAndOffsets[2].label);
      });
    });

    describe("name", () => {
      describe("selects user's matching time zone name on initialization", () => {
        testTimeZoneNamesAndOffsets.forEach(({ name }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(
              await addTimeZoneNamePolyfill(html`<calcite-input-time-zone mode="name"></calcite-input-time-zone>`)
            );
            await page.waitForChanges();

            const input = await page.find("calcite-input-time-zone");
            expect(await input.getProperty("value")).toBe(name);

            const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

            expect(await timeZoneItem.getProperty("textLabel")).toMatch(toUserFriendlyName(name));
          });
        });
      });

      it("allows users to preselect a time zone by name", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await addTimeZoneNamePolyfill(html` <calcite-input-time-zone
            mode="name"
            value="${testTimeZoneNamesAndOffsets[1].name}"
          ></calcite-input-time-zone>`)
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneNamesAndOffsets[1].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(
          toUserFriendlyName(testTimeZoneNamesAndOffsets[1].name)
        );
      });

      it("ignores invalid values", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await addTimeZoneNamePolyfill(html` <calcite-input-time-zone
            mode="name"
            value="Does/Not/Exist"
          ></calcite-input-time-zone>`)
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneNamesAndOffsets[0].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(
          toUserFriendlyName(testTimeZoneNamesAndOffsets[0].name)
        );
      });
    });
  });

  it("does not allow users to deselect a time zone offset", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
    await page.setContent(
      addTimeZoneNamePolyfill(
        html`
          <calcite-input-time-zone value="${testTimeZoneNamesAndOffsets[1].offset}" open></calcite-input-time-zone>
        `
      )
    );
    await page.waitForChanges();

    let selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
    await selectedTimeZoneItem.click();
    await page.waitForChanges();

    selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
    const input = await page.find("calcite-input-time-zone");

    expect(await input.getProperty("value")).toBe(`${testTimeZoneNamesAndOffsets[1].offset}`);
    expect(await selectedTimeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneNamesAndOffsets[1].label);
  });

  it("supports setting maxItems to display", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
    await page.setContent(
      addTimeZoneNamePolyfill(html` <calcite-input-time-zone max-items="7"></calcite-input-time-zone>`)
    );
    const internalCombobox = await page.find("calcite-input-time-zone >>> calcite-combobox");

    // we assume maxItems works properly on combobox
    expect(await internalCombobox.getProperty("maxItems")).toBe(7);
  });
});

/**
 * Helper to inject an Intl polyfill to support time zone-related APIs
 * Extended due to lack of support for "Intl.DateTimeFormatOptions#timeZoneName" in Chromium v92 (bundled in Puppeteer v10).
 *
 * @param testHtml
 */
function addTimeZoneNamePolyfill(testHtml: string): string {
  return html` <script>
      const OriginalDateTimeFormat = Intl.DateTimeFormat;

      class ExtendedDateTimeFormat extends OriginalDateTimeFormat {
        constructor(locales, options) {
          const originalOptions = { ...options };
          delete options?.timeZoneName;
          super(locales, options);
          this.originalOptions = originalOptions;
        }

        formatToParts(date) {
          const originalParts = super.formatToParts(date);
          const timeZoneName = this.originalOptions.timeZoneName;

          if (timeZoneName === "shortOffset") {
            const { timeZone } = this.originalOptions;

            // hardcoding GMT and time zone names for this particular test suite
            const offsetString =
              "GMT" +
              (timeZone === "America/Los_Angeles"
                ? "-7"
                : timeZone === "America/Denver"
                ? "-6"
                : timeZone === "Europe/London" || timeZone === "Europe/Belfast" || timeZone === "Etc/GMT-1"
                ? "+1"
                : "+0");

            originalParts.push({ type: "timeZoneName", value: offsetString });
          }

          return originalParts;
        }

        resolvedOptions() {
          const originalResolvedOptions = OriginalDateTimeFormat.prototype.resolvedOptions;
          const options = originalResolvedOptions.call(this);
          const timeZoneName = options.timeZoneName;

          if (timeZoneName === "shortOffset") {
            options.timeZoneName = undefined;
            options.timeZone = options.timeZone || "UTC";
            return options;
          }

          return options;
        }
      }

      Intl.DateTimeFormat = ExtendedDateTimeFormat;

      Intl.supportedValuesOf = function (key) {
        if (key === "timeZone") {
          return [
            "America/Los_Angeles",
            "America/Denver",
            "Europe/London",

            // not available in Chromium v92 at time of testing
            "Etc/GMT-1",
            "Europe/Belfast",
          ];
        }
      };
    </script>
    ${testHtml}`;
}
