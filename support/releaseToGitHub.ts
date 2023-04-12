import rimraf from "rimraf";

(async function () {
  const childProcess = await import("child_process");
  const { promisify } = await import("util");
  const { default: githubRelease } = await import("gh-release");
  const exec = promisify(childProcess.exec);

  const packageFileName = (await exec("npm pack", { encoding: "utf-8" })).stdout.trim();
  const packageScope = "esri-";

  const options = {
    assets: [
      {
        name: packageFileName.replace(packageScope, ""),
        path: packageFileName
      }
    ],
    auth: {
      token: process.env.GH_RELEASE_GITHUB_API_TOKEN
    },
    yes: true // skips prompt
  };

  promisify(githubRelease)(options)
    .then(() => console.info("Released on GitHub! 🎉"))
    .catch((error) => console.error("Could not create GitHub release", error))
    .then(() => rimraf.sync(packageFileName));
})();
