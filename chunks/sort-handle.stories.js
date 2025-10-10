import { h as e } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var l = Object.freeze, m = Object.defineProperty, p = (r, h) => l(m(r, "raw", { value: l(r.slice()) })), c, d;
const v = {
  title: "Components/SortHandle",
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, t = () => e`
  <calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>
`, s = () => e`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>`, o = () => e`
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
`, n = () => e(c || (c = p([`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.moveToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  <\/script>
`]))), a = () => e(d || (d = p([`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.addToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  <\/script>
`]))), i = () => e`
  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>
`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-sort-handle label="test" set-position="4" set-size="10"></calcite-sort-handle>\n`',
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>`',
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...o.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.moveToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  <\/script>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle label="test" set-position="4" set-size="10" open></calcite-sort-handle>
  </div>
  <script>
    const sortHandle = document.querySelector("calcite-sort-handle");
    sortHandle.addToItems = [
      { element: document.createElement("div"), id: "1", label: "Group 1" },
      { element: document.createElement("div"), id: "2", label: "Group 2" },
    ];
  <\/script>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>\n`',
      ...i.parameters?.docs?.source
    }
  }
};
const b = ["closed", "open", "positions", "withMoveToItems", "withAddToItems", "disabled"];
export {
  b as __namedExportsOrder,
  t as closed,
  v as default,
  i as disabled,
  s as open,
  o as positions,
  a as withAddToItems,
  n as withMoveToItems
};
