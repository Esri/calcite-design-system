(async function (): Promise<void> {
  try {
    const childProcess = await import("child_process");
    const { promisify } = await import("util");
    const { promises: fs } = await import("fs");
    const { default: semver } = await import("semver");
    const { resolve } = await import("path");
    const exec = promisify(childProcess.exec);

    // TRACKING packages will be bumped to HEAD's version if they fall behind
    const LINKED_VERSIONS_HEAD_PACKAGE = "@esri/calcite-components";

    // next releases will be blocked if HEAD's version is less than a TRACKING package's version
    const LINKED_VERSIONS_TRACKING_PACKAGES = ["@esri/calcite-components-react", "@esri/calcite-design-tokens"];

    interface PackageData {
      name: string;
      version: string;
      private: boolean;
      location: string;
    }

    const packagesData: Array<PackageData> = JSON.parse((await exec("npx lerna ls --json")).stdout.trim());
    const headPackageData = packagesData.find((data: PackageData) => data.name === LINKED_VERSIONS_HEAD_PACKAGE);

    if (!headPackageData) {
      throw new Error(`Unable to find data for the HEAD linked package: ${LINKED_VERSIONS_HEAD_PACKAGE}`);
    }

    LINKED_VERSIONS_TRACKING_PACKAGES.forEach(async (pkg) => {
      const trackingPackageData = packagesData.find((data: PackageData) => data.name === pkg);

      if (!trackingPackageData) {
        throw new Error(`Unable to find data for a TRACKING linked package: ${pkg}`);
      } else if (semver.gt(trackingPackageData.version, headPackageData.version)) {
        /*
         * NOTE: this blocks next releases for ALL packages and may require a refactor in
         * the future if a TRACKING linked package with frequent deployable changes is added.
         */
        throw new Error(
          `A TRACKING linked package's version (${trackingPackageData.name}@${trackingPackageData.version}) cannot be greater than the HEAD linked package's version (${headPackageData.name}@${headPackageData.version}). Blocking next releases until HEAD catches up.`
        );
      } else if (semver.gt(headPackageData.version, trackingPackageData.version)) {
        console.log(
          "Bumping",
          trackingPackageData.name,
          "from",
          trackingPackageData.version,
          "to",
          headPackageData.version
        );

        // update to HEAD version in package.json and package-lock.json
        await exec(`npm version ${headPackageData.version} --git-tag-version=false --workspace=${pkg}`);

        // update version in changelog
        const packageChangelogPath = resolve(trackingPackageData.location, "CHANGELOG.md");
        const packageChangelogContent = await fs.readFile(packageChangelogPath, "utf8");

        const updatedChangelogContent = packageChangelogContent
          /*
           * NOTE: the first replace is required for new packages because the
           * initial changelog version header doesn't have a github link
           * comparing the new version to the (nonexistent) previous one.
           */
          .replace(`## ${trackingPackageData.version}`, `## ${headPackageData.version}`)
          .replace(`## [${trackingPackageData.version}]`, `## [${headPackageData.version}]`)
          .replace(
            `...${trackingPackageData.name}@${trackingPackageData.version}`,
            `...${trackingPackageData.name}@${headPackageData.version}`
          );

        await fs.writeFile(packageChangelogPath, updatedChangelogContent);
      }

      // get updated data for deployable packages
      const changedPackagesData: Array<PackageData> = JSON.parse(
        (await exec("npx lerna changed --json")).stdout.trim()
      );
      console.log("Deployable packages:", changedPackagesData);

      // add/commit changed files
      await exec("git commit -am 'chore: release next'");

      // create git tags with the updated versions
      changedPackagesData.forEach(async (pkg: PackageData) => {
        await exec(`git tag -a "${pkg.name}@${pkg.version}" HEAD -m "${pkg.name}@${pkg.version}"`);
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
