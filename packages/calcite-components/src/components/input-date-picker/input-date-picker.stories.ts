import { type StoryObj } from "@storybook/web-components";
import { userEvent } from "@storybook/test";
import { findByShadowRole } from "shadow-dom-testing-library";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
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
  <div style="width: 400px">
    <calcite-input-date-picker
      scale="${args.scale}"
      status="${args.status}"
      value="${args.value}"
      min="${args.min}"
      max="${args.max}"
      lang="${args.lang}"
      placement="${args.placement}"
      validation-message="${args.validationMessage}"
      validation-icon="${args.validationIcon}"
    ></calcite-input-date-picker
  </div>
`;

export const range = (): string => html`
  <div style="width: 400px">
  <calcite-input-date-picker range></calcite-input-date-picker
  </div>
`;

export const rangeWithMinMax = (): string => html`
  <div style="width: 400px">
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

export const mediumIconForLargeInput_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      open
      value="1/1/1"
      lang="zh-CN"
      scale="l"
      start="2020-12-12"
      end="2020-12-16"
      range
      layout="horizontal"
    ></calcite-input-date-picker>
  </div>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
  </div>
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

export const scales_TestOnly = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 1400px;
      height: 1200px;
      gap: 400px;
    }

    .use-case {
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <div class="use-case">
      <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
    </div>
    <div class="use-case">
      <calcite-input-date-picker
        scale="s"
        open
        start="2020-12-12"
        end="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="m"
        open
        start="2020-12-12"
        end="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="l"
        open
        start="2020-12-12"
        end="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
    </div>
  </div>
`;

export const arabicLocaleDarkModeRTL_TestOnly = (): string => html`
  <div style="width: 400px">
    <calcite-input-date-picker
      class="calcite-mode-dark"
      dir="rtl"
      value="2020-12-12"
      numbering-system="arab"
      lang="ar"
      validation-message="This should not appear because the status is not 'invalid'"
    ></calcite-input-date-picker
  </div>
`;
arabicLocaleDarkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(
    html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`,
  );

export const rangeWithValueAsDate_TestOnly = (): string => html`
  <calcite-input-date-picker range open></calcite-input-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.valueAsDate = [new Date("2025-09-08"), new Date("2025-12-10")];
  </script>
`;

rangeWithValueAsDate_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};

export const rangeWithValue_TestOnly = (): string => html`
  <calcite-input-date-picker range open></calcite-input-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.value = ["2025-09-08", "2026-12-10"];
  </script>
`;

rangeWithValue_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};

export const rangeWithMinBeforeCurrentDate_TestOnly = (): string => html`
  <calcite-input-date-picker range open min="2016-08-09"></calcite-input-date-picker>
`;

rangeWithMinBeforeCurrentDate_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};

export const rangeWithMaxBeforeCurrentDate_TestOnly = (): string => html`
  <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
`;

rangeWithMaxBeforeCurrentDate_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};

export const rangeWithMinAsDateAfterCurrentDate_TestOnly = (): string => html`
  <calcite-input-date-picker range open></calcite-input-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 10);
    datePicker.minAsDate = currentDate;
  </script>
`;

rangeWithMinAsDateAfterCurrentDate_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};
export const open: StoryObj = {
  decorators: [(): string => html`<calcite-input-date-picker></calcite-input-date-picker>`],
};

open.play = async ({ canvasElement, step }) => {
  await step("Open on Click", async () => {
    const picker = await findByShadowRole(canvasElement, "combobox");
    await userEvent.click(picker);
    // const datepicker = await findByShadowTestId(canvasElement, 'date-picker');
    // // await expect(pickerEl.getAttribute('open')).toBe(true)
    // await waitFor(() => expect(datepicker).toBeVisible());
  });
};
