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
    <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
    theme="light"
    icon="${boolean("icon", true)}"
    active="${boolean("active", true)}"
    dismissible="${boolean("dismissible", false)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="notice-title">Something failed</div>
    <div slot="notice-message">
      That thing you wanted to do didn't work as expected
    </div>
      <calcite-button slot="notice-link" title="my action" appearance="inline">Retry</calcite-button>
    </calcite-notice>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark Mode",
    () => `
    <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
    theme="dark"
    icon="${boolean("icon", true)}"
    active="${boolean("active", true)}"
    dismissible="${boolean("dismissible", false)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="notice-title">Something failed</div>
    <div slot="notice-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="notice-link" title="my action" appearance="inline">Retry</calcite-button>
    </calcite-notice>
    </div>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
      <div dir="rtl" style="width:600px;max-width:100%;text-align:center;">
      <calcite-notice
      theme="light"
      icon="${boolean("icon", true)}"
      active="${boolean("active", true)}"
      dismissible="${boolean("dismissible", false)}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
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
