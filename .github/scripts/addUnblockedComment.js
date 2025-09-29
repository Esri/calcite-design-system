// @ts-check
// When a blocking issue is closed:
// 1. Leaves a comment on all the issues listed as blocked in body,

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;
  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const { ISSUE_VERIFIERS } = process.env;
  const issueBody = payload.issue.body;
  // Matches the "Blocked issues:" line and captures everything after it
  const blockedIssuesLineRegex = /Blocked issues:\s*([^\n]+)/i;
  // Matches number only or full issue URLs
  const issueRegex = /#(\d+)|https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/(\d+)/g;

  if (!issueBody) {
    console.log("No issue body was found.");
    return;
  }

  // Get the "Blocked issues:" line
  const blockedIssuesLineMatch = issueBody.match(blockedIssuesLineRegex);

  // Add a "@" character to notify the user
  const verifiers = ISSUE_VERIFIERS?.split(",").map((v) => `@${v.trim()}`);

  // If "Blocked issues" line is matched in the body then create a comment on each issue listed
  if (blockedIssuesLineMatch) {
    const blockedIssuesLine = blockedIssuesLineMatch[1];
    const issueNumbers = [];
    let match;

    while ((match = issueRegex.exec(blockedIssuesLine)) !== null) {
      // match[1] is the issue number from only number format #12345, match[2] is from the URL format
      issueNumbers.push(match[1] || match[2]);
    }

    for (const issueNumber of issueNumbers) {
      const issueProps = {
        repo,
        owner,
        issue_number: Number(issueNumber),
      };

      try {
        await github.rest.issues.createComment({
          ...issueProps,
          body: `Issue #${context.issue.number} has been closed, this issue is ready for re-evaluation. \n\ncc ${verifiers}`,
        });
      } catch (error) {
        if (error.status === 404) {
          console.log(`Issue #${issueNumber} does not exist.`);
          continue;
        } else {
          throw error;
        }
      }

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
