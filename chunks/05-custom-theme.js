import { j as e, M as s, c as a } from "./blocks.js";
import { useMDXComponents as i } from "./index3.js";
import { s as r } from "./custom-theme.stories.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const l = `# Custom Theme

Developers building Esri applications are encouraged to use the default theme as much as possible. However, some apps (think user-configurable template applications) will need to customize the colors. Luckily, this can be done through CSS. All colors used in calcite components are set as variables on root, which you can override in your application. Take the following html/css:

\`\`\`html
<style>
  .my-theme {
    --calcite-color-brand: red;
  }
</style>
<div class="my-theme">
  <calcite-loader>
</div>
\`\`\`

This will set the main Esri blue to \`red\` in all components within the \`div\`. See the [canvas tab](/canvas/overview-custom-theme--interactive-example) for an interactive sandbox with all the theme variables.
`;
function o(t) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(s, {
      of: r
    }), `
`, e.jsx(a, {
      children: l
    })]
  });
}
function u(t = {}) {
  const { wrapper: n } = {
    ...i(),
    ...t.components
  };
  return n ? e.jsx(n, {
    ...t,
    children: e.jsx(o, {
      ...t
    })
  }) : o();
}
export {
  u as default
};
