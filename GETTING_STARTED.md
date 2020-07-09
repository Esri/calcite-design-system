# Getting Started

## Installation

```
npm install --save @esri/calcite-app-components
```

This will load all the dependencies for the project.

### Script tag

`calcite-app-components` can be loaded via two `<script>` tags in the head of your HTML document:

```html
<script type="module" src="<path-to-calcite-app-components-package>/dist/calcite-app/calcite-app.esm.js"></script>
<script nomodule="" src="<path-to-calcite-app-components-package>/dist/calcite-app/calcite-app.js"></script>
```

Browsers that support modules will load the first, while older browsers will load the second, bundled version. It's worth noting that only components that are actually used will be loaded.

You will also need to add a `<link>` tag for the shared component styles:

```html
<link rel="stylesheet" href="<path-to-calcite-app-components-package>/dist/calcite-app/calcite-app.css" />
```

Once these tags are added, components can be used just like any other HTML element.

### Webpack

If you already have a webpack build for your project, you can simply use [@stencil/webpack](https://github.com/ionic-team/stencil-webpack) to add `calcite-app-components` to your bundle.

After installing `calcite-app-components`, install the plugin as a dev dependency:

```
npm install --save-dev @stencil/webpack
```

Then import and add the plugin in `webpack.config.js`:

```
const stencil = require('@stencil/webpack');

module.exports = {
  ...
  plugins: [
    new stencil.StencilPlugin()
  ]
}
```

Lastly, add the import in your main bundle js (or ts) file:

```
import '@esri/calcite-app-components/dist/calcite-app.js';
```

This will add the initial Stencil loader to your bundle, and copy over the actual component code to the output directory you've configured for Webpack. Components will still be lazy-loaded as they are needed. _Note:_ you must use the `.js` file path for the Webpack plugin to work correctly, even if your bundle file is a TypeScript file.

## TypeScript

Stencil provides a full set of typings for all the components in this repo. To make TypeScript aware of these components, just import the library:

```
import '@esri/calcite-app-components';
```

This will provide autocomplete of component names/properties, as well as additional HTML element types.

## Local Dev

### Instructions

1. npm install
2. npm start
3. npm test

### Requirements

- Notepad or your favorite HTML editor
- Web browser with access to the Internet

### Deployment

1. Checkout the master branch. Your git working directory must be clean (no pending un-staged changes). You will also need to have setup a [github release token](https://github.com/medikoo/github-release-from-cc-changelog#prerequisites).
1. Run `npm version <patch | minor | major>`.
   Follow semantic versioning. Patch for bug fixes only. Major for breaking changes. Minor for the rest.
1. This will prepare everything for publishing as well as automatically update `CHANGELOG.md`.
1. Once `CHANGELOG.md` is reviewed and everything looks OK, you can publish to NPM by running `npm run release`.

**\*Aside:** It will also update the docs for GitHub Pages and the READMEs for each component.

## Updating Github Pages Docs

**NOTE:** This will happen automatically whenever there's a release. Follow steps below for manual docs update.

1. You'll need to generate a new stencil build for the docs by running `$ npm run docs`.
1. The docs will need to be committed or merged in the `master` branch before they take effect.
