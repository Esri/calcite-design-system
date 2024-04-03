module.exports = async ({ github, context }) => {
  const { ISSUE_VERIFIERS, CALCITE_DESIGNERS } = process.env;
  const { label } = context.payload;
  if (label && label.name === "3 - installed") {
    const issueProps = {
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    };
    const { data: issue } = await github.rest.issues.get(issueProps);

    try {
      await github.rest.issues.removeLabel({
        ...issueProps,
        name: "2 - in development",
      });
    } catch (err) {
      console.log("The '2 - in development' label is not associated with the issue", err);
    }

    const assignees = ISSUE_VERIFIERS.split(",").map((v) => v.trim());

    // assign designers if figma updates are required
    if (issue.labels.map((label) => label.name).includes("figma changes")) {
      assignees.push(...CALCITE_DESIGNERS.split(",").map((v) => v.trim()));
    }

    await github.rest.issues.update({
      ...issueProps,
      assignees,
    });

    await github.rest.issues.createComment({
      ...issueProps,
      body: "Installed and assigned for verification.",
    });
  }
};
