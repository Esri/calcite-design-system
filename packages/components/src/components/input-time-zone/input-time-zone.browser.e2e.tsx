import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { DEBOUNCE } from "../../utils/resources";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-input-time-zone"),
    [
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
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-input-time-zone"),
    [
      { propertyName: "disabled", value: true },
      { propertyName: "maxItems", value: 0 },
      { propertyName: "mode", value: "offset" },
      { propertyName: "open", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "overlayPositioning", value: "absolute" },
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
    ],
  );
});

describe("hidden", () => {
  hidden(() => mount("calcite-input-time-zone"));
});

describe("renders", () => {
  renders(() => mount("calcite-input-time-zone"), { display: "block" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-input-time-zone"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-time-zone"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input-time-zone"));
});

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

describe("selection of subsequent items with the same offset", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

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
      vi.stubEnv("TZ", initialTimeZoneItem.name);
      const { el, reRender } = await mount(
        <calcite-input-time-zone
          referenceDate="2024-10-01"
          value={`${initialTimeZoneItem.offset}`}
        />,
      );

      await userEvent.click(el);
      await userEvent.type(el, "(GMT-6)");
      vi.advanceTimersByTime(DEBOUNCE.filter);
      await reRender();

      const sharedOffsetTimeZoneItems = page.getBySelector(
        "calcite-input-time-zone calcite-combobox-item:not([hidden]):not([item-hidden])",
      );
      expect(sharedOffsetTimeZoneItems).toHaveLength(2);

      await userEvent.click(sharedOffsetTimeZoneItems.nth(1));
      vi.advanceTimersByTime(DEBOUNCE.filter);

      const selectedTimeZoneItem = page.getBySelector(
        "calcite-input-time-zone calcite-combobox-item[selected]",
      );
      const expectedTimeZoneItem = testTimeZoneItems[3];

      expect(el).toHaveProperty("value", `${expectedTimeZoneItem.offset}`);
      await expect
        .element(selectedTimeZoneItem.first())
        .toHaveProperty(
          "metadata.filterValue",
          expect.arrayContaining([expectedTimeZoneItem.name]),
        );
    });
  });
});
