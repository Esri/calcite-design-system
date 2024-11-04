import { html } from "../../support/formatting";

export const switchTokens = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: "",
};

export const calciteSwitch = html`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`;
