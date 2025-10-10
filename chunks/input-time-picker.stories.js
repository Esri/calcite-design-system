import { i as O } from "./helpers.js";
import { n as f, h as t, k as g, j as S } from "./index.js";
import { m as b, d as $ } from "./floating-ui.js";
import { A as w } from "./resources16.js";
import { j as x } from "./time.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var y = Object.freeze, P = Object.defineProperty, D = (e, F) => y(P(e, "raw", { value: y(e.slice()) })), h;
const {
  scale: T,
  status: _
} = w, B = {
  title: "Components/Controls/Time/Input Time Picker",
  args: {
    disabled: !1,
    hidden: !1,
    hourFormat: void 0,
    name: "simple",
    placement: $,
    scale: T.defaultValue,
    status: _.defaultValue,
    step: 1,
    validationMessage: "",
    validationIcon: "",
    value: "10:37"
  },
  argTypes: {
    hourFormat: {
      options: x,
      control: {
        type: "select"
      }
    },
    placement: {
      options: b,
      control: {
        type: "select"
      }
    },
    scale: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: _.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: O,
      control: {
        type: "select"
      }
    }
  }
}, c = (e) => t`
  <calcite-input-time-picker
    ${g("disabled", e.disabled)}
    ${g("hidden", e.hidden)}
    hour-format="${e.hourFormat}"
    name="${e.name}"
    placement="${e.placement}"
    scale="${e.scale}"
    status="${e.status}"
    step="${e.step}"
    validation-message="${e.validationMessage}"
    validation-icon="${e.validationIcon}"
    value="${e.value}"
  >
  </calcite-input-time-picker>
`, n = () => t`
  <calcite-input-time-picker step="0.1" value="10:37:09.5" open> </calcite-input-time-picker>
`, s = () => t`
  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>
`, r = () => t`
  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>
`, l = () => t`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`, o = () => t`
  <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
`, i = () => t`
  <calcite-input-time-picker
    class="calcite-mode-dark"
    value="22:37"
    step="1"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-input-time-picker>
`;
i.parameters = {
  themes: S
};
const p = () => t`
  <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker>
`, m = () => t`
  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>
`, u = () => t`
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
`, d = () => t`
  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>
`, k = () => t`
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
    <calcite-input-time-picker
      scale="s"
      status="invalid"
      value="13:37"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="m"
      status="invalid"
      value="4:20"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="l"
      status="invalid"
      value="11:11"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
  </div>
`, v = () => f(t`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`), a = () => t(h || (h = D([`<calcite-input-time-picker></calcite-input-time-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-time-picker");
        const inputDatePicker = await document.querySelector("calcite-input-time-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`])));
a.parameters = {
  chromatic: {
    delay: 2e3
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: InputTimePickerStoryArgs): string => html\`
  <calcite-input-time-picker
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    hour-format="\${args.hourFormat}"
    name="\${args.name}"
    placement="\${args.placement}"
    scale="\${args.scale}"
    status="\${args.status}"
    step="\${args.step}"
    validation-message="\${args.validationMessage}"
    validation-icon="\${args.validationIcon}"
    value="\${args.value}"
  >
  </calcite-input-time-picker>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker step="0.1" value="10:37:09.5" open> </calcite-input-time-picker>\n`',
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>\n`',
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`',
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
  <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
  <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
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
  <calcite-input-time-picker
    class="calcite-mode-dark"
    value="22:37"
    step="1"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-input-time-picker>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker>\n`',
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>\n`',
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
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
      originalSource: '(): string => html`\n  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>\n`',
      ...d.parameters?.docs?.source
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
    <calcite-input-time-picker
      scale="s"
      status="invalid"
      value="13:37"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="m"
      status="invalid"
      value="4:20"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
    <calcite-input-time-picker
      scale="l"
      status="invalid"
      value="11:11"
      validation-message="Choose a more recent time"
      validation-icon
    ></calcite-input-time-picker>
  </div>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`)',
      ...v.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-input-time-picker></calcite-input-time-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-time-picker");
        const inputDatePicker = await document.querySelector("calcite-input-time-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
      ...a.parameters?.docs?.source
    }
  }
};
const N = ["simple", "deciSeconds_TestOnly", "centiseconds_TestOnly", "milliseconds_TestOnly", "disabled_TestOnly", "scales_TestOnly", "darkModeRTL_TestOnly", "open_TestOnly", "koreanLocale_TestOnly", "arabicLocaleNumberingSystem_TestOnly", "readOnlyHasNoDropdownAffordance_TestOnly", "validationMessageAllScales_TestOnly", "widthSetToBreakpoints_TestOnly", "Focus"];
export {
  a as Focus,
  N as __namedExportsOrder,
  u as arabicLocaleNumberingSystem_TestOnly,
  s as centiseconds_TestOnly,
  i as darkModeRTL_TestOnly,
  n as deciSeconds_TestOnly,
  B as default,
  l as disabled_TestOnly,
  m as koreanLocale_TestOnly,
  r as milliseconds_TestOnly,
  p as open_TestOnly,
  d as readOnlyHasNoDropdownAffordance_TestOnly,
  o as scales_TestOnly,
  c as simple,
  k as validationMessageAllScales_TestOnly,
  v as widthSetToBreakpoints_TestOnly
};
