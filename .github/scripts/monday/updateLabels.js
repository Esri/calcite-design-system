// @ts-check
const Monday = require("./support/monday.js");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, label } = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const labelName = label?.name;
  const monday = Monday(issue);

  if (!labelName) {
    console.log("No label found in the payload.");
    process.exit(0);
  }

  monday.addLabel(labelName);
  await monday.commitChanges();
};
