import { number, select, text } from "../../../.storybook/fake-knobs";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Progress",
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const themed_TestOnly = (): string => html`
  <calcite-progress
    type="determinate"
    value="0.5"
    label="a11y label"
    text="50% Complete (optional text)"
    style="
    --calcite-progress-background-color: red;
    --calcite-progress-fill-color: blue;
    --calcite-progress-text-color: green;  
    "
  ></calcite-progress>
`;
