import { html } from "../../../support/formatting";

export default {
  title: "Components/SortHandle",
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const closed = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>
`;

export const open = (): string =>
  html`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>`;

export const positions = (): string => html`
  <style>
    .wrapper {
      display: grid;
      grid-template-columns: 300px 300px;
      grid-gap: 50px;
    }
    .box {
      height: 200px;
    }
  </style>
  <div class="wrapper">
    <div class="box">
      <strong>First Position</strong>
      <calcite-sort-handle label="test" set-position="1" set-size="10" open></calcite-sort-handle>
    </div>
    <div class="box">
      <strong>Second Position</strong>
      <calcite-sort-handle label="test" set-position="2" set-size="10" open></calcite-sort-handle>
    </div>
    <div class="box">
      <strong>Second to Last Position</strong>
      <calcite-sort-handle label="test" set-position="9" set-size="10" open></calcite-sort-handle>
    </div>
    <div class="box">
      <strong>Last Position</strong>
      <calcite-sort-handle label="test" set-position="10" set-size="10" open></calcite-sort-handle>
    </div>
  </div>
`;

export const withMoveToItems = (): string => html`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.moveToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  </script>
`;

export const withAddToItems = (): string => html`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.addToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  </script>
`;

export const disabled = (): string => html`
  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>
`;
