import { html } from "../../../support/formatting";

export default {
  title: "Components/Handle",
};

export const simple = (): string => html` <calcite-handle></calcite-handle> `;

export const activated_TestOnly = (): string => html` <calcite-handle activated></calcite-handle> `;

export const disabled_TestOnly = (): string => html` <calcite-handle disabled></calcite-handle> `;
