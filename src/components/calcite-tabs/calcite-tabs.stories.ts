import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { darkBackground, iconNames, parseReadme } from "../../../.storybook/helpers";
import readme1 from "./readme.md";
import readme2 from "../calcite-tab/readme.md";
import readme3 from "../calcite-tab-nav/readme.md";
import readme4 from "../calcite-tab-title/readme.md";

const notes1 = parseReadme(readme1);
const notes2 = parseReadme(readme2);
const notes3 = parseReadme(readme3);
const notes4 = parseReadme(readme4);

const notes = notes1.concat(`\n${notes2}`).concat(`\n${notes3}`).concat(`\n${notes4}`);

storiesOf("components|Tabs", module)
  .add(
    "Simple",
    () => `
    <calcite-tabs
      layout="${select("layout", ["inline", "center"], "inline")}"
      position="${select("position", ["above", "below"], "above")}"
    >
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title active>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
      <calcite-tab><p>Tab 2 Content</p></calcite-tab>
      <calcite-tab><p>Tab 3 Content</p></calcite-tab>
      <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  `,
    { notes }
  )
  .add(
    "With icons",
    () => `
    <calcite-tabs
      layout="${select("layout", ["inline", "center"], "inline")}"
      position="${select("position", ["above", "below"], "above")}"
    >
      <calcite-tab-nav
      slot="tab-nav">
        <calcite-tab-title active
        icon-start="${select("tab 1 icon-start", iconNames, iconNames[0])}"
        >Tab 1 Title</calcite-tab-title>
        <calcite-tab-title
        icon-end="${select("tab 2 icon-end", iconNames, iconNames[0])}"
        >Tab 2 Title</calcite-tab-title>
        <calcite-tab-title
        icon-start="${select("tab 3 icon-start", iconNames, iconNames[0])}"
        icon-end="${select("tab 3 icon-end", iconNames, iconNames[0])}"
        >Tab 3 Title</calcite-tab-title>
        <calcite-tab-title
        icon-start="${select("tab 4 icon-start", iconNames, iconNames[0])}"></calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active><p>Tab 1 Content</p></calcite-tab>
      <calcite-tab><p>Tab 2 Content</p></calcite-tab>
      <calcite-tab><p>Tab 3 Content</p></calcite-tab>
      <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-tabs theme="dark"
    layout="${select("layout", ["inline", "center"], "inline")}"
    position="${select("position", ["above", "below"], "above")}"
    >
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title active>Icon 1</calcite-tab-title>
        <calcite-tab-title>Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>Tab 3 Title</calcite-tab-title>
        <calcite-tab-title>Tab 4 Title</calcite-tab-title>
      </calcite-tab-nav>
    </calcite-tabs>
  `,
    { notes, backgrounds: darkBackground }
  );
