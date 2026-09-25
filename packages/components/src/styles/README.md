# Styles

This directory contains all Sass styles for Calcite Components. It is organized to support modularity, clarity, and maintainability for internal development.

## Directory contract

The styles directory is organized by how each file is meant to be consumed.

| Directory    | Purpose                      | Usage                                                                                                                            | Output                                                                                                                                   |
| ------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `component/` | Static component styles.     | Import from component implementation files and add to the component's static styles. Do not `@use` these files from stylesheets. | May produce CSS only when bundled into a component.                                                                                      |
| `global/`    | Global Calcite styles.       | Import by the build through `global/index.scss` for project-level global style output.                                           | `global/index.scss` produces global CSS.                                                                                                 |
| `includes/`  | Per-component includes.      | `@use "../../styles/includes"` from each individual component stylesheet for host selectors, mixins, and shared component setup. | Does not produce standalone CSS. Output only appears through the consuming component stylesheet.                                         |
| `shared/`    | Shared stylesheet resources. | `@use` from component stylesheets when common variables, mixins, placeholders, or supporting rules are needed.                   | Does not produce CSS from import alone. Output only appears when explicitly referenced or emitted by the consuming component stylesheet. |

Only `global/index.scss` and component stylesheets in `components/*` should produce style output. Imports from `includes/` and `shared/` should be safe to use without generating extra CSS by themselves.

## Static component style files

The `component/` directory is reserved for static styles that are imported by component implementation files, not component stylesheets. These files are factored out only when multiple components need the same static style block.

## Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [LitElement Styling Guide](https://lit.dev/docs/components/styles/)
