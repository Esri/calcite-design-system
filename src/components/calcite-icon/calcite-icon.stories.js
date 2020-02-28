import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import * as icons from "../../../node_modules/@esri/calcite-ui-icons";
import readme from "./readme.md";
const notes = parseReadme(readme);

// we can get all unique icon names from all size 16 non-filled icons.
const iconNames = Object.keys(icons)
  .filter(iconName => iconName.endsWith("16"))
  .map(iconName => iconName.replace("16", ""));

export default {
  title: "Icon",
  decorators: [withKnobs],
  parameters: { notes }
};

export const simple = () =>
  `<calcite-icon icon="sdafasd" scale="${select("size", ["s", "m", "l"], "m")}" filled="${boolean(
    "filled",
    false
  )}"></calcite-icon>`;

export const RTL = () =>
  `<calcite-icon dir="rtl" icon="arrowBoldLeft" mirror="${boolean(
    "mirror",
    false
  )}"></calcite-icon>`;

export const darkMode = () =>
  `<calcite-icon dir="rtl" icon="${select(
    "icon",
    iconNames,
    iconNames[0]
  )}" theme="dark"></calcite-icon>`;

darkMode.story = {
  parameters: {
    backgrounds: darkBackground
  }
};
