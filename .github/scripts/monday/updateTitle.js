// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  const { issue, changes } =
    /** @type {import('@octokit/webhooks-types').IssuesEditedEvent} */ (
      context.payload
    );
  assertRequired([changes?.title?.from]);

  const monday = Monday(issue, core);
  monday.setColumnValue(monday.mondayColumns.title, issue.title, {
    title: "Update Title",
  });
  await monday.commit();
};
