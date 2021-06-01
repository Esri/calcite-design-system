import { select, text } from "@storybook/addon-knobs";
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
  <calcite-label layout="inline">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;
export const DarkMode = (): string => html`
  <calcite-label layout="inline" theme="dark">
    <calcite-checkbox
      theme="dark"
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const RTL = (): string => html`
  <calcite-label layout="inline" dir="rtl">
    <calcite-checkbox
      ${boolean("checked", true)}
      ${boolean("disabled", false)}
      ${boolean("indeterminate", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
    ></calcite-checkbox>
    ${text("label", "Checkbox")}
  </calcite-label>
`;
