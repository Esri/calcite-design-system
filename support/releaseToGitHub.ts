import pify from "pify";

(async function () {
  const childProcess = await import("child_process");
  const { default: githubRelease } = await import("gh-release");
  const { default: rimraf } = await import("rimraf");

  const packageFileName = childProcess.execSync("npm pack", { encoding: "utf-8" }).trim();
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

  pify(githubRelease)(options)
    .then(() => console.info("Released on GitHub! 🎉"))
    .catch((error) => console.error("Could not create GitHub release", error))
    .then(() => rimraf.sync(packageFileName));
})();
