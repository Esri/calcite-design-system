import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import readme from "./readme.md";

export default {
  title: "Components/Checkbox",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <label>
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    Text for the checkbox
  </label>
`;

export const DarkMode = (): string => html`
  <label>
    <calcite-checkbox
      theme="dark"
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      >Text for the checkbox</calcite-checkbox
    >
  </label>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
