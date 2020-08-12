import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("components|Switch", module)
  .add(
    "Simple",
    () => `
    <label>
      <calcite-switch
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        ${boolean("disabled", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
        color="${select("color", ["blue", "red"], "blue")}"
      ></calcite-switch>
      Enable setting
    </label>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <div style="color:white">
      <label>
      <calcite-switch
        theme="dark"
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        ${boolean("disabled", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
        color="${select("color", ["blue", "red"], "blue")}"
      ></calcite-switch>
      Enable setting
    </label>
    </div>`,
    {
      notes,
      backgrounds: darkBackground
    }
  )
  .add(
    "RTL",
    () => `
      <label>
      <calcite-switch
        dir="rtl"
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        ${boolean("disabled", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
        color="${select("color", ["blue", "red"], "blue")}"
      ></calcite-switch>
      Enable setting
    </label>`,
    { notes }
  );
