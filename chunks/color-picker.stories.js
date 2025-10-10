import { h as e, n as v, k as a, j as f } from "./index.js";
import { A as w } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var b = Object.freeze, _ = Object.defineProperty, O = (c, T) => b(_(c, "raw", { value: b(c.slice()) })), g;
const {
  scale: y
} = w, L = {
  title: "Components/Controls/ColorPicker",
  args: {
    channelsDisabled: !1,
    hexDisabled: !1,
    savedDisabled: !1,
    fieldDisabled: !1,
    scale: y.defaultValue,
    clearable: !1,
    value: "#b33f33"
  },
  argTypes: {
    scale: {
      options: y.values,
      control: {
        type: "select"
      }
    }
  }
}, o = (c) => e`
  <calcite-color-picker
    ${a("channels-disabled", c.channelsDisabled)}
    ${a("hex-disabled", c.hexDisabled)}
    ${a("saved-disabled", c.savedDisabled)}
    scale="${c.scale}"
    ${a("clearable", c.clearable)}
    value="${c.value}"
    ${a("field-disabled", c.fieldDisabled)}
  ></calcite-color-picker>
`, s = () => e`
  <calcite-color-picker scale="s" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="m" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="l" alpha-channel value="#b33f3333"></calcite-color-picker>
`, t = () => e`<calcite-color-picker disabled></calcite-color-picker>`, r = () => e`
  <calcite-color-picker scale="m" dir="rtl" class="calcite-mode-dark" value="#b33f33"></calcite-color-picker>
`;
r.parameters = {
  themes: f
};
const i = () => e`<div style="overflow: auto; width: 274px;">
    <calcite-color-picker value="#04006e"></calcite-color-picker>
  </div>`, n = () => e`<calcite-color-picker lang="ar"></calcite-color-picker>`, p = () => e`<calcite-color-picker lang="no"></calcite-color-picker>`, d = () => e`<calcite-color-picker lang="es"></calcite-color-picker>`, m = () => e`<calcite-color-picker lang="ja"></calcite-color-picker>`, k = () => e`<calcite-color-picker lang="ru"></calcite-color-picker>`, u = () => e`<calcite-color-picker lang="th"></calcite-color-picker>`, l = () => e(g || (g = O([`<calcite-color-picker value="#97a7b0"></calcite-color-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-color-picker");
        const colorPicker = await document.querySelector("calcite-color-picker").componentOnReady();
        await colorPicker.setFocus();
      })();
    <\/script>`])));
l.parameters = {
  chromatic: {
    delay: 2e3
  }
};
const h = () => v(e`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
        gap: 10px;
      }
      .breakpoint-story-container > * {
        // we avoid full width to stay within Chromatic’s screenshot size limit
        width: 25%;
      }
    </style>
    <calcite-color-picker scale="{scale}"></calcite-color-picker>
    <calcite-color-picker alpha-channel scale="{scale}"></calcite-color-picker>
  `);
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: ColorPickerStoryArgs): string => html\`
  <calcite-color-picker
    \${boolean("channels-disabled", args.channelsDisabled)}
    \${boolean("hex-disabled", args.hexDisabled)}
    \${boolean("saved-disabled", args.savedDisabled)}
    scale="\${args.scale}"
    \${boolean("clearable", args.clearable)}
    value="\${args.value}"
    \${boolean("field-disabled", args.fieldDisabled)}
  ></calcite-color-picker>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-color-picker scale="s" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="m" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="l" alpha-channel value="#b33f3333"></calcite-color-picker>
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
      originalSource: "(): string => html`<calcite-color-picker disabled></calcite-color-picker>`",
      ...t.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-color-picker scale="m" dir="rtl" class="calcite-mode-dark" value="#b33f33"></calcite-color-picker>\n`',
      ...r.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="overflow: auto; width: 274px;">\n    <calcite-color-picker value="#04006e"></calcite-color-picker>\n  </div>`',
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="ar"></calcite-color-picker>`',
      ...n.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="no"></calcite-color-picker>`',
      ...p.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="es"></calcite-color-picker>`',
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="ja"></calcite-color-picker>`',
      ...m.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="ru"></calcite-color-picker>`',
      ...k.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-color-picker lang="th"></calcite-color-picker>`',
      ...u.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-color-picker value="#97a7b0"></calcite-color-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-color-picker");
        const colorPicker = await document.querySelector("calcite-color-picker").componentOnReady();
        await colorPicker.setFocus();
      })();
    <\/script>\``,
      ...l.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(html\`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
        gap: 10px;
      }
      .breakpoint-story-container > * {
        // we avoid full width to stay within Chromatic’s screenshot size limit
        width: 25%;
      }
    </style>
    <calcite-color-picker scale="{scale}"></calcite-color-picker>
    <calcite-color-picker alpha-channel scale="{scale}"></calcite-color-picker>
  \`)`,
      ...h.parameters?.docs?.source
    }
  }
};
const $ = ["simple", "alphaChannelAllScales", "disabled_TestOnly", "darkModeRTL_TestOnly", "thumbsOnEdgeDoNotOverflowContainer_TestOnly", "ArabicLocale_TestOnly", "NorwegianLocale_TestOnly", "SpanishLocale_TestOnly", "JapaneseLocale_TestOnly", "RussianLocale_TestOnly", "ThaiLocale_TestOnly", "Focus_TestOnly", "responsive"];
export {
  n as ArabicLocale_TestOnly,
  l as Focus_TestOnly,
  m as JapaneseLocale_TestOnly,
  p as NorwegianLocale_TestOnly,
  k as RussianLocale_TestOnly,
  d as SpanishLocale_TestOnly,
  u as ThaiLocale_TestOnly,
  $ as __namedExportsOrder,
  s as alphaChannelAllScales,
  r as darkModeRTL_TestOnly,
  L as default,
  t as disabled_TestOnly,
  h as responsive,
  o as simple,
  i as thumbsOnEdgeDoNotOverflowContainer_TestOnly
};
