import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { modesDarkDefault } from "../../../.storybook/utils";

export default {
  title: "Components/Meter",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`<calcite-meter min="0" max="100" low="25" high="75"></calcite-meter>`;

export const labels = (): string =>
  html`<calcite-meter min="0" max="100" low="25" high="75" value-label range-labels></calcite-meter>`;

export const meterSwapLabelPlacementWhenCloseToMax_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  min="0"
  max="100"
  low="30"
  high="90"
  value="10"
></calcite-meter>`;

export const meterSwapLabelPlacementWhenCloseToMaxRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  min="0"
  max="100"
  low="30"
  high="90"
  value="10"
></calcite-meter>`;

export const meterSwapLabelPlacementWhenLowCloseToHigh_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  min="0"
  max="100"
  low="20"
  high="25"
  value="5"
></calcite-meter>`;

export const meterSwapLabelPlacementWhenLowCloseToHighRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  min="0"
  max="100"
  low="20"
  high="25"
  value="5"
></calcite-meter>`;

export const meterValueDoesNotPositionBelowMin_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  low="25"
  high="75"
  value="-100"
  min="0"
  max="100"
></calcite-meter>`;

export const meterValueDoesNotPositionBelowMinRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  low="25"
  high="75"
  value="-100"
  min="0"
  max="100"
></calcite-meter>`;

export const meterValueDoesNotPositionAboveMax_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  low="25"
  high="75"
  value="200"
  min="0"
  max="100"
></calcite-meter>`;

export const meterValueDoesNotPositionAboveMaxRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  low="25"
  high="75"
  value="200"
  min="0"
  max="100"
></calcite-meter>`;

export const meterHideOverlappingLabel_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  low="2"
  high="98"
  value="0"
  min="0"
  max="100"
></calcite-meter>`;

export const meterHideOverlappingLabelRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  low="2"
  high="98"
  value="0"
  min="0"
  max="100"
></calcite-meter>`;

export const meterHideOverlappingLabelUnits_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  label-type="units"
  unit-label="credits"
  low="2"
  high="98"
  value="0"
  min="0"
  max="100"
></calcite-meter>`;

export const meterHideOverlappingLabelUnitsRTL_TestOnly = (): string => html`<calcite-meter
  dir="rtl"
  value-label
  range-labels
  label-type="units"
  unit-label="credits"
  low="2"
  high="98"
  value="0"
  min="0"
  max="100"
></calcite-meter>`;

export const meterComplexPercent_TestOnly = (): string => html`<calcite-meter
  value-label
  range-labels
  min="0"
  max="12400"
  low="4600"
  high="7600"
  value="2200"
></calcite-meter>`;

export const meterComplexUnit_TestOnly = (): string => html`<calcite-meter
  unit-label="GB"
  value-label
  range-labels
  label-type="units"
  min="0"
  max="12400"
  low="4600"
  high="7600"
  value="2200"
></calcite-meter>`;

export const meterDarkModeRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    class="calcite-mode-dark"
    min="0"
    max="100"
    low="25"
    high="75"
    value-label
    range-labels
  ></calcite-meter>`;

meterDarkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const meterComplexPercentRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`;

export const meterComplexUnitRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    unit-label="GB"
    value-label
    range-labels
    label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`;
