/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as s, o as c, m as g } from "./utils3.js";
import { h as t } from "./formatting.js";
import { i as p } from "./helpers.js";
import { A as v } from "./resources34.js";
import "./rating.js";
var o = Object.freeze, h = Object.defineProperty, b = (a, f) => o(h(a, "raw", { value: o(a.slice()) })), d;
const {
  scale: u,
  status: m
} = v, T = {
  title: "Components/Controls/Rating",
  args: {
    scale: u.defaultValue,
    value: 1,
    showChip: !0,
    average: 4.4,
    count: 10,
    labelText: "Label text",
    readOnly: !1,
    required: !1,
    disabled: !1,
    status: m.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: u.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: p,
      control: {
        type: "select"
      }
    }
  }
}, n = (a) => t`
  <calcite-rating
    scale="${a.scale}"
    value="${a.value}"
    ${s("show-chip", a.showChip)}
    average="${a.average}"
    count="${a.count}"
    ${c("label-text", a.labelText)}
    ${s("read-only", a.readOnly)}
    ${s("required", a.required)}
    ${s("disabled", a.disabled)}
    status="${a.status}"
    validation-message="${a.validationMessage}"
    ${c("validation-icon", a.validationIcon)}
  ></calcite-rating>
`, e = () => t`
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
const r = () => t`<calcite-rating disabled value="3"></calcite-rating>`, i = () => t(d || (d = b([` <calcite-rating value="4" required></calcite-rating>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-rating");
        await document.querySelector("calcite-rating").setFocus();
      })();
    <\/script>`])));
i.parameters = {
  chromatic: {
    delay: 500
  }
};
const l = () => t`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      min-inline-size: 400px;
      min-block-size: 200px;
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: RatingStoryArgs): string => html\`
  <calcite-rating
    scale="\${args.scale}"
    value="\${args.value}"
    \${boolean("show-chip", args.showChip)}
    average="\${args.average}"
    count="\${args.count}"
    \${optionalAttribute("label-text", args.labelText)}
    \${boolean("read-only", args.readOnly)}
    \${boolean("required", args.required)}
    \${boolean("disabled", args.disabled)}
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
  ></calcite-rating>
\``,
      ...n.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-rating disabled value="3"></calcite-rating>`',
      ...r.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-rating value="4" required></calcite-rating>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-rating");
        await document.querySelector("calcite-rating").setFocus();
      })();
    <\/script>\``,
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
  <style>
    .container {
      display: flex;
      flex-direction: column;
      min-inline-size: 400px;
      min-block-size: 200px;
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
      ...l.parameters?.docs?.source
    }
  }
};
const S = ["simple", "darkModeRTL", "disabled", "Focus", "validationMessageAllScales"];
export {
  i as Focus,
  S as __namedExportsOrder,
  e as darkModeRTL,
  T as default,
  r as disabled,
  n as simple,
  l as validationMessageAllScales
};
