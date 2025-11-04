// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/**
 * When another workflow emits the "NotifyWorkflow" event:
 * 1. Clears the milestone through `handleMilestone`
 * 2. Updates all assignees.
 * 3. If `added_label` is provided, adds that label.
 */
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const [issueNumber] = assertRequired([context.payload.inputs.issue_number]);

  const { data: issue } = await github.rest.issues.get({
    ...context.repo,
    issue_number: issueNumber,
  });

  const monday = Monday(issue);
  monday.handleMilestone();
  monday.handleAssignees();

  if (context.payload.inputs.added_label) {
    monday.addLabel(context.payload.inputs.added_label);
  }

  await monday.commit();
};
