// When the "ready for dev" label is added to an issue:
// 1. Modifies the labels,
// 2. Updates the assignees and milestone, and
// 3. Generates a notification to the Calcite project manager(s)
//
// The secret is formatted like so: person1, person2, person3
//
// Note the script automatically adds the "@" character in to notify the project manager(s)
const { issueWorkflow, planning } = require("./support/resources");
const { removeLabel } = require("./support/utils");

module.exports = async ({ github, context }) => {
  const { managers } = process.env;
  const { label } = context.payload;

  if (label && label.name === "ready for dev") {
    // Add a "@" character to notify the user
    const calcite_managers = managers.split(",").map((v) => " @" + v.trim());

    const issueProps = {
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    };

    /* Modify labels */

    await removeLabel({
      github,
      context,
      label: issueWorkflow.assigned,
    });

    await github.rest.issues.addLabels({
      ...issueProps,
      labels: [issueWorkflow.new, planning.needsMilestone],
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
