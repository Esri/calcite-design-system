import { html } from "../../support/formatting";

export const radioButtonGroupTokens = {
  calciteRadioButtonGroupGap: "",
  calciteRadioButtonInputMessageSpacing: "",
};

export const radioButtonGroup = html`<calcite-radio-button-group>
  <calcite-label layout="inline">
    <calcite-radio-button value="one" checked></calcite-radio-button>
    One
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button value="two"></calcite-radio-button>
    Two
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button value="three"></calcite-radio-button>
    Three
  </calcite-label>
</calcite-radio-button-group>`;
