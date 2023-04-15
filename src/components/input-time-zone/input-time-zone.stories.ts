import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/InputTimeZone",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-input-time-zone-picker>
    ${boolean("disabled", false)} scale="${select("scale", ["s", "m", "l"], "m")}"
  </calcite-input-time-zone-picker>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-input-time-zone-picker disabled></calcite-input-time-zone-picker>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-input-time-zone-picker dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone-picker>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
