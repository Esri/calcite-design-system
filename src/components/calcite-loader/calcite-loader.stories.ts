import { number, color, select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
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

// export const NoPadding = (): string => html`
//   <div style="border: 1px solid rgb(192,192,192, 0.5); width: 100px">
//     <calcite-loader
//       active
//       type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
//       scale="${select("scale", ["s", "m", "l"], "m")}"
//       ${boolean("no-padding", true)}
//       value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
//     />
//   </div>
// `;

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
    class="calcite-theme-dark"
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    active
    class="calcite-theme-dark"
  />
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { themes: themesDarkDefault }
};

export const CustomTheme = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    style="
    --calcite-ui-brand: ${color("calcite-ui-blue-1", "#50ba5f")};
    --calcite-ui-brand-hover: ${color("calcite-ui-blue-2", "#1a6324")};
    --calcite-ui-brand-press: ${color("calcite-ui-blue-3", "#338033")};"
    active
  />
`;

CustomTheme.story = {
  name: "Custom theme"
};
