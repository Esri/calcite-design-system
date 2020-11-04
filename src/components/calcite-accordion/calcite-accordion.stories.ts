import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../calcite-accordion-item/readme.md";

storiesOf("Components/Accordion", module)
  .addParameters({ notes: [readme1, readme2] })
  .add(
    "Simple",
    (): string => `
    <div style="width:300px;max-width:100%">
    <calcite-accordion
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select("selection-mode", ["multi", "single", "single-persist"], "multi")}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 4"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
  `
  )
  .add(
    "With Icons",
    (): string => `
    <div style="width:300px;max-width:100%">
    <calcite-accordion
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select("selection-mode", ["multi", "single", "single-persist"], "multi")}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item icon="banana" item-title="Accordion Item"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item icon="car" item-title="Accordion Item 2" active><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item icon="map" item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item icon="plane" item-title="Accordion Item 4"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
  `
  )
  .add(
    "Dark Mode",
    (): string => `
    <div style="width:300px;max-width:100%">
    <calcite-accordion
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select("selection-mode", ["multi", "single", "single-persist"], "multi")}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item item-title="Accordion Item"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 2" active><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item item-title="Accordion Item 4"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
    `,
    { backgrounds: darkBackground }
  )
  .add(
    "RTL",
    (): string => `
      <div style="width:300px;max-width:100%" dir="rtl">
      <calcite-accordion
        theme="light"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
        icon-position="${select("icon-position", ["start", "end"], "end")}"
        selection-mode="${select("selection-mode", ["multi", "single", "single-persist"], "multi")}"
        icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
      >
      <calcite-accordion-item item-title="Accordion Item"><img alt="" src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 2" active><img alt="" src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 3" item-subtitle="Something short about this item">
      <calcite-radio-group scale="s">
      <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
      <calcite-radio-group-item value="No">No</calcite-radio-group-item>
      </calcite-radio-group>
      </calcite-accordion-item>
      <calcite-accordion-item item-title="Accordion Item 4"><img alt="" src="http://placekitten.com/100/200" />
      </calcite-accordion-item>
      </calcite-accordion>
      </div>
      `
  )
  .add(
    "RTL With Icons",
    (): string => `
    <div style="width:300px;max-width:100%" dir="rtl">
    <calcite-accordion
      theme="light"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["default", "minimal", "transparent"], "default")}"
      icon-position="${select("icon-position", ["start", "end"], "end")}"
      selection-mode="${select("selection-mode", ["multi", "single", "single-persist"], "multi")}"
      icon-type="${select("icon-type", ["chevron", "caret", "plus-minus"], "chevron")}"
    >
    <calcite-accordion-item icon="banana" item-title="Accordion Item"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item icon="car" item-title="Accordion Item 2" active><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    <calcite-accordion-item icon="map" item-title="Accordion Item 3" item-subtitle="Something short about this item">
    <calcite-radio-group scale="s">
    <calcite-radio-group-item value="Yes" checked>Yes</calcite-radio-group-item>
    <calcite-radio-group-item value="No">No</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-accordion-item>
    <calcite-accordion-item icon="plane" item-title="Accordion Item 4"><img alt="" src="http://placekitten.com/100/200" />
    </calcite-accordion-item>
    </calcite-accordion>
    </div>
  `
  );
