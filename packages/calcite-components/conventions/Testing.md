# Tests

Components should have an automated test for any incoming features or bug fixes. Make sure all tests pass as PRs will not be allowed to merge if there is a single test failure.

We encourage writing expressive test cases and code that indicates intent. Use comments sparingly when the aforementioned can't be fully achieved. Keep it clean!

Our testing framework includes an API that aligns with Stencil's end-to-end testing approach. For more details, refer to Stencil's [end-to-end testing](https://stenciljs.com/docs/end-to-end-testing) documentation. See one of our test examples [here](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/components/block/block.e2e.ts).

## Choosing which tests to write

### End-to-end tests

In most cases, when working with components, you will need to write end-to-end tests.

### Unit (spec) tests

If you are adding or updating shared utilities or shared modules you should make sure that there are unit tests covering those use cases.

### Visual regression tests

Visual regression tests are handled by [Chromatic](https://www.chromatic.com/) in our build pipeline and rely on [Storybook](https://storybook.js.org/).

### Writing stories

For each main component (i.e. one that can be used by itself), there should be a `<component-name>.stories.ts` file (following [Component Story Format (CSF)](https://storybook.js.org/docs/html/api/csf)) in its component folder.

The following shows what a minimal stories file should look like (explained below):

```ts
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/My Component",
};

export const simple = (): string => html`<my-component></my-component>`;

simple.parameters = {
  args: {
    demoProp: true,
  },
};

export const darkModeRTL = (): string =>
  html`<my-component demo-prop dir="rtl" class="calcite-mode-dark"></my-component>`;

darkModeRTL.parameters = { modes: modesDarkDefault };
```

#### General guidelines

- Story names should be camelCased
- Update the [main custom theme](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/custom-theme.stories.ts) story instead of adding a specific story showing how to use a custom CSS prop
- Should only have HTML for the component or use case itself (e.g., no need to wrap in calcite-label)
- Update the `simple` story with corresponding [controls](https://storybook.js.org/docs/essentials/controls) instead of adding a story specific to a new prop with its respective control
- Don't add or update a story if it is covered by an existing one

#### Interactive showcase stories

- Should have controls configured to allow users to toggle different properties available to the component
- The simplest, base configuration should be named `simple` for consistency
- This story should have as many controls as possible for users to interact with
- Should have one story per unique, supported use case
- New stories that can be covered by adding a new prop/control should instead update an existing playground story

#### Screenshot stories

- Should have the minimal HTML needed to reproduce the test scenario
- Should not have controls since screenshot tests cannot interact with them
- The `simple` story and any other significant configurations should have a matching `darkModeRTL` story
  - **Note**: In order to reduce snapshot count, dark mode and RTL visual tests have been combined

## Writing Tests

### Helpers and utilities

There are helpers and utilities to make testing common workflows easier. [`commonTests.ts`](https://github.com/Esri/calcite-design-system/blob/dev/src/packages/calcite-components/tests/commonTests.ts) contains common tests that you can import and use for your component. For example, every component should have an [`accessible`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/tests/commonTests.ts#L48-L62) test. To use the test in your component, import the helper and assert that the component is accessible.

```js
import { accessible } from "../../tests/commonTests";

it("is accessible", async () => accessible(`<calcite-example>${content}</calcite-example>`));
```

Here is an example of the helper test usage in [`accordion.e2e.ts`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/components/accordion/accordion.e2e.ts#L16).

There are many more useful, common tests that you should use in specific scenarios. In most IDEs or text editors, you can search the function name of a common test to find usage examples in component's end-to-end test files.

In addition to the common tests, there are also test utilities in [`utils.ts`](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/tests/utils.ts). These utilities are created to avoid duplicate code in component end-to-end test files. If you find yourself creating the same test function for different components, then it should be moved to `utils.ts`. A good example is [`getElementXY`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/tests/utils.ts#L124-L139). Determining the screen location of an element can be very important when testing interactive components. Here are some end-to-end tests where the utility is used in [`color-picker.e2e.ts`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/components/color-picker/color-picker.e2e.ts#L232-L236), [`input-e2e.ts`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/components/input/input.e2e.ts#L289-L293), [`shell-panel.e2e.ts`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/components/shell-panel/shell-panel.e2e.ts#L381), and [`slider.e2e.ts`](https://github.com/Esri/calcite-design-system/blob/35f5aaf165b54d3f139e1ff2978a7c0246a0bf69/src/components/slider/slider.e2e.ts#L176).

### Prevent unnecessary logging in the build

**This is only necessary if a component's test will produce a lot of console messages in a test run.**

As a best practice when writing tests, prevent emitting console warnings by stubbing them. Depending on the tested component, this may also apply to other console APIs.

Console warnings can end up polluting the build output messaging that makes it more difficult to identify real issues. By stubbing `console.warn`, you can prevent warning messages from displaying in the build. See [`color.e2e`](https://github.com/Esri/calcite-design-system/blob/af0c6cb/src/components/color/color.e2e.ts#L9-L17) for an example.

## Unstable Tests

If you notice that a test fails intermittently during local or CI test runs, it is unstable and must be skipped to avoid holding up test runs, builds and deployments.

To skip a test, use the `skip` method that's available on [tests, or suites](https://vitest.dev/guide/filtering.html#skipping-suites-and-tests) and submit a pull request. Once that's done, please create a follow-up issue by [choosing](https://github.com/Esri/calcite-design-system/issues/new/choose) the unstable test template and filling it out.
