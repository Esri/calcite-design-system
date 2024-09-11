import { html } from "../../support/formatting";

export const progressTokens = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: "",
};

export const progress = html`<calcite-progress text="optional text" type="determinate" value="0.5"></calcite-progress>`;
