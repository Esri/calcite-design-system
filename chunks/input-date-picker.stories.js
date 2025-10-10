import { h as e, n as O, k as M, j as $ } from "./index.js";
import { c as A, d as C } from "./locale.js";
import { m as W, d as L } from "./floating-ui.js";
import { i as q } from "./helpers.js";
import { A as B } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var w = Object.freeze, I = Object.defineProperty, S = (t, N) => w(I(t, "raw", { value: w(t.slice()) })), b, z, D, _;
const {
  scale: P,
  status: T
} = B, j = {
  title: "Components/Controls/InputDatePicker",
  args: {
    scale: P.defaultValue,
    status: T.defaultValue,
    value: "2020-12-12",
    min: "2016-08-09",
    max: "2023-12-18",
    lang: C,
    placement: L,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: P.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: A,
      control: {
        type: "select"
      }
    },
    placement: {
      options: W,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: q,
      control: {
        type: "select"
      }
    }
  }
}, n = (t) => e`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="${t.scale}"
      status="${t.status}"
      value="${t.value}"
      lang="${t.lang}"
      min="${t.min}"
      max="${t.max}"
      placement="${t.placement}"
      validation-message="${t.validationMessage}"
      validation-icon="${t.validationIcon}"
      open="${M("open", !0)}"
    ></calcite-input-date-picker>
  </div>
`, i = () => e` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>`, c = () => e`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="m"
      status="idle"
      min="2016-08-09"
      max="2023-12-18"
      lang="en"
      next-month-label="Next month"
      prev-month-label="Previous month"
      range
      layout="horizontal"
      open
    ></calcite-input-date-picker>
  </div>
`, r = () => e`<calcite-input-date-picker disabled></calcite-input-date-picker>`, s = () => e(b || (b = S([`
  <style>
    .my-input-date-picker-div {
      margin-top: 50px;
    }

    .my-input-date-picker {
      position: unset;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <div class="my-input-date-picker-div">
      <calcite-input-date-picker open class="my-input-date-picker" value="2020-02-12"></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector(".my-input-date-picker").flipPlacements = ["right"];
  <\/script>
`]))), l = () => e`
  <style>
    .container {
      width: 1000px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      open
      value="1-1-1"
      lang="zh-CN"
      scale="l"
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
    ></calcite-input-date-picker>
  </div>
`, o = () => e`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`, p = () => e`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
  </div>
`, d = () => e`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
  </div>
`, u = () => e`
  <style>
    .container {
      inline-size: 1500px;
      block-size: 500px;
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
  </div>
`, m = () => e`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
  </div>
`, a = () => e`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      class="calcite-mode-dark"
      dir="rtl"
      value="2020-12-12"
      numbering-system="arab"
      lang="ar"
      open
      validation-message="This should not appear because the status is not 'invalid'"
    ></calcite-input-date-picker>
  </div>
`;
a.parameters = {
  themes: $
};
const v = () => O(e`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`), g = () => e(z || (z = S([`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.valueAsDate = [new Date("2025-09-08"), new Date("2025-12-10")];
  <\/script>
`]))), k = () => e(D || (D = S([`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.value = ["2025-09-08", "2026-12-10"];
  <\/script>
`]))), h = () => e`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
`, y = () => e`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
`, x = () => e(_ || (_ = S([`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`]))), f = () => e`
  <calcite-input-date-picker value="2020-12-12" lang="bs"></calcite-input-date-picker>
  <calcite-input-date-picker value="2020-12-12" lang="it-CH"></calcite-input-date-picker>
`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: InputDatePickerStoryArgs): string => html\`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="\${args.scale}"
      status="\${args.status}"
      value="\${args.value}"
      lang="\${args.lang}"
      min="\${args.min}"
      max="\${args.max}"
      placement="\${args.placement}"
      validation-message="\${args.validationMessage}"
      validation-icon="\${args.validationIcon}"
      open="\${boolean("open", true)}"
    ></calcite-input-date-picker>
  </div>
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
      originalSource: `(): string => html\` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>\``,
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
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="m"
      status="idle"
      min="2016-08-09"
      max="2023-12-18"
      lang="en"
      next-month-label="Next month"
      prev-month-label="Previous month"
      range
      layout="horizontal"
      open
    ></calcite-input-date-picker>
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
      originalSource: "(): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`",
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .my-input-date-picker-div {
      margin-top: 50px;
    }

    .my-input-date-picker {
      position: unset;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <div class="my-input-date-picker-div">
      <calcite-input-date-picker open class="my-input-date-picker" value="2020-02-12"></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector(".my-input-date-picker").flipPlacements = ["right"];
  <\/script>
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
  <style>
    .container {
      width: 1000px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      open
      value="1-1-1"
      lang="zh-CN"
      scale="l"
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
    ></calcite-input-date-picker>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>\n`',
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
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      status="invalid"
      value="2020-12-12"
      validation-message="Choose a more recent date"
      validation-icon
    ></calcite-input-date-picker>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
    <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      inline-size: 1500px;
      block-size: 500px;
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      block-size: 500px;
      display: flex;
      gap: 100px;
      inline-size: 1200px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="s"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="m"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
    <calcite-input-date-picker
      scale="l"
      open
      min="2020-12-12"
      max="2020-12-16"
      range
      layout="horizontal"
      value="2020-12-12"
      calendars="1"
      overlay-positioning="fixed"
      placement="bottom-start"
    ></calcite-input-date-picker>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      class="calcite-mode-dark"
      dir="rtl"
      value="2020-12-12"
      numbering-system="arab"
      lang="ar"
      open
      validation-message="This should not appear because the status is not 'invalid'"
    ></calcite-input-date-picker>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`)',
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
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.valueAsDate = [new Date("2025-09-08"), new Date("2025-12-10")];
  <\/script>
\``,
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
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open></calcite-input-date-picker>
  </div>
  <script>
    const datePicker = document.querySelector("calcite-input-date-picker");
    datePicker.value = ["2025-09-08", "2026-12-10"];
  <\/script>
\``,
      ...k.parameters?.docs?.source
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
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
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
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
      ...x.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-date-picker value="2020-12-12" lang="bs"></calcite-input-date-picker>
  <calcite-input-date-picker value="2020-12-12" lang="it-CH"></calcite-input-date-picker>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
const U = ["simple", "withMinMax", "rangeWithMinMax", "disabled_TestOnly", "flipPlacements_TestOnly", "chineseLang_TestOnly", "readOnlyHasNoDropdownAffordance_TestOnly", "validationMessageAllScales_TestOnly", "defaultAllScales", "rangeSmallAndLargeScales", "rangeOneCalendarsAllScales", "arabicLocaleDarkModeRTL_TestOnly", "widthSetToBreakpoints_TestOnly", "rangeWithValueAsDate", "rangeWithValue", "rangeWithMinAfterCurrentDate", "rangeWithMaxBeforeCurrentDate", "Focus", "localeFormatting"];
export {
  x as Focus,
  U as __namedExportsOrder,
  a as arabicLocaleDarkModeRTL_TestOnly,
  l as chineseLang_TestOnly,
  j as default,
  d as defaultAllScales,
  r as disabled_TestOnly,
  s as flipPlacements_TestOnly,
  f as localeFormatting,
  m as rangeOneCalendarsAllScales,
  u as rangeSmallAndLargeScales,
  y as rangeWithMaxBeforeCurrentDate,
  h as rangeWithMinAfterCurrentDate,
  c as rangeWithMinMax,
  k as rangeWithValue,
  g as rangeWithValueAsDate,
  o as readOnlyHasNoDropdownAffordance_TestOnly,
  n as simple,
  p as validationMessageAllScales_TestOnly,
  v as widthSetToBreakpoints_TestOnly,
  i as withMinMax
};
