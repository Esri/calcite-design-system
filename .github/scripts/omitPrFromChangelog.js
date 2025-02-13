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
  const omitComment = `\n\nBEGIN_COMMIT_OVERRIDE\nomitted from changelog\nEND_COMMIT_OVERRIDE`;
  const omitCommentRegex = /BEGIN_COMMIT_OVERRIDE/gm;

  if (!pullRequestBody) {
    console.log("No issue body was found, ending run.");
    return;
  }

  if (pullRequestBody.match(omitCommentRegex)) {
    console.log("This PR is already omitted from the changelog, ending run.");
    return;
  }

  if (label?.name === planning.noChangelogEntry) {
    const pullRequestProps = {
      owner,
      repo,
      pull_number: number,
    };

    const newPullRequestBody = `${pullRequestBody}${omitComment}`;

    await github.rest.pulls.update({
      ...pullRequestProps,
      body: newPullRequestBody,
    });
  } else {
    console.log(`The \`no changelog entry\` label is not present on this PR.`);
  }
};
