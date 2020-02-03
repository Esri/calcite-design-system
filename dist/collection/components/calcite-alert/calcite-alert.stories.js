import { storiesOf } from "@storybook/html";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Alert", module)
  .addDecorator(withKnobs)
  .add(
    "Alert - title, message, link",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="alert-title">Here's a general bit of information</div></div>
    <div slot="alert-message">
      Some kind of contextually relevant content
    </div>
    <calcite-button slot="alert-link" title="my action" appearance="inline">Take action</calcite-button>
  </calcite-alert>
  `,
    { notes }
  )
  .add(
    "Alert - title, message",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "red")}">
    <div slot="alert-title">Something failed</div>
    <div slot="alert-message">
      That thing you wanted to do didn't work as expected
    </div>
  </calcite-alert>
  `,
    { notes }
  )
  .add(
    "Alert - message, link",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "green")}">
    <div slot="alert-message">
     Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer
    </div>
    <calcite-button slot="alert-link" title="my action" appearance="inline">View layer</calcite-button>
  </calcite-alert>
  `,
    { notes }
  )
  .add(
    "Alert - message",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "yellow")}">
    <div slot="alert-message">
      Network connection interruption detected
    </div>
  </calcite-alert>
  `,
    { notes }
  )
  .add(
    "Alert - dark mode",
    () => `
    <calcite-alert
    theme="dark"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "red")}">
    <div slot="alert-title">Something failed</div>
    <div slot="alert-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="alert-link" title="my action" appearance="inline">Retry</calcite-button>
  </calcite-alert>
  `,
    { notes }
  )
  .add(
    "Alert - RTL",
    () => `
    <div dir="rtl">
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", false)}"
    auto-dismiss-duration="${select("auto-dismiss-duration", [
      "slow",
      "medium",
      "fast"
    ])};
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
    <div slot="alert-title">Something failed</div>
    <div slot="alert-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="alert-link" title="my action" appearance="inline">Retry</calcite-button>
  </calcite-alert>
  </div>
  `,
    { notes }
  );
