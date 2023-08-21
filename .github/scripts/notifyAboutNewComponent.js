// If the "new component" label is added to an issue, generates a notification to the Calcite designer lead(s)
// The secret is formatted like so: designer1, designer2, designer3
// Note the script automatically adds the "@" character in to notify the designer lead(s)
module.exports = async ({ github, context }) => {
  const { designers } = process.env;
  // Add a "@" character to notify the user
  const calcite_designers = designers.split(",").map((v) => " @" + v.trim());

  // Add a comment to issues with the 'new component' label to notify the designer(s)
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `cc ${calcite_designers}`,
  });
};
