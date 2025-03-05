import { i as y } from "./helpers.js";
import { b as h, m as b } from "./utils.js";
import { h as e } from "./formatting.js";
import { A as T } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const {
  mode: g,
  scale: v,
  status: f
} = T, A = {
  title: "Components/Controls/InputTimeZone",
  args: {
    disabled: !1,
    mode: g.defaultValue,
    scale: v.defaultValue,
    status: f.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    mode: {
      options: g.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: f.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: y,
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
}, a = (t) => e`
  <calcite-input-time-zone
    ${h("disabled", t.disabled)}
    mode="${t.mode}"
    scale="${t.scale}"
    status="${t.status}"
    validation-message="${t.validationMessage}"
    validation-icon="${t.validationIcon}"
  ></calcite-input-time-zone>
`, n = () => e`
  <label>default</label>
  <calcite-input-time-zone mode="offset" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable></calcite-input-time-zone>
  <br />
  <label>initialized as empty</label>
  <calcite-input-time-zone mode="offset" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable value=""></calcite-input-time-zone>
`, o = () => e`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
`, c = () => e`
  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>
`, l = () => (
  // for stability, we use a timezone unaffected by daylight savings time
  e`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`
), s = () => e`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`, r = () => e`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
`, m = () => e`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
`, p = () => e`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`, u = () => e`<calcite-input-time-zone disabled></calcite-input-time-zone>`, i = () => e`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;
i.parameters = {
  themes: b
};
const d = () => e`
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
`, z = () => e` <calcite-input-time-zone read-only></calcite-input-time-zone> `;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: InputTimeZoneStoryArgs): string => html\`
  <calcite-input-time-zone
    \${boolean("disabled", args.disabled)}
    mode="\${args.mode}"
    scale="\${args.scale}"
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    validation-icon="\${args.validationIcon}"
  ></calcite-input-time-zone>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>\n`',
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>\n`',
      ...c.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string =>\n// for stability, we use a timezone unaffected by daylight savings time\nhtml`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`',
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone value="-360"></calcite-input-time-zone>\n`',
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
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
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
      originalSource: `(): string => html\`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
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
      originalSource: "(): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`",
      ...u.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>\n`',
      ...i.parameters?.docs?.source
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
      ...d.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-input-time-zone read-only></calcite-input-time-zone> `",
      ...z.parameters?.docs?.source
    }
  }
};
const M = ["simple", "clearable", "timeZoneNameMode_TestOnly", "timeZoneRegionMode_TestOnly", "initialNameSelected_TestOnly", "initialOffsetSelected_TestOnly", "offsetAndGroupLabelsAreLocalized_TestOnly", "offsetAndGroupLabelsBasedOnReferenceDate_TestOnly", "displayingTimeZoneOffsets_TestOnly", "disabled_TestOnly", "darkModeRTL_TestOnly", "validationMessageAllScales_TestOnly", "readOnly"];
export {
  M as __namedExportsOrder,
  n as clearable,
  i as darkModeRTL_TestOnly,
  A as default,
  u as disabled_TestOnly,
  p as displayingTimeZoneOffsets_TestOnly,
  l as initialNameSelected_TestOnly,
  s as initialOffsetSelected_TestOnly,
  r as offsetAndGroupLabelsAreLocalized_TestOnly,
  m as offsetAndGroupLabelsBasedOnReferenceDate_TestOnly,
  z as readOnly,
  a as simple,
  o as timeZoneNameMode_TestOnly,
  c as timeZoneRegionMode_TestOnly,
  d as validationMessageAllScales_TestOnly
};
