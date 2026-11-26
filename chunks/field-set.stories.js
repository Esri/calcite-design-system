/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import "./field-set.js";
import "./button.js";
import "./field-group.js";
import "./input.js";
import "./input-number.js";
import "./input-text.js";
import "./label2.js";
import "./option.js";
import "./select.js";
import "./text-area.js";
import { o as a } from "./utils2.js";
import { h as l } from "./formatting.js";
const g = Object.fromEntries(["legend", "legendTextColor"].map((e) => [e, {
  table: {
    disable: !0
  },
  control: !1
}])), R = {
  title: "Components/Field Set",
  parameters: {
    layout: "padded"
  },
  args: {
    legend: "Field Set legend",
    legendTextColor: "",
    gap: ""
  },
  argTypes: {
    legend: {
      control: {
        type: "text"
      }
    },
    legendTextColor: {
      name: "legend text color",
      control: {
        type: "text"
      }
    },
    gap: {
      control: {
        type: "text"
      }
    }
  }
};
function p(e) {
  return [e.gap ? `--calcite-field-set-gap: ${e.gap};` : "", e.legendTextColor ? `--calcite-field-set-legend-text-color: ${e.legendTextColor};` : ""].filter(Boolean).join(" ");
}
function m(e, n = !1) {
  const b = p(e), f = n ? l`
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>
          Label
          <calcite-input
            status="invalid"
            validation-icon="frown"
            validation-message="This field is required."
          ></calcite-input>
        </calcite-label>
        <calcite-label>Label<calcite-input disabled></calcite-input></calcite-label>
        <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
      ` : l`
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input
          label-text="Label"
          status="invalid"
          validation-icon="frown"
          validation-message="This field is required."
        ></calcite-input>
        <calcite-input disabled label-text="Label"></calcite-input>
        <calcite-text-area label-text="Label"></calcite-text-area>
      `;
  return l`
    <calcite-field-set legend="${e.legend}" ${a("style", b)}> ${f} </calcite-field-set>
  `;
}
const r = (e) => l`
  ${m({
  ...e,
  legend: e.legend ?? "calcite-input"
})} <br /><br />
  ${m({
  ...e,
  legend: "calcite-label"
}, !0)}
`;
r.args = {
  legend: "calcite-label"
};
const s = () => l`
  <calcite-field-set>
    <div slot="legend">Legend as slot</div>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <br /><br />
  <calcite-field-set legend="Legend as prop">
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <h1>no legend</h1>
  <calcite-field-set>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
`;
s.parameters = {
  controls: {
    disable: !0
  }
};
const x = (e) => {
  const n = p(e);
  return l`
    <calcite-field-set legend="${e.legend}" ${a("style", n)}>
      <calcite-field-group layout="columns" columns="2">
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-group>
      <calcite-field-group layout="horizontal">
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-group>
      <calcite-field-group>
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-group>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-set>
  `;
}, y = (e) => {
  const n = p(e);
  return l`
    <calcite-field-set legend="${e.legend}" ${a("style", n)}>
      <calcite-field-group layout="columns" columns="2">
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-group>
      <calcite-field-group layout="horizontal">
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-group>
      <calcite-field-group>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-group>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-set>
  `;
}, t = (e) => l`
  ${x({
  ...e,
  legend: "calcite-input"
})} <br /><br />
  ${y({
  ...e,
  legend: "calcite-label"
})}
`;
t.parameters = {
  controls: {
    disable: !0
  }
};
const d = (e) => l`
  <calcite-select ${a("label-text", e)}>
    <calcite-option>Meters</calcite-option>
    <calcite-option>Kilometers</calcite-option>
    <calcite-option>Miles</calcite-option>
  </calcite-select>
`, o = (e = {}) => l`
  <calcite-field-group layout="columns" columns="3">
    <calcite-input-number ${a("label-text", e.min)} placeholder="Min"></calcite-input-number>
    <calcite-input-number ${a("label-text", e.max)} placeholder="Max"></calcite-input-number>
    ${d(e.unit)}
  </calcite-field-group>
`, u = () => l`
  <style>
    .span-2-columns {
      grid-column: span 2;
    }
  </style>
  <div style="padding: 1rem;border: 2px solid blue;">
    <calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-number placeholder="123"></calcite-input-number>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          ${d("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Classes (min-max)">
        ${[1, 2, 3].map((e) => o({
  min: `Class ${e} minimum`,
  max: `Class ${e} maximum`,
  unit: `Class ${e} unit`
})).join("")}
        <calcite-field-group layout="columns" columns="3">
          <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-text value="Input Text value"></calcite-input-text>
      </calcite-field-set>
    </calcite-field-set>
  </div>
  <br /><br />
  <div style="padding: 1rem;border: 2px solid red;">
    <calcite-field-set>
      <calcite-field-group>
        <calcite-input-number label-text="Buffer radius" placeholder="123"></calcite-input-number>
      </calcite-field-group>
      <calcite-field-set>
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          ${d("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set>
        ${o({
  min: "Classes (min-max)"
})} ${o()} ${o()}
        <calcite-field-group layout="columns" columns="3">
          <div>
            <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
          </div>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-group>
        <calcite-input-text label-text="Buffer radius" value="Input Text value"></calcite-input-text>
      </calcite-field-group>
    </calcite-field-set>
  </div>
`;
u.parameters = {
  controls: {
    disable: !0
  }
};
const c = (e) => t(e);
c.args = {
  gap: "40px"
};
c.argTypes = {
  gap: {
    control: {
      type: "text"
    }
  },
  ...g
};
c.parameters = {
  controls: {
    disable: !0
  }
};
const i = (e) => t(e);
i.args = {
  legendTextColor: "pink"
};
i.parameters = {
  controls: {
    disable: !0
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: FieldSetStoryArgs): string => html\`
  \${renderFieldSet({
  ...args,
  legend: args.legend ?? "calcite-input"
})} <br /><br />
  \${renderFieldSet({
  ...args,
  legend: "calcite-label"
}, true)}
\``,
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-field-set>
    <div slot="legend">Legend as slot</div>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <br /><br />
  <calcite-field-set legend="Legend as prop">
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <h1>no legend</h1>
  <calcite-field-set>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: FieldSetStoryArgs): string => html\`
  \${renderComplex({
  ...args,
  legend: "calcite-input"
})} <br /><br />
  \${renderComplexUsingLabel({
  ...args,
  legend: "calcite-label"
})}
\``,
      ...t.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .span-2-columns {
      grid-column: span 2;
    }
  </style>
  <div style="padding: 1rem;border: 2px solid blue;">
    <calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-number placeholder="123"></calcite-input-number>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          \${renderUnitSelect("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Classes (min-max)">
        \${[1, 2, 3].map(row => renderClassRow({
  min: \`Class \${row} minimum\`,
  max: \`Class \${row} maximum\`,
  unit: \`Class \${row} unit\`
})).join("")}
        <calcite-field-group layout="columns" columns="3">
          <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-text value="Input Text value"></calcite-input-text>
      </calcite-field-set>
    </calcite-field-set>
  </div>
  <br /><br />
  <div style="padding: 1rem;border: 2px solid red;">
    <calcite-field-set>
      <calcite-field-group>
        <calcite-input-number label-text="Buffer radius" placeholder="123"></calcite-input-number>
      </calcite-field-group>
      <calcite-field-set>
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          \${renderUnitSelect("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set>
        \${renderClassRow({
  min: "Classes (min-max)"
})} \${renderClassRow()} \${renderClassRow()}
        <calcite-field-group layout="columns" columns="3">
          <div>
            <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
          </div>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-group>
        <calcite-input-text label-text="Buffer radius" value="Input Text value"></calcite-input-text>
      </calcite-field-group>
    </calcite-field-set>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: "(args: FieldSetStoryArgs): string => complex(args)",
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: "(args: FieldSetStoryArgs): string => complex(args)",
      ...i.parameters?.docs?.source
    }
  }
};
const U = ["simple", "legend", "complex", "custom", "customGap", "customLegendColor"];
export {
  U as __namedExportsOrder,
  t as complex,
  u as custom,
  c as customGap,
  i as customLegendColor,
  R as default,
  s as legend,
  r as simple
};
