/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as c, o as i, m as d } from "./utils3.js";
import { h as l } from "./formatting.js";
import { A as n } from "./resources34.js";
import "./checkbox.js";
import "./label2.js";
const {
  scale: o,
  status: r
} = n, p = {
  title: "Components/Controls/Checkbox",
  args: {
    checked: !0,
    disabled: !1,
    indeterminate: !1,
    labelText: "Label text",
    required: !1,
    scale: o.defaultValue,
    status: r.defaultValue,
    label: "Checkbox"
  },
  argTypes: {
    scale: {
      options: o.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: r.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (e) => l`
  <calcite-checkbox
    ${c("checked", e.checked)}
    ${c("disabled", e.disabled)}
    ${c("indeterminate", e.indeterminate)}
    ${i("label-text", e.labelText)}
    ${c("required", e.required)}
    scale="${e.scale}"
    status="${e.status}"
  ></calcite-checkbox>
`, s = () => l`<calcite-checkbox checked disabled></calcite-checkbox>`, a = () => l`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;
a.parameters = {
  themes: d
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: CheckboxStoryArgs): string => html\`
  <calcite-checkbox
    \${boolean("checked", args.checked)}
    \${boolean("disabled", args.disabled)}
    \${boolean("indeterminate", args.indeterminate)}
    \${optionalAttribute("label-text", args.labelText)}
    \${boolean("required", args.required)}
    scale="\${args.scale}"
    status="\${args.status}"
  ></calcite-checkbox>
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
      originalSource: "(): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`",
      ...s.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
const x = ["simple", "disabled", "darkModeRTL"];
export {
  x as __namedExportsOrder,
  a as darkModeRTL,
  p as default,
  s as disabled,
  t as simple
};
