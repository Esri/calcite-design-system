import { html } from "../../../support/formatting";

export default {
  title: "Components/Handle",
};

export const simple = (): string => html` <calcite-handle></calcite-handle> `;

export const activated = (): string => html` <calcite-handle activated></calcite-handle> `;

export const disabled = (): string => html` <calcite-handle disabled></calcite-handle> `;
