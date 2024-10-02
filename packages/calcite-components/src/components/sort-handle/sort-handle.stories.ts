import { html } from "../../../support/formatting";

export default {
  title: "Components/SortHandle",
};

export const simple = (): string => html` <calcite-sort-handle></calcite-sort-handle> `;

export const open = (): string => html` <calcite-sort-handle open></calcite-sort-handle> `;

export const disabled = (): string => html` <calcite-sort-handle disabled></calcite-sort-handle> `;
