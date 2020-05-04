import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme1 from "./readme.md";
import readme2 from "../calcite-radio-group-item/readme.md";

const notes1 = parseReadme(readme1);
const notes2 = parseReadme(readme2);
const notes = notes1.concat(`\n${notes2}`);

storiesOf("Radio Group", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
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
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
    My great radio group
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
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
    "With icons",
    () => `
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
    My great radio group
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
    >
      <calcite-radio-group-item icon="car" value="car" checked>Car</calcite-radio-group-item>
      <calcite-radio-group-item icon="plane" value="plane">Plane</calcite-radio-group-item>
      <calcite-radio-group-item icon="biking" value="bicycle">Bicycle</calcite-radio-group-item>
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
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
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
