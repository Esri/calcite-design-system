/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { u as s, j as e, M as a, e as i } from "./blocks.js";
import { s as r } from "./custom-theme.stories.js";
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
function o(n) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(a, {
      of: r
    }), `
`, e.jsx(i, {
      children: l
    })]
  });
}
function h(n = {}) {
  const { wrapper: t } = {
    ...s(),
    ...n.components
  };
  return t ? e.jsx(t, {
    ...n,
    children: e.jsx(o, {
      ...n
    })
  }) : o();
}
export {
  h as default
};
