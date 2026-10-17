# GitHub Scripts

These scripts are called by [our workflows](../workflows) via the [`github-script`](https://github.com/actions/github-script) action, which unfortunately does not support TypeScript. When creating a new workflow that uses `github-script`, make sure to checkout the repo first so the script is accessible.

```yaml
- uses: actions/checkout@v3
- uses: actions/github-script@v6
  with:
    script: |
      const action = require('${{ github.workspace }}/.github/scripts/<SCRIPT NAME HERE>.cjs')
      await action({github, context, core})
```

The script should export an asynchronous default function:

```js
module.exports = async ({ github, context, core }) => {
  // CODE HERE
};
```

Look at the existing scripts for examples and check the [`octokit.js` documentation](https://octokit.github.io/rest.js/v20) for GitHub API details.

## Prerelease deployment

Use `Deploy Prerelease` on `dev` for `next`. Use it on `rc` for `rc`.
Pushes to `dev` start the workflow automatically. The `NEXT_RELEASE_ENABLED`
secret must be `true` to prepare a new `next` release.

### Prepare a candidate

The preparation job can be canceled. It checks the current remote branch.
It creates the version commit and annotated package tags locally. It builds,
tests, and packs only the public packages with new tags. It records the source
SHA, candidate SHA, versions, explicit tag objects, tag snapshot, and SHA-512
archive integrity values. It uploads these files and a Git bundle as one
immutable Actions artifact. Preparation does not push refs or publish packages.
The artifact expires after 90 days. Prepare again if an unused artifact expires.
Each preparation attempt uses a distinct artifact name. A failed-job rerun uses
the artifact name from its successful preparation job.

### Complete a release

The release job uses one shared lock for `next` and `rc`. A new workflow does
not cancel this job. Storybook uses a separate job and does not hold this lock.
It builds the completed `next` candidate commit after the release job ends.
This includes a completed recovery. A Storybook failure cannot interrupt npm
publication or the completion marker.

The release job checks the latest branch, remote tags, and release ledger.
It rejects stale candidates and requests preparation of the latest branch.
A Git race at the final write also requests preparation. A Git permission or
storage error stops without an automatic retry loop. No npm write is made
by this job if the atomic Git push fails or its response is lost.

The `prerelease-state` branch is the durable release ledger. The first release
creates it. One atomic, non-force Git push writes all of the following:

- The candidate commit to `dev` or `rc`.
- Only the explicit annotated package tags.
- A pending ledger commit with the manifest and exact packed archives.

The ledger uses an independent Git history. It has no Actions retention limit.
Each pending commit retains its archives in Git history, even after completion.
This increases repository size. Each archive must be less than 100 MiB.
Preparation stops if an archive exceeds that limit. Do not delete or rewrite
the ledger branch. Do not delete release tags.

After this push, the job inspects every candidate package on npm. Only an HTTP
404 means that a version is missing. Network and registry errors stop the job.
For an existing version, both its identity and SHA-512 integrity must match.
The job also downloads the npm tarball and verifies its bytes against the
archive in the ledger. It does not use a dist-tag as proof of publication.
The committed archive is the recovery provenance anchor. New publishes also
request npm's GitHub Actions provenance attestation.

The job publishes missing archives without rebuilding them. It reconciles
every `next` or `rc` dist-tag. It then makes a separate, non-force ledger push
with a completion marker. A failure before that marker leaves the release
pending. No new versions are allocated while a pending release exists.

### Resume or retry

1. Open the failed workflow and inspect the error.
2. Select **Run workflow** on `dev` or `rc`.
3. Select operation **resume** to complete the global pending release.
   Resume can complete either channel, regardless of the selected branch.
4. Select operation **release** to prepare the latest selected branch instead.
   This operation also resumes a pending release first.

A resume loads archives from the ledger, not from the expired Actions artifact.
It checks that the original tags still exist and that the candidate commit is
an ancestor of the current release branch. It verifies existing npm versions,
publishes only missing versions, repairs dist-tags, and retries the completion
marker. A lost npm response or a failed completion push does not cause a second
publish of an existing version.

After recovery, the job requests a fresh workflow if the selected branch differs
from the recovered branch or has new commits.
It also requests a fresh workflow when a merge arrives during publication.
The release version commit can itself start a `dev` workflow. This is safe:
that workflow resumes pending state or finds no deployable changes.
GitHub can replace a pending concurrency job. Each job that reaches the release
lock therefore checks freshness again.
If preparation found a pending release but another job completed it before
this job received the lock, a **release** operation requests fresh preparation.
It does not prepare again if the selected branch already matches the completed
candidate. A **resume** operation with no pending release makes no changes.

If integrity or Git refs do not match, stop. Inspect the ledger and registry.
Restore the original refs if necessary. Do not choose a new version to bypass
an incomplete release. This protocol cannot reconstruct archives for legacy
releases made before the ledger was installed.
Before the first deployment with this protocol, check the last legacy release.
Complete any missing packages and dist-tags with its original archives. Do not
start a new release if those archives are unavailable or their identity is
unknown.

### Repository requirements

- Allow the `ADMIN_TOKEN` actor to push normal updates to `dev`, `rc`, package
  tags, and `prerelease-state`. Support atomic pushes. Do not require a PR for
  the bot's release commit. A rejected push stops publication.
- Give `ADMIN_TOKEN` workflow-dispatch access. Bot-triggered workflows must run.
- Give `NPM_TOKEN` publish and dist-tag access for all public workspace packages.
  The release job also needs `id-token: write` for npm provenance.
- Use this workflow for all `next` and `rc` writes. Its lock does not serialize
  another workflow or a person's local publish command.
- Do not manually cancel the release job. A runner failure or manual
  cancellation can leave pending state. Use **resume** to recover it.
- Retain Git history for `prerelease-state`. Include this branch in backups.

Run the mock protocol tests with
`node --test .github/scripts/prerelease.test.mjs`.
The tests make no remote writes.
