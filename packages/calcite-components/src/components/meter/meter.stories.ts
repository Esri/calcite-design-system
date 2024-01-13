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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

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

export const theming_TestOnly = (): string => html`
    <calcite-meter
      unit-label="GB"
      value-label
      range-labels
      value-label-type="units"
      min="0"
      max="12400"
      low="4600"
      high="7600"
      value="2200"
      style="--calcite-meter-background-color: rgb(208, 190, 230);
      --calcite-meter-border-color: rgb(184, 48, 153);
      --calcite-meter-box-shadow: var(--calcite-shadow-sm);
      --calcite-meter-corner-radius: 0px;
      --calcite-meter-fill-color: rgb(174, 69, 174);
      --calcite-meter-range-text-color: rgb(28, 110, 164);
      --calcite-meter-unit-text-color: pink;
      --calcite-meter-value-text-color: purple;
    ></calcite-meter>
  `;
