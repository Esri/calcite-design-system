(async function prepReleaseCommit(): Promise<void> {
  const childProcess = await import("child_process");
  const { promisify } = await import("util");
  const { promises: fs } = await import("fs");
  const { default: semver } = await import("semver");
  const { dirname, normalize } = await import("path");
  const prettier = await import("prettier");
  const { quote } = await import("shell-quote");
  const { fileURLToPath } = await import("url");
  const exec = promisify(childProcess.exec);

  const header = `# Changelog\n\nThis document maintains a list of released versions and changes introduced by them.\nThis project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)\n\n`;
  const unreleasedSectionTokenStart = "<!--@unreleased-section-start-->";
  const unreleasedSectionTokenEnd = "<!--@unreleased-section-end-->";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const changelogPath = quote([normalize(`${__dirname}/../CHANGELOG.md`)]);
  const readmePath = quote([normalize(`${__dirname}/../README.md`)]);
  const packagePath = quote([normalize(`${__dirname}/../package.json`)]);

  // git sanity checks to prevent unapproved changes from making it into a release
  if ((await exec("git rev-parse --abbrev-ref HEAD")).stdout.trim() !== "main") {
    throw new Error("The main branch must be checked out before releasing.");
  }
  if ((await exec("git rev-parse main")).stdout.trim() !== (await exec("git rev-parse origin/main")).stdout.trim()) {
    throw new Error("The main branch must be in sync with origin before releasing.");
  }

  // deepen the history when fetching tags due to shallow clone
  await exec("git fetch --deepen=250 --tags");

  const prereleaseVersionPattern = /-next\.\d+$/;

  const currentLatestVersion = (await exec("npm view @esri/calcite-design-tokens dist-tags.latest")).stdout.trim();
  const currentNextVersion = (await exec("npm view @esri/calcite-design-tokens dist-tags.next")).stdout.trim();
  const releaseVersion = JSON.parse(await fs.readFile(packagePath, "utf8"))?.version;
  const next = prereleaseVersionPattern.test(releaseVersion);

  if (
    !semver.valid(releaseVersion) ||
    (!next && semver.gte(currentLatestVersion, releaseVersion)) ||
    (next && semver.gte(currentNextVersion, releaseVersion))
  ) {
    throw new Error("Version was not incremented correctly");
  }

  const baseErrorMessage = "an error occurred generating the changelog";

  const changelogGenerationErrorMessage = `${baseErrorMessage} (releasing as: ${releaseVersion})`;

  try {
    if (next) {
      await appendUnreleasedNotesToChangelog();
    } else {
      await convertUnreleasedChangelogContent(releaseVersion);
      await updateReadmeCdnUrls(releaseVersion);
      await exec(`git add ${readmePath}`);
    }
    await exec(`git add ${changelogPath}`);
  } catch (error) {
    console.log(changelogGenerationErrorMessage);
    process.exitCode = 1;
  }

  async function convertUnreleasedChangelogContent(version: string): Promise<void> {
    const changelogContent: string = await fs.readFile(changelogPath, { encoding: "utf8" });
    const date = new Date();
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
    const versionHeader = `## [v${version}](https://github.com/Esri/calcite-design-tokens/compare/v${currentLatestVersion}...v${version}) (${adjustedDate})`;
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
    const baseCdnUrl = `https://cdn.jsdelivr.net/npm/@esri/calcite-design-tokens@${version}/dist/calcite/calcite.`;

    const readmeContent: string = await fs.readFile(readmePath, { encoding: "utf8" });
    const updatedReadmeContent = readmeContent
      .replace(scriptTagPattern, `$1${baseCdnUrl}esm.js$2`)
      .replace(linkTagPattern, `$1${baseCdnUrl}css$2`);

    await fs.writeFile(readmePath, updatedReadmeContent);
  }
})();
