# Documentation

This project uses [Storybook](https://storybook.js.org/) to provide an interactive showcase of components with accompanying documentation.

For each main component (i.e., one that can be used by itself), there should be a `<component-name>.stories.ts` file in its component folder.

Each story should provide access to relevant [knobs](https://github.com/storybookjs/storybook/tree/next/addons/knobs) so users can test out different properties.

For additional documentation, create a [usage folder](https://github.com/Esri/calcite-components/tree/master/src/components/action/usage) in the component directory with a basic.md and optionally an advanced.md file (if additional documentation or examples are required) with snippets showing different supported use cases for the component.
