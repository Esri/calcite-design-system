import { storiesOf } from "@storybook/html";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme1 from "./readme.md";
import readme2 from "../calcite-combobox-item/readme.md";

const notes1 = parseReadme(readme1);
const notes2 = parseReadme(readme2);
const notes = notes1.concat(`\n${notes2}`);

storiesOf("Combobox", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:400px;max-width:100%;background-color:white;padding:100px"">
    <calcite-combobox
      scale="${select("scale", ["s", "m", "l"], "m")}"
      >
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
    </div>
  `,
    { notes }
  )

  .add(
    "Dark Theme",
    () => `
    <div style="width:400px;max-width:100%;background-color:white;padding:100px"">
    <calcite-combobox
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers">
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" text-label="Animals">
      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
  </div>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
    <div style="width:400px;max-width:100%;background-color:white;padding:100px"">
    <calcite-combobox
    dir="rtl"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers">
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" text-label="Animals">
      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
  </div>
  `,
    { notes }
  );
