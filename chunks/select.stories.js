/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as t, o as s, m as u } from "./utils3.js";
import { h as l } from "./formatting.js";
import { i as v } from "./helpers.js";
import { A as b } from "./resources34.js";
import "./option.js";
import "./option-group.js";
import "./select.js";
const {
  status: p,
  width: d,
  scale: r
} = b, A = {
  title: "Components/Controls/Select",
  args: {
    disabled: !1,
    status: p.defaultValue,
    width: d.defaultValue,
    scale: r.defaultValue,
    validationMessage: "",
    validationIcon: "",
    labelText: "Label text",
    required: !1,
    optionDisabled: !1,
    label: "fancy label",
    selected: !1,
    value: ""
  },
  argTypes: {
    status: {
      options: p.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: d.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: r.values,
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
}, i = (e) => l`
  <div style="width:260px">
    <calcite-select
      ${t("disabled", e.disabled)}
      status="${e.status}"
      width="${e.width}"
      scale="${e.scale}"
      ${s("label-text", e.labelText)}
      ${t("required", e.required)}
      validation-message="${e.validationMessage}"
      ${s("validation-icon", e.validationIcon)}
    >
      <calcite-option
        ${t("disabled", e.optionDisabled)}
        label="${e.label}"
        ${t("selected", e.selected)}
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
`, o = () => l`
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
  themes: u
};
const c = () => l`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
`, n = () => l`
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
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: SelectStoryArgs): string => html\`
  <div style="width:260px">
    <calcite-select
      \${boolean("disabled", args.disabled)}
      status="\${args.status}"
      width="\${args.width}"
      scale="\${args.scale}"
      \${optionalAttribute("label-text", args.labelText)}
      \${boolean("required", args.required)}
      validation-message="\${args.validationMessage}"
      \${optionalAttribute("validation-icon", args.validationIcon)}
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
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-select disabled scale="l">
    <calcite-option label="first" value="1"></calcite-option>
    <calcite-option label="second" value="2"></calcite-option>
  </calcite-select>
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
      ...n.parameters?.docs?.source
    }
  }
};
const w = ["simple", "grouped", "darkModeRTL", "disabledAndLargeScaleGetsMediumChevron", "validationMessageAllScales"];
export {
  w as __namedExportsOrder,
  a as darkModeRTL,
  A as default,
  c as disabledAndLargeScaleGetsMediumChevron,
  o as grouped,
  i as simple,
  n as validationMessageAllScales
};
