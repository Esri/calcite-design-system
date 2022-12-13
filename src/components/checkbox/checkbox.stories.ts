import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

import { filterComponentAttributes, Attributes, createComponentHTML as create } from "../../../.storybook/utils";

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes([], exceptions);
};

export default {
  title: "Components/Controls/Checkbox",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-label layout="inline">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;

export const disabled_TestOnly = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-theme-dark">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
