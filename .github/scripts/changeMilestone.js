// Moves open, non-installed issues from the previous, past-due milestone to the current one.
// This action only retrieves up to 100 issues per issue lifecycle label because of the per_page max.
// The max per_page is not a problem for our 2 week sprints, but if we change to monthly
// we need to iterate through the issue list's pages using the `page` parameter.
// https://octokit.github.io/rest.js/v18#issues-list-for-repo
module.exports = async ({ github, context }) => {
  const { data: milestones } = await github.rest.issues.listMilestones({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "open",
    sort: "due_on",
    per_page: 100,
    direction: "asc",
  });

  if (!milestones.length) {
    console.log("There are no open milestones in this repo, ending run.");
    return;
  }

  const currentDate = new Date(Date.now());
  for (const [index, milestone] of milestones.entries()) {
    if (!milestone.due_on || new Date(milestone.due_on) < currentDate) {
      continue;
    }

    if (index < 1) {
      console.log("There is no open, past due milestone to move issues from, ending run.");
      return;
    }

    const { data: previousMilestoneIssuesNew } = await github.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
      milestone: milestones[index - 1].number,
      per_page: 100,
      labels: "0 - new",
    });

    const { data: previousMilestoneIssuesAssigned } = await github.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
      milestone: milestones[index - 1].number,
      per_page: 100,
      labels: "1 - assigned",
    });

    const { data: previousMilestoneIssuesInDev } = await github.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
      milestone: milestones[index - 1].number,
      per_page: 100,
      labels: "2 - in development",
    });

    const moveableIssues = [
      ...previousMilestoneIssuesNew,
      ...previousMilestoneIssuesAssigned,
      ...previousMilestoneIssuesInDev,
    ];

    if (!moveableIssues.length) {
      console.log("There are no movable issues, ending run.");
      return;
    }

    for (const issue of moveableIssues) {
      const labels = [
        ...issue.labels.map((label) => label.name).filter((name) => name !== "milestone adjusted"),
        "milestone adjusted",
      ];

      await github.rest.issues.update({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        milestone: milestone.number,
        labels,
      });
    }

    console.log("Moved", moveableIssues.length, "issues to the current milestone, ending run.");
    return;
  }
};
