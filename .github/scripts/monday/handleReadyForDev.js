// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/**
 * When the "Ready for Dev" automation runs, it fires a trigger for this step.
 * This script adds the provided "label_name" (should always be "needs milestone"),
 * clears the milestone through `handleMilestone`, and updates all assignees.
 */
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const [issueNumber, labelName] = assertRequired([
    context.payload.inputs.issue_number,
    context.payload.inputs.label_name,
  ]);

  const { data: issue } = await github.rest.issues.get({
    ...context.repo,
    issue_number: issueNumber,
  });

  const monday = Monday(issue);
  monday.addLabel(labelName);
  monday.handleMilestone();
  monday.addAllAssignees();
  await monday.commit();
};
