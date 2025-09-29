// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { issue } =
    /** @type {import('@octokit/webhooks-types').IssuesOpenedEvent | import('@octokit/webhooks-types').IssuesLabeledEvent}*/ (
      context.payload
    );
  const monday = Monday(issue);
  const { id, source } = await monday.getId();
  const createdId = await monday.createTask(id);

  if (source !== "body") {
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
