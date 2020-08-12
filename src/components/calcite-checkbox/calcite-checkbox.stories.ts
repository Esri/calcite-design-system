import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { parseReadme, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("components/Checkbox", module)
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
