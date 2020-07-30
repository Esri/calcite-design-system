const pify = require("pify");
const gitSemverTags = require("git-semver-tags");
const childProcess = require("child_process");

(async function () {
  // this command will pass through standard-version args
  const standardVersionOverrides = process.argv.slice(2).join(" ");

  const previousReleasedTag = childProcess.execSync("git describe --abbrev=0", { encoding: "utf-8" }).trim();
  const prereleaseVersionPattern = /-beta\.\d+$/;
  const previousReleaseIsPrerelease = prereleaseVersionPattern.test(previousReleasedTag);

  if (!previousReleaseIsPrerelease) {
    // using process to generate changelog (auto loads .versionrc.json)
    childProcess.execSync(`npx standard-version ${standardVersionOverrides}`, { stdio: "inherit" });
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

    // using process to generate changelog (auto loads .versionrc.json)
    childProcess.execSync(`npx standard-version ${standardVersionOverrides}`, { stdio: "inherit" });
  } catch (error) {
    console.log("an error occurred when generating the changelog:", error);
  }

  childProcess.execSync(`git checkout master --quiet`);
  childProcess.execSync(`git branch -D ${tempBranchName}`);

  process.exit();
})();
