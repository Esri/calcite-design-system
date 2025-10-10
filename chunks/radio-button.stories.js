import { k as l, h as c, j as d } from "./index.js";
import { A as i } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: s
} = i, u = {
  title: "Components/Controls/Radio/Radio Button",
  args: {
    checked: !1,
    disabled: !1,
    hidden: !1,
    focused: !1,
    scale: s.defaultValue,
    label: "Radio Button"
  },
  argTypes: {
    scale: {
      options: s.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (e) => c`
  <calcite-label layout="inline">
    <calcite-radio-button
      ${l("checked", e.checked)}
      ${l("disabled", e.disabled)}
      ${l("hidden", e.hidden)}
      ${l("focused", e.focused)}
      name="simple"
      scale="${e.scale}"
      value="value"
    ></calcite-radio-button>
    ${e.label}
  </calcite-label>
`, a = () => c`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
`;
a.parameters = {
  themes: d
};
const o = () => c`<calcite-radio-button checked disabled></calcite-radio-button>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: RadioButtonStoryArgs): string => html\`
  <calcite-label layout="inline">
    <calcite-radio-button
      \${boolean("checked", args.checked)}
      \${boolean("disabled", args.disabled)}
      \${boolean("hidden", args.hidden)}
      \${boolean("focused", args.focused)}
      name="simple"
      scale="\${args.scale}"
      value="value"
    ></calcite-radio-button>
    \${args.label}
  </calcite-label>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
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
      originalSource: "(): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`",
      ...o.parameters?.docs?.source
    }
  }
};
const b = ["simple", "darkModeRTL_TestOnly", "disabled_TestOnly"];
export {
  b as __namedExportsOrder,
  a as darkModeRTL_TestOnly,
  u as default,
  o as disabled_TestOnly,
  t as simple
};
