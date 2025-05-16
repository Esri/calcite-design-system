import { b as l, m as g } from "./utils.js";
import { h as i } from "./formatting.js";
import { i as m } from "./helpers.js";
import { A as p } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.1-next.0 */
var c = Object.freeze, v = Object.defineProperty, h = (a, y) => c(v(a, "raw", { value: c(a.slice()) })), o;
const {
  scale: d,
  status: u
} = p, w = {
  title: "Components/Controls/Rating",
  args: {
    scale: d.defaultValue,
    value: 1,
    showChip: !0,
    average: 4.4,
    count: 10,
    readOnly: !1,
    disabled: !1,
    status: u.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: d.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: u.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: m,
      control: {
        type: "select"
      }
    }
  }
}, s = (a) => i`
  <calcite-rating
    scale="${a.scale}"
    value="${a.value}"
    ${l("show-chip", a.showChip)}
    average="${a.average}"
    count="${a.count}"
    ${l("read-only", a.readOnly)}
    ${l("disabled", a.disabled)}
    status="${a.status}"
    validation-message="${a.validationMessage}"
    validation-icon="${a.validationIcon}"
  ></calcite-rating>
`, e = () => i`
  <calcite-rating
    class="calcite-mode-dark"
    dir="rtl"
    scale="m"
    value="2"
    show-chip
    average="4.4"
    count="10"
  ></calcite-rating>
`;
e.parameters = {
  themes: g
};
const n = () => i`<calcite-rating disabled value="3"></calcite-rating>`, t = () => i(o || (o = h([` <calcite-rating value="4" required></calcite-rating>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-rating");
        await document.querySelector("calcite-rating").setFocus();
      })();
    <\/script>`])));
t.parameters = {
  chromatic: {
    delay: 500
  }
};
const r = () => i`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 40px;
    }
  </style>
  <div class="container">
    <calcite-rating
      scale="s"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
    <calcite-rating
      scale="m"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
    <calcite-rating
      scale="l"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
  </div>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: RatingStoryArgs): string => html\`
  <calcite-rating
    scale="\${args.scale}"
    value="\${args.value}"
    \${boolean("show-chip", args.showChip)}
    average="\${args.average}"
    count="\${args.count}"
    \${boolean("read-only", args.readOnly)}
    \${boolean("disabled", args.disabled)}
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    validation-icon="\${args.validationIcon}"
  ></calcite-rating>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-rating
    class="calcite-mode-dark"
    dir="rtl"
    scale="m"
    value="2"
    show-chip
    average="4.4"
    count="10"
  ></calcite-rating>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-rating disabled value="3"></calcite-rating>`',
      ...n.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-rating value="4" required></calcite-rating>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-rating");
        await document.querySelector("calcite-rating").setFocus();
      })();
    <\/script>\``,
      ...t.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 40px;
    }
  </style>
  <div class="container">
    <calcite-rating
      scale="s"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
    <calcite-rating
      scale="m"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
    <calcite-rating
      scale="l"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-rating>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
const b = ["simple", "darkModeRTL_TestOnly", "disabled_TestOnly", "Focus_TestOnly", "validationMessageAllScales_TestOnly"];
export {
  t as Focus_TestOnly,
  b as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  w as default,
  n as disabled_TestOnly,
  s as simple,
  r as validationMessageAllScales_TestOnly
};
