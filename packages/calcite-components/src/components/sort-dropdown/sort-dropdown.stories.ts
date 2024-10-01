import { html } from "../../../support/formatting";

export default {
  title: "Components/SortDropdown",
};

export const simple = (): string => html` <calcite-sort-dropdown></calcite-sort-dropdown> `;

export const open = (): string => html` <calcite-sort-dropdown open></calcite-sort-dropdown> `;

export const disabled = (): string => html` <calcite-sort-dropdown disabled></calcite-sort-dropdown> `;
