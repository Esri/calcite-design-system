// @ts-check
const Monday = require("../support/monday");
const { assertRequired, notInLifecycle } = require("../support/utils");
const {
  labels: {
    planning: { spike, spikeComplete, blocked },
    issueType: { design, designTokens, a11y },
    issueWorkflow: { new: newLabel, assigned: assignedLabel, needsTriage, needsMilestone },
    handoff: { figmaChanges },
  },
  packages: { tokens: tokensPackage },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (context.payload);
  const { labels: issueLabels, assignee } = issue;
  const [labelName] = assertRequired([label?.name]);

  if (labelName === spike && issueLabels) {
    const isSpikeComplete = issueLabels.some((label) => label.name === spikeComplete);
    assertRequired([isSpikeComplete], "Issue is marked as a spike complete. Skipping label removal.");
  }

  if ([designTokens, tokensPackage].includes(labelName) && issueLabels) {
    const areTokensStillPresent = issueLabels.some((label) => label.name === designTokens);
    assertRequired([areTokensStillPresent], "Issue is still marked as a design token issue. Skipping label removal.");
  }

  const monday = Monday(issue);

  if (
    assignee &&
    notInLifecycle({ labels: issueLabels, skip: [newLabel, assignedLabel, needsTriage, needsMilestone] })
  ) {
    monday.addLabel(assignedLabel);
  }

  const clearable = [a11y, spike, design, blocked, figmaChanges, designTokens, tokensPackage].includes(labelName);
  if (clearable) {
    monday.clearLabel(labelName);
  }

  await monday.commit();
};
