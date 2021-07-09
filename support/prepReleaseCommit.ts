import type { Options } from "standard-version";

const childProcess = require("child_process");
const { promises: fs } = require("fs");
const gitSemverTags = require("git-semver-tags");
const { normalize } = require("path");
const pify = require("pify");
const prettier = require("prettier");
const semver = require("semver");
const standardVersion = require("standard-version");
const { argv } = require("yargs");

const exec = pify(childProcess.exec);
const header = `# Changelog\n\nThis document maintains a list of released versions and changes introduced by them.\nThis project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)\n`;
const unreleasedSectionTokenStart = "<!--@unreleased-section-start-->";
const unreleasedSectionTokenEnd = "<!--@unreleased-section-end-->";
const changelogPath = normalize(`${__dirname}/../CHANGELOG.md`);

(async function prepReleaseCommit(): Promise<void> {
  const { next } = argv;

  const previousReleasedTag = (await exec("git describe --abbrev=0 --tags", { encoding: "utf-8" })).trim();
  const prereleaseVersionPattern = /-next\.\d+$/;
  const previousReleaseIsPrerelease = prereleaseVersionPattern.test(previousReleasedTag);
  const semverTags = await pify(gitSemverTags)();

  // create options before temp-deleting (prerelease) tags to prevent standard-version's tagging getting out of sync
  const standardVersionOptions = await getStandardVersionOptions(next, semverTags);

  const logError = (error: Error): void =>
    console.error(`an error occurred generating the changelog for ${standardVersionOptions.releaseAs}`, error);

  if (!previousReleaseIsPrerelease) {
    try {
      await runStandardVersion(next, standardVersionOptions);
    } catch (error) {
      logError(error);
    }
    process.exit();
  }

  const indexOfNonNextTag = semverTags.findIndex((tag) => !prereleaseVersionPattern.test(tag));
  const nextTagsSinceLastRelease = semverTags.slice(0, indexOfNonNextTag);

  try {
    // delete prerelease tags locally, so they can be ignored when generating the changelog
    await exec(`git tag --delete ${nextTagsSinceLastRelease.join(" ")}`);

    await runStandardVersion(next, standardVersionOptions);
  } catch (error) {
    logError(error);
  } finally {
    // restore deleted prerelease tags
    await exec(`git fetch --tags`);
  }

  process.exit();
})();

async function getStandardVersionOptions(next: boolean, semverTags: string[]): Promise<Options> {
  const target = next ? "next" : "beta";
  const targetVersionPattern = new RegExp(`-${target}\\.\\d+$`);

  // we keep track of `beta` and `next` releases since `standard-version` resets the version number when going in between
  // this should not be needed after v1.0.0 since there would no longer be a beta version to keep track of
  const targetDescendingOrderTags = semverTags.filter((tag) => targetVersionPattern.test(tag)).sort(semver.rcompare);
  const targetReleaseVersion = semver.inc(targetDescendingOrderTags[0], "prerelease", target);

  const standardVersionOptions: Options = {
    commitAll: true,
    header,
    releaseAs: targetReleaseVersion,
    releaseCommitMessageFormat: "{{currentTag}} [skip ci]",
    silent: true
  };

  if (next) {
    // prerelease changelogs are updated in a separate method
    standardVersionOptions.skip = { changelog: true };
  }

  return standardVersionOptions;
}

async function runStandardVersion(next: boolean, standardVersionOptions: Options): Promise<void> {
  if (next) {
    await appendUnreleasedNotesToChangelog();
    await exec(`git add ${changelogPath}`);
  }

  await standardVersion(standardVersionOptions);
}

async function appendUnreleasedNotesToChangelog(): Promise<void> {
  let changelogContent: string = await fs.readFile(changelogPath, { encoding: "utf8" });

  const needsUnreleasedSectionTokens = !changelogContent.includes(unreleasedSectionTokenStart);

  if (needsUnreleasedSectionTokens) {
    changelogContent = changelogContent.replace(
      header,
      `${header}\n${unreleasedSectionTokenStart}${unreleasedSectionTokenEnd}\n`
    );
  }

  const unreleasedSectionPattern = new RegExp(
    `(${unreleasedSectionTokenStart})(.*)(${unreleasedSectionTokenEnd})`,
    "s"
  );
  const unreleasedSectionContent = await getUnreleasedChangelogContents();
  const unreleasedHeaderPattern = /## Unreleased \(\d{4}-\d{2}-\d{2}\)/;
  const hasUnreleasedContent = unreleasedSectionContent.replace(unreleasedHeaderPattern, "").trim().length > 0;

  if (hasUnreleasedContent) {
    changelogContent = changelogContent.replace(unreleasedSectionPattern, `$1\n${unreleasedSectionContent}\n$3`);
  }

  changelogContent = prettier.format(changelogContent, { parser: "markdown" });

  await fs.writeFile(changelogPath, changelogContent);
}

async function getUnreleasedChangelogContents(): Promise<string> {
  // invoking this way since we want the CLI module behavior, which doesn't provide a way to programmatically use it
  return (
    await exec(
      "npx conventional-changelog --release-count 1 --output-unreleased --preset conventionalcommits --context support/.unreleased-changelog-context.json",
      { encoding: "utf-8" }
    )
  ).trim();
}
