import { html } from "../../../support/formatting";

export default {
  title: "Components/SortHandle",
};

export const simple = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>
`;

export const open = (): string =>
  html`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>`;

export const disabled = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>
`;

export const openDisabled = (): string =>
  html`<calcite-sort-handle label="test" set-position="4" set-size="10" open disabled></calcite-sort-handle> `;
