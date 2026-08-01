// @ts-check
const {
  labels: { bug },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Regression Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, labels, number: issue_number },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  // If bug label is not present, skip adding regression label.
  if (!labels?.some((label) => label.name === "bug")) {
    core.notice("Issue does not have the 'bug' label, skipping regression label addition.", logParams);
    return;
  }

  const regressionRegex = /### Regression\?(?:\r|\n)+(.+)$/m;
  const regressionRegexMatch = body.match(regressionRegex);
  const regressionVersionResponse = (regressionRegexMatch?.[1] || "").trim();

  // If issue has "_No response_" under the regression section or regressionVersion is an empty string then log and exit, otherwise add regression label.
  if (regressionVersionResponse === "_No response_" || regressionVersionResponse === "") {
    core.notice("No regression version provided, not adding regression label.", logParams);
    return;
  }

  // Match x.y.z with an optional prerelease extension of "-next.N".
  // Example matches: 1.0.0, v1.0.0, 1.0.0-next.13, Yes was working v1.2.3-next.4, please fix!
  const semVerRegex = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-next\.(?:0|[1-9]\d*))?\b/i;

  const containsValidVersion = semVerRegex.test(regressionVersionResponse);
  if (!containsValidVersion) {
    core.notice("No valid version (e.g., 1.0.0 or 1.0.0-next.13) found, not adding regression label.", logParams);
    return;
  }

  // Found a version; add the regression label.
  await github.rest.issues.addLabels({
    issue_number,
    owner,
    repo,
    labels: [bug.regression],
  });

  await github.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: "issue-monday-sync.yml",
    ref: "dev",
    inputs: {
      issue_number: issue_number.toString(),
      event_type: "SyncActionChanges",
      label_name: bug.regression,
      label_action: "added",
    },
  });
};
