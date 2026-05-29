import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page } from "vitest/browser";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { DatePicker } from "./date-picker";

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
    const { el, component } = await mount<DatePicker>(<calcite-date-picker />);
    el.value = "2025-09-01";
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInputValue();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectValue();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  it("should update calendar when activeDate changes in range", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker range />);
    el.value = ["2025-09-01", "2025-11-15"];
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInputValue();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectValue();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  it("should update calendar when activeDate changes in range when calendars is 1", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker calendars={1} range />);
    el.value = ["2025-09-01", "2025-11-15"];
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;

    const yearInput = getYearInputValue();
    await expect.element(yearInput).toHaveProperty("value", "2021");

    const monthSelectMenu = getMonthSelectValue();
    await expect.element(monthSelectMenu).toHaveProperty("value", "January");
  });

  function getYearInputValue(): Locator {
    return page.getByRole("textbox", { name: "Year" }).first();
  }

  function getMonthSelectValue(): Locator {
    return page.getByRole("combobox", { name: "Month menu" }).first();
  }
});
