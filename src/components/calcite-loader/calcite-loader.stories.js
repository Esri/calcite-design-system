import { storiesOf } from "@storybook/html";
import {
  withKnobs,
  number,
  color,
  select,
} from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Loader", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-loader
      active
      type="${select(
        "type",
        ["determinate", "indeterminate"],
        "indeterminate"
      )}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("no-padding", false)}
      value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
    />
  `,
    { notes }
  )
  .add(
    "Inline",
    () => `
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
    <calcite-loader
      scale="${select("scale", ["s", "m", "l"], "m")}"
      inline
      active
    /></calcite-loader><span style="margin:0 10px">Next to some text</span>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-loader
      type="${select(
        "type",
        ["determinate", "indeterminate"],
        "indeterminate"
      )}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("no-padding", false)}
      value="${number("value", 0, { range: true, min: 0, max: 100, step: 1 })}"
      active
      theme="dark" />
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Custom theme",
    () => `
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
  `,
    { notes }
  );
