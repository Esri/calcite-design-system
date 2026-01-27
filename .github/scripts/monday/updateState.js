// @ts-check
const Monday = require("../support/monday");
const { createUpdateBodyCallback } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesClosedEvent | import('@octokit/webhooks-types').IssuesReopenedEvent}*/ (
      context.payload
    );
  const monday = Monday(issue, core, createUpdateBodyCallback({ github, context, core }));
  monday.handleState(action);
  await monday.commit();
};
