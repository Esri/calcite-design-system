// @ts-check
const Monday = require("../support/monday");
const { createBodyUpdater } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesClosedEvent | import('@octokit/webhooks-types').IssuesReopenedEvent}*/ (
      context.payload
    );
  const monday = Monday(issue, core, createBodyUpdater({ github, context, core }));

  if (action === "reopened") {
    core.notice(`Issue reopened, creating or re-syncing task.`, { title: "Create Task" });
    await monday.createTask();
  } else {
    monday.handleState(action);
  }
  
  await monday.commit();
};
