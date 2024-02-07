const { writeFile } = require("fs/promises");

module.exports = async ({ github, context }) => {
  const outputData = {};
  const outputPath = resolve(__dirname, "..", "milestone-estimates.json");

  try {
    const milestones = await github.rest.issues.listMilestones({
      owner: repoOwner,
      repo: repoName,
      state: "closed",
      sort: "due_on",
      per_page: 1,
      direction: "desc",
    });

    if (milestones.data.length === 0) {
      console.error("No closed milestones found.");
      process.exit(1);
    }

    const milestone = milestones.data[0];

    outputData[milestone.number] = {
      due_on: milestone.due_on,
      title: milestone.title,
      description: milestone.description,
      open_issues: milestone.open_issues,
      closed_issues: milestone.closed_issues,
      issues_with_estimate: 0,
      effort_estimate: 0,
    };

    const issues = await github.rest.issues.listForRepo({
      owner: repoOwner,
      repo: repoName,
      milestone: milestone.number,
      state: "closed",
      per_page: 100,
    });

    for (const issue of issues.data) {
      if ("pull_request" in issue) {
        continue;
      }

      for (const label of issue.labels) {
        if (label.name.match(/estimate/)) {
          outputData[milestone.number].issues_with_estimate++;
          outputData[milestone.number].effort_estimate += Number.parseInt(label.name.replace(/\D/g, ""));
          break;
        }
      }
    }

    await writeFile(outputPath, JSON.stringify(outputData, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
