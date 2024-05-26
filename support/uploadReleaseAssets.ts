(async function (): Promise<void> {
  try {
    const childProcess = await import("child_process");
    const { promisify } = await import("util");
    const { promises: fs } = await import("fs");
    const { resolve } = await import("path");
    const exec = promisify(childProcess.exec);

    // https://github.com/googleapis/release-please-action#outputs
    const releasedPackages = JSON.parse(process.argv[2]);

    if (!releasedPackages || !releasedPackages?.length) {
      throw new Error("Unable to parse the list of released packages");
    }

    for (const packagePath of releasedPackages) {
      const packageJson = JSON.parse(await fs.readFile(resolve(packagePath, "package.json"), "utf8"));
      const distFiles = packageJson?.files;
      const packageName = packageJson?.name;

      if (!distFiles?.length) {
        console.warn("Skipping", packageName, "because it does not have the `files` field in its package.json");
        continue;
      }

      const packageVersion = packageJson?.version;
      const tagName = `${packageName}@${packageVersion}`;
      const assetName = `${packageName.replace("@", "").replace("/", "-")}-${packageVersion}.tgz`;

      await exec(`npm pack --workspace ${packagePath} >/dev/null 2>&1`);
      await exec(`gh release upload ${tagName} ${assetName}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
