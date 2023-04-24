import { select, number, text } from "@storybook/addon-knobs";

import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Progress",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-progress
    type="${select("type", ["determinate", "indeterminate"], "determinate")}"
    value="${number("value", 0.8, { range: true, min: 0, max: 1, step: 0.01 })}"
    text="${text("text", "")}"
  ></calcite-progress>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-progress
    class="calcite-theme-dark"
    type="${select("type", { determinate: "determinate", indeterminate: "indeterminate" }, "indeterminate")}"
    value="${number("value", 0.2, { range: true, min: 0, max: 1, step: 0.01 })}"
    text="${text("text", "% Complete (optional text)")}"
  ></calcite-progress>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
