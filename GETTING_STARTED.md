# Getting Started

## Installation

The simplest way to set up the components in your project is to add the following tags in the head of your HTML document:

```html
<script type="module" src="https://unpkg.com/@esri/calcite-components/dist/calcite/calcite.esm.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@esri/calcite-components/dist/calcite/calcite.css" />
```

Once these tags are added, components can be used just like any other HTML element. Only components that are actually used will be loaded.

You can also install the components locally with NPM and update the script URLs to reference same files under `node_modules`.

```
npm install --save @esri/calcite-components
```

### Webpack

If you already have a webpack build for your project, you can use [@stencil/webpack](https://github.com/ionic-team/stencil-webpack) to add calcite-components to your bundle.

After installing `calcite-components`, install the plugin as a dev dependency:

```bash
npm install --save-dev @stencil/webpack
```

Then import and call the plugin in `webpack.config.js`:

```js
const stencil = require('@stencil/webpack');
module.exports = {
  ...
  plugins: [
    new stencil.StencilPlugin()
  ]
}
```

Lastly, add the import in your main bundle js (or ts) file:

```js
import "@esri/calcite-components/dist/calcite.js";
```

This will add the initial stencil loader to your bundle, and copy over the actual component code to the output directory you've configured for Webpack. Components will still be lazy-loaded as they are needed. _Note:_ you must use the `.js` file path for the Webpack plugin to work correctly, even if your bundle file is a TypeScript file.

## TypeScript

Stencil provides a full set of typings for all the components in this repo. To make TypeScript aware of these components, just import the library:

```
import '@esri/calcite-components';
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
