import { c as b, b as O, m as M } from "./utils.js";
import { h as e } from "./formatting.js";
import { c as $, d as C } from "./locale.js";
import { m as z, d as A } from "./floating-ui.js";
import { i as W } from "./helpers.js";
import { A as q } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
var w = Object.freeze, B = Object.defineProperty, x = (t, I) => w(B(t, "raw", { value: w(t.slice()) })), f, S, _, D;
const {
  scale: T,
  status: P
} = q, H = {
  title: "Components/Controls/InputDatePicker",
  args: {
    scale: T.defaultValue,
    status: P.defaultValue,
    value: "2020-12-12",
    min: "2016-08-09",
    max: "2023-12-18",
    lang: C,
    placement: A,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: P.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: $,
      control: {
        type: "select"
      }
    },
    placement: {
      options: z,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: W,
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
      open="${O("open", !0)}"
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
`, r = () => e`<calcite-input-date-picker disabled></calcite-input-date-picker>`, s = () => e(f || (f = x([`
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
`, p = () => e`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`, o = () => e`
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
      display: flex;
      flex-direction: column;
      width: 1400px;
      height: 1200px;
      gap: 400px;
    }

    .use-case {
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <div class="use-case">
      <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
    </div>
    <div class="use-case">
      <calcite-input-date-picker
        scale="s"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="m"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="l"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
    </div>
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
  themes: M
};
const u = () => b(e`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`), m = () => e(S || (S = x([`
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
`]))), v = () => e(_ || (_ = x([`
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
`, k = () => e`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
`, g = () => e(D || (D = x([`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`]))), y = () => e`
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
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>\n`',
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
      ...o.parameters?.docs?.source
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
      display: flex;
      flex-direction: column;
      width: 1400px;
      height: 1200px;
      gap: 400px;
    }

    .use-case {
      display: flex;
      gap: 100px;
    }
  </style>
  <div class="container">
    <div class="use-case">
      <calcite-input-date-picker scale="s" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="m" icon open value="2020-12-12"></calcite-input-date-picker>
      <calcite-input-date-picker scale="l" icon open value="2020-12-12"></calcite-input-date-picker>
    </div>
    <div class="use-case">
      <calcite-input-date-picker
        scale="s"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="m"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
      <calcite-input-date-picker
        scale="l"
        open
        min="2020-12-12"
        max="2020-12-16"
        range
        layout="horizontal"
        value="2020-12-12"
      ></calcite-input-date-picker>
    </div>
  </div>
\``,
      ...d.parameters?.docs?.source
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
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`)',
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
      ...m.parameters?.docs?.source
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
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
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
  <calcite-input-date-picker value="2020-12-12" lang="bs"></calcite-input-date-picker>
  <calcite-input-date-picker value="2020-12-12" lang="it-CH"></calcite-input-date-picker>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
const j = ["simple", "withMinMax", "rangeWithMinMax", "disabled_TestOnly", "flipPlacements_TestOnly", "chineseLang_TestOnly", "readOnlyHasNoDropdownAffordance_TestOnly", "validationMessageAllScales_TestOnly", "scales_TestOnly", "arabicLocaleDarkModeRTL_TestOnly", "widthSetToBreakpoints_TestOnly", "rangeWithValueAsDate", "rangeWithValue", "rangeWithMinAfterCurrentDate", "rangeWithMaxBeforeCurrentDate", "Focus", "localeFormatting"];
export {
  g as Focus,
  j as __namedExportsOrder,
  a as arabicLocaleDarkModeRTL_TestOnly,
  l as chineseLang_TestOnly,
  H as default,
  r as disabled_TestOnly,
  s as flipPlacements_TestOnly,
  y as localeFormatting,
  k as rangeWithMaxBeforeCurrentDate,
  h as rangeWithMinAfterCurrentDate,
  c as rangeWithMinMax,
  v as rangeWithValue,
  m as rangeWithValueAsDate,
  p as readOnlyHasNoDropdownAffordance_TestOnly,
  d as scales_TestOnly,
  n as simple,
  o as validationMessageAllScales_TestOnly,
  u as widthSetToBreakpoints_TestOnly,
  i as withMinMax
};
