// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue } = /** @type {import('@octokit/webhooks-types').IssuesMilestonedEvent} */ (context.payload);
  const monday = Monday(issue);
  monday.handleMilestone();
  await monday.commit();
};
