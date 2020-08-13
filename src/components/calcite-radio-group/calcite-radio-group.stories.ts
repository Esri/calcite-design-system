import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../calcite-radio-group-item/readme.md";

storiesOf("Components/Radio Group", module)
  .addParameters({ notes: [readme1, readme2] })
  .add(
    "Simple",
    () => `
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "full"], "auto")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `
  )
  .add(
    "Wrapping Calcite Label",
    () => `
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
    My great radio group
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      width="${select("width", ["auto", "full"], "auto")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-label>
  `
  )
  .add(
    "With icons",
    () => `
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
    My great radio group
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      width="${select("width", ["auto", "full"], "auto")}"
    >
      <calcite-radio-group-item icon="car" value="car" checked>Car</calcite-radio-group-item>
      <calcite-radio-group-item icon="plane" value="plane">Plane</calcite-radio-group-item>
      <calcite-radio-group-item icon="biking" value="bicycle">Bicycle</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-label>
  `
  )
  .add(
    "Dark mode",
    () => `
    <calcite-radio-group
      theme="dark"
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "full"], "auto")}"
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  `,
    { backgrounds: darkBackground }
  )
  .add(
    "Full width",
    () => `
    <div style="width:33vw;">
      <calcite-radio-group
        layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
        appearance="${select("appearance", ["solid", "outline"], "solid")}"
        width="${select("width", ["auto", "full"], "full")}"
      >
        <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
        <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
        <calcite-radio-group-item value="long-text-1">Longer text wraps.</calcite-radio-group-item>
        <calcite-radio-group-item value="long-text-2">Longer text wraps.</calcite-radio-group-item>
      </calcite-radio-group>
    </div>

  `
  );
