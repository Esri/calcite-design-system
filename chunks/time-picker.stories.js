import { k as s, h as l } from "./index.js";
import { m as c, d as i } from "./floating-ui.js";
import { e as r, c as m, f as o, d as p } from "./locale.js";
import { A as d } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: n
} = d, b = {
  title: "Components/Controls/Time/Time Picker",
  args: {
    disabled: !1,
    hidden: !1,
    lang: p,
    name: "simple",
    numberingSystem: o,
    placement: i,
    scale: n.defaultValue,
    step: 1e-3,
    value: "10:37:09.023"
  },
  argTypes: {
    lang: {
      options: m,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: r,
      control: {
        type: "select"
      }
    },
    placement: {
      options: c,
      control: {
        type: "select"
      }
    },
    scale: {
      options: n.values,
      control: {
        type: "select"
      }
    }
  }
}, a = (e) => l`
  <calcite-time-picker
    ${s("disabled", e.disabled)}
    ${s("hidden", e.hidden)}
    lang="${e.lang}"
    name="${e.name}"
    numbering-system="${e.numberingSystem}"
    placement="${e.placement}"
    scale="${e.scale}"
    step="${e.step}"
    value="${e.value}"
  >
  </calcite-time-picker>
`, t = () => l`
  <calcite-time-picker lang="ko" value="10:37" step="1"> </calcite-time-picker>
  <calcite-time-picker lang="ko" value="14:37" step="1"> </calcite-time-picker>
`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: TimePickerStoryArgs): string => html\`
  <calcite-time-picker
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    lang="\${args.lang}"
    name="\${args.name}"
    numbering-system="\${args.numberingSystem}"
    placement="\${args.placement}"
    scale="\${args.scale}"
    step="\${args.step}"
    value="\${args.value}"
  >
  </calcite-time-picker>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-time-picker lang="ko" value="10:37" step="1"> </calcite-time-picker>
  <calcite-time-picker lang="ko" value="14:37" step="1"> </calcite-time-picker>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const y = ["simple", "koreanLocale_TestOnly"];
export {
  y as __namedExportsOrder,
  b as default,
  t as koreanLocale_TestOnly,
  a as simple
};
