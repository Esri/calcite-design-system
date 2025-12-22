import { html } from "../../../support/formatting";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Meter } from "./meter";

const { fillType, appearance, labelType } = ATTRIBUTES;

type MeterStoryArgs = Pick<
  Meter,
  | "min"
  | "max"
  | "low"
  | "high"
  | "value"
  | "fillType"
  | "appearance"
  | "rangeLabelType"
  | "valueLabelType"
  | "unitLabel"
  | "groupSeparator"
  | "rangeLabels"
  | "valueLabel"
>;

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

export const Simple = (args: MeterStoryArgs): string =>
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
    ${boolean("group-separator", args.groupSeparator)}
    ${boolean("range-labels", args.rangeLabels)}
    ${boolean("value-label", args.valueLabel)}
  ></calcite-meter>`;

export const Complex = (): string =>
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

export const SwapLabelPlacementWhenCloseToMax = (): string =>
  html`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`;

export const SwapLabelPlacementWhenCloseToMaxRTL = (): string =>
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

export const SwapLabelPlacementWhenLowCloseToHigh = (): string =>
  html`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`;

export const SwapLabelPlacementWhenLowCloseToHighRTL = (): string =>
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

export const ValueDoesNotPositionBelowMin = (): string =>
  html`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`;

export const ValueDoesNotPositionBelowMinRTL = (): string =>
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

export const ValueDoesNotPositionAboveMax = (): string =>
  html`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`;

export const ValueDoesNotPositionAboveMaxRTL = (): string =>
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

export const HideOverlappingLabel = (): string =>
  html`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`;

export const HideOverlappingLabelRTL = (): string =>
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

export const HideOverlappingLabelUnits = (): string =>
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

export const HideOverlappingLabelUnitsRTL = (): string =>
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

export const ComplexPercent = (): string =>
  html`<calcite-meter
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`;

export const ComplexUnit = (): string =>
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

export const DarkModeRTL = (): string =>
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

DarkModeRTL.parameters = { themes: modesDarkDefault };

export const ComplexPercentRTL = (): string =>
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

export const ComplexUnitRTL = (): string =>
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
