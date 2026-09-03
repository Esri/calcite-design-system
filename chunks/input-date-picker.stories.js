/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as G } from "./dom2.js";
import { b as t, o as q, c as J, m as K } from "./utils3.js";
import { h as a } from "./formatting.js";
import { i as Q } from "./helpers.js";
import { A as X } from "./resources34.js";
import { a as Y } from "./modes.js";
import "./input-date-picker.js";
var V = Object.freeze, ee = Object.defineProperty, n = (e, i) => V(ee(e, "raw", { value: V(e.slice()) })), R, O, _, H, W, N, L;
const {
  calendarCount: B,
  horizontalVerticalLayout: I,
  menuPlacement: Z,
  scale: C,
  status: E,
  supportedNlsLocale: ae
} = X, oe = {
  title: "Components/Controls/InputDatePicker",
  args: {
    calendars: B.defaultValue,
    disabled: !1,
    labelText: "Label text",
    layout: I.defaultValue,
    scale: C.defaultValue,
    status: E.defaultValue,
    clearable: !1,
    value: "2020-12-12",
    min: "2016-08-09",
    max: "2023-12-18",
    lang: G,
    open: !0,
    placeholder: "Enter a date",
    placement: Z.defaultValue,
    range: !1,
    readOnly: !1,
    required: !1,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: C.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: E.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: ae.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: Z.values,
      control: {
        type: "select"
      }
    },
    calendars: {
      options: B.values,
      control: {
        type: "select"
      }
    },
    layout: {
      options: I.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: Q,
      control: {
        type: "select"
      }
    }
  }
}, o = (e) => a`
  <style>
    .container {
      width: 400px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker
      scale="${e.scale}"
      status="${e.status}"
      ${t("clearable", e.clearable)}
      value="${e.value}"
      calendars="${e.calendars}"
      ${t("disabled", e.disabled)}
      ${q("label-text", e.labelText)}
      lang="${e.lang}"
      layout="${e.layout}"
      min="${e.min}"
      max="${e.max}"
      ${t("open", e.open)}
      placeholder="${e.placeholder}"
      placement="${e.placement}"
      ${t("range", e.range)}
      ${t("read-only", e.readOnly)}
      ${t("required", e.required)}
      validation-message="${e.validationMessage}"
      ${q("validation-icon", e.validationIcon)}
    ></calcite-input-date-picker>
  </div>
`, p = () => a` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>`, d = () => a(R || (R = n([`<style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker open></calcite-input-date-picker>
    </div>
    <script>
      const datePicker = document.querySelector("calcite-input-date-picker");
      const offsetTime = "T07:00:00.000Z";
      datePicker.minAsDate = new Date("2020-01-01T07:00:00.000Z");
      datePicker.maxAsDate = new Date("2020-12-31T07:00:00.000Z");
    <\/script>`]))), u = () => a`
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
`, m = () => a`<calcite-input-date-picker disabled></calcite-input-date-picker>`, g = () => a(O || (O = n([`
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
`]))), v = () => a`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`, h = () => a(_ || (_ = n([`
  <calcite-input-date-picker
    id="read-only-vertical-range"
    layout="vertical"
    range
    read-only
  ></calcite-input-date-picker>
  <script>
    document.querySelector("#read-only-vertical-range").value = ["2020-12-12", "2020-12-14"];
  <\/script>
`]))), k = () => a`
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
`, r = (e, i = !1, F = 2) => {
  const j = C.values;
  return a`<style>
      .container {
        block-size: 500px;
        display: flex;
        gap: 100px;
      }
      .range--horizontal {
        inline-size: 2400px;
      }
    </style>
    <div class="container ${i && e === "horizontal" ? "range--horizontal" : ""}">
      ${j.map((U) => a`
            <calcite-input-date-picker
              scale="${U}"
              open
              value="2020-12-12"
              min="2020-12-12"
              max="2020-12-16"
              layout="${e}"
              calendars="${F}"
              ${t("range", i)}
            ></calcite-input-date-picker>
          `).join("")}
    </div>`;
}, y = () => r("horizontal"), x = () => r("vertical"), c = () => r("horizontal", !0);
c.parameters = {
  chromatic: {
    modes: {
      extraWide: Y.landscapeLarge
    },
    cropToViewport: !0
  }
};
const b = () => r("vertical", !0), f = () => r("horizontal", !0, 1), S = () => r("vertical", !0, 1), l = () => a`
  <style>
    .container {
      display: flex;
      gap: 20px;
    }
    .picker-group {
      width: 650px;
      height: 1200px;
      display: flex;
      flex-direction: column;
      gap: 370px;
    }
  </style>
  <div class="container">
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
  </div>
`;
l.parameters = {
  themes: K
};
const w = () => J(a`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`), $ = () => a(H || (H = n([`
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
`]))), D = () => a(W || (W = n([`
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
`]))), T = () => a`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
`, z = () => a`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
`, A = () => a(N || (N = n([`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`]))), s = () => a`
    <style>
      .use-cases {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 350px 25px;
        max-width: 1200px;
      }
      calcite-input-date-picker {
        width: 300px;
        height: 300px;
      }
    </style>
    <div class="use-cases">
      ${["ar", "bs", "fr-CA", "it-CH", "zh-CN"].map((i) => a`<div>
            <h3>${i}</h3>
            <calcite-input-date-picker
              lang="${i}"
              open
              placement="bottom-start"
              value="2020-12-12"
            ></calcite-input-date-picker>
          </div>`)}
    </div>
  `;
s.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const P = () => a`
  <div>
    <calcite-input-date-picker clearable value="2020-12-12" open></calcite-input-date-picker>
  </div>
`, M = () => a(L || (L = n([`
  <style>
    .container {
      display: flex;
      gap: 32px;
      width: 1200px;
      height: 500px;
    }

    .picker {
      width: 660px;
      height: 460px;
    }
  </style>
  <div class="container">
    <div class="picker">
      <calcite-input-date-picker
        id="clearable-range-horizontal"
        clearable
        range
        layout="horizontal"
        open
      ></calcite-input-date-picker>
    </div>
    <div class="picker">
      <calcite-input-date-picker
        id="clearable-range-vertical"
        clearable
        range
        layout="vertical"
        open
      ></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector("#clearable-range-horizontal").value = ["2020-12-12", "2020-12-14"];
    document.querySelector("#clearable-range-vertical").value = ["2020-12-12", "2020-12-14"];
  <\/script>
`])));
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      \${boolean("clearable", args.clearable)}
      value="\${args.value}"
      calendars="\${args.calendars}"
      \${boolean("disabled", args.disabled)}
      \${optionalAttribute("label-text", args.labelText)}
      lang="\${args.lang}"
      layout="\${args.layout}"
      min="\${args.min}"
      max="\${args.max}"
      \${boolean("open", args.open)}
      placeholder="\${args.placeholder}"
      placement="\${args.placement}"
      \${boolean("range", args.range)}
      \${boolean("read-only", args.readOnly)}
      \${boolean("required", args.required)}
      validation-message="\${args.validationMessage}"
      \${optionalAttribute("validation-icon", args.validationIcon)}
    ></calcite-input-date-picker>
  </div>
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
      originalSource: `(): string => html\` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>\``,
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker open></calcite-input-date-picker>
    </div>
    <script>
      const datePicker = document.querySelector("calcite-input-date-picker");
      const offsetTime = "T07:00:00.000Z";
      datePicker.minAsDate = new Date("2020-01-01T07:00:00.000Z");
      datePicker.maxAsDate = new Date("2020-12-31T07:00:00.000Z");
    <\/script>\``,
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
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`",
      ...m.parameters?.docs?.source
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
      ...g.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>\n`',
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
  <calcite-input-date-picker
    id="read-only-vertical-range"
    layout="vertical"
    range
    read-only
  ></calcite-input-date-picker>
  <script>
    document.querySelector("#read-only-vertical-range").value = ["2020-12-12", "2020-12-14"];
  <\/script>
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
      ...k.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal")',
      ...y.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("vertical")',
      ...x.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal", true)',
      ...c.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("vertical", true)',
      ...b.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal", true, 1)',
      ...f.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("vertical", true, 1)',
      ...S.parameters?.docs?.source
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
      display: flex;
      gap: 20px;
    }
    .picker-group {
      width: 650px;
      height: 1200px;
      display: flex;
      flex-direction: column;
      gap: 370px;
    }
  </style>
  <div class="container">
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
    <div class="picker-group">
      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>

      <calcite-input-date-picker
        class="calcite-mode-dark"
        dir="rtl"
        value="2020-12-12"
        numbering-system="arab"
        lang="ar"
        layout="vertical"
        open
        placement="bottom-start"
        range
        validation-message="This should not appear because the status is not 'invalid'"
      ></calcite-input-date-picker>
    </div>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`)',
      ...w.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
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
      ...$.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
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
      ...D.parameters?.docs?.source
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
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
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
      ...z.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
      ...A.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => {
  const locales = ["ar", "bs", "fr-CA", "it-CH", "zh-CN"];
  return html\`
    <style>
      .use-cases {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 350px 25px;
        max-width: 1200px;
      }
      calcite-input-date-picker {
        width: 300px;
        height: 300px;
      }
    </style>
    <div class="use-cases">
      \${locales.map(locale => html\`<div>
            <h3>\${locale}</h3>
            <calcite-input-date-picker
              lang="\${locale}"
              open
              placement="bottom-start"
              value="2020-12-12"
            ></calcite-input-date-picker>
          </div>\`)}
    </div>
  \`;
}`,
      ...s.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-input-date-picker clearable value="2020-12-12" open></calcite-input-date-picker>
  </div>
\``,
      ...P.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      gap: 32px;
      width: 1200px;
      height: 500px;
    }

    .picker {
      width: 660px;
      height: 460px;
    }
  </style>
  <div class="container">
    <div class="picker">
      <calcite-input-date-picker
        id="clearable-range-horizontal"
        clearable
        range
        layout="horizontal"
        open
      ></calcite-input-date-picker>
    </div>
    <div class="picker">
      <calcite-input-date-picker
        id="clearable-range-vertical"
        clearable
        range
        layout="vertical"
        open
      ></calcite-input-date-picker>
    </div>
  </div>
  <script>
    document.querySelector("#clearable-range-horizontal").value = ["2020-12-12", "2020-12-14"];
    document.querySelector("#clearable-range-vertical").value = ["2020-12-12", "2020-12-14"];
  <\/script>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
const pe = ["simple", "withMinMax", "withMinAsDateAndMaxAsDate", "rangeWithMinMax", "disabled", "flipPlacements", "readOnlyHasNoDropdownAffordance", "readOnlyVerticalRangeHasNoDropdownAffordance", "validationMessageAllScales", "allScalesHorizontal", "allScalesVertical", "allScalesRangeHorizontal", "allScalesRangeVertical", "allScalesRangeOneCalendarHorizontal", "allScalesRangeOneCalendarVertical", "arabicLocaleDarkModeRTL", "widthSetToBreakpoints", "rangeWithValueAsDate", "rangeWithValue", "rangeWithMinAfterCurrentDate", "rangeWithMaxBeforeCurrentDate", "Focus", "localized", "clearableSingle", "clearableRangeHorizontalAndVertical"];
export {
  A as Focus,
  pe as __namedExportsOrder,
  y as allScalesHorizontal,
  c as allScalesRangeHorizontal,
  f as allScalesRangeOneCalendarHorizontal,
  S as allScalesRangeOneCalendarVertical,
  b as allScalesRangeVertical,
  x as allScalesVertical,
  l as arabicLocaleDarkModeRTL,
  M as clearableRangeHorizontalAndVertical,
  P as clearableSingle,
  oe as default,
  m as disabled,
  g as flipPlacements,
  s as localized,
  z as rangeWithMaxBeforeCurrentDate,
  T as rangeWithMinAfterCurrentDate,
  u as rangeWithMinMax,
  D as rangeWithValue,
  $ as rangeWithValueAsDate,
  v as readOnlyHasNoDropdownAffordance,
  h as readOnlyVerticalRangeHasNoDropdownAffordance,
  o as simple,
  k as validationMessageAllScales,
  w as widthSetToBreakpoints,
  d as withMinAsDateAndMaxAsDate,
  p as withMinMax
};
