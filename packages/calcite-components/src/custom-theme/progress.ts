import { html } from "../../support/formatting";

export const progressTokens = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: "",
};

export const progress = html`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`;
