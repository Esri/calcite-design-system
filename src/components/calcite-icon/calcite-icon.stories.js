import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Icon", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-icon
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("size", ["s", "m", "l"], "m")}"
    ${boolean("mirrored", false)}
  ></calcite-icon>
  `,
    { notes }
  )
  .add(
    "Dark theme",
    () => `
    <div style="color:white">
      <calcite-icon
      icon="${select("icon", iconNames, iconNames[0])}"
      scale="${select("size", ["s", "m", "l"], "m")}"
      ${boolean("mirrored", false)}
      theme="dark"
    ></calcite-icon>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  );
