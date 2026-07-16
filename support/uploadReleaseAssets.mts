import { exec } from "node:child_process";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

(async function (): Promise<void> {
  try {
    const execAsync = promisify(exec);

    // https://github.com/googleapis/release-please-action#outputs
    const releasedPackages = JSON.parse(process.argv[2]);

    if (!releasedPackages || !releasedPackages?.length) {
      throw new Error("Unable to parse the list of released packages");
    }

    for (const packagePath of releasedPackages) {
      const packageJson = JSON.parse(await readFile(resolve(packagePath, "package.json"), "utf8"));
      const packageName = packageJson?.name;
      const packageVersion = packageJson?.version;

      if (!packageName || !packageVersion) {
        console.warn(`Skipping "${packagePath}" because a package.json could not be found/parsed"`);
        continue;
      }

      const tagName = `${packageName}@${packageVersion}`;
      const assetName = `${packageName.replace("@", "").replace("/", "-")}-${packageVersion}.tgz`;

      await execAsync(`pnpm pack --filter ${packagePath} >/dev/null 2>&1`);
      await execAsync(`gh release upload ${tagName} ${assetName}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
