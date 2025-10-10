import { h as c } from "./index.js";
import { A as i } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  determinateType: r,
  scale: n
} = i, m = {
  title: "Components/Loader",
  args: {
    type: r.values[1],
    scale: n.defaultValue,
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
      options: n.values,
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
}, e = (s) => c`
  <calcite-loader type="${s.type}" scale="${s.scale}" value="${s.value}" />
`, a = () => c`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="m"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`, t = () => c`
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
`, l = () => c`
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
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: '(args: LoaderStoryArgs): string => html`\n  <calcite-loader type="${args.type}" scale="${args.scale}" value="${args.value}" />\n`',
      ...e.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="m"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
\``,
      ...a.parameters?.docs?.source
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
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      ...l.parameters?.docs?.source
    }
  }
};
const p = ["simple", "inline_TestOnly", "determinate", "customTheme_TestOnly"];
export {
  p as __namedExportsOrder,
  l as customTheme_TestOnly,
  m as default,
  t as determinate,
  a as inline_TestOnly,
  e as simple
};
