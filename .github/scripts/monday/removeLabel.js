// @ts-check
const Monday = require("../support/monday");
const { assertRequired, notInLifecycle, includesLabel } = require("../support/utils");
const {
  labels: {
    planning: { spike, spikeComplete },
    issueType: { designTokens },
    issueWorkflow: { new: newLabel, assigned: assignedLabel, needsTriage, needsMilestone },
  },
  packages: { tokens: tokensPackage },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (context.payload);
  const { labels: issueLabels, assignee } = issue;
  const [labelName] = assertRequired([label?.name]);

  if (labelName === spike && issueLabels && includesLabel(issueLabels, spikeComplete)) {
    console.log("Issue is marked as a spike complete. Skipping label removal.");
    process.exit(0);
  }

  const tokensLabels = [designTokens, tokensPackage];
  if (tokensLabels.includes(labelName) && issueLabels) {
    const remainingLabel = tokensLabels.find((label) => label !== labelName);
    if (issueLabels.some((label) => label.name === remainingLabel)) {
      console.error("Issue is still marked as a design token issue. Skipping label removal.");
      process.exit(0);
    }
  }

  const monday = Monday(issue);

  if (
    assignee &&
    notInLifecycle({ labels: issueLabels, skip: [newLabel, assignedLabel, needsTriage, needsMilestone] })
  ) {
    monday.addLabel(assignedLabel);
  }

  monday.clearLabel(labelName);
  await monday.commit();
};
