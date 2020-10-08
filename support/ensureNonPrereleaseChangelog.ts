const pify = require("pify");
const gitSemverTags = require("git-semver-tags");
const childProcess = require("child_process");
const { argv } = require("yargs");

(async function () {
  // we allow passing standard-version options through
  const { standardVersionOptions: standardVersionOverrides = "" } = argv;

  const previousReleasedTag = childProcess.execSync("git describe --abbrev=0 --tags", { encoding: "utf-8" }).trim();
  const prereleaseVersionPattern = /-next\.\d+$/;
  const previousReleaseIsPrerelease = prereleaseVersionPattern.test(previousReleasedTag);

  if (!previousReleaseIsPrerelease) {
    childProcess.execSync(
      `npx ts-node ./support/prepareVersionUpdate.ts --standard-version-options="${standardVersionOverrides}"`,
      {
        stdio: "inherit"
      }
    );
    process.exit();
  }

  const semverTags = await pify(gitSemverTags)();
  const indexOfNonNextTag = semverTags.findIndex((tag) => !prereleaseVersionPattern.test(tag));
  const nextTagsSinceLastRelease = semverTags.slice(0, indexOfNonNextTag);

  try {
    // delete prerelease tags locally, so they can be ignored when generating the changelog
    childProcess.execSync(`git tag --delete ${nextTagsSinceLastRelease.join(" ")}`);

    childProcess.execSync(
      `npx ts-node ./support/prepareVersionUpdate.ts --standard-version-options="${standardVersionOverrides}"`,
      {
        stdio: "inherit"
      }
    );
  } catch (error) {
    console.log("an error occurred when generating the changelog:", error);
  } finally {
    // restore deleted prerelease tags
    childProcess.execSync(`git fetch --tags --quiet`);
  }

  process.exit();
})();
