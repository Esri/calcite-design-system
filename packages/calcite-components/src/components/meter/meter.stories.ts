import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Meter",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`<calcite-meter min="0" max="100" low="25" high="75" />`;

export const labels = (): string =>
  html`<calcite-meter min="0" max="100" low="25" high="75" value-label range-labels />`;

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
  />`;

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
