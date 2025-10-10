import { k as t, h as i, j as o } from "./index.js";
import { p as c } from "./placeholder-image.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const u = {
  title: "Components/Tips/Tip",
  args: {
    closed: !1,
    closeDisabled: !1,
    heading: "My Tip"
  }
}, r = `<img slot="thumbnail" src="${c({
  width: 1e3,
  height: 600
})}" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae. </div><a href="http://www.esri.com">This is a link</a>.`, a = (s) => i`
  <calcite-tip
    ${t("closed", s.closed)}
    ${t("close-disabled", s.closeDisabled)}
    heading="${s.heading}"
  >
    ${r}
  </calcite-tip>
`, e = () => i`
  <calcite-tip heading="My Tip" dir="rtl" class="calcite-mode-dark">${r}</calcite-tip>
`;
e.parameters = {
  themes: o
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: TipStoryArgs): string => html\`
  <calcite-tip
    \${boolean("closed", args.closed)}
    \${boolean("close-disabled", args.closeDisabled)}
    heading="\${args.heading}"
  >
    \${htmlContent}
  </calcite-tip>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-tip heading="My Tip" dir="rtl" class="calcite-mode-dark">${htmlContent}</calcite-tip>\n`',
      ...e.parameters?.docs?.source
    }
  }
};
const d = ["simple", "darkModeRTL_TestOnly"];
export {
  d as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  u as default,
  a as simple
};
