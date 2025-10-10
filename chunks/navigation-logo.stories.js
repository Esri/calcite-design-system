import { k as p, h as e } from "./index.js";
import { p as n } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const y = {
  title: "Components/Navigation/Navigation Logo",
  args: {
    description: "City of AcmeCo",
    heading: "ArcGIS Online",
    active: !1
  }
}, i = (m) => e`<calcite-navigation-logo
    description="${m.description}"
    heading="${m.heading}"
    thumbnail="${n({
  width: 50,
  height: 50
})}"
    ${p("active", m.active)}
  />`, a = () => e`<calcite-navigation-logo heading="ArcGIS Online" />`, t = () => e`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${n({
  width: 50,
  height: 50
})}"
  />`, o = () => e`<calcite-navigation-logo thumbnail="${n({
  width: 50,
  height: 50
})}" />`, r = () => e`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${n({
  width: 50,
  height: 50
})}" />`, c = () => e`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`, s = () => e`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${n({
  width: 50,
  height: 50
})}"
  />`, l = () => e`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="${n({
  width: 50,
  height: 50
})}"
  />`, g = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="${n({
  width: 50,
  height: 50
})}"
      slot="logo"
    />
  </calcite-navigation>
`, h = () => e`
  <calcite-navigation>
    <calcite-navigation-logo
      slot="logo"
      heading="A view of the estuary"
      icon="globe"
      href="https://www.esri.com"
      target="_blank"
      description="20 years of change where the river meets the sea"
    >
    </calcite-navigation-logo>
  </calcite-navigation>
`, d = () => e`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="${n({
  width: 50,
  height: 50
})}"
  />
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: NavigationLogoStoryArgs): string => html\`<calcite-navigation-logo
    description="\${args.description}"
    heading="\${args.heading}"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
    \${boolean("active", args.active)}
  />\``,
      ...i.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" />`',
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
      ...t.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`',
      ...c.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
      ...l.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
      slot="logo"
    />
  </calcite-navigation>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation>
    <calcite-navigation-logo
      slot="logo"
      heading="A view of the estuary"
      icon="globe"
      href="https://www.esri.com"
      target="_blank"
      description="20 years of change where the river meets the sea"
    >
    </calcite-navigation-logo>
  </calcite-navigation>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />
\``,
      ...d.parameters?.docs?.source
    }
  }
};
const A = ["simple", "heading_TestOnly", "description_TestOnly", "thumbnail_TestOnly", "headingAndThumbnail_TestOnly", "headingAndIcon_TestOnly", "descriptionAndThumbnail_TestOnly", "All_TestOnly", "slottedInNav_TestOnly", "withHref_TestOnly", "headingLevel_TestOnly"];
export {
  l as All_TestOnly,
  A as __namedExportsOrder,
  y as default,
  s as descriptionAndThumbnail_TestOnly,
  t as description_TestOnly,
  c as headingAndIcon_TestOnly,
  r as headingAndThumbnail_TestOnly,
  d as headingLevel_TestOnly,
  a as heading_TestOnly,
  i as simple,
  g as slottedInNav_TestOnly,
  o as thumbnail_TestOnly,
  h as withHref_TestOnly
};
