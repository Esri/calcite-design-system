// @ts-check
const { createLabelIfMissing, getIssueFormResponse, syncAddedLabelWithMonday } = require("./support/utils.cjs");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const { repo, owner } = context.repo;
  const logParams = { title: "Add Priority Label" };

  const payload = /** @type {import('@octokit/webhooks-types').IssuesEvent} */ (context.payload);
  const {
    issue: { body, number: issue_number },
  } = payload;

  if (!body) {
    core.notice("Could not determine the issue body", logParams);
    return;
  }

  const addPriorityLabel = getIssueFormResponse(body, "Priority impact");

  if (addPriorityLabel === "N/A" || addPriorityLabel === "") {
    core.notice(`No priority impact listed on issue #${issue_number}`, logParams);
  } else {
    await createLabelIfMissing({
      github,
      context,
      label: addPriorityLabel,
      color: "bb7fe0",
      description: `User set priority status of ${addPriorityLabel}`,
    });

    await github.rest.issues.addLabels({
      issue_number,
      owner,
      repo,
      labels: [addPriorityLabel],
    });

    await syncAddedLabelWithMonday({
      github,
      context,
      issueNumber: issue_number,
      label: addPriorityLabel,
    });
  }
};
