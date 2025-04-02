// @ts-check
const {
  labels: { planning },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;
  const DAYS_BEFORE_CLOSE = 14;
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

  console.log(`Checking for issues with the label: "${planning.needsInfo}" that are stale.`);

  const { data: issues } = await github.rest.issues.listForRepo({
    owner: owner,
    repo: repo,
    state: "open",
    labels: planning.needsInfo,
    per_page: 100,
  });

  const now = new Date();

  for (const issue of issues) {
    const lastUpdated = new Date(issue.updated_at);
    const daysSinceUpdate = Math.round((now.getTime() - lastUpdated.getTime()) / MILLISECONDS_IN_A_DAY);

    if (daysSinceUpdate >= DAYS_BEFORE_CLOSE) {
      console.log(`Closing issue #${issue.number} - No updates for ${Math.round(daysSinceUpdate)} days`);

      await github.rest.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: issue.number,
        body: "Closing this issue due to inactivity. If the issue persists, feel free to reopen it with additional details.",
      });

      await github.rest.issues.update({
        issue_number: issue.number,
        owner: owner,
        repo: repo,
        state: "closed",
      });
    }
  }

  console.log("Finished checking for issues without enough information.");
};
