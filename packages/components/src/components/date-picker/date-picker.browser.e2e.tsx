import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import {
  defaults,
  focusable,
  hidden,
  renders,
  scalePropagates,
  t9n,
  themed,
} from "../../tests/common";
import { CSS as MONTH_CSS } from "../date-picker-month/resources";
import { CSS as MONTH_HEADER_CSS } from "../date-picker-month-header/resources";
import { DatePicker } from "./date-picker";
import { mockConsole } from "../../tests/utils/logging";
import type { DatePickerDay } from "../date-picker-day/date-picker-day";
import type { DatePickerMonth } from "../date-picker-month/date-picker-month";

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

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-date-picker />, mountOptions), {
    targetSelector: "calcite-date-picker-month",
  });
});

describe("focusable", () => {
  focusable(() => mount("calcite-date-picker"), {
    shadowFocusTargetSelector: "calcite-date-picker-month",
  });

  it("moves focus between gridcells with arrow keys", async () => {
    await mount(<calcite-date-picker value="2025-09-15" />);

    const grid = page.getByRole("grid", { includeHidden: true });
    const nextDay = grid
      .getByRole("gridcell", {
        includeHidden: true,
        name: "Tuesday, September 16, 2025",
      })
      .element() as DatePickerDay["el"];

    await focusActiveDay();
    await userEvent.keyboard("{ArrowRight}");

    await expect.poll(() => nextDay.getRootNode()).toHaveProperty("activeElement", nextDay);
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-date-picker"));
});

describe("activeDate", () => {
  it("should update calendar when activeDate changes", async () => {
    const { el } = await mount<DatePicker>(<calcite-date-picker value="2025-09-01" />);

    el.activeDate = new Date("2021-01-15");

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
  mockConsole();

  const today = new Date();
  const unsetValueCases = [
    { label: "empty string", value: "" },
    { label: "undefined", value: undefined },
  ] satisfies { label: string; value: "" | undefined }[];

  it.each<{ label: string; value: DatePicker["value"] }>(unsetValueCases)(
    "clears valueAsDate and activates the current date when value is set to $label",
    async ({ value }) => {
      const { el, component } = await mount<DatePicker>(<calcite-date-picker value="2025-12-05" />);

      await expect.element(el).toHaveProperty("valueAsDate", expect.any(Date));

      el.value = value;
      await waitForCalendarUpdate(el, component);

      await expect.element(el).toHaveProperty("valueAsDate", undefined);
      expectDate(el.activeDate, today);
      expectDate(getMonth(el)?.activeDate, today);
      expect(getSelectedDays(el)).toHaveLength(0);
    },
  );

  it("clears valueAsDate and activates the current date when valueAsDate is unset", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker valueAsDate={new Date(2025, 11, 5)} />,
    );

    expect(el.valueAsDate).toBeInstanceOf(Date);

    el.valueAsDate = undefined;
    await waitForCalendarUpdate(el, component);

    await expect.element(el).toHaveProperty("valueAsDate", undefined);
    expectDate(el.activeDate, today);
    expectDate(getMonth(el)?.activeDate, today);
    expect(getSelectedDays(el)).toHaveLength(0);
  });

  it.each<{ label: string; value: DatePicker["value"] }>(unsetValueCases)(
    "clears range value and activates the current date when value is set to $label",
    async ({ value }) => {
      const { el, component } = await mount<DatePicker>(
        <calcite-date-picker range value={["2025-12-05", "2026-01-10"]} />,
      );

      await expect.element(el).toHaveProperty("valueAsDate.length", 2);

      el.value = value;
      await waitForCalendarUpdate(el, component);

      await expect.element(el).toHaveProperty("valueAsDate", undefined);
      expectDate(getMonth(el)?.activeDate, today);
      expect(el.activeEndDate).toBeUndefined();
      expect(getSelectedDays(el)).toHaveLength(0);
    },
  );

  it("clears range value and activates the current date when value is set to empty strings", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker range value={["2025-12-05", "2026-01-10"]} />,
    );

    await expect.element(el).toHaveProperty("valueAsDate.length", 2);

    el.value = ["", ""];
    await waitForCalendarUpdate(el, component);

    await expect.element(el).toHaveProperty("valueAsDate", undefined);
    expectDate(getMonth(el)?.activeDate, today);
    expect(el.activeEndDate).toBeUndefined();
    expect(getSelectedDays(el)).toHaveLength(0);
  });

  it("updates the calendar view when a programmatic range value follows a manual selection", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker active-range="start" range value={["2024-01-01", "2024-01-02"]} />,
    );
    const monthSelectMenus = page.getByRole("combobox", { name: "Month menu" });
    await waitForCalendarUpdate(el, component);

    await userEvent.click(
      page.getBySelector("calcite-date-picker-day[current-month][id='20240210']"),
    );
    await waitForCalendarUpdate(el, component);

    // User selection preserved the view instead of shifting it to February/March.
    await expect.element(el).toHaveProperty("value", ["2024-02-10", ""]);
    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "January");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "February");

    await userEvent.click(
      page.getBySelector("calcite-date-picker-day[current-month][id='20240215']"),
    );
    await waitForCalendarUpdate(el, component);

    await expect.element(el).toHaveProperty("value", ["2024-02-10", "2024-02-15"]);
    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "January");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "February");

    el.value = ["2025-10-15", "2025-11-03"];
    await waitForCalendarUpdate(el, component);

    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "October");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "November");
  });

  it.each([
    { calendars: 1 as const, expectedMonths: ["October"] },
    { calendars: 2 as const, expectedMonths: ["October", "November"] },
  ])(
    "keeps $calendars calendar(s) on the selected month when a same-day range is reassigned",
    async ({ calendars, expectedMonths }) => {
      const { el, component } = await mount<DatePicker>(
        <calcite-date-picker calendars={calendars} range />,
      );
      const monthSelectMenus = page.getByRole("combobox", { name: "Month menu" });

      async function assertCalendarMonths(): Promise<void> {
        expect(monthSelectMenus).toHaveLength(expectedMonths.length);
        for (const [index, expectedMonth] of expectedMonths.entries()) {
          await expect.element(monthSelectMenus.nth(index)).toHaveProperty("value", expectedMonth);
        }
      }

      const date1 = new Date(2025, 9, 5);
      const date2 = new Date(2025, 9, 7);

      el.activeDate = date1;
      el.valueAsDate = [date1, date2];
      await waitForCalendarUpdate(el, component);
      await assertCalendarMonths();

      el.activeDate = undefined;
      el.valueAsDate = [date2, date2];
      await waitForCalendarUpdate(el, component);
      await assertCalendarMonths();

      el.valueAsDate = [date2, date2];
      await waitForCalendarUpdate(el, component);
      await assertCalendarMonths();
    },
  );

  it("shows a partially selectable following month when a same-day range is reassigned", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker calendars={2} max="2025-11-10" range />,
    );
    const monthSelectMenus = page.getByRole("combobox", { name: "Month menu" });

    el.value = ["2025-10-20", "2025-10-20"];
    await waitForCalendarUpdate(el, component);

    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "October");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "November");

    el.value = ["2025-10-20", "2025-10-20"];
    await waitForCalendarUpdate(el, component);

    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "October");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "November");
  });

  it("keeps a same-day range in the maximum month visible with two calendars", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker max="2025-12-18" range />,
    );
    const monthSelectMenus = page.getByRole("combobox", { name: "Month menu" });

    el.value = ["2025-12-07", "2025-12-07"];
    await waitForCalendarUpdate(el, component);

    await expect.element(monthSelectMenus.first()).toHaveProperty("value", "November");
    await expect.element(monthSelectMenus.nth(1)).toHaveProperty("value", "December");
  });

  async function waitForCalendarUpdate(el: DatePicker["el"], component: DatePicker): Promise<void> {
    await component.updateComplete;
    await (getMonth(el) as DatePickerMonth | null)?.updateComplete;
  }

  function getMonth(el: DatePicker["el"]): DatePickerMonth["el"] | null {
    return el.shadowRoot!.querySelector("calcite-date-picker-month");
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

describe("change events", () => {
  it("does not emit change when the displayed year changes", async () => {
    const changeHandler = vi.fn();
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker oncalciteDatePickerChange={changeHandler} value="2000-11-27" />,
    );
    const yearInput = page.getByRole("textbox", { includeHidden: true, name: "Year" });

    await userEvent.click(yearInput);
    await userEvent.keyboard("{ArrowUp}{ArrowDown}");
    await component.updateComplete;

    expect(changeHandler).not.toHaveBeenCalled();
    await expect.element(el).toHaveProperty("value", "2000-11-27");
  });

  it("emits change when a day is selected", async () => {
    const changeHandler = vi.fn();
    const { component } = await mount<DatePicker>(
      <calcite-date-picker oncalciteDatePickerChange={changeHandler} value="2000-11-27" />,
    );

    await selectDay("20001101", component);
    await selectDay("20001102", component);

    expect(changeHandler).toHaveBeenCalledTimes(2);
  });

  it.each([
    { calendars: 2 as const, start: "20240101", end: "20240115" },
    { calendars: 1 as const, start: "20240101", end: "20240115" },
    { calendars: 2 as const, start: "20240201", end: "20240215" },
  ])(
    "emits range change and updates value for selections with $calendars calendar(s)",
    async ({ calendars, start, end }) => {
      const changeHandler = vi.fn();
      const { el, component } = await mount<DatePicker>(
        <calcite-date-picker
          activeDate={new Date(2024, 0, 1)}
          calendars={calendars}
          oncalciteDatePickerRangeChange={changeHandler}
          range
        />,
      );

      await selectDay(start, component);
      await expect.element(el).toHaveProperty("value", [dayIdToIso(start), ""]);

      await selectDay(end, component);
      await expect.element(el).toHaveProperty("value", [dayIdToIso(start), dayIdToIso(end)]);
      expect(changeHandler).toHaveBeenCalledTimes(2);
    },
  );

  it("does not emit change when the selected day is selected again", async () => {
    const changeHandler = vi.fn();
    const { component } = await mount<DatePicker>(
      <calcite-date-picker oncalciteDatePickerChange={changeHandler} value="2000-11-27" />,
    );

    await selectDay("20001127", component);
    await selectDay("20001127", component);
    await selectDay("20001127", component);

    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("does not emit change when value is updated programmatically", async () => {
    const changeHandler = vi.fn();
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker oncalciteDatePickerChange={changeHandler} value="2000-11-27" />,
    );

    el.value = "2001-10-28";
    await component.updateComplete;

    expect(changeHandler).not.toHaveBeenCalled();
    await expect.element(el).toHaveProperty("value", "2001-10-28");
  });

  it("emits range change only after a user selection", async () => {
    const changeHandler = vi.fn();
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker oncalciteDatePickerRangeChange={changeHandler} range />,
    );

    el.value = ["2020-09-08", "2020-09-23"];
    el.activeDate = new Date(2020, 8, 1);
    await component.updateComplete;

    expect(changeHandler).not.toHaveBeenCalled();
    await expect
      .element(page.getByRole("combobox", { includeHidden: true, name: "Month menu" }).first())
      .toHaveProperty("value", "September");

    await focusActiveDay();
    await userEvent.keyboard("{ArrowRight} ");
    await component.updateComplete;

    expect(changeHandler).toHaveBeenCalledTimes(1);
  });
});

it("starts the week on Monday for Slovak", async () => {
  await mount(<calcite-date-picker lang="sk" value="2000-11-27" />);

  await expect
    .element(page.getByRole("columnheader", { includeHidden: true }).first())
    .toHaveTextContent("po");
});

describe("min and max", () => {
  it("clears minAsDate and maxAsDate when min and max are cleared", async () => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker max="2022-11-25" min="2022-11-15" value="2022-11-20" />,
    );

    el.min = undefined;
    el.max = undefined;

    await expect.element(el).toHaveProperty("minAsDate", undefined);
    await expect.element(el).toHaveProperty("maxAsDate", undefined);

    el.activeDate = new Date(2022, 10, 26);
    await component.updateComplete;
    expectDateParts(el.activeDate, 2022, 10, 26);

    el.activeDate = new Date(2022, 10, 14);
    await component.updateComplete;
    expectDateParts(el.activeDate, 2022, 10, 14);
  });

  it("keeps the minimum and maximum months enabled", async () => {
    const { el } = await mount<DatePicker>(<calcite-date-picker value="2025-03-20" />);

    el.min = "2025-02-15";
    el.max = "2025-04-15";

    await expect
      .element(page.getByRole("option", { includeHidden: true, name: "January" }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("option", { includeHidden: true, name: "February" }))
      .toBeEnabled();
    await expect
      .element(page.getByRole("option", { includeHidden: true, name: "March" }))
      .toBeEnabled();
    await expect
      .element(page.getByRole("option", { includeHidden: true, name: "April" }))
      .toBeEnabled();
    await expect
      .element(page.getByRole("option", { includeHidden: true, name: "May" }))
      .toBeDisabled();
  });

  it("disables days outside minAsDate and maxAsDate", async () => {
    const { el } = await mount<DatePicker>(
      <calcite-date-picker activeDate={new Date(2025, 7, 18)} />,
    );

    el.minAsDate = new Date(2025, 7, 18);
    el.maxAsDate = new Date(2025, 7, 20);

    await expect.element(getDay("20250817")).toBeDisabled();
    await expect.element(getDay("20250818")).toBeEnabled();
    await expect.element(getDay("20250820")).toBeEnabled();
    await expect.element(getDay("20250821")).toBeDisabled();
  });
});

describe("arrow and page key navigation", () => {
  it.each([
    {
      calendars: 2 as const,
      initialValue: undefined,
      range: false,
      expectedValues: ["2023-12-25", "2023-11-25", "2024-01-25", "2024-02-01"],
    },
    {
      calendars: 2 as const,
      initialValue: "2024-01-01",
      range: false,
      expectedValues: ["2023-12-25", "2024-01-08", "2023-12-08", "2024-02-08"],
    },
    {
      calendars: 2 as const,
      initialValue: undefined,
      range: true,
      expectedValues: [
        ["2023-12-25", ""],
        ["2023-11-25", "2023-12-25"],
        ["2023-11-25", "2024-01-25"],
        ["2023-11-25", "2024-02-01"],
      ],
    },
    {
      calendars: 1 as const,
      initialValue: undefined,
      range: true,
      expectedValues: [
        ["2023-12-25", ""],
        ["2023-11-25", "2023-12-25"],
        ["2023-11-25", "2024-01-25"],
        ["2023-11-25", "2024-02-01"],
      ],
    },
    {
      calendars: 2 as const,
      initialValue: ["2024-01-01", "2024-02-10"],
      range: true,
      expectedValues: [
        ["2023-12-25", "2024-02-10"],
        ["2023-12-25", "2024-01-08"],
        ["2023-12-08", "2024-01-08"],
        ["2023-12-08", "2024-02-08"],
      ],
    },
    {
      calendars: 1 as const,
      initialValue: ["2024-01-01", "2024-02-10"],
      range: true,
      expectedValues: [
        ["2023-12-25", "2024-02-10"],
        ["2023-12-25", "2024-01-08"],
        ["2023-12-08", "2024-01-08"],
        ["2023-12-08", "2024-02-08"],
      ],
    },
  ])(
    "selects dates across months with $calendars calendar(s), range=$range, value=$initialValue",
    async ({ calendars, expectedValues, initialValue, range }) => {
      const { el } = await mount<DatePicker>(
        <calcite-date-picker
          activeDate={new Date(2024, 0, 1)}
          calendars={calendars}
          range={range}
          value={initialValue}
        />,
      );
      await focusActiveDay();

      await userEvent.keyboard("{ArrowUp}{Enter}");
      await expect.element(el).toHaveProperty("value", expectedValues[0]);

      await userEvent.keyboard(initialValue ? "{ArrowDown>2/}{Enter}" : "{PageUp}{Enter}");
      await expect.element(el).toHaveProperty("value", expectedValues[1]);

      await userEvent.keyboard(initialValue ? "{PageUp}{Enter}" : "{PageDown>2/}{Enter}");
      await expect.element(el).toHaveProperty("value", expectedValues[2]);

      await userEvent.keyboard(initialValue ? "{PageDown>2/}{Enter}" : "{ArrowDown}{Enter}");
      await expect.element(el).toHaveProperty("value", expectedValues[3]);
    },
  );
});

describe("hover range", () => {
  it("updates the hovered portion of an existing range", async () => {
    await mount<DatePicker>(<calcite-date-picker range value={["2024-01-01", "2024-02-10"]} />);

    await userEvent.hover(getDay("20240109"));
    await expect.element(getDay("20240108")).toHaveProperty("rangeHover", true);
    await expect.element(getDay("20240208")).toHaveProperty("rangeHover", false);

    await userEvent.hover(getDay("20240205"));
    await expect.element(getDay("20240108")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240208")).toHaveProperty("rangeHover", true);
  });

  it("updates hover state when extending a completed range", async () => {
    await mount<DatePicker>(<calcite-date-picker range value={["2024-01-05", "2024-02-15"]} />);

    await userEvent.hover(getDay("20240101"));
    await expect.element(getDay("20240102")).toHaveProperty("rangeHover", true);
    await expect.element(getDay("20240108")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240208")).toHaveProperty("rangeHover", false);

    await userEvent.hover(getDay("20240225"));
    await expect.element(getDay("20240102")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240224")).toHaveProperty("rangeHover", true);
  });

  it("limits hover state to dates between the start and prospective end dates", async () => {
    const { component } = await mount<DatePicker>(
      <calcite-date-picker activeDate={new Date(2024, 0, 1)} range />,
    );

    await selectDay("20240108", component);
    await expect.element(getDay("20240107")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240209")).toHaveProperty("rangeHover", false);

    await userEvent.hover(getDay("20240205"));
    await expect.element(getDay("20240107")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240209")).toHaveProperty("rangeHover", false);
    await expect.element(getDay("20240201")).toHaveProperty("rangeHover", true);

    await selectDay("20240205", component);
    await expect.element(getDay("20240201")).toHaveProperty("rangeHover", false);
  });
});

describe("cross-century date values", () => {
  it.each([2005, 1950, 1850, 1750])("selects a day in %i", async (year) => {
    const { el, component } = await mount<DatePicker>(
      <calcite-date-picker value={`${year}-03-12`} />,
    );

    await selectDay(`${year}0307`, component);

    await expect.element(el).toHaveProperty("value", `${year}-03-07`);
  });
});

describe("month and year selection", () => {
  mockConsole();

  it("selects the first and last valid months with one range calendar", async () => {
    const { el } = await mount<DatePicker>(
      <calcite-date-picker
        activeDate={new Date(2024, 6, 1)}
        calendars={1}
        max="2024-10-21"
        min="2024-01-21"
        range
      />,
    );
    const monthSelect = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    const yearInput = page.getByRole("textbox", { includeHidden: true, name: "Year" });

    await userEvent.selectOptions(monthSelect, "January");
    await expect.element(getDay("20240121")).toBeVisible();
    await expect.element(monthSelect).toHaveProperty("value", "January");
    await expect.element(yearInput).toHaveProperty("value", "2024");

    await userEvent.selectOptions(monthSelect, "October");
    await expect.element(getDay("20241021")).toBeVisible();
    await expect.element(monthSelect).toHaveProperty("value", "October");
    await expect.element(yearInput).toHaveProperty("value", "2024");
    await expect.element(el).toHaveProperty("value", undefined);
  });

  it("selects the last valid month from the start calendar", async () => {
    await mount(<calcite-date-picker activeDate={new Date(2024, 6, 1)} max="2024-10-21" range />);
    const monthSelects = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    const yearInputs = page.getByRole("textbox", { includeHidden: true, name: "Year" });

    await userEvent.selectOptions(monthSelects.first(), "October");
    await expect.element(getDay("20241021")).toBeVisible();

    await expect.element(monthSelects.first()).toHaveProperty("value", "October");
    await expect.element(monthSelects.nth(1)).toHaveProperty("value", "November");
    await expect.element(yearInputs.first()).toHaveProperty("value", "2024");
    await expect.element(yearInputs.nth(1)).toHaveProperty("value", "2024");
  });

  it("selects the first valid month from the end calendar", async () => {
    await mount(<calcite-date-picker activeDate={new Date(2024, 0, 1)} min="2024-01-21" range />);
    const monthSelects = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    const yearInputs = page.getByRole("textbox", { includeHidden: true, name: "Year" });

    await userEvent.selectOptions(monthSelects.nth(1), "January");
    await expect.element(getDay("20240121")).toBeVisible();

    await expect.element(monthSelects.first()).toHaveProperty("value", "December");
    await expect.element(monthSelects.nth(1)).toHaveProperty("value", "January");
    await expect.element(yearInputs.first()).toHaveProperty("value", "2023");
    await expect.element(yearInputs.nth(1)).toHaveProperty("value", "2024");
  });
});

it("marks only the current day as current while it is displayed", async () => {
  await mount<DatePicker>(<calcite-date-picker range />);
  await expect.element(getCurrentDays()).toHaveLength(1);

  await focusActiveDay();
  await userEvent.keyboard("{PageUp}");
  await expect.element(getCurrentDays()).toHaveLength(1);

  await userEvent.keyboard("{PageDown>2/}");
  await expect.element(getCurrentDays()).toHaveLength(0);
});

describe("navigating months", () => {
  it("changes the displayed month with previous and next month actions", async () => {
    await mount<DatePicker>(<calcite-date-picker value="2000-11-27" />);
    const previousMonth = page
      .getByRole("button", { includeHidden: true, name: "Previous month" })
      .first();
    const nextMonth = page.getByRole("button", { includeHidden: true, name: "Next month" }).first();
    const monthSelect = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    const yearInput = page.getByRole("textbox", { includeHidden: true, name: "Year" });

    await userEvent.click(previousMonth);
    await userEvent.click(nextMonth, { clickCount: 3 });

    await expect.element(monthSelect).toHaveProperty("value", "January");
    await expect.element(yearInput).toHaveProperty("value", "2001");
  });

  it("returns to the previous month after selecting from the maximum month", async () => {
    await mount<DatePicker>(<calcite-date-picker max="2025-11-11" value="2025-09-25" />);
    const nextMonth = page.getByRole("button", { includeHidden: true, name: "Next month" }).first();
    const monthSelect = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    await userEvent.click(nextMonth, { clickCount: 2 });
    await expect.element(monthSelect).toHaveProperty("value", "November");

    await userEvent.keyboard("{Enter}");
    await expect.element(monthSelect).toHaveProperty("value", "October");
  });

  it("returns to the next month after selecting from the minimum month", async () => {
    await mount<DatePicker>(<calcite-date-picker min="2024-11-11" value="2025-01-01" />);
    const previousMonth = page
      .getByRole("button", { includeHidden: true, name: "Previous month" })
      .first();
    const monthSelect = page.getByRole("combobox", { includeHidden: true, name: "Month menu" });
    await userEvent.click(previousMonth, { clickCount: 2 });
    await expect.element(monthSelect).toHaveProperty("value", "November");

    await userEvent.keyboard("{Enter}");
    await expect.element(monthSelect).toHaveProperty("value", "December");
  });
});

describe("selection", () => {
  it.each([
    { expectedValue: ["2024-07-01", ""], range: true },
    { expectedValue: "2024-08-01", range: false },
  ])(
    "selects the first available date when max is before today, range=$range",
    async ({ expectedValue, range }) => {
      const { el } = await mount<DatePicker>(
        <calcite-date-picker max="2024-08-11" range={range} />,
      );
      await focusActiveDay();

      await userEvent.keyboard("{Enter}");

      await expect.element(el).toHaveProperty("value", expectedValue);
    },
  );

  it.each([
    { range: true, expectedRange: true },
    { range: false, expectedRange: false },
  ])("selects the first valid date when min is after today, range=$range", async ({ range }) => {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 2, 12);
    const min = toDateOnlyIso(minDate);
    const { el } = await mount<DatePicker>(<calcite-date-picker min={min} range={range} />);
    await focusActiveDay();

    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", range ? [min, ""] : min);
  });

  it.each([{ range: true }, { range: false }])(
    "selects today when min is earlier in the current month, range=$range",
    async ({ range }) => {
      const today = new Date();
      const minDate = new Date(today);
      if (minDate.getDate() > 2) {
        minDate.setDate(1);
      }
      const { el } = await mount<DatePicker>(
        <calcite-date-picker min={toDateOnlyIso(minDate)} range={range} />,
      );
      await focusActiveDay();

      await userEvent.keyboard("{Enter}");

      const todayIso = toDateOnlyIso(today);
      await expect.element(el).toHaveProperty("value", range ? [todayIso, ""] : todayIso);
    },
  );
});

it("updates the calendar as a new year is typed without changing value", async () => {
  const { el } = await mount<DatePicker>(<calcite-date-picker value="2015-02-28" />);
  const yearInput = page.getByRole("textbox", { includeHidden: true, name: "Year" });
  const initialActiveDate = el.activeDate?.getTime();

  await userEvent.click(yearInput, { clickCount: 2 });
  await userEvent.type(yearInput, "2016");

  await expect.element(yearInput).toHaveProperty("value", "2016");
  expect(el.activeDate?.getTime()).not.toBe(initialActiveDate);
  await expect.element(el).toHaveProperty("value", "2015-02-28");
});

it("provides the default labels to the month header", async () => {
  await mount(<calcite-date-picker value="2000-11-27" />);

  await expect
    .element(page.getByRole("combobox", { includeHidden: true, name: "Month menu" }))
    .toBeVisible();
  await expect
    .element(page.getByRole("button", { includeHidden: true, name: "Next month" }).first())
    .toBeVisible();
  await expect
    .element(page.getByRole("button", { includeHidden: true, name: "Previous month" }).first())
    .toBeVisible();
  await expect
    .element(page.getByRole("textbox", { includeHidden: true, name: "Year" }))
    .toBeVisible();
});

it("restarts a completed range when proximity selection is disabled", async () => {
  const { el, component } = await mount<DatePicker>(
    <calcite-date-picker proximitySelectionDisabled range value={["2020-09-01", "2020-09-01"]} />,
  );

  await selectDay("20200908", component);
  await selectDay("20200923", component);
  await expect.element(el).toHaveProperty("value", ["2020-09-08", "2020-09-23"]);

  await selectDay("20200915", component);
  await expect.element(el).toHaveProperty("value", ["2020-09-15", ""]);

  await selectDay("20200930", component);
  await expect.element(el).toHaveProperty("value", ["2020-09-15", "2020-09-30"]);
});

function getDay(id: string): Locator {
  return page.getBySelector(`calcite-date-picker-day[current-month][id="${id}"]`);
}

async function selectDay(id: string, component: DatePicker): Promise<void> {
  await userEvent.click(getDay(id));
  await component.updateComplete;
}

function dayIdToIso(id: string): string {
  return `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6)}`;
}

function expectDateParts(date: Date | undefined, year: number, month: number, day: number): void {
  expect(date).toBeInstanceOf(Date);
  expect(date?.getFullYear()).toBe(year);
  expect(date?.getMonth()).toBe(month);
  expect(date?.getDate()).toBe(day);
}

function getCurrentDays(): Locator {
  return page.getBySelector(
    `calcite-date-picker-month calcite-date-picker-day.${MONTH_CSS.currentDay}`,
  );
}

async function focusActiveDay(): Promise<void> {
  const header = page.getBySelector("calcite-date-picker-month-header").first();
  const enabledMonthActions = header.getBySelector("calcite-action:not([disabled])");
  // tab through the month menu, year input, and enabled month actions to reach the active day.
  await userEvent.keyboard(`{Tab>${3 + enabledMonthActions.length}/}`);
}

function toDateOnlyIso(date: Date): string {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().split("T")[0];
}
