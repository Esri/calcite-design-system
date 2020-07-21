import { storiesOf } from "@storybook/html";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme1 from "./readme.md";
import readme2 from "../calcite-stepper-item/readme.md";

const notes1 = parseReadme(readme1);
const notes2 = parseReadme(readme2);
const notes = notes1.concat(`\n${notes2}`);

storiesOf("Stepper", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-stepper
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}"
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
    "No content",
    () => `
    <calcite-stepper
    scale="${select("scale", ["s", "m", "l"], "m")}"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("numbered", true)}
    ${boolean("icon", true)}"
    <calcite-stepper-item item-title="${text(
      "item-1-title",
      "Choose method"
    )}" item-subtitle="${text(
      "item-1-subtitle",
      "Add members without sending invitations"
    )}" complete>

    </calcite-stepper-item>
    <calcite-stepper-item
      item-title="${text("item-2-title", "Compile member list")}"
    item-subtitle="${text("item-2-subtitle", "")}"
      complete error>
      </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-3-title", "Set member properties")}"
    item-subtitle="${text("item-3-subtitle", "")}"
    active>
    </calcite-stepper-item>
    <calcite-stepper-item
    item-title="${text("item-4-title", "Confirm and complete")}"
    item-subtitle="${text("item-4-subtitle", "Disabled example")}" disabled>
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
    ${boolean("numbered", true)}
    ${boolean("icon", true)}"
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
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      ${boolean("numbered", true)}
      ${boolean("icon", true)}"
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
