import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("components|Radio Button Group", module)
  .add(
    "Light Theme",
    () => `
    <calcite-radio-button-group
      name="simple"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-radio-button value="react">React</calcite-radio-button>
      <calcite-radio-button value="ember">Ember</calcite-radio-button>
      <calcite-radio-button value="angular">Angular</calcite-radio-button>
      <calcite-radio-button value="vue">Vue</calcite-radio-button>
    </calcite-radio-button-group>
  `,
    { notes }
  )
  .add(
    "Dark Theme",
    () => `
    <calcite-radio-button-group
      theme="dark"
      name="dark"
      ${boolean("disabled", false)}
      ${boolean("hidden", false)}
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-radio-button value="react">React</calcite-radio-button>
      <calcite-radio-button value="ember">Ember</calcite-radio-button>
      <calcite-radio-button value="angular">Angular</calcite-radio-button>
      <calcite-radio-button value="vue">Vue</calcite-radio-button>
    </calcite-radio-button-group>
  `,
    { notes, backgrounds: darkBackground }
  );
