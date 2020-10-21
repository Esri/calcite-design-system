import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Chip", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    scale="${select("scale", ["s", "m", "l"], "m")}"
    appearance="${select("appearance", ["solid", "clear"], "solid")}"
    color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
    ${boolean("dismissible", false)}
    >My great chip</calcite-chip>
    </div>
  `
  )
  .add(
    "With Icon",
    (): string => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    appearance="${select("appearance", ["solid", "clear"], "solid")}"
    color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
    ${boolean("dismissible", false)}
    >
    My great chip</calcite-chip>
    </div>
  `
  )
  .add(
    "With Image",
    (): string => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    scale="${select("scale", ["s", "m", "l"], "m")}"
    appearance="${select("appearance", ["solid", "clear"], "solid")}"
    color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
    ${boolean("dismissible", false)}
    >
    <img alt="" slot="chip-image" src="https://placekitten.com/50/50" />
    My great chip</calcite-chip>
    </div>
  `
  )
  .add(
    "Dark theme",
    (): string => `
    <div style="background-color:#2b2b2b;padding:100px">
    <calcite-chip
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    appearance="${select("appearance", ["solid", "clear"], "solid")}"
    color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
    ${boolean("dismissible", false)}
    >My great chip</calcite-chip>
    </div>
  `,
    { backgrounds: darkBackground }
  )
  .add(
    "RTL",
    (): string => `
    <div style="background-color:white;padding:100px" dir="rtl">
    <calcite-chip
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    appearance="${select("appearance", ["solid", "clear"], "solid")}"
    color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
    ${boolean("dismissible", false)}
    >My great chip</calcite-chip>
    </div>
  `
  );
