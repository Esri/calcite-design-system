// @ts-check
const Monday = require("../support/monday");
const { assertRequired, createUpdateBodyCallback } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { issue, label: labelPayload } = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (
    context.payload
  );
  const [label] = assertRequired([labelPayload], core, "No label found in payload.");

  const monday = Monday(issue, core, createUpdateBodyCallback({ github, context, core }));
  monday.addLabel(label.name, label.color);
  await monday.commit();
};
