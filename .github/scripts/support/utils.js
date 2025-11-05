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
   * @param {object} params
   * @param {import('@octokit/webhooks-types').Label[] | undefined} params.labels - The array of labels for the issue
   * @param {string[]} [params.skip] - The array of lifecycle labels to skip in the check
   * @return {boolean} `true` if no lifecycle labels are present, `false` otherwise
   */
  notInLifecycle: ({ labels, skip = [] }) => {
    if (!labels?.length) {
      return true;
    }

    let lifecycleLabels = Object.values(issueWorkflow);
    if (skip.length) {
      lifecycleLabels = lifecycleLabels.filter((label) => !skip.includes(label));
    }

    return labels.every((label) => !lifecycleLabels.includes(label.name));
  },
  /**
   * Check if an issues' labels includes a specified label
   * @param {import('@octokit/webhooks-types').Label[] | undefined} issueLabels - The list of labels for the issue
   * @param {string} label - The label to check for
   * @return {boolean} `true` if the label is present, `false` otherwise
   */
  includesLabel: (issueLabels, label) => {
    return issueLabels?.some((issueLabel) => issueLabel.name === label) ?? false;
  },
  /**
   * Validates that no values in an array are undefined or null. If any are,
   * logs an error message and exits the process with code 0.
   *
   * @template {readonly unknown[]} T - Tuple type of the input array
   * @param {T} array - Array of values to validate
   * @param {string} [errorMessage] - Optional custom error message to log
   * @returns {{ [K in keyof T]: NonNullable<T[K]> }} The validated array with non-nullable types
   */
  assertRequired: (array, errorMessage) => {
    for (const item of array) {
      if (item === undefined || item === null) {
        const message = errorMessage || `${String(item)} is required but is not defined, exiting.`;
        console.error(message);
        process.exit(0);
      }
    }

    return /** @type {{ [K in keyof T]: NonNullable<T[K]> }} */ (array);
  },
};
