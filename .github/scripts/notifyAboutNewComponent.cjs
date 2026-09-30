// @ts-check
// If the "new component" label is added to an issue, generates a notification to the Calcite designer lead(s)
// The secret is formatted like so: designer1, designer2, designer3
// Note the script automatically adds the "@" character in to notify the designer lead(s)

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const {
    issue: { number },
  } = payload;

  const { DESIGNERS } = process.env;

  // Add a "@" character to notify the user
  const calcite_designers = DESIGNERS?.split(",").map((v) => " @" + v.trim());

  if (!calcite_designers?.length) {
    console.error("unable to determine designers");
    process.exit(1);
  }

  // Add a comment to issues with the 'new component' label to notify the designer(s)
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: `cc ${calcite_designers}`,
  });
};
