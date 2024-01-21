import { number, select, text } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";

export default {
  title: "Components/Controls/Time/Input Time Picker",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "simple")}"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    status="${select("status", ["idle", "invalid", "valid"], "idle")}"
    step="${number("step", 1)}"
    validation-message="${text("validation-message", "")}"
    validation-icon="${select("validation-icon", ["", ...iconNames], "")}"
    value="${text("value", "10:37")}"
  >
  </calcite-input-time-picker>
`;

export const deciSeconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.1" value="10:37:09.5" open> </calcite-input-time-picker>
`;

export const centiseconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>
`;

export const milliseconds_TestOnly = (): string => html`
  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`;

export const scales_TestOnly = (): string => html`
  <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-picker class="calcite-mode-dark" value="22:37" step="1"> </calcite-input-time-picker>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const open_TestOnly = (): string => html`
  <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker>
`;

export const koreanLocale_TestOnly = (): string => html`
  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>
`;

export const arabicLocaleNumberingSystem_TestOnly = (): string => html`
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
`;

export const readOnlyHasNoDropdownAffordance_TestOnly = (): string => html`
  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>
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
    <calcite-input-time-picker
      scale="s"
      status="invalid"
      value="13:37"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="m"
      status="invalid"
      value="4:20"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="l"
      status="invalid"
      value="11:11"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
  </div>
`;

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(html`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`);
