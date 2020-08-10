import { storiesOf } from "@storybook/html";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
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
      ${boolean("hide hex", false) ? "hide-hex" : ""}
      ${boolean("hide channels", false) ? "hide-channels" : ""}
      ${boolean("hide saved", false) ? "hide-saved" : ""}
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
      hide-channels=${boolean("hide channels", false) || ""}
      hide-hex=${boolean("hide hex", false) || ""}
      hide-saved=${boolean("hide saved", false) || ""}
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#beefee"
    ></calcite-color>
    `,
    { notes, backgrounds: darkBackground }
  );
