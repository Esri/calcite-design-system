// @ts-check
const { notInLifecycle, assertRequired } = require("../support/utils");
const Monday = require("../support/monday");
const {
  labels: {
    issueWorkflow: { new: newLabel, assigned: assignedLabel, needsMilestone },
  },
} = require("../support/resources");

/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ context }) => {
  const { issue, assignee, action } =
    /** @type {import('@octokit/webhooks-types').IssuesAssignedEvent | import('@octokit/webhooks-types').IssuesUnassignedEvent } */ (
      context.payload
    );
  const { assignees: currentAssignees, labels } = issue;
  assertRequired([assignee]);

  const monday = Monday(issue);
  // If unassigned action, no assignees left, not in lifecycle or milestone status:
  // set status to "Unassigned", no assignee updates
  if (
    action === "unassigned" &&
    currentAssignees.length === 0 &&
    notInLifecycle({ labels }) &&
    !monday.inMilestoneStatus()
  ) {
    monday.addLabel(newLabel);
    console.info("Set status to unassigned, no assignees updated.");
  }
  // If assigned action, not in lifecycle or milestone status besides "needs milestone":
  // set status to "Assigned", update assignees
  else if (action === "assigned" && notInLifecycle({ labels, skip: [needsMilestone] }) && !monday.inMilestoneStatus()) {
    monday.addLabel(assignedLabel);
    monday.addAllAssignees();
    console.info("Update assignees, set status to assigned.");
  } else if (currentAssignees.length > 0) {
    monday.addAllAssignees();
    console.info("Update assignees, no status change.");
  }

  await monday.commit();
};
