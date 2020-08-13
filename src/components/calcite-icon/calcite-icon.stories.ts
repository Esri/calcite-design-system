import { select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

export default {
  title: "Components/Icon",
  parameters: { notes: readme }
};

export const simple = () => `
  <calcite-icon
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
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

darkMode.parameters = { backgrounds: darkBackground };
