import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme2 from "../segmented-control-item/readme.md";
import readme1 from "./readme.md";

export default {
  title: "Components/Controls/Radio/Segmented Control",
  parameters: {
    notes: [readme1, readme2],
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-segmented-control
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill"], "solid")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "full"], "auto")}"
    ${boolean("disabled", false)}
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;

export const fullWidthWithIcons = (): string => html`
  <div style="width:33vw;">
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
      My great segmented control
      <calcite-segmented-control
        layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
        appearance="${select("appearance", ["solid", "outline", "outline-fill"], "solid")}"
        width="${select("width", ["auto", "full"], "full")}"
        ${boolean("disabled", false)}
      >
        <calcite-segmented-control-item icon-start="car" value="car" checked>Car</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="plane" value="plane">Plane</calcite-segmented-control-item>
        <calcite-segmented-control-item icon-start="biking" value="bicycle">Bicycle</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-label>
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-segmented-control
    class="calcite-mode-dark"
    dir="rtl"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill"], "solid")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "full"], "auto")}"
    ${boolean("disabled", false)}
  >
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
  </calcite-segmented-control>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-segmented-control disabled>
  <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
  <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
  <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
  <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
</calcite-segmented-control>`;

export const WithIconStartAndEnd = (): string => html` <calcite-segmented-control scale="s">
  <calcite-segmented-control-item icon-start="car" icon-end="car" value="car" checked
    >Car</calcite-segmented-control-item
  >
  <calcite-segmented-control-item icon-start="plane" icon-end="plane" value="plane"
    >Plane</calcite-segmented-control-item
  >
  <calcite-segmented-control-item icon-start="biking" icon-end="biking" value="bicycle"
    >Bicycle</calcite-segmented-control-item
  >
  <calcite-segmented-control-item value="nothing">Nothing</calcite-segmented-control-item>
</calcite-segmented-control>`;
