import { select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Icon",
  parameters: { notes: readme }
};

export const simple = (): string => html`
  <calcite-icon
    icon="${select("icon", iconNames, iconNames[0])}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-icon>
`;

export const RTL = (): string => html`
  <calcite-icon
    dir="rtl"
    icon="${select("icon", iconNames, iconNames[0])}"
    ${boolean("flip-rtl", false)}
  ></calcite-icon>
`;

export const darkMode = (): string => html`
  <calcite-icon dir="rtl" icon="${select("icon", iconNames, iconNames[0])}" theme="dark"></calcite-icon>
`;

darkMode.parameters = { backgrounds: darkBackground };
