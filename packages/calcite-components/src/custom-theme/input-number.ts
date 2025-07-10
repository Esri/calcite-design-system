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
  calciteInputNumberIconColor: "",
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
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
    number-button-type="horizontal"
  ></calcite-input-number>`;

export const inputNumberClearable = html`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    number-button-type="horizontal"
  ></calcite-input-number>`;

export const inputNumberClearableReadOnly = html`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`;

export const inputNumberReadOnly = html`<calcite-input-number read-only step="any" value="100"></calcite-input-number>
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`;

export const inputNumberReadOnlyWithPrefixSuffix = html`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`;
