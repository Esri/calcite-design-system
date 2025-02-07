# Documentation

## Style guide

Follow these conventions when adding or editing API reference:

- Use complete sentences with proper grammar, capitalization, and punctuation.
- No abbreviations, e.g. use "property" instead of "prop".
- Verbs must be in present tense.
- Use the full tag name when referencing other Calcite Components (prefix with `calcite-`), e.g. `calcite-button` instead of `button`.
- For plural context, use `calcite-button`s instead of `calcite-button` elements.
- Use backticks (`` ` ``) for the names of slots, events, properties, CSS variables, and component names (e.g. `calcite-button` instead of calcite-button and `selectionMode` instead of "selectionMode"). Also use backticks for the values of properties and event details (e.g. `true`). If the value is a string, use both backticks and double quotes (e.g. `"single-persist"`).
- Only use single quotes (`'`) as apostrophes.
- No links or URLs allowed in descriptions. If a link is necessary, a custom JSDoc tag should be added and parsed in the SDK site.
- Refrain from using "e.g." or "i.e." references. Leverage "such as" (or similar) where examples are referenced.
- Use "Accessible" instead of "Aria" or "a11y" language.
- Verify slots and properties/attributes don't use the text "optional" in their descriptions.

### Deprecation notices

There are two ways to document deprecations, depending on the API reference. In both cases a deprecated chip will be displayed in the SDK site within the component's API reference section.

1. The `@deprecated` JSDoc tag is used for JavaScript properties, events, and methods in the `<component-name>.tsx` file. Notes can accompany the JSDoc tag, such as "use `<property>` instead".
2. The `[Deprecated]` text is added at the beginning of the JSDoc description for slots (`@slots`) in the `<component-name>.tsx` file and CSS variables in the `<component-name>.scss` file. The text is parsed and removed from the description in the SDK site.

### Using utilities

There are a variety of Storybook [helpers](../.storybook/helpers.ts) and [utilities](../.storybook/utils.tsx) that should be used for common patterns. You can use existing stories as a reference for when/how the utilities and helpers should be used.
