/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { d as i } from "./dom2.js";
import { b as l } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as m } from "./resources34.js";
import "./time-picker.js";
const {
  hourFormat: r,
  menuPlacement: s,
  numberingSystem: o,
  scale: c,
  supportedNlsLocale: p
} = m, b = {
  title: "Components/Controls/Time/Time Picker",
  args: {
    disabled: !1,
    hidden: !1,
    lang: i,
    hourFormat: r.defaultValue,
    numberingSystem: o.defaultValue,
    placement: s.defaultValue,
    scale: c.defaultValue,
    step: 1e-3,
    value: "10:37:09.023"
  },
  argTypes: {
    lang: {
      options: p.values,
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: o.values,
      control: {
        type: "select"
      }
    },
    hourFormat: {
      options: r.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: c.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (e) => n`
  <calcite-time-picker
    ${l("disabled", e.disabled)}
    ${l("hidden", e.hidden)}
    lang="${e.lang}"
    hour-format="${e.hourFormat}"
    numbering-system="${e.numberingSystem}"
    placement="${e.placement}"
    scale="${e.scale}"
    step="${e.step}"
    value="${e.value}"
  >
  </calcite-time-picker>
`, a = () => n`
  <calcite-time-picker lang="ko" value="10:37" step="1"> </calcite-time-picker>
  <calcite-time-picker lang="ko" value="14:37" step="1"> </calcite-time-picker>
`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: TimePickerStoryArgs): string => html\`
  <calcite-time-picker
    \${boolean("disabled", args.disabled)}
    \${boolean("hidden", args.hidden)}
    lang="\${args.lang}"
    hour-format="\${args.hourFormat}"
    numbering-system="\${args.numberingSystem}"
    placement="\${args.placement}"
    scale="\${args.scale}"
    step="\${args.step}"
    value="\${args.value}"
  >
  </calcite-time-picker>
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
  <calcite-time-picker lang="ko" value="10:37" step="1"> </calcite-time-picker>
  <calcite-time-picker lang="ko" value="14:37" step="1"> </calcite-time-picker>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
const h = ["simple", "koreanLocale"];
export {
  h as __namedExportsOrder,
  b as default,
  a as koreanLocale,
  t as simple
};
