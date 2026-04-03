// @ts-check
const {
  groups: { pes },
} = require("./support/resources");
// When an issue with "Blocked issues" line in the description is edited:
// 1. Add comment to notify that all blocking issues have been added as relationships and removed from the description

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Blocking Relationships" };
  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, id, number: issue_number },
  } = payload;
  const issueProps = { owner, repo, issue_number: issue_number };

  if (!payload.issue || !payload.issue.number) {
    core.notice("No issue was found in the payload.", logParams);
    return;
  }

  if (!body) {
    core.notice("Could not determine the issue body.", logParams);
    return;
  }

  const blockedIssuesLineRegex = /Blocked issues:\s*([^\n]+)/i;
  const issueRegex = /#(\d+)|https:\/\/github\.com\/[^/]+\/[^/]+\/issues\/(\d+)/g;
  const blockedIssuesLineMatch = body.match(blockedIssuesLineRegex);
  const blockedIssueNumbers = new Set();

  if (!blockedIssuesLineMatch) {
    core.notice(`No blocked issues line found in the issue description of issue #${issue_number}.`, logParams);
    return;
  }

  const blockedLine = blockedIssuesLineMatch[1];

  let match;

  while ((match = issueRegex.exec(blockedLine)) !== null) {
    const matchedIssueNumber = Number(match[1] || match[2]);
    if (matchedIssueNumber && matchedIssueNumber !== issue_number) {
      blockedIssueNumbers.add(matchedIssueNumber);
    }
  }

  async function addRelationshipsToBlockedIssues() {
    for (const blockedIssueNumber of blockedIssueNumbers) {
      try {
        await github.request("POST /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by", {
          ...issueProps,
          issue_number: blockedIssueNumber,
          issue_id: id,
        });
        core.notice(`Marked issue #${issue_number} as blocking issue #${blockedIssueNumber}...`, logParams);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function removeBlockedIssuesLineFromIssueDescription() {
    const blockedIssuesLineRegexForReplacement = /Blocked issues:\s*([^\n]+)\n?/i;
    const newBody = body?.replace(blockedIssuesLineRegexForReplacement, "").trim();

    try {
      await github.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
        ...issueProps,
        body: newBody,
      });
      core.notice("Removed blocked issues line from issue description.", logParams);
    } catch (error) {
      console.error(error);
    }

    try {
      await github.rest.issues.createComment({
        ...issueProps,
        body: `All blocked issues from the issue description have been added as relationships and removed from the description.\n\ncc ${pes}`,
      });
    } catch (error) {
      console.error(error);
    }
  }

  await addRelationshipsToBlockedIssues();
  await removeBlockedIssuesLineFromIssueDescription();

  core.notice("Finished adding blocked relationships.", logParams);
};
