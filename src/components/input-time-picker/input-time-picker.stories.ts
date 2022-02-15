import { number, select, text } from "@storybook/addon-knobs";
import { boolean, createSteps, stepStory } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

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

DarkTheme.parameters = { themes: themesDarkDefault };
