/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as l } from "./helpers.js";
import { b as i, o as m, m as p } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as d } from "./resources34.js";
import { s as b } from "./cssTokenValues.js";
import "./icon.js";
const {
  scale: s
} = d, r = l.find((c) => c === "arrowRight"), S = {
  title: "Components/Icon",
  args: {
    flipRtl: !1,
    icon: r,
    preload: !1,
    scale: s.defaultValue,
    textLabel: ""
  },
  argTypes: {
    icon: {
      options: l,
      control: {
        type: "select"
      }
    },
    scale: {
      options: s.values,
      control: {
        type: "select"
      }
    }
  }
}, a = (c) => n`
  <calcite-icon
    ${i("flip-rtl", !!c.flipRtl)}
    ${m("icon", c.icon)}
    ${i("preload", c.preload)}
    scale="${c.scale}"
    text-label="${c.textLabel}"
  ></calcite-icon>
`, o = () => n`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
`, e = () => n`
  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${r}" flip-rtl></calcite-icon>
`;
e.parameters = {
  themes: p
};
const t = () => n`
  <style>
    .container {
        ${b(["--calcite-icon-color"])}
  </style>
  <div class="container">
    <calcite-icon icon="banana" scale="s"></calcite-icon>
  </div>
`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: IconStoryArgs): string => html\`
  <calcite-icon
    \${boolean("flip-rtl", !!args.flipRtl)}
    \${optionalAttribute("icon", args.icon)}
    \${boolean("preload", args.preload)}
    scale="\${args.scale}"
    text-label="\${args.textLabel}"
  ></calcite-icon>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${sampleIcon}" flip-rtl></calcite-icon>\n`',
      ...e.parameters?.docs?.source
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
    .container {
        \${setCSSVariables(["--calcite-icon-color"])}
  </style>
  <div class="container">
    <calcite-icon icon="banana" scale="s"></calcite-icon>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const x = ["simple", "customBaseFontSize", "darkModeRTL", "theming"];
export {
  x as __namedExportsOrder,
  o as customBaseFontSize,
  e as darkModeRTL,
  S as default,
  a as simple,
  t as theming
};
