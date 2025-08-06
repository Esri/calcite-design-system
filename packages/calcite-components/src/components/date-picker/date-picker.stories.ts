import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { locales, defaultLocale } from "../../utils/locale";
import { ATTRIBUTES } from "../../../.storybook/resources";
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
      options: locales,
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
    <calcite-date-picker lang="${defaultLocale}" min="2016-08-09" range scale="m"></calcite-date-picker>
  </div>
`;

export const rangeOneCalendar = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="${defaultLocale}" min="2016-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
`;

export const rangeHighlighted_TestOnly = (): string => html`
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

export const rangeValuesNotInSameMonthAndYear_TestOnly = (): string => html`
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

export const rangeRTL_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const bgLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="bg" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`;

export const ptPTLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="pt-PT" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`;

export const germanLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="de" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
`;

export const spanishLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="es" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`;

export const norwegianLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="nb" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`;

export const britishLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="en-gb" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
`;

export const chineseLang_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="zh-cn" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
`;

export const arabLangNumberingSystem_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-date-picker lang="ar" numbering-system="arab" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
`;

arabLangNumberingSystem_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`);

export const defaultWidthAllScales_TestOnly = (): string => html`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;

export const smallerThanMinWidthAllScales_TestOnly = (): string => html`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;

export const greaterThanMaxWidthAllScales_TestOnly = (): string => html`
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
