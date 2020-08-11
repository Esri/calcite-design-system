import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("components|Icon", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-icon
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("mirrored", false)}
    />
  `,
    { notes }
  )
  .add(
    "Dark theme",
    () => `
    <calcite-icon
    theme="dark"
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("mirrored", false)}
    />
  `,
    { notes, backgrounds: darkBackground }
  );
