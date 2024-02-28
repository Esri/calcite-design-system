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
  --calcite-filter-width: 75%;
  --calcite-filter-input-corner-radius: 20px;
  --calcite-filter-input-text-color: blue;
  --calcite-filter-input-border-color: cyan;
  --calcite-filter-input-background-color: lightgray;
  --calcite-filter-input-button-background-color: purple;
  --calcite-filter-input-button-background-color-hover: pink;
  --calcite-filter-input-button-background-color-active: magenta;
  --calcite-filter-input-button-border-color: yellow;
  --calcite-filter-input-icon-color: green;
  --calcite-filter-input-button-icon-color: orange;
  --calcite-filter-input-button-icon-color-active: red;
  --calcite-filter-input-button-icon-color-hover: yellow;
  --calcite-filter-input-placeholder-text-color: orange;
  --calcite-filter-input-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;

export const theming_TestOnly = (): string =>
  html`<calcite-filter placeholder="Search" style="${themeStyles}}"></calcite-filter>`;
