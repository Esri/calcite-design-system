// @ts-check
// When a blocking issue is closed:
// 1. Leaves a comment on all the issues listed as blocked in body,

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;
  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const { ISSUE_VERIFIERS } = process.env;
  const issueBody = payload.issue.body;
  const blockedIssuesRegex = /(?!Blocked issues:\s)(#\d+)/gi;

  if (!issueBody) {
    console.log("No issue body was found");
    return;
  }

  // Get the list of issues blocked by this issue if there are any
  const blockedIssues = issueBody.match(blockedIssuesRegex);

  // Add a "@" character to notify the user
  const verifiers = ISSUE_VERIFIERS?.split(",").map((v) => `@${v.trim()}`);

  // If "Blocked issues" line is matched in the body then create a comment on each issue listed
  if (blockedIssues) {
    const issueNumbers = blockedIssues.map((number) => number.slice(1));

    for (const issueNumber of issueNumbers) {
      const issueProps = {
        repo,
        owner,
        issue_number: Number(issueNumber),
      };

      await github.rest.issues.createComment({
        ...issueProps,
        body: `Issue #${context.issue.number} has been closed, this issue is ready for re-evaluation. \n\ncc ${verifiers}`,
      });

      try {
        await github.rest.issues.removeLabel({
          ...issueProps,
          name: "blocked",
        });
      } catch (error) {
        if (error.status === 404) {
          console.log(`The label "blocked" does not exist on issue #${issueNumber}.`);
        } else {
          throw error;
        }
      }
    }
  } else {
    console.log(`No blocked issues listed in the body of issue #${payload.issue.number}.`);
  }
};
