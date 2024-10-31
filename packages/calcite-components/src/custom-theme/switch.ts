import { html } from "../../support/formatting";

export const switchTokens = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBackgroundColorHover: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleBackgroundColorHover: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: "",
  calciteSwitchHandleCornerRadius: "",
};

export const calciteSwitch = html`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`;
