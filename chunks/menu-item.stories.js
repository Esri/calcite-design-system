/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { o as x, b as c } from "./utils3.js";
import { i as n } from "./helpers.js";
import { h as t } from "./formatting.js";
import { S as m } from "./resources20.js";
import "./menu.js";
import "./menu-item.js";
const g = {
  title: "Components/Menu Item",
  args: {
    text: "Menu item",
    src: "",
    href: "",
    rel: "",
    target: "",
    iconStart: "",
    iconEnd: "",
    iconFlipRtl: !1,
    label: "",
    active: !1,
    breadcrumb: !1,
    open: !1
  },
  argTypes: {
    iconStart: {
      options: ["", ...n],
      control: {
        type: "select"
      }
    },
    iconEnd: {
      options: ["", ...n],
      control: {
        type: "select"
      }
    }
  }
}, a = (e) => t`
  <calcite-menu>
    <calcite-menu-item
      text="${e.text}"
      src="${e.src}"
      href="${e.href}"
      rel="${e.rel}"
      target="${e.target}"
      ${x("icon-start", e.iconStart)}
      ${x("icon-end", e.iconEnd)}
      ${c("icon-flip-rtl", !!e.iconFlipRtl)}
      label="${e.label}"
      ${c("active", e.active)}
      ${c("breadcrumb", e.breadcrumb)}
      ${c("open", e.open)}
    />
  </calcite-menu>
`, i = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-start="${n[0]}" />
  </calcite-menu>`, l = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${n[0]}" />
  </calcite-menu>`, r = () => t`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${n[0]}" icon-start="${n[0]}" />
  </calcite-menu>`, u = () => t`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`, o = () => t`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="${m.submenuItem}" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`, s = () => t`<calcite-menu-item
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
      \${optionalAttribute("icon-start", args.iconStart)}
      \${optionalAttribute("icon-end", args.iconEnd)}
      \${boolean("icon-flip-rtl", !!args.iconFlipRtl)}
      label="\${args.label}"
      \${boolean("active", args.active)}
      \${boolean("breadcrumb", args.breadcrumb)}
      \${boolean("open", args.open)}
    />
  </calcite-menu>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" />\n  </calcite-menu>`',
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',
      ...r.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
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
      ...u.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />\``,
      ...s.parameters?.docs?.source
    }
  }
};
const I = ["simple", "iconStart", "iconEnd", "iconsBoth", "allIconsAndSubMenu", "allIconsAndSubMenuVertical", "darkModeRTL"];
export {
  I as __namedExportsOrder,
  u as allIconsAndSubMenu,
  o as allIconsAndSubMenuVertical,
  s as darkModeRTL,
  g as default,
  l as iconEnd,
  i as iconStart,
  r as iconsBoth,
  a as simple
};
