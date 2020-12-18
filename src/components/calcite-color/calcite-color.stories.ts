import { select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/utils";
import { boolean } from "../../../.storybook/helpers";
import colorReadme from "./readme.md";
import colorSwatchReadme from "../calcite-color-swatch/readme.md";
import hexInputReadme from "../calcite-color-hex-input/readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Color",

  parameters: {
    notes: [colorReadme, colorSwatchReadme, hexInputReadme]
  }
};

export const Simple = (): string => html`
  <calcite-color
    ${boolean("hide hex", false)}
    ${boolean("hide channels", false)}
    ${boolean("hide saved", false)}
    theme="light"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="#beefee"
  ></calcite-color>
`;

export const DarkMode = (): string => html`
  <calcite-color
    hide-channels=${boolean("hide channels", false)}
    hide-hex=${boolean("hide hex", false)}
    hide-saved=${boolean("hide saved", false)}
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="#beefee"
  ></calcite-color>
`;

DarkMode.story = {
  parameters: { backgrounds: darkBackground }
};
