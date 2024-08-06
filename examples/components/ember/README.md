# Ember 4

This is an example of how to use [@esri/calcite-components](https://github.com/Esri/calcite-components/) in an Ember 4 application.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd ember`
- `npm install`

## Running / Development

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Calcite Components with Ember 4

### Installing Calcite Components

To install calcite components in your current project or in a new project:

```
npm i @esri/calcite-components --save-dev
```

### Dependencies

#### ember-auto-import

There is a dependency on `ember-auto-import`. With the most recent version of Ember 4, this package is part of the initial project definition. Verify that this package is already part of your project, if not then install it.

`ember i ember-auto-import`

ember-auto-import will automatically import calcite components inside the build when it finds an import reference in your code (see next section).

Most of the time, ember-auto-import doesn't require configuration. It should just work for calcite-components.

#### broccoli-funnel

broccoli-funnel is used to copy files during the build.

`npm i broccoli-funnel --save-dev`

### Initializing calcite components when the app starts

The best place to define the calcite-components is in an initializer.

`ember generate initializer calcite-components`

```js
// src/initializers/calcite-components.js
import { defineCustomElements } from '@esri/calcite-components/dist/loader';

defineCustomElements(window, {
  resourcesUrl: 'assets/calcite/',
});

export function initialize() {}

export default {
  initialize,
};
```

This is basically a no-op initializer from an ember point of view. However, it allows:

- to reference `@esri/calcite-components/dist/loader`. It will allow ember-auto-import to discover the reference and use webpack to build the calcite components into the the app. This is used at build time.
- define the calcite components inside `window` when the app starts. This is used at runtime.

### Adding the calcite CSS and assets

The ember build needs to be updated to import the calcite css and copy in the build the calcite assets.

The `ember-cli-build.js` file needs to be updated to include:

```js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Funnel } = require('broccoli-funnel');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {});

  // Import the calcite style sheet inside the app css
  app.import('node_modules/@esri/calcite-components/dist/calcite/calcite.css');

  // Funnel the static assets into the build assets directory
  const calciteAssetsTree = new Funnel(
    './node_modules/@esri/calcite-components/dist',
    {
      srcDir: '/',
      include: ['calcite/assets/**/*'],
      destDir: '/assets',
    }
  );

  return app.toTree([calciteAssetsTree]);
};
```
