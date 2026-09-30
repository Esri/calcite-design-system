import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/text-area/text-area";

export const textArea = html`<calcite-text-area placeholder="add notes" scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-text-area>`;
