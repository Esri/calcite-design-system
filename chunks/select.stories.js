import { k as n, h as l, j as r } from "./index.js";
import { i as u } from "./helpers.js";
import { A as v } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  status: s,
  width: p,
  scale: d
} = v, g = {
  title: "Components/Controls/Select",
  args: {
    disabled: !1,
    status: s.defaultValue,
    width: p.defaultValue,
    scale: d.defaultValue,
    validationMessage: "",
    validationIcon: "",
    optionDisabled: !1,
    label: "fancy label",
    selected: !1,
    value: ""
  },
  argTypes: {
    status: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: p.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: d.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: u,
      control: {
        type: "select"
      }
    }
  }
}, t = (e) => l`
  <div style="width:260px">
    <calcite-select
      ${n("disabled", e.disabled)}
      status="${e.status}"
      width="${e.width}"
      scale="${e.scale}"
      validation-message="${e.validationMessage}"
      validation-icon="${e.validationIcon}"
    >
      <calcite-option
        ${n("disabled", e.optionDisabled)}
        label="${e.label}"
        ${n("selected", e.selected)}
        value="${e.value}"
      ></calcite-option>
      <calcite-option
        selected
        label="some fixed option with a very long label set on it to extend past the end"
        value="some-fixed-value"
      ></calcite-option>
      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>
    </calcite-select>
  </div>
`, i = () => l`
  <calcite-select status="idle" width="auto" scale="m">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
`, a = () => l`
  <calcite-select status="idle" width="auto" scale="m" dir="rtl" class="calcite-mode-dark">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
`;
a.parameters = {
  themes: r
};
const o = () => l`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
`, c = () => l`
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
    <calcite-select scale="s" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="m" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="l" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
  </div>
`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: SelectStoryArgs): string => html\`
  <div style="width:260px">
    <calcite-select
      \${boolean("disabled", args.disabled)}
      status="\${args.status}"
      width="\${args.width}"
      scale="\${args.scale}"
      validation-message="\${args.validationMessage}"
      validation-icon="\${args.validationIcon}"
    >
      <calcite-option
        \${boolean("disabled", args.optionDisabled)}
        label="\${args.label}"
        \${boolean("selected", args.selected)}
        value="\${args.value}"
      ></calcite-option>
      <calcite-option
        selected
        label="some fixed option with a very long label set on it to extend past the end"
        value="some-fixed-value"
      ></calcite-option>
      <calcite-option label="another fixed option" value="another-fixed-value"></calcite-option>
    </calcite-select>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-select status="idle" width="auto" scale="m">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-select status="idle" width="auto" scale="m" dir="rtl" class="calcite-mode-dark">
    <calcite-option-group label="My fancy group label">
      <calcite-option label="fancy label" value="value"></calcite-option>
      <calcite-option label="some fixed option (A)" value="some-fixed-value-a"></calcite-option>
      <calcite-option label="another fixed option (A)" value="another-fixed-value-a"></calcite-option>
    </calcite-option-group>
    <calcite-option-group label="group B (fixed)">
      <calcite-option label="some fixed option (B)" value="some-fixed-value-b"></calcite-option>
      <calcite-option label="another fixed option (B)" value="another-fixed-value-b"></calcite-option>
    </calcite-option-group>
  </calcite-select>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
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
    <calcite-select scale="s" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="m" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
    <calcite-select scale="l" validation-message="This field is required." validation-icon status="invalid">
      <calcite-option label="first" value="1"></calcite-option>
      <calcite-option label="second" value="2"></calcite-option>
    </calcite-select>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const x = ["simple", "grouped", "darkModeRTL_TestOnly", "disabledAndLargeScaleGetsMediumChevron_TestOnly", "validationMessageAllScales_TestOnly"];
export {
  x as __namedExportsOrder,
  a as darkModeRTL_TestOnly,
  g as default,
  o as disabledAndLargeScaleGetsMediumChevron_TestOnly,
  i as grouped,
  t as simple,
  c as validationMessageAllScales_TestOnly
};
