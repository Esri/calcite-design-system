import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Switch",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-switch
    name="setting"
    value="enabled"
    ${boolean("switched", true)}
    ${boolean("disabled", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

export const WrappingCalciteLabel = (): string => html`
  <calcite-label
    layout="${select("layout", ["inline", "inline-space-between", "default"], "inline")}"
    ${boolean("disabled", false)}
  >
    Enable setting
    <calcite-switch
      name="setting"
      value="enabled"
      ${boolean("switched", true)}
      ${boolean("disabled", false)}
    ></calcite-switch>
  </calcite-label>
`;

WrappingCalciteLabel.story = {
  name: "Wrapping calcite-label"
};

export const DarkMode = (): string => html`
  <calcite-switch
    theme="dark"
    name="setting"
    value="enabled"
    ${boolean("switched", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

DarkMode.story = {
  name: "Dark mode",

  parameters: {
    backgrounds: darkBackground
  }
};

export const Rtl = (): string => html`
  Enable setting
  <calcite-switch
    dir="rtl"
    name="setting"
    value="enabled"
    ${boolean("switched", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

Rtl.story = {
  name: "RTL"
};
