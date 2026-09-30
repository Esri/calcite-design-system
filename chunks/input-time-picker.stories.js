/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as W } from "./helpers.js";
import { b as t, o as y, c as A, m as C } from "./utils3.js";
import { h as i } from "./formatting.js";
import { A as D } from "./resources34.js";
import "./input-time-picker.js";
import "./label2.js";
var f = Object.freeze, P = Object.defineProperty, O = (e, F) => f(P(e, "raw", { value: f(e.slice()) })), $;
const {
  hourFormat: _,
  menuPlacement: S,
  scale: w,
  status: T
} = D, R = {
  title: "Components/Controls/Time/Input Time Picker",
  args: {
    clearable: !1,
    disabled: !1,
    hidden: !1,
    hourFormat: void 0,
    labelText: "Label text",
    max: "",
    min: "",
    open: !1,
    placement: S.defaultValue,
    readOnly: !1,
    required: !1,
    scale: w.defaultValue,
    status: T.defaultValue,
    step: 1,
    validationMessage: "",
    validationIcon: "",
    value: "10:37"
  },
  argTypes: {
    hourFormat: {
      options: _.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: S.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: w.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: W,
      control: {
        type: "select"
      }
    }
  }
}, l = (e) => i`
  <calcite-input-time-picker
    ${t("clearable", e.clearable)}
    ${t("disabled", e.disabled)}
    ${t("hidden", e.hidden)}
    hour-format="${e.hourFormat}"
    ${y("label-text", e.labelText)}
    max="${e.max}"
    min="${e.min}"
    placeholder="${e.placeholder}"
    placement="${e.placement}"
    ${t("read-only", e.readOnly)}
    ${t("required", e.required)}
    scale="${e.scale}"
    status="${e.status}"
    step="${e.step}"
    validation-message="${e.validationMessage}"
    ${y("validation-icon", e.validationIcon)}
    value="${e.value}"
  >
  </calcite-input-time-picker>
`, n = () => i`
  <calcite-input-time-picker step="0.1" value="10:37:09.5" open> </calcite-input-time-picker>
`, r = () => i`
  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>
`, p = () => i`
  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>
`, s = () => i`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`, o = () => i`
  <div style="display: flex; gap: 20px">
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        value
        <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        value
        <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        value
        <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="s" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="m" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="l" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="s"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="m"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="l"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="s" icon></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="m" icon></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="l" icon></calcite-input-time-picker>
      </calcite-label>
    </div>
  </div>
`, a = () => i`
  <calcite-input-time-picker
    class="calcite-mode-dark"
    value="22:37"
    step="1"
    validation-message="This should not appear because the status is not 'invalid'"
  >
  </calcite-input-time-picker>
`;
a.parameters = {
  themes: C
};
const m = () => i` <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker> `, u = () => i`
  <calcite-input-time-picker lang="fr-CA" value="10:37:45.321" step=".001" hour-format="12" open>
  </calcite-input-time-picker>
`, d = () => i`
  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>
`, k = () => i`
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
`, v = () => i`
  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>
`, h = () => i`
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
`, b = () => A(i`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`), c = () => i($ || ($ = O([`<calcite-input-time-picker></calcite-input-time-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-time-picker");
        const inputDatePicker = await document.querySelector("calcite-input-time-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>`])));
c.parameters = {
  chromatic: {
    delay: 2e3
  }
};
const g = () => i`
  <calcite-input-time-picker clearable value="10:37"></calcite-input-time-picker>
`, x = () => i`
  <style>
    calcite-input-time-picker {
      width: 300px;
    }
  </style>
  <calcite-input-time-picker value="22:37"></calcite-input-time-picker>
  <br />
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" value="22:37"></calcite-input-time-picker>
`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: InputTimePickerStoryArgs): string => html\`
  <calcite-input-time-picker
    \${boolean("clearable", args.clearable)}
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    hour-format="\${args.hourFormat}"
    \${optionalAttribute("label-text", args.labelText)}
    max="\${args.max}"
    min="\${args.min}"
    placeholder="\${args.placeholder}"
    placement="\${args.placement}"
    \${boolean("read-only", args.readOnly)}
    \${boolean("required", args.required)}
    scale="\${args.scale}"
    status="\${args.status}"
    step="\${args.step}"
    validation-message="\${args.validationMessage}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
    value="\${args.value}"
  >
  </calcite-input-time-picker>
\``,
      ...l.parameters?.docs?.source
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker step="0.01" value="10:37:09.06" open> </calcite-input-time-picker>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker step="0.001" value="10:37:09.023" open> </calcite-input-time-picker>\n`',
      ...p.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-input-time-picker disabled scale="l" icon step="1" value="01:02"></calcite-input-time-picker>`',
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: flex; gap: 20px">
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        value
        <calcite-input-time-picker scale="s" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        value
        <calcite-input-time-picker scale="m" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        value
        <calcite-input-time-picker scale="l" icon value="01:02"></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="s" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="m" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder
        <calcite-input-time-picker scale="l" icon placeholder="With placeholder text"></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="s"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="m"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        placeholder + value
        <calcite-input-time-picker
          scale="l"
          icon
          placeholder="With placeholder text"
          value="01:02"
        ></calcite-input-time-picker>
      </calcite-label>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="s" icon></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="m" icon></calcite-input-time-picker>
      </calcite-label>
      <calcite-label>
        no placeholder + no value
        <calcite-input-time-picker scale="l" icon></calcite-input-time-picker>
      </calcite-label>
    </div>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
      ...a.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-input-time-picker value="10:37" open> </calcite-input-time-picker> `',
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
  <calcite-input-time-picker lang="fr-CA" value="10:37:45.321" step=".001" hour-format="12" open>
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
      originalSource: '(): string => html`\n  <calcite-input-time-picker lang="ko" value="10:37" step="1" open> </calcite-input-time-picker>\n`',
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
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" step="1" value="1:33:7" open>
  </calcite-input-time-picker>
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
      originalSource: '(): string => html`\n  <calcite-input-time-picker read-only value="10:37"></calcite-input-time-picker>\n`',
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
      ...h.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => createBreakpointStories(html`<calcite-input-time-picker scale="{scale}" value="12:34"></calcite-input-time-picker>`)',
      ...b.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-input-time-picker></calcite-input-time-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-input-time-picker");
        const inputDatePicker = await document.querySelector("calcite-input-time-picker").componentOnReady();
        await inputDatePicker.setFocus();
      })();
    <\/script>\``,
      ...c.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-input-time-picker clearable value="10:37"></calcite-input-time-picker>\n`',
      ...g.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-input-time-picker {
      width: 300px;
    }
  </style>
  <calcite-input-time-picker value="22:37"></calcite-input-time-picker>
  <br />
  <calcite-input-time-picker dir="rtl" lang="ar" numbering-system="arab" value="22:37"></calcite-input-time-picker>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
const E = ["simple", "deciSeconds", "centiseconds", "milliseconds", "disabled", "scales", "darkModeRTL", "open", "frenchCanadianLocale", "koreanLocale", "arabicLocaleNumberingSystem", "readOnlyHasNoDropdownAffordance", "validationMessageAllScales", "widthSetToBreakpoints", "Focus", "clearable", "timePartsAlignedInBothDirectionsWhenWide"];
export {
  c as Focus,
  E as __namedExportsOrder,
  k as arabicLocaleNumberingSystem,
  r as centiseconds,
  g as clearable,
  a as darkModeRTL,
  n as deciSeconds,
  R as default,
  s as disabled,
  u as frenchCanadianLocale,
  d as koreanLocale,
  p as milliseconds,
  m as open,
  v as readOnlyHasNoDropdownAffordance,
  o as scales,
  l as simple,
  x as timePartsAlignedInBothDirectionsWhenWide,
  h as validationMessageAllScales,
  b as widthSetToBreakpoints
};
