module.exports = async ({ github, context }) => {
  const { ISSUE_VERIFIERS, CALCITE_DESIGNERS } = process.env;
  const { label } = context.payload;
  if (label && label.name === "3 - installed") {
    const assignees = ISSUE_VERIFIERS.split(",").map((v) => v.trim());

    const { data: issue } = await github.rest.issues.get({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    // assign designers if figma updates are required
    if (issue.labels.map((label) => label.name).includes("figma changes")) {
      assignees.push(...CALCITE_DESIGNERS.split(",").map((v) => v.trim()));
    }

    await github.rest.issues.update({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      assignees,
    });

    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: "Installed and assigned for verification.",
    });
  }
};
