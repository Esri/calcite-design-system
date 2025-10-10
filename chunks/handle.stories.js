import { h as c } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = {
  title: "Components/Handle"
}, e = () => c` <calcite-handle></calcite-handle> `, a = () => c` <calcite-handle activated></calcite-handle> `, t = () => c` <calcite-handle disabled></calcite-handle> `;
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-handle></calcite-handle> `",
      ...e.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-handle activated></calcite-handle> `",
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-handle disabled></calcite-handle> `",
      ...t.parameters?.docs?.source
    }
  }
};
const l = ["simple", "activated_TestOnly", "disabled_TestOnly"];
export {
  l as __namedExportsOrder,
  a as activated_TestOnly,
  r as default,
  t as disabled_TestOnly,
  e as simple
};
