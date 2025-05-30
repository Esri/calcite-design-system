# Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

Note: New contributors should first contact [Ben Elan](mailto:belan@esri.com) or [Juan Carlos Franco](mailto:JFranco@esri.com) to join the [Calcite Contributors GitHub team](https://github.com/orgs/Esri/teams/calcite-contributors/members). Then, clone the repo via SSH key on your machine (this Git workflow is required in order to work with our Chromatic test integration).

## I want to contribute, what should I work on?

You can help most by:

- Reporting issues by [filing a Bug issue](https://github.com/Esri/calcite-design-system/issues/new?assignees=&labels=bug%2C0+-+new%2Cneeds+triage&template=bug.yml).
- Requesting features for existing components by [creating an Enhancement issue](https://github.com/Esri/calcite-design-system/issues/new?assignees=&labels=enhancement%2C0+-+new%2Cneeds+triage&template=enhancement.yml).
- Adding ideas for components by [creating a New Component issue](https://github.com/Esri/calcite-design-system/issues/new?assignees=&labels=new+component%2C0+-+new%2Cneeds+triage&template=new-component.yml).
- Working on [the issues marked as `help wanted`](https://github.com/Esri/calcite-design-system/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+no%3Aassignee). There is also a [`good first issue`](https://github.com/Esri/calcite-design-system/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+no%3Aassignee+) label if you are just getting started.
  - To let us know of your interest in the issue, please comment on the issue and ask for the action items before you start working. Sometimes additional context is needed, which may not be specified in the issue. Comments also provide us access to assign the issue to you.
- If you want to help develop components take a look at the [new component issues](https://github.com/Esri/calcite-design-system/issues?q=is%3Aopen+is%3Aissue+label%3A%22new+component%22). Before starting development please review our [component conventions](./conventions/README.md) and the [Lit documentation](https://lit.dev/docs/getting-started/).

If you aren't familiar with the basics of Web Components and Shadow DOM, please read through some of the following resources before contributing:

- [Google - Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements)
- [Google - Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom)
- [CSS Tricks - An Introduction to Web Components](https://css-tricks.com/an-introduction-to-web-components/)

## Before filing an issue

Have you found a new bug? Want to request a new feature? We'd love to hear from you!

If something isn't working the way you expect, take a look at the [existing issues](https://github.com/Esri/calcite-design-system/issues) before logging a new one. You can also report a bug or request an enhancement with [Esri Support](https://support.esri.com/en-us/contact), or ask questions, share ideas, and collaborate with others on [Esri Community](https://community.esri.com/t5/calcite-design-system/ct-p/calcite-design-system).

When filing an issue, provide all of the requested info from the appropriate [issue template](https://github.com/Esri/calcite-design-system/issues/new/choose) so we can work on resolving the issue as soon as possible. A sample that reproduces the issue is required for logging bugs - we created templates in [codepen](https://codepen.io/pen?template=RwgrjEx), [codesandbox](https://codesandbox.io/s/calcite-template-p95kp?file=/src/App.js), and [jsbin](https://jsbin.com/qecewik/edit?html,output) (with the ArcGIS Maps SDK for JavaScript) to get you started. Alternatively, a [documentation](https://developers.arcgis.com/calcite-design-system/components/) sample can be used if the issue is reproducible. Some other considerations:

- Use a clear and descriptive title
- Describe what is happening now vs what should happen
- Tell us how to reproduce the issue (e.g., is it happening in a specific browser?)
- Can it be reliably reproduced? If not, tell us how often it happens and under what circumstances.
- Screenshots and GIFs are welcome!
- Did this problem start happening after a recent release, or was it always a bug?

## Issue management

### Labels

GitHub labels are used for organizing issues and providing context. You can familiarize yourself with the [label descriptions](https://github.com/Esri/calcite-design-system/labels) to understand what they signify.

### Lifecycle

There are four issue lifecycle labels:

- `0 - new`: Issues that are up for grabs.
- `1 - assigned`: Issues that someone will work on soon.
- `2 - in development`: Issues are currently being worked on.
- `3 - installed`: Issues that have been merged to the `dev` branch and/or are ready for QA/QC.
- `4 - verified`: Issues that have been tested, confirmed as mitigated, and are ready to close.

An issue can only have one of the lifecycle labels at any time. Please make sure to keep these up to date.

### Issues that cannot be worked on

There are four labels that mean an issue is not ready for development:

- `design`: Issues that need design consultation, such as interaction research/feedback, visual mockups, and general approval. Once design completes their review, an additional label, `ready for dev` will be added to the issue, which means a developer can pick up the issue.
- `spike`: Issues that need to research a question or resolve a complex task with uncertain outcomes. Once the spike has been performed a `spike complete` label is added to the issue, which means a developer can pick up the issue.
- `need more info`: Issues that are missing information and/or a clear, actionable description. This can mean we are waiting on a user to provide additional context, we can't reproduce the issue, or further discussion is needed in order to determine a solution.
- `blocked`: Issues that cannot be worked on until a different issue is resolved. The blocking issue may be from an external library (Lit, Storybook, Jest, etc.) or a Calcite Components issue. In the body or comments of a blocked issue, include a link to the blocking issue. To track when an issue is unblocked, add a comment in the blocking issue's body referencing the blocked issue(s). Use the following format for the comment: "Blocked issues: #0000, #0000". List multiple blocked issues by separating them with commas.

### Milestones

Milestones are used to organize issues targeted for a sprint in a planned release, and are not closed until all of the issues are verified. We have multiple milestones open at a time to help with future sprint planning. Calcite Core team members should grab issues from the current milestone when you are looking for something to work on. External contributors should ask before working on issues in upcoming milestones, since some of them need to be completed in a timely manner. There are also two constant milestones:

- **Stalled:** Issues we want to work on now, but are blocked, missing information, or require discussion to define action items. Try not to work on these issues unless an issue has a `spike` label and the research can be added to the issue for consideration in a future sprint.
- **Freezer:** Items that we want to look into, but do not have an immediate timeline associated. Try not to work on these issues unless they have a `help wanted` label.

### Estimates

Estimates are used to determine how much effort needs to go into an issue. The total estimate helps product managers triage issues effectively so designers and developers are not overwhelmed during sprints. If you are not on the team, please do not add estimates when creating cases. Here are some guidelines for time estimates using an `estimate-#` label for tracking:

### Design estimates

- `estimate - design - sm`: No more than a few days of design expertise.
- `estimate - design - md`: One to two weeks of design efforts and collaboration.
- `estimate - design - lg`: Two to four weeks of design expertise, collaboration, and discussion. Usually requires all hands on deck.

### Development estimates

- `estimate - 1`: Very small fix or change, a one line update.
- `estimate - 2`: Small fix or update, does not require updates to tests.
- `estimate - 3`: A day or two of effort, may require changes to tests.
- `estimate - 5`: A few days of effort, requires updates to tests.
- `estimate - 8`: Requires input from team, consider smaller steps.
- `estimate - 13`: Requires planning and input from team, consider smaller steps.
- `estimate - 21`: Requires planning, input from team members and possibly others.
- `estimate - 34`: Issue should be converted into an epic. Requires all hands on deck.

### Epics

Epics are specified by the `epic` label. Epics are changes that require a considerable effort and wouldn't fit into a single milestone. An epic should be a single concept, and have child issues for individual tasks created and listed in the epic's issue body.

## Code base

Our code base is written in TypeScript and must adhere to specific conventions and formatting. Please do the following while developing:

1. Avoid setting types as `any`.
2. Try to always provide a type.
3. Provide JSDoc for all public APIs.
4. Fix linting errors, don't ignore them.

## Getting a development environment set up

An installation of Node is required for development. If you don't have Node installed, we recommend [Volta](https://docs.volta.sh/guide/getting-started), which will automatically use the Node/NPM versions pinned at the bottom of [`package.json`](./package.json). If you prefer a different Node version manager, make sure to use the major versions of Node/NPM specified under the "volta" key in [`package.json`](./package.json).

We also recommend installing the following extensions in your editor of choice: TypeScript, TailwindCSS, ESLint, Stylelint, and Prettier. If you use VS Code, you will see a pop up in the bottom right corner prompting you to install or view the workspaces's recommended extensions. Here are instructions for manually installing the extensions in a variety of editors:

- <https://tailwindcss.com/docs/intellisense>
- <https://eslint.org/docs/latest/user-guide/integrations>
- <https://stylelint.io/awesome-stylelint/#editor-integrations>
- <https://prettier.io/docs/en/editors.html>

If your IDE supports the [Language Server Protocol (LSP) specification](https://microsoft.github.io/language-server-protocol/) but isn't mentioned in the links above, ask Ben for help getting set up.

**NOTE:** If you are on Windows, we strongly recommend using the Bash emulation that ships with [Git for Windows](https://gitforwindows.org/). Or better yet, use [Ubuntu in WSL](https://ubuntu.com/wsl)! Otherwise, keep in mind that some of the scripts used by maintainers (such as for releasing) likely won't work in Command Prompt or PowerShell. However, please log an issue if scripts used for normal development (start/test/build/etc) don't work in your Windows environment.

## Starting the demos

First, clone the repo and then install the NPM dependencies:

```sh
git clone git@github.com:Esri/calcite-design-system.git
cd calcite-design-system
npm install
```

Next, start the local Vite development server on localhost:

```sh
npm run start:components
```

The demos will open in the browser after building. Edit the pages in [`packages/calcite-components/src/demos`](.packages/calcite-components/src/demos) to modify the component demos, such as changing attributes or adding content to slots. When adding a new demo page, make sure to add a link in [`packages/calcite-components/src/index.html`](./packages/calcite-components/src/index.html) so others can find it. You can also edit the component code in [`packages/calcite-components/src/components`](packages/calcite-components/src/components`./src/components), and the changes will be reflected in the demos.

## Linting

This project uses [lint-staged](https://www.npmjs.com/package/lint-staged) to automatically format code on commit, making it easier to contribute. Each package has it's own linting NPM scripts, so check there for more options. For example, calcite-components has NPM scripts that lint by different filetypes. To run the `lint` NPM script for all packages that have one, do:

```sh
npm run lint
```

Or use the `--workspace` flag to lint a single package.

```sh
npm --workspace=packages/calcite-components run lint
```

You can avoid using the `--workspace` flag in every command by `cd`ing into the package you're working on:

```sh
cd packages/calcite-components
# the following will only lint and test calcite-components
npm run lint
npm test
```

## Running the tests

`npm test` will run the test suites.

Calcite Components include Vitest's testing tools which are powered by [Vitest](https://vitest.dev) and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

If you're working on writing tests for a particular component, it can be helpful to use `npm --workspace=packages/calcite-components run test:watch` to retest on file changes. If you need to run tests in interactive watch mode, you can use `npm --workspace=packages/calcite-components run test:watch:stable` or `npm --workspace=packages/calcite-components run test:watch:experimental`. In interactive watch mode, once the initial tests run, typing `o` at the prompt will run tests only on changed files, allowing you to quickly iterate on tests for a specific component. You can also add a pattern to the end of the command to match for a test's file path.

Please refer to Calcite's [testing conventions](./packages/calcite-components/conventions/Testing.md) for more information.

## Adding a new component

Before adding a new component, please read through the [component conventions guide](./packages/calcite-components/conventions/README.md). This guide covers everything from colors to event naming syntax and will help you create a component that is consistent with those that already exist. All new components should have an [issue](https://github.com/Esri/calcite-design-system/issues/new?assignees=&labels=new+component%2C+0+-+new%2C+architecture&template=new-component.md&title=New+Component%3A+).

## Documenting a component

Calcite Components utilizes [JSDoc](https://jsdoc.app/about-getting-started) to create API reference documentation and [Storybook](https://storybook.js.org/) for documenting components. Adding a new component is very simple:

1. Create a new file inside your component directory like `X.stories.js`
2. Write stories
3. Run the documentation locally with `npm --workspace=packages/calcite-components run docs:preview`

Calcite Component's `docs:preview` command will build and open your browser to view the storybook docs locally.

Please refer to the [Documentation Conventions](./packages/calcite-components/conventions/Documentation.md) for more information.

## Branch naming conventions

When submitting a pull request, please use one of the following formats for your branch name:

For pull requests associated with an existing issue:

```text
<username>/<issue-id><issue-description>
johndoe/15-update-modal
johndoe/update-modal-15
```

For pull requests without an associated issue:

```text
<username>/<issue-description>
johndoe/modal-styling
```

```text
<username>/<type-of-pr><issue-description>
johndoe/docs/update-modal-docs
johndoe/feature/add-something-to-modal

```

## Commit message format

Calcite follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), using the [Angular style](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#commit-message-format), to automate changelog generation. Commit messages should be clear and detailed to ensure accurate changelogs.

Contributions should adhere to the `<type>(<scope>): <descriptive summary>` format and include the following:

- [Commit type](#commit-type)
- [Scope of change](#scope-of-change), *optional*
- [Descriptive commit subject](#descriptive-commit-subject)

Check out the [contribution example](#contribution-example) for a formatted example, and explore [breaking change formatting](#breaking-changes) for consideration during Calcite's breaking change releases.

### Commit type

Contributions must adhere to **one** of the following types:

- **`chore`**: Adds a new build process, or auxiliary tool and libraries (e.g., documentation generation) 🤖
- **`docs`**: Documentation only changes 📚
- **`feat`**: Adds a new feature, or functionality ✨
- **`fix`**: Fixes a bug 🐛
- **`perf`**: A change improving performance 🚀
- **`refactor`**: A change that neither fixes a bug or adds a feature 🔁
- **`revert`**: Reverts a previous commit ↪️
- **`test`**: Improves test coverage in updating a test or adding a new, or missing test 🧪
- **`deprecate`**: Documentation only changes for a deprecation 👎

### Scope of change

*Optional*. Most contributions will include a scope, such as a component, multiple components, test(s), or utilities. For example:

- `text-area`
- `dropdown, dropdown-group, dropdown-item`
- `common`

Not all commits will contain a scope, however it is recommended to include scope when possible.

### Descriptive commit subject

The subject should contain a concise description of the proposed change, where contributors will:

- **Be succinct, yet informative** to ensure the change's purpose is conveyed once added to the changelog
- Describe the commit's purpose, not a related issue or how the change was mitigated
- Use the imperative, present tense, such as "update" instead of "updated" or "updates"
- Not capitalize the first letter
- Not insert a period `.` at the end

### Contribution example

For instance, if providing a bug fix to the Text Area component, which includes additional support to assistive technologies, you could use the following conventional commit:

```text
fix(text-area): provide additional support to assistive technologies
```

A more in-depth description can be added to the PR's body summary. For example:

```text
Related Issue: <Issue number>

### Summary
Provide additional context for assistive technology users when the component's character limit exceeds the `maxLength` property. Assistive technology users recieve an error message as soon as the character limit is exceeded.
```

For additional examples, you can explore [Calcite's recent commits](https://github.com/Esri/calcite-design-system/commits/main).

## Breaking changes

Calcite Core team members should be consulted prior to submitting breaking change pull requests. For stability and consistency, breaking change sprints are coordinated and communicated well in advance.

When breaking changes are supported in a current milestone, commit messages for breaking changes should use both the header (`!`) and body (`BREAKING CHANGE:`) syntax.

The PR's details should be comprehensive, and when possible, include the following:

- What the proposed breaking change includes
- Why the breaking change is proposed
- An example to support users migrating from the previous major version (e.g., `1.x` to `2.x`)

For PR examples, refer to previous changelog entries from the `2.0` major releases for [calcite-components](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-components/CHANGELOG.md#200-2023-12-02) and [calcite-design-tokens](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-design-tokens/CHANGELOG.md#200-2023-12-02). Also explore the breaking change structure below:

```text
<type>(<scope>)!: <descriptive summary>

<optional info>

BREAKING CHANGE: <What the breaking change includes, why it is proposed, and migration support for users>
```

When adding a `BREAKING CHANGE:` note to the summary block right before confirming a squash merge, remove all the info except the `BREAKING CHANGE:` note itself, or else everything ends up being added to the changelog.

### Breaking change contribution example

For instance, if adding a refactored breaking change to the Modal component, you could use the following conventional commit:

```text
refactor(modal)!: rename `width` property to `widthScale`
```

And a more in-depth, but succinct description for the PR's body summary could include:

```text
Related Issue: <Issue number>
BREAKING CHANGE: For consistency, renames `width` property to `widthScale`.
```

See the [conventional commits doc](https://www.conventionalcommits.org/en/v1.0.0/) for more helpful information.

## Pull requests

In order to ensure conventional commits are followed, pull requests will run a check to indicate whether the PR is following the convention or not. The [Semantic Pull Request](https://github.com/amannn/action-semantic-pull-request) status check will ensure your pull requests are semantic before you merge them.

You can update the PR title any time before merging the PR. This may be necessary when the scope or type of the PR changes, or if additional details are needed for the changelog entry.

By default, the PR body will be used for the commit message when squash merging, so make sure to add any relevant details there.

### Visual snapshots

If the PR's linked issue contains the `visual changes` label **or** the PR contains [visual changes](#visual-changes), once you are ready to run Chromatic to create visual snapshots, add the `pr ready for visual snapshots` label to the PR. Removing and re-adding the label is required to re-run snapshots, e.g. when pushing additional updates.

If visual snapshots are not necessary for the PR (e.g. changes to doc, ci, storybook, etc.), you can add the `skip visual snapshots` label instead. The `skip visual snapshots` label can also be used to prevent re-running Chromatic after pushing minor cleanup changes before merging.

#### Visual changes

Visual changes include issues and/or PR's that introduce a visual alteration that is not backwards compatible. If the change could prevent a visual test from passing, the change should be considered a visual change. Visual changes should be coordinated with designers and have consistency across the design system in mind.

Visual changes can be a standalone change, or be introduced with breaking changes. For instance, [Split button consistent divider across appearances](https://github.com/Esri/calcite-design-system/issues/8142) and [List scales, padding, spacing, and font sizes](https://github.com/Esri/calcite-design-system/issues/7100).
