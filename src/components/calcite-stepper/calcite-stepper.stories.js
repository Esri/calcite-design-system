import { storiesOf } from "@storybook/html";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Stepper", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-stepper
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    numbered="${boolean("numbered", true)}"
    icon="${boolean("icon", true)}">
    <calcite-stepper-item item-title="${text(
      "item-1-title",
      "Choose method"
    )}" item-subtitle="${text(
      "item-1-subtitle",
      "Add members without sending invitations"
    )}" complete>
    <calcite-notice active width="full"><div slot="notice-message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
    item-subtitle="${text("item-2-subtitle", "")}"
      complete error>
      <calcite-notice active width="full"><div slot="notice-message">Step 2 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-3-title", "Set member properties")}"
    item-subtitle="${text("item-3-subtitle", "")}"
    active>
    <calcite-notice active width="full"><div slot="notice-message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-4-title", "Confirm and complete")}"
    item-subtitle="${text("item-4-subtitle", "Disabled example")}" disabled>
    <calcite-notice active width="full"><div slot="notice-message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
  `,
    { notes }
  )
  .add(
    "Dark Mode",
    () => `
    <calcite-stepper
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    numbered="${boolean("numbered", true)}"
    icon="${boolean("icon", true)}">
    <calcite-stepper-item item-title="${text(
      "item-1-title",
      "Choose method"
    )}" item-subtitle="${text(
      "item-1-subtitle",
      "Add members without sending invitations"
    )}" complete>
    <calcite-notice active width="full"><div slot="notice-message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
    item-subtitle="${text("item-2-subtitle", "")}"
      complete error>
      <calcite-notice active width="full"><div slot="notice-message">Step 2 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-3-title", "Set member properties")}"
    item-subtitle="${text("item-3-subtitle", "")}"
    active>
    <calcite-notice active width="full"><div slot="notice-message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-4-title", "Confirm and complete")}"
    item-subtitle="${text("item-4-subtitle", "Disabled example")}" disabled>
    <calcite-notice active width="full"><div slot="notice-message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
      <div dir="rtl">
      <calcite-stepper
      layout="${select(
        "layout",
        ["horizontal", "vertical"],
        "horizontal"
      )}"
      numbered="${boolean("numbered", true)}"
      icon="${boolean("icon", true)}">
      <calcite-stepper-item item-title="${text(
        "item-1-title",
        "Choose method"
      )}" item-subtitle="${text(
      "item-1-subtitle",
      "Add members without sending invitations"
    )}" complete>
      <calcite-notice active width="full"><div slot="notice-message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
      <calcite-stepper-item
        item-title="${text("item-2-title", "Compile member list")}"
    item-subtitle="${text("item-3-2ubtitle", "")}"
        complete error>
          <calcite-notice active width="full"><div slot="notice-message">Step 2 Content Goes Here</div></calcite-notice>
        </calcite-stepper-item>
      <calcite-stepper-item
      item-title="${text("item-3-title", "Set member properties")}"
      item-subtitle="${text("item-3-subtitle", "")}"
      active>
        <calcite-notice active width="full"><div slot="notice-message">Step 3 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
      item-title="${text("item-4-title", "Confirm and complete")}"
      item-subtitle="${text("item-4-subtitle", "Disabled example")}" disabled>
        <calcite-notice active width="full"><div slot="notice-message">Step 4 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
    </div>
      `,
    { notes }
  );
