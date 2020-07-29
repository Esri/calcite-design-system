import { storiesOf } from "@storybook/html";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("Radio Button", module)
  .addDecorator(withKnobs)
  .add(
    "Light Theme",
    () => `
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
  `,
    { notes }
  )
  .add(
    "Dark Theme",
    () => `
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
  `,
    { notes, backgrounds: darkBackground }
  );
