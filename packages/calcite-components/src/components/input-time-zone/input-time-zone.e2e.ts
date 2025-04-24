import { E2EElement, E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  openClose,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests";
import { TagAndPage } from "../../tests/commonTests/interfaces";
import { DEBOUNCE } from "../../utils/resources";
import { findAll } from "../../tests/utils/puppeteer";
import { getCity, toUserFriendlyName } from "./utils";

/*
 * **Notes**
 *
 * - tests need to have an emulated time zone
 * - test time zones should preferably be unaffected by daylight savings time, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for more info
 */

describe("calcite-input-time-zone", () => {
  type TestTimeZoneItem = {
    name: string;
    offset: number;
    label: string;
  };

  // for stability, we use time zones that are unaffected by daylight savings time
  const testTimeZoneItems: TestTimeZoneItem[] = [
    { name: "America/Mexico_City", offset: -360, label: "GMT-6" },
    { name: "America/Phoenix", offset: -420, label: "GMT-7" },
    { name: "Pacific/Guam", offset: 600, label: "GMT+10" },
    { name: "Pacific/Galapagos", offset: -360, label: "GMT-6" },
  ];

  async function simpleTestProvider(): Promise<TagAndPage> {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneItems[0].name);
    await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);

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
        tagOrHTML: html`<calcite-input-time-zone></calcite-input-time-zone>`,
        beforeContent: async (page) => {
          await page.emulateTimezone(testTimeZoneItems[0].name);
        },
      },
      {
        testValue: "-360",
        clearable: false,
      },
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
      tagOrHTML: html`<calcite-input-time-zone></calcite-input-time-zone>`,
      beforeContent: async (page) => {
        await page.emulateTimezone(testTimeZoneItems[0].name);
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
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
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
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
    ]);
  });

  describe("disabled", () => {
    disabled(simpleTestProvider, {
      shadowAriaAttributeTargetSelector: "calcite-combobox",
    });
  });

  describe("translation support", () => {
    t9n(simpleTestProvider);
  });

  describe("openClose", () => {
    openClose(simpleTestProvider);

    describe("initially open", () => {
      openClose.initial("calcite-input-time-zone", {
        beforeContent: async (page) => {
          await page.emulateTimezone(testTimeZoneItems[0].name);
          await page.waitForChanges();
        },
      });
    });
  });

  describe("mode", () => {
    describe("offset (default)", () => {
      describe("selects user's matching time zone offset on initialization", () => {
        testTimeZoneItems.forEach(({ name, offset, label }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);
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
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone value="${testTimeZoneItems[1].offset}"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[1].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[1].label);
      });

      it("ignores invalid values", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(html`<calcite-input-time-zone value="9000"></calcite-input-time-zone>`);

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[0].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[0].label);
      });

      it("omits filtered or non-localized time zones (incoming to browser)", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(await html`<calcite-input-time-zone value="600"></calcite-input-time-zone>`);

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[2].offset}`);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[2].label);
      });

      it("looks up in label and time zone groups (not displayed)", async () => {
        const displayLabelSearchTerm = "Guam";
        const groupedTimeZoneSearchTerm = "Moresby";
        const gmtSearchTerm = "GMT-12";
        const searchTerms = [displayLabelSearchTerm, groupedTimeZoneSearchTerm, gmtSearchTerm];

        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);

        const input = await page.find("calcite-input-time-zone");

        async function clearSearchTerm(searchTerm: string): Promise<void> {
          for (let i = 0; i < searchTerm.length; i++) {
            await input.press("Backspace");
          }
        }

        let matchedTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );
        expect(matchedTimeZoneItems.length).toBeGreaterThan(1);

        await input.click();
        await input.type(searchTerms[0]);
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        matchedTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );

        expect(matchedTimeZoneItems).toHaveLength(1);

        await clearSearchTerm(searchTerms[0]);
        await input.type(searchTerms[1]);
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        matchedTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );

        expect(matchedTimeZoneItems).toHaveLength(1);

        await clearSearchTerm(searchTerms[1]);
        await input.type(searchTerms[2]);
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        matchedTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );

        expect(matchedTimeZoneItems).toHaveLength(2);

        await clearSearchTerm(searchTerms[1]);
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        matchedTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );

        expect(matchedTimeZoneItems.length).toBeGreaterThan(1);
      });
    });

    describe("name", () => {
      describe("selects user's matching time zone name on initialization", () => {
        testTimeZoneItems.forEach(({ name }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(html`<calcite-input-time-zone mode="name"></calcite-input-time-zone>`);
            await page.waitForChanges();

            const input = await page.find("calcite-input-time-zone");
            expect(await input.getProperty("value")).toBe(name);

            const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

            expect(await timeZoneItem.getProperty("textLabel")).toMatch(name);
          });
        });
      });

      it("allows users to preselect a time zone by name", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone mode="name" value="${testTimeZoneItems[1].name}"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneItems[1].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[1].name);
      });

      it("ignores invalid values", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone mode="name" value="Does/Not/Exist"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneItems[0].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[0].name);
      });
    });

    describe("region", () => {
      describe("selects user's matching time zone name on initialization", () => {
        testTimeZoneItems.forEach(({ name }) => {
          it(`selects default time zone for "${name}"`, async () => {
            const page = await newE2EPage();
            await page.emulateTimezone(name);
            await page.setContent(html`<calcite-input-time-zone mode="region"></calcite-input-time-zone>`);
            await page.waitForChanges();

            const input = await page.find("calcite-input-time-zone");
            expect(await input.getProperty("value")).toBe(name);

            const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

            expect(await timeZoneItem.getProperty("textLabel")).toMatch(toUserFriendlyName(getCity(name)));
          });
        });
      });

      it("allows users to preselect a time zone by name", async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone mode="region" value="${testTimeZoneItems[1].name}"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneItems[1].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(
          toUserFriendlyName(getCity(testTimeZoneItems[1].name)),
        );
      });

      it("ignores invalid values", async () => {
        const page = await newE2EPage();

        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone mode="region" value="Does/Not/Exist"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(testTimeZoneItems[0].name);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(
          toUserFriendlyName(getCity(testTimeZoneItems[0].name)),
        );
      });

      it("properly sets region label when setting value programmatically", async () => {
        const page = await newE2EPage();

        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(html`<calcite-input-time-zone mode="region"></calcite-input-time-zone>`);

        const input = await page.find("calcite-input-time-zone");
        const region = "America/New_York";

        input.setProperty("value", region);
        await page.waitForChanges();

        expect(await input.getProperty("value")).toBe(region);

        const timeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

        expect(await timeZoneItem.getProperty("textLabel")).toMatch(toUserFriendlyName(getCity(region)));
      });

      it("maps deprecated time zones to aliases", async () => {
        const deprecatedTimeZone1 = "Asia/Calcutta";
        const aliasTimeZone1 = "Asia/Kolkata";

        const page = await newE2EPage();

        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html`<calcite-input-time-zone mode="region" value="${deprecatedTimeZone1}"></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");

        expect(await input.getProperty("value")).toBe(aliasTimeZone1);

        const deprecatedTimeZone2 = "Asia/Istanbul";
        const aliasTimeZone2 = "Europe/Istanbul";

        input.setProperty("value", deprecatedTimeZone2);
        await page.waitForChanges();

        expect(await input.getProperty("value")).toBe(aliasTimeZone2);
      });
    });
  });

  describe("clearable", () => {
    it("does not allow users to deselect a time zone value by default", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone(testTimeZoneItems[1].name);
      await page.setContent(html`
        <calcite-input-time-zone value="${testTimeZoneItems[1].offset}" open></calcite-input-time-zone>
      `);
      await page.waitForChanges();

      let selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");

      await selectedTimeZoneItem.click();
      await page.waitForChanges();

      selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
      const input = await page.find("calcite-input-time-zone");

      expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[1].offset}`);
      expect(await selectedTimeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[1].label);

      input.setProperty("value", "");
      await page.waitForChanges();

      selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
      expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[1].offset}`);
      expect(await selectedTimeZoneItem.getProperty("textLabel")).toMatch(testTimeZoneItems[1].label);
    });

    describe("clearing by value", () => {
      let page: E2EPage;
      let input: E2EElement;

      beforeEach(async () => {
        page = await newE2EPage();
        await page.emulateTimezone(testTimeZoneItems[0].name);
        await page.setContent(
          html` <calcite-input-time-zone value="${testTimeZoneItems[1].offset}" clearable></calcite-input-time-zone>`,
        );
        input = await page.find("calcite-input-time-zone");
      });

      it("empty string", async () => {
        await input.setProperty("value", "");
        await page.waitForChanges();

        expect(await input.getProperty("value")).toBe("");
      });

      it("null", async () => {
        await input.setProperty("value", null);
        await page.waitForChanges();

        expect(await input.getProperty("value")).toBe("");
      });
    });

    it("allows users to deselect a time zone value when clearable is enabled", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone(testTimeZoneItems[0].name);
      await page.setContent(
        html`<calcite-input-time-zone value="${testTimeZoneItems[1].offset}" clearable></calcite-input-time-zone>`,
      );

      const input = await page.find("calcite-input-time-zone");
      expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[1].offset}`);

      await input.callMethod("setFocus");
      await input.press("Escape");
      await page.waitForChanges();

      expect(await input.getProperty("value")).toBe("");
    });

    it("can be cleared on initialization when clearable is enabled", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone(testTimeZoneItems[0].name);
      await page.setContent(html`<calcite-input-time-zone value="" clearable></calcite-input-time-zone>`);

      const input = await page.find("calcite-input-time-zone");
      expect(await input.getProperty("value")).toBe("");
    });

    it("selects user time zone value when value is not set and clearable is enabled", async () => {
      const page = await newE2EPage();
      await page.emulateTimezone(testTimeZoneItems[0].name);
      await page.setContent(html`<calcite-input-time-zone clearable></calcite-input-time-zone>`);

      const input = await page.find("calcite-input-time-zone");
      expect(await input.getProperty("value")).toBe(`${testTimeZoneItems[0].offset}`);
    });
  });

  describe("selection of subsequent items with the same offset", () => {
    const testCases: {
      name: string;
      initialTimeZoneItem: TestTimeZoneItem;
    }[] = [
      {
        name: "displays selected item when changing from another offset",
        initialTimeZoneItem: testTimeZoneItems[1],
      },
      {
        name: "displays selected item when changing from the same offset",
        initialTimeZoneItem: testTimeZoneItems[0],
      },
    ];

    testCases.forEach(({ name, initialTimeZoneItem }) => {
      it(`${name}`, async () => {
        const page = await newE2EPage();
        await page.emulateTimezone(initialTimeZoneItem.name);
        await page.setContent(
          html`<calcite-input-time-zone
            value="${initialTimeZoneItem.offset}"
            reference-date="2024-10-01"
          ></calcite-input-time-zone>`,
        );

        const input = await page.find("calcite-input-time-zone");
        await input.click();
        await page.waitForChanges();
        await input.type("(GMT-6)");
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        const sharedOffsetTimeZoneItems = await findAll(
          page,
          "calcite-input-time-zone >>> calcite-combobox-item:not([hidden]):not([item-hidden])",
        );
        expect(sharedOffsetTimeZoneItems).toHaveLength(2);

        await sharedOffsetTimeZoneItems[1].click();
        await page.waitForChanges();
        await page.waitForTimeout(DEBOUNCE.filter);

        const selectedTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item[selected]");
        const itemMetadata = await selectedTimeZoneItem.getProperty("metadata");
        const expectedTimeZoneItem = testTimeZoneItems[3];

        expect(await input.getProperty("value")).toBe(`${expectedTimeZoneItem.offset}`);
        expect(itemMetadata.filterValue).toContain(expectedTimeZoneItem.name);
      });
    });
  });

  it("supports setting maxItems to display", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneItems[0].name);
    await page.setContent(html`<calcite-input-time-zone max-items="7"></calcite-input-time-zone>`);
    const internalCombobox = await page.find("calcite-input-time-zone >>> calcite-combobox");

    // we assume maxItems works properly on combobox
    expect(await internalCombobox.getProperty("maxItems")).toBe(7);
  });

  it("recreates time zone items when item-dependent props change", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneItems[0].name);
    await page.setContent(html`<calcite-input-time-zone mode="name"></calcite-input-time-zone>`);
    await page.waitForChanges();
    const inputTimeZone = await page.find("calcite-input-time-zone");

    let prevComboboxItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item");
    inputTimeZone.setProperty("lang", "es");
    await page.waitForChanges();

    let currComboboxItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item");
    expect(currComboboxItem).not.toBe(prevComboboxItem);

    prevComboboxItem = currComboboxItem;
    inputTimeZone.setProperty("referenceDate", "2021-01-01");
    await page.waitForChanges();

    currComboboxItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item");
    expect(currComboboxItem).not.toBe(prevComboboxItem);

    prevComboboxItem = currComboboxItem;
    inputTimeZone.setProperty("mode", "name");
    await page.waitForChanges();

    currComboboxItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item");
    expect(currComboboxItem).not.toBe(prevComboboxItem);
  });

  describe("offsetStyle", () => {
    const gmtTimeZoneLocale = "en-GB";
    const utcTimeZoneLocale = "fr";

    let page: E2EPage;

    async function assertItemLabelMatches(page: E2EPage, offsetMarker: "GMT" | "UTC"): Promise<void> {
      // all items are formatted equally, so we only need to check the first one
      const firstTimeZoneItem = await page.find("calcite-input-time-zone >>> calcite-combobox-item");

      expect(await firstTimeZoneItem.getProperty("textLabel")).toContain(offsetMarker);
    }

    beforeEach(async () => {
      page = await newE2EPage();
      await page.emulateTimezone(testTimeZoneItems[0].name);
    });

    describe("displays UTC or GMT based on user's locale (default)", () => {
      it("displays GMT for GMT-preferred locale", async () => {
        await page.setContent(html`<calcite-input-time-zone lang="${gmtTimeZoneLocale}"></calcite-input-time-zone>`);

        await assertItemLabelMatches(page, "GMT");
      });

      it("displays UTC for UTC-preferred locale", async () => {
        await page.setContent(html`<calcite-input-time-zone lang="${utcTimeZoneLocale}"></calcite-input-time-zone>`);

        await assertItemLabelMatches(page, "UTC");
      });
    });

    it("supports GMT as a style", async () => {
      await page.setContent(
        html`<calcite-input-time-zone lang="${utcTimeZoneLocale}" offset-style="gmt"></calcite-input-time-zone>`,
      );

      await assertItemLabelMatches(page, "GMT");
    });

    it("supports UTC as a style", async () => {
      await page.setContent(
        html`<calcite-input-time-zone lang="${gmtTimeZoneLocale}" offset-style="utc"></calcite-input-time-zone>`,
      );

      await assertItemLabelMatches(page, "UTC");
    });
  });

  it("keeps internal combobox in sync after selection when setting value along with time zone item-related props", async () => {
    const page = await newE2EPage();
    await page.emulateTimezone(testTimeZoneItems[0].name);
    await page.setContent(html`<calcite-input-time-zone></calcite-input-time-zone>`);
    const inputTimeZone = await page.find("calcite-input-time-zone");
    const combobox = await page.find("calcite-input-time-zone >>> calcite-combobox");

    inputTimeZone.setProperty("referenceDate", new Date());
    inputTimeZone.setProperty("value", testTimeZoneItems[1].offset);
    await page.waitForChanges();

    await inputTimeZone.callMethod("setFocus");
    await inputTimeZone.press("ArrowDown");
    await inputTimeZone.press("Escape");
    await page.waitForChanges();

    expect(await combobox.getProperty("value")).not.toBe("");
  });
});
