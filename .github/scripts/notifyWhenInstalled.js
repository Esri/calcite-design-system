// @ts-check
const {
  labels: { issueWorkflow },
} = require("./support/resources");
const { removeLabel } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const number = payload.issue.number;

  const { ISSUE_VERIFIERS } = process.env;

  const issueProps = {
    owner,
    repo,
    issue_number: number,
  };

  await removeLabel({ github, context, label: issueWorkflow.inDevelopment });

  // Add a "@" character to notify the user
  const verifiers = ISSUE_VERIFIERS?.split(",").map((v) => " @" + v.trim());

  await github.rest.issues.update({
    ...issueProps,
    assignees: [],
  });

  await github.rest.issues.createComment({
    ...issueProps,
    body: `Installed for verification:${verifiers}`,
  });

  await github.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: "issue-monday-sync.yml",
    ref: "dev",
    inputs: {
      issue_number: number.toString(),
      event_type: "SyncActionChanges",
      assignee_updated: true
    },
  });
};
