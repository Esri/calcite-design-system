/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { c as v, b as a, m as w } from "./utils3.js";
import { h as c } from "./formatting.js";
import { A as y } from "./resources34.js";
import "./color-picker.js";
var b = Object.freeze, S = Object.defineProperty, $ = (e, L) => b(S(e, "raw", { value: b(e.slice()) })), g;
const {
  colorPickerFormat: D,
  scale: f
} = y, O = {
  title: "Components/Controls/ColorPicker",
  args: {
    alphaChannel: !1,
    channelsDisabled: !1,
    disabled: !1,
    format: "auto",
    hexDisabled: !1,
    savedDisabled: !1,
    fieldDisabled: !1,
    scale: f.defaultValue,
    clearable: !1,
    value: "#b33f33"
  },
  argTypes: {
    scale: {
      options: f.values,
      control: {
        type: "select"
      }
    },
    format: {
      options: D.values,
      control: {
        type: "select"
      }
    }
  }
}, l = (e) => c`
  <calcite-color-picker
    ${a("alpha-channel", e.alphaChannel)}
    ${a("channels-disabled", e.channelsDisabled)}
    ${a("disabled", e.disabled)}
    ${a("hex-disabled", e.hexDisabled)}
    ${a("saved-disabled", e.savedDisabled)}
    format="${e.format}"
    scale="${e.scale}"
    ${a("clearable", e.clearable)}
    value="${e.value}"
    ${a("field-disabled", e.fieldDisabled)}
  ></calcite-color-picker>
`, s = () => c`
  <calcite-color-picker scale="s" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="m" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="l" alpha-channel value="#b33f3333"></calcite-color-picker>
`, i = () => c`<calcite-color-picker disabled></calcite-color-picker>`, r = () => c`
  <calcite-color-picker scale="m" dir="rtl" class="calcite-mode-dark" value="#b33f33"></calcite-color-picker>
`;
r.parameters = {
  themes: w
};
const t = () => c`<div style="overflow: auto; width: 274px;">
    <calcite-color-picker value="#04006e"></calcite-color-picker>
  </div>`, n = () => c`<calcite-color-picker lang="ar"></calcite-color-picker>`, p = () => c`<calcite-color-picker lang="no"></calcite-color-picker>`, d = () => c`<calcite-color-picker lang="es"></calcite-color-picker>`, m = () => c`<calcite-color-picker lang="ja"></calcite-color-picker>`, k = () => c`<calcite-color-picker lang="ru"></calcite-color-picker>`, u = () => c`<calcite-color-picker lang="th"></calcite-color-picker>`, o = () => c(g || (g = $([`<calcite-color-picker value="#97a7b0"></calcite-color-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-color-picker");
        const colorPicker = await document.querySelector("calcite-color-picker").componentOnReady();
        await colorPicker.setFocus();
      })();
    <\/script>`])));
o.parameters = {
  chromatic: {
    delay: 2e3
  }
};
const h = () => v(c`
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
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: ColorPickerStoryArgs): string => html\`
  <calcite-color-picker
    \${boolean("alpha-channel", args.alphaChannel)}
    \${boolean("channels-disabled", args.channelsDisabled)}
    \${boolean("disabled", args.disabled)}
    \${boolean("hex-disabled", args.hexDisabled)}
    \${boolean("saved-disabled", args.savedDisabled)}
    format="\${args.format}"
    scale="\${args.scale}"
    \${boolean("clearable", args.clearable)}
    value="\${args.value}"
    \${boolean("field-disabled", args.fieldDisabled)}
  ></calcite-color-picker>
\``,
      ...l.parameters?.docs?.source
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
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: "(): string => html`<calcite-color-picker disabled></calcite-color-picker>`",
      ...i.parameters?.docs?.source
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
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(): string => html`<div style="overflow: auto; width: 274px;">\n    <calcite-color-picker value="#04006e"></calcite-color-picker>\n  </div>`',
      ...t.parameters?.docs?.source
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
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-color-picker value="#97a7b0"></calcite-color-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-color-picker");
        const colorPicker = await document.querySelector("calcite-color-picker").componentOnReady();
        await colorPicker.setFocus();
      })();
    <\/script>\``,
      ...o.parameters?.docs?.source
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
const T = ["simple", "alphaChannelAllScales", "disabled", "darkModeRTL", "thumbsOnEdgeDoNotOverflowContainer", "ArabicLocale", "NorwegianLocale", "SpanishLocale", "JapaneseLocale", "RussianLocale", "ThaiLocale", "Focus", "responsive"];
export {
  n as ArabicLocale,
  o as Focus,
  m as JapaneseLocale,
  p as NorwegianLocale,
  k as RussianLocale,
  d as SpanishLocale,
  u as ThaiLocale,
  T as __namedExportsOrder,
  s as alphaChannelAllScales,
  r as darkModeRTL,
  O as default,
  i as disabled,
  h as responsive,
  l as simple,
  t as thumbsOnEdgeDoNotOverflowContainer
};
