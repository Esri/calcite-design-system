import { defaultLocale } from "@arcgis/toolkit/intl";
import { boolean, createBreakpointStories, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { supportedNlsLocales } from "../date-picker/utils";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import { iconNames } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputDatePicker } from "./input-date-picker";

const { scale, status } = ATTRIBUTES;

interface InputDatePickerStoryArgs extends Pick<
  InputDatePicker,
  | "calendars"
  | "disabled"
  | "layout"
  | "max"
  | "min"
  | "open"
  | "placement"
  | "range"
  | "readOnly"
  | "scale"
  | "status"
  | "validationIcon"
  | "validationMessage"
  | "value"
> {
  lang: string;
}

export default {
  title: "Components/Controls/InputDatePicker",
  args: {
    calendars: 2,
    disabled: false,
    layout: "horizontal",
    scale: scale.defaultValue,
    status: status.defaultValue,
    value: "2020-12-12",
    min: "2016-08-09",
    max: "2023-12-18",
    lang: defaultLocale,
    open: true,
    placement: defaultMenuPlacement,
    range: false,
    readOnly: false,
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
      options: supportedNlsLocales,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacements,
      control: { type: "select" },
    },
    calendars: {
      options: [1, 2],
      control: { type: "select" },
    },
    layout: {
      options: ["horizontal", "vertical"],
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
      calendars="${args.calendars}"
      ${boolean("disabled", args.disabled)}
      lang="${args.lang}"
      layout="${args.layout}"
      min="${args.min}"
      max="${args.max}"
      ${boolean("open", args.open)}
      placement="${args.placement}"
      ${boolean("range", args.range)}
      ${boolean("read-only", args.readOnly)}
      validation-message="${args.validationMessage}"
      ${optionalAttribute("validation-icon", typeof args.validationIcon === "string" ? args.validationIcon : undefined)}
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

export const withMinAsDateAndMaxAsDate = (): string =>
  html`<style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker open></calcite-input-date-picker>
    </div>
    <script>
      const datePicker = document.querySelector("calcite-input-date-picker");
      const offsetTime = "T07:00:00.000Z";
      datePicker.minAsDate = new Date("2020-01-01T07:00:00.000Z");
      datePicker.maxAsDate = new Date("2020-12-31T07:00:00.000Z");
    </script>`;

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

export const disabled = (): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`;

export const flipPlacements = (): string => html`
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

export const readOnlyHasNoDropdownAffordance = (): string => html`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`;

export const validationMessageAllScales = (): string => html`
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

const allScalesTemplate = (layout: "horizontal" | "vertical", range = false, calendars = 2): string => {
  const scales = scale.values;
  return html`<style>
      .container {
        block-size: 500px;
        display: flex;
        gap: 100px;
      }
      .range--horizontal {
        inline-size: 2400px;
      }
    </style>
    <div class="container ${range && layout === "horizontal" ? "range--horizontal" : ""}">
      ${scales
        .map(
          (scale) => html`
            <calcite-input-date-picker
              scale="${scale}"
              open
              value="2020-12-12"
              min="2020-12-12"
              max="2020-12-16"
              layout="${layout}"
              calendars="${calendars}"
              ${boolean("range", range)}
            ></calcite-input-date-picker>
          `,
        )
        .join("")}
    </div>`;
};

export const allScalesHorizontal = (): string => allScalesTemplate("horizontal");

export const allScalesVertical = (): string => allScalesTemplate("vertical");

export const allScalesRangeHorizontal = (): string => allScalesTemplate("horizontal", true);

allScalesRangeHorizontal.parameters = {
  chromatic: {
    modes: {
      largeScreen: {
        viewport: {
          width: 2500,
          height: 800,
        },
      },
    },
    cropToViewport: true,
  },
};

export const allScalesRangeVertical = (): string => allScalesTemplate("vertical", true);

export const allScalesRangeOneCalendarHorizontal = (): string => allScalesTemplate("horizontal", true, 1);

export const allScalesRangeOneCalendarVertical = (): string => allScalesTemplate("vertical", true, 1);

export const arabicLocaleDarkModeRTL = (): string => html`
  <style>
    .container {
      display: flex;
      gap: 20px;
    }
    .picker-group {
      width: 650px;
      height: 1200px;
      display: flex;
      flex-direction: column;
      gap: 370px;
    }
  </style>
  <div class="container">
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
  </div>
`;
arabicLocaleDarkModeRTL.parameters = { themes: modesDarkDefault };

export const widthSetToBreakpoints = (): string =>
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

export const localized = (): string => {
  const locales = ["ar", "bs", "fr-CA", "it-CH", "zh-CN"];

  return html`
    <style>
      .use-cases {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 350px 25px;
        max-width: 1200px;
      }
      calcite-input-date-picker {
        width: 300px;
        height: 300px;
      }
    </style>
    <div class="use-cases">
      ${locales.map(
        (locale) =>
          html`<div>
            <h3>${locale}</h3>
            <calcite-input-date-picker
              lang="${locale}"
              open
              placement="bottom-start"
              value="2020-12-12"
            ></calcite-input-date-picker>
          </div>`,
      )}
    </div>
  `;
};
localized.parameters = {
  chromatic: {
    delay: 1000,
  },
};
