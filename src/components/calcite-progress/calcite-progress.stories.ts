import { storiesOf } from "@storybook/html";
import { select, number, text, boolean } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Progress", module)
  .addParameters({ notes: readme })
  .add(
    "Determinate",
    () => `
    <calcite-progress
      type="determinate"
      value="${number("value", 0, { range: true, min: 0, max: 1, step: 0.01 })}"
      text="${text("text", "")}"
    ></calcite-progress>
  `
  )
  .add(
    "Indeterminate",
    () => `
    <calcite-progress
      reversed=${boolean("reversed", false)}
      type="indeterminate"
      text="${text("text", "")}"
    ></calcite-progress>
  `
  )
  .add(
    "Dark mode",
    () => `
    <calcite-progress
      theme="dark"
      type="${select("type", { determinate: "determinate", indeterminate: "indeterminate" }, "indeterminate")}"
      value="${number("value", 0, { range: true, min: 0, max: 1, step: 0.01 })}"
      text="${text("text", "")}"
    ></calcite-progress>
  `,
    { backgrounds: darkBackground }
  );
