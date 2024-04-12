import { color, number, select } from "../../../.storybook/fake-knobs";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Loader",
};

export const simple_TestOnly = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
  />
`;

export const inline_TestOnly = (): string => html`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="${select("scale", ["s", "m", "l"], "m")}"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`;

export const customTheme_TestOnly = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    style="
    --calcite-color-brand: ${color("--calcite-color-brand", "#50ba5f")};
    --calcite-color-brand-hover: ${color("--calcite-color-brand-hover", "#1a6324")};
    --calcite-color-brand-press: ${color("--calcite-color-brand-press", "#338033")};"
  />
`;
