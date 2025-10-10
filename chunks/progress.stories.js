import { h as a, j as o } from "./index.js";
import { A as p } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  determinateType: s
} = p, n = {
  title: "Components/Progress",
  args: {
    type: s.defaultValue,
    value: 80,
    text: ""
  },
  argTypes: {
    type: {
      options: s.values,
      control: {
        type: "select"
      }
    },
    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1
      }
    }
  }
}, t = (r) => a`
  <calcite-progress type="${r.type}" value="${r.value}" text="${r.text}"></calcite-progress>
`, e = () => a`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="20"
    text="% Complete (optional text)"
  ></calcite-progress>
`;
e.parameters = {
  themes: o
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(args: ProgressStoryArgs): string => html`\n  <calcite-progress type="${args.type}" value="${args.value}" text="${args.text}"></calcite-progress>\n`',
      ...t.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="20"
    text="% Complete (optional text)"
  ></calcite-progress>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
const m = ["simple", "darkModeRTL_TestOnly"];
export {
  m as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  n as default,
  t as simple
};
