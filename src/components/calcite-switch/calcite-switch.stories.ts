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
      <calcite-switch
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        ${boolean("disabled", false)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
      ></calcite-switch>
  `
  )
  .add(
    "Wrapping calcite-label",
    (): string => `
      <calcite-label layout="${select("layout", ["inline", "inline-space-between", "default"], "inline")}"
       ${boolean("disabled", false)}>
      Enable setting
      <calcite-switch
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        ${boolean("disabled", false)}
      ></calcite-switch>
      </calcite-label>
  `
  )
  .add(
    "Dark mode",
    (): string => `
      <calcite-switch
        theme="dark"
        name="setting"
        value="enabled"
        ${boolean("switched", true)}

        scale="${select("scale", ["s", "m", "l"], "m")}"
      ></calcite-switch>
 `,
    {
      backgrounds: darkBackground
    }
  )
  .add(
    "RTL",
    (): string => `
      Enable setting
      <calcite-switch
        dir="rtl"
        name="setting"
        value="enabled"
        ${boolean("switched", true)}
        scale="${select("scale", ["s", "m", "l"], "m")}"
      ></calcite-switch>
`
  );
