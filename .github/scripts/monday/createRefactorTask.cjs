// @ts-check
const Monday = require("../support/monday.cjs");
const { createBodyUpdater } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { pull_request } = /** @type {import('@octokit/webhooks-types').PullRequestClosedEvent}*/ (context.payload);

  const relatedRegex = /\*\*Related Issue:\*\* #\d+/;
  if (pull_request.body && relatedRegex.test(pull_request.body)) {
    core.info("Pull request has a related issue, skipping Monday task creation.");
    return;
  }

  const monday = Monday(pull_request, core, createBodyUpdater({ github, context, core }));
  await monday.createTask();
};
