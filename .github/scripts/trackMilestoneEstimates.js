// @ts-check
const { writeFile } = require("fs/promises");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;

  const outputJson = {};
  let outputCsv = "id,title,due_on,open_issues,closed_issues,remaining_estimate,completed_estimate";

  try {
    const milestones = await github.rest.issues.listMilestones({
      owner: owner,
      repo: repo,
      state: "all",
      sort: "due_on",
      per_page: 100,
      direction: "desc",
    });

    if (milestones.data.length === 0) {
      console.error("No milestones found.");
      process.exit(1);
    }

    for (const milestone of milestones.data) {
      outputJson[milestone.number] = {
        title: milestone.title,
        due_on: milestone.due_on,
        open_issues: milestone.open_issues,
        closed_issues: milestone.closed_issues,
        remaining_estimate: 0,
        completed_estimate: 0,
      };

      const issues = await github.paginate(github.rest.issues.listForRepo, {
        // @ts-expect-error milestone.number is valid: https://docs.github.com/en/rest/issues/issues#list-repository-issues--parameters
        milestone: milestone.number,
        owner: owner,
        repo: repo,
        state: "all",
        per_page: 100,
      });

      for (const issue of issues) {
        if (issue.pull_request) {
          continue;
        }

        for (const label of issue.labels) {
          const estimateLabelMatch = (typeof label === "string" ? label : label?.name)?.match(/estimate - (\d+)/);

          if (estimateLabelMatch?.length > 1) {
            outputJson[milestone.number][issue.state === "open" ? "remaining_estimate" : "completed_estimate"] +=
              Number.parseInt(estimateLabelMatch[1]);

            break; // assumes an issue will only have one estimate label
          }
        }
      }

      outputCsv = `${outputCsv}\n${milestone.number},${Object.values(outputJson[milestone.number]).join(",")}`;
    }

    const stringifiedOutputJson = JSON.stringify(outputJson, null, 2);

    core.debug(`JSON Output:\n${stringifiedOutputJson}`);
    core.debug(`CSV Output:\n${outputCsv}`);

    await writeFile("./milestone-estimates.csv", outputCsv);
    await writeFile("./milestone-estimates.json", stringifiedOutputJson);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
