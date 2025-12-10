import { html } from "../../support/formatting";

export const combobox = html`<calcite-combobox
  label="test"
  label-text="Label text"
  placeholder="select element"
  max-items="6"
  selection-mode="single"
  scale="m"
  required
>
  <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
  <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
  <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-combobox>`;
