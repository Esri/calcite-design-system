# Project Guidelines

Hey there and thanks for stopping by! We welcome all feedback and contributions to [Calcite Components](https://github.com/Esri/calcite-components/blob/master/README.md). If you are interested in getting involved, we ask that you give our guidelines a read. Below is a list of things we've found work well for us as we continue developing our components.

## TOC

- [Code of conduct](https://github.com/Esri/contributing/blob/master/CODE_OF_CONDUCT.md)
- [Conventions](#conventions)
  - [Contribution guidelines](https://github.com/esri/contributing)
  - [Formatting](#formatting)
  - [Github](#github)
  - [Report a bug!](#report-a-bug)
- [Dist/package](https://github.com/Esri/calcite-components/blob/master/GETTING_STARTED.md_)
- [Code base](#code-base)
  - [A11y](#a11y)
  - [Components](#components)
- [Gotchas](#gotchas)

## Conventions

### Contributing

Please see our [contributing guidelines](https://github.com/Esri/calcite-components/blob/master/CONTRIBUTING.md).

### Formatting

This project uses [lint-staged](https://www.npmjs.com/package/lint-staged) to automatically format code on commit, making it easier to contribute.

### Github

#### Issues

We have created [templates](https://github.com/Esri/calcite-components/issues/new/choose) for new issues for everyone to follow for consistency. Please be specific and thorough when submitting new issues! Think about things like user stories, acceptance criteria, design, and any other details that might be helpful for developers and designers.

#### Commits

This project follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), which are used to generate the changelog. Be sure to provide clear and sufficient information in commit messages. This is important because the commit messages are used to automatically update the changelog.

#### Pull requests

In order to ensure conventional commits are followed, pull requests will run a check to indicate whether the PR is following the convention or not. The [Semantic Pull Request](https://github.com/probot/semantic-pull-requests) status check will ensure your pull requests are semantic before you merge them.

#### Branch naming conventions

When submitting a pull request, please use one of the following formats for your branch name:

For pull requests associated with an existing issue:

```
<username>/<issue-id><issue-description>
johndoe/15-update-modal
johndoe/update-modal-15
```

For pull requests without an associated issue:

```
<username>/<issue-description>
johndoe/modal-styling
```

```
<username>/<type-of-pr><issue-description>
johndoe/docs/update-modal-docs
johndoe/feature/add-something-to-modal

```

#### Breaking Changes

For ease of discoverability, commit messages for breaking changes should use both the header (`!`) and body (`BREAKING CHANGE:`) syntax:

```
<type>!: <descriptive summary>

<optional info>

BREAKING CHANGE: <details about the change and migration options (this can span multiple lines)>
```

See the [conventional commits doc](https://www.conventionalcommits.org/en/v1.0.0/) for more helpful information.

### Report a bug

We use GitHub issues to keep track of bugs. Please follow our [bug issue template](https://github.com/Esri/calcite-components/issues/new?assignees=&labels=bug%2C+0+-+new&template=bug.md&title=Bug%3A+) and explain the problem clearly for us maintainers to understand and reproduce. The more details the better!

Things to consider:

- Use a clear and descriptive title
- What is happening now vs what should happen?
- Tell us how to reproduce the issue (e.g. is it happening in a specific browser?)
- Can it be reliably reproduced? If not, tell us how often it happens and under what circumstances.
- Screenshots and GIFs are our friends!
- Did this problem start happening after a recent release or was it always a bug?

## Code base

Our code base is written entirely in TypeScript and we should aim to have it that way. We have configured the project to help adhere to some conventions and formatting. Here are additional items to follow:

1. Avoid using any as much as possible.
2. Try to always provide a type.
3. Provide JSDoc for all public APIs.
4. Fix linting errors, don't ignore them.

### A11y

Components must be accessible and are required to have tests that focus on a11y. We use the following resources as guides:

- [Google accessibility overview](https://developers.google.com/web/fundamentals/accessibility/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)

### Components

New components should have an [issue](https://github.com/Esri/calcite-components/issues/new?assignees=&labels=new+component%2C+0+-+new%2C+architecture&template=new-component.md&title=New+Component%3A+) so we can determine whether they belong here or [calcite-components](https://github.com/Esri/calcite-components).

#### General checklist

See the [new component checklist](https://github.com/Esri/calcite-components/wiki/New-Component-Checklist).

#### Documentation

This project uses [Storybook](https://storybook.js.org/) to provide an interactive showcase of components with accompanying documentation.

For each main component (i.e., one that can be used by itself), there should be a `<component-name>.stories.ts` file in its component folder.

Each story should provide access to relevant [knobs](https://github.com/storybookjs/storybook/tree/next/addons/knobs) so users can test out different properties.

For additional documentation, create a [usage folder](https://github.com/Esri/calcite-components/tree/master/src/components/calcite-action/usage) in the component directory with a basic.md and optionally an advanced.md file (if additional documentation or examples are required) with snippets showing different supported use cases for the component.

#### Best practices

The following resources showcase best practices we follow for our web components:

- [Google Web Component Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [Custom Element Conformance - W3C Editor's Draft](https://html.spec.whatwg.org/multipage/custom-elements.html)

#### Structure

We follow Stencil's suggested component structure. See their [style guide](https://github.com/ionic-team/stencil/blob/master/STYLE_GUIDE.md#file-structure) for more details.

#### Styling

Be sure to set `shadow: true` in Stencil's `@Component` options to make sure styles are encapsulated in our Calcite design system. This helps keep our components consistent across applications.

##### Avoid complex CSS selectors

Avoid complex CSS selectors and move logic into the component. As a general rule, if using more than 1 attribute in the CSS selector, use a class and move the logic into the component.

For example, instead of a complex CSS selector as demonstrated below:

```css
[dir="rtl"][alignment="icon-end-space-between"]:not([width="auto"]) {
  /* ... */
}
```

Add a class to handle the logic in the component class.

```tsx
<div
  class={{
    [CSS.myClass]: rtl && alignment === "icon-end-space-between" && width !== "auto"
  }}
/>
```

```css
.myClass {
  /* ... */
}
```

#### Utils

##### Unique IDs for components

Many times it is necessary for components to have an `id="something"` attribute for things like `<label>` and various `aria-*` properties. To safely generate a unique id for a component, but to also allow a user supplied `id` attribute to work, follow the pattern using `guid` in our [calcite-value-list](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-value-list/calcite-value-list.tsx).

This will create a unique id attribute like `id="calcite-example-51af-0941-54ae-22c14d441beb"`, which should have a VERY low collision change since guid() generates IDs with `window.crypto.getRandomValues`. If a user supplies an `id`, it will respect the users `id`.

##### i18n

Components should require as a few text translations as possible. In general, this allows users to supply text values via slots and attributes and handle translations within their apps.

If your component involves formatting numbers or dates use the [`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for formatting.

To add RTL support to your components, use the internal `getElementDir` helper to apply the `dir` attribute to the component. That way, the `dir` attribute of the component will always match that of the document. See use of `getElementDir` in [calcite-panel](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-panel/calcite-panel.tsx).

Direction specific CSS can be implemented with CSS variables- see example [here](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-block-section/calcite-block-section.scss).

- https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117 and https://codesandbox.io/s/43pmx55vo9
- https://github.com/ionic-team/ionic-stencil-conference-app/issues/69

#### Testing

Components should have an automated test for any incoming features or bug fixes. Make sure all tests pass as PRs will not be allowed to merge if there is a single test failure.

We encourage writing expressive test cases and code that indicates intent. Use comments sparingly when the aforementioned can't be fully achieved. Keep it clean!

Please see Stencil's doc for more info on [end-to-end](https://stenciljs.com/docs/end-to-end-testing) testing. See one of our test examples [here](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-block/calcite-block.e2e.ts).

#### Browser support

See our [README.md](https://github.com/Esri/calcite-components/blob/master/README.md#browser-support) for a list of supported browsers.

## Gotchas

- See our [gotchas wiki](https://github.com/Esri/calcite-components/wiki/Stencil-Tidbits#gotchas) for issues we've found with Stencil.
