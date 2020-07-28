import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Checkbox", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <label>
      <calcite-checkbox
        ${boolean("checked", true)}
        ${boolean("disabled", false)}
        ${boolean("indeterminate", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
      ></calcite-checkbox>
      Text for the checkbox
    </label>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <label>
      <calcite-checkbox
        theme="dark"
        ${boolean("checked", true)}
        ${boolean("disabled", false)}
        ${boolean("indeterminate", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
      ></calcite-checkbox>
    </label>
`,
    { notes, backgrounds: darkBackground }
  );
