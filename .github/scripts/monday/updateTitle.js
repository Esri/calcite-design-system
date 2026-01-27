// @ts-check
const Monday = require("../support/monday");
const { assertRequired, createUpdateBodyCallback } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue, changes } =
    /** @type {import('@octokit/webhooks-types').IssuesEditedEvent} */ (
      context.payload
    );
  assertRequired([changes?.title?.from], core, "Title unedited: no previous title found in payload.");

  const monday = Monday(issue, core, createUpdateBodyCallback({ github, context, core }));
  monday.setColumnValue(monday.mondayColumns.title, issue.title, {
    title: "Update Title",
  });
  await monday.commit();
};
