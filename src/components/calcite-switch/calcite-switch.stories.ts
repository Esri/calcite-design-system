import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Switch", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
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
  `
  )
  .add(
    "Dark mode",
    (): string => `
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
      backgrounds: darkBackground
    }
  )
  .add(
    "RTL",
    (): string => `
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
    </label>`
  );
