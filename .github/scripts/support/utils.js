module.exports = {
  removeLabel: async ({ github, context, label }) => {
    const { issue_number, owner, repo } = context;
    try {
      await github.rest.issues.removeLabel({
        issue_number,
        owner,
        repo,
        name: label,
      });
    } catch (err) {
      console.log(`The '${label}' label is not associated with the issue`, err);
    }
  },

  createLabelIfMissing: async ({ github, context, label, color, description }) => {
    const { owner, repo } = context.repo;
    try {
      await github.rest.issues.getLabel({
        owner,
        repo,
        name: label,
      });
    } catch (e) {
      await github.rest.issues.createLabel({
        owner,
        repo,
        name: label,
        color,
        description,
      });
    }
  },
};
