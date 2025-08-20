import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { locales, defaultLocale } from "../../utils/locale";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputDatePicker } from "./input-date-picker";

const { scale, status } = ATTRIBUTES;

interface InputDatePickerStoryArgs
  extends Pick<
    InputDatePicker,
    "scale" | "status" | "value" | "min" | "max" | "placement" | "validationMessage" | "validationIcon"
  > {
  lang: string;
}

export default {
  title: "Components/Controls/InputDatePicker",
  args: {
    scale: scale.defaultValue,
    status: status.defaultValue,
    value: "2020-12-12",
    min: "2016-08-09",
    max: "2023-12-18",
    lang: defaultLocale,
    placement: defaultMenuPlacement,
    validationMessage: "",
    validationIcon: "",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    lang: {
      options: locales,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacements,
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputDatePickerStoryArgs): string => html`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="${args.scale}"
      status="${args.status}"
      value="${args.value}"
      lang="${args.lang}"
      min="${args.min}"
      max="${args.max}"
      placement="${args.placement}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
      open="${boolean("open", true)}"
    ></calcite-input-date-picker>
  </div>
`;

export const withMinMax = (): string =>
  html` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>`;

export const rangeWithMinMax = (): string => html`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="m"
      status="idle"
      min="2016-08-09"
      max="2023-12-18"
      lang="en"
      next-month-label="Next month"
      prev-month-label="Previous month"
      range
      layout="horizontal"
      open
    ></calcite-input-date-picker>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`;

export const flipPlacements_TestOnly = (): string => html`
  <style>
    .my-input-date-picker-div {
      margin-top: 50px;
    }

    .my-input-date-picker {
      position: unset;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <div class="my-input-date-picker-div">
      <calcite-input-date-picker open class="my-input-date-picker" value="2020-02-12"></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector(".my-input-date-picker").flipPlacements = ["right"];
  </script>
`;

export const chineseLang_TestOnly = (): string => html`
  <style>
    .container {
      width: 1000px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      open
      value="1-1-1"
      lang="zh-CN"
      scale="l"
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
    ></calcite-input-date-picker>
  </div>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`;

export const validationMessageAllScales_TestOnly = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
  </div>
`;

export const defaultAllScales = (): string => html`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
  </div>
`;

export const rangeAllScales = (): string => html`
  <style>
    .container {
      inline-size: 2400px;
      block-size: 500px;
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
    ></calcite-input-date-picker>
  </div>
`;

rangeAllScales.parameters = {
  chromatic: {
    delay: 5000,
  },
};

export const rangeOneCalendarsAllScales = (): string => html`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
  </div>
`;

export const arabicLocaleDarkModeRTL_TestOnly = (): string => html`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      class="calcite-mode-dark"
      dir="rtl"
      value="2020-12-12"
      numbering-system="arab"
      lang="ar"
      open
      validation-message="This should not appear because the status is not 'invalid'"
    ></calcite-input-date-picker>
  </div>
`;
arabicLocaleDarkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(
    html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`,
  );

export const rangeWithValueAsDate = (): string => html`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.valueAsDate = [new Date("2025-09-08"), new Date("2025-12-10")];
  </script>
`;

export const rangeWithValue = (): string => html`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.value = ["2025-09-08", "2026-12-10"];
  </script>
`;

export const rangeWithMinAfterCurrentDate = (): string => html`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
`;

export const rangeWithMaxBeforeCurrentDate = (): string => html`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
`;

export const Focus = (): string =>
  html`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    </script>`;

export const localeFormatting = (): string => html`
  <calcite-input-date-picker value="2020-12-12" lang="bs"></calcite-input-date-picker>
  <calcite-input-date-picker value="2020-12-12" lang="it-CH"></calcite-input-date-picker>
`;
