import { storiesOf } from "@storybook/html";
import { select, number, text, boolean } from "@storybook/addon-knobs";
import { parseReadme } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Components/Progress", module)
  .add(
    "Determinate",
    () => `
    <calcite-progress
      type="determinate"
      value="${number("value", 0, { range: true, min: 0, max: 1, step: 0.01 })}"
      text="${text("text", "")}"
    ></calcite-progress>
  `,
    { notes }
  )
  .add(
    "Indeterminate",
    () => `
    <calcite-progress
      reversed=${boolean("reversed", false)}
      type="indeterminate"
      text="${text("text", "")}"
    ></calcite-progress>
  `,
    { notes }
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
    { notes, backgrounds: darkBackground }
  );
