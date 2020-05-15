import {withKnobs, select, boolean} from "@storybook/addon-knobs";
import {
  darkBackground,
  iconNames,
  parseReadme
} from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

export default {
  title: "Icon",
  decorators: [withKnobs],
  parameters: { notes }
};

export const simple = () =>
  `<calcite-icon icon="${select(
    "icon",
    iconNames,
    iconNames[0]
  )}" scale="${select("size", ["s", "m", "l"], "m")}" filled="${boolean(
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
