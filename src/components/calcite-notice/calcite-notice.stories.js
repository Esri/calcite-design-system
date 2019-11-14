import { storiesOf } from "@storybook/html";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Notice", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-notice
    theme="light"
    icon="${boolean("icon", true)}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="notice-title">Something failed</div>
    <div slot="notice-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="notice-link" title="my action" appearance="inline">Retry</calcite-button>
  </calcite-notice>
  `,
    { notes }
  )
  .add(
    "Dark Mode",
    () => `
    <calcite-notice
    theme="dark"
    icon="${boolean("icon", true)}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="notice-title">Something failed</div>
    <div slot="notice-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="notice-link" title="my action" appearance="inline">Retry</calcite-button>
  </calcite-notice>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
      <div dir="rtl">
      <calcite-notice
      theme="light"
      icon="${boolean("icon", true)}"
      active="${boolean("active", true)}"

      scale="${select("scale", ["s", "m", "l"], "m")}"
      color="${select(
        "color",
        ["green", "red", "yellow", "blue"],
        "blue"
      )}" active>
      <div slot="notice-title">Something failed</div>
      <div slot="notice-message">
        That thing you wanted to do didn't work as expected
      </div>
      <calcite-button slot="notice-link" title="my action" appearance="inline">Retry</calcite-button>
    </calcite-notice>
      </div>
      `,
    { notes }
  );
