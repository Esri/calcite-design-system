# Styles Directory Overview

This directory contains all Sass styles for Calcite Components. It is organized to support modularity, clarity, and maintainability for internal development.

## Structure & Purpose

- **global/**: Styles and variables used to generate the project's global styles during build.
- **includes/**: Utilities and mixins intended to be imported into each component for local use.
- **component/**: Styles strictly for use as [LitElement](https://lit.dev/docs/api/LitElement/#LitElement.styles) [static](https://lit.dev/docs/components/styles/#add-styles) [styles](https://qawebgis.esri.com/components/lumina/styling#introduction) within custom components.
- **modules/**: Helper utilities and shared style modules that can be imported as needed across the codebase.

## Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [LitElement Styling Guide](https://lit.dev/docs/components/styles/)
