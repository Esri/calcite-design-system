import { mount, type RenderResult } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { DEBOUNCE } from "../../utils/resources";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { mockConsole } from "../../tests/utils/logging";
import { CSS as ComboboxCSS } from "../combobox/resources";
import type { Combobox } from "../combobox/combobox";
import type { ComboboxItem } from "../combobox-item/combobox-item";
import { getCity, toUserFriendlyName } from "./utils";
import { InputTimeZone } from "./input-time-zone";
import { testTimeZones, type TestTimeZone } from "./time-zone-fixtures";
import { afterNextFrame } from "../../tests/utils/timing";

/*
 * These tests cover time-zone-sensitive behavior migrated from the legacy Puppeteer E2E suite.
 *
 * Unlike most browser-mode tests, this file must not run as part of the main browser suite because
 * Vitest browser mode does not support changing the browser time zone dynamically per test. Instead,
 * vite.time-zone.config.ts starts the Playwright browser context with BROWSER_TIME_ZONE before the
 * component initializes. The tests then inspect Intl.DateTimeFormat().resolvedOptions().timeZone at
 * runtime, match it to one of the stable fixtures below, and run expectations for that configured zone.
 *
 * Run this file once per required time zone by setting BROWSER_TIME_ZONE. If the browser context uses a
 * time zone not listed in testTimeZones, this suite fails immediately so a missing or unsupported
 * config is visible.
 */

mockConsole();

const runtimeTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const configuredTimeZoneItem = testTimeZones.find(({ name }) => name === runtimeTimeZoneName);

if (!configuredTimeZoneItem) {
  throw new Error(
    `input-time-zone time zone browser tests must run with one of: ${testTimeZones
      .map(({ name }) => name)
      .join(", ")}. Received: ${runtimeTimeZoneName || "unknown"}.`,
  );
}

const alternateTimeZoneItem = testTimeZones.find(
  ({ offset }) => offset !== configuredTimeZoneItem.offset,
);

if (!alternateTimeZoneItem) {
  throw new Error(
    "input-time-zone time zone browser tests require a fixture with a different offset.",
  );
}

async function mountInputTimeZone(
  props: Partial<InputTimeZone> = {},
): Promise<RenderResult<InputTimeZone>> {
  return mount<InputTimeZone>(InputTimeZone, {
    afterConnect: (el) => {
      Object.assign(el, props);
    },
  });
}

async function waitForUpdates(component: InputTimeZone): Promise<void> {
  await component.updateComplete;
  await afterNextFrame();
}

async function waitForTimeZoneItemRefresh(
  component: InputTimeZone,
  previousItem: ComboboxItem["el"],
  selector: string,
  expectedUpdate: "recreated" | "reused",
): Promise<ComboboxItem["el"]> {
  return vi.waitFor(async () => {
    await waitForUpdates(component);
    const currentItem = getTimeZoneItem(selector);
    const itemWasRecreated = currentItem !== previousItem;
    const expectedItemRecreation = expectedUpdate === "recreated";

    if (itemWasRecreated !== expectedItemRecreation) {
      throw new Error(`Expected time zone item to be ${expectedUpdate}.`);
    }

    return currentItem;
  });
}

async function waitForFilter(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, DEBOUNCE.filter));
}

function getCombobox(): Combobox["el"] {
  return page.getBySelector("calcite-combobox").element() as Combobox["el"];
}

function getTimeZoneItems(selector = "calcite-combobox-item"): ComboboxItem["el"][] {
  return page.getBySelector(selector).elements() as ComboboxItem["el"][];
}

function getTimeZoneItem(selector: string): ComboboxItem["el"] {
  return getTimeZoneItems(selector)[0];
}

function getSelectedTimeZoneItem(): ComboboxItem["el"] {
  return getTimeZoneItem("calcite-combobox-item[selected]");
}

function getSelectedItemLabel(): string {
  return page.getBySelector(`.${ComboboxCSS.label}`).first().element().textContent;
}

async function clearSearchTerm(searchTerm: string): Promise<void> {
  await userEvent.keyboard("{Backspace}".repeat(searchTerm.length));
}

describe("mode", () => {
  describe("offset (default)", () => {
    it(`selects default time zone for configured browser time zone "${configuredTimeZoneItem.name}"`, async () => {
      const { el } = await mountInputTimeZone();

      expect(el.value).toBe(`${configuredTimeZoneItem.offset}`);
      expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.label);
    });

    it("allows users to preselect a time zone offset", async () => {
      const { el } = await mountInputTimeZone({ value: `${alternateTimeZoneItem.offset}` });

      expect(el.value).toBe(`${alternateTimeZoneItem.offset}`);
      expect(getSelectedTimeZoneItem().heading).toMatch(alternateTimeZoneItem.label);
    });

    it("ignores invalid values", async () => {
      const { el } = await mountInputTimeZone({ value: "9000" });

      expect(el.value).toBe(`${configuredTimeZoneItem.offset}`);
      expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.label);
    });

    it("omits filtered or non-localized time zones (incoming to browser)", async () => {
      const { el } = await mountInputTimeZone({ value: "600" });

      expect(el.value).toBe(`${testTimeZones[2].offset}`);
      expect(getSelectedTimeZoneItem().heading).toMatch(testTimeZones[2].label);
    });

    it("looks up in label and time zone groups (not displayed)", async () => {
      const displayLabelSearchTerm = "Guam";
      const groupedTimeZoneSearchTerm = "Moresby";
      const gmtSearchTerm = "GMT-12";
      const { el, component } = await mountInputTimeZone();

      expect(
        getTimeZoneItems("calcite-combobox-item:not([hidden]):not([item-hidden])").length,
      ).toBeGreaterThan(1);

      const openEvent = waitForEvent(el, "calciteInputTimeZoneOpen");
      await userEvent.click(el);
      await openEvent;
      await userEvent.keyboard(displayLabelSearchTerm);
      await waitForUpdates(component);
      await waitForFilter();

      expect(
        getTimeZoneItems("calcite-combobox-item:not([hidden]):not([item-hidden])"),
      ).toHaveLength(1);

      await clearSearchTerm(displayLabelSearchTerm);
      await userEvent.keyboard(groupedTimeZoneSearchTerm);
      await waitForUpdates(component);
      await waitForFilter();

      expect(
        getTimeZoneItems("calcite-combobox-item:not([hidden]):not([item-hidden])"),
      ).toHaveLength(1);

      await clearSearchTerm(groupedTimeZoneSearchTerm);
      await userEvent.keyboard(gmtSearchTerm);
      await waitForUpdates(component);
      await waitForFilter();

      expect(
        getTimeZoneItems("calcite-combobox-item:not([hidden]):not([item-hidden])"),
      ).toHaveLength(2);

      await clearSearchTerm(gmtSearchTerm);
      await waitForUpdates(component);
      await waitForFilter();

      expect(
        getTimeZoneItems("calcite-combobox-item:not([hidden]):not([item-hidden])").length,
      ).toBeGreaterThan(1);
    });

    it("recreates time zone items when item-dependent props change", async (context) => {
      context.skip("waitForTimeZoneItemRefresh() is unstable");

      const itemSelector = `calcite-combobox-item[value='${alternateTimeZoneItem.offset}']`;
      const { el, component } = await mountInputTimeZone({ referenceDate: "2020-01-01" });

      let prevItem = getTimeZoneItem(itemSelector);
      let prevItemLabel = prevItem.heading;
      let prevSelectedItemLabel = getSelectedItemLabel();
      el.lang = "ja";

      let currItem = await waitForTimeZoneItemRefresh(
        component,
        prevItem,
        itemSelector,
        "recreated",
      );
      let currItemLabel = currItem.heading;
      let currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).not.toBe(prevItem);
      expect(currItemLabel).not.toBe(prevItemLabel);
      expect(currSelectedItemLabel).not.toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.referenceDate = "2020-06-01";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "recreated");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).not.toBe(prevItem);
      expect(currItemLabel).not.toBe(prevItemLabel);
      expect(currSelectedItemLabel).not.toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.mode = "offset";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel); // same mode would not change label from same mode update
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel); // same mode would not change label from same mode update
    });
  });

  describe("name", () => {
    it(`selects default time zone for configured browser time zone "${configuredTimeZoneItem.name}"`, async () => {
      const { el } = await mountInputTimeZone({ mode: "name" });

      expect(el.value).toBe(configuredTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.name);
    });

    it("allows users to preselect a time zone by name", async () => {
      const { el } = await mountInputTimeZone({ mode: "name", value: alternateTimeZoneItem.name });

      expect(el.value).toBe(alternateTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toMatch(alternateTimeZoneItem.name);
    });

    it("ignores invalid values", async () => {
      const { el } = await mountInputTimeZone({ mode: "name", value: "Does/Not/Exist" });

      expect(el.value).toBe(configuredTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.name);
    });

    it("recreates time zone items when item-dependent props change", async (context) => {
      context.skip("waitForTimeZoneItemRefresh() is unstable");

      const itemSelector = `calcite-combobox-item[value='${alternateTimeZoneItem.name}']`;
      const { el, component } = await mountInputTimeZone({
        mode: "name",
        referenceDate: "2020-01-01",
      });

      let prevItem = getTimeZoneItem(itemSelector);
      let prevItemLabel = prevItem.heading;
      let prevSelectedItemLabel = getSelectedItemLabel();
      el.lang = "ja";

      let currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      let currItemLabel = currItem.heading;
      let currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel);
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.referenceDate = "2020-06-01";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel);
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.mode = "name";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel); // same mode would not change label from reference date update
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel); // same mode would not change label from reference date update
    });
  });

  describe("region", () => {
    it(`selects default time zone for configured browser time zone "${configuredTimeZoneItem.name}"`, async () => {
      const { el } = await mountInputTimeZone({ mode: "region" });

      expect(el.value).toBe(configuredTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toMatch(
        toUserFriendlyName(getCity(configuredTimeZoneItem.name)),
      );
    });

    it("allows users to preselect a time zone by name", async () => {
      const { el } = await mountInputTimeZone({
        mode: "region",
        value: alternateTimeZoneItem.name,
      });

      expect(el.value).toBe(alternateTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toContain(
        toUserFriendlyName(getCity(alternateTimeZoneItem.name)),
      );
    });

    it("ignores invalid values", async () => {
      const { el } = await mountInputTimeZone({ mode: "region", value: "Does/Not/Exist" });

      expect(el.value).toBe(configuredTimeZoneItem.name);
      expect(getSelectedTimeZoneItem().heading).toContain(
        toUserFriendlyName(getCity(configuredTimeZoneItem.name)),
      );
    });

    it("properly sets region label when setting value programmatically", async () => {
      const { el, component } = await mountInputTimeZone({ mode: "region" });
      const region = "America/New_York";

      el.value = region;
      await waitForUpdates(component);

      expect(el.value).toBe(region);
      expect(getSelectedTimeZoneItem().heading).toBe("New York, United States");
    });

    it("updates the label and shows selection immediately on user interaction", async () => {
      const { el, component } = await mountInputTimeZone({ mode: "region" });
      const openEvent = waitForEvent(el, "calciteInputTimeZoneOpen");
      const timeZoneScroller = page.getBySelector(`.${ComboboxCSS.listContainer}`).element();
      await userEvent.click(el);
      const scrollTop = timeZoneScroller.scrollTop;
      await openEvent;

      expect(timeZoneScroller.scrollTop).toEqual(scrollTop);

      const newYorkItem = getTimeZoneItem("calcite-combobox-item[data-label='New York']");
      await userEvent.click(newYorkItem);
      await waitForUpdates(component);

      expect(newYorkItem.heading).toBe("New York, United States");
    });

    it("maps deprecated time zones to aliases", async () => {
      const deprecatedTimeZone1 = "Asia/Calcutta";
      const aliasTimeZone1 = "Asia/Kolkata";
      const deprecatedTimeZone2 = "Asia/Istanbul";
      const aliasTimeZone2 = "Europe/Istanbul";
      const { el, component } = await mountInputTimeZone({
        mode: "region",
        value: deprecatedTimeZone1,
      });

      expect(el.value).toBe(aliasTimeZone1);

      el.value = deprecatedTimeZone2;
      await waitForUpdates(component);

      expect(el.value).toBe(aliasTimeZone2);
    });

    it("recreates time zone items when item-dependent props change", async (context) => {
      context.skip("waitForTimeZoneItemRefresh() is unstable");

      const itemSelector = `calcite-combobox-item[value='${alternateTimeZoneItem.name}']`;
      const { el, component } = await mountInputTimeZone({
        mode: "region",
        referenceDate: "2020-01-01",
      });

      let prevItem = getTimeZoneItem(itemSelector);
      let prevItemLabel = prevItem.heading;
      let prevSelectedItemLabel = getSelectedItemLabel();
      el.lang = "ja";

      let currItem = await waitForTimeZoneItemRefresh(
        component,
        prevItem,
        itemSelector,
        "recreated",
      );
      let currItemLabel = currItem.heading;
      let currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).not.toBe(prevItem);
      expect(currItemLabel).not.toBe(prevItemLabel);
      expect(currSelectedItemLabel).not.toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.referenceDate = "2020-06-01";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel);
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel);

      prevItem = currItem;
      prevItemLabel = currItemLabel;
      prevSelectedItemLabel = currSelectedItemLabel;
      el.mode = "region";

      currItem = await waitForTimeZoneItemRefresh(component, prevItem, itemSelector, "reused");
      currItemLabel = currItem.heading;
      currSelectedItemLabel = getSelectedItemLabel();
      expect(currItem).toBe(prevItem);
      expect(currItemLabel).toBe(prevItemLabel); // same mode would not change label from reference date update
      expect(currSelectedItemLabel).toBe(prevSelectedItemLabel); // same mode would not change label from reference date update
    });
  });
});

describe("clearable", () => {
  it("does not allow users to deselect a time zone value by default", async () => {
    const { el, component } = await mountInputTimeZone({
      open: true,
      value: `${configuredTimeZoneItem.offset}`,
    });

    await userEvent.click(getSelectedTimeZoneItem());
    await waitForUpdates(component);

    expect(el.value).toBe(`${configuredTimeZoneItem.offset}`);
    expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.label);

    el.value = "";
    await waitForUpdates(component);

    expect(el.value).toBe(`${configuredTimeZoneItem.offset}`);
    expect(getSelectedTimeZoneItem().heading).toMatch(configuredTimeZoneItem.label);
  });

  describe("clearing by value", () => {
    it("empty string", async () => {
      const { el, component } = await mountInputTimeZone({
        clearable: true,
        value: `${alternateTimeZoneItem.offset}`,
      });

      el.value = "";
      await waitForUpdates(component);

      expect(el.value).toBe("");
    });

    it("undefined", async () => {
      const { el, component } = await mountInputTimeZone({
        clearable: true,
        value: `${alternateTimeZoneItem.offset}`,
      });

      el.value = undefined;
      await waitForUpdates(component);

      expect(el.value).toBe("");
    });
  });

  it("allows users to deselect a time zone value when clearable is enabled", async () => {
    const { el, component } = await mountInputTimeZone({
      clearable: true,
      value: `${alternateTimeZoneItem.offset}`,
    });

    expect(el.value).toBe(`${alternateTimeZoneItem.offset}`);

    await el.setFocus();
    await userEvent.keyboard("{Escape}");
    await waitForUpdates(component);

    expect(el.value).toBe("");
  });

  it("can be cleared on initialization when clearable is enabled", async () => {
    const { el } = await mountInputTimeZone({ clearable: true, value: "" });

    expect(el.value).toBe("");
  });

  it("selects user time zone value when value is not set and clearable is enabled", async () => {
    const { el } = await mountInputTimeZone({ clearable: true });

    expect(el.value).toBe(`${configuredTimeZoneItem.offset}`);
  });
});

describe("selection of subsequent items with the same offset", () => {
  const testCases: {
    name: string;
    initialTimeZoneItem: TestTimeZone;
  }[] = [
    {
      name: "displays selected item when changing from another offset",
      initialTimeZoneItem: testTimeZones[1],
    },
    {
      name: "displays selected item when changing from the same offset",
      initialTimeZoneItem: testTimeZones[0],
    },
  ];

  testCases.forEach(({ name, initialTimeZoneItem }) => {
    it(name, async () => {
      const { el, component } = await mountInputTimeZone({
        referenceDate: "2024-10-01",
        value: `${initialTimeZoneItem.offset}`,
      });
      const openEvent = waitForEvent(el, "calciteInputTimeZoneOpen");

      await userEvent.click(el);
      await openEvent;
      await userEvent.keyboard("(GMT-6)");
      await waitForUpdates(component);
      await waitForFilter();

      const sharedOffsetTimeZoneItems = getTimeZoneItems(
        "calcite-combobox-item:not([hidden]):not([item-hidden])",
      );
      expect(sharedOffsetTimeZoneItems).toHaveLength(2);

      await userEvent.click(sharedOffsetTimeZoneItems[1]);
      await waitForUpdates(component);
      await waitForFilter();

      const selectedTimeZoneItem = getSelectedTimeZoneItem();
      const itemMetadata = selectedTimeZoneItem.metadata;
      const expectedTimeZoneItem = testTimeZones[3];

      expect(el.value).toBe(`${expectedTimeZoneItem.offset}`);
      expect(itemMetadata!.filterValue).toContain(expectedTimeZoneItem.name);
    });
  });
});

it("supports setting maxItems to display", async () => {
  await mountInputTimeZone({ maxItems: 7 });

  expect(getCombobox().maxItems).toBe(7);
});

describe("offsetStyle", () => {
  const gmtTimeZoneLocale = "en-GB";
  const utcTimeZoneLocale = "fr";

  async function assertItemLabelMatches(
    offsetMarker: "GMT" | "UTC",
    props: Partial<InputTimeZone>,
  ): Promise<void> {
    await mountInputTimeZone(props);

    expect(getTimeZoneItem("calcite-combobox-item").heading).toContain(offsetMarker);
  }

  describe("displays UTC or GMT based on user's locale (default)", () => {
    it("displays GMT for GMT-preferred locale", async () => {
      await assertItemLabelMatches("GMT", { lang: gmtTimeZoneLocale });
    });

    it("displays UTC for UTC-preferred locale", async () => {
      await assertItemLabelMatches("UTC", { lang: utcTimeZoneLocale });
    });
  });

  it("supports GMT as a style", async () => {
    await assertItemLabelMatches("GMT", { lang: utcTimeZoneLocale, offsetStyle: "gmt" });
  });

  it("supports UTC as a style", async () => {
    await assertItemLabelMatches("UTC", { lang: gmtTimeZoneLocale, offsetStyle: "utc" });
  });
});

it("keeps internal combobox in sync after selection when setting value along with time zone item-related props", async () => {
  const { el, component } = await mountInputTimeZone();
  const combobox = getCombobox();

  el.referenceDate = new Date();
  el.value = `${alternateTimeZoneItem.offset}`;
  await waitForUpdates(component);

  await el.setFocus();
  await userEvent.keyboard("{ArrowDown}{Escape}");
  await waitForUpdates(component);

  expect(combobox.value).not.toBe("");
});
