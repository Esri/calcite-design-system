import { defaultLocale } from "@arcgis/toolkit/intl";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { supportedNlsLocales } from "./utils";
import { DatePicker } from "./date-picker";

const { scale } = ATTRIBUTES;

interface DatePickerStoryArgs extends Pick<DatePicker, "min" | "max" | "range" | "scale" | "value"> {
  dir: string;
  lang: string;
  nextMonthLabel: string;
  prevMonthLabel: string;
}

export default {
  title: "Components/Controls/DatePicker",
  args: {
    dir: "",
    lang: defaultLocale,
    max: "",
    min: "",
    nextMonthLabel: "",
    prevMonthLabel: "",
    range: false,
    scale: scale.defaultValue,
    value: "2020-02-28",
  },
  argTypes: {
    lang: {
      options: supportedNlsLocales,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(process.env.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500,
    },
  },
};

export const simple = (args: DatePickerStoryArgs): string => html`
  <div style="width: 400px">
    <calcite-date-picker
      dir="${args.dir}"
      lang="${args.lang}"
      max="${args.max}"
      min="${args.min}"
      ${boolean("range", args.range)}
      scale="${args.scale}"
      value="${args.value}"
    ></calcite-date-picker>
  </div>
`;

export const range = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker
      lang="${defaultLocale}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;

export const rangeOneCalendar = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="${defaultLocale}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
`;

export const rangeHighlighted = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  </script>
`;

export const rangeOneCalendarWithValue = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  </script>
`;

export const rangeValuesNotInSameMonthAndYear = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  </script>
`;

export const rangeOneCalendarValuesNotInSameMonthAndYear = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  </script>
`;

export const Focus = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker value="2020-01-01"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      const datePicker = document.querySelector("calcite-date-picker");
      await datePicker.setFocus();
    })();
  </script>
`;

Focus.parameters = {
  chromatic: { delay: 2000 },
};

export const rangeRTL = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
`;

export const darkModeRTL = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker
      dir="rtl"
      class="calcite-mode-dark"
      lang="${defaultLocale}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };

export const localized = (): string => {
  const locales = [
    { label: "Arabic (ar):", lang: "ar" },
    { label: "Arabic (ar) + Arabic numbering system:", lang: "ar", numberingSystem: "arab" },
    { label: "Bulgarian (bg):", lang: "bg" },
    { label: "British English (en-gb):", lang: "en-gb" },
    { label: "Chinese (zh-cn):", lang: "zh-cn" },
    { label: "German (de):", lang: "de" },
    { label: "French Canadian (fr-CA):", lang: "fr-CA" },
    { label: "Norwegian (nb):", lang: "nb" },
    { label: "Portuguese (pt-PT):", lang: "pt-PT" },
    { label: "Spanish (es):", lang: "es" },
  ];

  return html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
      ${locales
        .map(
          ({ label, lang, numberingSystem }) => html`
            <div>
              <strong>${label}</strong>
              <calcite-date-picker
                lang="${lang}"
                value="2020-02-28"
                ${numberingSystem ? `numbering-system="${numberingSystem}"` : ""}
              ></calcite-date-picker>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
};
localized.parameters = {
  chromatic: {
    delay: 1000,
    diffThreshold: 1,
  },
};

export const widthSetToBreakpoints = (): string =>
  createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`);

export const defaultWidthAllScales = (): string => html`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;

export const smallerThanMinWidthAllScales = (): string => html`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;

export const greaterThanMaxWidthAllScales = (): string => html`
  <style>
    calcite-date-picker {
      width: 1000px;
      display: block;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;
