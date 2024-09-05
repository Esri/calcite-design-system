import { html } from "../../support/formatting";

export const checkboxTokens = {
  calciteCheckboxSize: "",
  calciteCheckboxColor: "",
};

export const checkbox = html`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`;
