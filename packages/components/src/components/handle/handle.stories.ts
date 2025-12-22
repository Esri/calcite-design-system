import { html } from "../../../support/formatting";

export default {
  title: "Components/Handle",
};

export const Simple = (): string => html` <calcite-handle></calcite-handle> `;

export const Activated = (): string => html` <calcite-handle activated></calcite-handle> `;

export const Disabled = (): string => html` <calcite-handle disabled></calcite-handle> `;
