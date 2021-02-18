import { select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Radio/Radio Button",

  parameters: {
    notes: readme
  }
};

export const LightTheme = (): string => html`
  <calcite-radio-button
    ${boolean("checked", false)}
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    ${boolean("focused", false)}
    name="simple"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="value"
  >
    ${text("label", "Radio Button")}
  </calcite-radio-button>
`;

export const DarkTheme = (): string => html`
  <calcite-radio-button
    ${boolean("checked", false)}
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    ${boolean("focused", false)}
    name="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    theme="dark"
    value="value"
  >
    ${text("label", "Radio Button")}
  </calcite-radio-button>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};
