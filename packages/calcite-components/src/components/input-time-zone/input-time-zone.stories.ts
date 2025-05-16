import { iconNames } from "../../../.storybook/helpers";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputTimeZone } from "./input-time-zone";

const { mode, scale, status } = ATTRIBUTES;

type InputTimeZoneStoryArgs = Pick<
  InputTimeZone,
  "disabled" | "mode" | "scale" | "status" | "validationMessage" | "validationIcon"
>;

export default {
  title: "Components/Controls/InputTimeZone",
  args: {
    disabled: false,
    mode: mode.defaultValue,
    scale: scale.defaultValue,
    status: status.defaultValue,
    validationMessage: "",
    validationIcon: "",
  },
  argTypes: {
    mode: {
      options: mode.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
    validationIcon: {
      options: iconNames,
      control: { type: "select" },
    },
  },
  parameters: {
    options: {
      // for stability, we use a timezone unaffected by daylight savings time
      timezone: "America/Mexico_City",
    },
  },
};

export const simple = (args: InputTimeZoneStoryArgs): string => html`
  <calcite-input-time-zone
    ${boolean("disabled", args.disabled)}
    mode="${args.mode}"
    scale="${args.scale}"
    status="${args.status}"
    validation-message="${args.validationMessage}"
    validation-icon="${args.validationIcon}"
  ></calcite-input-time-zone>
`;

export const clearable = (): string => html`
  <label>default</label>
  <calcite-input-time-zone mode="offset" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable></calcite-input-time-zone>
  <br />
  <label>initialized as empty</label>
  <calcite-input-time-zone mode="offset" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable value=""></calcite-input-time-zone>
`;

export const timeZoneNameMode_TestOnly = (): string => html`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
`;

export const timeZoneRegionMode_TestOnly = (): string => html`
  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>
`;

export const initialNameSelected_TestOnly = (): string =>
  // for stability, we use a timezone unaffected by daylight savings time
  html`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`;

export const initialOffsetSelected_TestOnly = (): string => html`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`;

export const offsetAndGroupLabelsAreLocalized_TestOnly = (): string => html`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
`;

export const offsetAndGroupLabelsBasedOnReferenceDate_TestOnly = (): string => html`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
`;

export const displayingTimeZoneOffsets_TestOnly = (): string => html`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`;

export const disabled_TestOnly = (): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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
    <calcite-input-time-zone
      scale="s"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="m"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="l"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
  </div>
`;

export const readOnly = (): string => html` <calcite-input-time-zone read-only></calcite-input-time-zone> `;
