/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { d as h, s as _ } from "./intl.js";
import { b as z, c as P, m as T } from "./utils2.js";
import { h as a } from "./formatting.js";
import { A as D } from "./resources34.js";
import "./date-picker.js";
var L = {}, S = Object.freeze, F = Object.defineProperty, i = (e, w) => S(F(e, "raw", { value: S(e.slice()) })), x, f, $, b, A;
const {
  calendarCount: E,
  horizontalVerticalLayout: M,
  monthStyle: O,
  numberingSystemWithNone: C,
  scale: q,
  supportedNlsLocale: V
} = D, H = {
  title: "Components/Controls/DatePicker",
  args: {
    calendars: 2,
    dir: "",
    layout: "horizontal",
    lang: h,
    max: "",
    min: "",
    monthStyle: "wide",
    nextMonthLabel: "",
    numberingSystem: "",
    prevMonthLabel: "",
    range: !1,
    scale: q.defaultValue,
    value: "2020-02-28"
  },
  argTypes: {
    lang: {
      options: V.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: q.values,
      control: {
        type: "select"
      }
    },
    calendars: {
      options: E.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: M.values,
      control: {
        type: "select"
      }
    },
    monthStyle: {
      options: O.values,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: C.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(L.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, n = (e) => a`
  <div style="width: 400px">
    <calcite-date-picker
      dir="${e.dir}"
      lang="${e.lang}"
      calendars="${e.calendars}"
      layout="${e.layout}"
      max="${e.max}"
      min="${e.min}"
      month-style="${e.monthStyle}"
      numbering-system="${e.numberingSystem}"
      ${z("range", e.range)}
      scale="${e.scale}"
      value="${e.value}"
    ></calcite-date-picker>
  </div>
`, l = () => a`
  <div style="width: 400px">
    <calcite-date-picker
      lang="${h}"
      min="2016-08-09"
      range
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`, s = () => a`
  <div style="width: 400px">
    <calcite-date-picker lang="${h}" min="2099-08-09" range scale="m" calendars="1"></calcite-date-picker>
  </div>
`, d = () => a(x || (x = i([`
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
`]))), o = () => a(f || (f = i([`
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
`]))), p = () => a($ || ($ = i([`
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
`]))), m = () => a(b || (b = i([`
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
`]))), t = () => a(A || (A = i([`
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
const u = () => a`
  <div style="width: 400px">
    <calcite-date-picker value="2020-02-28" dir="rtl" range></calcite-date-picker>
  </div>
`, r = () => a`
  <div style="width: 400px">
    <calcite-date-picker
      dir="rtl"
      class="calcite-mode-dark"
      lang="${h}"
      scale="m"
      value="2020-02-28"
    ></calcite-date-picker>
  </div>
`;
r.parameters = {
  themes: T
};
const c = () => a`
    <style>
      .localized-calendars {
        display: grid;
        grid-template-columns: repeat(4, 300px);
        gap: 24px;
      }

      .localized-calendar {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .localized-calendar calcite-date-picker {
        width: 300px;
      }
    </style>
    <div class="localized-calendars">
      ${[..._].map((e) => a`
            <div class="localized-calendar">
              <strong>${e}</strong>
              <calcite-date-picker lang="${e}" value="2020-02-28"></calcite-date-picker>
            </div>
          `).join("")}
      <div class="localized-calendar">
        <strong>Arabic (ar) + Arabic numbering system:</strong>
        <calcite-date-picker lang="ar" numbering-system="arab" value="2020-02-28"></calcite-date-picker>
      </div>
    </div>
  `;
c.play = async ({
  canvasElement: e
}) => {
  await Promise.all(Array.from(e.querySelectorAll("calcite-date-picker"), (w) => w.componentOnReady()));
};
c.parameters = {
  chromatic: {
    delay: 2e3,
    cropToViewport: !1
  }
};
const k = () => P(a`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`), v = () => a`
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, g = () => a`
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
`, y = () => a`
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      ...r.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return html\`
    <style>
      .localized-calendars {
        display: grid;
        grid-template-columns: repeat(4, 300px);
        gap: 24px;
      }

      .localized-calendar {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .localized-calendar calcite-date-picker {
        width: 300px;
      }
    </style>
    <div class="localized-calendars">
      \${[...supportedLocales].map(locale => html\`
            <div class="localized-calendar">
              <strong>\${locale}</strong>
              <calcite-date-picker lang="\${locale}" value="2020-02-28"></calcite-date-picker>
            </div>
          \`).join("")}
      <div class="localized-calendar">
        <strong>Arabic (ar) + Arabic numbering system:</strong>
        <calcite-date-picker lang="ar" numbering-system="arab" value="2020-02-28"></calcite-date-picker>
      </div>
    </div>
  \`;
}`,
      ...c.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-date-picker scale="{scale}" value="2000-11-27"></calcite-date-picker>`)',
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
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
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
  <style>
    calcite-date-picker {
      width: 50px;
    }
  </style>
  <calcite-date-picker scale="s" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="m" value="2000-11-27"></calcite-date-picker>
  <calcite-date-picker scale="l" value="2000-11-27"></calcite-date-picker>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
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
      ...y.parameters?.docs?.source
    }
  }
};
const j = ["simple", "range", "rangeOneCalendar", "rangeHighlighted", "rangeOneCalendarWithValue", "rangeValuesNotInSameMonthAndYear", "rangeOneCalendarValuesNotInSameMonthAndYear", "Focus", "rangeRTL", "darkModeRTL", "localized", "widthSetToBreakpoints", "defaultWidthAllScales", "smallerThanMinWidthAllScales", "greaterThanMaxWidthAllScales"];
export {
  t as Focus,
  j as __namedExportsOrder,
  r as darkModeRTL,
  H as default,
  v as defaultWidthAllScales,
  y as greaterThanMaxWidthAllScales,
  c as localized,
  l as range,
  d as rangeHighlighted,
  s as rangeOneCalendar,
  m as rangeOneCalendarValuesNotInSameMonthAndYear,
  o as rangeOneCalendarWithValue,
  u as rangeRTL,
  p as rangeValuesNotInSameMonthAndYear,
  n as simple,
  g as smallerThanMinWidthAllScales,
  k as widthSetToBreakpoints
};
