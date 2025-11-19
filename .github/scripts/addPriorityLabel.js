// @ts-check
const { createLabelIfMissing } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Priority Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (
    context.payload
  );
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  const addPriorityRegex = /### Priority impact(?:\r|\n)+(.+)$/m;
  const addPriorityRegexMatch = body.match(addPriorityRegex);
  const addPriorityLabel = (addPriorityRegexMatch?.[1] || "").trim();

  if (addPriorityLabel === "N/A" || addPriorityLabel === "") {
    core.notice(`No priority impact listed on issue #${issue_number}`, logParams);
  } else {
    await createLabelIfMissing({
      github,
      context,
      label: addPriorityLabel,
      color: "bb7fe0",
      description: `User set priority status of ${addPriorityLabel}`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [addPriorityLabel],
    });

    await github.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: "issue-monday-sync.yml",
      ref: "dev",
      inputs: {
        issue_number: issue_number.toString(),
        event_type: "SyncActionChanges",
        label_name: addPriorityLabel,
        label_action: "added",
      },
    });
  }
};
