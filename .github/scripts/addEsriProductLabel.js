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

  const productRegex = new RegExp(
    action === "edited"
      ? // the way GitHub parses the issue body into plaintext
        // requires this exact format for edits
        "(?<=### Esri team\r\n\r\n).+"
      : // otherwise it depends on the submitter's OS
        "(?<=### Esri team[\r\n|\r|\n]{2}).+$",
    "m",
  );

  const productRegexMatch = body.match(productRegex);

  // If issue includes "Esri team" line then create label, otherwise log message.
  if (productRegexMatch) {
    const product = (productRegexMatch && productRegexMatch[0] ? productRegexMatch[0] : "").trim();

    if (product !== "N/A") {
      await createLabelIfMissing({
        github,
        context,
        label: product,
        color: "006B75",
        description: `Issues logged by ${product} team members.`,
      });

      await github.rest.issues.addLabels({
        issue_number,
        owner,
        repo,
        labels: [product],
      });

      await github.rest.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id: "issue-monday-sync.yml",
        ref: "dev",
        inputs: {
          issue_number: issue_number.toString(),
          event_type: "SyncActionChanges",
          label_name: product,
          label_action: "added"
        },
      });
    }
  } else {
    console.log(`No Esri team listed on issue #${issue_number}`);
  }
};
