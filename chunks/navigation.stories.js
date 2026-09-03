/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as r } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as g } from "./resources34.js";
import "./action.js";
import "./menu.js";
import "./menu-item.js";
import "./navigation.js";
import "./navigation-logo.js";
import "./navigation-user.js";
const {
  scale: u
} = g, f = {
  title: "Components/Navigation/Navigation",
  args: {
    label: "Label",
    navigationAction: !1,
    scale: u.defaultValue
  },
  argTypes: {
    scale: {
      options: u.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (s) => e`
  <calcite-navigation
    label="${s.label}"
    ${r("navigation-action", s.navigationAction)}
    scale="${s.scale}"
  >
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`, i = () => e`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-center">
      <calcite-menu-item text="Contact"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`, c = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" text-enabled full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="dashboard" text="Dashboard"></calcite-menu-item>
        <calcite-menu-item icon-start="utility-network-trace" text="Distributors"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Stockists"></calcite-menu-item>
        <calcite-menu-item active icon-start="credit-card" text="Sales"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="US Sales"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="International Sales"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`, a = () => e`
      <calcite-navigation style="--calcite-color-brand: #bf390f">
        <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
        </calcite-navigation-logo>
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Potatoes"></calcite-menu-item>
          <calcite-menu-item active text="Chips"></calcite-menu-item>
          <calcite-menu-item text="Employees"></calcite-menu-item>
          <calcite-menu-item text="Suppliers"></calcite-menu-item>
        </calcite-menu>
        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="m_chipson></calcite-navigation-user>
      </calcite-navigation>
    `, n = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
        <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
        <calcite-menu-item active text="Sorel Pesto"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
        <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
    <calcite-navigation slot="navigation-tertiary">
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`, l = () => e`
  <div class="calcite-mode-dark" dir="rtl">
    <calcite-navigation style="--calcite-color-brand: #bf390f">
      <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
      </calcite-navigation-logo>
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Potatoes"></calcite-menu-item>
        <calcite-menu-item active text="Chips"></calcite-menu-item>
        <calcite-menu-item text="Employees"></calcite-menu-item>
        <calcite-menu-item text="Suppliers"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Support"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
          <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
          <calcite-menu-item active text="Sorel Pesto"> </calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
          <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
          <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  </div>
`, m = () => e`
  <calcite-navigation>
    <calcite-action icon="layers" appearance="solid" slot="navigation-action" text="anvesh" scale="m"></calcite-action>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`, o = () => e`<calcite-navigation></calcite-navigation>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: NavigationStoryArgs): string => html\`
  <calcite-navigation
    label="\${args.label}"
    \${boolean("navigation-action", args.navigationAction)}
    scale="\${args.scale}"
  >
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-center">
      <calcite-menu-item text="Contact"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" text-enabled full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="dashboard" text="Dashboard"></calcite-menu-item>
        <calcite-menu-item icon-start="utility-network-trace" text="Distributors"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Stockists"></calcite-menu-item>
        <calcite-menu-item active icon-start="credit-card" text="Sales"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="US Sales"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="International Sales"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
      <calcite-navigation style="--calcite-color-brand: #bf390f">
        <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
        </calcite-navigation-logo>
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Potatoes"></calcite-menu-item>
          <calcite-menu-item active text="Chips"></calcite-menu-item>
          <calcite-menu-item text="Employees"></calcite-menu-item>
          <calcite-menu-item text="Suppliers"></calcite-menu-item>
        </calcite-menu>
        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="m_chipson></calcite-navigation-user>
      </calcite-navigation>
    \``,
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
        <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
        <calcite-menu-item active text="Sorel Pesto"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
        <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
    <calcite-navigation slot="navigation-tertiary">
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
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
      originalSource: `(): string => html\`
  <div class="calcite-mode-dark" dir="rtl">
    <calcite-navigation style="--calcite-color-brand: #bf390f">
      <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
      </calcite-navigation-logo>
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Potatoes"></calcite-menu-item>
        <calcite-menu-item active text="Chips"></calcite-menu-item>
        <calcite-menu-item text="Employees"></calcite-menu-item>
        <calcite-menu-item text="Suppliers"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Support"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
          <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
          <calcite-menu-item active text="Sorel Pesto"> </calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
          <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
          <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation>
    <calcite-action icon="layers" appearance="solid" slot="navigation-action" text="anvesh" scale="m"></calcite-action>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-navigation></calcite-navigation>`",
      ...o.parameters?.docs?.source
    }
  }
};
const W = ["simple", "primarySlots", "primaryAndSecondarySlots", "primaryWithAllLogoAndUserSlots", "allSlots", "allSlots_darkModeRTL", "withNavActionSlot", "WithNoSlottedContent"];
export {
  o as WithNoSlottedContent,
  W as __namedExportsOrder,
  n as allSlots,
  l as allSlots_darkModeRTL,
  f as default,
  c as primaryAndSecondarySlots,
  i as primarySlots,
  a as primaryWithAllLogoAndUserSlots,
  t as simple,
  m as withNavActionSlot
};
