// @ts-check
const Monday = require("../support/monday");
const { assertRequired, includesLabel } = require("../support/utils");
const {
  labels: {
    planning: { spike, spikeComplete },
    issueType: { designTokens },
  },
  packages: { tokens: tokensPackage },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } =
    /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (
      context.payload
    );
  const { labels: issueLabels } = issue;
  const [labelName] = assertRequired([label?.name]);

  if (labelName === spike && includesLabel(issueLabels, spikeComplete)) {
    console.log("Issue is marked as a spike complete. Skipping label removal.");
    process.exit(0);
  }

  const tokensLabels = [designTokens, tokensPackage];
  const remainingTokenLabel =
    tokensLabels.includes(labelName) &&
    tokensLabels.find((l) => l !== labelName);
  if (remainingTokenLabel && includesLabel(issueLabels, remainingTokenLabel)) {
    console.error(
      "Issue is still marked as a design token issue. Skipping label removal.",
    );
    process.exit(0);
  }

  const monday = Monday(issue);
  monday.setAssignedStatus();
  monday.clearLabel(labelName);
  await monday.commit();
};
