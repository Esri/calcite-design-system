import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Radio Button", module)
  .addParameters({ notes: readme })
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
  `
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
    { backgrounds: darkBackground }
  );
