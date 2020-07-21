import { storiesOf } from "@storybook/html";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import {
  darkBackground,
  iconNames,
  parseReadme,
  boolean
} from "../../../.storybook/helpers";
import * as icons from "../../../node_modules/@esri/calcite-ui-icons";
import readme from "./readme.md";

const notes = parseReadme(readme);

storiesOf("Split Button", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-split-button
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["s", "m", "l"], "m")}"
        ${boolean("loading", false)}
        ${boolean("disabled", false)}
        primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
        primary-text="${text("primary-text", "Primary Option")}"
        primary-label="${text("primary-label", "Primary Option")}"
        dropdown-label="${text("dropdown-label", "Additional Options")}"
        dropdown-icon-type="${select(
          "dropdown-icon-type",
          ["chevron", "caret", "ellipsis", "overflow"],
          "chevron"
        )}">
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  `,
    { notes }
  )
  .add(
    "Simple primary-icon-end",
    () => `
    <calcite-split-button
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["s", "m", "l"], "m")}"
        ${boolean("loading", false)}
        ${boolean("disabled", false)}
        primary-icon-end="${select("primary-icon-end", iconNames, iconNames[0])}"
        primary-text="${text("primary-text", "Primary Option")}"
        primary-label="${text("primary-label", "Primary Option")}"
        dropdown-label="${text("dropdown-label", "Additional Options")}"
        dropdown-icon-type="${select(
          "dropdown-icon-type",
          ["chevron", "caret", "ellipsis", "overflow"],
          "chevron"
        )}">
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  `,
    { notes }
  )
  .add(
    "Simple primary-icon-start and primary-icon-end",
    () => `
    <calcite-split-button
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["s", "m", "l"], "m")}"
        ${boolean("loading", false)}
        ${boolean("disabled", false)}
        primary-icon-start="${select("primary-icon-end", iconNames, iconNames[0])}"
        primary-icon-end="${select("primary-icon-end", iconNames, iconNames[0])}"
        primary-text="${text("primary-text", "Primary Option")}"
        primary-label="${text("primary-label", "Primary Option")}"
        dropdown-label="${text("dropdown-label", "Additional Options")}"
        dropdown-icon-type="${select(
          "dropdown-icon-type",
          ["chevron", "caret", "ellipsis", "overflow"],
          "chevron"
        )}">
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  `,
    { notes }
  )
  .add(
    "RTL",
    () => `
    <div dir='rtl'>
      <calcite-split-button
          color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
          scale="${select("size", ["s", "m", "l"], "m")}"
          ${boolean("loading", false)}
          ${boolean("disabled", false)}
          primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
          primary-text="${text("primary-text", "Primary Option")}"
          dropdown-label="${text("dropdown-label", "Additional Options")}"
          dropdown-icon-type="${select(
            "dropdown-icon-type",
            ["chevron", "caret", "ellipsis", "overflow"],
            "chevron"
          )}">
        <calcite-dropdown-group selection-mode="none">
          <calcite-dropdown-item>Option 2</calcite-dropdown-item>
          <calcite-dropdown-item>Option 3</calcite-dropdown-item>
          <calcite-dropdown-item>Option 4</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-split-button>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-split-button
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["s", "m", "l"], "m")}"
        ${boolean("loading", false)}
        ${boolean("disabled", false)}
        primary-icon-start="${select("primary-icon-start", iconNames, iconNames[0])}"
        primary-text="${text("primary-text", "Primary Option")}"
        dropdown-label="${text("dropdown-label", "Additional Options")}"
        dropdown-icon-type="${select(
          "dropdown-icon-type",
          ["chevron", "caret", "ellipsis", "overflow"],
          "chevron"
        )}">
        theme="dark">
      <calcite-dropdown-group selection-mode="none">
        <calcite-dropdown-item>Option 2</calcite-dropdown-item>
        <calcite-dropdown-item>Option 3</calcite-dropdown-item>
        <calcite-dropdown-item>Option 4</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-split-button>
  `,
    { notes, backgrounds: darkBackground }
  );
