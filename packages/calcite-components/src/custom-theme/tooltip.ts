import { html } from "../../support/formatting";

export const tooltipTokens = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: "",
};

export const tooltip = html`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`;
