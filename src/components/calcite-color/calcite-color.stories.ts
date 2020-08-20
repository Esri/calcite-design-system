import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { darkBackground } from "../../../.storybook/utils";
import { boolean } from "../../../.storybook/helpers";
import colorReadme from "./readme.md";
import colorSwatchReadme from "../calcite-color-swatch/readme.md";
import hexInputReadme from "../calcite-color-hex-input/readme.md";

storiesOf("Components/Color", module)
  .addParameters({ notes: [colorReadme, colorSwatchReadme, hexInputReadme] })
  .add(
    "Simple",
    () => `
    <calcite-color
      ${boolean("hide hex", false)}
      ${boolean("hide channels", false)}
      ${boolean("hide saved", false)}
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#beefee"
    ></calcite-color>
  `
  )
  .add(
    "Dark Mode",
    () => `
      <calcite-color
      hide-channels=${boolean("hide channels", false)}
      hide-hex=${boolean("hide hex", false)}
      hide-saved=${boolean("hide saved", false)}
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="#beefee"
    ></calcite-color>
    `,
    { backgrounds: darkBackground }
  );
