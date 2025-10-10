import { j as e, M as s, c as r } from "./blocks.js";
import { useMDXComponents as a } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const i = `# Internationalization (i18n)

Typically, components allow users to supply text values via slots and attributes, but there are cases where components need to take additional steps to support internationalization.

## Formatting

Formatting of values, such as numbers and dates, for display should use the [\`Intl\` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

### Styling/Layout

To add right-to-left (RTL) support to your components you should use [CSS Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) within CSS. If you need to know direction in JavaScript, use the internal \`getElementDir\` helper in the dom utility.

Some CSS properties do not have logical equivalents. Such as...

- box-shadow
- text-shadow
- transform
- background-position

For these properties, you should use the internal \`getElementDir\` helper to apply the \`CSS_UTILITY.rtl\` class to your component.

## Translation (t9n)

The following section covers how to add built-in translation support to components.

### \`useT9nController\` pattern

This pattern enables components to support built-in translations. In order to support this, a component must:

1. Implement the \`useT9nController\`. Please refer to [useT9n](https://qawebgis.esri.com/components/lumina/controllers/useT9n) doc for implementation specifications.
2. Add the translation bundles as mentioned in [docs](https://qawebgis.esri.com/components/lumina/controllers/useT9n#_2-create-an-english-t9n-strings-file).
3. Add an appropriate E2E test by using the \`t9n\` common test helper.
4. Internal components that support public t9n components
   1. Do not have to implement the \`useT9n\` controller
   2. Should use an internal \`messages\` property and its type should correspond to the parent component's messages type as mentioned in the [Lumina \`useT9n\` doc](https://qawebgis.esri.com/components/lumina/controllers/useT9n#sharing-strings-between-parent-and-sub-component).
5. Please refer to [Calcite Translation Build Process](https://devtopia.esri.com/WebGIS/calcite-design-system/wiki/Calcite-Translations-Build-Process) before submitting the PR.

#### Notes

- The internal \`messages\` property should be used as the source of truth for translations in rendering.
- List of supported locales can be found on our [Localization support page](https://developers.arcgis.com/calcite-design-system/localization/#locale-support).
- Placeholders in message bundle strings should:
  - Use the following syntax: \`{placeholder}\` (e.g., \`Hello {userName}, my old friend. 👋\`).
  - Have an expressive name to provide context regarding its use.
`;
function o(n) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(s, {
      title: "Overview/Internationalization"
    }), `
`, e.jsx(r, {
      children: i
    })]
  });
}
function c(n = {}) {
  const { wrapper: t } = {
    ...a(),
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
  c as default
};
