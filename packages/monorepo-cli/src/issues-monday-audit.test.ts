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
vi.mock("node:timers/promises", () => ({ setTimeout: vi.fn() }));

const options = { githubToken: "github", mondayKey: "monday", board: "123", column: "issue-number" };

function mockPages(pages: { number: number; pull_request?: object }[][]): void {
  iterator.mockImplementation(async function* () {
    for (const data of pages) {
      yield { data };
    }
  });
}

function mondayResponse(items: { id: string }[]): Response {
  return Response.json({ data: { items_page_by_column_values: { items } } });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("auditMondayIssues", () => {
  it("checks every page, excludes pull requests, and reports missing and duplicate matches", async () => {
    mockPages([
      [{ number: 1 }, { number: 2, pull_request: {} }],
      [{ number: 3 }, { number: 4 }],
    ]);
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(mondayResponse([{ id: "10" }]))
      .mockResolvedValueOnce(mondayResponse([]))
      .mockResolvedValueOnce(mondayResponse([{ id: "11" }, { id: "12" }]));
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
    mockPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body)));
    await expect(auditMondayIssues(options)).rejects.toThrow(
      `Monday.com API returned errors or an invalid response for issue #1.${details}`,
    );
  });

  it("rejects HTTP failures", async () => {
    mockPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })));
    await expect(auditMondayIssues(options)).rejects.toThrow("HTTP 503");
  });

  it("propagates network failures", async () => {
    mockPages([[{ number: 1 }]]);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network unavailable")));
    await expect(auditMondayIssues(options)).rejects.toThrow("Network unavailable");
  });

  it("does not return a partial report after a GitHub pagination failure", async () => {
    iterator.mockImplementation(async function* () {
      yield { data: [{ number: 1 }] };
      throw new Error("GitHub unavailable");
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mondayResponse([])));
    await expect(auditMondayIssues(options)).rejects.toThrow("GitHub unavailable");
  });
});
