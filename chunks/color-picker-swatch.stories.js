import { k as i, h as c, j as p } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const n = {
  title: "Components/Controls/ColorPicker/support/ColorPickerSwatch",
  args: {
    active: !0,
    color: "#b33f33"
  }
}, r = (l) => c`
  <calcite-color-picker-swatch ${i("active", l.active)} color="${l.color}"></calcite-color-picker-swatch>
`, a = () => c`<calcite-color-picker-swatch active color="#c00f33"></calcite-color-picker-swatch>`, o = () => c`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`, t = () => c`<calcite-color-picker-swatch alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`, s = () => c`<calcite-color-picker-swatch active alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`, e = () => c`<calcite-color-picker-swatch value="#c00f33"></calcite-color-picker-swatch>`;
e.parameters = {
  themes: p
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(args: ColorPickerSwatchStoryArgs): string => html`\n  <calcite-color-picker-swatch ${boolean("active", args.active)} color="${args.color}"></calcite-color-picker-swatch>\n`',
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
const m = ["simple", "active_TestOnly", "emptyActive_TestOnly", "withAlpha_TestOnly", "withAlphaActive_TestOnly", "darkModeRTL_TestOnly"];
export {
  m as __namedExportsOrder,
  a as active_TestOnly,
  e as darkModeRTL_TestOnly,
  n as default,
  o as emptyActive_TestOnly,
  r as simple,
  s as withAlphaActive_TestOnly,
  t as withAlpha_TestOnly
};
