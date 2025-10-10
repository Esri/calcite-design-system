import { h as t, j as T } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var v = Object.freeze, x = Object.defineProperty, f = (e, w) => v(x(e, "raw", { value: v(e.slice()) })), y;
function i(e, w) {
  const $ = e(), {
    selectionMode: b = "single",
    lines: S
  } = w.args;
  return t`
    <style>
      .tree-container {
        flex: 1;
        margin-right: 10px;
      }
      .container {
        display: flex;
        justify-content: space-between;
      }
    </style>

    <div class="container">
      ${["s", "m", "l"].map((_) => t`
          <div class="tree-container">
            <h3>${b} selection mode + ${_} scale</h3>
            <calcite-tree selection-mode="${b}" ${S ? "lines" : ""} scale="${_}">
              ${$}
            </calcite-tree>
          </div>
        `)}
    </div>
  `;
}
const C = {
  title: "Components/Tree",
  parameters: {
    chromatic: {
      delay: 1e3
    }
  }
}, r = (e = !0) => t`
  <calcite-tree-item label="test item">
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item label="test item" icon-start="palette" ${e ? "expanded" : ""}>
    <a>Child 2</a>
    <calcite-tree slot="children" icon-start="palette">
      <calcite-tree-item label="test item">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item label="test item" icon-start="palette" ${e ? "expanded" : ""}>
        <a>Grandchild 2</a>
        <calcite-tree slot="children" icon-start="palette">
          <calcite-tree-item label="test item">
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item label="test item" icon-start="palette">
            <a>Great-Grandchild 2</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item label="test item" ${e ? "expanded" : ""}>
    <a>Child 3</a>
    <calcite-tree slot="children">
      <calcite-tree-item label="test item">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`, c = (e) => t`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown" scale="${e}">
    <calcite-action slot="trigger" icon="ellipsis"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multiple">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, M = (e) => t`
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 1 </a>
    ${c(e)} ${c(e)}
  </calcite-tree-item>
  <calcite-tree-item label="test item" expanded>
    <a>Child 2 </a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 1 </a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item label="test item" icon-start="palette" expanded>
            <a>Great - Grandchild 1 </a>
            ${c(e)}${c(e)}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 3 </a>
    ${c(e)}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" icon-start="palette">
        <a>Grandchild 1 </a>
      </calcite-tree-item>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 2 </a>
        ${c(e)}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`, n = () => t` ${r()} `;
n.decorators = [i];
n.args = {
  selectionMode: "single"
};
const s = () => t`${r()}`;
s.decorators = [i];
s.args = {
  selectionMode: "none"
};
const l = () => t`<div dir="rtl">${r()}</div>`;
l.decorators = [i];
l.args = {
  lines: !0,
  selectionMode: "single"
};
const o = () => t` ${r()} `;
o.decorators = [i];
o.args = {
  lines: !0,
  selectionMode: "multiple"
};
const d = () => t` ${r()} `;
d.decorators = [i];
d.args = {
  lines: !0,
  selectionMode: "ancestors"
};
const m = () => t` ${r()} `;
m.decorators = [i];
m.args = {
  lines: !0,
  selectionMode: "single-persist"
};
const p = (e) => t` ${M(e)} `;
p.decorators = [i];
p.args = {
  selectionMode: "single"
};
const g = () => t`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
`, u = () => t`
  <style>
    .string-value {
      white-space: pre-wrap;
    }
  </style>
  <calcite-tree>
    <calcite-tree-item label="test item">
      <div>
        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span
        ><span class="string-value">✂️ 🚫clipped ✂️</span>
      </div>
    </calcite-tree-item>

    <calcite-tree-item label="test item">
      <div>
        <span>value</span><span>:&nbsp;</span
        ><!-- formatting (single-lining JSON) hides the issue, so we disable it -->
        <!-- prettier-ignore -->
        <span class="string-value">{
          "spatialReference": {
            "latestWkid": 3857,
            "wkid": 102100
          },
          "x": -8443894.052,
          "y": 5664504.875700004
        }</span>
      </div>
    </calcite-tree-item>
  </calcite-tree>
`, a = () => t`<div dir="rtl">${r()}</div> `;
a.parameters = {
  themes: T
};
a.args = {
  selectionMode: "single"
};
a.decorators = [i];
const h = () => t(y || (y = f([`<div style="width:400px">
      <calcite-tree>
        <calcite-tree-item label="test item" expanded id="two">
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="test item">
              <span class="title">Layer 2.1</span>
              <calcite-dropdown placement="bottom-trailing">
                <calcite-button
                  appearance="transparent"
                  color="neutral"
                  icon-start="ellipsis"
                  slot="trigger"
                  id="trigger"
                ></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item label="test item">
          <span class="title">Layer 3</span>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => {
          const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
          dropdownTriggerEl.click();
        }, 1000);
      });
    <\/script>`])));
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: "(): string => html` ${treeItems()} `",
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: "(): string => html`${treeItems()}`",
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">${treeItems()}</div>`',
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(): string => html` ${treeItems()} `",
      ...o.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: "(): string => html` ${treeItems()} `",
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: "(): string => html` ${treeItems()} `",
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: "(scale: string): string => html` ${iconStartLargeActionsEnd(scale)} `",
      ...p.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .string-value {
      white-space: pre-wrap;
    }
  </style>
  <calcite-tree>
    <calcite-tree-item label="test item">
      <div>
        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span
        ><span class="string-value">✂️ 🚫clipped ✂️</span>
      </div>
    </calcite-tree-item>

    <calcite-tree-item label="test item">
      <div>
        <span>value</span><span>:&nbsp;</span
        ><!-- formatting (single-lining JSON) hides the issue, so we disable it -->
        <!-- prettier-ignore -->
        <span class="string-value">{
          "spatialReference": {
            "latestWkid": 3857,
            "wkid": 102100
          },
          "x": -8443894.052,
          "y": 5664504.875700004
        }</span>
      </div>
    </calcite-tree-item>
  </calcite-tree>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">${treeItems()}</div> `',
      ...a.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
      <calcite-tree>
        <calcite-tree-item label="test item" expanded id="two">
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="test item">
              <span class="title">Layer 2.1</span>
              <calcite-dropdown placement="bottom-trailing">
                <calcite-button
                  appearance="transparent"
                  color="neutral"
                  icon-start="ellipsis"
                  slot="trigger"
                  id="trigger"
                ></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item label="test item">
          <span class="title">Layer 3</span>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => {
          const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
          dropdownTriggerEl.click();
        }, 1000);
      });
    <\/script>\``,
      ...h.parameters?.docs?.source
    }
  }
};
const G = ["singleSelectionMode", "selectionModeNone", "linesRTL", "multipleSelectionModeWithLines_TestOnly", "ancestorsSelectionModeWithLines_TestOnly", "singlePersistSelectionModeWithLines_TestOnly", "iconStartAndActionsEnd", "treeItemTextContentWraps_TestOnly", "treeItemContentIsNotClipped_TestOnly", "darkModeRTL_TestOnly", "OverflowingSubtree"];
export {
  h as OverflowingSubtree,
  G as __namedExportsOrder,
  d as ancestorsSelectionModeWithLines_TestOnly,
  a as darkModeRTL_TestOnly,
  C as default,
  p as iconStartAndActionsEnd,
  l as linesRTL,
  o as multipleSelectionModeWithLines_TestOnly,
  s as selectionModeNone,
  m as singlePersistSelectionModeWithLines_TestOnly,
  n as singleSelectionMode,
  u as treeItemContentIsNotClipped_TestOnly,
  g as treeItemTextContentWraps_TestOnly
};
