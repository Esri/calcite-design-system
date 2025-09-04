// @ts-check
const Monday = require("./support/monday.js");
const {
  labels: {
    planning: { spike, spikeComplete },
  },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesUnlabeledEvent} */ (context.payload);
  const labelName = label?.name;
  if (!labelName) {
    console.log("No label found in the payload.");
    process.exit(0);
  }

  const monday = Monday(issue);

  const isSpike = labelName === spike;
  if (isSpike && issue.labels) {
    const isSpikeComplete = issue.labels.some((label) => label.name === spikeComplete);
    if (isSpikeComplete) {
      console.log("Issue is marked as a spike complete. Skipping label removal.");
      process.exit(0);
    }
  }

  monday.clearLabel(labelName);
  await monday.commitChanges();
};
