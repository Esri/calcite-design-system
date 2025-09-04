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
  <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
  <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
  <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-combobox>`;
