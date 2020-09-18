const pify = require("pify");
const gitSemverTags = require("git-semver-tags");
const childProcess = require("child_process");
const semver = require("semver");
const { argv } = require("yargs");

(async function () {
  const { next, standardVersionOptions: standardVersionOverrides = "" } = argv;

  const target = next ? "next" : "beta";
  const targetVersionPattern = new RegExp(`-${target}\\.\\d+$`);
  const semverTags = await pify(gitSemverTags)();

  // we keep track of `beta` and `next` releases since `standard-version` resets the version number when going in between
  // this should not be needed after v1.0.0 since there would no longer be a beta version to keep track of
  const targetDescendingOrderTags = semverTags.filter((tag) => targetVersionPattern.test(tag)).sort(semver.rcompare);
  const targetReleaseVersion = semver.inc(targetDescendingOrderTags[0], "prerelease", target);

  // using process to generate changelog (auto loads .versionrc.json)
  childProcess.execSync(
    `npx standard-version --no-verify --silent --release-as ${targetReleaseVersion} ${standardVersionOverrides}`,
    {
      stdio: "inherit"
    }
  );
})();
