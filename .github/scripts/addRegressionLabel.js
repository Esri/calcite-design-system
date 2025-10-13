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
  const regressionVersionResponse = (regressionRegexMatch?.[0] || "").trim();

  // If issue has "_No response_" under the regression section or regressionVersion is an empty string then log and exit, otherwise add regression label.
  if (regressionVersionResponse === "_No response_" || regressionVersionResponse === "") {
    console.log("No regression version provided, not adding regression label.");
    return;
  }

  // Match x.y.z with an optional prerelease extension of "-next.N".
  // Example matches: 1.0.0, v1.0.0, 1.0.0-next.13, Yes was working v1.2.3-next.4, please fix!
  const semVerRegex = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-next\.(?:0|[1-9]\d*))?\b/i;

  const containsValidVersion = semVerRegex.test(regressionVersionResponse);
  if (!containsValidVersion) {
    console.log("No valid version (e.g., 1.0.0 or 1.0.0-next.13) found, not adding regression label.");
    return;
  }
};
