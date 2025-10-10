import { k as c, h as t } from "./index.js";
import { i as u } from "./helpers.js";
import { A as m } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  alignment: d,
  buttonType: p,
  width: h
} = m, b = {
  title: "Components/Tiles/Tile Select",
  args: {
    checked: !1,
    description: "",
    disabled: !1,
    heading: "",
    hidden: !1,
    icon: "",
    inputAlignment: d.defaultValue,
    inputEnabled: !1,
    type: p.defaultValue,
    value: "one",
    width: h.defaultValue
  },
  argTypes: {
    icon: {
      options: u,
      control: {
        type: "select"
      }
    },
    inputAlignment: {
      options: d.values.filter((e) => e !== "center"),
      control: {
        type: "select"
      }
    },
    type: {
      options: p.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: h.values.filter((e) => e !== "half"),
      control: {
        type: "select"
      }
    }
  }
}, l = (e) => t`
  <calcite-tile-select
    ${c("checked", e.checked)}
    description="${e.description}"
    ${c("disabled", e.disabled)}
    heading="${e.heading}"
    ${c("hidden", e.hidden)}
    icon="${e.icon}"
    input-alignment="${e.inputAlignment}"
    ${c("input-enabled", e.inputEnabled)}
    type="${e.type}"
    value="${e.value}"
    width="${e.width}"
  ></calcite-tile-select>
`, i = () => t`<calcite-tile-select icon="check" heading="test" value="one" type="checkbox"></calcite-tile-select>`, a = () => t`<calcite-tile-select icon="list-radio" heading="test" value="one" type="radio"></calcite-tile-select>`, s = () => t`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
  ></calcite-tile-select>`, n = () => t`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
  ></calcite-tile-select>`, o = () => t`<calcite-tile-select
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
    width="full"
  ></calcite-tile-select>`, r = () => t`<calcite-tile-select
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
    width="full"
  ></calcite-tile-select>`;
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: TileSelectStoryArgs): string => html\`
  <calcite-tile-select
    \${boolean("checked", args.checked)}
    description="\${args.description}"
    \${boolean("disabled", args.disabled)}
    heading="\${args.heading}"
    \${boolean("hidden", args.hidden)}
    icon="\${args.icon}"
    input-alignment="\${args.inputAlignment}"
    \${boolean("input-enabled", args.inputEnabled)}
    type="\${args.type}"
    value="\${args.value}"
    width="\${args.width}"
  ></calcite-tile-select>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tile-select icon="check" heading="test" value="one" type="checkbox"></calcite-tile-select>`',
      ...i.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-tile-select icon="list-radio" heading="test" value="one" type="radio"></calcite-tile-select>`',
      ...a.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
  ></calcite-tile-select>\``,
      ...s.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tile-select
    class="calcite-mode-dark"
    dir="rtl"
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
  ></calcite-tile-select>\``,
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tile-select
    icon="check"
    heading="test"
    value="one"
    type="checkbox"
    width="full"
  ></calcite-tile-select>\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-tile-select
    icon="list-radio"
    heading="test"
    value="one"
    type="radio"
    width="full"
  ></calcite-tile-select>\``,
      ...r.parameters?.docs?.source
    }
  }
};
const T = ["simple", "checkbox_TestOnly", "radio_TestOnly", "checkboxDarkModeRTL_TestOnly", "radioDarkModeRTL_TestOnly", "checkboxWidthFull_TestOnly", "radioWidthFull_TestOnly"];
export {
  T as __namedExportsOrder,
  s as checkboxDarkModeRTL_TestOnly,
  o as checkboxWidthFull_TestOnly,
  i as checkbox_TestOnly,
  b as default,
  n as radioDarkModeRTL_TestOnly,
  r as radioWidthFull_TestOnly,
  a as radio_TestOnly,
  l as simple
};
