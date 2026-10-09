/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as p, m as h } from "./utils3.js";
import { h as c } from "./formatting.js";
import { A as m } from "./resources34.js";
import "./color-picker-swatch.js";
const {
  scale: i
} = m, u = {
  title: "Components/Controls/ColorPicker/support/ColorPickerSwatch",
  args: {
    active: !0,
    color: "#b33f33",
    scale: i.defaultValue
  },
  argTypes: {
    scale: {
      options: i.values,
      control: {
        type: "select"
      }
    }
  }
}, r = (l) => c`
  <calcite-color-picker-swatch
    ${p("active", l.active)}
    color="${l.color}"
    scale="${l.scale}"
  ></calcite-color-picker-swatch>
`, a = () => c`<calcite-color-picker-swatch active color="#c00f33"></calcite-color-picker-swatch>`, o = () => c`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`, t = () => c`<calcite-color-picker-swatch alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`, s = () => c`<calcite-color-picker-swatch active alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`, e = () => c`<calcite-color-picker-swatch value="#c00f33"></calcite-color-picker-swatch>`;
e.parameters = {
  themes: h
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: ColorPickerSwatchStoryArgs): string => html\`
  <calcite-color-picker-swatch
    \${boolean("active", args.active)}
    color="\${args.color}"
    scale="\${args.scale}"
  ></calcite-color-picker-swatch>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker-swatch active color="#c00f33"></calcite-color-picker-swatch>`',
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`",
      ...o.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker-swatch alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`',
      ...t.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker-swatch active alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`',
      ...s.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker-swatch value="#c00f33"></calcite-color-picker-swatch>`',
      ...e.parameters?.docs?.source
    }
  }
};
const g = ["simple", "active", "emptyActive", "withAlpha", "withAlphaActive", "darkModeRTL"];
export {
  g as __namedExportsOrder,
  a as active,
  e as darkModeRTL,
  u as default,
  o as emptyActive,
  r as simple,
  t as withAlpha,
  s as withAlphaActive
};
