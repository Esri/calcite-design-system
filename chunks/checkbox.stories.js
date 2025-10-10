import { k as t, h as s, j as i } from "./index.js";
import { A as n } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: o,
  status: r
} = n, m = {
  title: "Components/Controls/Checkbox",
  args: {
    checked: !0,
    disabled: !1,
    indeterminate: !1,
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
}, a = (e) => s`
  <calcite-label layout="inline">
    <calcite-checkbox
      ${t("checked", e.checked)}
      ${t("disabled", e.disabled)}
      ${t("indeterminate", e.indeterminate)}
      scale="${e.scale}"
      status="${e.status}"
    ></calcite-checkbox>
    ${e.label}
  </calcite-label>
`, l = () => s`<calcite-checkbox checked disabled></calcite-checkbox>`, c = () => s`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;
c.parameters = {
  themes: i
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: CheckboxStoryArgs): string => html\`
  <calcite-label layout="inline">
    <calcite-checkbox
      \${boolean("checked", args.checked)}
      \${boolean("disabled", args.disabled)}
      \${boolean("indeterminate", args.indeterminate)}
      scale="\${args.scale}"
      status="\${args.status}"
    ></calcite-checkbox>
    \${args.label}
  </calcite-label>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`",
      ...l.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const h = ["simple", "disabled_TestOnly", "darkModeRTL_TestOnly"];
export {
  h as __namedExportsOrder,
  c as darkModeRTL_TestOnly,
  m as default,
  l as disabled_TestOnly,
  a as simple
};
