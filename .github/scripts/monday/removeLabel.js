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
module.exports = async ({ context, core }) => {
  const { issue, label } =
    /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (
      context.payload
    );
  const { labels: issueLabels } = issue;
  const [labelName, labelColor] = assertRequired(
    [label?.name, label?.color],
    core,
    "No label found in payload.",
  );
  const logParams = { title: "Remove Label" };

  if (labelName === spike && includesLabel(issueLabels, spikeComplete)) {
    core.warning(
      "Issue is marked as a spike complete. Skipping label removal.",
      logParams,
    );
    return;
  }

  const remainingTokenLabel =
    labelName === designTokens
      ? tokensPackage
      : labelName === tokensPackage
        ? designTokens
        : null;
  if (remainingTokenLabel && includesLabel(issueLabels, remainingTokenLabel)) {
    core.warning(
      "Issue is still marked as a design token issue. Skipping label removal.",
      logParams,
    );
    return;
  }

  const monday = Monday(issue, core);
  monday.setAssignedStatus();
  monday.clearLabel(labelName, labelColor);
  await monday.commit();
};
