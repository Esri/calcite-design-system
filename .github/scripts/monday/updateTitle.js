// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, changes } = /** @type {import('@octokit/webhooks-types').IssuesEditedEvent} */ (context.payload);

  if (!changes.title) {
    console.log("No title change detected in the payload.");
    process.exit(0);
  }

  const monday = Monday(issue);
  monday.setColumnValue(monday.columnIds.title, issue.title);
  await monday.commit();
};
