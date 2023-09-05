module.exports = async ({ github, context }) => {
  const {
    repo: { repo, owner },
    payload: { issue, pull_request },
  } = context;

  // no optional chaining support
  // https://github.com/actions/github-script/pull/182
  const milestone_number =
    (issue && issue.milestone && issue.milestone.number) ||
    (pull_request && pull_request.milestone && pull_request.milestone.number);

  if (!milestone_number) {
    console.log("No milestone found, ending run.");
    return;
  }

  const { data: milestone } = await github.rest.issues.getMilestone({
    owner,
    repo,
    milestone_number,
  });

  const currentDate = new Date(Date.now());
  currentDate.setUTCHours(0, 0, 0, 0);

  // close milestone if it is past due and there are no open issues/PRs
  !milestone.open_issues &&
    milestone.due_on &&
    new Date(milestone.due_on) < currentDate &&
    (await github.rest.issues.updateMilestone({
      owner,
      repo,
      milestone_number,
      state: "closed",
    }));
};
