import pify from "pify";

/*
 * This script is meant to be run by a CI environment during the deploy phase.
 * It checks if there are release-worthy (deployable) changes and will publish to NPM when applicable.
 *
 * Based on https://github.com/conventional-changelog/standard-version/issues/192#issuecomment-610494804
 */
(async function runner(): Promise<void> {
  const childProcess = await import("child_process");
  const exec = pify(childProcess.exec);

  async function deployNextFromCI(): Promise<void> {
    console.log("Determining @next deployability 🔍");

    if (!(await deployable(await mostRecentTag("HEAD")))) {
      console.log("No changes since the previous release, skipping ⛔");
      return;
    }

    await runGit("checkout", "master", "--quiet");
    await runGit("fetch", "--tags", "--quiet");

    if (
      (await latestCommit("master")) != (await latestCommit("origin/master")) &&
      (await deployable("master", "origin/master"))
    ) {
      console.log("There is a more recent deployable install, aborting ⛔️");
    } else {
      console.log("Deploying @next 🚧");

      console.log(" - adding user details...");

      await exec(`git config --global user.email "github-actions[bot]@users.noreply.github.com"`);
      await exec(`git config --global user.name "github-actions[bot]"`);

      // the setup-node gh action handles the token
      // https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-the-npm-registry

      console.log(" - prepping and building package...");
      await exec(`npm run util:prep-next`);

      const changesCommitted = (await exec(`git rev-parse HEAD`)) !== (await exec(`git rev-parse origin/master`));
      if (!changesCommitted) {
        console.log("an error occurred committing changes");
        process.exitCode = 1;
      }

      await exec(`git log --pretty=format:'%h : %s' --graph`);

      // github token provided by the checkout action
      // https://github.com/actions/checkout#usage
      console.log(" - pushing tags...");
      await exec(`git push --atomic --follow-tags origin master`);

      const changesPushed = (await exec(`git rev-parse HEAD`)) === (await exec(`git rev-parse origin/master`));
      if (!changesPushed) {
        console.log("an error occurred pushing changes");
        process.exitCode = 1;
      }

      console.log(" - publishing @next...");
      await exec(`npm run util:publish-next`);

      console.log("@next deployed! 🚀");
    }
  }

  /**
   * Determines if the changes between from and to refs are deployable.
   *
   * Deployable scenarios:
   *
   * 1. there is a feat or fix type commit in the ref range
   * 2. there is a commit type that introduced a breaking change
   *
   * @param fromRef
   * @param toRef
   */
  async function deployable(fromRef = "HEAD", toRef = "HEAD"): Promise<boolean> {
    const subjectLog = await runGit("log", `${fromRef}..${toRef} --format='%s'`);
    const bodyLog = await runGit("log", `${fromRef}..${toRef} --format='%b'`);

    const deployableCommitTypeHeaderPattern = /^(feat|fix)(\(.*\))?:.+$/im;
    const breakingChangesCommitTypeHeaderPattern = /^(.+)(\(.*\))?\!:.+$/im;
    const breakingChangesCommitFooterPattern = /^BREAKING CHANGE:/i;

    return (
      deployableCommitTypeHeaderPattern.test(subjectLog) ||
      breakingChangesCommitTypeHeaderPattern.test(subjectLog) ||
      breakingChangesCommitFooterPattern.test(bodyLog)
    );
  }

  async function latestCommit(branch: string): Promise<string> {
    return runGit("rev-parse", branch);
  }

  async function mostRecentTag(branch: string): Promise<string> {
    return runGit("describe", "--tags", `--abbrev=0 ${branch}`);
  }

  async function runGit(command: string, ...args: string[]): Promise<string> {
    return (await exec(`git ${command} ${args.join(" ")}`, { encoding: "utf-8" })).trim();
  }

  try {
    await deployNextFromCI();
  } catch (error) {
    console.log(
      `An error occurred during deployment ❌:
${error}`
    );
  }
})();
