import { j as e, M as o, c as i } from "./blocks.js";
import { useMDXComponents as a } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const r = '# Documentation\n\n## Style guide\n\nFollow these conventions when adding or editing API reference:\n\n- Use complete sentences with proper grammar, capitalization, and punctuation.\n- No abbreviations, e.g. use "property" instead of "prop".\n- Verbs must be in present tense.\n- Use the full tag name when referencing other Calcite Components (prefix with `calcite-`), e.g. `calcite-button` instead of `button`.\n- For plural context, use `calcite-button`s instead of `calcite-button` elements.\n- Use backticks (`` ` ``) for the names of slots, events, properties, CSS variables, and component names (e.g. `calcite-button` instead of calcite-button and `selectionMode` instead of "selectionMode"). Also use backticks for the values of properties and event details (e.g. `true`). If the value is a string, use both backticks and double quotes (e.g. `"single-persist"`).\n- Only use single quotes (`\'`) as apostrophes.\n- No links or URLs allowed in descriptions. If a link is necessary, a custom JSDoc tag should be added and parsed in the SDK site.\n- Refrain from using "e.g." or "i.e." references. Leverage "such as" (or similar) where examples are referenced.\n- For boolean attributes, use "When `true`, xxx" or "When `false`, xxx" to communicate behavior in the different states.\n- Use "Accessible" instead of "Aria" or "a11y" language.\n- Verify slots and properties/attributes don\'t use the text "optional" in their descriptions.\n- For CSS token properties, avoid the use of forward slashes (`/`) in descriptions as it causes the generated API documentation to be cut off.\n\n### Deprecation notices\n\nThere are two ways to document deprecations, depending on the API reference. In both cases a deprecated chip will be displayed in the SDK site within the component\'s API reference section.\n\n1. The `@deprecated` JSDoc tag is used for JavaScript properties, events, and methods in the `<component-name>.tsx` file. Notes can accompany the JSDoc tag, such as "use `<property>` instead".\n2. The `[Deprecated]` text is added at the beginning of the JSDoc description for slots (`@slots`) in the `<component-name>.tsx` file and CSS variables in the `<component-name>.scss` file. The text is parsed and removed from the description in the SDK site.\n\n### Using utilities\n\nThere are a variety of Storybook [helpers](../.storybook/helpers.ts) and [utilities](../.storybook/utils.tsx) that should be used for common patterns. You can use existing stories as a reference for when/how the utilities and helpers should be used.\n';
function s(t) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(o, {
      title: "Overview/Documentation"
    }), `
`, `
`, e.jsx(i, {
      children: r
    })]
  });
}
function l(t = {}) {
  const { wrapper: n } = {
    ...a(),
    ...t.components
  };
  return n ? e.jsx(n, {
    ...t,
    children: e.jsx(s, {
      ...t
    })
  }) : s();
}
export {
  l as default
};
