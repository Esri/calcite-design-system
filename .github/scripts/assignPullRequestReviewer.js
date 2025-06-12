// @ts-check

const {
  teams: { translationReviewers },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const {
    pull_request: { number: pull_number },
  } = payload;

  const reviewers = (
    await github.rest.teams.listMembersInOrg({
      org: owner,
      team_slug: translationReviewers,
    })
  ).data.map((member) => member.login);

  const { data: reviews } = await github.rest.pulls.listReviews({ owner, repo, pull_number });

  // passes if there was a previous approval from translation reviewers
  reviews.some((review) => {
    if (review.state == "APPROVED" && review?.user?.login && reviewers.includes(review.user.login)) {
      process.exit(0);
    }
  });

  await github.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number,
    team_reviewers: [translationReviewers],
  });
};
