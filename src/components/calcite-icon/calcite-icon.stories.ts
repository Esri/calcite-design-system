import { select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Icon",
  parameters: { notes: readme }
};

const sampleIcon = iconNames.find((item) => item === "arrowRight");

export const simple = (): string => html`
  <calcite-icon
    icon="${select("icon", iconNames, sampleIcon)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-icon>
`;

export const RTL = (): string => html`
  <calcite-icon dir="rtl" icon="${select("icon", iconNames, sampleIcon)}" ${boolean("flip-rtl", true)}></calcite-icon>
`;

export const darkMode = (): string => html`
  <style>
    :root {
      /* icon svg inherits the current font color */
      color: var(--calcite-ui-warning);
    }
  </style>
  <calcite-icon icon="${select("icon", iconNames, sampleIcon)}" theme="dark"></calcite-icon>
`;

darkMode.parameters = { backgrounds: darkBackground };
