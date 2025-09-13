// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, changes } = /** @type {import('@octokit/webhooks-types').IssuesEditedEvent} */ (context.payload);
  assertRequired([changes?.title?.from]);

  const monday = Monday(issue);
  monday.setColumnValue(monday.columnIds.title, issue.title);
  await monday.commit();
};
