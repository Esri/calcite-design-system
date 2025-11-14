// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesClosedEvent | import('@octokit/webhooks-types').IssuesReopenedEvent}*/ (
      context.payload
    );
  const monday = Monday(issue, core);
  monday.handleState(action);
  await monday.commit();
};
