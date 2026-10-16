/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as l } from "./utils3.js";
import { h as t } from "./formatting.js";
import "./handle.js";
const o = {
  title: "Components/Handle",
  args: {
    disabled: !1,
    dragHandle: "Drag item",
    selected: !1
  },
  argTypes: {
    dragHandle: {
      control: {
        type: "text"
      }
    }
  }
}, e = (s) => t`
  <calcite-handle
    ${l("disabled", s.disabled)}
    ${l("selected", s.selected)}
    drag-handle="${s.dragHandle}"
  ></calcite-handle>
`, a = () => t` <calcite-handle activated></calcite-handle> `, d = () => t` <calcite-handle disabled></calcite-handle> `;
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(args: HandleStoryArgs): string => html\`
  <calcite-handle
    \${boolean("disabled", args.disabled)}
    \${boolean("selected", args.selected)}
    drag-handle="\${args.dragHandle}"
  ></calcite-handle>
\``,
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: "(): string => html` <calcite-handle disabled></calcite-handle> `",
      ...d.parameters?.docs?.source
    }
  }
};
const i = ["simple", "activated", "disabled"];
export {
  i as __namedExportsOrder,
  a as activated,
  o as default,
  d as disabled,
  e as simple
};
