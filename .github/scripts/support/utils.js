// @ts-check
module.exports = {
  /**
   * @typedef {object} removeLabelParam
   * @property {InstanceType<typeof import('@actions/github/lib/utils').GitHub>} github
   * @property {import('@actions/github/lib/context').Context} context
   * @property {string} label
   *
   * @param {removeLabelParam} obj
   **/
  removeLabel: async ({ github, context, label }) => {
    const { owner, repo } = context.repo;
    const issue_number = context.issue.number;

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

  /**
   * @typedef {object} createLabelIfMissingParam
   * @property {InstanceType<typeof import('@actions/github/lib/utils').GitHub>} github
   * @property {import('@actions/github/lib/context').Context} context
   * @property {string} label
   * @property {string} color
   * @property {string} description
   *
   * @param {createLabelIfMissingParam} obj
   **/
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
