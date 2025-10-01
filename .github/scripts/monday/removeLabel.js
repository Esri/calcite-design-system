// @ts-check
const Monday = require("../support/monday");
const {
  labels: {
    planning: { spike, spikeComplete },
    issueType: { designTokens },
  },
  packages: { tokens },
} = require("../support/resources");
const { assertRequired } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (context.payload);
  const [labelName] = assertRequired([label?.name]);

  const isSpike = labelName === spike;
  if (isSpike && issue.labels) {
    const isSpikeComplete = issue.labels.some((label) => label.name === spikeComplete);
    assertRequired([isSpikeComplete], "Issue is marked as a spike complete. Skipping label removal.");
  }

  const tokensLabels = [designTokens, tokens];
  const isTokens = tokensLabels.includes(labelName);
  if (isTokens && issue.labels) {
    const areTokensStillPresent = issue.labels.some((label) => label.name === designTokens);
    assertRequired([areTokensStillPresent], "Issue is still marked as a design token issue. Skipping label removal.");
  }

  const monday = Monday(issue);
  monday.clearLabel(labelName);
  await monday.commit();
};
