import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
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
    ${boolean("icon", true)}
    ${boolean("active", true)}
    ${boolean("dismissible", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="notice-title">Your settings area has changed</div>
    <div slot="notice-message">
      Look around and let us know what you think
    </div>
      <calcite-link slot="notice-link" title="my action">Learn more</calcite-link>
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
    ${boolean("icon", true)}
    ${boolean("active", true)}
    ${boolean("dismissible", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "half", "full"], "auto")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "red")}">
    <div slot="notice-title">This is a destructive action</div>
    <div slot="notice-message">
     Be sure you know what you are doin, folks.
    </div>
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
      ${boolean("icon", true)}
      ${boolean("active", true)}
      ${boolean("dismissible", true)}
      width="${select("width", ["auto", "half", "full"], "auto")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      color="${select(
        "color",
        ["green", "red", "yellow", "blue"],
        "blue"
      )}" active>
      <div slot="notice-title">Your settings area has changed</div>
      <div slot="notice-message">
        Look around and let us know what you think
      </div>
        <calcite-link slot="notice-link" title="my action">Learn more</calcite-link>
      </calcite-notice>
      </div>
      `,
    { notes }
  );
