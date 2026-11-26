/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { d as G, s as J } from "./intl.js";
import { b as t, o as q, c as K, m as Q } from "./utils2.js";
import { h as a } from "./formatting.js";
import { i as X } from "./helpers.js";
import { A as Y } from "./resources34.js";
import { a as ee } from "./modes.js";
import "./input-date-picker.js";
var C = Object.freeze, ae = Object.defineProperty, n = (e, M) => C(ae(e, "raw", { value: C(e.slice()) })), R, O, _, H, L, W, N;
const {
  calendarCount: B,
  horizontalVerticalLayout: I,
  menuPlacement: Z,
  scale: V,
  status: j,
  supportedNlsLocale: te
} = Y, pe = {
  title: "Components/Controls/InputDatePicker",
  args: {
    calendars: B.defaultValue,
    disabled: !1,
    labelText: "Label text",
    layout: I.defaultValue,
    scale: V.defaultValue,
    status: j.defaultValue,
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
      options: V.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: j.values,
      control: {
        type: "select"
      }
    },
    lang: {
      options: te.values,
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
      options: X,
      control: {
        type: "select"
      }
    }
  }
}, s = (e) => a`
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
`, o = () => a` <style>
      .container {
        width: 400px;
        height: 400px;
      }
    </style>
    <div class="container">
      <calcite-input-date-picker min="2016-08-09" max="2023-12-18" open></calcite-input-date-picker>
    </div>`, p = () => a(R || (R = n([`<style>
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
    <\/script>`]))), d = () => a`
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
`, u = () => a`<calcite-input-date-picker disabled></calcite-input-date-picker>`, m = () => a(O || (O = n([`
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
`]))), g = () => a`
  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>
`, v = () => a(_ || (_ = n([`
  <calcite-input-date-picker
    id="read-only-vertical-range"
    layout="vertical"
    range
    read-only
  ></calcite-input-date-picker>
  <script>
    document.querySelector("#read-only-vertical-range").value = ["2020-12-12", "2020-12-14"];
  <\/script>
`]))), h = () => a`
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
`, i = (e, M = !1, E = 2) => {
  const F = V.values;
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
    <div class="container ${M && e === "horizontal" ? "range--horizontal" : ""}">
      ${F.map((U) => a`
            <calcite-input-date-picker
              scale="${U}"
              open
              value="2020-12-12"
              min="2020-12-12"
              max="2020-12-16"
              layout="${e}"
              calendars="${E}"
              ${t("range", M)}
            ></calcite-input-date-picker>
          `).join("")}
    </div>`;
}, k = () => i("horizontal"), y = () => i("vertical"), r = () => i("horizontal", !0);
r.parameters = {
  chromatic: {
    modes: {
      extraWide: ee.landscapeLarge
    },
    cropToViewport: !0
  }
};
const x = () => i("vertical", !0), b = () => i("horizontal", !0, 1), S = () => i("vertical", !0, 1), c = () => a`
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
c.parameters = {
  themes: Q
};
const f = () => K(a`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`), w = () => a(H || (H = n([`
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
`]))), $ = () => a(L || (L = n([`
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
`]))), z = () => a`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
`, D = () => a`
  <style>
    .container {
      width: 650px;
      height: 400px;
    }
  </style>
  <div class="container">
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
`, T = () => a(W || (W = n([`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`]))), l = () => a`
  <style>
    .localized-input-calendars {
      display: grid;
      grid-template-columns: repeat(4, 300px);
      gap: 24px;
    }

    .localized-input-calendar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .localized-input-calendar calcite-input-date-picker {
      width: 300px;
    }
  </style>
  <div class="localized-input-calendars">
    ${[...J].map((e) => a`
          <div class="localized-input-calendar">
            <strong>${e}</strong>
            <calcite-input-date-picker lang="${e}" value="2020-12-12"></calcite-input-date-picker>
          </div>
        `).join("")}
  </div>
`;
l.parameters = {
  chromatic: {
    delay: 2e3,
    cropToViewport: !1
  }
};
const A = () => a`
  <div>
    <calcite-input-date-picker clearable value="2020-12-12" open></calcite-input-date-picker>
  </div>
`, P = () => a(N || (N = n([`
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
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-input-date-picker disabled></calcite-input-date-picker>`",
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
      ...m.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-date-picker read-only value="2020-12-12"></calcite-input-date-picker>\n`',
      ...g.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
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
      ...h.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal")',
      ...k.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("vertical")',
      ...y.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal", true)',
      ...r.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("vertical", true)',
      ...x.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => allScalesTemplate("horizontal", true, 1)',
      ...b.parameters?.docs?.source
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-date-picker scale="{scale}" value="2020-12-12"></calcite-input-date-picker>`)',
      ...f.parameters?.docs?.source
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
    datePicker.value = ["2025-09-08", "2026-12-10"];
  <\/script>
\``,
      ...$.parameters?.docs?.source
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
    <calcite-input-date-picker range open min="2050-08-09"></calcite-input-date-picker>
  </div>
\``,
      ...z.parameters?.docs?.source
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
    <calcite-input-date-picker range open max="2016-08-09"></calcite-input-date-picker>
  </div>
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
      originalSource: `(): string => html\`<calcite-input-date-picker></calcite-input-date-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-date-picker");
        const inputDatePicker = await document.querySelector("calcite-input-date-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
      ...T.parameters?.docs?.source
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
    .localized-input-calendars {
      display: grid;
      grid-template-columns: repeat(4, 300px);
      gap: 24px;
    }

    .localized-input-calendar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .localized-input-calendar calcite-input-date-picker {
      width: 300px;
    }
  </style>
  <div class="localized-input-calendars">
    \${[...supportedLocales].map(locale => html\`
          <div class="localized-input-calendar">
            <strong>\${locale}</strong>
            <calcite-input-date-picker lang="\${locale}" value="2020-12-12"></calcite-input-date-picker>
          </div>
        \`).join("")}
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div>
    <calcite-input-date-picker clearable value="2020-12-12" open></calcite-input-date-picker>
  </div>
\``,
      ...A.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
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
      ...P.parameters?.docs?.source
    }
  }
};
const de = ["simple", "withMinMax", "withMinAsDateAndMaxAsDate", "rangeWithMinMax", "disabled", "flipPlacements", "readOnlyHasNoDropdownAffordance", "readOnlyVerticalRangeHasNoDropdownAffordance", "validationMessageAllScales", "allScalesHorizontal", "allScalesVertical", "allScalesRangeHorizontal", "allScalesRangeVertical", "allScalesRangeOneCalendarHorizontal", "allScalesRangeOneCalendarVertical", "arabicLocaleDarkModeRTL", "widthSetToBreakpoints", "rangeWithValueAsDate", "rangeWithValue", "rangeWithMinAfterCurrentDate", "rangeWithMaxBeforeCurrentDate", "Focus", "localized", "clearableSingle", "clearableRangeHorizontalAndVertical"];
export {
  T as Focus,
  de as __namedExportsOrder,
  k as allScalesHorizontal,
  r as allScalesRangeHorizontal,
  b as allScalesRangeOneCalendarHorizontal,
  S as allScalesRangeOneCalendarVertical,
  x as allScalesRangeVertical,
  y as allScalesVertical,
  c as arabicLocaleDarkModeRTL,
  P as clearableRangeHorizontalAndVertical,
  A as clearableSingle,
  pe as default,
  u as disabled,
  m as flipPlacements,
  l as localized,
  D as rangeWithMaxBeforeCurrentDate,
  z as rangeWithMinAfterCurrentDate,
  d as rangeWithMinMax,
  $ as rangeWithValue,
  w as rangeWithValueAsDate,
  g as readOnlyHasNoDropdownAffordance,
  v as readOnlyVerticalRangeHasNoDropdownAffordance,
  s as simple,
  h as validationMessageAllScales,
  f as widthSetToBreakpoints,
  p as withMinAsDateAndMaxAsDate,
  o as withMinMax
};
