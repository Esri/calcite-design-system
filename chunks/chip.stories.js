import { i as e } from "./helpers.js";
import { p as u } from "./placeholder-image.js";
import { k as h, h as c, j as v } from "./index.js";
import { A as y } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: m,
  appearance: b,
  kind: g
} = y, w = {
  title: "Components/Chip",
  args: {
    scale: m.defaultValue,
    appearance: b.defaultValue,
    kind: g.values[4],
    closable: !1,
    selected: !1,
    label: "My great chip"
  },
  argTypes: {
    scale: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: b.values.filter((a) => a !== "transparent"),
      control: {
        type: "select"
      }
    },
    kind: {
      options: g.values.filter((a) => a !== "danger" && a !== "info" && a !== "warning" && a !== "success"),
      control: {
        type: "select"
      }
    },
    label: {
      control: {
        type: "text"
      }
    }
  }
}, i = (a) => c`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${a.scale}"
      appearance="${a.appearance}"
      kind="${a.kind}"
      label="${a.label}"
      ${h("closable", a.closable)}
      ${h("selected", a.selected)}
      >My great chip</calcite-chip
    >
  </div>
`, n = (a) => c`
  <div style="background-color:white;padding:100px">
    <calcite-chip icon="${e[0]}" scale="m" appearance="solid" kind="neutral" label="${a.label}">
      My great chip</calcite-chip
    >
  </div>
`, r = (a) => c`
  <div style="background-color:white;padding:100px">
    <calcite-chip scale="m" appearance="solid" kind="neutral" label="${a.label}">
      <img slot="image" src="${u({
  width: 50,
  height: 50
})}" />
      My great chip</calcite-chip
    >
  </div>
`, t = () => c`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `, s = () => c`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" icon="layer" label="Username">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `, o = (a) => c`
  <div
    style="display: grid; background-color:var(--calcite-color-foreground-current); padding: 50px; gap:var(--calcite-spacing-xxs);"
  >
    <calcite-chip icon="${e[0]}" scale="m" appearance="solid" kind="neutral" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${e[0]}" scale="m" appearance="solid" kind="brand" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${e[0]}" scale="m" appearance="solid" kind="inverse" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${e[0]}" scale="m" appearance="outline" kind="neutral" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${e[0]}" scale="m" appearance="outline" kind="brand" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="${e[0]}" scale="m" appearance="outline" kind="inverse" label="${a.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${e[0]}"
      scale="m"
      appearance="outline-fill"
      kind="neutral"
      label="${a.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${e[0]}"
      scale="m"
      appearance="outline-fill"
      kind="brand"
      label="${a.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="${e[0]}"
      scale="m"
      appearance="outline-fill"
      kind="inverse"
      label="${a.label}"
      closable
    >
      My great chip</calcite-chip
    >
  </div>
`, p = () => c`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username" closable icon="layer">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `, d = () => c`<calcite-chip icon="banana" style="--calcite-icon-color: #ac9f42" label="Banana" closable>Banana</calcite-chip>`, l = (a) => c`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip class="calcite-mode-dark" label="${a.label}">My great chip</calcite-chip>
  </div>
`;
l.parameters = {
  themes: v
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: ChipStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="\${args.scale}"
      appearance="\${args.appearance}"
      kind="\${args.kind}"
      label="\${args.label}"
      \${boolean("closable", args.closable)}
      \${boolean("selected", args.selected)}
      >My great chip</calcite-chip
    >
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: ChipStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="solid" kind="neutral" label="\${args.label}">
      My great chip</calcite-chip
    >
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: ChipStoryArgs): string => html\`
  <div style="background-color:white;padding:100px">
    <calcite-chip scale="m" appearance="solid" kind="neutral" label="\${args.label}">
      <img slot="image" src="\${placeholderImage({
  width: 50,
  height: 50
})}" />
      My great chip</calcite-chip
    >
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return html\`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  \`;
}`,
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return html\`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" icon="layer" label="Username">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  \`;
}`,
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: ChipStoryArgs): string => html\`
  <div
    style="display: grid; background-color:var(--calcite-color-foreground-current); padding: 50px; gap:var(--calcite-spacing-xxs);"
  >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="solid" kind="neutral" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="solid" kind="brand" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="solid" kind="inverse" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="outline" kind="neutral" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="outline" kind="brand" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip icon="\${iconNames[0]}" scale="m" appearance="outline" kind="inverse" label="\${args.label}" closable>
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="\${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="neutral"
      label="\${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="\${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="brand"
      label="\${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
    <calcite-chip
      icon="\${iconNames[0]}"
      scale="m"
      appearance="outline-fill"
      kind="inverse"
      label="\${args.label}"
      closable
    >
      My great chip</calcite-chip
    >
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return html\`
    <div style="background-color:white;padding:100px">
      <calcite-chip scale="m" appearance="solid" kind="neutral" label="Username" closable icon="layer">
        <calcite-avatar
          slot="image"
          scale="m"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  \`;
}`,
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-chip icon="banana" style="--calcite-icon-color: #ac9f42" label="Banana" closable>Banana</calcite-chip>`',
      ...d.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: ChipStoryArgs): string => html\`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip class="calcite-mode-dark" label="\${args.label}">My great chip</calcite-chip>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
const x = ["simple", "withIcon", "withImage", "withAvatar", "withAvatarAndIcon", "withClosable", "withAvatarAndIconAndClosable", "overriddenIconColor", "darkModeRTL_TestOnly"];
export {
  x as __namedExportsOrder,
  l as darkModeRTL_TestOnly,
  w as default,
  d as overriddenIconColor,
  i as simple,
  t as withAvatar,
  s as withAvatarAndIcon,
  p as withAvatarAndIconAndClosable,
  o as withClosable,
  n as withIcon,
  r as withImage
};
