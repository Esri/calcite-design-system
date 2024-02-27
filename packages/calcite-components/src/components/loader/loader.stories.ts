import { color, number, select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Loader",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple_NoTest = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
  />
`;

simple_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const simple_TestOnly = (): string => html`
  <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
  />
`;

export const inline_NoTest = (): string => html`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="${select("scale", ["s", "m", "l"], "m")}"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`;

inline_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const inline_TestOnly = (): string => html`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="${select("scale", ["s", "m", "l"], "m")}"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`;

export const customTheme_NoTest = (): string => html`
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

customTheme_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

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
