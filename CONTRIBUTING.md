Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

### I want to contribute, what should I work on?

Calcite Components is still in its early stages. You can help most by:

* Adding ideas for components to out [wishlist project](https://github.com/Esri/calcite-components/projects/2) We are using the wishlist to gather ideas about what components teams are using that we might be able to reproduce as a part of Calcite Components.
* If you want to help develop components take a look at out [1.0.0 components](https://github.com/Esri/calcite-components/projects/1) which are the components we are targeting for the first release of Calcite Components. Before starting development please review our [component conventions](./conventions/README.md) and the [Stencil documentation](https://stenciljs.com/docs/host-element). We also have a basic [`<calcite-element>`](./components/calcite-example) component that can be copied as a starter point for a new component.

If you aren't familiar with the basics of WebComponents and Shadow DOM please read through some of the following resources before contributing:

* [Google - Custom Elements v1: Reusable Web Components ](https://developers.google.com/web/fundamentals/web-components/customelements)
* [Google - Shadow DOM v1: Self-Contained Web Components ](https://developers.google.com/web/fundamentals/web-components/shadowdom)
* [CSS Tricks - An Introduction to Web Components ](https://css-tricks.com/an-introduction-to-web-components/)

### Before filing an issue

If something isn't working the way you expected, please take a look at [previously logged issues](https://github.com/Esri/calcite-components/issues) first.  Have you found a new bug?  Want to request a new feature?  We'd [love](https://github.com/Esri/calcite-components/issues/new) to hear from you.

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

### Adding a new component

Before adding a new component, have a read through the [component conventions guide](./conventions/README.md). This guide covers everything from colors to event naming syntax and will help you create a component that is consistent with those that exist already.

### Running the tests

`npm test` will run the current test suite.

Calcite Components include Stencil's default testing tools which are built on [Jest](https://jestjs.io/) and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

Please refer to the [Stencil testing documentation](https://stenciljs.com/docs/testing-overview) for more information.

### Documenting a component

Calcite Components utlizes [Storybook](https://storybook.js.org/) for documenting components. Adding a new component is very simple:

1. Create a new file inside your component directory like `calcite-X.stories.js`
2. Write stories (see below)
3. Run the documentation locally with `npm run storybook`

The `storybook` command will build Calcite Components, and open your browser to view the storybook docs locally.

#### Writing stories

Each component should use a `storiesOf` with at least one story. It's a great idea to add the component's auto-generated `readme.md` as notes. If your component has props that effect visual styles, you can use the [storybook knobs addon](https://www.npmjs.com/package/@storybook/addon-knobs) to allow people to manipulate props and see live updates in the documentation. A minimal stories file might look something like this:

```
import { storiesOf } from '@storybook/html';
import { withKnobs, boolean } from '@storybook/addon-knobs'
import notes from './readme.md';

storiesOf('My component', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <my-component demo-prop="${boolean("demo-prop", true)}"></my-component>
  , { notes })`
```

### Deploying documentation

We deploy the docs with [storybook deployer](https://github.com/storybookjs/storybook-deployer).

1. Make sure your changes have landed in `master`
2. Use `npm run deploy` to build the components, build the docs, and deploy to gh-pages

### Release process

To release a new version of Calcite Components you must:

1. Be on a Mac or Linux machine (the publish script is a shell script).
1. Be a member of the [@esri](https://www.npmjs.com/org/esri) organization on npm.
1. Be a member of the admin team for [Calcite Components](https://github.com/Esri/calcite-components).
1. Run `npm run release:prepare`. This will:
   * Run a new build with `npm run build`.
   * Increment the version in `package.json` with `npm version`
1. Make any changes to the `CHANGELOG.md` file, and update the example script tag src in `readme.md`. Make a new entry for the release and summarize any changes.
1. Run `npm run release:publish`. This will run the [`support/release.sh`](https://github.com/Esri/calcite-components/blob/master/support/release.sh) file which will:
   * Create a new commit on the master branch for the version.
   * Checkout a temporary branch for the release.
   * Force add the built files on the version branch.
   * Tag the version branch.
   * Push both the version tag and the master branch to GitHub. This results in a tag with the built files.
   * Publish to NPM.
   * Create a ZIP file of the built files.
   * Create a new release on GitHub with the ZIP file and the CHANGELOG.md entry for the release.
   * Checkout the master branch and reset everything back to the last commit (i.e. the release commit).

