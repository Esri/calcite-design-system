// @ts-check

// If the "calcite-ui-icons" label is added to an issue, generates a notification to the Icons team leads to review
// The secret is formatted like so: icon-team-member-1, icon-team-member-2, icon-team-member-3
// Note the script automatically adds the "@" character in to notify the icon team lead(s)

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const {
    issue: { number },
  } = payload;

  const { ICONS_TEAM } = process.env;

  // Add a "@" character to notify the user
  const icon_leads = ICONS_TEAM?.split(",").map((v) => " @" + v.trim());

  if (!icon_leads?.length) {
    console.error("unable to determine icon leads");
    process.exit(1);
  }

  // Add a comment to issues with the 'calcite-ui-icons' label to notify icon team lead(s)
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: `cc ${icon_leads}`,
  });
};
