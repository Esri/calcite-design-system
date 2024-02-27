import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Checkbox",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-label layout="inline">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      status="${select("status", ["idle", "invalid", "valid"], "idle")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;

export const disabled_TestOnly = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
