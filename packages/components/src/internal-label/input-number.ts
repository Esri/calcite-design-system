import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/input-number/input-number";

export const inputNumber = html`<calcite-input-number
  placeholder="Placeholder"
  scale="m"
  value="123"
  step="1"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input-number>`;
