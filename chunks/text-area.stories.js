import { k as g, h as e } from "./index.js";
import { i as v } from "./helpers.js";
import { A as y } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: x,
  status: h
} = y, $ = {
  title: "Components/TextArea",
  args: {
    scale: x.defaultValue,
    status: h.defaultValue,
    placeholder: "Add Notes",
    disabled: !1,
    columns: 20,
    resize: "both",
    rows: 2,
    label: "",
    name: "",
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: v,
      control: {
        type: "select"
      }
    }
  }
}, t = (a) => e`
  <calcite-text-area
    scale="${a.scale}"
    status="${a.status}"
    placeholder="${a.placeholder}"
    ${g("disabled", a.disabled)}
    columns="${a.columns}"
    resize="${a.resize}"
    rows="${a.rows}"
    label="${a.label}"
    name="${a.name}"
    validation-message="${a.validationMessage}"
    validation-icon="${a.validationIcon}"
  >
  </calcite-text-area>
`, s = () => e`
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
`, r = () => e`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`, c = () => e`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
`, l = () => e` <calcite-text-area disabled> </calcite-text-area> `, o = () => e` <calcite-text-area readonly> </calcite-text-area> `, i = () => e` <calcite-text-area resize="none"> </calcite-text-area> `, n = () => e`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
`, d = () => e`
  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>
`, m = () => e`
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
  </calcite-text-area>
`, p = () => e`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`, T = e`
  <style>
    .wrapper {
      display: flex;
      width: 800px;
      height: 250px;
      padding: 64px;
      gap: 10px;
    }
  </style>
`, u = () => e`
  ${T}
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
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: TextAreaStoryArgs): string => html\`
  <calcite-text-area
    scale="\${args.scale}"
    status="\${args.status}"
    placeholder="\${args.placeholder}"
    \${boolean("disabled", args.disabled)}
    columns="\${args.columns}"
    resize="\${args.resize}"
    rows="\${args.rows}"
    label="\${args.label}"
    name="\${args.name}"
    validation-message="\${args.validationMessage}"
    validation-icon="\${args.validationIcon}"
  >
  </calcite-text-area>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area
    dir="rtl"
    class="calcite-mode-dark"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-text-area>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area placeholder="Add Notes" max-length="50" scale="m" placeholder="Add Notes" columns="20" rows="2">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
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
      originalSource: `(): string => html\`
  <calcite-text-area max-length="50" placeholder="Add Notes" dir="rtl" class="calcite-mode-dark">
    <calcite-button slot="footer-start">RESET</calcite-button>
    <calcite-action icon="code" slot="footer-end"></calcite-action>
  </calcite-text-area>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-text-area disabled> </calcite-text-area> `",
      ...l.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-text-area readonly> </calcite-text-area> `",
      ...o.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-text-area resize="none"> </calcite-text-area> `',
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-text-area value="Rocky Mountains National Park" lang="fr" max-length="123456" group-separator>
  </calcite-text-area>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-text-area value="Rocky Mountains National Park" max-length="10"> </calcite-text-area>\n`',
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
  <calcite-text-area value="Rocky Mountains National Park" lang="zh-cn" group-separator max-length="654321">
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
      originalSource: '(): string => html`<div style="width:500px;height:500px"><calcite-text-area></calcite-text-area></div>`',
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
      ...u.parameters?.docs?.source
    }
  }
};
const _ = ["simple", "darkModeRTL_TestOnly", "withSlottedElements", "withSlottedElementsDarkModeRTL_TestOnly", "disabled_TestOnly", "readonly_TestOnly", "resizeDisabled_TestOnly", "groupSeparator_TestOnly", "exceedingMaxLength_TestOnly", "chineseLang_TestOnly", "insideContainerWithHeightAndWidth_TestOnly", "validationMessageAllScales_TestOnly"];
export {
  _ as __namedExportsOrder,
  m as chineseLang_TestOnly,
  s as darkModeRTL_TestOnly,
  $ as default,
  l as disabled_TestOnly,
  d as exceedingMaxLength_TestOnly,
  n as groupSeparator_TestOnly,
  p as insideContainerWithHeightAndWidth_TestOnly,
  o as readonly_TestOnly,
  i as resizeDisabled_TestOnly,
  t as simple,
  u as validationMessageAllScales_TestOnly,
  r as withSlottedElements,
  c as withSlottedElementsDarkModeRTL_TestOnly
};
