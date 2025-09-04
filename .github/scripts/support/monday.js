// @ts-check
const {
  labels: { issueWorkflow, issueType, priority, devEstimate, designEstimate, planning, handoff },
  milestone,
} = require("./resources");
const { notReadyForDev, notInLifecycle } = require("./utils");

/**
 * @param {import('@octokit/webhooks-types').Issue} issue - The GitHub issue object
 */
module.exports = function Monday(issue) {
  const { MONDAY_KEY, MONDAY_BOARD } = process.env;
  if (!MONDAY_KEY || !MONDAY_BOARD) {
    throw new Error("A Monday.com env variable is not set.");
  }
  if (!issue) {
    throw new Error("No GitHub issue provided.");
  }

  const { title, body, number: issueNumber, milestone: issueMilestone, labels, assignee, assignees, html_url } = issue;

  let columnUpdates = {};

  /** Map Monday Column IDs */
  const columns = {
    title: "name",
    issueNumber: "numeric_mknk2xhh",
    link: "link",
    designers: "people",
    developers: "multiple_person_mkt920b0",
    productEngineers: "multiple_person_mkt9pzj9",
    status: "dup__of_overall_status__1",
    date: "date6",
    priority: "priority",
    issueType: "color_mkrbz0t1",
    designEstimate: "color_mkrbg2b9",
    devEstimate: "numeric_mkswahrw",
    designIssue: "color_mkswbke0",
    stalled: "color_mkv79bbx",
    blocked: "color_mkv7x1gw",
    a11y: "color_mksw1sfa",
    spike: "color_mkrt20dy",
    figmaChanges: "color_mkrvmhg7",
    open: "color_mknkrb2n",
  };
  /** Map Labels to Monday column/value pairs */
  const labelMap = new Map([
    [
      issueWorkflow.needsTriage,
      {
        column: columns.status,
        value: "Needs Triage",
      },
    ],
    [
      issueWorkflow.needsMilestone,
      {
        column: columns.status,
        value: "Needs Milestone",
      },
    ],
    [
      planning.spike,
      {
        column: columns.spike,
        value: "Spike",
      },
    ],
    [
      planning.spikeComplete,
      {
        column: columns.spike,
        value: "Spike Complete",
      },
    ],
    [
      planning.blocked,
      {
        column: columns.blocked,
        value: "Blocked",
      },
    ],
    [
      issueWorkflow.new,
      {
        column: columns.status,
        value: "Unassigned",
      },
    ],
    [
      issueWorkflow.assigned,
      {
        column: columns.status,
        value: "Assigned",
      },
    ],
    [
      issueWorkflow.inDesign,
      {
        column: columns.status,
        value: "In Design",
      },
    ],
    [
      issueWorkflow.readyForDev,
      {
        column: columns.status,
        value: "Ready for dev",
      },
    ],
    [
      issueWorkflow.inDevelopment,
      {
        column: columns.status,
        value: "In Development",
      },
    ],
    [
      issueWorkflow.installed,
      {
        column: columns.status,
        value: "Installed",
      },
    ],
    [
      issueWorkflow.verified,
      {
        column: columns.status,
        value: "Verified",
      },
    ],
    [
      issueType.design,
      {
        column: columns.designIssue,
        value: "Design",
      },
    ],
    [
      issueType.bug,
      {
        column: columns.issueType,
        value: "Bug",
      },
    ],
    [
      issueType.chore,
      {
        column: columns.issueType,
        value: "Chore",
      },
    ],
    [
      issueType.enhancement,
      {
        column: columns.issueType,
        value: "Enhancement",
      },
    ],
    [
      issueType.newComponent,
      {
        column: columns.issueType,
        value: "New Component",
      },
    ],
    [
      issueType.refactor,
      {
        column: columns.issueType,
        value: "Refactor",
      },
    ],
    [
      issueType.docs,
      {
        column: columns.issueType,
        value: "Docs",
      },
    ],
    [
      issueType.test,
      {
        column: columns.issueType,
        value: "Testing",
      },
    ],
    [
      issueType.tooling,
      {
        column: columns.issueType,
        value: "Tooling",
      },
    ],
    [
      issueType.a11y,
      {
        column: columns.a11y,
        value: "a11y",
      },
    ],
    [
      priority.low,
      {
        column: columns.priority,
        value: "Low",
      },
    ],
    [
      priority.medium,
      {
        column: columns.priority,
        value: "Medium",
      },
    ],
    [
      priority.high,
      {
        column: columns.priority,
        value: "High",
      },
    ],
    [
      priority.critical,
      {
        column: columns.priority,
        value: "Critical",
      },
    ],
    [
      devEstimate.one,
      {
        column: columns.devEstimate,
        value: 1,
      },
    ],
    [
      devEstimate.two,
      {
        column: columns.devEstimate,
        value: 2,
      },
    ],
    [
      devEstimate.three,
      {
        column: columns.devEstimate,
        value: 3,
      },
    ],
    [
      devEstimate.five,
      {
        column: columns.devEstimate,
        value: 5,
      },
    ],
    [
      designEstimate.small,
      {
        column: columns.designEstimate,
        value: "Small",
      },
    ],
    [
      designEstimate.medium,
      {
        column: columns.designEstimate,
        value: "Medium",
      },
    ],
    [
      designEstimate.large,
      {
        column: columns.designEstimate,
        value: "Large",
      },
    ],
    [
      handoff.figmaChanges,
      {
        column: columns.figmaChanges,
        value: "Figma Changes Only",
      },
    ],
    [
      milestone.stalled,
      {
        column: columns.stalled,
        value: "Stalled",
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
    ["anveshmekala", { role: columns.developers, id: 48387134 }],
    ["aPreciado88", { role: columns.developers, id: 6079524 }],
    ["ashetland", { role: columns.designers, id: 45851619 }],
    ["benelan", { role: columns.developers, id: 49704471 }],
    ["chezHarper", { role: columns.designers, id: 71157966 }],
    ["DitwanP", { role: columns.productEngineers, id: 53683093 }],
    ["driskull", { role: columns.developers, id: 45944985 }],
    ["Elijbet", { role: columns.developers, id: 55852207 }],
    ["eriklharper", { role: columns.developers, id: 49699973 }],
    ["geospatialem", { role: columns.productEngineers, id: 45853373 }],
    ["isaacbraun", { role: columns.productEngineers, id: 76547859 }],
    ["jcfranco", { role: columns.developers, id: 45854945 }],
    ["josercarcamo", { role: columns.developers, id: 56555749 }],
    ["macandcheese", { role: columns.developers, id: 45854918 }],
    ["matgalla", { role: columns.designers, id: 69473378 }],
    ["rmstinson", { role: columns.designers, id: 47277636 }],
    ["SkyeSeitz", { role: columns.designers, id: 45854937 }],
    ["Amretasre002762670", { role: columns.developers, id: 77031889 }],
  ]);

  /** Private helper functions */

  /**
   * Formats the values object for use in Monday.com API calls
   * @private
   * @param {object} values - The values object to format
   * @return {string} - The formatted values string
   */
  function formatValues(values) {
    return JSON.stringify(values).replace(/"/g, '\\"');
  }
  /**
   * Assigns a person to columnUpdates based on their GitHub username/role
   * @private
   * @param {import('@octokit/webhooks-types').User} person
   */
  function addAssignee(person) {
    if (!person?.login) {
      console.log("No person or login provided for assignment.");
      return;
    }

    const info = peopleMap.get(person.login);
    if (!info) {
      console.log(`Assignee ${person.login} not found in peopleMap.`);
      return;
    }

    if (columnUpdates[info.role]) {
      columnUpdates[info.role] += `, ${info.id}`;
    } else {
      columnUpdates[info.role] = `${info.id}`;
    }
  }
  /**
   * Calls the Monday.com API with a provided query
   * @private
   * @param {string} query - The GraphQL query string
   * @returns {Promise<any>}
   */
  async function runQuery(query) {
    // Double-check as TS doesn't seem to narrow based on the outer function check
    if (!MONDAY_KEY) {
      throw new Error("Monday.com API key is not set.");
    }

    try {
      const response = await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: MONDAY_KEY,
        },
        body: JSON.stringify({
          query: query,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error when calling the Monday API: ${JSON.stringify(body)}`);
      }

      return body;
    } catch (error) {
      throw new Error(`Error calling Monday.com API: ${error}`);
    }
  }
  /**
   * Creates and runs a query to update columns in a Monday.com item
   * @private
   * @param {string} id - The ID of the Monday.com item to update
   * @returns {Promise<string | undefined>} - The ID of the updated Monday.com item
   */
  async function updateMultipleColumns(id = "") {
    const mondayId = id || (await getId());
    if (!mondayId) {
      console.log("No Monday ID found, cannot update columns.");
      return;
    }

    const query = `mutation { 
      change_multiple_column_values(
        board_id: ${MONDAY_BOARD},
        item_id: ${mondayId},
        column_values: "${formatValues(columnUpdates)}"
      ) {
        id
      }
    }`;

    const response = await runQuery(query);
    if (!response?.data?.change_multiple_column_values?.id) {
      throw new Error(`Failed to update columns for item ID ${mondayId}: ${JSON.stringify(response)}`);
    }

    return response.data.change_multiple_column_values.id;
  }
  /**
   * Query Monday.com for an item matching the issue number
   * @private
   * @returns {Promise<string | undefined>} - The Monday.com item ID if found
   * @throws {Error} - If the query fails or no response is received
   */
  async function queryForId() {
    const query = `query {
        items_page_by_column_values(
          board_id: "${MONDAY_BOARD}",
          columns: {
            column_id: "${columns.issueNumber}",
            column_values: ["${issueNumber}"]
          },
        ) {
          items {
            id
          }
        }
      }`;

    const response = await runQuery(query);

    if (!response) {
      throw new Error(`No response for Github Issue #${issueNumber}`);
    }

    const items = response?.data?.items_page_by_column_values?.items;

    // If no item found for the issue, return undefined as we can't proceed
    // but do not throw an error as this is a valid state.
    if (!items?.length) {
      console.log(`No Monday task found for Github Issue #${issueNumber}.`);
      return;
    }

    if (items.length > 1) {
      throw new Error(`Multiple Monday items found for Issue #${issueNumber}. Requires manual review.`);
    }

    const id = items[0].id;
    console.log(`Found existing Monday task for Issue #${issueNumber}: ${id}.`);
    return id;
  }
  /**
   * Attempt to extract a Monday.com item ID from the issue body
   * @private
   * @returns {string | undefined} - The extracted Monday.com item ID, or undefined
   */
  function extractIdFromBody() {
    const syncRegex = /(?<=\*\*monday\.com sync:\*\* #)(\d+)/;
    const syncMatch = body?.match(syncRegex);
    const id = syncMatch && syncMatch[0] ? syncMatch[0] : undefined;

    if (!id) {
      return;
    }

    console.log(`Found existing Monday ID ${id} in issue body.`);
    return id;
  }

  /** Public functions */

  /**
   * Return the Monday.com item ID for a issue.
   * ID is parsed from the issue body or fetched based on the issue number
   * @param {("body" | "query" | "both")} location - Where to look for the ID: "body", "query", or "both" (default: "both")
   * @return {Promise<string | undefined>} - The Monday.com item ID
   */
  async function getId(location = "both") {
    if (location === "query") {
      return await queryForId();
    }
    if (location === "body") {
      return extractIdFromBody();
    }

    const id = extractIdFromBody();
    if (id) {
      return id;
    }

    return await queryForId();
  }
  /**
   * Commit any pending column updates to Monday.com
   */
  async function commitChanges() {
    if (Object.keys(columnUpdates).length === 0) {
      console.log("No updates to commit.");
      return;
    }

    const id = await updateMultipleColumns();
    if (!id) {
      console.log("Changes NOT committed.");
    } else {
      console.log(`Changes committed to Monday task: ${id}.`);
    }
    columnUpdates = {};
  }
  /**
   * Create a new task in Monday.com, or update an existing one if syncId is provided
   * @param {string} syncId = When provided, updates item in Monday instead of creating new
   * @returns {Promise<string>} - The ID of the created Monday.com item
   */
  async function createTask(syncId = "") {
    columnUpdates = {
      [columns.issueNumber]: `${issueNumber}`,
      [columns.link]: {
        url: html_url,
        text: `${issueNumber}`,
      },
    };

    // Add labels if present
    if (labels?.length) {
      labels.forEach((label) => addLabel(label.name));
    }
    // If no lifecycle label: set default status
    if (notInLifecycle(labels)) {
      addLabel(issueWorkflow.needsTriage);
    }

    // Add assignees if present
    if (assignees.length) {
      assignees.forEach((person) => addAssignee(person));

      // Set to "assigned" if no lifecycle labels were applied
      // Overrides the default "needs triage" label
      if (notInLifecycle(labels)) {
        addLabel(issueWorkflow.assigned);
      }
    }

    // Handle milestone if present
    if (issueMilestone) {
      handleMilestone();
    }

    if (syncId) {
      console.log(`Sync ID ${syncId} provided, updating existing item instead of creating new.`);
      const updatedId = await updateMultipleColumns(syncId);
      if (!updatedId) {
        throw new Error(`Failed to update existing item with ID ${syncId}`);
      }
      return updatedId;
    }

    const query = `mutation { 
      create_item (
        board_id: ${MONDAY_BOARD},
        item_name: "${title}",
        column_values: "${formatValues(columnUpdates)}"
      ) {
        id
      }
    }`;

    const response = await runQuery(query);
    if (!response?.data?.create_item?.id) {
      throw new Error(`Failed to create item for issue #${issueNumber}`);
    }

    return response.data.create_item.id;
  }
  /**
   * Set a specific column value in columnUpdates
   * @param {string} column
   * @param {string | number | object} value
   */
  function setColumnValue(column, value) {
    if (!column) {
      console.log("No column provided to setColumnValue.");
      return;
    }
    if (value === undefined || value === null) {
      console.log("No value provided to setColumnValue.");
      return;
    }

    columnUpdates[column] = value;
  }
  /**
   * Update columnUpdates based on milestone title
   */
  function handleMilestone() {
    // If removed, reset date
    if (!issueMilestone) {
      columnUpdates[columns.date] = "";
      clearLabel(milestone.stalled);
      return;
    }
    const milestoneTitle = issueMilestone.title;

    // Attempt to extract the date from the milestone title
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    const dueDate = milestoneTitle.match(dateRegex);

    if (dueDate) {
      columnUpdates[columns.date] = dueDate[0];
      clearLabel(milestone.stalled);

      // Assigned and NO lifecycle label - OUTSIDE OF "needs milestone"
      if (assignee && notInLifecycle(labels, { skipMilestone: true })) {
        addLabel(issueWorkflow.assigned);
      }
      // If unassigned and NOT "Ready for Dev"
      if (!assignee && notReadyForDev(labels)) {
        addLabel(issueWorkflow.new);
      }
    } else {
      columnUpdates[columns.date] = "";

      if (milestoneTitle === milestone.stalled) {
        addLabel(milestone.stalled);
      } else if (inMilestoneStatus()) {
        columnUpdates[columns.status] = milestoneTitle;
        clearLabel(milestone.stalled);
      }
    }
  }
  /**
   * Assign each of the current assignees to columnUpdates.
   */
  function addAllAssignees() {
    assignees.forEach((assignee) => {
      addAssignee(assignee);
    });
  }
  /**
   * Add a label to columnUpdates
   * @param {string} label
   */
  function addLabel(label) {
    // Skip the sync label, as it is not needed in Monday.com
    if (label === planning.monday) {
      return;
    }

    // Skip "needs milestone" if "ready for dev" is applied
    const { needsMilestone, readyForDev } = issueWorkflow;
    if (label === needsMilestone && !notReadyForDev(labels)) {
      console.log(`Skipping '${needsMilestone}' label as '${readyForDev}' is already applied.`);
      return;
    }

    if (!labelMap.has(label)) {
      console.log(`Label "${label}" not found in Monday Labels map.`);
      return;
    }

    const info = labelMap.get(label);
    if (!info?.column || !info?.value) {
      console.log(`Label "${label}" is missing column or title information.`);
      return;
    }

    columnUpdates[info.column] = info.value;
  }
  /**
   * Clear a column value in columnUpdates based on the label
   * @param {string} label - The label name to clear
   * @returns {void}
   */
  function clearLabel(label) {
    const labelColumn = labelMap.get(label)?.column;
    if (!labelColumn) {
      console.log(`Label "${label}" not found in Monday Labels map.`);
      return;
    }
    // Clear the label by setting it to an empty string
    columnUpdates[labelColumn] = "";
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
    if (!issueMilestone) {
      return false;
    }

    const statusMilestones = [milestone.backlog, milestone.freezer];

    return statusMilestones.includes(issueMilestone.title);
  }

  return {
    columns,
    getId,
    commitChanges,
    createTask,
    setColumnValue,
    handleMilestone,
    addAllAssignees,
    addLabel,
    clearLabel,
    addSyncLine,
    inMilestoneStatus,
  };
};
