// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesOpenedEvent | import('@octokit/webhooks-types').IssuesLabeledEvent}*/ (
      context.payload
    );
  const monday = Monday(issue);
  const labeledId = action === "labeled" ? await monday.getId("query") : undefined;
  const createdId = await monday.createTask(labeledId);

  if (createdId !== labeledId) {
    const updatedBody = monday.addSyncLine(createdId);
    try {
      await github.rest.issues.update({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        body: updatedBody,
      });
    } catch (error) {
      throw new Error(`Error adding ID to body: ${error}`);
    }
  }
};
