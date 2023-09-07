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

  const { data: issue } = await github.rest.issues.get({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const allowedLabels = ["low risk", "p - high", "p - critical", "regression"];

  if (issue.labels.length) {
    console.log("Pull request labels:", issue.labels);
    issue.labels.forEach((label) => {
      if (allowedLabels.includes(label.name)) {
        core.notice(
          `Pull request has the "${label.name}" label, which allows installs during Maintenance milestones. Ending run.`
        );
        process.exit(0);
      }
    });
  }

  const currentDate = new Date(Date.now());
  for (const milestone of milestones) {
    if (!milestone?.due_on || new Date(milestone?.due_on) < currentDate) {
      console.log(`Skipping open milestone "${milestone.title}" because it is past due or doesn't have a due date.`);
      continue;
    }

    console.log(`The current milestone is "${milestone?.title}".`);
    if (/Maintenance/i.test(milestone?.title)) {
      core.setFailed(
        `Installing this pull request is blocked until the Maintenance milestone ends (${
          milestone?.due_on.split("T")[0]
        }). Add one of the following labels to prevent this error: ${JSON.stringify(allowedLabels)}.`
      );
      process.exit(1);
    } else {
      core.notice("The current milestone is not for a Maintenance release, ending run.");
      process.exit(0);
    }
  }
};
