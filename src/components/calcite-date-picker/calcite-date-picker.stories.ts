import { select, text, boolean } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";
import { locales } from "../../utils/locale";

export default {
  title: "Components/Controls/DatePicker",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "2020-12-12")}"
      min="${text("min", "2020-12-03")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date-picker>
  </div>
`;

Simple.story = {
  name: "Simple"
};

export const DarkMode = (): string => html`
  <div style="width: 400px">
    <calcite-label layout="inline" theme="dark">
      Date
      <calcite-date-picker
        theme="dark"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="${text("value", "2020-12-12")}"
        min="${text("min", "2016-08-09")}"
        max="${text("max", "2023-12-18")}"
        locale="${select("locale", locales, "en")}"
        intl-next-month="${text("intl-next-month", "Next month")}"
        intl-prev-month="${text("intl-prev-month", "Previous month")}"
        range="${boolean("range", false)}"
      ></calcite-date-picker
    ></calcite-label>
  </div>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const Range = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      start="${text("start", "2020-12-12")}"
      end="${text("end", "2020-12-16")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
      range="${boolean("range", true)}"
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    ></calcite-date-picker>
  </div>
`;

export const SimpleRTL = (): string => html`
  <div style="width: 400px" dir="rtl">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${text("value", "2020-12-12")}"
      min="${text("min", "2020-12-03")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en")}"
      intl-next-month="${text("intl-next-month", "Next month")}"
      intl-prev-month="${text("intl-prev-month", "Previous month")}"
    ></calcite-date-picker>
  </div>
`;

export const RangeRTL = (): string => html`
  <div style="width: 400px" dir="rtl">
    <calcite-date-picker
      scale="${select("scale", ["s", "m", "l"], "m")}"
      start="${text("start", "2020-12-12")}"
      end="${text("end", "2020-12-16")}"
      min="${text("min", "2016-08-09")}"
      max="${text("max", "2023-12-18")}"
      locale="${select("locale", locales, "en")}"
      next-month-label="${text("next-month-label", "Next month")}"
      prev-month-label="${text("prev-month-label", "Previous month")}"
      range="${boolean("range", true)}"
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    ></calcite-date-picker>
  </div>
`;
