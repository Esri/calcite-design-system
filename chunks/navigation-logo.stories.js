/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as u, o as p } from "./utils3.js";
import { i as v } from "./helpers.js";
import { A } from "./resources34.js";
import { s as i } from "./index3.js";
import { h as e } from "./formatting.js";
import "./navigation.js";
import "./navigation-logo.js";
const {
  headingLevel: b
} = A, O = {
  title: "Components/Navigation/Navigation Logo",
  args: {
    active: !1,
    description: "City of AcmeCo",
    heading: "ArcGIS Online",
    icon: ""
  },
  argTypes: {
    icon: {
      options: ["", ...v],
      control: {
        type: "select"
      }
    },
    headingLevel: {
      options: b.values,
      control: {
        type: "select"
      }
    }
  }
}, n = (a) => e`<calcite-navigation-logo
    ${u("active", a.active)}
    description="${a.description}"
    heading="${a.heading}"
    ${p("heading-level", a.headingLevel)}
    ${p("icon", a.icon)}
    thumbnail="${i({
  width: 50,
  height: 50
})}"
  />`, o = () => e`<calcite-navigation-logo heading="ArcGIS Online" />`, t = () => e`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${i({
  width: 50,
  height: 50
})}"
  />`, r = () => e`<calcite-navigation-logo thumbnail="${i({
  width: 50,
  height: 50
})}" />`, c = () => e`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${i({
  width: 50,
  height: 50
})}" />`, s = () => e`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`, l = () => e`<calcite-navigation-logo
    description="City of AcmeCo"
    thumbnail="${i({
  width: 50,
  height: 50
})}"
  />`, g = () => e`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="${i({
  width: 50,
  height: 50
})}"
  />`, h = () => e`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo
      heading="ArcGIS Online"
      description="City of AcmeCo"
      thumbnail="${i({
  width: 50,
  height: 50
})}"
      slot="logo"
    />
  </calcite-navigation>
`, d = () => e`
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
`, m = () => e`
  <calcite-navigation-logo
    heading="ArcGIS Online"
    heading-level="1"
    description="City of AcmeCo"
    thumbnail="${i({
  width: 50,
  height: 50
})}"
  />
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: NavigationLogoStoryArgs): string => html\`<calcite-navigation-logo
    \${boolean("active", args.active)}
    description="\${args.description}"
    heading="\${args.heading}"
    \${optionalAttribute("heading-level", args.headingLevel)}
    \${optionalAttribute("icon", args.icon)}
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" />`',
      ...o.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" thumbnail="${placeholderImage({\n  width: 50,\n  height: 50\n})}" />`',
      ...c.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-navigation-logo heading="ArcGIS Online" icon="link-chart" />`',
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
      originalSource: `(): string => html\`<calcite-navigation-logo
    icon="link-chart"
    heading="ArcGIS Online"
    description="City of AcmeCo"
    thumbnail="\${placeholderImage({
  width: 50,
  height: 50
})}"
  />\``,
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
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
      ...m.parameters?.docs?.source
    }
  }
};
const G = ["simple", "heading", "description", "thumbnail", "headingAndThumbnail", "headingAndIcon", "descriptionAndThumbnail", "All", "slottedInNav", "withHref", "headingLevel"];
export {
  g as All,
  G as __namedExportsOrder,
  O as default,
  t as description,
  l as descriptionAndThumbnail,
  o as heading,
  s as headingAndIcon,
  c as headingAndThumbnail,
  m as headingLevel,
  n as simple,
  h as slottedInNav,
  r as thumbnail,
  d as withHref
};
