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
    productColor,
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
 * @param {import('@actions/core')} core - The core library for logging and reporting workflow status
 * @param {import('./utils').UpdateBodyCallback} updateIssueBody - A callback to update the Issue body with correct context
 */
module.exports = function Monday(issue, core, updateIssueBody) {
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

  /** @type {boolean} - Whether to create new column values in Monday.com if they do not exist */
  let createLabelsIfMissing = false;

  /**
   * Monday.com column value options
   * @typedef {string | number | { url: string, text: string } | { labels: string[] }} ColumnValue
   */
  /** @type {Record<string, ColumnValue>} */
  let columnUpdates = {};

  /** @typedef {object} MondayColumn
   * @property {string} id - The Monday.com column ID
   * @property {string} title - The Monday.com column title. Used for logging, not critical to functionality
   * @property {"multiMutable" | "multiAppendable"} [type] - The type of the column, used for special handling
   */
  /** @type {Record<string, MondayColumn>} */
  const mondayColumns = {
    /* eslint-disable @cspell/spellchecker -- Monday IDs may include segments with randomized characters */
    title: { id: "name", title: "Item" },
    issueNumber: { id: "numeric_mknk2xhh", title: "Issue Number" },
    link: { id: "link", title: "GH Link" },
    designers: { id: "people", title: "Designer", type: "multiAppendable" },
    developers: {
      id: "multiple_person_mkt920b0",
      title: "Developer",
      type: "multiAppendable",
    },
    productEngineers: {
      id: "multiple_person_mkt9pzj9",
      title: "Verified by",
      type: "multiAppendable",
    },
    allAssignees: {
      id: "multiple_person_mm0pwfy",
      title: "Github Assignee",
      type: "multiAppendable",
    },
    status: { id: "dup__of_overall_status__1", title: "Status" },
    date: { id: "date6", title: "Milestone" },
    priority: { id: "priority", title: "Priority" },
    typeDropdown: {
      id: "dropdown_mkwhjde2",
      title: "Issue Type",
      type: "multiMutable",
    },
    product: { id: "dropdown_mkwzz3b", title: "Esri Team", type: "multiMutable" },
    designEstimate: { id: "color_mkrbg2b9", title: "Design Estimate" },
    devEstimate: { id: "numeric_mkswahrw", title: "Dev Estimate" },
    designIssue: { id: "color_mkswbke0", title: "Design Issue" },
    stalled: { id: "color_mkv79bbx", title: "Stalled" },
    blocked: { id: "color_mkv7x1gw", title: "Blocked" },
    spike: { id: "color_mkrt20dy", title: "Spike" },
    figmaChanges: { id: "color_mkrvmhg7", title: "Figma Changes" },
    open: { id: "color_mknkrb2n", title: "Open/Closed" },
    /* eslint-enable @cspell/spellchecker */
  };

  /** @typedef {object} MondayLabel
   * @property {MondayColumn} column - The Monday.com column the label is synced to.
   * @property {string | number} value - The value to set in the column.
   * @property {boolean} [clearable] - Whether the label can be cleared from the column.
   */
  /** @type {Map<string, MondayLabel>} */
  const labelMap = new Map([
    [
      issueWorkflow.needsTriage,
      {
        column: mondayColumns.status,
        value: "Needs Triage",
      },
    ],
    [
      issueWorkflow.needsMilestone,
      {
        column: mondayColumns.status,
        value: "Needs Milestone",
      },
    ],
    [
      planning.spike,
      {
        column: mondayColumns.spike,
        value: "Spike",
        clearable: true,
      },
    ],
    [
      planning.spikeComplete,
      {
        column: mondayColumns.spike,
        value: "Spike Complete",
        clearable: true,
      },
    ],
    [
      planning.blocked,
      {
        column: mondayColumns.blocked,
        value: "Blocked",
        clearable: true,
      },
    ],
    [
      issueWorkflow.inDesign,
      {
        column: mondayColumns.status,
        value: "In Design",
      },
    ],
    [
      issueWorkflow.readyForDev,
      {
        column: mondayColumns.status,
        value: "Ready for Dev",
      },
    ],
    [
      issueWorkflow.inDevelopment,
      {
        column: mondayColumns.status,
        value: "In Development",
      },
    ],
    [
      issueWorkflow.installed,
      {
        column: mondayColumns.status,
        value: "Installed",
      },
    ],
    [
      issueType.design,
      {
        column: mondayColumns.designIssue,
        value: "Design",
        clearable: true,
      },
    ],
    [
      issueType.a11y,
      {
        column: mondayColumns.typeDropdown,
        value: "a11y",
        clearable: true,
      },
    ],
    [
      issueType.bug,
      {
        column: mondayColumns.typeDropdown,
        value: "Bug",
        clearable: true,
      },
    ],
    [
      issueType.chore,
      {
        column: mondayColumns.typeDropdown,
        value: "Chore",
        clearable: true,
      },
    ],
    [
      issueType.designTokens,
      {
        column: mondayColumns.typeDropdown,
        value: "Design Tokens",
        clearable: true,
      },
    ],
    [
      packages.tokens,
      {
        column: mondayColumns.typeDropdown,
        value: "Design Tokens",
        clearable: true,
      },
    ],
    [
      issueType.docs,
      {
        column: mondayColumns.typeDropdown,
        value: "Docs",
        clearable: true,
      },
    ],
    [
      issueType.enhancement,
      {
        column: mondayColumns.typeDropdown,
        value: "Enhancement",
        clearable: true,
      },
    ],
    [
      issueType.i18nL10n,
      {
        column: mondayColumns.typeDropdown,
        value: "i18n-l10n",
        clearable: true,
      },
    ],
    [
      issueType.newComponent,
      {
        column: mondayColumns.typeDropdown,
        value: "New Component",
        clearable: true,
      },
    ],
    [
      issueType.refactor,
      {
        column: mondayColumns.typeDropdown,
        value: "Refactor",
        clearable: true,
      },
    ],
    [
      bug.regression,
      {
        column: mondayColumns.typeDropdown,
        value: "Regression",
        clearable: true,
      },
    ],
    [
      issueType.research,
      {
        column: mondayColumns.typeDropdown,
        value: "Research",
        clearable: true,
      },
    ],
    [
      issueType.test,
      {
        column: mondayColumns.typeDropdown,
        value: "Testing",
        clearable: true,
      },
    ],
    [
      issueType.tooling,
      {
        column: mondayColumns.typeDropdown,
        value: "Tooling",
        clearable: true,
      },
    ],
    [
      priority.low,
      {
        column: mondayColumns.priority,
        value: "Low",
      },
    ],
    [
      priority.medium,
      {
        column: mondayColumns.priority,
        value: "Medium",
      },
    ],
    [
      priority.high,
      {
        column: mondayColumns.priority,
        value: "High",
      },
    ],
    [
      priority.critical,
      {
        column: mondayColumns.priority,
        value: "Critical",
      },
    ],
    [
      devEstimate.one,
      {
        column: mondayColumns.devEstimate,
        value: 1,
      },
    ],
    [
      devEstimate.two,
      {
        column: mondayColumns.devEstimate,
        value: 2,
      },
    ],
    [
      devEstimate.three,
      {
        column: mondayColumns.devEstimate,
        value: 3,
      },
    ],
    [
      devEstimate.five,
      {
        column: mondayColumns.devEstimate,
        value: 5,
      },
    ],
    [
      devEstimate.eight,
      {
        column: mondayColumns.devEstimate,
        value: 8,
      },
    ],
    [
      devEstimate.thirteen,
      {
        column: mondayColumns.devEstimate,
        value: 13,
      },
    ],
    [
      devEstimate.twentyOne,
      {
        column: mondayColumns.devEstimate,
        value: 21,
      },
    ],
    [
      devEstimate.thirtyFour,
      {
        column: mondayColumns.devEstimate,
        value: 34,
      },
    ],
    [
      designEstimate.small,
      {
        column: mondayColumns.designEstimate,
        value: "Small",
      },
    ],
    [
      designEstimate.medium,
      {
        column: mondayColumns.designEstimate,
        value: "Medium",
      },
    ],
    [
      designEstimate.large,
      {
        column: mondayColumns.designEstimate,
        value: "Large",
      },
    ],
    [
      handoff.figmaChanges,
      {
        column: mondayColumns.figmaChanges,
        value: "Figma Changes Only",
        clearable: true,
      },
    ],
    [
      milestone.stalled,
      {
        column: mondayColumns.stalled,
        value: "Stalled",
        clearable: true,
      },
    ],
  ]);

  /**
   * @typedef {object} MondayPerson
   * @property {MondayColumn} role - The role of the person (e.g., developers, designers, productEngineers)
   * @property {number} id - The Monday.com user ID
   */
  /** @type {Map<string, MondayPerson>} */
  const peopleMap = new Map([
    /* eslint-disable @cspell/spellchecker -- GitHub usernames */
    ["anveshmekala", { role: mondayColumns.developers, id: 48387134 }],
    ["aPreciado88", { role: mondayColumns.developers, id: 60795249 }],
    ["ashetland", { role: mondayColumns.designers, id: 45851619 }],
    ["benelan", { role: mondayColumns.developers, id: 49704471 }],
    ["brendan-vincent-rice", { role: mondayColumns.developers, id: 96903694 }],
    ["chezHarper", { role: mondayColumns.designers, id: 71157966 }],
    ["DintaMel", { role: mondayColumns.productEngineers, id: 92955697 }],
    ["DitwanP", { role: mondayColumns.productEngineers, id: 53683093 }],
    ["driskull", { role: mondayColumns.developers, id: 45944985 }],
    ["Elijbet", { role: mondayColumns.developers, id: 55852207 }],
    ["eriklharper", { role: mondayColumns.developers, id: 49699973 }],
    ["geospatialem", { role: mondayColumns.productEngineers, id: 45853373 }],
    ["isaacbraun", { role: mondayColumns.productEngineers, id: 76547859 }],
    ["jcfranco", { role: mondayColumns.developers, id: 45854945 }],
    ["macandcheese", { role: mondayColumns.developers, id: 45854918 }],
    ["matgalla", { role: mondayColumns.designers, id: 69473378 }],
    ["rmstinson", { role: mondayColumns.designers, id: 47277636 }],
    ["SkyeSeitz", { role: mondayColumns.designers, id: 45854937 }],
    ["Amretasre002762670", { role: mondayColumns.developers, id: 77031889 }],
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
      core.warning(
        `Assignee "${person.login}" not found in peopleMap.`,
        logParams,
      );
      return;
    }

    let role = info.role;
    const notInstalledOrVerified = labels?.every(
      (label) =>
        label.name !== issueWorkflow.installed &&
        label.name !== issueWorkflow.verified,
    );
    if (
      role.id === mondayColumns.productEngineers.id &&
      notInstalledOrVerified
    ) {
      role = mondayColumns.developers;
    }

    setColumnValue(role, info.id);
    setColumnValue(mondayColumns.allAssignees, info.id);
    core.notice(
      `Added assignee "${person.login}" to "${role.title}" column.`,
      logParams,
    );
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
      const message = error instanceof Error ? error.message : String(error);
      return { response: null, error: message };
    }
  }

  /**
   * @typedef {object} UpdateError
   * @property {boolean} expected
   * @property {string} [message]
   */
  /**
   * @typedef {object} UpdateResponse
   * @property {UpdateError | null} error
   */
  /**
   * Builds an error object for multiple column update returns
   * @private
   * @param {object} params
   * @param {boolean} [params.expected] - Whether the error is expected or not
   * @param {Array<string | null>} params.messages - Array of error messages to be joined
   * @returns {UpdateResponse}
   */
  function buildUpdateError({ messages, expected }) {
    /** @type {UpdateError} */
    const updateError = { expected: !!expected };

    const filteredMessages = messages.filter(Boolean);
    if (filteredMessages.length) {
      updateError.message = filteredMessages.join(" ");
    }

    return { error: updateError };
  }

  /**
   * Creates and runs a query to update columns in a Monday.com item
   * @private
   * @param {string} syncId - The ID of the Monday.com item to update
   * @returns {Promise<UpdateResponse>}
   */
  async function updateMultipleColumns(syncId = "") {
    const id = syncId || (await getId())?.id;
    if (!id) {
      return buildUpdateError({
        expected: true,
        messages: ["Monday Task ID not found, cannot update columns."],
      });
    }

    const query = `mutation ChangeMultipleColumnValues($board_id: ID!, $item_id: ID!, $column_values: JSON!) {
      change_multiple_column_values(
        board_id: $board_id,
        item_id: $item_id,
        column_values: $column_values
        ${createLabelsIfMissing ? ", create_labels_if_missing: true" : ""}
      ) {
        id
      }
    }`;

    /** @type {QueryVariables} */
    const queryVariables = {
      board_id: MONDAY_BOARD,
      item_id: id,
      column_values: JSON.stringify(columnUpdates),
    };

    const { response, error } = await runQuery(query, queryVariables);
    if (error || !response?.data?.change_multiple_column_values) {
      const baseMessage = `Failed to update columns for ID ${id}.`;
      const errorDetail = error || JSON.stringify(response?.errors);
      const queriedId = await queryForId();
      if (!queriedId || queriedId === id) {
        const skippedMessage = queriedId
          ? `Retry skipped because the queried ID (${queriedId}) matches the current item ID.`
          : `Retry skipped because no alternate item ID was found.`;
        return buildUpdateError({
          messages: [baseMessage, skippedMessage, errorDetail],
        });
      }

      queryVariables.item_id = queriedId;
      const { response: retryResponse, error: retryError } = await runQuery(
        query,
        queryVariables,
      );
      if (retryError || !retryResponse?.data?.change_multiple_column_values) {
        const retryErrorDetail = retryError || JSON.stringify(retryResponse?.errors);
        return buildUpdateError({
          messages: [
            baseMessage,
            `Retry failed for queried ID ${queriedId}.`,
            `Original error: ${error}.`,
            `Retry error: ${retryErrorDetail}.`,
          ],
        });
      }

      await updateBodyWithId(queriedId);
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
      column_id: mondayColumns.issueNumber.id,
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
    await updateBodyWithId(id);
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
   * Add or remove a label from a multiMutable object. Creates a new object if none exists.
   * @private
   * @param {MondayLabel} labelInfo - The label information
   * @param {("add" | "remove")} action - The action to perform: "add" or "remove"
   * @returns {{ labels: string[] } | string} - The updated multiMutable object or an empty string if no labels remain
   */
  function updateMultiMutableValue(labelInfo, action) {
    if (action !== "add" && action !== "remove") {
      throw new Error(
        `Invalid action "${action}" in updateMultiMutableValue. Use "add" or "remove".`,
      );
    }

    const labelValue = `${labelInfo.value}`;
    const currentValue = columnUpdates[labelInfo.column.id];
    const existingLabels =
      currentValue &&
      typeof currentValue === "object" &&
      "labels" in currentValue
        ? currentValue.labels
        : [];

    if (existingLabels.length === 0 && labels?.length) {
      for (const { name, color } of labels) {
        createProductLabelIfNeeded(name, color);
        const info = labelMap.get(name);
        if (info?.column.id === labelInfo.column.id && info.value) {
          existingLabels.push(`${info.value}`);
        }
      }
    }

    const valueSet = new Set(existingLabels);
    const present = valueSet.has(labelValue);
    if (action === "add" && !present) {
      valueSet.add(labelValue);
    } else if (action === "remove" && present) {
      valueSet.delete(labelValue);
    }

    return valueSet.size ? { labels: Array.from(valueSet) } : "";
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

    const isMultiMutable= info.column.type === "multiMutable";
    if (action === "add") {
      setColumnValue(
        info.column,
        isMultiMutable ? updateMultiMutableValue(info, "add") : info.value,
        logParams,
      );
    } else if (info.clearable) {
      setColumnValue(
        info.column,
        isMultiMutable ? updateMultiMutableValue(info, "remove") : "",
        logParams,
      );
    }
  }

  /** Public functions */

  /**
   * Find the Monday.com item ID for a issue and its source.
   * The ID is parsed from the issue body or queried from the Monday.com API based on the issue number.
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
      return;
    }

    core.notice("Updates committed successfully.", logParams);
    columnUpdates = {};
  }

  /**
   * Create a new item in Monday.com, or update an existing one if found
   * @returns {Promise<void>}
   */
  async function createTask() {
    const logParams = { title: "Create Task" };
    columnUpdates = {
      [mondayColumns.issueNumber.id]: `${issueNumber}`,
      [mondayColumns.link.id]: {
        url: html_url,
        text: `${issueNumber}`,
      },
    };

    if (labels?.length) {
      labels.forEach((label) => addLabel(label.name, label.color));
    }

    if (notInLifecycle({ labels })) {
      addLabel(issueWorkflow.needsTriage);
    }

    if (assignees.length) {
      setAssignedStatus();
      handleAssignees();
    }

    if (issueMilestone) {
      handleMilestone();
    }

    const { id: syncId } = await getId();
    if (syncId) {
      core.notice(
        `Sync ID "${syncId}" provided, updating existing item instead of creating new.`,
        logParams,
      );
      setColumnValue(mondayColumns.title, issue.title);
      handleState();

      const { error } = await updateMultipleColumns(syncId);

      if (error) {
        if (error.expected) {
          core.warning(
            `Expected error syncing item ${syncId}: ${error.message}`,
            logParams,
          );
        } else {
          core.setFailed(`Error syncing item ${syncId}: ${error.message}`);
        }
      }

      return;
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
    const createdId = response?.data?.create_item?.id;
    if (error || !createdId) {
      core.setFailed(error || `Failed creating item for issue #${issueNumber}`);
      return;
    }

    await updateBodyWithId(createdId);
  }

  /**
   * Set a specific column value in columnUpdates.
   * If `column.type` is `"multiAppendable"` and `value` is not empty, the value will be appended via comma-separation to any existing values in the column.
   * @param {MondayColumn} column
   * @param {ColumnValue} value
   * @param {import('@actions/core').AnnotationProperties} [logParams] - Optional logging parameters
   */
  function setColumnValue(
    column,
    value,
    logParams = { title: "Set Column Value" },
  ) {
    if (!column) {
      core.warning("No column provided.", logParams);
      return;
    }
    if (value == null) {
      core.warning("No value provided.", logParams);
      return;
    }

    const existingValue = columnUpdates[column.id];
    const newValue =
      column.type === "multiAppendable" && value !== ""
        ? existingValue
          ? `${existingValue}, ${value}`
          : `${value}`
        : value;

    columnUpdates[column.id] = newValue;
    core.notice(
      value === ""
        ? `Cleared "${column.title}" column.`
        : `Set "${column.title}" column to: ${JSON.stringify(value)}.`,
      logParams,
    );
  }

  /**
   * Update columnUpdates based on milestone title
   */
  function handleMilestone() {
    const logParams = { title: "Handle Milestone" };
    if (!issueMilestone) {
      setColumnValue(mondayColumns.date, "", logParams);
      clearLabel(milestone.stalled);
      return;
    }
    const milestoneTitle = issueMilestone.title;
    const milestoneDateRegex = /\d{4}-\d{2}-\d{2}/;
    const milestoneDate = milestoneTitle.match(milestoneDateRegex)?.[0];

    if (milestoneDate) {
      setColumnValue(mondayColumns.date, milestoneDate, logParams);
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
    } else {
      setColumnValue(mondayColumns.date, "", logParams);

      if (milestoneTitle === milestone.stalled) {
        addLabel(milestone.stalled);
      } else if (inMilestoneStatus()) {
        setColumnValue(mondayColumns.status, milestoneTitle, logParams);
        clearLabel(milestone.stalled);
      }
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
    const ADDING_TO_KIT = "Adding to Kit";
    const logParams = { title: "Handle State" };

    if (!issue.state) {
      core.warning("No Issue state provided.", logParams);
      return;
    }

    setColumnValue(mondayColumns.open, stateMap[issue.state], logParams);

    if (action === "closed") {
      if (issue.state_reason !== "completed") {
        setColumnValue(mondayColumns.status, CLOSED, logParams);
      } else if (includesLabel(issue.labels, issueType.design)) {
        setColumnValue(mondayColumns.status, ADDING_TO_KIT, logParams);
      } else {
        setColumnValue(mondayColumns.status, DONE, logParams);
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

    [mondayColumns.developers, mondayColumns.productEngineers]
      .filter((role) => !(role.id in columnUpdates))
      .forEach((role) => {
        setColumnValue(role, "");
      });

    if (!assignees.length) {
      setColumnValue(mondayColumns.allAssignees, "");
    }
  }

  /**
   * Add a label to columnUpdates
   * @param {string} label - The label name to add
   * @param {string} [color] - The hex (without '#' prefix) color of the label. Used to create Esri Product labels.
   */
  function addLabel(label, color = "") {
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

    createProductLabelIfNeeded(label, color);
    updateLabel(label, "add");
  }

  /**
   * Clear a column value in columnUpdates based on the label
   * @param {string} label - The label name to clear
   * @param {string} [color] - The hex (without '#' prefix) color of the label. Used to create Esri Product labels.
   * @returns {void}
   */
  function clearLabel(label, color = "") {
    createProductLabelIfNeeded(label, color);
    updateLabel(label, "remove");
  }

  /**
   * If the label qualifies, create a Esri Product label in `labelMap` and set `createLabelsIfMissing` to `true`
   * @param {string} label - The label name
   * @param {string | undefined} color - The color of the label
   * @returns {void}
   */
  function createProductLabelIfNeeded(label, color) {
    if (labelMap.has(label) || color !== productColor) {
      return;
    }

    /** @type {MondayLabel} */
    const labelInfo = {
      column: mondayColumns.product,
      value: label.replace(/(for )?ArcGIS/g, "").trim(),
      clearable: true,
    };

    labelMap.set(label, labelInfo);
    createLabelsIfMissing = true;

    core.notice(`Created label "${labelInfo.value}" in label map.`, {
      title: "Create Esri Product Label",
    });
  }

  /**
   * Inserts or replaces the Monday sync line in the issue body string
   * @param {string} mondayID - The Monday.com item ID
   */
  async function updateBodyWithId(mondayID) {
    const syncMarkdown = `**monday.com sync:** #${mondayID}\n\n`;
    const syncLineRegex = /^\*\*monday\.com sync:\*\* ?#?\d*\n?\n?/m;
    const updatedBody =
      body && syncLineRegex.test(body)
        ? body.replace(syncLineRegex, syncMarkdown)
        : syncMarkdown + (body || "");
    await updateIssueBody(issueNumber, updatedBody);
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
      setColumnValue(mondayColumns.status, ASSIGNED, logParams);
    } else if (!assignee && shouldSetUnassigned) {
      setColumnValue(mondayColumns.status, UNASSIGNED, logParams);
    } else {
      core.notice("Status not changed based on assignment.", logParams);
    }
  }

  return {
    mondayColumns,
    commit,
    createTask,
    setColumnValue,
    setAssignedStatus,
    handleMilestone,
    handleState,
    handleAssignees,
    addLabel,
    clearLabel,
    inMilestoneStatus,
  };
};
