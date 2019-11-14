import { storiesOf } from "@storybook/html";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Alerts", module)
  .addDecorator(withKnobs)
  .add(
    "Alert - title, message, link",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", true)}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
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
    "Alert - title, message",
    () => `
    <calcite-alert
    theme="light"
    icon="${boolean("icon", true)}"
    auto-dismiss="${boolean("auto-dismiss", true)}"
    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
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
    auto-dismiss="${boolean("auto-dismiss", true)}"
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"

    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
    <div slot="alert-message">
      That thing you wanted to do didn't work as expected
    </div>
    <calcite-button slot="alert-link" title="my action" appearance="inline">Retry</calcite-button>
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
    auto-dismiss="${boolean("auto-dismiss", true)}"
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"

    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
    <div slot="alert-message">
      That thing you wanted to do didn't work as expected
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
    auto-dismiss="${boolean("auto-dismiss", true)}"
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"

    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
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
    auto-dismiss="${boolean("auto-dismiss", true)}"
    auto-dismiss-duration="${select(
      "auto-dismiss-duration",
      ["fast", "medium", "slow"],
      "medium"
    )}"

    active="${boolean("active", true)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select(
      "color",
      ["green", "red", "yellow", "blue"],
      "blue"
    )}" active>
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
