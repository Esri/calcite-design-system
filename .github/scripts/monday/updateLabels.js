// @ts-check
const Monday = require("../support/monday");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const labelName = label?.name;

  if (!labelName) {
    console.log("No label found in the payload.");
    process.exit(0);
  }

  const monday = Monday(issue);
  monday.addLabel(labelName);
  await monday.commit();
};
