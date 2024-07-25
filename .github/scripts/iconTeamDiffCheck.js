const { teams } = require("./support/resources");

module.exports = async ({ github, context, core }) => {
  const {
    repo: { owner, repo },
    payload: {
      pull_request: {
        number: pull_number,
        user: { login: author },
      },
    },
  } = context;

  core.info("Checking author/reviewers because there are diffs outside of package/calcite-ui-icons");
  core.debug(`Author: ${author}`);

  const { data: iconTeamMembers } = await github.rest.teams.listMembersInOrg({
    org: owner,
    team_slug: teams.iconDesigners,
  });

  core.debug(`Members of "${teams.iconDesigners}" GitHub Team: ${author}`);

  const { data: adminTeamMembers } = await github.rest.teams.listMembersInOrg({
    org: owner,
    team_slug: teams.admins,
  });

  core.debug(`Members of "${teams.admins}" GitHub Team: ${author}`);

  // passes when an admin approves the PR
  if (github.event?.review?.state == "APPROVED" && adminTeamMembers.includes(github.event?.review?.user?.login)) {
    core.debug(`Approved by admin: ${github.event?.review?.user?.login}`);
    core.info("Passing because an admin has approved this pull request");
    process.exit(0);
  }

  // passes if the author isn't on the icon designers team or if the author is on the admin team
  // admin(s) may be on the icon designers team for maintenance purposes
  if (!iconTeamMembers.includes(author)) {
    core.info("Passing because the author is an admin and/or isn't an icon designer");
    process.exit(0);
  }

  const { data: reviews } = await github.rest.pulls.listReviews({ owner, repo, pull_number });

  // passes if there was a previous approval from an admin
  reviews.forEach((review) => {
    if (review.state == "APPROVED" && adminTeamMembers.includes(review.user.login)) {
      core.debug(`Approved by admin: ${review.user.login}`);
      core.info("Passing because an admin has approved this pull request");
      process.exit(0);
    }
  });

  const { data: requestedReviewers } = await github.rest.pulls.listRequestedReviewers({
    owner,
    repo,
    pull_number,
  });

  if (!requestedReviewers.includes(teams.admins)) {
    core.debug(`Requesting review from the "${teams.admins}" GitHub team`);
    await github.rest.pulls.requestReviewers({
      owner,
      repo,
      pull_number,
      team_reviewers: [teams.admins],
    });
  }

  core.setFailed(
    `An admin needs to review these changes because a file outside of package/calcite-ui-icons was changed.`,
  );
};
