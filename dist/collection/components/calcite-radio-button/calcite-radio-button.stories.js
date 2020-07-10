import { storiesOf } from "@storybook/html";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("Radio Button", module)
  .addDecorator(withKnobs)
  .add(
    "Light Theme",
    () => `
      <calcite-radio-button
        checked="${boolean("checked", false)}"
        disabled="${boolean("disabled", false)}"
        hidden="${boolean("hidden", false)}"
        focused="${boolean("focused", false)}"
        name="simple"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="value"
      >
        ${text("label", "Radio Button")}
      </calcite-radio-button>
  `,
    { notes }
  )
  .add(
    "Dark Theme",
    () => `
    <calcite-radio-button
      checked="${boolean("checked", false)}"
      disabled="${boolean("disabled", false)}"
      hidden="${boolean("hidden", false)}"
      focused="${boolean("focused", false)}"
      name="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      theme="dark"
      value="value"
    >
      ${text("label", "Radio Button")}
    </calcite-radio-button>
  `,
    { notes, backgrounds: darkBackground }
  );
