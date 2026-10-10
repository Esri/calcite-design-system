import { Command } from "@commander-js/extra-typings";
import * as core from "@actions/core";
import { getOctokit } from "@actions/github";
import dedent from "dedent";
import { setTimeout } from "node:timers/promises";
import { assertRequiredOption, errorAndExit, getSummary } from "./utils/commands.ts";

type AuditOptions = {
  githubToken: string;
  mondayKey: string;
  board: string;
  column: string;
};

type Report = {
  audited: number;
  found: number;
  missing: number[];
  duplicates: number[];
};

const owner = "Esri";
const repo = "calcite-design-system";
const issueUrl = `https://github.com/${owner}/${repo}/issues/`;
const description = dedent`
  Audit Monday.com issues against all open repository issues.

  A read-only check that every open issue has exactly one matching Monday.com item,
  reporting missing and duplicate matches.

  API failures fail instead of being counted as missing items.
`;
const githubTokenUsage = "--github-token <TOKEN>";
const mondayKeyUsage = "--monday-key <KEY>";
const boardUsage = "--board <ID>";
const columnUsage = "--column <ID>";

export const registerCommand = (command: Command): void =>
  void command
    .command("issues-monday-audit")
    .description(description)
    .summary(getSummary(description))
    .option(githubTokenUsage, "The GitHub token with issues read access. (env: GITHUB_TOKEN)")
    .option(mondayKeyUsage, "The Monday.com API key. (env: MONDAY_KEY)")
    .option(boardUsage, "The Monday.com board ID. (env: MONDAY_BOARD)")
    .option(columnUsage, "The GitHub issue number column ID. (env: MONDAY_ISSUE_NUMBER_COLUMN_ID)")
    .action(run);

/**
 * Runs the `issues-monday-audit` command using the provided options or environment variables.
 */
async function run({ githubToken, mondayKey, board, column }: Partial<AuditOptions>): Promise<void> {
  const options = {
    githubToken: assertRequiredOption(githubToken || process.env.GITHUB_TOKEN || undefined, githubTokenUsage),
    mondayKey: assertRequiredOption(mondayKey || process.env.MONDAY_KEY || undefined, mondayKeyUsage),
    board: assertRequiredOption(board || process.env.MONDAY_BOARD || undefined, boardUsage),
    column: assertRequiredOption(column || process.env.MONDAY_ISSUE_NUMBER_COLUMN_ID || undefined, columnUsage),
  };

  try {
    const report = await auditMondayIssues(options);
    const message = formatReportCounts(report);
    core.info(message);
    core.setOutput("teams-message", message);
    core.setOutput("outcome", report.missing.length === 0 && report.duplicates.length === 0 ? "Passed" : "Failed");
    if (process.env.GITHUB_STEP_SUMMARY) {
      await core.summary.addRaw(createReportSummary(report)).write();
    }
  } catch (error) {
    errorAndExit(`Monday.com issue audit incomplete. ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Audits all open issues to ensure they exist in Monday.com.
 *
 * @returns A report of the audit results.
 */
export async function auditMondayIssues(options: AuditOptions): Promise<Report> {
  const github = getOctokit(options.githubToken);
  const report: Report = { audited: 0, found: 0, missing: [], duplicates: [] };

  for await (const { data } of github.paginate.iterator(github.rest.issues.listForRepo, {
    owner,
    repo,
    state: "open",
    per_page: 100,
    sort: "created",
    direction: "asc",
  })) {
    for (const issue of data) {
      if (issue.pull_request) {
        continue;
      }

      if (report.audited > 0) {
        await setTimeout(3000);
      }

      const result = await auditMondayItems(issue.number, options);
      report.audited++;

      if (result === "missing") {
        report.missing.push(issue.number);
      } else if (result === "multiple") {
        report.duplicates.push(issue.number);
      } else {
        report.found++;
      }

      if (result !== "found") {
        core.warning(`Issue #${issue.number}: ${result === "missing" ? "No" : "Multiple"} Monday.com items found.`);
      }
    }
  }

  return report;
}

/**
 * Checks Monday.com for items matching the given GitHub issue number in the specified board and column.
 *
 * @returns "found" if exactly one item is found, "missing" if no items are found, or "multiple" if more than one item
 * is found.
 */
async function auditMondayItems(
  issueNumber: number,
  { mondayKey, board, column }: AuditOptions,
): Promise<"found" | "missing" | "multiple"> {
  const response = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: mondayKey },
    signal: AbortSignal.timeout(60_000),
    body: JSON.stringify({
      query: `query QueryForId($board_id: ID!, $column_id: String!, $column_values: [String!]!) {
        items_page_by_column_values(
          board_id: $board_id,
          columns: { column_id: $column_id, column_values: $column_values },
          limit: 2
        ) {
          items { id }
        }
      }`,
      variables: { board_id: board, column_id: column, column_values: [String(issueNumber)] },
    }),
  });
  if (!response.ok) {
    throw new Error(`Monday.com API returned HTTP ${response.status} for issue #${issueNumber}.`);
  }

  const result: {
    errors?: unknown[];
    data?: { items_page_by_column_values?: { items?: unknown } };
  } | null = await response.json();
  const items = result?.data?.items_page_by_column_values?.items;

  if (result?.errors?.length || !Array.isArray(items)) {
    const details = result?.errors?.length ? ` ${JSON.stringify(result.errors)}` : "";
    throw new Error(`Monday.com API returned errors or an invalid response for issue #${issueNumber}.${details}`);
  }

  if (items.length === 0) {
    return "missing";
  } else if (items.length === 1) {
    return "found";
  } else {
    return "multiple";
  }
}

/**
 * Formats report counts for the log and Teams notification.
 */
export function formatReportCounts(report: Report): string {
  return [
    `Audited: ${report.audited}`,
    `Found: ${report.found}`,
    `Missing: ${report.missing.length}`,
    `Multiple: ${report.duplicates.length}`,
  ].join("\n\n");
}

/**
 * Creates a GitHub summary with the Missing and Multiple issues listed in separate sections.
 */
export function createReportSummary(report: Report): string {
  const lines = [formatReportCounts(report)];

  for (const [label, issues] of Object.entries({
    Missing: report.missing,
    Multiple: report.duplicates,
  })) {
    if (issues.length > 0) {
      lines.push(`## ${label}: ${issues.length}`);
      lines.push(issues.map((number) => `- [#${number}](${issueUrl}${number})`).join("\n"));
    }
  }
  return lines.join("\n\n");
}
