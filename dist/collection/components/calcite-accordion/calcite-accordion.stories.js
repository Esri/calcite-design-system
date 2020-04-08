import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Accordion", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:300px;max-width:100%">
    <calcite-accordion
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select(
        "selection-mode",
        ["multi", "single", "single-persist"],
        "multi"
      )}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 4"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark Mode",
    () => `
    <div style="width:300px;max-width:100%">
    <calcite-accordion
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select(
        "selection-mode",
        ["multi", "single", "single-persist"],
        "multi"
      )}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 4"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "RTL",
    () => `
      <div style="width:300px;max-width:100%" dir="rtl">
      <calcite-accordion
        theme="light"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
        icon-position="${select("icon-position", ["start", "end"], "end")}"
        selection-mode="${select(
          "selection-mode",
          ["multi", "single", "single-persist"],
          "multi"
        )}"
        icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
      >
      <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
      <calcite-radio-group scale="s">
      <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
      <calcite-radio-group-item value="No">No</calcite-radio-group-item>
      </calcite-radio-group>
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 4"><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      </calcite-accordion>
      </div>
      `,
    { notes }
  );
