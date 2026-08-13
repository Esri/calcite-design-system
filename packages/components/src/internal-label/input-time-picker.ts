import { html } from "../../support/formatting";

export const inputTimePicker = html`<calcite-input-time-picker
  label-text="Label text"
  required
  scale="m"
  step="0.1"
  value="10:37:09.5"
  ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
></calcite-input-time-picker>`;
