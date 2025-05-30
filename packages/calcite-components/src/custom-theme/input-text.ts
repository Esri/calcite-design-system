import { html } from "../../support/formatting";

export const inputTextTokens = {
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSize: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSize: "",
  calciteInputSuffixTextColor: "",
  calciteInputTextBackgroundColor: "",
  calciteInputTextBorderColor: "",
  calciteInputTextCornerRadius: "",
  calciteInputTextHeight: "",
  calciteInputTextPlaceholderTextColor: "",
  calciteInputTextTextColor: "",
  calciteInputTextTextColorFocus: "",
};

export const inputText = html`<calcite-input-text placeholder="Placeholder text"></calcite-input-text>`;

export const inputTextWithSuffixAndPrefix = html`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`;

export const inputTextClearable = html`<calcite-input-text clearable value="Clearable text"></calcite-input-text>`;

export const inputTextLoading = html`<calcite-input-text loading value="Loading text"></calcite-input-text>`;

export const inputTextReadOnly = html`<calcite-input-text read-only value="Read only text"></calcite-input-text>`;
