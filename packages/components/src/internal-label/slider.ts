import { html } from "../../support/formatting";

export const slider = html`<calcite-slider
  scale="m"
  min="10000"
  max="100000"
  value="100000"
  step="1000"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-slider>`;
