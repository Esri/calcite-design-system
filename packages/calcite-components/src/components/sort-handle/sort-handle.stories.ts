import { html } from "../../../support/formatting";

export default {
  title: "Components/SortHandle",
};

export const closed = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>
`;

export const open = (): string =>
  html`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>`;

export const positions = (): string => html`
  <h2>First Position</h2>
  <calcite-sort-handle label="test" set-position="1" set-size="10" open></calcite-sort-handle>

  <h2>Second Position</h2>
  <calcite-sort-handle label="test" set-position="2" set-size="10" open></calcite-sort-handle>

  <h2>Second to Last Position</h2>
  <calcite-sort-handle label="test" set-position="9" set-size="10" open></calcite-sort-handle>

  <h2>Last Position</h2>
  <calcite-sort-handle label="test" set-position="10" set-size="10" open></calcite-sort-handle>
`;

export const withItems = (): string =>
  html`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
    <script>
      const sortHandle = document.querySelector("calcite-sort-handle");
      sortHandle.moveToItems = [
        { element: document.createElement("div"), id: "1", label: "Group 1" },
        { element: document.createElement("div"), id: "2", label: "Group 2" },
      ];
    </script>`;

export const disabled = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>
`;
