import type { Options } from "standard-version";
import yargs from "yargs";

(async function prepReleaseCommit(): Promise<void> {
  const childProcess = await import("child_process");
  const { promisify } = await import("util");
  const { promises: fs } = await import("fs");
  const { default: gitSemverTags } = await import("git-semver-tags");
  const { dirname, normalize } = await import("path");
  const prettier = await import("prettier");
  const { default: semver } = await import("semver");
  const { quote } = await import("shell-quote");
  const { default: standardVersion } = await import("standard-version");
  const { fileURLToPath } = await import("url");
  const exec = promisify(childProcess.exec);

  const header = `# Changelog\n\nThis document maintains a list of released versions and changes introduced by them.\nThis project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)\n`;
  const unreleasedSectionTokenStart = "<!--@unreleased-section-start-->";
  const unreleasedSectionTokenEnd = "<!--@unreleased-section-end-->";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const changelogPath = quote([normalize(`${__dirname}/../CHANGELOG.md`)]);
  const readmePath = quote([normalize(`${__dirname}/../readme.md`)]);

  // git sanity checks to prevent unapproved changes from making it into a release
  if ((await exec("git rev-parse --abbrev-ref HEAD")).stdout.trim() !== "master") {
    throw new Error("The master branch must be checked out before releasing.");
  }
  if (
    (await exec("git rev-parse master")).stdout.trim() !== (await exec("git rev-parse origin/master")).stdout.trim()
  ) {
    throw new Error("The master branch must be in sync with origin before releasing.");
  }
  if ((await exec("git status --porcelain=v1")).stdout.trim()) {
    throw new Error("There cannot be any uncommitted changes before releasing.");
  }

  const { next } = yargs(process.argv.slice(2))
    .options({ next: { type: "boolean", default: false } })
    .parseSync();

  // deepen the history when fetching tags due to shallow clone
  await exec("git fetch --deepen=250 --tags");

  const prereleaseVersionPattern = /-next\.\d+$/;
  const semverTags = await promisify(gitSemverTags)();
  const lastNonNextTag = semverTags.find((tag) => !prereleaseVersionPattern.test(tag));
  let standardVersionOptions: Options;

  const baseErrorMessage = "an error occurred generating the changelog";

  try {
    standardVersionOptions = await getStandardVersionOptions(next, semverTags);
  } catch (error) {
    console.log(baseErrorMessage);
    process.exitCode = 1;
    return;
  }

  const changelogGenerationErrorMessage = `${baseErrorMessage} (releasing as: ${standardVersionOptions.releaseAs})`;

  try {
    await runStandardVersion(next, standardVersionOptions);
  } catch (error) {
    console.log(changelogGenerationErrorMessage);
    process.exitCode = 1;
  }

  async function getStandardVersionOptions(next: boolean, semverTags: string[]): Promise<Options> {
    const target = next ? "next" : "beta";
    const targetVersionPattern = new RegExp(`-${target}\\.\\d+$`);

    // we keep track of `beta` and `next` releases since `standard-version` resets the version number when going in between
    // this should not be needed after v1.0.0 since there would no longer be a beta version to keep track of
    const targetDescendingOrderTags = semverTags.filter((tag) => targetVersionPattern.test(tag)).sort(semver.rcompare);
    const targetReleaseVersion = semver.inc(targetDescendingOrderTags[0], "prerelease", target);

    if (!targetReleaseVersion) {
      throw new Error("an error occurred determining the target release version");
    }

    if (!targetVersionPattern.test(targetReleaseVersion)) {
      throw new Error(`target release version does not have prerelease identifier (${target})`);
    }

    const standardVersionOptions: Options = {
      commitAll: true,
      noVerify: true,
      header,
      releaseAs: targetReleaseVersion,
      releaseCommitMessageFormat: "{{currentTag}}",
      skip: { changelog: true }
    };

    return standardVersionOptions;
  }

  async function runStandardVersion(next: boolean, standardVersionOptions: Options): Promise<void> {
    if (next) {
      await appendUnreleasedNotesToChangelog();
    } else {
      if (!standardVersionOptions.releaseAs) {
        throw new Error("an error occurred determining the target release version");
      }
      await convertUnreleasedChangelogContent(standardVersionOptions.releaseAs);
      await updateReadmeCdnUrls(standardVersionOptions.releaseAs);
      await exec(`git add ${readmePath}`);
    }
    await exec(`git add ${changelogPath}`);
    await standardVersion(standardVersionOptions);
  }

  async function convertUnreleasedChangelogContent(releaseVersion: string): Promise<void> {
    const changelogContent: string = await fs.readFile(changelogPath, { encoding: "utf8" });
    const date = new Date();
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
    const versionHeader = `## [${releaseVersion}](https://github.com/Esri/calcite-components/compare/${lastNonNextTag}...${releaseVersion}) (${adjustedDate})`;
    const unreleasedSectionPatternStart = new RegExp(`${unreleasedSectionTokenStart}.*## Unreleased`, "s");
    const updatedChangelogContent = `${header}${versionHeader}\n${changelogContent
      .replace(header, "")
      .replace(unreleasedSectionPatternStart, "")
      .replace(unreleasedSectionTokenEnd, "")}`;
    await fs.writeFile(changelogPath, updatedChangelogContent);
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
      const getChangelogSection = (changes: string, startPattern: string, endPattern: string): string => {
        if (!startPattern || !endPattern || !changes) {
          return "";
        }
        const match = changes.match(new RegExp(`${startPattern}(.*?)${endPattern}`, "s"));
        return match && match.length > 1 ? match[1] : "";
      };

      const combineUnreleasedChangelogContent = (existingChanges: string, newChanges: string): string =>
        ["### ⚠ BREAKING CHANGES", "### Features", "### Bug Fixes", "### Reverts"]
          .map((sectionHeader) => {
            const newSection = getChangelogSection(newChanges, sectionHeader, "##");
            const existingSection = getChangelogSection(existingChanges, sectionHeader, "##");
            return `${newSection || existingSection ? sectionHeader : ""}\n${newSection}\n${existingSection}`;
          })
          .join("");

      const existingUnreleasedSectionContent = getChangelogSection(
        changelogContent,
        unreleasedSectionTokenStart,
        unreleasedSectionTokenEnd
      );
      const combinedUnreleasedContent = combineUnreleasedChangelogContent(
        // append the endPattern used for determining sections
        `${existingUnreleasedSectionContent}\n##`,
        `${unreleasedSectionContent}\n##`
      );

      changelogContent = changelogContent.replace(
        unreleasedSectionPattern,
        `$1\n## Unreleased\n${combinedUnreleasedContent}\n$3`
      );
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
    ).stdout.trim();
  }

  async function updateReadmeCdnUrls(version: string): Promise<void> {
    const scriptTagPattern = /(<script\s+type="module"\s+src=").+("\s*><\/script>)/m;
    const linkTagPattern = /(<link\s+rel="stylesheet"\s+type="text\/css"\s+href=").+("\s*\/>)/m;
    const baseCdnUrl = `https://unpkg.com/@esri/calcite-components@${version}/dist/calcite/calcite.`;

    const readmeContent: string = await fs.readFile(readmePath, { encoding: "utf8" });
    const updatedReadmeContent = readmeContent
      .replace(scriptTagPattern, `$1${baseCdnUrl}esm.js$2`)
      .replace(linkTagPattern, `$1${baseCdnUrl}css$2`);

    await fs.writeFile(readmePath, updatedReadmeContent);
  }
})();
