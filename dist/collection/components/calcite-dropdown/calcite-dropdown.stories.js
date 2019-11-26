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
      alignment="${select(
        "alignment",
        { left: "left", right: "right", center: "center" },
        "left"
      )}"
      scale="${select("scale", { s: "s", m: "m", l: "l" }, "m")}"
      type="${select("type", { click: "click", hover: "hover" }, "click")}"
    >
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        { single: "single", multi: "multi", none: "none" },
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
    "Groups and selection modes",
    () => `
  <calcite-dropdown
    alignment="${select(
      "alignment",
      { left: "left", right: "right", center: "center" },
      "left"
    )}"
    scale="${select("scale", { s: "s", m: "m", l: "l" }, "m")}"
    type="${select("type", { click: "click", hover: "hover" }, "click")}"
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
      alignment="${select(
        "alignment",
        { left: "left", right: "right", center: "center" },
        "left"
      )}"
      scale="${select("scale", { s: "s", m: "m", l: "l" }, "m")}"
      type="${select("type", { click: "click", hover: "hover" }, "click")}"
    >
      <calcite-button slot="dropdown-trigger" theme="dark">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="${select(
        "group selection mode",
        { single: "single", multi: "multi", none: "none" },
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
    "Groups and selection modes dark mode",
    () => `
  <calcite-dropdown
    theme="dark"
    alignment="${select(
      "alignment",
      { left: "left", right: "right", center: "center" },
      "left"
    )}"
    scale="${select("scale", { s: "s", m: "m", l: "l" }, "m")}"
    type="${select("type", { click: "click", hover: "hover" }, "click")}"
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
  );
