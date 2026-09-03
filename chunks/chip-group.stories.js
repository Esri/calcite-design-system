/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as h, m as d } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as v } from "./resources34.js";
import "./chip-group.js";
import "./chip.js";
import "./avatar.js";
const {
  selectionMode: s,
  scale: u
} = v, S = {
  title: "Components/Chip Group",
  args: {
    disabled: !1,
    selectionMode: s.defaultValue,
    scale: u.defaultValue
  },
  argTypes: {
    selectionMode: {
      options: s.values.filter((c) => c !== "children" && c !== "multichildren" && c !== "ancestors"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: u.values,
      control: {
        type: "select"
      }
    }
  }
}, i = (c) => e`
  <calcite-chip-group
    ${h("disabled", c.disabled)}
    selection-mode="${c.selectionMode}"
    scale="${c.scale}"
  >
    <calcite-chip value="forest">Forest</calcite-chip>
    <calcite-chip value="tundra">Tundra</calcite-chip>
    <calcite-chip value="shore">Seashore</calcite-chip>
    <calcite-chip value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`, l = () => e`
  <calcite-chip-group selection-mode="single">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`, t = () => e`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip value="forest" closable>Forest</calcite-chip>
    <calcite-chip selected value="tundra" closable>Tundra</calcite-chip>
    <calcite-chip value="shore" closable>Seashore</calcite-chip>
    <calcite-chip selected value="estuary" closable>Estuary</calcite-chip>
  </calcite-chip-group>
`, r = () => e`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip selected icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip selected icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`, n = () => e`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Forest</calcite-chip
    >
    <calcite-chip icon="layer" value="tundra" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Tundra</calcite-chip
    >
    <calcite-chip icon="layer" value="shore" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Seashore</calcite-chip
    >
    <calcite-chip icon="layer" value="estuary" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Estuary</calcite-chip
    >
  </calcite-chip-group>
`, p = () => e`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip closable icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip closable icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip closable icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip closable icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
`, a = () => e`
  <div dir="rtl">
    <calcite-chip-group>
      <calcite-chip value="forest">Forest</calcite-chip>
      <calcite-chip value="tundra">Tundra</calcite-chip>
      <calcite-chip value="shore">Seashore</calcite-chip>
      <calcite-chip value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
`;
a.parameters = {
  themes: d
};
const o = () => e`
  <div>
    <h2>appearance="solid" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: ChipGroupStoryArgs): string => html\`
  <calcite-chip-group
    \${boolean("disabled", args.disabled)}
    selection-mode="\${args.selectionMode}"
    scale="\${args.scale}"
  >
    <calcite-chip value="forest">Forest</calcite-chip>
    <calcite-chip value="tundra">Tundra</calcite-chip>
    <calcite-chip value="shore">Seashore</calcite-chip>
    <calcite-chip value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-chip-group selection-mode="single">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip value="forest" closable>Forest</calcite-chip>
    <calcite-chip selected value="tundra" closable>Tundra</calcite-chip>
    <calcite-chip value="shore" closable>Seashore</calcite-chip>
    <calcite-chip selected value="estuary" closable>Estuary</calcite-chip>
  </calcite-chip-group>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip selected icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip selected icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip icon="layer" value="forest" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Forest</calcite-chip
    >
    <calcite-chip icon="layer" value="tundra" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Tundra</calcite-chip
    >
    <calcite-chip icon="layer" value="shore" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Seashore</calcite-chip
    >
    <calcite-chip icon="layer" value="estuary" closable>
      <calcite-avatar slot="image" user-id="25684463a00c449585dbb32a065f6b74" full-name="user name"></calcite-avatar>
      Estuary</calcite-chip
    >
  </calcite-chip-group>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-chip-group selection-mode="multiple">
    <calcite-chip closable icon="layer" value="forest">Forest</calcite-chip>
    <calcite-chip closable icon="layer" value="tundra">Tundra</calcite-chip>
    <calcite-chip closable icon="layer" value="shore">Seashore</calcite-chip>
    <calcite-chip closable icon="layer" value="estuary">Estuary</calcite-chip>
  </calcite-chip-group>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl">
    <calcite-chip-group>
      <calcite-chip value="forest">Forest</calcite-chip>
      <calcite-chip value="tundra">Tundra</calcite-chip>
      <calcite-chip value="shore">Seashore</calcite-chip>
      <calcite-chip value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
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
      originalSource: `(): string => html\`
  <div>
    <h2>appearance="solid" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="solid" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="solid" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="solid" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline-fill" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline-fill" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline-fill" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="neutral"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="neutral" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="neutral" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="inverse"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="inverse" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="inverse" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>

    <h2>appearance="outline" & kind="brand"</h2>
    <calcite-chip-group selection-mode="single">
      <calcite-chip appearance="outline" kind="brand" value="forest">Forest</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="tundra">Tundra</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="shore">Seashore</calcite-chip>
      <calcite-chip appearance="outline" kind="brand" value="estuary">Estuary</calcite-chip>
    </calcite-chip-group>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
const T = ["simple", "singleWithIcon", "multipleClosable", "multipleWithIcon", "multipleClosableWithAvatar", "multipleWithIconAndClosable", "darkThemeRTL", "interactivityStates"];
export {
  T as __namedExportsOrder,
  a as darkThemeRTL,
  S as default,
  o as interactivityStates,
  t as multipleClosable,
  n as multipleClosableWithAvatar,
  r as multipleWithIcon,
  p as multipleWithIconAndClosable,
  i as simple,
  l as singleWithIcon
};
