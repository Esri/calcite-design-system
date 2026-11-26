/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import "./field-group.js";
import "./autocomplete.js";
import "./field-set.js";
import "./input.js";
import "./input-number.js";
import "./input-text.js";
import "./label2.js";
import "./text-area.js";
import { A as g } from "./resources34.js";
import { o as i } from "./utils2.js";
import { h as l } from "./formatting.js";
const {
  fieldLayout: x
} = g, z = {
  title: "Components/Field Group",
  parameters: {
    layout: "padded"
  },
  args: {
    layout: x.defaultValue,
    columns: 2,
    gap: "",
    columnGap: "",
    prefixAutoWidth: !1,
    suffixAutoWidth: !1
  },
  argTypes: {
    layout: {
      options: x.values,
      control: {
        type: "radio"
      }
    },
    columns: {
      options: [1, 2, 3, 4, 5, 6],
      control: {
        type: "radio"
      },
      if: {
        arg: "layout",
        eq: "columns"
      }
    },
    gap: {
      control: {
        type: "text"
      }
    },
    columnGap: {
      name: "column gap",
      control: {
        type: "text"
      },
      if: {
        arg: "layout",
        eq: "columns"
      }
    },
    prefixAutoWidth: {
      control: {
        type: "boolean"
      }
    },
    suffixAutoWidth: {
      control: {
        type: "boolean"
      }
    }
  }
}, o = (e) => {
  const t = [e.gap ? `--calcite-field-group-gap: ${e.gap};` : "", e.columnGap ? `--calcite-field-group-column-gap: ${e.columnGap};` : ""].filter(Boolean).join(" ");
  return l`
    <h1>calcite-input</h1>
    <calcite-field-group columns="${e.columns}" layout="${e.layout}" ${i("style", t)}>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs</h1>
    <calcite-field-group columns="${e.columns}" layout="${e.layout}" ${i("style", t)}>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
  `;
};
o.parameters = {
  controls: {
    exclude: ["prefixAutoWidth", "suffixAutoWidth"]
  }
};
const p = (e) => {
  const t = [e.gap ? `--calcite-field-group-gap: ${e.gap};` : "", e.columnGap ? `--calcite-field-group-column-gap: ${e.columnGap};` : ""].filter(Boolean).join(" ");
  return l`
    <h1>calcite-input and calcite-text-area</h1>
    <calcite-field-group
      columns="${e.columns}"
      layout="${e.layout}"
      ${e.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${e.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${i("style", t)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs and calcite-text-areas</h1>
    <calcite-field-group
      columns="${e.columns}"
      layout="${e.layout}"
      ${e.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${e.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${i("style", t)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
};
p.parameters = {
  controls: {
    disable: !0
  }
};
const c = (e, t, s, d) => {
  const f = [e.gap ? `--calcite-field-group-gap: ${e.gap};` : "", e.columnGap ? `--calcite-field-group-column-gap: ${e.columnGap};` : ""].filter(Boolean).join(" ");
  return l`
    <calcite-field-group columns="${s}" layout="${t}" ${i("style", f)}>
      ${Array.from({
    length: d
  }, (m, b) => l`
          <calcite-field-set legend="Legend ${b + 1}">
            <calcite-input label-text="Label"></calcite-input>
            <calcite-input label-text="Label"></calcite-input>
          </calcite-field-set>
        `).join("")}
    </calcite-field-group>
  `;
}, a = (e, t, s, d) => {
  const f = [e.gap ? `--calcite-field-group-gap: ${e.gap};` : "", e.columnGap ? `--calcite-field-group-column-gap: ${e.columnGap};` : ""].filter(Boolean).join(" ");
  return l`
    <calcite-field-group columns="${s}" layout="${t}" ${i("style", f)}>
      ${Array.from({
    length: d
  }, (m, b) => l`
          <calcite-field-set legend="Legend ${b + 1}">
            <calcite-label>Label<calcite-input></calcite-input></calcite-label>
            <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          </calcite-field-set>
        `).join("")}
    </calcite-field-group>
  `;
}, r = (e) => l`
  <h1>calcite-input</h1>
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${c(e, "vertical", 1, 3)} ${c(e, "horizontal", 1, 3)}
    ${c(e, "columns", 1, 1)} ${c(e, "columns", 2, 2)}
    ${c(e, "columns", 3, 3)} ${c(e, "columns", 4, 4)}
    ${c(e, "columns", 5, 5)} ${c(e, "columns", 6, 6)}
  </div>
  <h1>calcite-label</h1>
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${a(e, "vertical", 1, 3)} ${a(e, "horizontal", 1, 3)}
    ${a(e, "columns", 1, 1)} ${a(e, "columns", 2, 2)}
    ${a(e, "columns", 3, 3)} ${a(e, "columns", 4, 4)}
    ${a(e, "columns", 5, 5)} ${a(e, "columns", 6, 6)}
  </div>
`;
r.parameters = {
  controls: {
    disable: !0
  }
};
const n = (e) => l`
  <h1>calcite-input</h1>
  <div>
    <calcite-field-group
      columns="${e.columns}"
      layout="${e.layout}"
      style="--calcite-field-group-gap: ${e.gap};"
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
  </div>
  <h1>calcite-label</h1>
  <div>${h(e)}</div>
`;
n.args = {
  gap: "40px"
};
n.parameters = {
  controls: {
    disable: !0
  }
};
const h = (e) => {
  const t = [e.gap ? `--calcite-field-group-gap: ${e.gap};` : "", e.columnGap ? `--calcite-field-group-column-gap: ${e.columnGap};` : ""].filter(Boolean).join(" ");
  return l`
    <calcite-field-group
      columns="${e.columns}"
      layout="${e.layout}"
      ${e.prefixAutoWidth ? "prefix-auto-width" : ""}
      ${e.suffixAutoWidth ? "suffix-auto-width" : ""}
      ${i("style", t)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  `;
}, u = (e) => l`
  <h1>input components that support prefix/suffix</h1>
  <calcite-field-group
    ${e.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${e.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-input
        label-text="calcite-input"
        prefix-text="prefix"
        suffix-text="px"
        placeholder="Enter a size"
      ></calcite-input>
      <calcite-input-text
        label-text="calcite-input-text"
        prefix-text="square"
        suffix-text="meters"
        placeholder="Enter an area"
      ></calcite-input-text>
      <calcite-input-number
        label-text="calcite-input-number"
        prefix-text="approximately"
        suffix-text="kilometers"
        placeholder="Enter a length"
      ></calcite-input-number>
      <calcite-autocomplete
        label-text="calcite-autocomplete"
        prefix-text="nearest"
        suffix-text="result"
        placeholder="Search locations"
      ></calcite-autocomplete>
    </calcite-field-set>
  </calcite-field-group>
  <h1>calcite-label with nested input components that support prefix/suffix</h1>
  <calcite-field-group
    ${e.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${e.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-label>
        calcite-input
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"></calcite-input>
      </calcite-label>
      <calcite-label>
        calcite-input-text
        <calcite-input-text
          prefix-text="rectangle"
          suffix-text="inches"
          placeholder="Enter an area"
        ></calcite-input-text>
      </calcite-label>
      <calcite-label>
        calcite-input-number
        <calcite-input-number
          prefix-text="estimated amount"
          suffix-text="miles"
          placeholder="Enter a length"
        ></calcite-input-number>
      </calcite-label>
      <calcite-label>
        calcite-autocomplete
        <calcite-autocomplete
          prefix-text="closest lab"
          suffix-text="final report"
          placeholder="Search locations"
        ></calcite-autocomplete>
      </calcite-label>
    </calcite-field-set>
  </calcite-field-group>
`;
u.args = {
  prefixAutoWidth: !0,
  suffixAutoWidth: !0
};
u.parameters = {
  controls: {
    include: ["prefixAutoWidth", "suffixAutoWidth"]
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: FieldGroupStoryArgs): string => {
  const style = [args.gap ? \`--calcite-field-group-gap: \${args.gap};\` : "", args.columnGap ? \`--calcite-field-group-column-gap: \${args.columnGap};\` : ""].filter(Boolean).join(" ");
  return html\`
    <h1>calcite-input</h1>
    <calcite-field-group columns="\${args.columns}" layout="\${args.layout}" \${optionalAttribute("style", style)}>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs</h1>
    <calcite-field-group columns="\${args.columns}" layout="\${args.layout}" \${optionalAttribute("style", style)}>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
  \`;
}`,
      ...o.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(args: FieldGroupStoryArgs): string => {
  const style = [args.gap ? \`--calcite-field-group-gap: \${args.gap};\` : "", args.columnGap ? \`--calcite-field-group-column-gap: \${args.columnGap};\` : ""].filter(Boolean).join(" ");
  return html\`
    <h1>calcite-input and calcite-text-area</h1>
    <calcite-field-group
      columns="\${args.columns}"
      layout="\${args.layout}"
      \${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      \${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      \${optionalAttribute("style", style)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-text-area label-text="Label"></calcite-text-area>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-text-area label-text="Label"></calcite-text-area>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
    <h1>calcite-label with nested calcite-inputs and calcite-text-areas</h1>
    <calcite-field-group
      columns="\${args.columns}"
      layout="\${args.layout}"
      \${args.prefixAutoWidth ? "prefix-auto-width" : ""}
      \${args.suffixAutoWidth ? "suffix-auto-width" : ""}
      \${optionalAttribute("style", style)}
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
        </calcite-field-group>
        <calcite-field-group layout="columns" columns="2">
          <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
          <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        </calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-set>
    </calcite-field-group>
  \`;
}`,
      ...p.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(args: FieldGroupStoryArgs): string => html`\n  <h1>calcite-input</h1>\n  <div style="display: flex; flex-direction: column; gap: 3rem;">\n    ${renderLayoutExample(args, "vertical", 1, 3)} ${renderLayoutExample(args, "horizontal", 1, 3)}\n    ${renderLayoutExample(args, "columns", 1, 1)} ${renderLayoutExample(args, "columns", 2, 2)}\n    ${renderLayoutExample(args, "columns", 3, 3)} ${renderLayoutExample(args, "columns", 4, 4)}\n    ${renderLayoutExample(args, "columns", 5, 5)} ${renderLayoutExample(args, "columns", 6, 6)}\n  </div>\n  <h1>calcite-label</h1>\n  <div style="display: flex; flex-direction: column; gap: 3rem;">\n    ${renderLabelLayout(args, "vertical", 1, 3)} ${renderLabelLayout(args, "horizontal", 1, 3)}\n    ${renderLabelLayout(args, "columns", 1, 1)} ${renderLabelLayout(args, "columns", 2, 2)}\n    ${renderLabelLayout(args, "columns", 3, 3)} ${renderLabelLayout(args, "columns", 4, 4)}\n    ${renderLabelLayout(args, "columns", 5, 5)} ${renderLabelLayout(args, "columns", 6, 6)}\n  </div>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: FieldGroupStoryArgs): string => html\`
  <h1>calcite-input</h1>
  <div>
    <calcite-field-group
      columns="\${args.columns}"
      layout="\${args.layout}"
      style="--calcite-field-group-gap: \${args.gap};"
    >
      <calcite-field-set legend="Legend 1">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
      <calcite-field-set legend="Legend 2">
        <calcite-field-group columns="2" layout="columns">
          <calcite-input label-text="Label"></calcite-input>
          <calcite-input label-text="Label"></calcite-input>
        </calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-set>
    </calcite-field-group>
  </div>
  <h1>calcite-label</h1>
  <div>\${labels(args)}</div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(args: FieldGroupStoryArgs): string => html\`
  <h1>input components that support prefix/suffix</h1>
  <calcite-field-group
    \${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    \${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-input
        label-text="calcite-input"
        prefix-text="prefix"
        suffix-text="px"
        placeholder="Enter a size"
      ></calcite-input>
      <calcite-input-text
        label-text="calcite-input-text"
        prefix-text="square"
        suffix-text="meters"
        placeholder="Enter an area"
      ></calcite-input-text>
      <calcite-input-number
        label-text="calcite-input-number"
        prefix-text="approximately"
        suffix-text="kilometers"
        placeholder="Enter a length"
      ></calcite-input-number>
      <calcite-autocomplete
        label-text="calcite-autocomplete"
        prefix-text="nearest"
        suffix-text="result"
        placeholder="Search locations"
      ></calcite-autocomplete>
    </calcite-field-set>
  </calcite-field-group>
  <h1>calcite-label with nested input components that support prefix/suffix</h1>
  <calcite-field-group
    \${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    \${args.suffixAutoWidth ? "suffix-auto-width" : ""}
  >
    <calcite-field-set>
      <calcite-label>
        calcite-input
        <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"></calcite-input>
      </calcite-label>
      <calcite-label>
        calcite-input-text
        <calcite-input-text
          prefix-text="rectangle"
          suffix-text="inches"
          placeholder="Enter an area"
        ></calcite-input-text>
      </calcite-label>
      <calcite-label>
        calcite-input-number
        <calcite-input-number
          prefix-text="estimated amount"
          suffix-text="miles"
          placeholder="Enter a length"
        ></calcite-input-number>
      </calcite-label>
      <calcite-label>
        calcite-autocomplete
        <calcite-autocomplete
          prefix-text="closest lab"
          suffix-text="final report"
          placeholder="Search locations"
        ></calcite-autocomplete>
      </calcite-label>
    </calcite-field-set>
  </calcite-field-group>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
const B = ["simple", "complex", "layouts", "customGap", "prefixAndSuffixAutoWidth"];
export {
  B as __namedExportsOrder,
  p as complex,
  n as customGap,
  z as default,
  r as layouts,
  u as prefixAndSuffixAutoWidth,
  o as simple
};
