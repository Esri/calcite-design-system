import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Dropdown", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-dropdown
      alignment="${select("alignment", ["left", "right"], "left")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
    >
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `,
    { notes }
  )
  .add(
    "With Icons",
    () => `
    <calcite-dropdown
      alignment="${select("alignment", ["left", "right"], "left")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
    >
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon Start">
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon End">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon Both">
      <calcite-dropdown-item icon-start="list" icon-end="data-check" >List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid"  icon-end="data-check" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check" >Table</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `,
    { notes }
  )
  .add(
    "Groups and selection modes",
    () => `
  <calcite-dropdown
    alignment="${select("alignment", ["left", "right"], "left")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
  >
    <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item active>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multi">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item active>Potato</calcite-dropdown-item>
      <calcite-dropdown-item active>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-dropdown
      theme="dark"
      alignment="${select("alignment", ["left", "right"], "left")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
       width="${select("width", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
    >
      <calcite-button slot="dropdown-trigger" theme="dark">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "With Icons Dark mode",
    () => `
    <calcite-dropdown
      theme="dark"
      alignment="${select("alignment", ["left", "right"], "left")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
    >
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon Start">
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon End">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        ["single", "multi", "none"],
        "single"
      )}" group-title="Icon Both">
      <calcite-dropdown-item icon-start="list" icon-end="data-check" >List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid"  icon-end="data-check" active>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check" >Table</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `,
  { notes, backgrounds: darkBackground }
  )
  .add(
    "Groups and selection modes dark mode",
    () => `
  <calcite-dropdown
    theme="dark"
    alignment="${select("alignment", ["left", "right"], "left")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
  >
    <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item active>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multi">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item active>Potato</calcite-dropdown-item>
      <calcite-dropdown-item active>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`,
{ notes, backgrounds: darkBackground }
  );
