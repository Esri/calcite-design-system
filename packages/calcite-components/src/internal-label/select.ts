import { html } from "../../support/formatting";

export const select = html`<calcite-select
  label="calcite select"
  width="auto"
  scale="m"
  label-text="Label text"
  required
>
  <calcite-option value="high">😃</calcite-option>
  <calcite-option value="medium">😶</calcite-option>
  <calcite-option value="low">😭</calcite-option>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-select>`;
