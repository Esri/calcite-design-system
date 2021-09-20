Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

Note: New contributors should first contact [Julio Ochoa](JOchoa@esri.com) or [Juan Carlos Franco](JFranco@esri.com) to join the [Calcite Components GitHub team](https://github.com/orgs/Esri/teams/calcite-components/members). Then, clone the repo via SSH key on your machine (this Git workflow is required in order to work with our Screener test integration).

### I want to contribute, what should I work on?

Calcite Components is still in its early stages. You can help most by:

- Adding ideas for components to our [wishlist project](https://github.com/Esri/calcite-components/projects/2) We are using the wishlist to gather ideas about what components teams are using that we might be able to reproduce as a part of Calcite Components.
- If you want to help develop components take a look at out [1.0.0 components](https://github.com/Esri/calcite-components/projects/1) which are the components we are targeting for the first release of Calcite Components. Before starting development please review our [component conventions](./conventions/README.md) and the [Stencil documentation](https://stenciljs.com/docs/host-element).

If you aren't familiar with the basics of WebComponents and Shadow DOM please read through some of the following resources before contributing:

- [Google - Custom Elements v1: Reusable Web Components ](https://developers.google.com/web/fundamentals/web-components/customelements)
- [Google - Shadow DOM v1: Self-Contained Web Components ](https://developers.google.com/web/fundamentals/web-components/shadowdom)
- [CSS Tricks - An Introduction to Web Components ](https://css-tricks.com/an-introduction-to-web-components/)

### Before filing an issue

If something isn't working the way you expect, please take a look at the [existing issues](https://github.com/Esri/calcite-components/issues) before logging a new one. Have you found a new bug? Want to request a new feature? We'd love to hear from you! Please make sure to provide all of the requested info from the appropriate [issue template](https://github.com/Esri/calcite-components/issues/new/choose) so we can work on resolving the issue as soon as possible. A sample that reproduces the issue is required for logging bugs, we created templates in [codepen](https://codepen.io/pen?template=RwgrjEx), [codesandbox](https://codesandbox.io/s/calcite-template-p95kp?file=/src/App.js), and [jsbin](https://jsbin.com/lopumatiru/edit?html,output) (with the ArcGIS API for JavaScript) to help get started. Alternatively, a [documentation](https://developers.arcgis.com/calcite-design-system/components/) sample can be used if the issue is reproducible.

### Getting a development environment set up

It is recommended to install the following extensions to your editor of choice: TypeScript, Sass, TailwindCSS, ESLint and Prettier.

#### Linting

To ensure code consistency, this project is set up to automatically lint and fix issues when committing code.

### Commit message format

This project follows [conventional commits](https://www.conventionalcommits.org/) to provide a readable commit history and to also help with automation.

[Stencil's contributing document](https://github.com/ionic-team/stencil/blob/master/.github/CONTRIBUTING.md#commit-message-format) explains this in great detail, so please refer to this for more details and examples.

#### VS Code

- https://code.visualstudio.com/
- https://atom.io/packages/atom-typescript
- https://github.com/Microsoft/TypeScript-Sublime-Plugin
- https://tailwindcss.com/docs/intellisense
- https://github.com/neoclide/coc.nvim
- etc...

To start the local development environment run `npm start` this will start the local Stencil development server on http://localhost:3333. You can modify the [index.html](./src/index.html) to add and test your new component. Just add another HTML file to the `demos` folder and link to this new page from `index.html`.

### Adding a new component

Before adding a new component, have a read through the [component conventions guide](./conventions/README.md). This guide covers everything from colors to event naming syntax and will help you create a component that is consistent with those that exist already.

### Running the tests

`npm test` will run the current test suite.

Calcite Components include Stencil's default testing tools which are built on [Jest](https://jestjs.io/) and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

If you're working on writing tests for a particular component, it can be helpful to use `npm run test:watch` to retest on file changes. Once the initial tests run, typing `o` at the prompt will run tests only on changed files, allowing you to quickly iterate on tests for a specific component.

Please refer to the [Stencil testing documentation](https://stenciljs.com/docs/testing-overview) for more information.

### Documenting a component

Calcite Components utilizes [Storybook](https://storybook.js.org/) for documenting components. Adding a new component is very simple:

1. Create a new file inside your component directory like `calcite-X.stories.js`
2. Write stories (see below)
3. Run the documentation locally with `npm run docs:preview`

The `docs:preview` command will build Calcite Components, and open your browser to view the storybook docs locally.

#### Writing stories

Each component should use a `storiesOf` with at least one story. It's a great idea to add the component's auto-generated `readme.md` as notes. If your component has props that effect visual styles, you can use the [storybook knobs addon](https://www.npmjs.com/package/@storybook/addon-knobs) to allow people to manipulate props and see live updates in the documentation. A minimal stories file might look something like this:

```
import { storiesOf } from '@storybook/html';
import { boolean } from '@storybook/addon-knobs'
import notes from './readme.md';

storiesOf('My component', module)
  .add('Simple', () => `
    <my-component demo-prop="${boolean("demo-prop", true)}"></my-component>
  , { notes })`
```
