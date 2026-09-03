/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as z } from "./dom2.js";
import { d as I } from "./locale.js";
import { c as a, b as T, m as N } from "./utils3.js";
import { h as S } from "./formatting.js";
import { A as L } from "./resources34.js";
import "./pagination.js";
const {
  numberingSystem: v,
  scale: f,
  supportedNlsLocale: P
} = L, F = {
  title: "Components/Pagination",
  args: {
    scale: f.defaultValue,
    startItem: 1,
    lang: z,
    numberingSystem: v.defaultValue,
    groupSeparator: !1,
    totalItems: 123456789,
    pageSize: 10
  },
  argTypes: {
    scale: {
      options: f.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: P.values,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: v.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, o = (e) => S`
  <style>
    .sb-show-main.sb-main-centered #storybook-root {
      padding: 0 !important;
      flex: 1;
      width: 100%;
    }
  </style>
  <calcite-pagination
    scale="${e.scale}"
    start-item="${e.startItem}"
    lang="${e.lang}"
    numbering-system="${e.numberingSystem}"
    ${T("group-separator", e.groupSeparator)}
    total-items="${e.totalItems}"
    page-size="${e.pageSize}"
  >
  </calcite-pagination>
`, t = ({
  totalItems: e,
  pageSize: y,
  type: b
}) => S`
    <calcite-pagination
      lang="${z}"
      numbering-system="${I}"
      total-items="${e}"
      page-size="${y}"
      start-item="${b === "last" ? e - y + 1 : b === "middle" ? e / 2 - Math.max(y / 2, 1) + 1 : 1}"
      scale="{scale}"
    ></calcite-pagination>
  `, n = () => a(t({
  totalItems: 15e4,
  pageSize: 100,
  type: "first"
})), i = () => a(t({
  totalItems: 15e4,
  pageSize: 100,
  type: "middle"
})), p = () => a(t({
  totalItems: 15e4,
  pageSize: 100,
  type: "last"
})), m = () => a(t({
  totalItems: 50,
  pageSize: 10,
  type: "first"
})), c = () => a(t({
  totalItems: 50,
  pageSize: 10,
  type: "middle"
})), l = () => a(t({
  totalItems: 50,
  pageSize: 10,
  type: "last"
})), g = () => a(t({
  totalItems: 12,
  pageSize: 1,
  type: "first"
})), d = () => a(t({
  totalItems: 12,
  pageSize: 1,
  type: "middle"
})), u = () => a(t({
  totalItems: 12,
  pageSize: 1,
  type: "last"
})), s = () => S`
  <calcite-pagination
    class="calcite-mode-dark"
    start-item="1"
    lang="fr"
    group-separator
    total-items="123456789"
    page-size="10"
    scale="l"
  >
  </calcite-pagination>
`;
s.parameters = {
  themes: N
};
const r = () => S`<calcite-pagination
    dir="rtl"
    numbering-system="arab"
    start-item="1"
    lang="fr"
    total-items="123456789"
    page-size="10"
  >
  </calcite-pagination>`;
r.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: PaginationStoryArgs): string => html\`
  <style>
    .sb-show-main.sb-main-centered #storybook-root {
      padding: 0 !important;
      flex: 1;
      width: 100%;
    }
  </style>
  <calcite-pagination
    scale="\${args.scale}"
    start-item="\${args.startItem}"
    lang="\${args.lang}"
    numbering-system="\${args.numberingSystem}"
    \${boolean("group-separator", args.groupSeparator)}
    total-items="\${args.totalItems}"
    page-size="\${args.pageSize}"
  >
  </calcite-pagination>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 150000,
  pageSize: 100,
  type: "first"
}))`,
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 150000,
  pageSize: 100,
  type: "middle"
}))`,
      ...i.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 150000,
  pageSize: 100,
  type: "last"
}))`,
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 50,
  pageSize: 10,
  type: "first"
}))`,
      ...m.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 50,
  pageSize: 10,
  type: "middle"
}))`,
      ...c.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 50,
  pageSize: 10,
  type: "last"
}))`,
      ...l.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 12,
  pageSize: 1,
  type: "first"
}))`,
      ...g.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 12,
  pageSize: 1,
  type: "middle"
}))`,
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 12,
  pageSize: 1,
  type: "last"
}))`,
      ...u.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-pagination
    class="calcite-mode-dark"
    start-item="1"
    lang="fr"
    group-separator
    total-items="123456789"
    page-size="10"
    scale="l"
  >
  </calcite-pagination>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-pagination
    dir="rtl"
    numbering-system="arab"
    start-item="1"
    lang="fr"
    total-items="123456789"
    page-size="10"
  >
  </calcite-pagination>\``,
      ...r.parameters?.docs?.source
    }
  }
};
const A = ["simple", "responsiveLargeNumberFirstPage", "responsiveLargeNumberMiddlePage", "responsiveLargeNumberLastPage", "responsiveSmallNumberFirstPage", "responsiveSmallNumberMiddlePage", "responsiveSmallNumberLastPage", "responsiveTinyNumberFirstPage", "responsiveTinyNumberMiddlePage", "responsiveTinyNumberLastPage", "darkModeFrenchLocaleAndLargeScaleGetsMediumChevron", "arabicNumberingSystemAndRTL"];
export {
  A as __namedExportsOrder,
  r as arabicNumberingSystemAndRTL,
  s as darkModeFrenchLocaleAndLargeScaleGetsMediumChevron,
  F as default,
  n as responsiveLargeNumberFirstPage,
  p as responsiveLargeNumberLastPage,
  i as responsiveLargeNumberMiddlePage,
  m as responsiveSmallNumberFirstPage,
  l as responsiveSmallNumberLastPage,
  c as responsiveSmallNumberMiddlePage,
  g as responsiveTinyNumberFirstPage,
  u as responsiveTinyNumberLastPage,
  d as responsiveTinyNumberMiddlePage,
  o as simple
};
