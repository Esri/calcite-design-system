import { j as e, M as s, c as a } from "./index3.js";
import { useMDXComponents as i } from "./index4.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
const r = "# Internationalization (i18n)\n\nTypically, components allow users to supply text values via slots and attributes, but there are cases where components need to take additional steps to support internationalization.\n\n## Formatting\n\nFormatting of values, such as numbers and dates, for display should use the [`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).\n\n### Styling/Layout\n\nTo add right-to-left (RTL) support to your components you should use [CSS Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) within CSS. If you need to know direction in JavaScript, use the internal `getElementDir` helper in the dom utility.\n\nSome CSS properties do not have logical equivalents. Such as...\n\n- box-shadow\n- text-shadow\n- transform\n- background-position\n\nFor these properties, you should use the internal `getElementDir` helper to apply the `CSS_UTILITY.rtl` class to your component.\n\n## Translation (t9n)\n\nPreviously, components provided Intl properties (`intl<Prop>`) to allow users to pass string translations. While this is still supported for backwards compatibility, our components also have translations built-in.\n\nThe following section covers how to add built-in translation support to components.\n\n### `T9nComponent` pattern\n\nThis pattern enables components to support built-in translations. In order to support this, a component must:\n\n1. Add the following translation bundles as component assets under a `t9n` folder (please refer to <https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/conventions/README.md#assets> for additional info on assets)\n   1. `messages.json` – main bundle\n   2. `messages_en.json` – locale-specific bundle (kept in sync with main one via scripts)\n2. Implement the `T9nComponent` interface\n   1. The `onMessagesChange` method must be empty as it is wired up by the support utils.\n   2. The `onMessagesChange` method must also be configured to watch the `messageOverrides` property.\n3. Use the `setUpMessages` util in the component's `componentWillLoad` lifecycle methods. This must be awaited on to have an initial set of strings available before rendering.\n4. Use the `connectMessages`/`disconnectMessages` utils in the component's `connectedCallback`/`disconnectedCallback` lifecycle methods. This will set up and tear down supporting methods on the component.\n5. Add an appropriate E2E test by using the `t9n` common test helper.\n6. Composite components need to forward message overrides props to supporting t9n components.\n   1. If the parent supports translations:\n      1. Add the `messageOverrides` property (its type should be the union of the parent and supporting component messages types).\n      2. Pass the `messageOverrides` into supporting components in the render method.\n   1. If the parent does not support translations:\n      1. Add the `messageOverrides` property (its type should be the union of supporting component messages types).\n      2. Pass the `messageOverrides` into supporting components in the render method.\n7. Internal components that support public t9n components\n   1. Do not have to implement the `T9nComponent` interface\n   2. Should use an internal, immutable, `messages` property (its type should correspond to the parent component's messages type)\n\n#### Notes\n\n- This pattern depends on `LocalizedComponent` being implemented.\n- `connectLocalized` (from `LocalizedComponent`) must be called before `connectMessages`.\n- You can also look at the interface and util documentation for additional info.\n- The internal `messages` property should be used as the source of truth for translations in rendering.\n- List of supported locales can be found on our [Localization support page](https://developers.arcgis.com/calcite-design-system/localization/#locale-support).\n- Placeholders in message bundle strings should:\n  - Use the following syntax: `{placeholder}` (e.g., `Hello {userName}, my old friend. 👋`).\n  - Have an expressive name to provide context regarding its use.\n";
function o(n) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(s, {
      title: "Overview/Internationalization"
    }), `
`, e.jsx(a, {
      children: r
    })]
  });
}
function d(n = {}) {
  const { wrapper: t } = {
    ...i(),
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
  d as default
};
