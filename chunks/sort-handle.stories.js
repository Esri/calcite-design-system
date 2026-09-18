/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as d } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as g } from "./resources34.js";
import "./sort-handle.js";
var p = Object.freeze, v = Object.defineProperty, u = (e, x) => p(v(e, "raw", { value: p(e.slice()) })), m, h;
const {
  scale: b,
  sortHandlePlacement: y
} = g, f = {
  title: "Components/SortHandle",
  args: {
    disabled: !1,
    open: !1,
    placement: "leading-start",
    scale: b.defaultValue,
    sortDisabled: !1
  },
  argTypes: {
    placement: {
      options: y.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: b.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, s = (e) => t`
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="${e.placement}"
    scale="${e.scale}"
    ${d("open", e.open)}
    ${d("disabled", e.disabled)}
    ${d("sort-disabled", e.sortDisabled)}
  ></calcite-sort-handle>
`, n = () => t`
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="leading-start"
    scale="m"
  ></calcite-sort-handle>
`, a = () => t`
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="bottom-start"
    scale="m"
    open
  ></calcite-sort-handle>
`, o = () => t`<calcite-sort-handle
    label="test"
    placement="leading-start"
    set-position="4"
    set-size="10"
    open
  ></calcite-sort-handle>`, l = () => t`
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
`, r = () => t(m || (m = u([`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle id="move-to-story-handle" label="test" set-position="4" set-size="10"></calcite-sort-handle>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-sort-handle");

      const sortHandle = document.querySelector("#move-to-story-handle");
      await sortHandle.componentOnReady();

      sortHandle.moveToItems = [
        { element: document.createElement("div"), id: "1", label: "Group 1" },
        { element: document.createElement("div"), id: "2", label: "Group 2" },
      ];

      sortHandle.open = true;
    })();
  <\/script>
`]))), i = () => t(h || (h = u([`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle id="add-to-story-handle" label="test" set-position="4" set-size="10"></calcite-sort-handle>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-sort-handle");

      const sortHandle = document.querySelector("#add-to-story-handle");
      await sortHandle.componentOnReady();

      sortHandle.addToItems = [
        { element: document.createElement("div"), id: "1", label: "Group 1" },
        { element: document.createElement("div"), id: "2", label: "Group 2" },
      ];

      sortHandle.open = true;
    })();
  <\/script>
`]))), c = () => t`
  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: SortHandleStoryArgs): string => html\`
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="\${args.placement}"
    scale="\${args.scale}"
    \${boolean("open", args.open)}
    \${boolean("disabled", args.disabled)}
    \${boolean("sort-disabled", args.sortDisabled)}
  ></calcite-sort-handle>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="leading-start"
    scale="m"
  ></calcite-sort-handle>
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
  <calcite-sort-handle
    label="test"
    set-position="4"
    set-size="10"
    placement="bottom-start"
    scale="m"
    open
  ></calcite-sort-handle>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-sort-handle
    label="test"
    placement="leading-start"
    set-position="4"
    set-size="10"
    open
  ></calcite-sort-handle>\``,
      ...o.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle id="move-to-story-handle" label="test" set-position="4" set-size="10"></calcite-sort-handle>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-sort-handle");

      const sortHandle = document.querySelector("#move-to-story-handle");
      await sortHandle.componentOnReady();

      sortHandle.moveToItems = [
        { element: document.createElement("div"), id: "1", label: "Group 1" },
        { element: document.createElement("div"), id: "2", label: "Group 2" },
      ];

      sortHandle.open = true;
    })();
  <\/script>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height:600px; width:600px;">
    <calcite-sort-handle id="add-to-story-handle" label="test" set-position="4" set-size="10"></calcite-sort-handle>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-sort-handle");

      const sortHandle = document.querySelector("#add-to-story-handle");
      await sortHandle.componentOnReady();

      sortHandle.addToItems = [
        { element: document.createElement("div"), id: "1", label: "Group 1" },
        { element: document.createElement("div"), id: "2", label: "Group 2" },
      ];

      sortHandle.open = true;
    })();
  <\/script>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-sort-handle label="test" set-position="4" set-size="10" disabled></calcite-sort-handle>\n`',
      ...c.parameters?.docs?.source
    }
  }
};
const E = ["simple", "closed", "open", "logicalPlacement", "positions", "withMoveToItems", "withAddToItems", "disabled"];
export {
  E as __namedExportsOrder,
  n as closed,
  f as default,
  c as disabled,
  o as logicalPlacement,
  a as open,
  l as positions,
  s as simple,
  i as withAddToItems,
  r as withMoveToItems
};
