import { select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/Radio/Radio Button",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-label layout="inline">
    <calcite-radio-button
      ${boolean("checked", false)}
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      ${boolean("focused", false)}
      name="simple"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="value"
    ></calcite-radio-button>
    ${text("label", "Radio Button")}
  </calcite-label>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-label layout="inline" class="calcite-theme-dark" dir="rtl">
    <calcite-radio-button
      ${boolean("checked", false)}
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      ${boolean("focused", false)}
      name="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="value"
    >
    </calcite-radio-button>
    ${text("label", "Radio Button")}
  </calcite-label>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`;
