import { afterEach, describe, expect, it, vi } from "vitest";
import * as core from "@actions/core";
import { auditMondayIssues } from "./issues-monday-audit.ts";

const { iterator } = vi.hoisted(() => ({ iterator: vi.fn() }));
vi.mock("@actions/github", () => ({
  getOctokit: () => ({
    paginate: { iterator },
    rest: { issues: { listForRepo: "listForRepo" } },
  }),
}));
vi.mock("@actions/core", () => ({ warning: vi.fn() }));
// Skip the pagination delay between GitHub/Monday.com requests, no need to wait or avoid rate limiting in mocks.
vi.mock("node:timers/promises", () => ({ setTimeout: vi.fn() }));

const options = { githubToken: "github", mondayKey: "monday", board: "123", column: "issue-number" };

/**
 * Mocks the Octokit paginator response for issues.
 *
 * Each inner array represents one Octokit page, containing only the issue fields the audit reads.
 */
function mockOctokitPages(pages: { number: number; pull_request?: object }[][]): void {
  iterator.mockImplementation(async function* () {
    for (const data of pages) {
      yield { data };
    }
  });
}

/**
 * Mocks the Monday.com GraphQL response structure for a given set of items.
 *
 * @see [Monday.com - Items page by column values](https://developer.monday.com/api-reference/reference/items-page-by-column-values#get-items-page-by-column-values)
 */
function mockMondayResponse(items: { id: string }[]): Response {
  return Response.json({ data: { items_page_by_column_values: { items } } });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("auditMondayIssues", () => {
  it("checks every page, excludes pull requests, and reports missing and duplicate matches", async () => {
    // GitHub's issues endpoint also returns PRs; #2 must not trigger a Monday.com request.
    mockOctokitPages([
      [{ number: 1 }, { number: 2, pull_request: {} }],
      [{ number: 3 }, { number: 4 }],
    ]);
    // Responses correspond to issues #1, #3, and #4: one match, no matches, and duplicate matches.
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(mockMondayResponse([{ id: "10" }]))
      .mockResolvedValueOnce(mockMondayResponse([]))
      .mockResolvedValueOnce(mockMondayResponse([{ id: "11" }, { id: "12" }]));
    vi.stubGlobal("fetch", fetch);

    await expect(auditMondayIssues(options)).resolves.toEqual({ audited: 3, found: 1, missing: [3], duplicates: [4] });
    expect(iterator).toHaveBeenCalledWith(
      "listForRepo",
      expect.objectContaining({
        owner: "Esri",
        repo: "calcite-design-system",
        state: "open",
      }),
    );
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(core.warning).toHaveBeenCalledTimes(2);
    expect(core.warning).toHaveBeenNthCalledWith(1, "Issue #3: No Monday.com items found.");
    expect(core.warning).toHaveBeenNthCalledWith(2, "Issue #4: Multiple Monday.com items found.");
    expect(fetch.mock.calls.map(([, init]) => JSON.parse(init.body).variables)).toEqual(
      [1, 3, 4].map((number) => ({
        board_id: "123",
        column_id: "issue-number",
        column_values: [String(number)],
      })),
    );
  });

  it.each([
    {
      name: "GraphQL errors alongside data",
      body: {
        data: { items_page_by_column_values: { items: [] } },
        errors: [{ message: "Rate limited", extensions: { code: "COMPLEXITY_BUDGET_EXHAUSTED" } }],
      },
      details: ' [{"message":"Rate limited","extensions":{"code":"COMPLEXITY_BUDGET_EXHAUSTED"}}]',
    },
    { name: "missing data", body: { data: null }, details: "" },
    { name: "non-array items", body: { data: { items_page_by_column_values: { items: {} } } }, details: "" },
  ])("rejects $name", async ({ body, details }) => {
    mockOctokitPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body)));
    await expect(auditMondayIssues(options)).rejects.toThrow(
      `Monday.com API returned errors or an invalid response for issue #1.${details}`,
    );
  });

  it("rejects HTTP failures", async () => {
    mockOctokitPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })));
    await expect(auditMondayIssues(options)).rejects.toThrow("HTTP 503");
  });

  it("propagates network failures", async () => {
    mockOctokitPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network unavailable")));
    await expect(auditMondayIssues(options)).rejects.toThrow("Network unavailable");
  });

  it("does not return a partial report after a GitHub pagination failure", async () => {
    iterator.mockImplementation(async function* () {
      yield { data: [{ number: 1 }] };
      throw new Error("GitHub unavailable");
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockMondayResponse([])));
    await expect(auditMondayIssues(options)).rejects.toThrow("GitHub unavailable");
  });
});
