import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { themesDarkDefault } from "../../../.storybook/utils";

export default {
  title: "Components/Controls/Switch",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-switch
    name="setting"
    value="enabled"
    ${boolean("checked", true)}
    ${boolean("disabled", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-switch
    class="calcite-theme-dark"
    name="setting"
    value="enabled"
    ${boolean("checked", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-switch disabled checked></calcite-switch>`;
