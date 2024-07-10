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
    <calcite-date-picker
      lang="${defaultLocale}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
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

export const theming_TestOnly = (): string =>
  html`<style>
      calcite-date-picker {
        --calcite-date-picker-border-color: #294b29;
        --calcite-date-picker-border-radius: 2px;
        --calcite-date-picker-day-background-color: #50623a;
        --calcite-date-picker-day-background-color-selected: #ffb000;
        --calcite-date-picker-day-corner-radius: 0px;
        --calcite-date-picker-day-text-color: #a4ce95;
        --calcite-date-picker-week-header-text-color: #5f5d9c;
        --calcite-date-picker-header-background-color: green;
        --calcite-date-picker-header-button-background-color: #6d2932;
        --calcite-date-picker-header-button-text-color: #c7b7a3;
        --calcite-date-picker-header-text-color: #e8d8c4;
      }
    </style>
    <calcite-date-picker scale="s" value="2000-11-27" lang="th"></calcite-date-picker>`;
