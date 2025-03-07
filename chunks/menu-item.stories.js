import { b as s } from "./utils.js";
import { i as r } from "./helpers.js";
import { h as t } from "./formatting.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.23 */
const b = {
  title: "Components/Menu Item",
  args: {
    text: "Menu item",
    src: "",
    href: "",
    rel: "",
    target: "",
    label: "",
    active: !1,
    breadcrumb: !1
  }
}, m = (e) => t`
  <calcite-menu>
    <calcite-menu-item
      text="${e.text}"
      src="${e.src}"
      href="${e.href}"
      rel="${e.rel}"
      target="${e.target}"
      label="${e.label}"
      ${s("active", e.active)}
      ${s("breadcrumb", e.breadcrumb)}
    />
  </calcite-menu>
`, c = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-start="${r[0]}" />
  </calcite-menu>`, a = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${r[0]}" />
  </calcite-menu>`, n = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${r[0]}" icon-start="${r[0]}" />
  </calcite-menu>`, i = () => t`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`, l = () => t`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`, u = () => t`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`;
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(args: MenuItemStoryArgs): string => html\`
  <calcite-menu>
    <calcite-menu-item
      text="\${args.text}"
      src="\${args.src}"
      href="\${args.href}"
      rel="\${args.rel}"
      target="\${args.target}"
      label="\${args.label}"
      \${boolean("active", args.active)}
      \${boolean("breadcrumb", args.breadcrumb)}
    />
  </calcite-menu>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" />\n  </calcite-menu>`',
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>\``,
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>\``,
      ...l.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />\``,
      ...u.parameters?.docs?.source
    }
  }
};
const p = ["simple", "iconStart", "iconEnd", "iconsBoth", "allIconsAndSubMenu_TestOnly", "allIconsAndSubMenuVertical_TestOnly", "darkModeRTL_TestOnly"];
export {
  p as __namedExportsOrder,
  l as allIconsAndSubMenuVertical_TestOnly,
  i as allIconsAndSubMenu_TestOnly,
  u as darkModeRTL_TestOnly,
  b as default,
  a as iconEnd,
  c as iconStart,
  n as iconsBoth,
  m as simple
};
