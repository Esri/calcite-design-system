/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as o, m as p } from "./utils3.js";
import { h as a } from "./formatting.js";
import { A as l } from "./resources34.js";
import "./progress.js";
const {
  determinateType: s
} = l, d = {
  title: "Components/Progress",
  args: {
    reversed: !1,
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
  <calcite-progress
    ${o("reversed", r.reversed)}
    type="${r.type}"
    value="${r.value}"
    text="${r.text}"
  ></calcite-progress>
`, e = () => a`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="20"
    text="% Complete (optional text)"
  ></calcite-progress>
`;
e.parameters = {
  themes: p
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: ProgressStoryArgs): string => html\`
  <calcite-progress
    \${boolean("reversed", args.reversed)}
    type="\${args.type}"
    value="\${args.value}"
    text="\${args.text}"
  ></calcite-progress>
\``,
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
const g = ["simple", "darkModeRTL"];
export {
  g as __namedExportsOrder,
  e as darkModeRTL,
  d as default,
  t as simple
};
