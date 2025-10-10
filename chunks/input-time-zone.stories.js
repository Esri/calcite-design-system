import { i as h } from "./helpers.js";
import { k as y, h as e, j as T } from "./index.js";
import { A as x } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  mode: v,
  scale: b,
  status: f
} = x, A = {
  title: "Components/Controls/InputTimeZone",
  args: {
    disabled: !1,
    mode: v.defaultValue,
    scale: b.defaultValue,
    status: f.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    mode: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: b.values,
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
      options: h,
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
    ${y("disabled", t.disabled)}
    mode="${t.mode}"
    scale="${t.scale}"
    status="${t.status}"
    validation-message="${t.validationMessage}"
    validation-icon="${t.validationIcon}"
  ></calcite-input-time-zone>
`, n = () => e`
  <calcite-input-time-zone scale="m" label-text="Label text" required
    ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
  ></calcite-input-time-zone>
`, o = () => e`
  <label>default</label>
  <calcite-input-time-zone mode="offset" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable></calcite-input-time-zone>
  <br />
  <label>initialized as empty</label>
  <calcite-input-time-zone mode="offset" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="name" clearable value=""></calcite-input-time-zone>
  <calcite-input-time-zone mode="region" clearable value=""></calcite-input-time-zone>
`, c = () => e`
  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>
`, l = () => e`
  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>
`, s = () => (
  // for stability, we use a timezone unaffected by daylight savings time
  e`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`
), r = () => e`
  <calcite-input-time-zone value="-360"></calcite-input-time-zone>
`, m = () => e`
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
`, p = () => e`
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
`, u = () => e`
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
`, d = () => e`<calcite-input-time-zone disabled></calcite-input-time-zone>`, i = () => e`
  <calcite-input-time-zone dir="rtl" class="calcite-mode-dark"></calcite-input-time-zone>
`;
i.parameters = {
  themes: T
};
const z = () => e`
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
`, g = () => e` <calcite-input-time-zone read-only></calcite-input-time-zone> `;
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
  <calcite-input-time-zone scale="m" label-text="Label text" required
    ><calcite-icon slot="label-content" icon="banana" scale="m"></calcite-icon
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
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="name" open></calcite-input-time-zone>\n`',
      ...c.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone mode="region" open></calcite-input-time-zone>\n`',
      ...l.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string =>\n// for stability, we use a timezone unaffected by daylight savings time\nhtml`<calcite-input-time-zone mode="name" value="America/Phoenix"></calcite-input-time-zone>`',
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-zone value="-360"></calcite-input-time-zone>\n`',
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
  <calcite-input-time-zone lang="en"></calcite-input-time-zone>
  <calcite-input-time-zone lang="es"></calcite-input-time-zone>
  <calcite-input-time-zone lang="fr"></calcite-input-time-zone>
  <calcite-input-time-zone lang="zh"></calcite-input-time-zone>
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
  <calcite-input-time-zone></calcite-input-time-zone>
  <calcite-input-time-zone reference-date="2023-11-28T06:31:19.129Z"></calcite-input-time-zone>
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
  <div style="width: 450px; height: 500px;">
    <calcite-input-time-zone open></calcite-input-time-zone>
  </div>
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
      originalSource: "(): string => html`<calcite-input-time-zone disabled></calcite-input-time-zone>`",
      ...d.parameters?.docs?.source
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
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
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
      ...z.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-input-time-zone read-only></calcite-input-time-zone> `",
      ...g.parameters?.docs?.source
    }
  }
};
const L = ["simple", "internalLabel", "clearable", "timeZoneNameMode_TestOnly", "timeZoneRegionMode_TestOnly", "initialNameSelected_TestOnly", "initialOffsetSelected_TestOnly", "offsetAndGroupLabelsAreLocalized_TestOnly", "offsetAndGroupLabelsBasedOnReferenceDate_TestOnly", "displayingTimeZoneOffsets_TestOnly", "disabled_TestOnly", "darkModeRTL_TestOnly", "validationMessageAllScales_TestOnly", "readOnly"];
export {
  L as __namedExportsOrder,
  o as clearable,
  i as darkModeRTL_TestOnly,
  A as default,
  d as disabled_TestOnly,
  u as displayingTimeZoneOffsets_TestOnly,
  s as initialNameSelected_TestOnly,
  r as initialOffsetSelected_TestOnly,
  n as internalLabel,
  m as offsetAndGroupLabelsAreLocalized_TestOnly,
  p as offsetAndGroupLabelsBasedOnReferenceDate_TestOnly,
  g as readOnly,
  a as simple,
  c as timeZoneNameMode_TestOnly,
  l as timeZoneRegionMode_TestOnly,
  z as validationMessageAllScales_TestOnly
};
