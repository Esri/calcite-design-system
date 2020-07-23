import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/helpers";
import colorPickerReadme from "./readme.md";
import colorSwatchReadme from "../calcite-color-swatch/readme.md";
import hexInputReadme from "../calcite-hex-input/readme.md";

const notes = [
  colorPickerReadme,
  colorSwatchReadme,
  hexInputReadme
].join("\n");

storiesOf("Color Picker", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-color-picker
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#BEEFEE"
    ></calcite-color-picker>
  `,
    { notes }
  ).add(
  "Dark Mode",
  () => `
      <calcite-color-picker
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#BEEFEE"
  ], "chevron")}"
    ></calcite-color-picker>
    `,
  { notes, backgrounds: darkBackground }
)

