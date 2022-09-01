import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme1 from "./readme.md";
import readme2 from "../radio-group-item/readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/Radio/Radio Group",

  parameters: {
    notes: [readme1, readme2]
  }
};

export const simple = (): string => html`
  <calcite-radio-group
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    appearance="${select("appearance", ["solid", "outline"], "solid")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "full"], "auto")}"
    ${boolean("disabled", false)}
  >
    <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
    <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
    <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
    <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
  </calcite-radio-group>
`;

export const wrappingCalciteLabel = (): string => html`
  <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
    My great radio group
    <calcite-radio-group
      layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
      appearance="${select("appearance", ["solid", "outline"], "solid")}"
      width="${select("width", ["auto", "full"], "auto")}"
      ${boolean("disabled", false)}
    >
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
    </calcite-radio-group>
  </calcite-label>
`;

export const fullWidthWithIcons = (): string => html`
  <div style="width:33vw;">
    <calcite-label scale="${select("scale", ["s", "m", "l"], "m")}">
      My great radio group
      <calcite-radio-group
        layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
        appearance="${select("appearance", ["solid", "outline"], "solid")}"
        width="${select("width", ["auto", "full"], "full")}"
        ${boolean("disabled", false)}
      >
        <calcite-radio-group-item icon="car" value="car" checked>Car</calcite-radio-group-item>
        <calcite-radio-group-item icon="plane" value="plane">Plane</calcite-radio-group-item>
        <calcite-radio-group-item icon="biking" value="bicycle">Bicycle</calcite-radio-group-item>
      </calcite-radio-group>
    </calcite-label>
  </div>
`;

export const darkThemeRTL = (): string => html`
  <calcite-radio-group
    class="calcite-theme-dark"
    dir="rtl"
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    appearance="${select("appearance", ["solid", "outline"], "solid")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["auto", "full"], "auto")}"
    ${boolean("disabled", false)}
  >
    <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
    <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
    <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
    <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
  </calcite-radio-group>
`;

darkThemeRTL.parameters = { themes: themesDarkDefault };

export const disabled = (): string => html`<calcite-radio-group disabled>
  <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
  <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
  <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
  <calcite-radio-group-item value="vue">Vue</calcite-radio-group-item>
</calcite-radio-group>`;
