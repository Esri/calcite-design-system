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
- For boolean attributes, use "When `true`, xxx" or "When `false`, xxx" to communicate behavior in the different states.
- Use "Accessible" instead of "Aria" or "a11y" language.
- Verify slots and properties/attributes don't use the text "optional" in their descriptions.
- For CSS token properties, avoid the use of forward slashes (`/`) in descriptions as it causes the generated API documentation to be cut off.

### Shared definitions using `@copyDoc`

Descriptions that are shared across components should use the @copyDoc tag to improve consistency and reduce repetition in the repository.

#### Support

- Supported sections: `properties`, `methods`, and `events`
- Unsupported sections: `slots`
- Supported fields: `deprecated`, `description`, `docsTags`, `readonly`, and `return`

#### Usage

To add shared component documentation definitions, perform the following:

- Add a shared definition in the [api-extractor.config.ts file](../api-extractor.config.ts) within the `copyDocDefinitions` object. The `copyDocDefinitions` object stores shared documentation definitions by section, such as `properties`, `methods`, and `events`. The example below adds a shared definition for the `checked` property.
  ```ts
  copyDocDefinitions: {
    properties: {
      checked: {
        description: "When `true`, the component is checked.",
      },
    ...
  ```
- Use the `@copyDoc` tag in the component file in place of the description. If a matching section and name exists in `copyDocDefinitions`, in this case `properties` and `checked`, then the documentation will use the associated description. In the example below, the description would read "When `true`, the component is checked."

  ```tsx
  /** @copyDoc */
  @property({ reflect: true }) checked = false;
  ```

  - Other tags, such as `@deprecated` or `@required`, can be used in conjunction with `@copyDoc`, such as with the example below.

    ```tsx
    /**
     * @copyDoc
     * @deprecated in v5.1.0, removal target v6.0.0 - This property has no effect on the component.
     */
    ```

In some cases a component may need different verbiage than the default description in `@copyDoc`. For example, most `heading` properties use the verbiage "Specifies the component's heading text." List Item Group uses the more specific description "Specifies the heading text for the nested `calcite-list-item` rows."
To facilitate using a component-specific description either:

- Use override functions, such as the [`heading` property in api-extractor.config.ts](../api-extractor.config.ts). Name each override function after the target property, method, or event. Override functions give access to API metadata which can be used to customize `@copyDoc` definitions.

  In the override function example below, the `heading` property uses `apiClass.name` to return a specific value for List Item Group.

  ```ts
  copyDocDefinitions: {
    properties: {
      heading(_apiProperty, apiClass) {
        const descriptionOverrides: Record<string, string> = {
          ListItemGroup: "Specifies the heading text for the nested `calcite-list-item` rows.",
        };

        return {
          description: descriptionOverrides[apiClass.name] ?? "Specifies the component's heading text.",
        };
      },
  ...
  ```

  Add the typical `@copyDoc` tag in the component `.tsx` file.

  ```tsx
  /** @copyDoc */
  @property({ reflect: true }) heading?: string;
  ```

- Add a description directly in the component file instead of using `@copyDoc`. Even when a matching `@copyDoc` definition exists, you can choose not to use it and provide a separate description in the component’s .tsx file instead. Below is an example for List Item Group's `heading` property:
  ```tsx
  /** Specifies the heading text for the nested `calcite-list-item` rows. */
  @property({ reflect: true }) heading?: string;
  ```

For additional guidance, review the Web GIS reference `@copyDoc` documentation.

### Deprecation notices

There are two ways to document deprecations, depending on the API reference. In both cases a deprecated chip will be displayed in the SDK site within the component's API reference section.

1. The `@deprecated` JSDoc tag is used for JavaScript properties, events, and methods in the `<component-name>.tsx` file. Notes can accompany the JSDoc tag, such as "use `<property>` instead".
2. The `[Deprecated]` text is added at the beginning of the JSDoc description for slots (`@slots`) in the `<component-name>.tsx` file and CSS variables in the `<component-name>.scss` file. The text is parsed and removed from the description in the SDK site.

### Using utilities

There are a variety of Storybook [helpers](../.storybook/helpers.ts) and [utilities](../.storybook/utils.tsx) that should be used for common patterns. You can use existing stories as a reference for when/how the utilities and helpers should be used.
