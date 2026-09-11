/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as x } from "./helpers.js";
import { b as i, o as f, m as $ } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as S } from "./resources34.js";
import "./icon.js";
import "./input-time-zone.js";
const {
  mode: v,
  scale: h,
  status: y,
  timeZoneOffsetStyle: A
} = S, P = {
  title: "Components/Controls/InputTimeZone",
  args: {
    clearable: !1,
    disabled: !1,
    labelText: "Label text",
    mode: v.defaultValue,
    offsetStyle: "user",
    open: !1,
    placeholder: "Enter a time zone",
    readOnly: !1,
    required: !1,
    scale: h.defaultValue,
    status: y.defaultValue,
    validationMessage: "",
    validationIcon: "",
    value: ""
  },
  argTypes: {
    mode: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    offsetStyle: {
      options: A.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: h.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: y.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: x,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1500
    },
    options: {
      // for stability, we use a timezone unaffected by daylight savings time
      timezone: "America/Mexico_City"
    }
  }
}, n = (e) => t`
  <calcite-input-time-zone
    ${i("clearable", e.clearable)}
    ${i("disabled", e.disabled)}
    ${f("label-text", e.labelText)}
    mode="${e.mode}"
    offset-style="${e.offsetStyle}"
    ${i("open", e.open)}
    placeholder="${e.placeholder}"
    ${i("read-only", e.readOnly)}
    ${i("required", e.required)}
    scale="${e.scale}"
    status="${e.status}"
    value="${e.value}"
    validation-message="${e.validationMessage}"
    ${f("validation-icon", e.validationIcon)}
  ></calcite-input-time-zone>
`, o = () => t`
  <calcite-input-time-zone scale="m" label-text="Label text" required
    ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
  ></calcite-input-time-zone>
`, c = () => t`
  <label>default</label>
  <calcite-input-time-zone mode="offset" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable></calcite-input-time-zone>
  <br />
  <label>initialized as empty</label>
  <calcite-input-time-zone mode="offset" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable value=""></calcite-input-time-zone>
`, l = () => t`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
`, s = () => t`
  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>
`, r = () => (
  // for stability, we use a timezone unaffected by daylight savings time
  t`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`
), m = () => t`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`, p = () => t`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
`, u = () => t`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
`, d = () => t`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`, z = () => t`<calcite-input-time-zone disabled></calcite-input-time-zone>`, a = () => t`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;
a.parameters = {
  themes: $
};
const g = () => t`
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
    <calcite-input-time-zone
      scale="s"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="m"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="l"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
  </div>
`, b = () => t` <calcite-input-time-zone read-only></calcite-input-time-zone> `;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: InputTimeZoneStoryArgs): string => html\`
  <calcite-input-time-zone
    \${boolean("clearable", args.clearable)}
    \${boolean("disabled", args.disabled)}
    \${optionalAttribute("label-text", args.labelText)}
    mode="\${args.mode}"
    offset-style="\${args.offsetStyle}"
    \${boolean("open", args.open)}
    placeholder="\${args.placeholder}"
    \${boolean("read-only", args.readOnly)}
    \${boolean("required", args.required)}
    scale="\${args.scale}"
    status="\${args.status}"
    value="\${args.value}"
    validation-message="\${args.validationMessage}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
  ></calcite-input-time-zone>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-time-zone scale="m" label-text="Label text" required
    ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
  ></calcite-input-time-zone>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <label>default</label>
  <calcite-input-time-zone mode="offset" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable></calcite-input-time-zone>
  <br />
  <label>initialized as empty</label>
  <calcite-input-time-zone mode="offset" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable value=""></calcite-input-time-zone>
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
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>\n`',
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string =>\n// for stability, we use a timezone unaffected by daylight savings time\nhtml`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`',
      ...r.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone value="-360"></calcite-input-time-zone>\n`',
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
\``,
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
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`",
      ...z.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>\n`',
      ...a.parameters?.docs?.source
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
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-input-time-zone
      scale="s"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="m"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
    <calcite-input-time-zone
      scale="l"
      status="invalid"
      value="America/Phoenix"
      validation-message="Choose a closer time zone"
      validation-icon
    ></calcite-input-time-zone>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-input-time-zone read-only></calcite-input-time-zone> `",
      ...b.parameters?.docs?.source
    }
  }
};
const q = ["simple", "internalLabel", "clearable", "timeZoneNameMode", "timeZoneRegionMode", "initialNameSelected", "initialOffsetSelected", "offsetAndGroupLabelsAreLocalized", "offsetAndGroupLabelsBasedOnReferenceDate", "displayingTimeZoneOffsets", "disabled", "darkModeRTL", "validationMessageAllScales", "readOnly"];
export {
  q as __namedExportsOrder,
  c as clearable,
  a as darkModeRTL,
  P as default,
  z as disabled,
  d as displayingTimeZoneOffsets,
  r as initialNameSelected,
  m as initialOffsetSelected,
  o as internalLabel,
  p as offsetAndGroupLabelsAreLocalized,
  u as offsetAndGroupLabelsBasedOnReferenceDate,
  b as readOnly,
  n as simple,
  l as timeZoneNameMode,
  s as timeZoneRegionMode,
  g as validationMessageAllScales
};
