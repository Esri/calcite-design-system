// @ts-check
// When the "ready for dev" label is added to an issue:
// 1. Modifies the labels,
// 2. Updates the assignees and milestone, and
// 3. Generates a notification to the Calcite project manager(s)
//
// The secret is formatted like so: person1, person2, person3
//
// Note the script automatically adds the "@" character in to notify the project manager(s)
const {
  labels: { issueWorkflow, planning },
} = require("./support/resources");
const { removeLabel } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const {
    issue: { number },
    label,
  } = payload;

  const { MANAGERS } = process.env;

  if (label?.name === "ready for dev") {
    // Add a "@" character to notify the user
    const calcite_managers = MANAGERS?.split(",").map((v) => " @" + v.trim());

    const issueProps = {
      owner,
      repo,
      issue_number: number,
    };

    /* Modify labels */

    await removeLabel({
      github,
      context,
      label: issueWorkflow.assigned,
    });

    await removeLabel({
      github,
      context,
      label: issueWorkflow.needsTriage,
    });

    await github.rest.issues.addLabels({
      ...issueProps,
      labels: [issueWorkflow.new, issueWorkflow.needsMilestone],
    });

    /* Update issue */

    // Clear assignees and milestone
    await github.rest.issues.update({
      ...issueProps,
      assignees: [],
      milestone: null,
    });

    // Add a comment to notify the project manager(s)
    await github.rest.issues.createComment({
      ...issueProps,
      body: `cc ${calcite_managers}`,
    });
  }
};
