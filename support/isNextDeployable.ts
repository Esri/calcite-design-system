/*
 * This script is meant to be run by a CI environment during the deploy phase.
 * It throws an error if there are not release-worthy (deployable) changes.
 *
 * Based on https://github.com/conventional-changelog/standard-version/issues/192#issuecomment-610494804
 */
(async function runner(): Promise<void> {
  const childProcess = await import("child_process");
  const { promisify } = await import("util");
  const exec = promisify(childProcess.exec);

  async function isNextDeployable(): Promise<void> {
    console.log("Determining @next deployability 🔍");

    if (!(await deployable(await mostRecentTag("HEAD")))) {
      throw new Error("No deployable changes since the previous release, skipping ⛔");
    }

    await runGit("checkout", "main", "--quiet");
    await runGit("fetch", "--tags", "--quiet");

    if (
      (await latestCommit("main")) != (await latestCommit("origin/main")) &&
      (await deployable("main", "origin/main"))
    ) {
      throw new Error("There is a more recent deployable install, aborting ⛔️");
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
    return (await exec(`git ${command} ${args.join(" ")}`, { encoding: "utf-8" })).stdout.trim();
  }

  try {
    await isNextDeployable();
  } catch (error) {
    console.log(
      `An error occurred during deployment ❌:
${error}`
    );
    process.exit(1);
  }
})();
