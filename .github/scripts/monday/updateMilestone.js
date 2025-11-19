// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  // eslint-disable-next-line @cspell/spellchecker - Milestoned keyword
  const { issue } = /** @type {import('@octokit/webhooks-types').IssuesMilestonedEvent} */ (context.payload);
  const monday = Monday(issue, core);
  monday.handleMilestone();
  await monday.commit();
};
