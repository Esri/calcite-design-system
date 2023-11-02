# Angular Workspace

See [`./projects/component-library/`](./projects/component-library) for the `@esri/calcite-commponents-angular` code.

This package has an unusual file structure because it needs to use an [Angular workspace for a single library](https://angular.io/guide/file-structure#library-project-files). The setup was created following [Stencil's Angular documentation](https://stenciljs.com/docs/v2/angular).

Angular has another unusual behavior where it copies `package.json` to the library's `dist` and adds/modifies fields, like the `exports`. Angular requires that you `cd` into the `dist` directory before publishing. Otherwise the incorrect `package.json` file will be used and the `exports` won't work. Here is Angular's [library publishing documentation](https://angular.io/guide/creating-libraries#publishing-your-library).

Luckily, mostly due to Angular, [Lerna allows publishing from a different directory](https://github.com/lerna/lerna/tree/main/libs/commands/publish#publishconfigdirectory).

Angular's publishing workflow means using `npm link` and `npm pack` like a normal package won't work. In order to test this package locally, run the following from the root of the monorepo:

```sh
npm run build
cd packages/calcite-commponents-angular/projects/component-library/dist
npm pack
cp esri-calcite-components-angular-*.tgz ~/path/to/example-app
cd ~/path/to/example-app
npm install esri-calcite-components-angular-*.tgz
```
