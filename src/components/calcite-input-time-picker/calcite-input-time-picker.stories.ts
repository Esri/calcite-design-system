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
    hour-display-format="${select("hour-display-format", ["12", "24"], "24")}"
    name="${text("name", "basic")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    value="${text("value", "")}"
  >
  </calcite-input-time-picker>
`;

export const DarkTheme = (): string => html`
  <calcite-input-time-picker
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    hour-display-format="${select("hour-display-format", ["12", "24"], "24")}"
    name="${text("name", "basic")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    step="${number("step", 1)}"
    theme="dark"
    value="${text("value", "00:00")}"
  >
  </calcite-input-time-picker>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};
