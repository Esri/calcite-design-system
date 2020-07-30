const packageInfo = require("../package");
const releaseFromChangelog = require("github-release-from-cc-changelog");

releaseFromChangelog(`${__dirname}/../`, packageInfo.version)
  .then(() => console.info("Released on GitHub! 🎉"))
  .catch((error) => console.error("Could not create GitHub release", error));
