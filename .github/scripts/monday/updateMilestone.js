// @ts-check
const Monday = require("../support/monday");
const { createUpdateBodyCallback } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue } = /** @type {import('@octokit/webhooks-types').IssuesMilestonedEvent} */ (context.payload);
  const monday = Monday(issue, core, createUpdateBodyCallback({ github, context, core }));
  monday.handleMilestone();
  await monday.commit();
};
