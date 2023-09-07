import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/InputTimeZone",
  parameters: {
    notes: readme,
    options: {
      timezone: "America/Los_Angeles",
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-input-time-zone
    ${boolean("disabled", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-input-time-zone>
`;

export const initialOffsetSelected_TestOnly = (): string => html`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`;

export const displayingTimeZoneOffsets_TestOnly = (): string => html`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`;
displayingTimeZoneOffsets_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

export const disabled_TestOnly = (): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
