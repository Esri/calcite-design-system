import { select, text, boolean } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";
import { locales } from "../../utils/locale";

export default {
  title: "Components/Controls/InputDatePicker",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <div style="width: 400px">
    <calcite-label layout="inline">
      Date
      <calcite-input-date-picker
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="${text("value", "2020-12-12")}"
        min="${text("min", "2016-08-09")}"
        max="${text("max", "2023-12-18")}"
        locale="${select("locale", locales, "en")}"
        intl-next-month="${text("intl-next-month", "Next month")}"
        intl-prev-month="${text("intl-prev-month", "Previous month")}"
      ></calcite-input-date-picker
    ></calcite-label>
  </div>
`;

export const DarkMode = (): string => html`
  <div style="width: 400px">
    <calcite-label layout="inline" theme="dark">
      Date
      <calcite-input-date-picker
        theme="dark"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="${text("value", "2020-12-12")}"
        min="${text("min", "2016-08-09")}"
        max="${text("max", "2023-12-18")}"
        locale="${select("locale", locales, "en")}"
        intl-next-month="${text("intl-next-month", "Next month")}"
        intl-prev-month="${text("intl-prev-month", "Previous month")}"
        range="${boolean("range", false)}"
      ></calcite-input-date-picker
    ></calcite-label>
  </div>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const Range = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
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
    ></calcite-input-date-picker>
  </div>
`;

export const RTL = (): string => html`
  <div style="width: 400px" dir="rtl">
    <calcite-label layout="inline">
      Date
      <calcite-input-date-picker
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="${text("value", "2020-12-12")}"
        min="${text("min", "2016-08-09")}"
        max="${text("max", "2023-12-18")}"
        locale="${select("locale", locales, "en")}"
        intl-next-month="${text("intl-next-month", "Next month")}"
        intl-prev-month="${text("intl-prev-month", "Previous month")}"
      ></calcite-input-date-picker
    ></calcite-label>
  </div>
`;
