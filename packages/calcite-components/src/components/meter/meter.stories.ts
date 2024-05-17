import { html } from "../../../support/formatting";
import { modesDarkDefault } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { fillType, appearance, labelType } = ATTRIBUTES;

interface MeterArgs {
  min: number;
  max: number;
  low: number;
  high: number;
  value: number;
  fillType: string;
  appearance: string;
  rangeLabelType: string;
  valueLabelType: string;
  unitLabel: string;
  groupSeparator: boolean;
  rangeLabels: boolean;
  valueLabel: boolean;
}

export default {
  title: "Components/Meter",
  args: {
    min: 0,
    max: 100,
    low: 0,
    high: 0,
    value: 0,
    fillType: fillType.defaultValue,
    appearance: appearance.values[2],
    rangeLabelType: labelType.defaultValue,
    valueLabelType: labelType.defaultValue,
    unitLabel: "",
    groupSeparator: false,
    rangeLabels: false,
    valueLabel: false,
  },
  argTypes: {
    fillType: {
      options: fillType.values,
      control: { type: "select" },
    },
    appearance: {
      options: appearance.values.filter((option) => option !== "transparent"),
      control: { type: "select" },
    },
    rangeLabelType: {
      options: labelType.values,
      control: { type: "select" },
    },
    valueLabelType: {
      options: labelType.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: MeterArgs): string =>
  html`<calcite-meter
    label="Meter example"
    min="${args.min}"
    max="${args.max}"
    low="${args.low}"
    high="${args.high}"
    value="${args.value}"
    fill-type="${args.fillType}"
    appearance="${args.appearance}"
    range-label-type="${args.rangeLabelType}"
    value-label-type="${args.valueLabelType}"
    unit-label="${args.unitLabel}"
    ${args.groupSeparator ? "group-separator" : ""}
    ${args.rangeLabels ? "range-labels" : ""}
    ${args.valueLabel ? "value-label" : ""}
  ></calcite-meter>`;

export const complex = (): string =>
  html`<calcite-meter
    min="500"
    max="10000"
    low="2500"
    high="7500"
    value="1750"
    fill-type="range"
    appearance="single"
    range-label-type="units"
    value-label-type="percent"
    unit-label="credits"
    group-separator
    range-labels
    value-label
  ></calcite-meter>`;

export const swapLabelPlacementWhenCloseToMax_TestOnly = (): string =>
  html`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`;

export const swapLabelPlacementWhenCloseToMaxRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="30"
    high="90"
    value="10"
  ></calcite-meter>`;

export const swapLabelPlacementWhenLowCloseToHigh_TestOnly = (): string =>
  html`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`;

export const swapLabelPlacementWhenLowCloseToHighRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="20"
    high="25"
    value="5"
  ></calcite-meter>`;

export const valueDoesNotPositionBelowMin_TestOnly = (): string =>
  html`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`;

export const valueDoesNotPositionBelowMinRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="-100"
    min="0"
    max="100"
  ></calcite-meter>`;

export const valueDoesNotPositionAboveMax_TestOnly = (): string =>
  html`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`;

export const valueDoesNotPositionAboveMaxRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="200"
    min="0"
    max="100"
  ></calcite-meter>`;

export const hideOverlappingLabel_TestOnly = (): string =>
  html`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`;

export const hideOverlappingLabelRTL_TestOnly = (): string =>
  html`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`;

export const hideOverlappingLabelUnits_TestOnly = (): string =>
  html`<calcite-meter
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

export const hideOverlappingLabelUnitsRTL_TestOnly = (): string =>
  html`<calcite-meter
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

export const complexPercent_TestOnly = (): string =>
  html`<calcite-meter
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`;

export const complexUnit_TestOnly = (): string =>
  html`<calcite-meter
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

export const darkModeRTL_TestOnly = (): string =>
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const complexPercentRTL_TestOnly = (): string =>
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

export const complexUnitRTL_TestOnly = (): string =>
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
