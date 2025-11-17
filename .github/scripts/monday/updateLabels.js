// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context, core }) => {
  const { issue, label } =
    /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (
      context.payload
    );
  const [labelName] = assertRequired(
    [label?.name],
    core,
    "No label found in payload.",
  );

  const monday = Monday(issue, core);
  monday.addLabel(labelName);
  await monday.commit();
};
