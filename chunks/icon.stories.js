import { i } from "./helpers.js";
import { h as s, j as r } from "./index.js";
import { A as m } from "./resources16.js";
import { s as p } from "./cssTokenValues.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: t
} = m, l = i.find((e) => e === "arrowRight"), f = {
  title: "Components/Icon",
  args: {
    icon: l,
    scale: t.defaultValue
  },
  argTypes: {
    icon: {
      options: i,
      control: {
        type: "select"
      }
    },
    scale: {
      options: t.values,
      control: {
        type: "select"
      }
    }
  }
}, a = (e) => s`
  <calcite-icon icon="${e.icon}" scale="${e.scale}"></calcite-icon>
`, n = () => s`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
`, c = () => s`
  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${l}" flip-rtl></calcite-icon>
`;
c.parameters = {
  themes: r
};
const o = () => s`
  <style>
    .container {
        ${p(["--calcite-icon-color"])}
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
      originalSource: '(args: IconStoryArgs): string => html`\n  <calcite-icon icon="${args.icon}" scale="${args.scale}"></calcite-icon>\n`',
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${sampleIcon}" flip-rtl></calcite-icon>\n`',
      ...c.parameters?.docs?.source
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
    .container {
        \${setCSSVariables(["--calcite-icon-color"])}
  </style>
  <div class="container">
    <calcite-icon icon="banana" scale="s"></calcite-icon>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
const h = ["simple", "customBaseFontSize", "darkModeRTL_TestOnly", "theming_TestOnly"];
export {
  h as __namedExportsOrder,
  n as customBaseFontSize,
  c as darkModeRTL_TestOnly,
  f as default,
  a as simple,
  o as theming_TestOnly
};
