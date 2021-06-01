import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Radio/Radio Button Group",

  parameters: {
    notes: readme
  }
};

export const LightTheme = (): string => html`
  <calcite-radio-button-group
    name="simple"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;

export const DarkTheme = (): string => html`
  <calcite-radio-button-group
    theme="dark"
    name="dark"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};

export const RTL = (): string => html`
  <calcite-radio-button-group
    dir="rtl"
    name="simple"
    ${boolean("disabled", false)}
    ${boolean("hidden", false)}
    layout="${select("layout", ["horizontal", "vertical"], "horizontal")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    <calcite-label layout="inline">
      <calcite-radio-button value="react"></calcite-radio-button>
      React
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="ember"></calcite-radio-button>
      Ember
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="angular"></calcite-radio-button>
      Angular
    </calcite-label>
    <calcite-label layout="inline">
      <calcite-radio-button value="vue"></calcite-radio-button>
      Vue
    </calcite-label>
  </calcite-radio-button-group>
`;
