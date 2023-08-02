(async function(): Promise<void> {
  try {
    const childProcess = await import("child_process");
    const { promisify } = await import("util");
    const { promises: fs } = await import("fs");
    const { resolve } = await import("path");
    const exec = promisify(childProcess.exec);

    const nextChangelogSectionPattern = /##\s\[?\d+\.\d+\.\d+-next\.\d+(.*?)\n(?=##\s)/gs;

    const changedFiles = (await exec("git diff --name-only origin/main")).stdout.trim();
    const changelogs = changedFiles.split("\n").filter((file: string) => file.match("CHANGELOG.md"));

    changelogs.forEach(async (changelog: string) => {
      const changelogPath = resolve(changelog);
      const changelogContent = await fs.readFile(changelogPath, "utf8");
      const updatedChangelogContent = changelogContent.replace(nextChangelogSectionPattern, "");
      await fs.writeFile(changelogPath, updatedChangelogContent);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
