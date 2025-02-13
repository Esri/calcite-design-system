// @ts-check
const { createLabelIfMissing } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  // NOTE: assumes all packages will be in the @esri NPM scope
  const packageRegex = /(?<=\[X\]\s@esri\/)[\w-]*$/gm;
  const packages = body.match(packageRegex) || [];

  for (const package of packages) {
    await createLabelIfMissing({
      github,
      context,
      label: package,
      // eslint-disable-next-line @cspell/spellchecker -- hex color
      color: "BFBEAF",
      description: `Issues specific to the @esri/${package} package.`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [package],
    });
  }
};
