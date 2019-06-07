Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

### I want to contribute, what should I work on?

Calcite Components is still in its early stages. You can help most by:

* Adding ideas for components to out [wishlist project](https://github.com/ArcGIS/calcite-components/projects/2) We are using the wishlist to gather ideas about what components teams are using that we might be able to reproduce as a part of Calcite Components.
* If you want to help develop components take a look at out [1.0.0 components](https://github.com/ArcGIS/calcite-components/projects/1) which are the components we are targeting for the first release of Calcite Components. Before starting development please review our [component conventions](./conventions/README.md) and the [Stencil documentation](https://stenciljs.com/docs/host-element). We also have a basic [`<calcite-element>`](./components/calcite-example) component that can be copied as a starter point for a new component.

### Before filing an issue

If something isn't working the way you expected, please take a look at [previously logged issues](https://github.com/ArcGIS/calcite-components/issues) first.  Have you found a new bug?  Want to request a new feature?  We'd [love](https://github.com/ArcGIS/calcite-components/issues/new) to hear from you.

**Please include the following information in your issue:**
* Browser (or Node.js) version
* A snippet of code
* an explanation of
  * What you saw
  * What you expected to see

### Getting a development environment set up

You don't _have to_ but we recommend installing TypeScript, TSLint, Prettier and EditorConfig extensions for your editor of choice.

* https://code.visualstudio.com/
* https://atom.io/packages/atom-typescript
* https://github.com/Microsoft/TypeScript-Sublime-Plugin
* etc...

To start the local development environment run `npm start` this will start the local Stencil development server on http://localhost:3333. You can modify the [index.html](./src/index.html) to add and test your new component. Just add another `<calcite-tab>`and `<calcite-tab-title>` and start working.

### Running the tests

Calcite Compoennts include Stencils default testing tools which are built on [Jest](https://jestjs.io/) and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

Please refer to the [Stencil testing documentation](https://stenciljs.com/docs/testing-overview) for more information.
