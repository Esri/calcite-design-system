// @ts-check
const Monday = require("../support/monday");
const { createBodyUpdater } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue } =
    /** @type {import('@octokit/webhooks-types').IssuesOpenedEvent | import('@octokit/webhooks-types').IssuesLabeledEvent}*/ (
      context.payload
    );
  const monday = Monday(issue, core, createBodyUpdater({ github, context, core }));
  await monday.createTask();
};
