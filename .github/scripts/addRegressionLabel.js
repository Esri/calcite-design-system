// @ts-check
const {
  labels: { bug },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, labels, number: issue_number },
  } = payload;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  // If bug label is not present, skip adding regression label.
  if (!labels?.some((label) => label.name === "bug")) {
    console.log("Issue does not have the 'bug' label, skipping regression label addition.");
    return;
  }

  const regressionRegex = /(?<=### Regression\?[\r\n|\r|\n]{2}).+$/m;
  const regressionRegexMatch = body.match(regressionRegex);
  const regressionVersion = (regressionRegexMatch?.[0] || "").trim();

  // If issue has "_No response_" under the regression section or regressionVersion is an empty string then log and exit, otherwise add regression label.
  if (regressionVersion === "_No response_" || regressionVersion === "") {
    console.log("No regression version provided, not adding regression label.");
  } else {
    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [bug.regression],
    });
  }
};
