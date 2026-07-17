import { h } from "@arcgis/lumina";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page } from "vitest/browser";
import { defaults, focusable, hidden, renders, t9n, themed } from "../../tests/commonTests/browser";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import { DatePicker } from "./date-picker";
import { mockConsole } from "../../tests/utils/logging";
import type { DatePickerMonth } from "../date-picker-month/date-picker-month";

afterEach(() => {
  vi.useRealTimers();
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-date-picker"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "calendars",
        defaultValue: 2,
      },
      {
        propertyName: "monthStyle",
        defaultValue: "wide",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-date-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-date-picker"), { display: "inline-block" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-date-picker"), {
    shadowFocusTargetSelector: "calcite-date-picker-month",
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-date-picker"));
});

describe("activeDate", () => {
  it("should update calendar when activeDate changes", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker value="2025-09-01" />);
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInput();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectMenu();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  it("should update calendar when activeDate changes in range", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker range />);
    el.value = ["2025-09-01", "2025-11-15"];
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInput();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectMenu();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  it("should update calendar when activeDate changes in range when calendars is 1", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker calendars={1} range />);
    el.value = ["2025-09-01", "2025-11-15"];
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInput();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectMenu();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  function getYearInput(): Locator {
    return page.getByRole("textbox", { name: "Year" }).first();
  }

  function getMonthSelectMenu(): Locator {
    return page.getByRole("combobox", { name: "Month menu" }).first();
  }
});

describe("value", () => {
  const today = new Date(2026, 6, 16, 12);
  const todayDayId = "20260716";
  const unsetValueCases = [
    { label: "empty string", value: "" },
    { label: "null", value: null },
    { label: "undefined", value: undefined },
  ] satisfies { label: string; value: "" | null | undefined }[];

  it.each<{ label: string; value: DatePicker["value"] }>(unsetValueCases)(
    "clears valueAsDate and activates the current date when value is set to $label",
    async ({ value }) => {
      const { el, component } = await mount<DatePicker>(<calcite-date-picker value="2025-12-05" />);
      await component.updateComplete;

      expect(el.valueAsDate).toBeInstanceOf(Date);

      vi.useFakeTimers();
      vi.setSystemTime(today);

      el.value = value;
      await waitForCalendarUpdate(el, component);

      expect(el.valueAsDate).toBeUndefined();
      expectDate(el.activeDate, today);
      expect(getDay(el, todayDayId, "active")).not.toBeNull();
      expect(getDay(el, todayDayId, "selected")).toBeNull();
      expect(getSelectedDays(el)).toHaveLength(0);
    },
  );

  it("clears valueAsDate and activates the current date when valueAsDate is unset", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker valueAsDate={new Date(2025, 11, 5)} />,
    );
    await component.updateComplete;

    expect(el.valueAsDate).toBeInstanceOf(Date);

    vi.useFakeTimers();
    vi.setSystemTime(today);

    el.valueAsDate = undefined;
    await waitForCalendarUpdate(el, component);

    expect(el.valueAsDate).toBeUndefined();
    expectDate(el.activeDate, today);
    expect(getDay(el, todayDayId, "active")).not.toBeNull();
    expect(getDay(el, todayDayId, "selected")).toBeNull();
    expect(getSelectedDays(el)).toHaveLength(0);
  });

  it.each<{ label: string; value: DatePicker["value"] }>(unsetValueCases)(
    "clears range value and activates the current date when value is set to $label",
    async ({ value }) => {
      const { el, component } = await mount<DatePicker>(
        <calcite-date-picker range value={["2025-12-05", "2026-01-10"]} />,
      );
      await component.updateComplete;

      expect(el.valueAsDate).toHaveLength(2);

      vi.useFakeTimers();
      vi.setSystemTime(today);

      el.value = value;
      await waitForCalendarUpdate(el, component);

      expect(el.valueAsDate).toBeUndefined();
      expectDate(el.activeStartDate, today);
      expect(el.activeEndDate).toBeUndefined();
      expect(getDay(el, todayDayId, "active")).not.toBeNull();
      expect(getDay(el, todayDayId, "selected")).toBeNull();
      expect(getSelectedDays(el)).toHaveLength(0);
    },
  );

  it("clears range value and activates the current date when value is set to empty strings", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker range value={["2025-12-05", "2026-01-10"]} />,
    );
    await component.updateComplete;

    expect(el.valueAsDate).toHaveLength(2);

    vi.useFakeTimers();
    vi.setSystemTime(today);

    el.value = ["", ""];
    await waitForCalendarUpdate(el, component);

    expect(el.valueAsDate).toBeUndefined();
    expectDate(el.activeStartDate, today);
    expect(el.activeEndDate).toBeUndefined();
    expect(getDay(el, todayDayId, "active")).not.toBeNull();
    expect(getDay(el, todayDayId, "selected")).toBeNull();
    expect(getSelectedDays(el)).toHaveLength(0);
  });

  async function waitForCalendarUpdate(el: DatePicker["el"], component: DatePicker): Promise<void> {
    await component.updateComplete;
    await (getMonth(el) as DatePickerMonth | null)?.updateComplete;
  }

  function getMonth(el: DatePicker["el"]): DatePickerMonth["el"] | null {
    return el.shadowRoot!.querySelector("calcite-date-picker-month");
  }

  function getDay(
    el: DatePicker["el"],
    id: string,
    attribute: "active" | "selected",
  ): Element | null {
    return (
      getMonth(el)?.shadowRoot!.querySelector(
        `calcite-date-picker-day[id='${id}'][${attribute}]`,
      ) || null
    );
  }

  function getSelectedDays(el: DatePicker["el"]): Element[] {
    return Array.from(
      getMonth(el)?.shadowRoot!.querySelectorAll("calcite-date-picker-day[selected]") || [],
    );
  }

  function expectDate(actual: Date | undefined, expected: Date): void {
    expect(actual).toBeInstanceOf(Date);
    expect(actual?.getFullYear()).toBe(expected.getFullYear());
    expect(actual?.getMonth()).toBe(expected.getMonth());
    expect(actual?.getDate()).toBe(expected.getDate());
  }
});

describe("theme", () => {
  mockConsole();

  describe("default", () => {
    themed(() => mount("calcite-date-picker"), {
      "--calcite-date-picker-border-color": {
        selector: "calcite-date-picker",
        targetProp: "borderColor",
      },
      "--calcite-date-picker-corner-radius": {
        selector: "calcite-date-picker",
        targetProp: "borderRadius",
      },
      "--calcite-date-picker-week-header-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `.${MONTH_CSS.weekHeader}`,
        targetProp: "color",
      },
      "--calcite-date-picker-header-action-background-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} >>> calcite-action`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-date-picker-header-action-background-color-hover": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-background-color-hover",
        state: "hover",
      },
      "--calcite-date-picker-header-action-background-color-press": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
      },
      "--calcite-date-picker-header-action-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-date-picker-header-action-text-color-press": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> .${MONTH_HEADER_CSS.chevronContainer} > calcite-action`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: { attribute: "class", value: `${MONTH_HEADER_CSS.chevron}` } },
      },
      "--calcite-date-picker-year-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>>  input`,
        targetProp: "color",
      },
      "--calcite-date-picker-month-select-font-size": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-font-size",
      },
      "--calcite-date-picker-month-select-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-text-color",
      },
      "--calcite-date-picker-month-select-icon-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-icon-color",
      },
      "--calcite-date-picker-month-select-icon-color-hover": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-month-header >>> calcite-select`,
        targetProp: "--calcite-select-icon-color-hover",
        state: "hover",
      },
      "--calcite-date-picker-day-background-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day >>> .day`,
        targetProp: "backgroundColor",
      },
      "--calcite-date-picker-day-background-color-hover": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day >>> .day`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-date-picker-day-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[current-month] >>> .day`,
        targetProp: "color",
      },
      "--calcite-date-picker-day-text-color-hover": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day >>> .day`,
        targetProp: "color",
        state: "hover",
      },
      "--calcite-date-picker-current-day-text-color": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day.${MONTH_CSS.currentDay} >>> .day`,
        targetProp: "color",
      },
    });
  });

  describe("selected", () => {
    themed(() => mount(<calcite-date-picker value="2024-01-31" />), {
      "--calcite-date-picker-day-background-color-selected": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[selected] >>> .day`,
        targetProp: "backgroundColor",
      },
      "--calcite-date-picker-day-text-color-selected": {
        selector: "calcite-date-picker",
        shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[selected] >>> .day`,
        targetProp: "color",
      },
    });
  });

  describe("range", () => {
    themed(
      async () =>
        mount<DatePicker>(<calcite-date-picker range value={["2025-01-01", "2025-02-20"]} />),
      {
        "--calcite-date-picker-range-calendar-divider-color": {
          selector: "calcite-date-picker",
          shadowSelector: `calcite-date-picker-month >>> .${MONTH_CSS.calendarStart}`,
          targetProp: "borderColor",
        },
        "--calcite-date-picker-day-range-text-color": {
          selector: "calcite-date-picker",
          shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[highlighted] >>> .day`,
          targetProp: "color",
        },
        "--calcite-date-picker-day-range-background-color": {
          selector: "calcite-date-picker",
          shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[highlighted] >>> .day`,
          targetProp: "backgroundColor",
        },
        "--calcite-date-picker-day-outside-range-background-color-hover": {
          selector: "calcite-date-picker",
          shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[id='20250105'] >>> .day`,
          targetProp: "backgroundColor",
          state: {
            hover:
              "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106'] >>> .day",
          },
        },
        "--calcite-date-picker-day-outside-range-text-color-hover": {
          selector: "calcite-date-picker",
          shadowSelector: `calcite-date-picker-month >>> calcite-date-picker-day[id='20250105'] >>> .day`,
          targetProp: "color",
          state: {
            hover:
              "calcite-date-picker >>> calcite-date-picker-month >>> calcite-date-picker-day[id='20250106'] >>> .day",
          },
        },
      },
    );
  });
});
