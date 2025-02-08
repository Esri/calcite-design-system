# Releasing

To release, you must have Admin privilege for the [Calcite Design System](https://github.com/Esri/calcite-design-system) repository.

## major/minor/patch releases

When performing a scheduled release, first check in with Franco (or Matt if Franco isn't available) and Kitty to see if there are any pull requests that need to be merged before releasing. Once they say we are ready for release, follow the steps below. If you run into errors or other issues during the release steps, you can reach out to Ben for help (or Franco if Ben isn't available).

### Prevent merging pull requests

When releasing during normal work hours, you should block people from merging PRs while you're releasing. To "block" PRs do the following (requires admin privilege):

1. Let the team know via Teams in the `Core - Releases` 🔒 channel (@ the channel for visibility)
1. Go to the repo settings -> "Branches"
1. Under "Branch protection rules" edit the entry for `dev`
1. Under "Require approvals" change the number from 1 to 6 and save the changes.

   ![image](https://user-images.githubusercontent.com/10986395/167955616-c796d1ff-5c1a-4332-a6d5-5288f9d20992.png)

### Release steps

Follow these steps to release a major, minor, or patch version:

1. Follow the steps above to [prevent merging pull requests](#prevent-merging-pull-requests).
1. Sync the changes from `dev` to `main` by dispatching the "Deploy Latest" workflow following [GitHub's documentation](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow), or using `gh`:

   ```sh
   gh workflow run deploy-latest.yml
   ```

1. Wait for the [Deploy Latest](https://github.com/Esri/calcite-design-system/actions/workflows/deploy-latest.yml) workflow run on `main` to complete.
1. Review the PR created by `release-please` (titled `chore: release main`) to make sure the changelog(s) and package versioning looks correct.
   - There should be a commit on the PR's branch named `docs: remove prerelease changelog entries` that occurred **after** the most recent commit on `main`.
1. Approve and install the PR. You will need to use Admin privilege to override the 6 approval rule.
1. Wait for the release's [Deploy Latest](https://github.com/Esri/calcite-design-system/actions/workflows/deploy-latest.yml) workflow run to finish.
1. Ensure the released package(s) were deployed to NPM and that [GitHub Releases were created](https://github.com/Esri/calcite-design-system/releases).

   - You can check the NPM version(s) on the website (e.g., [calcite-components](https://www.npmjs.com/package/@esri/calcite-components?activeTab=versions)) or with the CLI:

   ```sh
   npm view @esri/calcite-components version
   ```

1. See the [troubleshooting](#troubleshooting) section if something went wrong, or reach out to Ben or Franco for help.
1. A pull request should have been created that cherry-picks the release commit from `main` to `dev`. Review and install the PR using admin privilege.
1. Change the `dev` branch's required approvals back to 1 and save the changes (see the [Prevent merging PRs](#prevent-merging-pull-requests) section)
1. Let the team know via Teams merging is now unblocked in the initial `Core - Releases` message from earlier.

### Troubleshooting

The following are some troubleshooting steps you can take if a release is unsuccessful.

1. Find the workflow run for the release [here](https://github.com/Esri/calcite-design-system/actions/workflows/deploy-latest.yml), and view the logs to find the error message.
1. Fix the error:
   - In some cases you can resolve the issue with a temporary solution, and then fix the CI after the release is completed. Reach out to Ben or Franco if a solution to the error isn't clear.
   - If the `dev`->`main` sync failed, you may have to resolve merge conflicts locally. See the "Sync dev to main" step in the `deploy-latest.yml` workflow for the process.
   - If the release succeeded, but the cherry-pick PR wasn't created, you may need to fix merge conflicts locally.
1. Once the PR with the fix is installed, make sure the new workflow run is passing.
1. **IMPORTANT:** If the new release is showing up in the [GitHub releases](https://github.com/Esri/calcite-design-system/releases) but not on NPM, you'll need to release locally. This signifies the error involved publishing to NPM, which happens after the releases and tags are created on GitHub. To release locally, run the following commands:

```sh
git fetch && git checkout origin/main && npm install && npm run build && npm test && npm run publish:latest
```

### Bumping the examples

A [GitHub Action](https://github.com/Esri/calcite-components-examples/blob/master/.github/workflows/bump-examples.yml) will automatically bump the versions in [`calcite-components-examples`](https://github.com/Esri/calcite-components-examples) and open a PR on Wednesday night after the release. Make sure to test the samples when there are major changes. [Here](https://github.com/Esri/calcite-components-examples/blob/master/.github/scripts/bump-examples.js) is the script if any changes are needed.

## next releases

`next` releases are useful for testing incoming changes between releases. They are [released by the CI](./monorepo.md#ci-for-next-releases) after 'deployable' commits are installed to `dev`. A deployable commit is:

1. a commit of type `feat` or `fix`
1. a commit that introduces a breaking change

If you need to disable `next` releases, you can do so by setting the `NEXT_RELEASE_ENABLED` GitHub Secret to anything but `true`. If you need to manually release `next`, you can run the following commands from the monorepo's root directory:

```sh
# make sure you don't have any unsaved work
git checkout dev
npm run clean
npm install
npm test
npm run version:next
# verify the changelog and package versions look correct
npm run publish:next
npm run util:push-tags
```

**IMPORTANT:** If you need to change anything after running `version:next` (e.g., a changelog entry), make sure to amend the previous commit and recreate all of the tags using the new SHA (or `HEAD`) before continuing. For example:

```sh
# manual changelog entry updates were required after versioning...
git add packages/*/CHANGELOG.md
git commit amend --no-edit
git tag -d "@esri/calcite-components@1.2.3"
git tag -d "@esri/calcite-components-react@1.2.3"
git tag -a "@esri/calcite-components@1.2.3" -m "@esri/calcite-components@1.2.3" HEAD
git tag -a "@esri/calcite-components-react@1.2.3" -m "@esri/calcite-components-react@1.2.3" HEAD
# now you can publish and push tags
```

## Maintenance releases for regressions and low risk PRs

The following are best practices for limiting regressions and releasing maintenance patches when necessary.

### Prior to release

- When installing big items, author(s) should:
  - Let either Kitty, Brittney, and/or Franco know of the proposed changes in advance so they can keep [key stakeholders](https://confluencewikidev.esri.com/display/Calcite/Calcite+Stakeholders) in the loop of the changes.
  - Post in the internal channel (Core - Releases 🔒) and public channel ([Announcements and Releases](https://teams.microsoft.com/l/channel/19%3aa47484dba35c4e4e859b0857f4d103db%40thread.skype/Announcements%2520and%2520Releases?groupId=56fae21a-9407-4943-859f-a9bfcf0bbad3&tenantId=aee6e3c9-711e-4c7c-bd27-04f2307db20d)) to keep an eye out for issues related to the changes. This should happen after the item's PR is merged and `next` is deployed so users can start testing early.

### Scheduling

- The soonest a maintenance release can occur after a release should be coordinated with Kitty, Brittney, and Franco. A timeline and coordination helps to ensure stability, while also allowing enough time for users to find any other regressions so that we don't need to release multiple maintenance releases.
- Once we decide a maintenance release is needed, notify the public channel ([Calcite Components](https://teams.microsoft.com/l/channel/19%3afd15b51dacd24e70895ec1218a54ae06%40thread.skype/Calcite%2520Components?groupId=56fae21a-9407-4943-859f-a9bfcf0bbad3&tenantId=aee6e3c9-711e-4c7c-bd27-04f2307db20d)) about the known issues and plans for an incoming maintenance release.
- Inform the team in the internal release channel to hold off on risky installs, revert any that landed, and to (re)install after the patch.
  - After a maintenance release we should hold off on risky installs 24 hours to ensure stability if another maintenance release is necessary.
- Check-in daily with the team in the internal release channel about known issues, reported regressions, and fix statuses.
- Remind the team two days before and the day of the scheduled maintenance release to make sure everything is included.
