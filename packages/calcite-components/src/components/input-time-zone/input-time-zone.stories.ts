import { select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/InputTimeZone",
  parameters: {
    chromatic: { delay: 1500 },
    notes: readme,
    options: {
      // for stability, we use a timezone unaffected by daylight savings time
      timezone: "America/Mexico_City",
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-input-time-zone
    ${boolean("disabled", false)}
    mode="${select("mode", ["offset", "name"], "offset")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    status="${select("status", ["idle", "invalid", "valid"], "idle")}"
    message-text="${text("message-text", "")}"
    message-icon="${select("message-icon", ["", ...iconNames], "")}"
  ></calcite-input-time-zone>
`;

export const timeZoneNameMode_TestOnly = (): string => html`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

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
      message-text="Choose a closer time zone"
      message-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="m"
      status="invalid"
      value="America/Phoenix"
      message-text="Choose a closer time zone"
      message-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="l"
      status="invalid"
      value="America/Phoenix"
      message-text="Choose a closer time zone"
      message-icon
    ></calcite-input-time-zone>
  </div>
`;
