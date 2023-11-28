import { storyFilters } from "../../../.storybook/helpers";

import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Handle",
  parameters: { notes: readme },
  ...storyFilters(),
};

export const simple = (): string => html` <calcite-handle></calcite-handle> `;

export const activated_TestOnly = (): string => html` <calcite-handle activated></calcite-handle> `;

export const disabled_TestOnly = (): string => html` <calcite-handle disabled></calcite-handle> `;
