import { html } from "../../support/formatting";

export const inputDatePicker = html`<calcite-input-date-picker
  scale="m"
  value="2023-03-07"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input-date-picker>`;
