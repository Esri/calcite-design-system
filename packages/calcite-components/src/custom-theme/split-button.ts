import { html } from "../../support/formatting";

export const splitButtonTokens = {
  calciteSplitButtonBackgroundColor: "",
  calciteSplitButtonBorderColor: "",
  calciteSplitButtonCornerRadius: "",
  calciteSplitButtonIconColor: "",
  calciteSplitButtonLoaderColor: "",
  calciteSplitButtonTextColor: "",
  calciteSplitButtonShadow: "",
  calciteSplitButtonDividerColor: "",
  calciteSplitButtonDividerBorderColor: "",
  calciteSplitButtonDropdownWidth: "",
  calciteSplitButtonDropdownBackgroundColor: "",
};

export const splitButton = html` <calcite-split-button primary-text="Button">
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`;
