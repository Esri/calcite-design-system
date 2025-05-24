import { i } from "./helpers.js";
import { m as l } from "./utils.js";
import { h as s } from "./formatting.js";
import { A as m } from "./resources14.js";
import { s as p } from "./cssTokenValues.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const {
  scale: t
} = m, r = i.find((e) => e === "arrowRight"), h = {
  title: "Components/Icon",
  args: {
    icon: r,
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
`, o = () => s`
  <style>
    html {
      font-size: 62.5%;
    }</style
  ><calcite-icon icon="banana" scale="s"></calcite-icon>
  <calcite-icon icon="banana" scale="m"></calcite-icon>
  <calcite-icon icon="banana" scale="l"></calcite-icon>
`, c = () => s`
  <calcite-icon class="calcite-mode-dark" dir="rtl" icon="${r}" flip-rtl></calcite-icon>
`;
c.parameters = {
  themes: l
};
const n = () => s`
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
const S = ["simple", "customBaseFontSize", "darkModeRTL_TestOnly", "theming_TestOnly"];
export {
  S as __namedExportsOrder,
  o as customBaseFontSize,
  c as darkModeRTL_TestOnly,
  h as default,
  a as simple,
  n as theming_TestOnly
};
