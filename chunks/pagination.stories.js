import { e as _, c as f, f as v, d as z } from "./locale.js";
import { n as t, h as y, j as I } from "./index.js";
import { A as O } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: b
} = O, L = {
  title: "Components/Pagination",
  args: {
    scale: b.defaultValue,
    startItem: 1,
    lang: z,
    numberingSystem: v,
    totalItems: 123456789,
    pageSize: 10
  },
  argTypes: {
    scale: {
      options: b.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: f,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: _,
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
}, n = (e) => y`
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
    total-items="${e.totalItems}"
    page-size="${e.pageSize}"
  >
  </calcite-pagination>
`, a = ({
  totalItems: e,
  pageSize: S,
  type: T
}) => y`
    <calcite-pagination
      lang="${z}"
      numbering-system="${v}"
      total-items="${e}"
      page-size="${S}"
      start-item="${T === "last" ? e - S + 1 : T === "middle" ? e / 2 - Math.max(S / 2, 1) + 1 : 1}"
      scale="{scale}"
    ></calcite-pagination>
  `, i = () => t(a({
  totalItems: 15e4,
  pageSize: 100,
  type: "first"
})), o = () => t(a({
  totalItems: 15e4,
  pageSize: 100,
  type: "middle"
})), m = () => t(a({
  totalItems: 15e4,
  pageSize: 100,
  type: "last"
})), l = () => t(a({
  totalItems: 50,
  pageSize: 10,
  type: "first"
})), p = () => t(a({
  totalItems: 50,
  pageSize: 10,
  type: "middle"
})), c = () => t(a({
  totalItems: 50,
  pageSize: 10,
  type: "last"
})), g = () => t(a({
  totalItems: 12,
  pageSize: 1,
  type: "first"
})), d = () => t(a({
  totalItems: 12,
  pageSize: 1,
  type: "middle"
})), u = () => t(a({
  totalItems: 12,
  pageSize: 1,
  type: "last"
})), s = () => y`
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
  themes: I
};
const r = () => y`<calcite-pagination
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
    total-items="\${args.totalItems}"
    page-size="\${args.pageSize}"
  >
  </calcite-pagination>
\``,
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
  type: "first"
}))`,
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 150000,
  pageSize: 100,
  type: "middle"
}))`,
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 150000,
  pageSize: 100,
  type: "last"
}))`,
      ...m.parameters?.docs?.source
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
  type: "first"
}))`,
      ...l.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(getResponsiveTemplate({
  totalItems: 50,
  pageSize: 10,
  type: "middle"
}))`,
      ...p.parameters?.docs?.source
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
  type: "last"
}))`,
      ...c.parameters?.docs?.source
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
const k = ["simple", "responsiveLargeNumberFirstPage_TestOnly", "responsiveLargeNumberMiddlePage_TestOnly", "responsiveLargeNumberLastPage_TestOnly", "responsiveSmallNumberFirstPage_TestOnly", "responsiveSmallNumberMiddlePage_TestOnly", "responsiveSmallNumberLastPage_TestOnly", "responsiveTinyNumberFirstPage_TestOnly", "responsiveTinyNumberMiddlePage_TestOnly", "responsiveTinyNumberLastPage_TestOnly", "darkModeFrenchLocaleAndLargeScaleGetsMediumChevron_TestOnly", "arabicNumberingSystemAndRTL_TestOnly"];
export {
  k as __namedExportsOrder,
  r as arabicNumberingSystemAndRTL_TestOnly,
  s as darkModeFrenchLocaleAndLargeScaleGetsMediumChevron_TestOnly,
  L as default,
  i as responsiveLargeNumberFirstPage_TestOnly,
  m as responsiveLargeNumberLastPage_TestOnly,
  o as responsiveLargeNumberMiddlePage_TestOnly,
  l as responsiveSmallNumberFirstPage_TestOnly,
  c as responsiveSmallNumberLastPage_TestOnly,
  p as responsiveSmallNumberMiddlePage_TestOnly,
  g as responsiveTinyNumberFirstPage_TestOnly,
  u as responsiveTinyNumberLastPage_TestOnly,
  d as responsiveTinyNumberMiddlePage_TestOnly,
  n as simple
};
