// When the "spike complete" label is added to an issue:
// 1. Modifies the labels,
// 2. Updates the assignees and milestone, and
// 3. Generates a notification to the Calcite project manager(s)
//
// The secret is formatted like so: person1, person2, person3
//
// Note the script automatically adds the "@" character in to notify the project manager(s)
module.exports = async ({ github, context }) => {
  const { managers } = process.env;
  const { label } = context.payload;

  if (label && label.name === "spike complete") {
    // Add a "@" character to notify the user
    const calcite_managers = managers.split(",").map((v) => " @" + v.trim());

    const issueProps = {
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    };

    /* Modify labels */
    try {
      await github.rest.issues.removeLabel({
        ...issueProps,
        name: "spike",
      });
    } catch (err) {
      console.log("The 'spike' label is not associated with the issue", err);
    }

    try {
      await github.rest.issues.removeLabel({
        ...issueProps,
        name: "1 - assigned",
      });
    } catch (err) {
      console.log("The '1 - assigned' label is not associated with the issue", err);
    }

    try {
      await github.rest.issues.removeLabel({
        ...issueProps,
        name: "2 - in development",
      });
    } catch (err) {
      console.log("The '2 - in development' label is not associated with the issue", err);
    }

    // Add labels
    await github.rest.issues.addLabels({
      ...issueProps,
      labels: ["0 - new", "needs milestone"],
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
