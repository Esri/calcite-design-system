// @ts-check
const {
  labels: {
    bug,
    issueWorkflow,
    issueType,
    priority,
    devEstimate,
    designEstimate,
    planning,
    handoff,
  },
  milestone,
  packages,
} = require("./resources");
const { includesLabel, notInLifecycle } = require("./utils");

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {import('@actions/core')} core
 * @returns {asserts env is NodeJS.ProcessEnv & { MONDAY_KEY: string; MONDAY_BOARD: string }}
 */
function assertMondayEnv(env, core) {
  if (!env.MONDAY_KEY || !env.MONDAY_BOARD) {
    core.setFailed("A Monday.com env variable is not set.");
    process.exit(1);
  }
}

/**
 * @param {import('@octokit/webhooks-types').Issue} issue - The GitHub issue object
 * @param {import('@actions/core')} core
 */
module.exports = function Monday(issue, core) {
  assertMondayEnv(process.env, core);
  const { MONDAY_KEY, MONDAY_BOARD } = process.env;
  if (!issue) {
    core.setFailed("No GitHub issue provided.");
    process.exit(1);
  }

  const {
    title,
    body,
    number: issueNumber,
    milestone: issueMilestone,
    labels,
    assignee,
    assignees,
    html_url,
  } = issue;

  /**
   * Monday.com column value options
   * @typedef {string | number | { url: string, text: string } | { labels: string[] }} ColumnValue
   */
  /** @type {Record<string, ColumnValue>} */
  let columnUpdates = {};

  const columnIds = {
    /* eslint-disable @cspell/spellchecker -- Monday IDs may include segments with randomized characters */
    title: "name",
    issueNumber: "numeric_mknk2xhh",
    link: "link",
    designers: "people",
    developers: "multiple_person_mkt920b0",
    productEngineers: "multiple_person_mkt9pzj9",
    status: "dup__of_overall_status__1",
    date: "date6",
    priority: "priority",
    typeDropdown: "dropdown_mkwhjde2",
    designEstimate: "color_mkrbg2b9",
    devEstimate: "numeric_mkswahrw",
    designIssue: "color_mkswbke0",
    stalled: "color_mkv79bbx",
    blocked: "color_mkv7x1gw",
    spike: "color_mkrt20dy",
    figmaChanges: "color_mkrvmhg7",
    open: "color_mknkrb2n",
    /* eslint-enable @cspell/spellchecker */
  };

  /** @typedef {{ column: string, value: string | number, clearable?: boolean }} MondayLabel */
  /** @type {Map<string, MondayLabel>} */
  const labelMap = new Map([
    [
      issueWorkflow.needsTriage,
      {
        column: columnIds.status,
        value: "Needs Triage",
      },
    ],
    [
      issueWorkflow.needsMilestone,
      {
        column: columnIds.status,
        value: "Needs Milestone",
      },
    ],
    [
      planning.spike,
      {
        column: columnIds.spike,
        value: "Spike",
        clearable: true,
      },
    ],
    [
      planning.spikeComplete,
      {
        column: columnIds.spike,
        value: "Spike Complete",
        clearable: true,
      },
    ],
    [
      planning.blocked,
      {
        column: columnIds.blocked,
        value: "Blocked",
        clearable: true,
      },
    ],
    [
      issueWorkflow.inDesign,
      {
        column: columnIds.status,
        value: "In Design",
      },
    ],
    [
      issueWorkflow.readyForDev,
      {
        column: columnIds.status,
        value: "Ready for Dev",
      },
    ],
    [
      issueWorkflow.inDevelopment,
      {
        column: columnIds.status,
        value: "In Development",
      },
    ],
    [
      issueWorkflow.installed,
      {
        column: columnIds.status,
        value: "Installed",
      },
    ],
    [
      issueWorkflow.verified,
      {
        column: columnIds.status,
        value: "Verified",
      },
    ],
    [
      issueType.design,
      {
        column: columnIds.designIssue,
        value: "Design",
        clearable: true,
      },
    ],
    [
      issueType.a11y,
      {
        column: columnIds.typeDropdown,
        value: "a11y",
        clearable: true,
      },
    ],
    [
      issueType.bug,
      {
        column: columnIds.typeDropdown,
        value: "Bug",
        clearable: true,
      },
    ],
    [
      issueType.chore,
      {
        column: columnIds.typeDropdown,
        value: "Chore",
        clearable: true,
      },
    ],
    [
      issueType.designTokens,
      {
        column: columnIds.typeDropdown,
        value: "Design Tokens",
        clearable: true,
      },
    ],
    [
      packages.tokens,
      {
        column: columnIds.typeDropdown,
        value: "Design Tokens",
        clearable: true,
      },
    ],
    [
      issueType.docs,
      {
        column: columnIds.typeDropdown,
        value: "Docs",
        clearable: true,
      },
    ],
    [
      issueType.enhancement,
      {
        column: columnIds.typeDropdown,
        value: "Enhancement",
        clearable: true,
      },
    ],
    [
      issueType.newComponent,
      {
        column: columnIds.typeDropdown,
        value: "New Component",
        clearable: true,
      },
    ],
    [
      issueType.refactor,
      {
        column: columnIds.typeDropdown,
        value: "Refactor",
        clearable: true,
      },
    ],
    [
      bug.regression,
      {
        column: columnIds.typeDropdown,
        value: "Regression",
        clearable: true,
      },
    ],
    [
      issueType.research,
      {
        column: columnIds.typeDropdown,
        value: "Research",
        clearable: true,
      },
    ],
    [
      issueType.test,
      {
        column: columnIds.typeDropdown,
        value: "Testing",
        clearable: true,
      },
    ],
    [
      issueType.tooling,
      {
        column: columnIds.typeDropdown,
        value: "Tooling",
        clearable: true,
      },
    ],
    [
      priority.low,
      {
        column: columnIds.priority,
        value: "Low",
      },
    ],
    [
      priority.medium,
      {
        column: columnIds.priority,
        value: "Medium",
      },
    ],
    [
      priority.high,
      {
        column: columnIds.priority,
        value: "High",
      },
    ],
    [
      priority.critical,
      {
        column: columnIds.priority,
        value: "Critical",
      },
    ],
    [
      devEstimate.one,
      {
        column: columnIds.devEstimate,
        value: 1,
      },
    ],
    [
      devEstimate.two,
      {
        column: columnIds.devEstimate,
        value: 2,
      },
    ],
    [
      devEstimate.three,
      {
        column: columnIds.devEstimate,
        value: 3,
      },
    ],
    [
      devEstimate.five,
      {
        column: columnIds.devEstimate,
        value: 5,
      },
    ],
    [
      devEstimate.eight,
      {
        column: columnIds.devEstimate,
        value: 8,
      },
    ],
    [
      devEstimate.thirteen,
      {
        column: columnIds.devEstimate,
        value: 13,
      },
    ],
    [
      devEstimate.twentyOne,
      {
        column: columnIds.devEstimate,
        value: 21,
      },
    ],
    [
      devEstimate.thirtyFour,
      {
        column: columnIds.devEstimate,
        value: 34,
      },
    ],
    [
      designEstimate.small,
      {
        column: columnIds.designEstimate,
        value: "Small",
      },
    ],
    [
      designEstimate.medium,
      {
        column: columnIds.designEstimate,
        value: "Medium",
      },
    ],
    [
      designEstimate.large,
      {
        column: columnIds.designEstimate,
        value: "Large",
      },
    ],
    [
      handoff.figmaChanges,
      {
        column: columnIds.figmaChanges,
        value: "Figma Changes Only",
        clearable: true,
      },
    ],
    [
      milestone.stalled,
      {
        column: columnIds.stalled,
        value: "Stalled",
        clearable: true,
      },
    ],
  ]);

  /**
   * @typedef {object} MondayPerson
   * @property {string} role - The role of the person (e.g., developers, designers, productEngineers)
   * @property {number} id - The Monday.com user ID
   */
  /** @type {Map<string, MondayPerson>} */
  const peopleMap = new Map([
    /* eslint-disable @cspell/spellchecker -- GitHub usernames */
    ["anveshmekala", { role: columnIds.developers, id: 48387134 }],
    ["aPreciado88", { role: columnIds.developers, id: 60795249 }],
    ["ashetland", { role: columnIds.designers, id: 45851619 }],
    ["benelan", { role: columnIds.developers, id: 49704471 }],
    ["chezHarper", { role: columnIds.designers, id: 71157966 }],
    ["DintaMel", { role: columnIds.productEngineers, id: 92955697 }],
    ["DitwanP", { role: columnIds.productEngineers, id: 53683093 }],
    ["driskull", { role: columnIds.developers, id: 45944985 }],
    ["Elijbet", { role: columnIds.developers, id: 55852207 }],
    ["eriklharper", { role: columnIds.developers, id: 49699973 }],
    ["geospatialem", { role: columnIds.productEngineers, id: 45853373 }],
    ["isaacbraun", { role: columnIds.productEngineers, id: 76547859 }],
    ["jcfranco", { role: columnIds.developers, id: 45854945 }],
    ["macandcheese", { role: columnIds.developers, id: 45854918 }],
    ["matgalla", { role: columnIds.designers, id: 69473378 }],
    ["rmstinson", { role: columnIds.designers, id: 47277636 }],
    ["SkyeSeitz", { role: columnIds.designers, id: 45854937 }],
    ["Amretasre002762670", { role: columnIds.developers, id: 77031889 }],
    /* eslint-enable @cspell/spellchecker */
  ]);

  /** @type {Record<Exclude<import('@octokit/webhooks-types').Issue["state"], undefined>, string>} */
  const stateMap = {
    open: "Open",
    closed: "Closed",
  };

  /** Private helper functions */

  /**
   * Assigns a person to columnUpdates based on their GitHub username/role
   * @private
   * @param {import('@octokit/webhooks-types').User} person
   */
  function addAssignee(person) {
    const logParams = { title: "Add Assignee" };
    if (!person?.login) {
      core.warning("No person or login provided.", logParams);
      return;
    }

    const info = peopleMap.get(person.login);
    if (!info) {
      core.warning(`Assignee ${person.login} not found in peopleMap.`, logParams);
      return;
    }

    let role = info.role;
    const notInstalledOrVerified = labels?.every(
      (label) =>
        label.name !== issueWorkflow.installed &&
        label.name !== issueWorkflow.verified,
    );
    if (role === columnIds.productEngineers && notInstalledOrVerified) {
      role = columnIds.developers;
    }

    if (columnUpdates[role]) {
      columnUpdates[role] += `, ${info.id}`;
    } else {
      columnUpdates[role] = `${info.id}`;
    }
    core.notice(`Added assignee ${person.login} to ${role} column.`, logParams);
  }

  /** @typedef {Record<string, string | string[]>} QueryVariables
  /**
   * Calls the Monday.com API with a provided query.
   * Does not handle API errors. The caller should handle errors and look for required shape of response.
   * @private
   * @param {string} query - The GraphQL query string
   * @param {QueryVariables} variables - The variables for the GraphQL query
   * @returns {Promise<{ response: any, error: string | null }>}
   */
  async function runQuery(query, variables = {}) {
    try {
      const response = await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: MONDAY_KEY,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        return {
          response: null,
          error: `${response.status} (${response.statusText}) from API: ${JSON.stringify(errorBody)}`,
        };
      }
      return { response: await response.json(), error: null };
    } catch (error) {
      return { response: null, error: error.message };
    }
  }

  /**
   * Creates and runs a query to update columns in a Monday.com item
   * @private
   * @param {string} id - The ID of the Monday.com item to update
   * @returns {Promise<{ error: null | { message: string, expected?: boolean } }>} -
   */
  async function updateMultipleColumns(id = "") {
    const mondayId = id || (await getId())?.id;
    if (!mondayId) {
      return {
        error: {
          expected: true,
          message: "Monday Task not found, cannot update columns.",
        },
      };
    }

    const query = `mutation ChangeMultipleColumnValues($board_id: ID!, $item_id: ID!, $column_values: JSON!) {
      change_multiple_column_values(
        board_id: $board_id,
        item_id: $item_id,
        column_values: $column_values
      ) {
        id
      }
    }`;

    /** @type {QueryVariables} */
    const queryVariables = {
      board_id: MONDAY_BOARD,
      item_id: mondayId,
      column_values: JSON.stringify(columnUpdates),
    };

    const { response, error } = await runQuery(query, queryVariables);
    if (error || !response?.data?.change_multiple_column_values) {
      return {
        error: {
          message: `Failed to update columns for item ID ${mondayId}. ${error || ""}`,
        },
      };
    }
    return { error: null };
  }

  /**
   * Query Monday.com for an item matching the issue number
   * @private
   * @returns {Promise<string | undefined>} - The Monday.com item ID if found
   */
  async function queryForId() {
    const query = `query QueryForId($board_id: ID!, $column_id: String!, $column_values: [String!]!) {
      items_page_by_column_values(
        board_id: $board_id,
        columns: {
          column_id: $column_id,
          column_values: $column_values
        },
      ) {
        items {
          id
        }
      }
    }`;

    /** @type {QueryVariables} */
    const queryVariables = {
      board_id: MONDAY_BOARD,
      column_id: columnIds.issueNumber,
      column_values: [String(issueNumber)],
    };

    const { response, error } = await runQuery(query, queryVariables);
    if (error) {
      core.setFailed(error);
      return;
    }

    const items = response?.data?.items_page_by_column_values?.items ?? [];
    if (items.length === 0) {
      core.notice(`No Monday task found for Github Issue #${issueNumber}.`, {
        title: "Query for ID",
      });
      return;
    }

    if (items.length > 1) {
      core.setFailed(
        `Multiple Monday items found for Issue #${issueNumber}. Requires manual review.`,
      );
      return;
    }

    const [{ id }] = items;
    core.info(`Found existing Monday task for Issue #${issueNumber}: ${id}.`);
    return id;
  }

  /**
   * Attempt to extract a Monday.com item ID from the issue body
   * @private
   * @returns {string | undefined} - The extracted Monday.com item ID, or undefined if not found
   */
  function extractIdFromBody() {
    const mondayIdRegex = /(?<=\*\*monday\.com sync:\*\* #)(\d+)/;
    return body?.match(mondayIdRegex)?.[0];
  }

  /**
   * Add or remove a label from a DropdownValues object. Creates a new object if none exists.
   * @private
   * @param {MondayLabel} labelInfo - The label information
   * @param {("add" | "remove")} action - The action to perform: "add" or "remove"
   * @returns {{ labels: string[] } | string} - The updated dropdown object or an empty string if no labels remain
   */
  function createDropdownValues(labelInfo, action) {
    if (action !== "add" && action !== "remove") {
      throw new Error(
        `Invalid action "${action}" in createDropdownValues. Use "add" or "remove".`,
      );
    }

    const labelValue = `${labelInfo.value}`;
    const currentValue = columnUpdates[labelInfo.column];
    const existingLabels =
      currentValue &&
      typeof currentValue === "object" &&
      "labels" in currentValue
        ? currentValue.labels
        : [];

    if (existingLabels.length === 0 && labels?.length) {
      for (const { name } of labels) {
        const info = labelMap.get(name);
        if (info?.column === labelInfo.column && info.value) {
          existingLabels.push(`${info.value}`);
        }
      }
    }

    const dropdownSet = new Set(existingLabels);
    const present = dropdownSet.has(labelValue);
    if (action === "add" && !present) {
      dropdownSet.add(labelValue);
    } else if (action === "remove" && present) {
      dropdownSet.delete(labelValue);
    }

    return dropdownSet.size ? { labels: Array.from(dropdownSet) } : "";
  }

  /**
   * Update a label in columnUpdates based on the action
   * @private
   * @param {string} label - The label name to update
   * @param {("add" | "remove")} action - The action to perform
   */
  function updateLabel(label, action) {
    const logParams = { title: "Update Label" };
    if (!labelMap.has(label)) {
      core.notice(
        `Label "${label}" not found in Monday Labels map.`,
        logParams,
      );
      return;
    }

    const info = labelMap.get(label);
    if (!info?.column || !info?.value) {
      core.warning(
        `Label "${label}" is missing column or title information.`,
        logParams,
      );
      return;
    }

    const isDropdown = info.column === columnIds.typeDropdown;
    if (action === "add") {
      setColumnValue(
        info.column,
        isDropdown ? createDropdownValues(info, "add") : info.value,
      );
      core.notice(`Added "${label}" label to column updates.`, logParams);
    } else if (info.clearable) {
      setColumnValue(
        info.column,
        isDropdown ? createDropdownValues(info, "remove") : "",
      );
      core.notice(`Cleared "${label}" label in column updates.`, logParams);
    }
  }

  /** Public functions */

  /**
   * Find the Monday.com item ID for a issue and its source
   * ID is parsed from the issue body or fetched based on the issue number
   * @return {Promise<{ id: string | undefined, source: ("body" | "query")}>} - The Monday.com item ID
   */
  async function getId() {
    const bodyId = extractIdFromBody();
    if (bodyId) {
      return { id: bodyId, source: "body" };
    }

    return { id: await queryForId(), source: "query" };
  }

  /**
   * Commit any pending column updates to Monday.com
   * @returns {Promise<void>}
   */
  async function commit() {
    const logParams = { title: "Commit Updates" };
    if (Object.keys(columnUpdates).length === 0) {
      core.notice("No updates to commit.", logParams);
      return;
    }

    const { error } = await updateMultipleColumns();
    if (error) {
      const log = error.expected ? core.warning : core.setFailed;
      log(`Error committing updates: ${error.message}`);
    }
    core.notice("Updates committed successfully.", logParams);
    columnUpdates = {};
  }

  /**
   * Create a new task in Monday.com, or update an existing one if syncId is provided
   * @param {string} syncId - When provided, updates item in Monday instead of creating new
   * @returns {Promise<string | undefined>} - The ID of the created Monday.com item
   */
  async function createTask(syncId = "") {
    const logParams = { title: "Create Task" };
    columnUpdates = {
      [columnIds.issueNumber]: `${issueNumber}`,
      [columnIds.link]: {
        url: html_url,
        text: `${issueNumber}`,
      },
    };

    if (labels?.length) {
      labels.forEach((label) => addLabel(label.name));
    }

    if (notInLifecycle({ labels })) {
      addLabel(issueWorkflow.needsTriage);
    }

    if (assignees.length) {
      assignees.forEach((person) => addAssignee(person));
      setAssignedStatus();
    }

    if (issueMilestone) {
      handleMilestone();
    }

    if (syncId) {
      core.notice(
        `Sync ID ${syncId} provided, updating existing item instead of creating new.`,
        logParams,
      );
      setColumnValue(columnIds.title, issue.title);
      handleState();

      const { error } = await updateMultipleColumns(syncId);
      if (error) {
        const log = (/** @type {string} **/ msg) => error.expected ? core.warning(msg, logParams) : core.setFailed(msg);
        log(`Error syncing item ${syncId}: ${error.message}`);
        return;
      }

      return syncId;
    }

    const query = `mutation CreateItem($board_id: ID!, $item_name: String!, $column_values: JSON!) {
      create_item (
        board_id: $board_id,
        item_name: $item_name,
        column_values: $column_values
      ) {
        id
      }
    }`;

    /** @type {QueryVariables} */
    const queryVariables = {
      board_id: MONDAY_BOARD,
      item_name: title,
      column_values: JSON.stringify(columnUpdates),
    };

    const { response, error } = await runQuery(query, queryVariables);
    const id = response?.data?.create_item?.id;
    if (error || !id) {
      core.setFailed(error || `Failed creating item for issue #${issueNumber}`);
      return;
    }

    return id;
  }

  /**
   * Set a specific column value in columnUpdates
   * @param {string} column
   * @param {ColumnValue} value
   */
  function setColumnValue(column, value) {
    const logParams = { title: "Set Column Value" };
    if (!column) {
      core.warning("No column provided.", logParams);
      return;
    }
    if (value == null) {
      core.warning("No value provided.", logParams);
      return;
    }

    columnUpdates[column] = value;
  }

  /**
   * Update columnUpdates based on milestone title
   */
  function handleMilestone() {
    const logParams = { title: "Handle Milestone" };
    if (!issueMilestone) {
      setColumnValue(columnIds.date, "");
      clearLabel(milestone.stalled);
      core.notice("Date column cleared.", logParams);
      return;
    }
    const milestoneTitle = issueMilestone.title;
    const milestoneDateRegex = /\d{4}-\d{2}-\d{2}/;
    const milestoneDate = milestoneTitle.match(milestoneDateRegex)?.[0];

    if (milestoneDate) {
      setColumnValue(columnIds.date, milestoneDate);
      clearLabel(milestone.stalled);
      const { needsTriage, needsMilestone, installed, readyForDev } =
        issueWorkflow;
      setAssignedStatus({
        assignedCondition: notInLifecycle({
          labels,
          skip: [needsTriage, needsMilestone],
        }),
        unassignedCondition:
          !includesLabel(labels, installed) &&
          !includesLabel(labels, readyForDev),
      });
      core.notice(`Date column set to ${milestoneDate}.`, logParams);
    } else {
      setColumnValue(columnIds.date, "");

      if (milestoneTitle === milestone.stalled) {
        addLabel(milestone.stalled);
      } else if (inMilestoneStatus()) {
        setColumnValue(columnIds.status, milestoneTitle);
        clearLabel(milestone.stalled);
      }
      core.notice(
        `Status set to '${milestoneTitle}', Date column cleared.`,
        logParams,
      );
    }
  }

  /**
   * Set the Open/Closed and Status columns based on issue state
   * @param {("reopened" | "closed" | "open")} action - The action that triggered the state change
   * @returns {void}
   */
  function handleState(action = "open") {
    const CLOSED = "Closed";
    const DONE = "Done";
    const logParams = { title: "Handle State" };
    if (!issue.state) {
      core.warning("No Issue state provided.", { title: "Handle State" });
      return;
    }
    setColumnValue(columnIds.open, stateMap[issue.state]);
    core.notice(`Set Open column to '${stateMap[issue.state]}'.`, logParams);

    if (action === "closed") {
      if (issue.state_reason !== "completed") {
        setColumnValue(columnIds.status, CLOSED);
        core.notice(`Set Status column to '${CLOSED}'.`, logParams);
      } else if (!includesLabel(issue.labels, issueType.design)) {
        setColumnValue(columnIds.status, DONE);
        core.notice(`Set Status column to '${DONE}'.`, logParams);
      }
    }
  }

  /**
   * Handle assignment and removal of assignees. Add all assignees to their respective roles.
   * If there are no more developers or product engineers assigned, clear those columns.
   * @returns {void}
   */
  function handleAssignees() {
    assignees.forEach((assignee) => {
      addAssignee(assignee);
    });

    [columnIds.developers, columnIds.productEngineers].forEach((role) => {
      if (!(role in columnUpdates)) {
        setColumnValue(role, "");
      }
    });
  }

  /**
   * Add a label to columnUpdates
   * @param {string} label
   */
  function addLabel(label) {
    if (label === planning.monday) {
      return;
    }

    const { needsMilestone, readyForDev } = issueWorkflow;
    if (label === needsMilestone && includesLabel(labels, readyForDev)) {
      core.notice(
        `Skipping '${needsMilestone}' label as '${readyForDev}' is already applied.`,
        { title: "Add Label" },
      );
      return;
    }

    updateLabel(label, "add");
  }

  /**
   * Clear a column value in columnUpdates based on the label
   * @param {string} label - The label name to clear
   * @returns {void}
   */
  function clearLabel(label) {
    updateLabel(label, "remove");
  }

  /**
   * Inserts or replaces the Monday sync line in the issue body string
   * @param {string} mondayID - The Monday.com item ID
   * @returns {string} - The updated issue body
   */
  function addSyncLine(mondayID) {
    const syncMarkdown = `**monday.com sync:** #${mondayID}\n\n`;
    const syncLineRegex = /^\*\*monday\.com sync:\*\* #\d+\n\n?/m;
    if (body && syncLineRegex.test(body)) {
      return body.replace(syncLineRegex, syncMarkdown);
    } else {
      return syncMarkdown + (body || "");
    }
  }

  /**
   * Check if the current milestone is one of the "status" milestones
   * @returns {boolean} - True if in a status milestone, false otherwise
   */
  function inMilestoneStatus() {
    return [milestone.backlog, milestone.freezer].includes(
      issueMilestone?.title || "",
    );
  }

  /**
   * Set the issue status to "Unassigned" or "Assigned" based on assigned status.
   * Default condition is: if issue is open, not in lifecycle, and not in a milestone status.
   * @param {object} [params]
   * @param {boolean} [params.assignedCondition] - Condition to set status to "Assigned"
   * @param {boolean} [params.unassignedCondition] - Condition to set status to "Unassigned"
   * @returns {void}
   */
  function setAssignedStatus({ assignedCondition, unassignedCondition } = {}) {
    const ASSIGNED = "Assigned";
    const UNASSIGNED = "Unassigned";
    const logParams = { title: "Set Assigned Status" };
    const defaultCondition =
      issue.state === "open" &&
      notInLifecycle({ labels }) &&
      !inMilestoneStatus();
    const shouldSetAssigned = assignedCondition ?? defaultCondition;
    const shouldSetUnassigned = unassignedCondition ?? defaultCondition;

    if (assignee && shouldSetAssigned) {
      setColumnValue(columnIds.status, ASSIGNED);
      core.notice(`Status set to '${ASSIGNED}'.`, logParams);
    } else if (!assignee && shouldSetUnassigned) {
      setColumnValue(columnIds.status, UNASSIGNED);
      core.notice(`Status set to '${UNASSIGNED}'.`, logParams);
    } else {
      core.notice("Status not changed based on assignment.", logParams);
    }
  }

  return {
    columnIds,
    getId,
    commit,
    createTask,
    setColumnValue,
    setAssignedStatus,
    handleMilestone,
    handleState,
    handleAssignees,
    addLabel,
    clearLabel,
    addSyncLine,
    inMilestoneStatus,
  };
};
