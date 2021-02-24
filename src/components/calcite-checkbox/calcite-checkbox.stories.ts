import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Checkbox",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-checkbox
    ${boolean("checked", true)}
    ${boolean("disabled", false)}
    ${boolean("indeterminate", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >Text for the checkbox</calcite-checkbox
  >
`;

export const DarkMode = (): string => html`
  <calcite-checkbox
    theme="dark"
    ${boolean("checked", true)}
    ${boolean("disabled", false)}
    ${boolean("indeterminate", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    >Text for the checkbox</calcite-checkbox
  >
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
