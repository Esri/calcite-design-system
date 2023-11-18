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
  TagAndPage,
} from "../../tests/commonTests";
import { toUserFriendlyName } from "./utils";

const refDateForConsistentTimeZoneGroups = "2023-05-05";

describe("calcite-input-time-zone", () => {
  // for stability, we use time zones that are unaffected by daylight savings time
  const testTimeZoneNamesAndOffsets = [
    { name: "America/Mexico_City", offset: -360, label: "GMT-6" },
    { name: "America/Phoenix", offset: -420, label: "GMT-7" },
    { name: "Pacific/Guam", offset: 600, label: "GMT+10" },
  ];

  async function simpleTestProvider(): Promise<TagAndPage> {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
    await page.setContent(
      html`<calcite-input-time-zone reference-date=${refDateForConsistentTimeZoneGroups}></calcite-input-time-zone>`
    );

    return {
      page,
      tag: "calcite-input-time-zone",
    };
  }

  describe("accessible", () => {
    accessible(simpleTestProvider);
  });

  describe("focusable", () => {
    focusable(simpleTestProvider);
  });

  describe("formAssociated", () => {
    formAssociated(
      {
        tagOrHTML: html`<calcite-input-time-zone
          reference-date=${refDateForConsistentTimeZoneGroups}
        ></calcite-input-time-zone>`,
        beforeContent: async (page) => {
          await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        },
      },
      {
        testValue: "-360",
        clearable: false,
      }
    );
  });

  describe("hidden", () => {
    hidden(simpleTestProvider);
  });

  describe("renders", () => {
    renders(simpleTestProvider, { display: "block" });
  });

  describe("labelable", () => {
    labelable({
      tagOrHTML: html`<calcite-input-time-zone
        reference-date=${refDateForConsistentTimeZoneGroups}
      ></calcite-input-time-zone>`,
      beforeContent: async (page) => {
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
      },
    });
  });

  describe("reflects", () => {
    reflects(simpleTestProvider, [
      { propertyName: "disabled", value: true },
      { propertyName: "maxItems", value: 0 },
      { propertyName: "mode", value: "offset" },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
    ]);
  });

  describe("defaults", () => {
    defaults(simpleTestProvider, [
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "maxItems", defaultValue: 0 },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "mode", defaultValue: "offset" },
      { propertyName: "open", defaultValue: false },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("disabled", () => {
    disabled(simpleTestProvider, {
      shadowAriaAttributeTargetSelector: "calcite-combobox",
    });
  });

  describe("t9n", () => {
    t9n(simpleTestProvider);
  });

  describe("mode", () => {
    describe("offset (default)", () => {
      describe("selects user's matching time zone offset on initialization", () => {
        testTimeZoneNamesAndOffsets.forEach(({ name, offset, label }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(
              html`<calcite-input-time-zone
                reference-date=${refDateForConsistentTimeZoneGroups}
              ></calcite-input-time-zone>`
            );
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
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
            value="${testTimeZoneNamesAndOffsets[1].offset}"
          ></calcite-input-time-zone>`
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
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
            value="9000"
          ></calcite-input-time-zone>`
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
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
            value="600"
          ></calcite-input-time-zone>`
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneNamesAndOffsets[2].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneNamesAndOffsets[2].label);
      });

      it("looks up in label and time zone groups (not displayed)", async () => {
        const displayLabelSearchTerm = "Guam";
        const groupedTimeZoneSearchTerm = "Etc/GMT-10"; // Etc time zones are not displayed for the most part
        const gmtSearchTerm = "GMT-12"; // this time zone is the single Etc time zone that appears in a label for the specified test ref date
        const searchTerms = [displayLabelSearchTerm, groupedTimeZoneSearchTerm, gmtSearchTerm];

        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
        await page.setContent(
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
          ></calcite-input-time-zone>`
        );

        const input = await page.find("calcite-input-time-zone");

        async function clearSearchTerm(searchTerm: string): Promise<void> {
          for (let i = 0; i < searchTerm.length; i++) {
            await input.press("Backspace");
          }
        }

        let matchedTimeZoneItems = await page.findAll(
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden])"
        );
        expect(matchedTimeZoneItems.length).toBeGreaterThan(1);

        await input.click();
        await input.type(searchTerms[0]);
        await page.waitForChanges();

        matchedTimeZoneItems = await page.findAll("calcite-input-time-zone >>> calcite-combobox-item:not([hidden])");

        expect(matchedTimeZoneItems).toHaveLength(1);

        await clearSearchTerm(searchTerms[0]);
        await input.type(searchTerms[1]);
        await page.waitForChanges();

        matchedTimeZoneItems = await page.findAll("calcite-input-time-zone >>> calcite-combobox-item:not([hidden])");

        expect(matchedTimeZoneItems).toHaveLength(1);

        await clearSearchTerm(searchTerms[1]);
        await input.type(searchTerms[2]);
        await page.waitForChanges();

        matchedTimeZoneItems = await page.findAll("calcite-input-time-zone >>> calcite-combobox-item:not([hidden])");

        expect(matchedTimeZoneItems).toHaveLength(2);

        await clearSearchTerm(searchTerms[1]);
        await page.waitForChanges();

        matchedTimeZoneItems = await page.findAll("calcite-input-time-zone >>> calcite-combobox-item:not([hidden])");

        expect(matchedTimeZoneItems.length).toBeGreaterThan(1);
      });
    });

    describe("name", () => {
      describe("selects user's matching time zone name on initialization", () => {
        testTimeZoneNamesAndOffsets.forEach(({ name }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(
              await html`<calcite-input-time-zone
                reference-date=${refDateForConsistentTimeZoneGroups}
                mode="name"
              ></calcite-input-time-zone>`
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
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
            mode="name"
            value="${testTimeZoneNamesAndOffsets[1].name}"
          ></calcite-input-time-zone>`
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
          await html`<calcite-input-time-zone
            reference-date=${refDateForConsistentTimeZoneGroups}
            mode="name"
            value="Does/Not/Exist"
          ></calcite-input-time-zone>`
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
      html`
        <calcite-input-time-zone
          reference-date=${refDateForConsistentTimeZoneGroups}
          value="${testTimeZoneNamesAndOffsets[1].offset}"
          open
        ></calcite-input-time-zone>
      `
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
      html`<calcite-input-time-zone
        reference-date=${refDateForConsistentTimeZoneGroups}
        max-items="7"
      ></calcite-input-time-zone>`
    );
    const internalCombobox = await page.find("calcite-input-time-zone >>> calcite-combobox");

    // we assume maxItems works properly on combobox
    expect(await internalCombobox.getProperty("maxItems")).toBe(7);
  });

  it("allow setting a reference date for specific time zone groupings", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneNamesAndOffsets[0].name);
    await page.setContent(html`
      <calcite-input-time-zone id="default"></calcite-input-time-zone>
      <calcite-input-time-zone
        id="refDate"
        reference-date=${refDateForConsistentTimeZoneGroups}
      ></calcite-input-time-zone>
    `);

    const defaultTimeZoneGroups = await page.findAll("calcite-input-time-zone#default >>> calcite-combobox-item");
    const pastRefDateTimeZoneGroups = await page.findAll("calcite-input-time-zone#refDate >>> calcite-combobox-item");

    expect(defaultTimeZoneGroups.length).not.toBe(pastRefDateTimeZoneGroups.length);
  });
});
