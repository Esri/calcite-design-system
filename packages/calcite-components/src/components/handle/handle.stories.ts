import { storyFilters } from "../../../.storybook/helpers";

import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Handle",
  parameters: { notes: readme },
  ...storyFilters(),
};

export const simple = (): string => html` <calcite-handle></calcite-handle> `;

export const themedStates_TestOnly = (): string => html`
  <calcite-handle
    style="
    --calcite-handle-text-color: blue;
    --calcite-handle-text-color-focus: pink;
    --calcite-handle-text-color-hover: green;
    --calcite-handle-text-color-selected: purple;

    --calcite-handle-background-color: red;
    --calcite-handle-background-color-hover: yellow;
    --calcite-handle-background-color-selected: orange;
  "
  ></calcite-handle>
`;
