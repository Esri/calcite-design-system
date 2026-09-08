// @ts-check
const { createLabelIfMissing, includesLabel } = require("./support/utils.cjs");
const {
  packages: { icons: iconsPackage },
} = require("./support/resources.cjs");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Calcite Package Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number, labels: issue_labels },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  // NOTE: assumes all packages will be in the @esri NPM scope
  const packageRegex = /(?<=\[X\]\s@esri\/)[\w-]*$/gim;
  const packages = body.match(packageRegex) || [];

  for (const packageLabel of packages) {
    if (includesLabel(issue_labels, packageLabel)) {
      core.notice(`Skipping: issue #${issue_number} already has the label '${packageLabel}'`, logParams);
      continue;
    }

    await createLabelIfMissing({
      github,
      context,
      label: packageLabel,
      // eslint-disable-next-line @cspell/spellchecker -- hex color
      color: "BFBEAF",
      description: `Issues specific to the @esri/${packageLabel} package.`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [packageLabel],
    });

    if (packageLabel === iconsPackage) {
      core.setOutput("icon-label-added", "true");
    }

    await github.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: "issue-monday-sync.yml",
      ref: "dev",
      inputs: {
        issue_number: issue_number.toString(),
        event_type: "SyncActionChanges",
        label_name: packageLabel,
        label_action: "added",
      },
    });
  }
};
