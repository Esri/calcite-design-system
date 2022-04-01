## Tests

Components should have an automated test for any incoming features or bug fixes. Make sure all tests pass as PRs will not be allowed to merge if there is a single test failure.

We encourage writing expressive test cases and code that indicates intent. Use comments sparingly when the aforementioned can't be fully achieved. Keep it clean!

Please see Stencil's doc for more info on [end-to-end](https://stenciljs.com/docs/end-to-end-testing) testing. See one of our test examples [here](https://github.com/Esri/calcite-components/blob/master/src/components/block/block.e2e.ts).

### Writing Tests

#### Prevent logging unnecessary messaging in the build

**This is only necessary if a component's test will produce a lot of console messages in a test run.**

As a best practice when writing tests, prevent emitting console warnings by stubbing them. Depending on the tested component, this may also apply to other console APIs.

Console warnings can end up polluting the build output messaging that makes it more difficult to identify real issues. By stubbing `console.warn`, you can prevent warning messages from displaying in the build. See [`color.e2e`](https://github.com/Esri/calcite-components/blob/af0c6cb/src/components/color/color.e2e.ts#L9-L17) for an example.

### Unstable Tests

If you notice that a test fails intermittently during local or CI test runs, it is unstable and must be skipped to avoid holding up test runs, builds and deployments.

To skip a test, use the `skip` method that's available on [tests, or suites](https://jestjs.io/docs/en/api#methods) and submit a pull request. Once that's done, please create a follow-up issue by [choosing](https://github.com/Esri/calcite-components/issues/new/choose) the unstable test template and filling it out.
