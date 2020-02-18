import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import * as icons from "../../../node_modules/@esri/calcite-ui-icons";
import readme from "./readme.md";
const notes = parseReadme(readme);

export default {
  title: "Button with Overflow",
  decorators: [withKnobs],
  parameters: { notes }
};

export const simple = () =>
  `
  <calcite-button-with-overflow
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}">
  </calcite-icon>`;

export const RTL = () =>
  `<calcite-button-with-overflow></calcite-icon>`;

export const darkMode = () =>
  `<calcite-button-with-overflow></calcite-icon>`;

darkMode.story = {
  parameters: {
    backgrounds: darkBackground
  }
};
