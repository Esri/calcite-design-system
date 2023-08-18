module.exports = async ({ github, context }) => {
  const {
    assignees,
    number,
    user: { login: author },
  } = context.payload.pull_request;

  const updatedAssignees =
    assignees && assignees.length
      ? [...assignees.map((a) => a.login).filter((a) => a !== author), author]
      : [author];

  try {
    await github.rest.issues.addAssignees({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: number,
      assignees: updatedAssignees,
    });
  } catch (e) {
    console.error(
      "Unable to assign the PR author, they likely do not have write permissions\n",
      e,
    );
  }
};
