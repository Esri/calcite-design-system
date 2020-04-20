import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Radio Group", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-radio-group
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `,
    { notes }
  )
  .add(
    "Wrapping Calcite Label",
    () => `
    <calcite-label>
    My great radio group
    <calcite-radio-group
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-label>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-radio-group
      theme="dark"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `,
    { notes, backgrounds: darkBackground }
  );
