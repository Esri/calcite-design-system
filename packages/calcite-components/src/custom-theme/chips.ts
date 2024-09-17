import { html } from "../../support/formatting";

export const chips = html`<div>
    <calcite-chip>Neutral</calcite-chip>
    <calcite-chip kind="inverse">Inverse</calcite-chip>
    <calcite-chip kind="brand">Brand</calcite-chip>
  </div>
  <div>
    <calcite-chip appearance="transparent">Neutral</calcite-chip>
    <calcite-chip appearance="transparent" kind="inverse">Inverse</calcite-chip>
    <calcite-chip appearance="outline-fill" kind="brand">Brand</calcite-chip>
  </div>`;
