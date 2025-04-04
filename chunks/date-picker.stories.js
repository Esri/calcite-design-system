import { c as $, b as P, m as A } from "./utils.js";
import { h as e } from "./formatting.js";
import { c as D, d as _ } from "./locale.js";
import { A as M } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.2 */
var q = {}, S = Object.freeze, F = Object.defineProperty, x = (a, E) => S(F(a, "raw", { value: S(a.slice()) })), O, b, f;
const {
  scale: L
} = M, I = {
  title: "Components/Controls/DatePicker",
  args: {
    dir: "",
    lang: _,
    max: "",
    min: "",
    nextMonthLabel: "",
    prevMonthLabel: "",
    range: !1,
    scale: L.defaultValue,
    value: "2020-02-28"
  },
  argTypes: {
    lang: {
      options: D,
      control: {
        type: "select"
      }
    },
    scale: {
      options: L.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(q.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, i = (a) => e`
  <div style="width: 400px">
    <calcite-date-picker
      dir="${a.dir}"
      lang="${a.lang}"
      max="${a.max}"
      min="${a.min}"
      ${P("range", a.range)}
      scale="${a.scale}"
      value="${a.value}"
    ></calcite-date-picker>
  </div>
`, s = () => e`
  <div style="width: 400px">
    <calcite-date-picker
      lang="${_}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`, l = () => e(O || (O = x([`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
`]))), n = () => e(b || (b = x([`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
`]))), t = () => e(f || (f = x([`
  <div style="width: 400px">
    <calcite-date-picker value="2020-01-01"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      const datePicker = document.querySelector("calcite-date-picker");
      await datePicker.setFocus();
    })();
  <\/script>
`])));
t.parameters = {
  chromatic: {
    delay: 2e3
  }
};
const d = () => e`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
`, c = () => e`
  <div style="width: 400px">
    <calcite-date-picker
      dir="rtl"
      class="calcite-mode-dark"
      lang="${_}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;
c.parameters = {
  themes: A
};
const p = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="bg" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`, o = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="pt-PT" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`, m = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="de" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
`, u = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="es" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`, k = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="nb" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`, v = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="en-gb" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
`, g = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="zh-cn" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
`, r = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="ar" numbering-system="arab" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
`;
r.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const h = () => $(e`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`), y = () => e`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, w = () => e`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, T = () => e`
  <style>
    calcite-date-picker {
      width: 1000px;
      display: block;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`;
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: DatePickerStoryArgs): string => html\`
  <div style="width: 400px">
    <calcite-date-picker
      dir="\${args.dir}"
      lang="\${args.lang}"
      max="\${args.max}"
      min="\${args.min}"
      \${boolean("range", args.range)}
      scale="\${args.scale}"
      value="\${args.value}"
    ></calcite-date-picker>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker
      lang="\${defaultLocale}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker range></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker value="2020-01-01"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      const datePicker = document.querySelector("calcite-date-picker");
      await datePicker.setFocus();
    })();
  <\/script>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker
      dir="rtl"
      class="calcite-mode-dark"
      lang="\${defaultLocale}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="bg" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="pt-PT" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="de" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="es" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="nb" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="en-gb" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="zh-cn" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="ar" numbering-system="arab" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`)',
      ...h.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-date-picker {
      width: 1000px;
      display: block;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
const N = ["simple", "range", "rangeHighlighted_TestOnly", "rangeValuesNotInSameMonthAndYear_TestOnly", "Focus", "rangeRTL_TestOnly", "darkModeRTL_TestOnly", "bgLang_TestOnly", "ptPTLang_TestOnly", "germanLang_TestOnly", "spanishLang_TestOnly", "norwegianLang_TestOnly", "britishLang_TestOnly", "chineseLang_TestOnly", "arabLangNumberingSystem_TestOnly", "widthSetToBreakpoints_TestOnly", "defaultWidthAllScales_TestOnly", "smallerThanMinWidthAllScales_TestOnly", "greaterThanMaxWidthAllScales_TestOnly"];
export {
  t as Focus,
  N as __namedExportsOrder,
  r as arabLangNumberingSystem_TestOnly,
  p as bgLang_TestOnly,
  v as britishLang_TestOnly,
  g as chineseLang_TestOnly,
  c as darkModeRTL_TestOnly,
  I as default,
  y as defaultWidthAllScales_TestOnly,
  m as germanLang_TestOnly,
  T as greaterThanMaxWidthAllScales_TestOnly,
  k as norwegianLang_TestOnly,
  o as ptPTLang_TestOnly,
  s as range,
  l as rangeHighlighted_TestOnly,
  d as rangeRTL_TestOnly,
  n as rangeValuesNotInSameMonthAndYear_TestOnly,
  i as simple,
  w as smallerThanMinWidthAllScales_TestOnly,
  u as spanishLang_TestOnly,
  h as widthSetToBreakpoints_TestOnly
};
