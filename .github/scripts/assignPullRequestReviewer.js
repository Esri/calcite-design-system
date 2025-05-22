// @ts-check

const {
  teams: { admins },
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const {
    pull_request: { number: pull_number },
  } = payload;

  const adminTeamMembers = (
    await github.rest.teams.listMembersInOrg({
      org: owner,
      team_slug: admins,
    })
  ).data.map((member) => member.login);

  const { data: reviews } = await github.rest.pulls.listReviews({ owner, repo, pull_number });

  // passes if there was a previous approval from an admin
  reviews.forEach((review) => {
    if (review.state == "APPROVED" && review?.user?.login && adminTeamMembers.includes(review.user.login)) {
      process.exit(0);
    }
  });

  await github.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number,
    team_reviewers: [admins],
  });
};
