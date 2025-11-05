// @ts-check
const Monday = require("../support/monday");
const { notInLifecycle } = require("../support/utils");
const {
  labels: {
    issueWorkflow: { new: newLabel, assigned: assignedLabel },
  },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, action } =
    /** @type {import('@octokit/webhooks-types').IssuesAssignedEvent | import('@octokit/webhooks-types').IssuesUnassignedEvent } */ (
      context.payload
    );
  const monday = Monday(issue);
  const { labels, assignees: currentAssignees } = issue;
  const skippedLabels = [newLabel, assignedLabel];

  if (
    action === "unassigned" &&
    currentAssignees.length === 0 &&
    notInLifecycle({ labels, skip: skippedLabels }) &&
    !monday.inMilestoneStatus()
  ) {
    monday.addLabel(newLabel);
    console.info("Set status to unassigned.");
  } else if (
    action === "assigned" &&
    notInLifecycle({ labels, skip: skippedLabels }) &&
    !monday.inMilestoneStatus()
  ) {
    monday.addLabel(assignedLabel);
    console.info("Set status to assigned.");
  }

  monday.handleAssignees();
  await monday.commit();
};
