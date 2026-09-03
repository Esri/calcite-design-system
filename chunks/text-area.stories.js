/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as t, o as r } from "./utils3.js";
import { i as b } from "./helpers.js";
import { h as a } from "./formatting.js";
import { A as $ } from "./resources34.js";
import "./action.js";
import "./button.js";
import "./text-area.js";
const {
  scale: h,
  status: v,
  textAreaWrap: f
} = $, E = {
  title: "Components/TextArea",
  args: {
    scale: h.defaultValue,
    status: v.defaultValue,
    placeholder: "Add Notes",
    disabled: !1,
    columns: 20,
    resize: "both",
    rows: 2,
    label: "",
    labelText: "Label text",
    limitText: !1,
    loading: !1,
    maxLength: void 0,
    minLength: void 0,
    readOnly: !1,
    required: !1,
    validationMessage: "",
    validationIcon: "",
    value: "",
    wrap: "soft"
  },
  argTypes: {
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    maxLength: {
      control: {
        type: "number"
      }
    },
    minLength: {
      control: {
        type: "number"
      }
    },
    validationIcon: {
      options: b,
      control: {
        type: "select"
      }
    },
    wrap: {
      options: f.values,
      control: {
        type: "select"
      }
    }
  }
}, s = (e) => a`
  <calcite-text-area
    scale="${e.scale}"
    status="${e.status}"
    placeholder="${e.placeholder}"
    ${t("disabled", e.disabled)}
    ${t("loading", e.loading)}
    ${t("read-only", e.readOnly)}
    ${t("required", e.required)}
    columns="${e.columns}"
    resize="${e.resize}"
    rows="${e.rows}"
    label="${e.label}"
    ${r("label-text", e.labelText)}
    ${r("max-length", e.maxLength)}
    ${r("min-length", e.minLength)}
    limit-text="${e.limitText}"
    value="${e.value}"
    wrap="${e.wrap}"
    validation-message="${e.validationMessage}"
    ${r("validation-icon", e.validationIcon)}
  >
  </calcite-text-area>
`, l = () => a`
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
`, o = () => a`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`, i = () => a`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`, c = () => a` <calcite-text-area disabled> </calcite-text-area> `, n = () => a` <calcite-text-area readonly> </calcite-text-area> `, d = () => a` <calcite-text-area resize="none"> </calcite-text-area> `, m = () => a`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
`, p = () => a`
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
`, u = () => a`
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
  </calcite-text-area>
`, x = () => a`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`, y = a`
  <style>
    .wrapper {
      display: flex;
      width: 800px;
      height: 250px;
      padding: 64px;
      gap: 10px;
    }
  </style>
`, g = () => a`
  ${y}
  <div class="wrapper">
    <calcite-text-area
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-text-area>
    <calcite-text-area
      scale="m"
      status="invalid"
      validation-message="Less than the minimum length of 6 characters"
      validation-icon
      value="Hi"
    ></calcite-text-area>
    <calcite-text-area
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 9 characters"
      validation-icon
      value="Lorem ipsum"
    ></calcite-text-area>
  </div>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: TextAreaStoryArgs): string => html\`
  <calcite-text-area
    scale="\${args.scale}"
    status="\${args.status}"
    placeholder="\${args.placeholder}"
    \${boolean("disabled", args.disabled)}
    \${boolean("loading", args.loading)}
    \${boolean("read-only", args.readOnly)}
    \${boolean("required", args.required)}
    columns="\${args.columns}"
    resize="\${args.resize}"
    rows="\${args.rows}"
    label="\${args.label}"
    \${optionalAttribute("label-text", args.labelText)}
    \${optionalAttribute("max-length", args.maxLength)}
    \${optionalAttribute("min-length", args.minLength)}
    limit-text="\${args.limitText}"
    value="\${args.value}"
    wrap="\${args.wrap}"
    validation-message="\${args.validationMessage}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
  >
  </calcite-text-area>
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
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
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
      originalSource: `(): string => html\`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-text-area disabled> </calcite-text-area> `",
      ...c.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-text-area readonly> </calcite-text-area> `",
      ...n.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-text-area resize="none"> </calcite-text-area> `',
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>\n`',
      ...p.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
  </calcite-text-area>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`',
      ...x.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-text-area
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-text-area>
    <calcite-text-area
      scale="m"
      status="invalid"
      validation-message="Less than the minimum length of 6 characters"
      validation-icon
      value="Hi"
    ></calcite-text-area>
    <calcite-text-area
      scale="l"
      status="invalid"
      validation-message="Exceeds the maximum length of 9 characters"
      validation-icon
      value="Lorem ipsum"
    ></calcite-text-area>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
const R = ["simple", "darkModeRTL", "withSlottedElements", "withSlottedElementsDarkModeRTL", "disabled", "readonly", "resizeDisabled", "groupSeparator", "exceedingMaxLength", "chineseLang", "insideContainerWithHeightAndWidth", "validationMessageAllScales"];
export {
  R as __namedExportsOrder,
  u as chineseLang,
  l as darkModeRTL,
  E as default,
  c as disabled,
  p as exceedingMaxLength,
  m as groupSeparator,
  x as insideContainerWithHeightAndWidth,
  n as readonly,
  d as resizeDisabled,
  s as simple,
  g as validationMessageAllScales,
  o as withSlottedElements,
  i as withSlottedElementsDarkModeRTL
};
