import { number, color, select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Loader",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-loader
    active
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
  />
`;

export const Inline = (): string => html`
<div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
<calcite-loader
  scale="${select("scale", ["s", "m", "l"], "m")}"
  inline
  active
/></calcite-loader><span style="margin:0 10px">Next to some text</span>
</div>
`;

export const DarkMode = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    active
    theme="dark"
  />
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const CustomTheme = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    style="
    --calcite-ui-blue-1: ${color("calcite-ui-blue-1", "#50ba5f")};
    --calcite-ui-blue-2: ${color("calcite-ui-blue-2", "#1a6324")};
    --calcite-ui-blue-3: ${color("calcite-ui-blue-3", "#338033")};"
    active
  />
`;

CustomTheme.story = {
  name: "Custom theme"
};
