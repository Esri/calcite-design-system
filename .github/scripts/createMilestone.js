module.exports = async ({ github, context }) => {
  const DAYS_PER_SPRINT = 14;
  const DAYS_BETWEEN_SPRINTS = 3;
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const { data: milestones } = await github.rest.issues.listMilestones({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "open",
    sort: "due_on",
    per_page: 1,
    direction: "desc",
  });

  if (!milestones.length || !milestones[0].due_on) {
    console.log("There are no open milestones with a due date in this repo, ending run.");
    return;
  }

  const lastDueDate = new Date(milestones[0].due_on);
  const newMilestoneStartDate = new Date(lastDueDate.getTime() + MILLISECONDS_PER_DAY * DAYS_BETWEEN_SPRINTS);
  const newMilestoneDueDate = new Date(lastDueDate.getTime() + MILLISECONDS_PER_DAY * DAYS_PER_SPRINT);

  const title =
    "Sprint " +
    newMilestoneStartDate.toISOString().split("T")[0].replace(/-/g, "/") +
    " - " +
    newMilestoneDueDate.toISOString().split("T")[0].replace(/-/g, "/");

  await github.rest.issues.createMilestone({
    owner: context.repo.owner,
    repo: context.repo.repo,
    due_on: newMilestoneDueDate.toISOString(),
    title,
  });
};
