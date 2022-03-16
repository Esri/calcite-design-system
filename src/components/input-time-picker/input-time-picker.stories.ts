import { number, select, text } from "@storybook/addon-knobs";
import { boolean, createSteps, stepStory } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

const placements = [
  "auto",
  "auto-start",
  "auto-end",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end"
];

const calcite_placements = placements.concat([
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start",
  "leading-leading",
  "leading-trailing",
  "trailing-leading",
  "trailing-trailing",
  "top-leading",
  "top-trailing",
  "bottom-leading",
  "bottom-trailing",
  "right-leading",
  "right-trailing",
  "left-leading",
  "left-trailing"
]);

export default {
  title: "Components/Controls/Time/Input Time Picker",

  parameters: {
    notes: readme
  }
};

export const LightTheme = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "light")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
  >
  </calcite-input-time-picker>
`;

export const DarkTheme = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    class="calcite-theme-dark"
    name="${text("name", "dark")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "22:37")}"
  >
  </calcite-input-time-picker>
`;

export const Placement = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    name="${text("name", "placement-top")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "10:37")}"
    placement="${select("placement", calcite_placements, "auto")}"
  >
  </calcite-input-time-picker>
`;

export const KoreanLocale = stepStory(
  (): string => html`
    <calcite-input-time-picker
      id="reference-element"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      name="${text("name", "light")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      step="${number("step", 1)}"
      value="${text("value", "10:37")}"
      lang="ko"
    >
    </calcite-input-time-picker>
  `,
  createSteps("calcite-input-time-picker").click("#reference-element").snapshot("timePicker")
);

export const ArabicLocale = stepStory(
  (): string => html`
    <calcite-input-time-picker
      id="reference-element"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      name="${text("name", "light")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      step="${number("step", 1)}"
      value="${text("value", "10:37")}"
      lang="ar"
      dir="rtl"
    >
    </calcite-input-time-picker>
  `,
  createSteps("calcite-input-time-picker").click("#reference-element").snapshot("timePicker")
);

DarkTheme.parameters = { themes: themesDarkDefault };

export const disabled = (): string => html`<calcite-input-time-picker disabled></calcite-input-time-picker>`;
