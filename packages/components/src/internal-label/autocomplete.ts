import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/autocomplete/autocomplete";

export const autocomplete = html`<calcite-autocomplete scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-autocomplete>`;
