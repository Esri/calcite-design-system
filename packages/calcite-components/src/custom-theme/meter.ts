import { html } from "../../support/formatting";

export const meterTokens = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: "",
};
export const meter = html`
  <calcite-label>
    <calcite-meter
      class="token-theming"
      group-separator
      unit-label="GB"
      value-label
      range-labels
      min="0"
      max="12400"
      low="4600"
      high="7600"
      value="-2200"
      value-label-type="units"
    ></calcite-meter>
  </calcite-label>
`;
