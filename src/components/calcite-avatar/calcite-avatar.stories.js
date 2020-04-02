import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { images24 } from "@esri/calcite-ui-icons/js/images24";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Avatar", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-button
      appearance="${select(
        "appearance",
        ["solid", "clear", "inline", "outline", "transparent"],
        "solid"
      )}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
      round="${boolean("round", false)}"
      floating="${boolean("floating", false)}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
   ${text("text", "button text here")}
    </calcite-button>
  `,
    { notes }
  );
