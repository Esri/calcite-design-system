import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Filter",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple_TestOnly = (): string => html`<calcite-filter></calcite-filter>`;

export const placeholder_TestOnly = (): string => html`<calcite-filter placeholder="Search"></calcite-filter>`;

export const placeholderRTL_TestOnly = (): string =>
  html`<calcite-filter dir="rtl" placeholder="Search"></calcite-filter>`;

export const value_TestOnly = (): string => html`<calcite-filter value="Hello World"></calcite-filter>`;

export const disabled_TestOnly = (): string => html`<calcite-filter placeholder="Search" disabled></calcite-filter>`;

export const darkMode_TestOnly = (): string => html`<calcite-filter placeholder="Search"></calcite-filter>`;

darkMode_TestOnly.parameters = { modes: modesDarkDefault };

const themeStyles = `
  --calcite-filter-background-color: red;
  --calcite-filter-width: 50%;
`;

export const theming_TestOnly = (): string =>
  html`<calcite-filter placeholder="Search" style="${themeStyles}}"></calcite-filter>`;
