import {withKnobs, select} from "@storybook/addon-knobs";
import {
  darkBackground,
  iconNames,
  parseReadme,
  boolean
} from "../../../.storybook/helpers";
import readme from "./readme.md";

const notes = parseReadme(readme);

export default {
  title: "Icon",
  decorators: [withKnobs],
  parameters: { notes }
};

export const simple = () => `
  <calcite-icon
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("size", ["s", "m", "l"], "m")}"
    ${boolean("filled", false)}
  ></calcite-icon>
`;

export const RTL = () => `
  <calcite-icon
    dir="rtl"
    icon="arrowBoldLeft"
    ${boolean("mirror", false)}
  ></calcite-icon>
`;

export const darkMode = () => `
  <calcite-icon
    dir="rtl"
    icon="${select("icon", iconNames, iconNames[0])}"
    theme="dark"
  ></calcite-icon>
`;

darkMode.story = {
  parameters: {
    backgrounds: darkBackground
  }
};
