import { h as c } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const g = {
  title: "Components/Action Group"
}, t = () => c`<style>
      calcite-action {
        flex-grow: 1;
      }
    </style>
    <calcite-action-group style="width:600px" layout="horizontal">
      <calcite-action icon="bell" alignment="center"></calcite-action>
      <calcite-action icon="biking" alignment="center"></calcite-action>
      <calcite-action icon="bluetooth" alignment="center"></calcite-action>
    </calcite-action-group>`, a = () => c`
  <div style="width:400px">
    <calcite-action-group layout="grid">
      <calcite-action alignment="center" scale="m" appearance="solid" icon="polygon"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="rectangle"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="trash"> </calcite-action>
    </calcite-action-group>
  </div>
`, e = () => c` <calcite-action-group layout="grid">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>`, i = () => c`
  <calcite-action-group layout="grid" style="--calcite-action-group-gap: 0;">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>
`, o = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="ar">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`, n = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="de">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`, r = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="no">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`, l = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="zh-CN">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`, s = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="el">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`, d = () => c`<div style="width:400px">
    <calcite-action-group expanded lang="tr">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      calcite-action {
        flex-grow: 1;
      }
    </style>
    <calcite-action-group style="width:600px" layout="horizontal">
      <calcite-action icon="bell" alignment="center"></calcite-action>
      <calcite-action icon="biking" alignment="center"></calcite-action>
      <calcite-action icon="bluetooth" alignment="center"></calcite-action>
    </calcite-action-group>\``,
      ...t.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:400px">
    <calcite-action-group layout="grid">
      <calcite-action alignment="center" scale="m" appearance="solid" icon="polygon"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="rectangle"> </calcite-action>
      <calcite-action alignment="center" scale="m" appearance="solid" icon="trash"> </calcite-action>
    </calcite-action-group>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-action-group layout="grid">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>\``,
      ...e.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-group layout="grid" style="--calcite-action-group-gap: 0;">
    <calcite-action text="Add" icon="arrow-up-left"></calcite-action>
    <calcite-action text="Save" icon="chevron-up"></calcite-action>
    <calcite-action text="Layers" icon="arrow-up-right"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-left"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="chevron-right"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-left"></calcite-action>
    <calcite-action text="Layers" icon="chevron-down"></calcite-action>
    <calcite-action text="Basemaps" icon="arrow-down-right"></calcite-action>
  </calcite-action-group>
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
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="ar">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...o.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="de">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...n.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="no">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...r.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="zh-CN">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="el">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...s.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:400px">
    <calcite-action-group expanded lang="tr">
      <calcite-dropdown slot="menu-actions"> </calcite-dropdown>
    </calcite-action-group>
  </div>\``,
      ...d.parameters?.docs?.source
    }
  }
};
const u = ["honorsFlexGrow", "gridCenteringOfActionsInAGroup", "withoutDefinedGridGap_TestOnly", "withDefinedGridGap_TestOnly", "arabicLocale_TestOnly", "germanLocale_TestOnly", "norwegianLocale_TestOnly", "ChineseLocale_TestOnly", "GreekLocale_TestOnly", "TurkishLocale_TestOnly"];
export {
  l as ChineseLocale_TestOnly,
  s as GreekLocale_TestOnly,
  d as TurkishLocale_TestOnly,
  u as __namedExportsOrder,
  o as arabicLocale_TestOnly,
  g as default,
  n as germanLocale_TestOnly,
  a as gridCenteringOfActionsInAGroup,
  t as honorsFlexGrow,
  r as norwegianLocale_TestOnly,
  i as withDefinedGridGap_TestOnly,
  e as withoutDefinedGridGap_TestOnly
};
