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
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select(
        "selection-mode",
        ["multi", "single", "single-persist"],
        "multi"
      )}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3"><img src="http://placekitten.com/100/200" />
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
      appearance="${select("appearance", ["default", "minimal"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select(
        "selection-mode",
        ["multi", "single", "single-persist"],
        "multi"
      )}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3"><img src="http://placekitten.com/100/200" />
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
        appearance="${select("appearance", ["default", "minimal"], "default")}"
        icon-position="${select("icon-position", ["start", "end"], "end")}"
        selection-mode="${select(
          "selection-mode",
          ["multi", "single", "single-persist"],
          "multi"
        )}"
      >
      <calcite-accordion-item item-title="Accordion Item"><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 2" active><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 3"><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 4"><img src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      </calcite-accordion>
      </div>
      `,
    { notes }
  );
