import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { DatePicker } from "./date-picker";
import { ToElement } from "@arcgis/lumina";
import { Select } from "../select/select";

type DatePickerEl = ToElement<DatePicker> & {
  shadowRoot: ShadowRoot;
};

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
  it("should update calendar when activeDate changes in range", async () => {
    const { el, component } = await mount<DatePicker>(<calcite-date-picker range />);
    el.value = ["2025-09-01", "2025-11-15"];
    await component.updateComplete;

    el.activeDate = new Date("2021-01-15");
    await component.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const yearInput = getYearInputValue(el);
    expect(yearInput).toBe("2021");

    const monthSelectMenu = getMonthSelectValue(el);
    expect(monthSelectMenu).toBe("January");
  });

  function getYearInputValue(el: DatePickerEl): string {
    return el.shadowRoot
      ?.querySelector("calcite-date-picker-month")
      ?.shadowRoot?.querySelector("calcite-date-picker-month-header")
      ?.shadowRoot?.querySelector<HTMLInputElement>("input").value;
  }

  function getMonthSelectValue(el: DatePickerEl): string {
    return el.shadowRoot
      ?.querySelector("calcite-date-picker-month")
      ?.shadowRoot?.querySelector("calcite-date-picker-month-header")
      ?.shadowRoot?.querySelector<ToElement<Select>>("calcite-select").value;
  }
});
