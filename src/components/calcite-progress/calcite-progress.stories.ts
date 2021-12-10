import { select, number, text, boolean } from "@storybook/addon-knobs";

import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Progress",

  parameters: {
    notes: readme
  }
};

export const Determinate = (): string => html`
  <calcite-progress
    type="determinate"
    value="${number("value", 0, { range: true, min: 0, max: 1, step: 0.01 })}"
    text="${text("text", "")}"
  ></calcite-progress>
`;

export const Indeterminate = (): string => html`
  <calcite-progress
    reversed=${boolean("reversed", false)}
    type="indeterminate"
    text="${text("text", "")}"
  ></calcite-progress>
`;

export const DarkMode = (): string => html`
  <calcite-progress
    class="calcite-theme-dark"
    type="${select("type", { determinate: "determinate", indeterminate: "indeterminate" }, "indeterminate")}"
    value="${number("value", 0, { range: true, min: 0, max: 1, step: 0.01 })}"
    text="${text("text", "")}"
  ></calcite-progress>
`;

DarkMode.storyName = "Dark mode";
DarkMode.parameters = { themes: themesDarkDefault };
