// @ts-check
const Monday = require("./support/monday.js");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesOpenedEvent | import('@octokit/webhooks-types').IssuesLabeledEvent}*/ (
      context.payload
    );
  const monday = Monday(issue);
  /** @type {string} - The ID of the item to sync with, if any */
  let syncId = "";
  /** @type {string|undefined} */
  let queryId = undefined;

  if (action === "labeled") {
    queryId = await monday.getId("query");
    if (queryId) {
      syncId = queryId;
    }
  }

  const id = await monday.createTask(syncId);

  if (id !== queryId) {
    // Add the Monday.com item ID to the issue body
    const updatedBody = monday.addSyncLine(id);
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
