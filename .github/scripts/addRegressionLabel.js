// @ts-check
const {
  labels: { bug },
} = require("./support/resources");

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

  const regressionRegex = /(?<=### Regression\?[\r\n|\r|\n]{2}).+$/m;
  const regressionRegexMatch = body.match(regressionRegex);

  // If issue has "_No response_" under the regression section then log and exit, otherwise add regression label.
  const regressionVersion = (regressionRegexMatch?.[0] || "").trim();

  if (regressionVersion === "_No response_") {
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
