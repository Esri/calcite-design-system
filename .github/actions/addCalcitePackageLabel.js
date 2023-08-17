module.exports = async ({ github, context }) => {
  const {
    repo: { owner, repo },
    payload: {
      issue: { body, number: issue_number },
    },
  } = context;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  // NOTE: assumes all packages will be in the @esri NPM scope
  const packageRegex = /(?<=\[X\]\s@esri\/)[\w-]*$/gm;
  const packages = body.match(packageRegex) || [];

  for (const package of packages) {
    /** Creates a label if it does not exist */
    try {
      await github.rest.issues.getLabel({
        owner,
        repo,
        name: package,
      });
    } catch (e) {
      await github.rest.issues.createLabel({
        owner,
        repo,
        name: package,
        color: "BFBEAF",
        description: `Issues specific to the @esri/${package} package.`,
      });
    }

    /** add new package label */
    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [package],
    });
  }
};
