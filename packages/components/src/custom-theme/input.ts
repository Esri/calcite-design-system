import "../components/input/input";
import { html } from "../../support/formatting";

export const inputTokens = {
  calciteInputPrefixSize: "",
  calciteInputSuffixSize: "",
  calciteInputBackgroundColor: "",
  calciteInputBorderColor: "",
  calciteInputCornerRadius: "",
  calciteInputShadow: "",
  calciteInputIconColor: "",
  calciteInputTextColor: "",
  calciteInputPlaceholderTextColor: "",
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixTextColor: "",
  calciteInputInlineEditBackgroundColorHover: "",
  calciteInputInlineEditControlBackgroundColor: "",
  calciteInputInlineEditControlBackgroundColorHover: "",
  calciteInputInlineEditControlBackgroundColorPress: "",
  calciteInputInlineEditControlCornerRadius: "",
  calciteInputInlineEditControlLoaderColor: "",
  calciteInputInlineEditControlTextColor: "",
  calciteInputInlineEditControlTextColorPress: "",
};

export const input = html`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`;
