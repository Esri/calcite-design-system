import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Radio Button Group", module)
  .addParameters({ notes: readme })
  .add(
    "Light Theme",
    (): string => `
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
  `
  )
  .add(
    "Dark Theme",
    (): string => `
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
    { backgrounds: darkBackground }
  );
