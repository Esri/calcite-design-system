// @ts-check
const { issueType } = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const {
    pull_request: { title, number },
  } = payload;

  const conventionalCommitRegex =
    /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([\w ,-]+\))?(!?:\s+)([\w ]+[\s\S]*)/i;

  if (!title) {
    console.log("No title found, ending run.");
    return;
  }

  const match = title.match(conventionalCommitRegex);

  if (!match || match.length < 2) {
    console.log("Title does not match conventional commit regex, ending run.");
    return;
  }

  // commit type is in the first match group
  const typeLabel = getLabelName(match[1]);

  try {
    await github.rest.issues.addLabels({
      owner,
      repo,
      issue_number: number,
      labels: [typeLabel],
    });
  } catch (e) {
    console.error("Unable to label pull request, the author likely does not have write permissions\n", e);
  }
};

/**
 * @param {string} type
 */
function getLabelName(type) {
  switch (type) {
    case "feat":
      return issueType.enhancement;
    case "fix":
      return issueType.bug;
    case "docs":
      return issueType.docs;
    case "test":
      return issueType.testing;
    case "refactor":
      return issueType.refactor;
    case "tooling":
      return issueType.tooling;
    default:
      return issueType.chore;
  }
}
