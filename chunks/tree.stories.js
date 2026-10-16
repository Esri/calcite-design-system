/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { A as x } from "./resources34.js";
import { b as T, m as I } from "./utils3.js";
import { h as t } from "./formatting.js";
import "./action.js";
import "./button.js";
import "./dropdown.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./tree.js";
import "./tree-item.js";
var $ = Object.freeze, C = Object.defineProperty, E = (e, g) => $(C(e, "raw", { value: $(e.slice()) })), S;
const {
  scale: w,
  selectionMode: G
} = x, i = (e, g) => {
  const _ = e(), {
    selectionMode: b = "single",
    lines: f
  } = g.args, M = w.values;
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
      ${M.map((v) => t`
            <div class="tree-container">
              <h3>${b} selection mode + ${v} scale</h3>
              <calcite-tree selection-mode="${b}" ${f ? "lines" : ""} scale="${v}">
                ${_}
              </calcite-tree>
            </div>
          `).join("")}
    </div>
  `;
}, B = {
  title: "Components/Tree",
  args: {
    lines: !1,
    scale: w.defaultValue,
    selectionMode: "single"
  },
  argTypes: {
    selectionMode: {
      options: G.values.filter((e) => e !== "children" && e !== "multichildren"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: w.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1e3
    }
  }
}, c = (e = !0, g = !1) => t`
  <calcite-tree-item label="test item" ${g ? "" : "selected"}>
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
`, a = (e) => t`
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
`, R = (e) => t`
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 1 </a>
    ${a(e)} ${a(e)}
  </calcite-tree-item>
  <calcite-tree-item label="test item" expanded>
    <a>Child 2 </a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 1 </a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item label="test item" icon-start="palette" expanded>
            <a>Great - Grandchild 1 </a>
            ${a(e)}${a(e)}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 3 </a>
    ${a(e)}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" icon-start="palette">
        <a>Grandchild 1 </a>
      </calcite-tree-item>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 2 </a>
        ${a(e)}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`, u = (e) => t`
  <calcite-tree selection-mode="${e.selectionMode}" ${T("lines", e.lines)} scale="${e.scale}">
    ${c(!0, e.selectionMode === "none")}
  </calcite-tree>
`, l = () => t` ${c()} `;
l.decorators = [i];
l.args = {
  selectionMode: "single"
};
const n = () => t`${c(!0, !0)}`;
n.decorators = [i];
n.args = {
  selectionMode: "none"
};
const s = () => t`<div dir="rtl">${c()}</div>`;
s.decorators = [i];
s.args = {
  lines: !0,
  selectionMode: "single"
};
const o = () => t` ${c()} `;
o.decorators = [i];
o.args = {
  lines: !0,
  selectionMode: "multiple"
};
const m = () => t` ${c()} `;
m.decorators = [i];
m.args = {
  lines: !0,
  selectionMode: "ancestors"
};
const d = () => t` ${c()} `;
d.decorators = [i];
d.args = {
  lines: !0,
  selectionMode: "single-persist"
};
const p = (e) => t` ${R(e)} `;
p.decorators = [i];
p.args = {
  selectionMode: "single"
};
const y = () => t`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
`, L = () => t`
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
`, r = () => t`<div dir="rtl">${c()}</div> `;
r.parameters = {
  themes: I
};
r.args = {
  selectionMode: "single"
};
r.decorators = [i];
const h = () => t(S || (S = E([`<div style="width:400px">
      <calcite-tree lines>
        <calcite-tree-item label="nested items" expanded>
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="dropdown item">
              <span class="title">Layer 2.1</span>
              <calcite-dropdown>
                <calcite-button icon-start="ellipsis" id="trigger" slot="trigger"></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item label="single item">
          <span class="title">Layer 3</span>
        </calcite-tree-item>
        <calcite-tree-item expanded label="multiple flat items">
          Layer 4
          <calcite-tree slot="children">
            <calcite-tree-item>Layer 4.1</calcite-tree-item>
            <calcite-tree-item>Layer 4.2</calcite-tree-item>
            <calcite-tree-item>Layer 4.3</calcite-tree-item>
            <calcite-tree-item>Layer 4.4</calcite-tree-item>
            <calcite-tree-item>Layer 4.5</calcite-tree-item>
            <calcite-tree-item>Layer 4.6</calcite-tree-item>
            <calcite-tree-item>Layer 4.7</calcite-tree-item>
            <calcite-tree-item>Layer 4.8</calcite-tree-item>
            <calcite-tree-item>Layer 4.9</calcite-tree-item>
            <calcite-tree-item>Layer 4.10</calcite-tree-item>
            <calcite-tree-item>Layer 4.11</calcite-tree-item>
            <calcite-tree-item>Layer 4.12</calcite-tree-item>
            <calcite-tree-item>Layer 4.13</calcite-tree-item>
            <calcite-tree-item>Layer 4.14</calcite-tree-item>
            <calcite-tree-item>Layer 4.15</calcite-tree-item>
            <calcite-tree-item>Layer 4.16</calcite-tree-item>
            <calcite-tree-item>Layer 4.17</calcite-tree-item>
            <calcite-tree-item>Layer 4.18</calcite-tree-item>
            <calcite-tree-item>Layer 4.19</calcite-tree-item>
            <calcite-tree-item>Layer 4.20</calcite-tree-item>
            <calcite-tree-item>Layer 4.21</calcite-tree-item>
            <calcite-tree-item>Layer 4.22</calcite-tree-item>
            <calcite-tree-item>Layer 4.23</calcite-tree-item>
            <calcite-tree-item>Layer 4.24</calcite-tree-item>
            <calcite-tree-item>Layer 4.25</calcite-tree-item>
            <calcite-tree-item>Layer 4.26</calcite-tree-item>
            <calcite-tree-item>Layer 4.27</calcite-tree-item>
            <calcite-tree-item>Layer 4.28</calcite-tree-item>
            <calcite-tree-item>Layer 4.29</calcite-tree-item>
            <calcite-tree-item>Layer 4.30</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      (async () => {
        const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
        await customElements.whenDefined("calcite-button");
        await dropdownTriggerEl.componentOnReady();
        dropdownTriggerEl.click();
      })();
    <\/script>`])));
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(args: TreeStoryArgs): string => html`\n  <calcite-tree selection-mode="${args.selectionMode}" ${boolean("lines", args.lines)} scale="${args.scale}">\n    ${treeItems(true, args.selectionMode === "none")}\n  </calcite-tree>\n`',
      ...u.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: "(): string => html` ${treeItems()} `",
      ...l.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: "(): string => html`${treeItems(true, true)}`",
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">${treeItems()}</div>`',
      ...s.parameters?.docs?.source
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
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
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
      ...L.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div dir="rtl">${treeItems()}</div> `',
      ...r.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
      <calcite-tree lines>
        <calcite-tree-item label="nested items" expanded>
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="dropdown item">
              <span class="title">Layer 2.1</span>
              <calcite-dropdown>
                <calcite-button icon-start="ellipsis" id="trigger" slot="trigger"></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item label="single item">
          <span class="title">Layer 3</span>
        </calcite-tree-item>
        <calcite-tree-item expanded label="multiple flat items">
          Layer 4
          <calcite-tree slot="children">
            <calcite-tree-item>Layer 4.1</calcite-tree-item>
            <calcite-tree-item>Layer 4.2</calcite-tree-item>
            <calcite-tree-item>Layer 4.3</calcite-tree-item>
            <calcite-tree-item>Layer 4.4</calcite-tree-item>
            <calcite-tree-item>Layer 4.5</calcite-tree-item>
            <calcite-tree-item>Layer 4.6</calcite-tree-item>
            <calcite-tree-item>Layer 4.7</calcite-tree-item>
            <calcite-tree-item>Layer 4.8</calcite-tree-item>
            <calcite-tree-item>Layer 4.9</calcite-tree-item>
            <calcite-tree-item>Layer 4.10</calcite-tree-item>
            <calcite-tree-item>Layer 4.11</calcite-tree-item>
            <calcite-tree-item>Layer 4.12</calcite-tree-item>
            <calcite-tree-item>Layer 4.13</calcite-tree-item>
            <calcite-tree-item>Layer 4.14</calcite-tree-item>
            <calcite-tree-item>Layer 4.15</calcite-tree-item>
            <calcite-tree-item>Layer 4.16</calcite-tree-item>
            <calcite-tree-item>Layer 4.17</calcite-tree-item>
            <calcite-tree-item>Layer 4.18</calcite-tree-item>
            <calcite-tree-item>Layer 4.19</calcite-tree-item>
            <calcite-tree-item>Layer 4.20</calcite-tree-item>
            <calcite-tree-item>Layer 4.21</calcite-tree-item>
            <calcite-tree-item>Layer 4.22</calcite-tree-item>
            <calcite-tree-item>Layer 4.23</calcite-tree-item>
            <calcite-tree-item>Layer 4.24</calcite-tree-item>
            <calcite-tree-item>Layer 4.25</calcite-tree-item>
            <calcite-tree-item>Layer 4.26</calcite-tree-item>
            <calcite-tree-item>Layer 4.27</calcite-tree-item>
            <calcite-tree-item>Layer 4.28</calcite-tree-item>
            <calcite-tree-item>Layer 4.29</calcite-tree-item>
            <calcite-tree-item>Layer 4.30</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      (async () => {
        const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
        await customElements.whenDefined("calcite-button");
        await dropdownTriggerEl.componentOnReady();
        dropdownTriggerEl.click();
      })();
    <\/script>\``,
      ...h.parameters?.docs?.source
    }
  }
};
const J = ["simple", "singleSelectionMode", "selectionModeNone", "linesRTL", "multipleSelectionModeWithLines", "ancestorsSelectionModeWithLines", "singlePersistSelectionModeWithLines", "iconStartAndActionsEnd", "treeItemTextContentWraps", "treeItemContentIsNotClipped", "darkModeRTL", "OverflowingSubtree"];
export {
  h as OverflowingSubtree,
  J as __namedExportsOrder,
  m as ancestorsSelectionModeWithLines,
  r as darkModeRTL,
  B as default,
  p as iconStartAndActionsEnd,
  s as linesRTL,
  o as multipleSelectionModeWithLines,
  n as selectionModeNone,
  u as simple,
  d as singlePersistSelectionModeWithLines,
  l as singleSelectionMode,
  L as treeItemContentIsNotClipped,
  y as treeItemTextContentWraps
};
