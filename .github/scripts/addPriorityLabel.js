// @ts-check
const { createLabelIfMissing } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    action,
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    console.log("could not determine the issue body");
    return;
  }

  const addPriorityRegex = new RegExp(
    action === "edited"
      ? // the way GitHub parses the issue body into plaintext
        // requires this exact format for edits
        "(?<=### Priority impact\r\n\r\n).+"
      : // otherwise it depends on the submitter's OS
        "(?<=### Priority impact[\r\n|\r|\n]{2}).+$",
    "m",
  );

  const addPriorityRegexMatch = body.match(addPriorityRegex);

  const addPriorityLabel = (addPriorityRegexMatch && addPriorityRegexMatch[0] ? addPriorityRegexMatch[0] : "").trim();

  if (addPriorityLabel && addPriorityLabel !== "N/A") {
    await createLabelIfMissing({
      github,
      context,
      label: addPriorityLabel,
      color: "bb7fe0",
      description: `User set priority status of ${addPriorityLabel}`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [addPriorityLabel],
    });
  }
};
