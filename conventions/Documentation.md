# Documentation

Calcite Components uses [Storybook](https://storybook.js.org/) to provide an interactive showcase of components with accompanying documentation.

For each main component (i.e., one that can be used by itself), there should be a `<component-name>.stories.ts` file in its component folder.

Each story should provide access to relevant [knobs](https://github.com/storybookjs/storybook/tree/next/addons/knobs) so users can test out different properties.

For additional documentation, create a [usage folder](https://github.com/Esri/calcite-components/tree/master/src/components/action/usage) in the component directory with a basic.md and optionally an advanced.md file (if additional documentation or examples are required) with snippets showing different supported use cases for the component.

## Code Documentation

[JSDoc](https://jsdoc.app) is used to document each component. After a release, the documentation builds on the respective component page on the [SDK site](https://developers.arcgis.com/calcite-design-system/components) specifying property/attribute names, descriptions, types, values, and description notes (e.g., required, optional, deprecated, etc.).

### Deprecated

There are two documentation sources for displaying deprecations, depending on the API reference. In both cases a deprecated chip will be displayed within the component's API reference section.

1. The JSDoc `@deprecated` tag is used for JavaScript properties, events, and methods in the `<component-name>.tsx` file. Notes can accompany the JSDoc tag, such as "use `<property>` instead".
2. The `[Deprecated]` text is used for slots (`@slots`) in the `<component-name>.tsx` file and CSS custom properties in the `<component-name>.scss` file.
