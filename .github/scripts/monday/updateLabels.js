// @ts-check
const Monday = require("../support/monday");
const {
  labels: {
    issueWorkflow,
    issueType: { design },
  },
} = require("../support/resources");
const { assertRequired, includesLabel } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const [labelName] = assertRequired([label?.name]);

  const monday = Monday(issue, core);

  const isVerified = labelName === issueWorkflow.verified;
  if (isVerified && issue.state === "closed" && !includesLabel(issue.labels, design)) {
    monday.setColumnValue(monday.columnIds.status, "Done");
  } else {
    monday.addLabel(labelName);
  }

  await monday.commit();
};
