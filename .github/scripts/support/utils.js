// @ts-check
const {
  labels: { issueWorkflow },
} = require("./resources");

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
      if (err.status === 404) {
        console.log(`The label '${label}' is not associated with issue #${issue_number}.`, err);
      } else {
        console.log("Error while attempting to remove issue label.", err);
      }
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
    } catch {
      await github.rest.issues.createLabel({
        owner,
        repo,
        name: label,
        color,
        description,
      });
    }
  },
  /**
   * Checks if the labels do not include any lifecycle labels
   * @param {import('@octokit/webhooks-types').Label[] | undefined} labels - The list of labels for the issue
   * @param {object} options - Options to skip specific labels
   * @return {boolean} - True if no lifecycle labels are present, false otherwise
   */
  notInLifecycle: (labels, { skipMilestone = false } = {}) => {
    if (!labels?.length) {
      return true;
    }

    let lifecycleLabels = Object.values(issueWorkflow);
    if (skipMilestone) {
      lifecycleLabels = lifecycleLabels.filter((label) => label !== issueWorkflow.needsMilestone);
    }

    return labels.every((label) => !lifecycleLabels.includes(label.name));
  },
  /**
   * Checks if the labels do not include the "Ready for Dev" label
   * @param {import('@octokit/webhooks-types').Label[] | undefined} labels - The list of labels for the issue
   * @return {boolean} - True if "Ready for Dev" label is not present, false otherwise
   */
  notReadyForDev: (labels) => {
    if (!labels) {
      return true;
    }

    return labels.every((label) => label.name !== issueWorkflow.readyForDev);
  },
};
