import { k as u, h as a, j as g } from "./index.js";
import { A as y } from "./resources16.js";
import { w as h } from "./without.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  position: m,
  selectionAppearance: x
} = y, A = {
  title: "Components/Action Pad",
  args: {
    expandDisabled: !1,
    expanded: !1,
    position: m.defaultValue,
    selectionAppearance: x.values[2]
  },
  argTypes: {
    position: {
      options: m.values.filter((t) => t !== "top" && t !== "bottom"),
      control: {
        type: "select"
      }
    },
    selectionAppearance: {
      options: h(x.values, "icon", "border"),
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 5e3
    }
  }
}, c = (t) => a`
  <calcite-action-pad
    ${u("expand-disabled", t.expandDisabled)}
    ${u("expanded", t.expanded)}
    position="${t.position}"
    selection-appearance="${t.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
      <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`, i = () => a`
  <style>
    calcite-action-pad {
      --calcite-action-pad-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-pad expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action pad application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action pad application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action pad application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`, o = () => a`<calcite-action-pad layout="horizontal">
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
      >Toggle Action Pad</calcite-tooltip
    >
  </calcite-action-pad>`, e = () => a`
  <calcite-action-pad position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
`;
e.parameters = {
  themes: g
};
const n = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="he" layout="horizontal"> </calcite-action-pad>
  </div>`, l = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="nb" layout="horizontal"> </calcite-action-pad>
  </div>`, s = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="es" layout="horizontal"> </calcite-action-pad>
  </div>`, r = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="zh-TW" layout="horizontal"> </calcite-action-pad>
  </div>`, p = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="ru" layout="horizontal"> </calcite-action-pad>
  </div>`, d = () => a`<div style="width:400px">
    <calcite-action-pad expanded lang="ro-mo" layout="horizontal"> </calcite-action-pad>
  </div>`;
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: ActionPadStoryArgs): string => html\`
  <calcite-action-pad
    \${boolean("expand-disabled", args.expandDisabled)}
    \${boolean("expanded", args.expanded)}
    position="\${args.position}"
    selection-appearance="\${args.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
      <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-action-pad {
      --calcite-action-pad-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-pad expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action pad application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action pad application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action pad application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
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
      originalSource: `(): string => html\`<calcite-action-pad layout="horizontal">
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
      >Toggle Action Pad</calcite-tooltip
    >
  </calcite-action-pad>\``,
      ...o.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-pad position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-pad>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="he" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...n.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="nb" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="es" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="zh-TW" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...r.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="ru" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:400px">\n    <calcite-action-pad expanded lang="ro-mo" layout="horizontal"> </calcite-action-pad>\n  </div>`',
      ...d.parameters?.docs?.source
    }
  }
};
const T = ["simple", "withDefinedWidths", "withGroups", "darkModeRTL_TestOnly", "hebrewLocale_TestOnly", "norwegianLocale_TestOnly", "spanishLocale_TestOnly", "taiwanLocale_TestOnly", "russianLocale_TestOnly", "romanianMoldovaLocale_TestOnly"];
export {
  T as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  A as default,
  n as hebrewLocale_TestOnly,
  l as norwegianLocale_TestOnly,
  d as romanianMoldovaLocale_TestOnly,
  p as russianLocale_TestOnly,
  c as simple,
  s as spanishLocale_TestOnly,
  r as taiwanLocale_TestOnly,
  i as withDefinedWidths,
  o as withGroups
};
