// @ts-check
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const {
    pull_request: {
      assignees,
      number,
      user: { login: author },
    },
  } = payload;

  const updatedAssignees =
    assignees && assignees.length ? [...assignees.map((a) => a.login).filter((a) => a !== author), author] : [author];

  try {
    await github.rest.issues.addAssignees({
      owner,
      repo,
      issue_number: number,
      assignees: updatedAssignees,
    });
  } catch (e) {
    console.error("Unable to assign the PR author, they likely do not have write permissions\n", e);
  }
};
