// @ts-check
const Monday = require("../support/monday");
const { assertRequired } = require("../support/utils");

/**
 * @typedef {object} SyncActionChangesInputs
 * Incoming inputs from the "SyncActionChanges" event dispatch
 * @property {number} issue_number - The target issue number for syncing changes.
 * @property {boolean} [milestone_updated] - Indicates if the milestone was updated.
 * @property {boolean} [assignee_updated] - Indicates if the assignees were updated.
 * @property {"open" | "closed"} [state_updated] - Indicates if the state (open/closed) was updated.
 * @property {string} [label_name] - The label name added or removed from the issue.
 * @property {"added" | "removed"} [label_action] - The action taken on the label.
 */

/**
 * When another workflow emits the "SyncActionChanges" event:
 * 1. If `milestone_updated`: Updates the milestone through `handleMilestone()`
 * 2. If `assignee_updated`: Updates all assignees through `handleAssignees()`
 * 3. If `state_updated`: Updates the issue state through `handleState()`
 * 4. If `label_name` and `label_action` are provided: Adds or removes the label through `addLabel()` or `clearLabel()`
 */
/** @param {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */
module.exports = async ({ github, context, core }) => {
  const /** @type {SyncActionChangesInputs} */ {
    issue_number: issue_number_input,
    milestone_updated,
    assignee_updated,
    state_updated,
    label_name,
    label_action,
  } = context.payload.inputs;

  const [issue_number] = assertRequired([issue_number_input], core, "Required issue number not provided.");
  const { data: issue } = await github.rest.issues.get({
    ...context.repo,
    issue_number,
  });

  const monday = Monday(issue, core);

  if (milestone_updated) {
    monday.handleMilestone();
  }
  if (assignee_updated) {
    monday.handleAssignees();
  }
  if (state_updated) {
    monday.handleState(state_updated);
  }
  if (label_name && label_action) {
    if (label_action === "added") {
      monday.addLabel(label_name);
    } else {
      monday.clearLabel(label_name);
    }
  }

  await monday.commit();
};
