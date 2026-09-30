/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as l, o as r, m as d } from "./utils3.js";
import { h as s } from "./formatting.js";
import { A as p } from "./resources34.js";
import { i as b } from "./helpers.js";
import { I as m } from "./fab.js";
const {
  appearance: c,
  kind: o,
  scale: i
} = p, k = {
  title: "Components/Buttons/FAB",
  args: {
    appearance: c.values[2],
    disabled: !1,
    icon: m.plus,
    iconFlipRtl: !1,
    kind: o.defaultValue,
    label: "Label",
    loading: !1,
    text: "Text",
    textEnabled: !0,
    scale: i.defaultValue
  },
  argTypes: {
    appearance: {
      options: c.values.filter((e) => e !== "outline" && e !== "transparent"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: b,
      control: {
        type: "select"
      }
    },
    kind: {
      options: o.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: i.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (e) => s`
  <calcite-fab
    appearance="${e.appearance}"
    ${l("disabled", e.disabled)}
    ${r("icon", e.icon)}
    ${l("icon-flip-rtl", e.iconFlipRtl)}
    kind="${e.kind}"
    label="${e.label}"
    ${l("loading", e.loading)}
    text="${e.text}"
    ${l("text-enabled", e.textEnabled)}
    scale="${e.scale}"
  ></calcite-fab>
`, n = () => s`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
`, a = () => s`
  <calcite-fab
    appearance="outline-fill"
    icon="plus"
    label="Label"
    text="Text"
    text-enabled
    scale="m"
    dir="rtl"
    class="calcite-mode-dark"
  ></calcite-fab>
`;
a.parameters = {
  themes: d
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: FabStoryArgs): string => html\`
  <calcite-fab
    appearance="\${args.appearance}"
    \${boolean("disabled", args.disabled)}
    \${optionalAttribute("icon", args.icon)}
    \${boolean("icon-flip-rtl", args.iconFlipRtl)}
    kind="\${args.kind}"
    label="\${args.label}"
    \${boolean("loading", args.loading)}
    text="\${args.text}"
    \${boolean("text-enabled", args.textEnabled)}
    scale="\${args.scale}"
  ></calcite-fab>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-fab
    appearance="outline-fill"
    icon="plus"
    label="Label"
    text="Text"
    text-enabled
    scale="m"
    dir="rtl"
    class="calcite-mode-dark"
  ></calcite-fab>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
const T = ["simple", "disabled", "darkModeRTL"];
export {
  T as __namedExportsOrder,
  a as darkModeRTL,
  k as default,
  n as disabled,
  t as simple
};
