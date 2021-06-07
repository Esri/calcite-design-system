import { number, select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
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
    hour-display-format="${select("hour-display-format", ["12", "24"], "12")}"
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
    hour-display-format="${select("hour-display-format", ["12", "24"], "12")}"
    name="${text("name", "dark")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "22:37")}"
  >
  </calcite-input-time-picker>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};
