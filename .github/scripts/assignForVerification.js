// @ts-check
const { handoff, issueWorkflow } = require("./support/resources");
const { removeLabel } = require("./support/utils");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context }) => {
  const { repo, owner } = context.repo;

  const payload = /** @type {import('@octokit/webhooks-types').IssuesLabeledEvent} */ (context.payload);
  const {
    label,
    issue: { number },
  } = payload;

  const { ISSUE_VERIFIERS, CALCITE_DESIGNERS } = process.env;

  if (label?.name === issueWorkflow.installed) {
    const issueProps = {
      owner,
      repo,
      issue_number: number,
    };

    const { data: issue } = await github.rest.issues.get(issueProps);

    await removeLabel({ github, context, label: issueWorkflow.inDevelopment });

    const assignees = ISSUE_VERIFIERS?.split(",").map((v) => v.trim());

    // assign designers if figma updates are required
    if (
      assignees &&
      CALCITE_DESIGNERS &&
      issue.labels.map((label) => (typeof label === "string" ? label : label.name)).includes(handoff.figmaChanges)
    ) {
      assignees.push(...CALCITE_DESIGNERS.split(",").map((v) => v.trim()));
    }

    await github.rest.issues.update({
      ...issueProps,
      assignees,
    });

    await github.rest.issues.createComment({
      ...issueProps,
      body: "Installed and assigned for verification.",
    });
  }
};
