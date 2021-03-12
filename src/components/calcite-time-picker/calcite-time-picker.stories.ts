import { number, select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Time/Time Picker",

  parameters: {
    notes: readme
  }
};

export const LightTheme = (): string => html`
  <calcite-time-picker
    ${boolean("hidden", false)}
    hour="${text("hour", "10")}"
    hour-display-format="${select("hour-display-format", ["12", "24"], "12")}"
    minute="${text("minute", "37")}"
    name="${text("name", "basic")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    second="${text("second", "0")}"
    step="${number("step", 1)}"
  >
  </calcite-time-picker>
`;

export const DarkTheme = (): string => html`
  <calcite-time-picker
    ${boolean("hidden", false)}
    hour="${text("hour", "22")}"
    hour-display-format="${select("hour-display-format", ["12", "24"], "12")}"
    minute="${text("minute", "37")}"
    name="${text("name", "basic")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    second="${text("second", "0")}"
    step="${number("step", 1)}"
    theme="dark"
    value="${text("value", "")}"
  >
  </calcite-time-picker>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};
