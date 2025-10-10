import { k as o, h as t } from "./index.js";
import { i as s } from "./helpers.js";
import { S as m } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const p = {
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
}, a = (e) => t`
  <calcite-menu>
    <calcite-menu-item
      text="${e.text}"
      src="${e.src}"
      href="${e.href}"
      rel="${e.rel}"
      target="${e.target}"
      label="${e.label}"
      ${o("active", e.active)}
      ${o("breadcrumb", e.breadcrumb)}
    />
  </calcite-menu>
`, c = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-start="${s[0]}" />
  </calcite-menu>`, n = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${s[0]}" />
  </calcite-menu>`, i = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${s[0]}" icon-start="${s[0]}" />
  </calcite-menu>`, l = () => t`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`, u = () => t`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`, r = () => t`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
      ...a.parameters?.docs?.source
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" />\n  </calcite-menu>`',
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>\``,
      ...l.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="\${SLOTS.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>\``,
      ...u.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />\``,
      ...r.parameters?.docs?.source
    }
  }
};
const $ = ["simple", "iconStart", "iconEnd", "iconsBoth", "allIconsAndSubMenu_TestOnly", "allIconsAndSubMenuVertical_TestOnly", "darkModeRTL_TestOnly"];
export {
  $ as __namedExportsOrder,
  u as allIconsAndSubMenuVertical_TestOnly,
  l as allIconsAndSubMenu_TestOnly,
  r as darkModeRTL_TestOnly,
  p as default,
  n as iconEnd,
  c as iconStart,
  i as iconsBoth,
  a as simple
};
