import { k as s, h as c, j as o } from "./index.js";
import { A as i } from "./resources16.js";
import { I as d } from "./resources10.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  appearance: n,
  scale: r
} = i, f = {
  title: "Components/Buttons/FAB",
  args: {
    appearance: n.values[2],
    disabled: !1,
    icon: d.plus,
    label: "Label",
    loading: !1,
    text: "Text",
    textEnabled: !0,
    scale: r.defaultValue
  },
  argTypes: {
    appearance: {
      options: n.values.filter((e) => e !== "outline" && e !== "transparent"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: r.values,
      control: {
        type: "select"
      }
    }
  }
}, l = (e) => c`
  <calcite-fab
    appearance="${e.appearance}"
    ${s("disabled", e.disabled)}
    icon="${e.icon}"
    label="${e.label}"
    ${s("loading", e.loading)}
    text="${e.text}"
    ${s("text-enabled", e.textEnabled)}
    scale="${e.scale}"
  ></calcite-fab>
`, t = () => c`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
`, a = () => c`
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
  themes: o
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: FabStoryArgs): string => html\`
  <calcite-fab
    appearance="\${args.appearance}"
    \${boolean("disabled", args.disabled)}
    icon="\${args.icon}"
    label="\${args.label}"
    \${boolean("loading", args.loading)}
    text="\${args.text}"
    \${boolean("text-enabled", args.textEnabled)}
    scale="\${args.scale}"
  ></calcite-fab>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-fab disabled icon="plus"></calcite-fab>
  <br />
  <calcite-fab disabled loading icon="plus"></calcite-fab>
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
const u = ["simple", "disabled_TestOnly", "darkModeRTL_TestOnly"];
export {
  u as __namedExportsOrder,
  a as darkModeRTL_TestOnly,
  f as default,
  t as disabled_TestOnly,
  l as simple
};
