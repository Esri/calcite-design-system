import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/input/input";

export const input = html`<calcite-input
  type="text"
  placeholder="Placeholder"
  scale="m"
  label-text="Label text"
  required
>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-input>`;
