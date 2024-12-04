// @ts-check
const {
  labels: { planning },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;
  const payload = /** @type {import('@octokit/webhooks-types').PullRequestLabeledEvent} */ (context.payload);
  const {
    label,
    pull_request: { number },
  } = payload;

  const pullRequestBody = payload.pull_request.body;
  const ommitComment = `\n\nBEGIN_COMMIT_OVERRIDE\nEND_COMMIT_OVERRIDE`;

  if (!pullRequestBody) {
    console.log("No issue body was found");
    return;
  }

  if (label?.name === planning.noChangelogEntry) {
    const pullRequestProps = {
      owner,
      repo,
      pull_number: number,
    };

    const newPullRequestBody = pullRequestBody + ommitComment;

    await github.rest.pulls.update({
      ...pullRequestProps,
      body: newPullRequestBody,
    });
  } else {
    console.log(`The \`no changleog entry\` label is not present on this PR.`);
  }
};
