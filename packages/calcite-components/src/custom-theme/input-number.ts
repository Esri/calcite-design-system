import { html } from "../../support/formatting";

export const inputNumberTokens = {
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputNumberBackgroundColor: "",
  calciteInputNumberBorderColor: "",
  calciteInputNumberCornerRadius: "",
  calciteInputNumberHeight: "",
  calciteInputNumberPlaceholderTextColor: "",
  calciteInputNumberTextColor: "",
  calciteInputNumberTextColorFocus: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSize: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSize: "",
  calciteInputSuffixTextColor: "",
};

export const inputNumber = html`<calcite-input-number
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
  value="10"
  clearable
  loading
></calcite-input-number>`;
