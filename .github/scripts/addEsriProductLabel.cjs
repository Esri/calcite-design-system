// @ts-check
const { createLabelIfMissing, getIssueFormResponse, syncAddedLabelWithMonday } = require("./support/utils.cjs");
const {
  labels: { productColor },
} = require("./support/resources.cjs");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Esri Product Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  const product = getIssueFormResponse(body, "Esri team");

  // If issue includes "Esri team" line then create label, otherwise log message.
  if (product === "" || product === "N/A") {
    core.notice(`No Esri team listed on issue #${issue_number}`, logParams);
  } else {
    await createLabelIfMissing({
      github,
      context,
      label: product,
      color: productColor,
      description: `Issues logged by ${product} team members.`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [product],
    });

    await syncAddedLabelWithMonday({
      github,
      context,
      issueNumber: issue_number,
      label: product,
      color: productColor,
    });
  }
};
