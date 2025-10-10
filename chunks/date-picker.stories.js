import { h as e, n as F, k as E, j as M } from "./index.js";
import { c as C, d as f } from "./locale.js";
import { A as W } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var I = {}, b = Object.freeze, N = Object.defineProperty, i = (a, R) => b(N(a, "raw", { value: b(a.slice()) })), L, A, P, $, q;
const {
  scale: D
} = W, z = {
  title: "Components/Controls/DatePicker",
  args: {
    dir: "",
    lang: f,
    max: "",
    min: "",
    nextMonthLabel: "",
    prevMonthLabel: "",
    range: !1,
    scale: D.defaultValue,
    value: "2020-02-28"
  },
  argTypes: {
    lang: {
      options: C,
      control: {
        type: "select"
      }
    },
    scale: {
      options: D.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(I.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, s = (a) => e`
  <div style="width: 400px">
    <calcite-date-picker
      dir="${a.dir}"
      lang="${a.lang}"
      max="${a.max}"
      min="${a.min}"
      ${E("range", a.range)}
      scale="${a.scale}"
      value="${a.value}"
    ></calcite-date-picker>
  </div>
`, n = () => e`
  <div style="width: 400px">
    <calcite-date-picker
      lang="${f}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`, l = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="${f}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
`, d = () => e(L || (L = i([`
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
`]))), p = () => e(A || (A = i([`
  <div style="width: 400px">
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
`]))), o = () => e(P || (P = i([`
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
`]))), m = () => e($ || ($ = i([`
  <div style="width: 400px">
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
`]))), t = () => e(q || (q = i([`
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
const u = () => e`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
`, c = () => e`
  <div style="width: 400px">
    <calcite-date-picker
      dir="rtl"
      class="calcite-mode-dark"
      lang="${f}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;
c.parameters = {
  themes: M
};
const k = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="bg" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`, v = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="pt-PT" scale="m" value="2020-02-28"></calcite-date-picker>
  </div>
`, g = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="de" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
`, h = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="es" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`, y = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="nb" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
`, w = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="en-gb" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
`, T = () => e`
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
const S = () => F(e`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`), _ = () => e`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, x = () => e`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, O = () => e`
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
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
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
    <calcite-date-picker
      lang="\${defaultLocale}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
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
  <div style="width: 400px">
    <calcite-date-picker lang="\${defaultLocale}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
\``,
      ...l.parameters?.docs?.source
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
      ...d.parameters?.docs?.source
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
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2020-02-14", "2020-02-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
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
    <calcite-date-picker range calendars="1"></calcite-date-picker>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-date-picker");
      document.querySelector("calcite-date-picker").value = ["2024-02-14", "2025-01-28"];
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    })();
  <\/script>
\``,
      ...m.parameters?.docs?.source
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
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
\``,
      ...u.parameters?.docs?.source
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
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px">
    <calcite-date-picker lang="bg" scale="m" value="2020-02-28"></calcite-date-picker>
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
    <calcite-date-picker lang="pt-PT" scale="m" value="2020-02-28"></calcite-date-picker>
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
    <calcite-date-picker lang="de" scale="m" value="2022-08-11"></calcite-date-picker>
  </div>
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
  <div style="width: 400px">
    <calcite-date-picker lang="es" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
\``,
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
  <div style="width: 400px">
    <calcite-date-picker lang="nb" scale="m" value="2023-05-11"></calcite-date-picker>
  </div>
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
  <div style="width: 400px">
    <calcite-date-picker lang="en-gb" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
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
  <div style="width: 400px">
    <calcite-date-picker lang="zh-cn" scale="m" value="2024-01-11"></calcite-date-picker>
  </div>
\``,
      ...T.parameters?.docs?.source
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
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`)',
      ...S.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ..._.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
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
      ...x.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
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
      ...O.parameters?.docs?.source
    }
  }
};
const Y = ["simple", "range", "rangeOneCalendar", "rangeHighlighted_TestOnly", "rangeOneCalendarWithValue", "rangeValuesNotInSameMonthAndYear_TestOnly", "rangeOneCalendarValuesNotInSameMonthAndYear", "Focus", "rangeRTL_TestOnly", "darkModeRTL_TestOnly", "bgLang_TestOnly", "ptPTLang_TestOnly", "germanLang_TestOnly", "spanishLang_TestOnly", "norwegianLang_TestOnly", "britishLang_TestOnly", "chineseLang_TestOnly", "arabLangNumberingSystem_TestOnly", "widthSetToBreakpoints_TestOnly", "defaultWidthAllScales_TestOnly", "smallerThanMinWidthAllScales_TestOnly", "greaterThanMaxWidthAllScales_TestOnly"];
export {
  t as Focus,
  Y as __namedExportsOrder,
  r as arabLangNumberingSystem_TestOnly,
  k as bgLang_TestOnly,
  w as britishLang_TestOnly,
  T as chineseLang_TestOnly,
  c as darkModeRTL_TestOnly,
  z as default,
  _ as defaultWidthAllScales_TestOnly,
  g as germanLang_TestOnly,
  O as greaterThanMaxWidthAllScales_TestOnly,
  y as norwegianLang_TestOnly,
  v as ptPTLang_TestOnly,
  n as range,
  d as rangeHighlighted_TestOnly,
  l as rangeOneCalendar,
  m as rangeOneCalendarValuesNotInSameMonthAndYear,
  p as rangeOneCalendarWithValue,
  u as rangeRTL_TestOnly,
  o as rangeValuesNotInSameMonthAndYear_TestOnly,
  s as simple,
  x as smallerThanMinWidthAllScales_TestOnly,
  h as spanishLang_TestOnly,
  S as widthSetToBreakpoints_TestOnly
};
