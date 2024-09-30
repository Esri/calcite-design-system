// @ts-check
const { resolve } = require("path");
const { writeFile } = require("fs/promises");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const outputJson = {};
  let outputCsv = "id,title,due_on,open_issues,closed_issues,remaining_estimate,completed_estimate";

  const outputJsonPath = resolve(__dirname, "..", "milestone-estimates.json");
  const outputCsvPath = resolve(__dirname, "..", "milestone-estimates.csv");

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
        // @ts-ignore milestone.number is valid: https://docs.github.com/en/rest/issues/issues#list-repository-issues--parameters
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
          if (typeof label === "string" || !label?.name) {
            continue;
          }

          const estimateLabelMatch = label.name.match(/estimate - (\d+)/);

          if (estimateLabelMatch && estimateLabelMatch?.length > 1) {
            outputJson[milestone.number][issue.state === "open" ? "remaining_estimate" : "completed_estimate"] +=
              Number.parseInt(estimateLabelMatch[1]);

            break; // assumes an issue will only have one estimate label
          }
        }
      }

      outputCsv = `${outputCsv}\n${milestone.number},${Object.values(outputJson[milestone.number]).join(",")}`;
    }

    await writeFile(outputCsvPath, outputCsv);
    await writeFile(outputJsonPath, JSON.stringify(outputJson, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
