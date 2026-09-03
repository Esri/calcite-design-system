/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as s } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as o } from "./resources34.js";
import "./loader.js";
const {
  determinateType: r,
  scale: i
} = o, u = {
  title: "Components/Loader",
  args: {
    complete: !1,
    inline: !1,
    label: "Loading",
    type: r.values[1],
    scale: i.defaultValue,
    text: "",
    value: 0
  },
  argTypes: {
    type: {
      options: r.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: i.values,
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
}, a = (e) => n`
  <calcite-loader
    ${s("complete", e.complete)}
    ${s("inline", e.inline)}
    label="${e.label}"
    scale="${e.scale}"
    text="${e.text}"
    type="${e.type}"
    value="${e.value}"
  />
`, l = () => n`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="m"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`, t = () => n`
  <style>
    .scales {
      display: flex;
      flex-direction: row;
      gap: 50px;
    }
    
    calcite-loader {
      /* provide dimensions for consistent screenshots */
      height: 100px;
      width: 100px;
    }
  </style>
  <h1>determinate</h1>
  <div class="scales">
    <h2>s</h2>
    <calcite-loader scale="s" type="determinate" value="50"></calcite-loader>
    <h2>m</h2>
    <calcite-loader scale="m" type="determinate" value="50"></calcite-loader>
    <h2>l</h2>
    <calcite-loader scale="l" type="determinate" value="50"></calcite-loader>
  </div>
  <br>
  <h1>determinate-value</h1>
  <div class="scales">
    <h2>s</h2>
    <calcite-loader scale="s" type="determinate-value" value="50" />
    </calcite-loader>
    <h2>m</h2>
    <calcite-loader scale="m" type="determinate-value" value="50" />
    </calcite-loader>
    <h2>l</h2>
    <calcite-loader scale="l" type="determinate-value" value="50" />
    </calcite-loader>
  </div>
`, c = () => n`
  <calcite-loader
    type="indeterminate"
    scale="m"
    value="0"
    style="
    --calcite-color-brand: #50ba5f;
    --calcite-color-brand-hover: #1a6324;
    --calcite-color-brand-press: #338033;"
  />
`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: LoaderStoryArgs): string => html\`
  <calcite-loader
    \${boolean("complete", args.complete)}
    \${boolean("inline", args.inline)}
    label="\${args.label}"
    scale="\${args.scale}"
    text="\${args.text}"
    type="\${args.type}"
    value="\${args.value}"
  />
\``,
      ...a.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="m"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
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
  <style>
    .scales {
      display: flex;
      flex-direction: row;
      gap: 50px;
    }
    
    calcite-loader {
      /* provide dimensions for consistent screenshots */
      height: 100px;
      width: 100px;
    }
  </style>
  <h1>determinate</h1>
  <div class="scales">
    <h2>s</h2>
    <calcite-loader scale="s" type="determinate" value="50"></calcite-loader>
    <h2>m</h2>
    <calcite-loader scale="m" type="determinate" value="50"></calcite-loader>
    <h2>l</h2>
    <calcite-loader scale="l" type="determinate" value="50"></calcite-loader>
  </div>
  <br>
  <h1>determinate-value</h1>
  <div class="scales">
    <h2>s</h2>
    <calcite-loader scale="s" type="determinate-value" value="50" />
    </calcite-loader>
    <h2>m</h2>
    <calcite-loader scale="m" type="determinate-value" value="50" />
    </calcite-loader>
    <h2>l</h2>
    <calcite-loader scale="l" type="determinate-value" value="50" />
    </calcite-loader>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-loader
    type="indeterminate"
    scale="m"
    value="0"
    style="
    --calcite-color-brand: #50ba5f;
    --calcite-color-brand-hover: #1a6324;
    --calcite-color-brand-press: #338033;"
  />
\``,
      ...c.parameters?.docs?.source
    }
  }
};
const v = ["simple", "inline", "determinate", "customTheme"];
export {
  v as __namedExportsOrder,
  c as customTheme,
  u as default,
  t as determinate,
  l as inline,
  a as simple
};
