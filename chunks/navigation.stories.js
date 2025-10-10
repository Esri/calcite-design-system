import { h as t } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const u = {
  title: "Components/Navigation/Navigation"
}, e = () => t`
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
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`, i = () => t`
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
`, c = () => t`
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
`, a = () => t`
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
    `, n = () => t`
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
`, l = () => t`
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
`, m = () => t`
  <calcite-navigation navigation-action>
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
`, o = () => t`<calcite-navigation></calcite-navigation>`;
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
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
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
\``,
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
  <calcite-navigation navigation-action>
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
const r = ["simple", "primarySlots_TestOnly", "primaryAndSecondarySlots_TestOnly", "primaryWithAllLogoAndUserSlots_TestOnly", "allSlots_TestOnly", "allSlots_darkModeRTL_TestOnly", "withBothNavActionPropAndSlot_TestOnly", "WithNoSlottedContent_TestOnly"];
export {
  o as WithNoSlottedContent_TestOnly,
  r as __namedExportsOrder,
  n as allSlots_TestOnly,
  l as allSlots_darkModeRTL_TestOnly,
  u as default,
  c as primaryAndSecondarySlots_TestOnly,
  i as primarySlots_TestOnly,
  a as primaryWithAllLogoAndUserSlots_TestOnly,
  e as simple,
  m as withBothNavActionPropAndSlot_TestOnly
};
