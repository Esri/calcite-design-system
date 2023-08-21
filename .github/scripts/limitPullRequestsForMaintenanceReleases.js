module.exports = async ({ github, context, core }) => {
  const { data: milestones } = await github.rest.issues.listMilestones({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "open",
    sort: "due_on",
    per_page: 100,
    direction: "asc",
  });

  if (!milestones.length) {
    core.notice("There are no open milestones in this repo, ending run.");
    process.exit(0);
  }

  const allowedLabels = ["low risk", "p - high", "p - critical", "regression"];

  github.event.pull_request.labels.forEach((label) => {
    if (allowedLabels.includes(label.name)) {
      core.notice(`Pull request has the "${label.name}" label, which allows installs during Maintenance milestones.`);
      process.exit(0);
    }
  });

  const currentDate = new Date(Date.now());
  for (const [index, milestone] of milestones.entries()) {
    if (!milestone.due_on || new Date(milestone.due_on) > currentDate) {
      continue;
    }

    if (milestone[index - 1].title.match("Maintenance")) {
      core.setFailed(
        `Installing this pull request is blocked until the Maintenance milestone ends (${
          milestone[index - 1].due_one
        }). Add one of the following labels to prevent this error: ${allowedLabels}.`
      );
    } else {
      core.notice("Current milestone is not a Maintenance release");
      process.exit(0);
    }
  }
};
