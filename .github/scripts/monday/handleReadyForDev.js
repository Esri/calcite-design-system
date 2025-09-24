// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/**
 * When the "Ready for Dev" automation runs, it fires a trigger for this step.
 * This script clears the milestone through `handleMilestone` and updates all assignees.
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
  monday.addAllAssignees();
  await monday.commit();
};
