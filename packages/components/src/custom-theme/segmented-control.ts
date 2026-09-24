import "../components/label/label";
import "../components/segmented-control-item/segmented-control-item";
import "../components/segmented-control/segmented-control";
import { html } from "../../support/formatting";

export const segmentedControlTokens = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlCornerRadius: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: "",
};

export const segmentedControl = html`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`;
