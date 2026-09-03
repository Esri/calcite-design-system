/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as y } from "./dom2.js";
import { b as _, c as q, m as D } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as F } from "./resources34.js";
import "./date-picker.js";
var E = {}, S = Object.freeze, L = Object.defineProperty, n = (a, w) => S(L(a, "raw", { value: S(a.slice()) })), f, x, $, A, P;
const {
  calendarCount: M,
  horizontalVerticalLayout: O,
  monthStyle: z,
  numberingSystemWithNone: B,
  scale: T,
  supportedNlsLocale: N
} = F, j = {
  title: "Components/Controls/DatePicker",
  args: {
    calendars: 2,
    dir: "",
    layout: "horizontal",
    lang: y,
    max: "",
    min: "",
    monthStyle: "wide",
    nextMonthLabel: "",
    numberingSystem: "",
    prevMonthLabel: "",
    range: !1,
    scale: T.defaultValue,
    value: "2020-02-28"
  },
  argTypes: {
    lang: {
      options: N.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    calendars: {
      options: M.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: O.values,
      control: {
        type: "select"
      }
    },
    monthStyle: {
      options: z.values,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: B.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(E.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, i = (a) => e`
  <div style="width: 400px">
    <calcite-date-picker
      dir="${a.dir}"
      lang="${a.lang}"
      calendars="${a.calendars}"
      layout="${a.layout}"
      max="${a.max}"
      min="${a.min}"
      month-style="${a.monthStyle}"
      numbering-system="${a.numberingSystem}"
      ${_("range", a.range)}
      scale="${a.scale}"
      value="${a.value}"
    ></calcite-date-picker>
  </div>
`, l = () => e`
  <div style="width: 400px">
    <calcite-date-picker
      lang="${y}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`, s = () => e`
  <div style="width: 400px">
    <calcite-date-picker lang="${y}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
`, d = () => e(f || (f = n([`
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
`]))), o = () => e(x || (x = n([`
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
`]))), p = () => e($ || ($ = n([`
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
`]))), m = () => e(A || (A = n([`
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
`]))), t = () => e(P || (P = n([`
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
      lang="${y}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;
c.parameters = {
  themes: D
};
const r = () => e`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
      ${[{
  label: "Arabic (ar):",
  lang: "ar"
}, {
  label: "Arabic (ar) + Arabic numbering system:",
  lang: "ar",
  numberingSystem: "arab"
}, {
  label: "Bulgarian (bg):",
  lang: "bg"
}, {
  label: "British English (en-gb):",
  lang: "en-gb"
}, {
  label: "Chinese (zh-cn):",
  lang: "zh-cn"
}, {
  label: "German (de):",
  lang: "de"
}, {
  label: "French Canadian (fr-CA):",
  lang: "fr-CA"
}, {
  label: "Norwegian (nb):",
  lang: "nb"
}, {
  label: "Portuguese (pt-PT):",
  lang: "pt-PT"
}, {
  label: "Spanish (es):",
  lang: "es"
}].map(({
  label: w,
  lang: C,
  numberingSystem: b
}) => e`
            <div>
              <strong>${w}</strong>
              <calcite-date-picker
                lang="${C}"
                value="2020-02-28"
                ${b ? `numbering-system="${b}"` : ""}
              ></calcite-date-picker>
            </div>
          `).join("")}
    </div>
  `;
r.parameters = {
  chromatic: {
    delay: 1e3,
    diffThreshold: 1
  }
};
const g = () => q(e`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`), k = () => e`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, v = () => e`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, h = () => e`
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
      calendars="\${args.calendars}"
      layout="\${args.layout}"
      max="\${args.max}"
      min="\${args.min}"
      month-style="\${args.monthStyle}"
      numbering-system="\${args.numberingSystem}"
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
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      ...l.parameters?.docs?.source
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
    <calcite-date-picker lang="\${defaultLocale}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
\``,
      ...s.parameters?.docs?.source
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
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
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
      ...p.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => {
  const locales = [{
    label: "Arabic (ar):",
    lang: "ar"
  }, {
    label: "Arabic (ar) + Arabic numbering system:",
    lang: "ar",
    numberingSystem: "arab"
  }, {
    label: "Bulgarian (bg):",
    lang: "bg"
  }, {
    label: "British English (en-gb):",
    lang: "en-gb"
  }, {
    label: "Chinese (zh-cn):",
    lang: "zh-cn"
  }, {
    label: "German (de):",
    lang: "de"
  }, {
    label: "French Canadian (fr-CA):",
    lang: "fr-CA"
  }, {
    label: "Norwegian (nb):",
    lang: "nb"
  }, {
    label: "Portuguese (pt-PT):",
    lang: "pt-PT"
  }, {
    label: "Spanish (es):",
    lang: "es"
  }];
  return html\`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
      \${locales.map(({
    label,
    lang,
    numberingSystem
  }) => html\`
            <div>
              <strong>\${label}</strong>
              <calcite-date-picker
                lang="\${lang}"
                value="2020-02-28"
                \${numberingSystem ? \`numbering-system="\${numberingSystem}"\` : ""}
              ></calcite-date-picker>
            </div>
          \`).join("")}
    </div>
  \`;
}`,
      ...r.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`)',
      ...g.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
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
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
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
      ...h.parameters?.docs?.source
    }
  }
};
const Y = ["simple", "range", "rangeOneCalendar", "rangeHighlighted", "rangeOneCalendarWithValue", "rangeValuesNotInSameMonthAndYear", "rangeOneCalendarValuesNotInSameMonthAndYear", "Focus", "rangeRTL", "darkModeRTL", "localized", "widthSetToBreakpoints", "defaultWidthAllScales", "smallerThanMinWidthAllScales", "greaterThanMaxWidthAllScales"];
export {
  t as Focus,
  Y as __namedExportsOrder,
  c as darkModeRTL,
  j as default,
  k as defaultWidthAllScales,
  h as greaterThanMaxWidthAllScales,
  r as localized,
  l as range,
  d as rangeHighlighted,
  s as rangeOneCalendar,
  m as rangeOneCalendarValuesNotInSameMonthAndYear,
  o as rangeOneCalendarWithValue,
  u as rangeRTL,
  p as rangeValuesNotInSameMonthAndYear,
  i as simple,
  v as smallerThanMinWidthAllScales,
  g as widthSetToBreakpoints
};
