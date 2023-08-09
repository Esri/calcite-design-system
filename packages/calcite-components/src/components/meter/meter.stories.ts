import { storyFilters, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { modesDarkDefault } from "../../../.storybook/utils";
import { number, select, text } from "@storybook/addon-knobs";

export default {
  title: "Components/Meter",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string =>
  html`<calcite-meter
    label="Meter example"
    min="${number("min", 0)}"
    max="${number("max", 100)}"
    low="${number("low", 0)}"
    high="${number("high", 0)}"
    value="${number("value", 0)}"
    fill-type="${select("fill-type", ["single", "range"], "range")}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill"], "outline-fill")}"
    range-label-type="${select("range-label-type", ["percent", "units"], "percent")}"
    value-label-type="${select("value-label-type", ["percent", "units"], "percent")}"
    unit-label="${text("unit-label", "")}"
    ${boolean("group-separator", false)}
    ${boolean("range-labels", false)}
    ${boolean("value-label", false)}
  ></calcite-meter>`;

export const complex = (): string =>
  html`<calcite-meter
    min="${number("min", 500)}"
    max="${number("max", 10000)}"
    low="${number("low", 2500)}"
    high="${number("high", 7500)}"
    value="${number("value", 1750)}"
    fill-type="${select("fill-type", ["single", "range"], "range")}"
    appearance="${select("appearance", ["solid", "outline", "outline-fill"], "single")}"
    range-label-type="${select("range-label-type", ["percent", "units"], "units")}"
    value-label-type="${select("value-label-type", ["percent", "units"], "percent")}"
    unit-label="${text("unit-label", "credits")}"
    ${boolean("group-separator", true)}
    ${boolean("range-labels", true)}
    ${boolean("value-label", true)}
  ></calcite-meter>`;

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
  value-label-type="units"
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
  value-label-type="units"
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
  value-label-type="units"
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
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`;
