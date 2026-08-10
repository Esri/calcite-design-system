const {
  teams: { admins, iconDesigners },
  labels: { snapshots },
  packages,
} = require("./support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').PullRequestEvent} */ (context.payload);
  const {
    pull_request: {
      number: pull_number,
      user: { login: author },
    },
  } = payload;

  core.debug("Checking author/reviewers because there are diffs outside of package/calcite-ui-icons");
  core.debug(`Author: ${author}`);

  const iconTeamMembers = (
    await github.rest.teams.listMembersInOrg({
      org: owner,
      team_slug: iconDesigners,
    })
  ).data.map((member) => member.login);

  core.debug(`Members of "${iconDesigners}" GitHub Team: ${JSON.stringify(iconTeamMembers)}`);

  const adminTeamMembers = (
    await github.rest.teams.listMembersInOrg({
      org: owner,
      team_slug: admins,
    })
  ).data.map((member) => member.login);

  core.debug(`Members of "${admins}" GitHub Team: ${JSON.stringify(adminTeamMembers)}`);

  // passes if the author isn't on the icon designers team or if the author is on the admin team
  // admin(s) may be on the icon designers team for maintenance purposes
  if (adminTeamMembers.includes(author) || !iconTeamMembers.includes(author)) {
    core.debug("Passing because the author is an admin and/or isn't an icon designer");
    process.exit(0);
  }

  const { data: reviews } = await github.rest.pulls.listReviews({ owner, repo, pull_number });

  // passes if there was a previous approval from an admin
  reviews.forEach((review) => {
    if (review.state == "APPROVED" && review?.user?.login && adminTeamMembers.includes(review.user.login)) {
      core.debug(`Approved by admin: ${review.user.login}`);
      core.debug("Passing because an admin has approved this pull request");
      process.exit(0);
    }
  });

  const { data: requestedReviewers } = await github.rest.pulls.listRequestedReviewers({
    owner,
    repo,
    pull_number,
  });

  if (!requestedReviewers.teams.map((reviewer) => reviewer.slug).includes(admins)) {
    core.debug(`Requesting review from the "${admins}" GitHub team`);
    await github.rest.pulls.requestReviewers({
      owner,
      repo,
      pull_number,
      team_reviewers: [admins],
    });
  }

  await github.rest.issues.addLabels({
    owner,
    repo,
    issue_number: pull_number,
    labels: [snapshots.skip, packages.icons],
  });

  core.setFailed(
    `An admin needs to review these changes because a file outside of package/calcite-ui-icons was changed.`,
  );
};
