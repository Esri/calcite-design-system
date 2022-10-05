/*
 * This script is meant to be run by a CI environment during the deploy phase.
 *
 * Based on https://github.com/conventional-changelog/standard-version/issues/192#issuecomment-610494804
 */
(async function runner(): Promise<void> {
  const childProcess = await import("child_process");
  const { promisify } = await import("util");
  const exec = promisify(childProcess.exec);

  async function deployNextFromCI(): Promise<void> {
    console.log("Deploying @next 🚧");

    // the setup-node gh action handles the token
    // https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-the-npm-registry

    console.log(" - prepping and building package...");
    await exec(`npm run util:prep-next`);

    const changesCommitted = (await exec(`git rev-parse HEAD`)) !== (await exec(`git rev-parse origin/master`));
    if (!changesCommitted) {
      throw new Error("Failed to commit changes");
    }

    // github token provided by the checkout action
    // https://github.com/actions/checkout#usage
    console.log(" - pushes tags and publishing @next...");
    await exec(`npm run util:publish-next`);

    console.log("@next deployed! 🚀");
  }

  try {
    await deployNextFromCI();
  } catch (error) {
    console.log(
      `An error occurred during deployment ❌:
${error}`
    );
    process.exit(1);
  }
})();
