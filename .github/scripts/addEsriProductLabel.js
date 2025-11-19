// @ts-check
const { createLabelIfMissing } = require("./support/utils");
const {
  labels: { productColor },
} = require("./support/resources");

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

  const productRegex = /### Esri team(?:\r|\n)+(.+)$/m;
  const productRegexMatch = body.match(productRegex);
  const product = (productRegexMatch?.[1] || "").trim();

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

    await github.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: "issue-monday-sync.yml",
      ref: "dev",
      inputs: {
        issue_number: issue_number.toString(),
        event_type: "SyncActionChanges",
        label_name: product,
        label_color: productColor,
        label_action: "added",
      },
    });
  }
};
