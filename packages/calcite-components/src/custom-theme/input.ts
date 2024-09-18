import { html } from "../../support/formatting";

export const inputTokens = {
  calciteInputPrefixSize: "",
  calciteInputSuffixSize: "",
};

export const input = html`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`;
