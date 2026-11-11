import { defaultLocale, supportedLocales } from "@arcgis/toolkit/intl";
import type { StoryContext } from "@storybook/web-components-vite";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { DatePicker } from "./date-picker";
import "./date-picker"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { calendarCount, horizontalVerticalLayout, monthStyle, numberingSystemWithNone, scale, supportedNlsLocale } =
  ATTRIBUTES;

interface DatePickerStoryArgs extends Pick<
  DatePicker,
  "calendars" | "layout" | "max" | "min" | "monthStyle" | "numberingSystem" | "range" | "scale" | "value"
> {
  dir: string;
  lang: string;
  nextMonthLabel: string;
  prevMonthLabel: string;
}

export default {
  title: "Components/Controls/DatePicker",
  args: {
    calendars: 2,
    dir: "",
    layout: "horizontal",
    lang: defaultLocale,
    max: "",
    min: "",
    monthStyle: "wide",
    nextMonthLabel: "",
    numberingSystem: "",
    prevMonthLabel: "",
    range: false,
    scale: scale.defaultValue,
    value: "2020-02-28",
  },
  argTypes: {
    lang: {
      options: supportedNlsLocale.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    calendars: {
      options: calendarCount.values,
      control: { type: "select" },
    },
    layout: {
      options: horizontalVerticalLayout.values,
      control: { type: "select" },
    },
    monthStyle: {
      options: monthStyle.values,
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystemWithNone.values,
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
      calendars="${args.calendars}"
      layout="${args.layout}"
      max="${args.max}"
      min="${args.min}"
      month-style="${args.monthStyle}"
      numbering-system="${args.numberingSystem}"
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
  return html`
    <style>
      .localized-calendars {
        display: grid;
        grid-template-columns: repeat(4, 300px);
        gap: 24px;
      }

      .localized-calendar {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .localized-calendar calcite-date-picker {
        width: 300px;
      }
    </style>
    <div class="localized-calendars">
      ${[...supportedLocales]
        .map(
          (locale) => html`
            <div class="localized-calendar">
              <strong>${locale}</strong>
              <calcite-date-picker lang="${locale}" value="2020-02-28"></calcite-date-picker>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
};
localized.play = async ({ canvasElement }: StoryContext): Promise<void> => {
  await Promise.all(
    Array.from(canvasElement.querySelectorAll<DatePicker["el"]>("calcite-date-picker"), (el) => el.componentOnReady()),
  );
};
localized.parameters = {
  chromatic: {
    delay: 0,
    cropToViewport: false,
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
