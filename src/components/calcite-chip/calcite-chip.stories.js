import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import {
  darkBackground,
  iconNames,
  parseReadme
} from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Chip", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    >My great chip</calcite-chip>
    </div>
  `,
    { notes }
  )
  .add(
    "With Icon",
    () => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    >
    My great chip</calcite-chip>
    </div>
  `,
    { notes }
  )
  .add(
    "With Image",
    () => `
    <div style="background-color:white;padding:100px">
    <calcite-chip
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    >
    <img slot="chip-image" src="https://placekitten.com/50/50" />
    My great chip</calcite-chip>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark theme",
    () => `
    <div style="background-color:#2b2b2b;padding:100px">
    <calcite-chip
    theme="dark"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    >My great chip</calcite-chip>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
    <div style="background-color:white;padding:100px" dir="rtl">
    <calcite-chip
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["xs", "s", "m", "l", "xl"], "m")}"
    >My great chip</calcite-chip>
    </div>
  `,
    { notes }
  );
