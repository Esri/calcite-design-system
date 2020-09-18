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
  const latestRelease = semverTags.find((tag) => !prereleaseVersionPattern.test(tag));
  const tempBranchName = "__temp-for-non-prerelease-changelog__";

  try {
    // create a temp branch from the previous release
    // with all commit messages without prerelease tags
    // to omit them from the changelog
    childProcess.execSync(`git stash push -m ${tempBranchName}`);
    childProcess.execSync(`git checkout -b ${tempBranchName} ${latestRelease} --quiet`);
    childProcess.execSync(`git cherry-pick ${latestRelease}..master`);

    const [firstStashEntry] = childProcess.execSync(`git stash list`, { encoding: "utf-8" }).split("\n");
    const hasOurStash = firstStashEntry.includes(tempBranchName);

    if (hasOurStash) {
      childProcess.execSync(`git stash pop`);
    }

    // create changelog from previous release and commit
    childProcess.execSync(
      `npx ts-node ./support/prepareVersionUpdate.ts --standard-version-options="--skip.tag ${standardVersionOverrides}"`,
      {
        stdio: "inherit"
      }
    );

    childProcess.execSync(`git checkout master --quiet`);
    childProcess.execSync(`git cherry-pick ${tempBranchName}`); // grab changelog commit

    // tag using latest package version
    childProcess.execSync(
      `npx ts-node ./support/prepareVersionUpdate.ts --standard-version-options="--skip.bump --skip-commit --skip.changelog ${standardVersionOverrides}"`,
      {
        stdio: "inherit"
      }
    );
  } catch (error) {
    console.log("an error occurred when generating the changelog:", error);
  }

  childProcess.execSync(`git checkout master --force --quiet`);
  childProcess.execSync(`git branch -D ${tempBranchName} --quiet`);

  process.exit();
})();
