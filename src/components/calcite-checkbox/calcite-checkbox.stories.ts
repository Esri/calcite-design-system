import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Checkbox", module)
  .addParameters({ notes: readme })
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
  `
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
    { backgrounds: darkBackground }
  );
