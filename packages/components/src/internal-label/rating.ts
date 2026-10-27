import { html } from "../../support/formatting";
import "../components/icon/icon";
import "../components/rating/rating";

export const rating = html`<calcite-rating scale="m" label-text="Label text" required>
  <calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon>
</calcite-rating>`;
