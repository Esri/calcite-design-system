import { k as w, h as t, j as L } from "./index.js";
import { A as T } from "./resources16.js";
import { w as k } from "./without.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  position: S,
  selectionAppearance: A
} = T, z = {
  title: "Components/Action Bar",
  args: {
    expandDisabled: !1,
    expanded: !1,
    position: S.defaultValue,
    floating: !1,
    selectionAppearance: A.values[2]
  },
  argTypes: {
    position: {
      options: S.values.filter((c) => c !== "top" && c !== "bottom"),
      control: {
        type: "select"
      }
    },
    selectionAppearance: {
      options: k(A.values, "icon", "border"),
      control: {
        type: "select"
      }
    }
  }
}, i = (c) => t`
  <calcite-action-bar
    ${w("expand-disabled", c.expandDisabled)}
    ${w("expanded", c.expanded)}
    ${w("floating", c.floating)}
    position="${c.position}"
    selection-appearance="${c.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`, o = (c) => t`<div style="padding:20px;">
    <calcite-action-bar position="${c.position}" floating>
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div> `, n = () => t`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <div style="padding:20px;">
    <calcite-action-bar floating expanded>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
        <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`, l = () => t`<div style="padding:20px;">
    <calcite-action-bar floating layout="horizontal">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-tooltip
        slot="expand-tooltip"
        id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
        role="tooltip"
        overlay-positioning="absolute"
        placement="auto"
        style="visibility: hidden; pointer-events: none; position: absolute;"
        >Toggle Action bar</calcite-tooltip
      >
    </calcite-action-bar>
  </div>`, a = () => t`<div style="padding:20px;">
    <calcite-action-bar floating position="start" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`;
a.parameters = {
  themes: L
};
const r = () => t`
  <div style="width: 500px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
`, s = () => t`
  <div style="width: 250px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
`, p = () => t`
  <div style="width: 500px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-disabled style="flex:1;">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Help" icon="question"></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`, d = () => t`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-bar expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`, x = () => t`<div style="padding:20px;">
    <calcite-action-bar layout="grid" expand-disabled overflow-actions-disabled floating>
      <calcite-action-group>
        <calcite-action text="Northwest" icon="chevron-up-left"></calcite-action>
        <calcite-action text="North" icon="chevron-up"></calcite-action>
        <calcite-action text="Northeast" icon="chevron-up-right"></calcite-action>
        <calcite-action text="West" icon="chevron-left"></calcite-action>
        <calcite-action text="Center" icon="gps-on"></calcite-action>
        <calcite-action text="East" icon="chevron-right"></calcite-action>
        <calcite-action text="Southwest" icon="chevron-down-left"></calcite-action>
        <calcite-action text="South" icon="chevron-down"></calcite-action>
        <calcite-action text="Southeast" icon="chevron-down-right"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`, e = () => t`
  <calcite-action-bar position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;
e.parameters = {
  themes: L
};
const u = () => t`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus">
          <calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip>
        </calcite-action>
        <calcite-action text="Save" icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"
          ><calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip></calcite-action
        >
        <calcite-action text="Save" active icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"
        ><calcite-tooltip placement="right" slot="tooltip">hello world</calcite-tooltip></calcite-action
      >
    </calcite-action-bar>
  </div>
`, m = () => `<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, g = () => `<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, b = () => `<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, y = () => `<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, h = () => `<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, v = () => `<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, f = () => t`
  <style>
    .container {
      display: flex;
      flex-flow: column;
      width: 800px;
      margin-block: 2rem;
    }
  </style>
  <div class="container">
    <calcite-action-bar layout="horizontal">
      <calcite-action text="Add" icon="plus" width="full"> </calcite-action>
      <calcite-action text="Remove" icon="minus" width="full"> </calcite-action>
      <calcite-action text="Copy" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: ActionBarStoryArgs): string => html\`
  <calcite-action-bar
    \${boolean("expand-disabled", args.expandDisabled)}
    \${boolean("expanded", args.expanded)}
    \${boolean("floating", args.floating)}
    position="\${args.position}"
    selection-appearance="\${args.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: ActionBarStoryArgs): string => html\`<div style="padding:20px;">
    <calcite-action-bar position="\${args.position}" floating>
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div> \``,
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
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <div style="padding:20px;">
    <calcite-action-bar floating expanded>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
        <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar floating layout="horizontal">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-tooltip
        slot="expand-tooltip"
        id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
        role="tooltip"
        overlay-positioning="absolute"
        placement="auto"
        style="visibility: hidden; pointer-events: none; position: absolute;"
        >Toggle Action bar</calcite-tooltip
      >
    </calcite-action-bar>
  </div>\``,
      ...l.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar floating position="start" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...a.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 500px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 250px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
      <!-- The "bottom-actions" slot is deprecated -->
      <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 500px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-disabled style="flex:1;">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Help" icon="question"></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-bar expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar layout="grid" expand-disabled overflow-actions-disabled floating>
      <calcite-action-group>
        <calcite-action text="Northwest" icon="chevron-up-left"></calcite-action>
        <calcite-action text="North" icon="chevron-up"></calcite-action>
        <calcite-action text="Northeast" icon="chevron-up-right"></calcite-action>
        <calcite-action text="West" icon="chevron-left"></calcite-action>
        <calcite-action text="Center" icon="gps-on"></calcite-action>
        <calcite-action text="East" icon="chevron-right"></calcite-action>
        <calcite-action text="Southwest" icon="chevron-down-left"></calcite-action>
        <calcite-action text="South" icon="chevron-down"></calcite-action>
        <calcite-action text="Southeast" icon="chevron-down-right"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...x.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-bar position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus">
          <calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip>
        </calcite-action>
        <calcite-action text="Save" icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"
          ><calcite-tooltip placement="right" slot="tooltip">Add</calcite-tooltip></calcite-action
        >
        <calcite-action text="Save" active icon="save"
          ><calcite-tooltip placement="right" slot="tooltip">Save</calcite-tooltip></calcite-action
        >
        <calcite-action text="Layers" icon="layers"
          ><calcite-tooltip placement="right" slot="tooltip">Layers</calcite-tooltip></calcite-action
        >
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"
        ><calcite-tooltip placement="right" slot="tooltip">hello world</calcite-tooltip></calcite-action
      >
    </calcite-action-bar>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...m.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...g.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...b.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...y.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...h.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...v.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      flex-flow: column;
      width: 800px;
      margin-block: 2rem;
    }
  </style>
  <div class="container">
    <calcite-action-bar layout="horizontal">
      <calcite-action text="Add" icon="plus" width="full"> </calcite-action>
      <calcite-action text="Remove" icon="minus" width="full"> </calcite-action>
      <calcite-action text="Copy" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
const W = ["simple", "floating", "floatingWithDefinedWidths", "floatingWithGroups", "floatingDarkModeRTL", "horizontal", "horizontalSmall", "horizontalOverflow_TestOnly", "withDefinedWidths", "gridLayout", "darkModeRTL_TestOnly", "adjacentTooltipsOpenQuickly", "hebrewLocale_TestOnly", "norwegianLocale_TestOnly", "FrenchLocale_TestOnly", "hongKongLocale_TestOnly", "ukrainianLocale_TestOnly", "bosnianLocale_TestOnly", "fullWidthActions"];
export {
  b as FrenchLocale_TestOnly,
  W as __namedExportsOrder,
  u as adjacentTooltipsOpenQuickly,
  v as bosnianLocale_TestOnly,
  e as darkModeRTL_TestOnly,
  z as default,
  o as floating,
  a as floatingDarkModeRTL,
  n as floatingWithDefinedWidths,
  l as floatingWithGroups,
  f as fullWidthActions,
  x as gridLayout,
  m as hebrewLocale_TestOnly,
  y as hongKongLocale_TestOnly,
  r as horizontal,
  p as horizontalOverflow_TestOnly,
  s as horizontalSmall,
  g as norwegianLocale_TestOnly,
  i as simple,
  h as ukrainianLocale_TestOnly,
  d as withDefinedWidths
};
