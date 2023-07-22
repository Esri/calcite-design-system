import { number, select, text } from "@storybook/addon-knobs";

import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Progress",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-progress
    type="${select("type", ["determinate", "indeterminate"], "determinate")}"
    value="${number("value", 0.8, { range: true, min: 0, max: 1, step: 0.01 })}"
    text="${text("text", "")}"
  ></calcite-progress>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="0.2"
    text="% Complete (optional text)"
  ></calcite-progress>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
