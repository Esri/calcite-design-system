import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/helpers";
import colorReadme from "./readme.md";
import colorSwatchReadme from "../calcite-color-swatch/readme.md";
import hexInputReadme from "../calcite-color-hex-input/readme.md";

const notes = [colorReadme, colorSwatchReadme, hexInputReadme].join("\n");

storiesOf("components|Color", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-color
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#beefee"
    ></calcite-color>
  `,
    { notes }
  )
  .add(
    "Dark Mode",
    () => `
      <calcite-color
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#beefee"
    ></calcite-color>
    `,
    { notes, backgrounds: darkBackground }
  );
