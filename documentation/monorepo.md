# Monorepo

Calcite development occurs in a monorepo to simplify the continuous integration and issue management workflows. Calcite uses [`turbo`](https://turbo.build/repo) to manage packages, [`lerna` for versioning and `next` releases](https://lerna.js.org/docs/features/version-and-publish), and [`release-please`](https://github.com/googleapis/release-please) for `latest` releases.

## NPM scripts

The monorepo uses [NPM workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces?v=true). You can run NPM scripts for specific packages from anywhere in the repo using the `--workspace` flag. Workspace names are specified in the "name" field in `package.json`. For example, to watch Calcite Component tests from the repo's root directory, run:

```sh
npm run --workspace=@esri/calcite-components test:watch
```

If your PWD is within a package's directory, e.g. `packages/calcite-components`, you can run NPM scripts for that package without the `--workspace` flag.

However, make sure to always use the workspace flag when installing dependencies. This may not be necessary, but dependency hell is a scary place so better safe than sorry. Read the [dependencies](#dependencies) section for more info.

Many of the NPM scripts in the root `package.json` run turbo pipelines. See the [task execution](#task-execution) section for more info.

> NOTE: In order to take advantage of Turbo's task execution, Calcite Component's `test` NPM script no longer has a baked in `build`. However, a `build` was added before the `test:watch` script, which is more commonly used by developers.

## Monorepo management

Monorepos are difficult to manage manually, especially at scale. Management tools help coordinate complex local dependency graphs so everything runs smoothly. Monorepo tools can also provide build caching and package versioning functionality.

### Tools

#### Turbo

Turbo is a package-based monorepo tool that simplifies workspace dependency management and improves build and task execution using [caching](https://turbo.build/repo/docs/core-concepts/caching), [multitasking](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks#turborepo-can-multitask), and other strategies. Here is a breakdown of the difference between [package-based and integrated monorepos](https://nx.dev/concepts/integrated-vs-package-based) by Turbo's competitor, `nx`. Checkout [Turbo's monorepo handbook](https://turbo.build/repo/docs/handbook) to learn more.

#### Lerna

[Lerna](https://lerna.js.org/) is the O.G. monorepo management tool for Node, and is now maintained by the creators of [Nx](https://nx.dev/). Nx provides the build caching and task execution, while Lerna helps with versioning and publishing packages. Nx and Lerna are often used side-by side. Calcite uses Lerna as a dependency of [`release-please`'s node-workspace plugin](https://github.com/googleapis/release-please/blob/main/src/plugins/node-workspace.ts) and for [prereleases](#prereleases). However, Calcite uses Turbo instead of Nx for the caching and task execution.

If Turbo adds the ability to generate a dependency graph between workspaces in Node, [a custom `release-please` plugin](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md#plugin-implementation) can be created to replace Lerna. This looks like [Turbo's only Node API](https://github.com/vercel/turbo/tree/main/packages/turbo-workspaces) for now. `release-please` would also need to add better support for [prereleases](#prereleases) to fully remove Lerna from the repo.

#### Other options

- nx: <https://github.com/nrwl/nx>
- changesets: <https://github.com/changesets/changesets>
- auto: <https://github.com/intuit/auto>

### Structure

All packages published to NPM are in the `packages` directory. Once added, unpublished packages will live in a different directories, such as `documentation`.

### Task execution

Turbo Repo pipelines, such as build/test/lint, are specified in `turbo.json` and have their outputs cached to improve performance. Turbo uses a hash to determine if a package changed since storing the cached output. By default, Turbo will rerun the task when any file in a package changes. Glob patterns for files that should cause a cache miss when changed are specified in a task's "inputs" field in `turbo.json`. Calcite has not set inputs yet to prevent caching issues. If things run smoothly for a while inputs can be specified to improve performance.

#### Remote caching

Turbo supports [remote caching](https://turbo.build/repo/docs/core-concepts/remote-caching#a-single-shared-cache) which can improve performance in GitHub Actions and other CI that runs in containers or has an ephemeral filesystem. Calcite is not using remote caching right now since it appears to be a paid service. There is [internal documentation for self hosted remote caching](https://confluencewikidev.esri.com/display/~rene8209@esri.com/TurboRepo+Remote+Cache), which may be implemented for Calcite in the future.

### Dependencies

Make sure to explicitly specify the workspace if you are installing a dependency to a non-root `package.json`. Workspace names are specified in the "name" field in `package.json` files. For example, to install `@stencil/core` to `packages/calcite-components`, run:

```sh
npm install --workspace=@esri/calcite-components @stencil/core
```

Use the following rules to determine where the dependency should be installed:

1. Install devDependencies in the root `package.json`, except when installing packages local to the monorepo. For example, if `@esri/calcite-components` uses `@esri/calcite-design-tokens` as a devDependency, it should be installed in `packages/calcite-components/package.json`. Local dependencies need to be in the package's workspace so task execution order and versioning work correctly.

1. Install dependencies to the package's workspace, remembering to use the `--workspace` flag.

There can be exceptions to the rule when build issues arise. For example, there were build errors because two Stencil versions were being installed. `@stencil/core` is a dependency of `@esri/calcite-components` so it was installed in the workspace's `package.json`. However, some Stencil devDependencies (which were installed in the root) had `@stencil/core` as a dependency too, which resulted in multiple installations. The issue was resolved by moving the Stencil devDeps to the `@esri/calcite-components` workspace's `package.json`.

### Adding new packages

A new package should not be added to the monorepo if the new package has deployable changes. This ensures the changelog for the package's next release isn't missing entries that were committed in the previous repo. If the package has deployable changes, create a release before continuing.

Make the following changes and submit a PR:

1. Move devDependencies to the root directory (besides local packages). You will need to regenerate the `package-lock.json` if you copy and paste from `package.json` files.
1. Move GitHub Actions, git hooks, or other CI to the root directory, if applicable. GitHub Actions should follow the the naming convention of `what-it-does_scope.yml`, e.g. `pr-tests_eslint-plugin-calcite-components.yml`
1. Add the path to the package and its current version to [`.release-please-manifest.json`](https://github.com/Esri/calcite-design-system/blob/main/.release-please-manifest.json).
1. In [`release-please-config.json`](https://github.com/Esri/calcite-design-system/blob/main/release-please-config.json) under the `packages` field, add the new package's path as well as any package-specific configurations. The only required field is the package's name, taken from the `name` field in its `package.json`.
1. If the new package needs to be linked to Calcite Component's version, add its name to the `LINKED_VERSIONS_TRACKING_PACKAGES` array in [`support/syncLinkedPackageVersions.ts`](https://github.com/Esri/calcite-design-system/blob/main/support/syncLinkedPackageVersions.ts).
1. Potentially rename the new package's NPM scripts so they match the pipeline names in `turbo.json` (build, test, clean, etc.). Note: having all of the NPM scripts that are specified in `turbo.json` is not required.
1. If present and when possible, the `test` NPM script should _not_ build first. Turbo will make sure the `build` script runs first and will cache the results.
1. Potentially rename directories for consistency with the other packages:

- `src/` - source code
- `dist/` - directory created when building
- `support/` - package-specific scripts such as build patches

1. If there is an existing changelog, make sure its heading matches the changelogs of the other packages in the monorepo.

Make the following changes once the PR is installed, which will ensure the release CI generates changelog entries starting at the correct commit:

1. Create a [git tag](#git-tags) on the commit that adds the package.

   ```sh
   git tag -a "<package_name>@<current_version>" "<git_sha>" -m "<package_name>@<current_version>"
   npm run util:push-tags
   ```

1. Create a [GitHub release](#github-releases) using the git tag you created. The title should be the same as the git tag. The body can say: "Move package to the Calcite Design System monorepo"

## Releasing

Calcite uses `release-please`, which creates release PRs that are automatically updated after pushes to the target branch using a [GitHub Action](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md#using-with-github-actions-and-lerna). `release-please` takes care of [changelog generation](https://github.com/googleapis/release-please/blob/main/docs/customizing.md#changelog-types), GitHub releases, git tags, and [package versioning](https://github.com/googleapis/release-please/blob/main/docs/customizing.md#versioning-strategies). `release-please` also has [plugins](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md#plugins) and [file updaters](https://github.com/googleapis/release-please/blob/main/docs/customizing.md#updating-arbitrary-files). Calcite uses the generic file updater to bump the Calcite Components CDN link version in the package's readme. A [manifest file](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md#configfile) in the root directory configures `release-please`, as well as JSON file with the current versions of the monorepo's packages. The version JSON file is automatically updated in the release PR, along with the versions in `package.json` files.

> NOTE: `release-please`'s config options are out of date in their manifest config file documentation. Check the [JSON schema](https://github.com/googleapis/release-please/blob/main/schemas/config.json) for up to date options instead. The options and their values will autocomplete in VS Code when editing the config file in Calcite's repo. You can also install [VS Code's JSON language server](https://github.com/microsoft/vscode-json-languageservice) if your [editor has an LSP client](https://microsoft.github.io/language-server-protocol/implementors/tools/) (ask Ben for help).

### Versioning

Calcite has a slightly more complex versioning pattern than other monorepos. Commonly, monorepos either maintain all the packages under the same version, or all as different versions. When versioning separately, packages bump a patch version when a dependency updates, even if a major update for the dependency occurred. For example, if `calcite-components@1.3.2` depends on `calcite-design-tokens@2.4.0` and there is a major `design-tokens` release to `v3x`. `calcite-components` will be bumped to `v1.3.3` and released with the new `design-tokens`. This makes sense for most packages with the assumption that the consuming devs resolve breaking changes so they won't affect downstream users.

`calcite-components-react` (CCR) is a wrapper of `calcite-components` (CC), which makes versioning trickier. When CC releases a breaking change, CCR also needs to release a breaking change. `release-please` has a plugin called [`linked-versions`](https://github.com/googleapis/release-please/blob/main/docs/customizing.md#updating-arbitrary-files), which makes sure the specified packages always stay the same version. It works by checking the conventional commits of the specified packages, and then bumps all linked packages to the highest version of the bunch. Moving forward, the CC and CCR versions will always be the same. The `design-tokens` and other packages can still be versioned separately.

Using `linked-versions` means a bug fix in CCR will also bump CC a patch version, even if there are no deployable changes. This doesn't make sense because CC isn't dependent on CCR. To keep versions tidy, any deployable changes to CCR are not released until changes of the equivalent semver type are installed in CC. However, there has never been a deployable change to CCR that wasn't from CC, so this shouldn't be an issue.

### Prereleases

`release-please` has a couple issues ([510](https://github.com/googleapis/release-please/issues/510) and [1355](https://github.com/googleapis/release-please/issues/1355)) that block Calcite from using it for `next` releases. Calcite will use Lerna for `next` release versioning and changelog generation until the issues are resolved.

### Git tags

The git tags will contain the package name and version in the format of `<package_name>@<package_version>` to prevent collision between tags for different packages. The `<package_name>` is the `name` field in its `package.json` file, e.g. `@esri/calcite-components`. Each bumped package will have their own tag on the release commit. The tag format is Lerna's default, and how Lerna determines which commit to end at when generating changelog entries. The default tag format for `release-please` is different, but configurable. `release-please` looks for GitHub releases when determining the commit where the changelog entries should end.

### GitHub releases

`release-please` creates a GitHub release for each deployed package. Lerna's `version` command has a `--create-release` flag which creates GitHub releases, but Calcite is not using it to prevent confusing `release-please`.

### Changelog

Calcite uses the [conventional commits changelog format](https://github.com/conventional-changelog/conventional-changelog), which is the default for `release-please`. Lerna uses the `angular` format by default. Calcite configured Lerna to use the conventional commits [changelog preset](https://github.com/lerna/lerna/tree/main/libs/commands/version#--changelog-preset) so the formats match between tools.

Lerna generates a changelog section for each `next` version. Before `latest` releases, a script removes Lerna's `next` changelog sections, which are then replaced with a single `latest` section by `release-please`. This means edits to changelog entries under `next` headers will not automatically carry over to the upcoming `latest` release section.

#### Edit changelog entries

To update a changelog entry, you must:

1. Edit the entry in the `CHANGELOG.md` file and create a PR
2. If the entry was in a `next` version section, edit the `release-please` PR following their [documented steps](https://github.com/googleapis/release-please#how-can-i-fix-release-notes)

### CI

The release CI consists of three GitHub Actions and three scripts.

#### CI for next releases

`next` releases happen in the `deploy-next.yml` GitHub Action, which runs on pushes to `main`. The Action runs the `isNextDeployable.ts` script to determine whether any fixes, feats, or breaking changes were installed since the most recent [git tag](#git-tags) (aka release). If there are deployable changes, Lerna versions the relevant packages and generates the new changelog entries.

The `syncLinkedPackageVersions.ts` executes after Lerna versions the packages. The script makes sure CCR's (and potentially other packages in the future) semver version isn't greater or less than CC's version. CCR's version is bumped to CC's version if it is behind. If CCR's version is greater, `next` releases __for all packages__ will be blocked until CC's version catches up.

After versioning, a commit is created, which is tagged for each released package. [Lerna publishes to NPM in topological order](https://github.com/lerna/lerna/tree/main/libs/commands/publish#lifecycle-scripts), which ensures local dependencies are published before the packages that depend on them. Lastly, the commit and tags are pushed to `main`.

#### CI for latest releases

A `deploy-latest.yml` GitHub Action runs `release-please`, which creates the release PR and updates it when there are new deployable changes pushed to `main`. The PR contains the following changes:

- new [changelog](#changelog) section and entries
- version updates in `package.json` for the package itself and/or local dependencies which were updated
- version updates in `.release-please-manifest.json`
- version update in the CDN link in `packages/calcite-components/readme.md`

After installing the PR, the Action creates [git tags](#git-tags) and [GitHub releases](#github-releases) for each bumped package, and then deploys to NPM.

A `remove-next-changelog-entries.yml` GitHub Action runs the `removeNextChangelogEntries.ts` script every time `release-please` pushes changes to its branch. This ensures all `next` changelog sections created by Lerna are removed before a dev installs the PR.

### Steps to release

For the most part the releases are automated in the CI (see the sections above). However, there are a few manual steps, which are described in the [releasing documentation](/Releasing.md).
