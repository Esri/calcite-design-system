// @ts-check
const Monday = require("../support/monday");
const {
  labels: {
    issueType: { design },
  },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesClosedEvent | import('@octokit/webhooks-types').IssuesReopenedEvent}*/ (
      context.payload
    );
  const monday = Monday(issue);

  if (action === "reopened") {
    monday.setColumnValue(monday.columnIds.open, "Open");
  } else {
    monday.setColumnValue(monday.columnIds.open, "Closed");
    if (issue.state_reason !== "completed") {
      monday.setColumnValue(monday.columnIds.status, "Closed");
    }
    else if (issue.labels?.every((label) => label.name !== design)) {
      monday.setColumnValue(monday.columnIds.status, "Done");
    }
  }

  await monday.commit();
};
