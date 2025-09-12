// @ts-check
const Monday = require("./support/monday.js");
const {
  labels: {
    issueType: { design },
  },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesClosedEvent | import('@octokit/webhooks-types').IssuesReopenedEvent}*/ (
      context.payload
    );
  const monday = Monday(issue);

  if (action === "reopened") {
    monday.setColumnValue(monday.columns.open, "Open");
  } else {
    monday.setColumnValue(monday.columns.open, "Closed");
    // If closed but not completed, set status to "Closed"
    if (issue.state_reason !== "completed") {
      monday.setColumnValue(monday.columns.status, "Closed");
    }
    // If not a design issue, set status to "Done"
    else if (issue.labels && issue.labels.every((label) => label.name !== design)) {
      monday.setColumnValue(monday.columns.status, "Done");
    }
  }

  await monday.commitChanges();
};
