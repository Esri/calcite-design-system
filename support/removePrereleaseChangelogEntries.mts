import { exec } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

(async function(): Promise<void> {
  try {
    const execAsync = promisify(exec);
    const prereleaseChangelogSectionPattern = /##\s\[?\d+\.\d+\.\d+-(next|hotfix|rc)\.\d+(.*?)\n(?=##\s)/gs;

    const changedFiles = (await execAsync("git diff --name-only origin/main")).stdout.trim();
    const changelogs = changedFiles
      .split("\n")
      .filter((file: string) => file.match("CHANGELOG.md"))
      .map((path) => path.replace("/calcite-", "/"));

    for (const changelog of changelogs) {
      const changelogPath = resolve(changelog);
      let changelogContent: string | undefined;
      try {
        changelogContent = await readFile(changelogPath, "utf8");
      } catch {
        // file does not exist, skip
        continue;
      }
      const updatedChangelogContent = changelogContent.replace(prereleaseChangelogSectionPattern, "");
      await writeFile(changelogPath, updatedChangelogContent);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
