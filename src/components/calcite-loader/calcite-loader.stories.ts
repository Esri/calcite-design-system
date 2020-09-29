import { storiesOf } from "@storybook/html";
import { number, color, select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Loader", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <calcite-loader
      active
      type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("no-padding", false)}
      value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    />
  `
  )
  .add(
    "Inline",
    (): string => `
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
    <calcite-loader
      scale="${select("scale", ["s", "m", "l"], "m")}"
      inline
      active
    /></calcite-loader><span style="margin:0 10px">Next to some text</span>
    </div>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <calcite-loader
      type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("no-padding", false)}
      value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
      active
      theme="dark" />
  `,
    { backgrounds: darkBackground }
  )
  .add(
    "Custom theme",
    (): string => `
    <calcite-loader
    type="${select("type", ["determinate", "indeterminate"], "indeterminate")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("no-padding", false)}
    value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
      style="
        --calcite-loader-spot-light: ${color("spot-light", "#50ba5f")};
        --calcite-loader-spot-dark: ${color("spot-dark", "#1a6324")};
        --calcite-loader-spot: ${color("loader-spot", "#338033")};"
      active
    />
  `
  );
