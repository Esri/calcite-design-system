import { Command } from "@commander-js/extra-typings";
import { once } from "node:events";
import type { Server } from "node:http";
import { runInNewContext } from "node:vm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createTeamStatusServer,
  getTeamStatus,
  getTeamStatusToken,
  registerCommand,
  renderTeamStatus,
} from "./team-status.ts";

// cspell:words ashetland Preciado benelan

const { paginate, listMilestones, listForRepo, randomInt, execFileSync } = vi.hoisted(() => ({
  paginate: vi.fn(),
  listMilestones: vi.fn(),
  listForRepo: vi.fn(),
  randomInt: vi.fn<(upperBound: number) => number>(() => 0),
  execFileSync: vi.fn(),
}));

vi.mock("@actions/github", () => ({
  getOctokit: () => ({ paginate, rest: { issues: { listMilestones, listForRepo } } }),
}));
vi.mock("node:crypto", () => ({ randomInt }));
vi.mock("node:child_process", () => ({ execFileSync }));

beforeEach(() => vi.clearAllMocks());

describe("team status data", () => {
  it("selects the earliest-due open milestone and counts only outstanding issues for each assignee", async () => {
    const milestone = { number: 10, title: "October", due_on: "2026-10-15T00:00:00Z" };
    paginate
      .mockResolvedValueOnce([
        { number: 1, title: "Backlog", due_on: null },
        milestone,
        { number: 11, title: "November", due_on: "2026-11-15T00:00:00Z" },
      ])
      .mockResolvedValueOnce([
        { assignees: [{ login: "ASHETLAND" }, { login: "aPreciado88" }], labels: [] },
        { assignees: [{ login: "ashetland" }], labels: [{ name: "bug" }] },
        { assignees: [{ login: "ashetland" }], labels: [{ name: "4 - installed" }] },
        { assignees: [{ login: "ashetland" }], labels: ["4 - installed"] },
        { assignees: [{ login: "ashetland" }], labels: [], pull_request: {} },
        { assignees: null, labels: [] },
      ]);

    const status = await getTeamStatus("token");

    expect(status.milestone).toEqual(milestone);
    expect(status.assignees).toEqual(
      expect.arrayContaining([
        { username: "ashetland", firstName: "Aaron", issueCount: 2 },
        { username: "aPreciado88", firstName: "Abraham", issueCount: 1 },
        { username: "benelan", firstName: "Ben", issueCount: 0 },
      ]),
    );
    expect(status.assignees).toHaveLength(20);
    expect(paginate).toHaveBeenNthCalledWith(1, listMilestones, {
      owner: "Esri",
      repo: "calcite-design-system",
      state: "open",
      sort: "due_on",
      direction: "asc",
      per_page: 100,
    });
    expect(paginate).toHaveBeenNthCalledWith(2, listForRepo, {
      owner: "Esri",
      repo: "calcite-design-system",
      state: "open",
      milestone: "10",
      per_page: 100,
    });
  });

  it.each([{ milestones: [] }, { milestones: [{ number: 1, title: "Backlog", due_on: null }] }])(
    "returns zero counts without requesting issues when there is no dated milestone ($milestones)",
    async ({ milestones }) => {
      paginate.mockResolvedValueOnce(milestones);
      const status = await getTeamStatus("token");
      expect(status.milestone).toBeNull();
      expect(status.assignees.every(({ issueCount }) => issueCount === 0)).toBe(true);
      expect(paginate).toHaveBeenCalledTimes(1);
    },
  );

  it("shuffles on every call without changing members or mutating the roster", async () => {
    paginate.mockResolvedValue([]);
    randomInt.mockImplementation((upperBound: number) => upperBound - 1);
    const original = await getTeamStatus("token");
    randomInt.mockReturnValue(0);
    const randomized = await getTeamStatus("token");
    const subsequent = await getTeamStatus("token");
    expect(randomized.assignees).not.toEqual(original.assignees);
    expect(randomized.assignees).toHaveLength(original.assignees.length);
    expect(randomized.assignees).toEqual(expect.arrayContaining(original.assignees));
    expect(subsequent).toEqual(randomized);
  });

  it("propagates GitHub failures instead of returning zero counts", async () => {
    paginate.mockRejectedValueOnce(new Error("GitHub unavailable"));
    await expect(getTeamStatus("token")).rejects.toThrow("GitHub unavailable");
  });
});

describe("team status page", () => {
  it("escapes HTML and links only members with outstanding issues to the matching search", () => {
    const title = 'October <release> & "next"';
    const html = renderTeamStatus({
      milestone: { number: 10, title },
      assignees: [
        { username: "ashetland", firstName: "Aaron & <team>", issueCount: 2 },
        { username: "benelan", firstName: "Ben", issueCount: 0 },
      ],
    });
    expect(html).toContain("Milestone: October &lt;release&gt; &amp; &quot;next&quot;");
    expect(html).toContain("Aaron &amp; &lt;team&gt;</a> - 2");
    expect(html).toContain("<li>Ben - 0</li>");
    const href = html.match(/href="([^"]+)"/)?.[1];
    expect(href).toBeDefined();
    const url = new URL(href!);
    expect(url.origin + url.pathname).toBe("https://github.com/Esri/calcite-design-system/issues");
    expect(url.searchParams.get("q")).toBe(
      `sort:updated-desc is:issue state:open -label:"4 - installed" assignee:ashetland milestone:"${title}"`,
    );
  });

  it("explains when no dated milestone exists", () => {
    const html = renderTeamStatus({
      milestone: null,
      assignees: [{ username: "ashetland", firstName: "Aaron", issueCount: 0 }],
    });
    expect(html).toContain("No open milestone with a due date found.");
    expect(html).toContain("<li>Aaron - 0</li>");
    expect(html).not.toContain("<a ");
  });
});

describe("team status clipboard", () => {
  function setupClipboard(write: ReturnType<typeof vi.fn> | undefined) {
    const html = renderTeamStatus({
      issueCount: 2,
      pullCount: 1,
      milestoneTitle: "October",
      assignees: [{ username: "ashetland", firstName: "Aaron", issueCount: 2 }],
    });
    const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];
    const content = {
      innerHTML: html.match(/<section id="copy">([\s\S]*?)<\/section>/)![1],
      innerText: "Open issues: 2\nOpen pull requests: 1\nOrder:\nAaron - 2",
    };
    const button = { disabled: false, addEventListener: vi.fn() };
    const status = { textContent: "" };
    const elements = new Map<string, object>([
      ["copy", content],
      ["copy-button", button],
      ["copy-status", status],
    ]);
    const clipboardItem = vi.fn(function (this: { data: Record<string, Blob> }, data: Record<string, Blob>) {
      this.data = data;
    });
    runInNewContext(script, {
      document: { getElementById: (id: string) => elements.get(id) },
      navigator: { clipboard: write ? { write } : undefined },
      ClipboardItem: clipboardItem,
      Blob,
    });
    expect(html).toContain('<calcite-button id="copy-button" type="button">Copy team status</calcite-button>');
    expect(html).toContain('<p id="copy-status" role="status">');
    expect(button.addEventListener).toHaveBeenCalledWith("click", expect.any(Function));
    const click: () => Promise<void> = button.addEventListener.mock.calls[0][1];
    return { click, content, button, status, clipboardItem };
  }

  it("copies the rendered totals and linked list as HTML and plain text", async () => {
    const write = vi.fn().mockResolvedValue(undefined);
    const { click, content, button, status, clipboardItem } = setupClipboard(write);
    const copying = click();
    expect(button.disabled).toBe(true);
    expect(status.textContent).toBe("Copying...");
    await copying;
    const data = clipboardItem.mock.calls[0][0];
    expect(data["text/html"].type).toBe("text/html");
    expect(await data["text/html"].text()).toBe(content.innerHTML);
    expect(await data["text/html"].text()).toContain("https://github.com/Esri/calcite-design-system/issues?");
    expect(data["text/plain"].type).toBe("text/plain");
    expect(await data["text/plain"].text()).toBe(content.innerText);
    expect(write).toHaveBeenCalledWith([clipboardItem.mock.instances[0]]);
    expect(status.textContent).toBe("Team status copied.");
    expect(button.disabled).toBe(false);
  });

  it("reports denied clipboard access and allows retrying", async () => {
    const write = vi.fn().mockRejectedValue(new Error("Permission denied"));
    const { click, button, status } = setupClipboard(write);
    await click();
    expect(status.textContent).toContain("Could not copy team status.");
    expect(button.disabled).toBe(false);
    write.mockResolvedValue(undefined);
    await click();
    expect(status.textContent).toBe("Team status copied.");
  });

  it("explains how to copy manually when the Clipboard API is unavailable", async () => {
    const { click, status, clipboardItem } = setupClipboard(undefined);
    await click();
    expect(status.textContent).toContain("Rich-text copying is unavailable");
    expect(clipboardItem).not.toHaveBeenCalled();
  });
});

describe("team status server", () => {
  let server: Server;

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  });

  it("serves the generated page on localhost without exposing other paths or accepting writes", async () => {
    const html = renderTeamStatus({ milestone: null, assignees: [] });
    server = createTeamStatusServer(html);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected a TCP address.");
    }
    const url = `http://127.0.0.1:${address.port}`;
    const response = await fetch(url);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(await response.text()).toBe(html);
    const head = await fetch(url, { method: "HEAD" });
    expect(head.status).toBe(200);
    expect(await head.text()).toBe("");
    expect((await fetch(`${url}/team-status.ts`)).status).toBe(404);
    expect((await fetch(url, { method: "POST" })).status).toBe(405);
  });
});

describe("team status authentication", () => {
  beforeEach(() => {
    vi.stubEnv("GH_TOKEN", "");
    vi.stubEnv("GITHUB_TOKEN", "inherited-token");
    execFileSync.mockReset();
  });
  afterEach(() => vi.unstubAllEnvs());

  it("prefers an explicit token over GH_TOKEN and local authentication", () => {
    vi.stubEnv("GH_TOKEN", "environment-token");
    expect(getTeamStatusToken("explicit-token")).toBe("explicit-token");
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it("uses GH_TOKEN without invoking gh", () => {
    vi.stubEnv("GH_TOKEN", "environment-token");
    expect(getTeamStatusToken()).toBe("environment-token");
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it("falls back to gh with the inherited environment when no explicit token or GH_TOKEN is provided", () => {
    execFileSync.mockReturnValue("local-token\n");
    expect(getTeamStatusToken()).toBe("local-token");
    expect(execFileSync).toHaveBeenCalledWith("gh", ["auth", "token", "--hostname", "github.com"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  });

  it("provides login instructions without exposing subprocess output when gh fails", () => {
    execFileSync.mockImplementation(() => {
      throw new Error("sensitive subprocess output");
    });
    expect(() => getTeamStatusToken()).toThrow("gh auth login --hostname github.com");
    expect(() => getTeamStatusToken()).not.toThrow("sensitive subprocess output");
  });

  it("rejects an empty token returned by gh", () => {
    execFileSync.mockReturnValue("\n");
    expect(() => getTeamStatusToken()).toThrow("gh auth login --hostname github.com");
  });
});

describe("team status command", () => {
  it.each(["--port", "--randomize", "-r"])("does not expose the %s option", async (option) => {
    const program = new Command().exitOverride().configureOutput({ writeErr: () => {} });
    registerCommand(program);
    await expect(program.parseAsync(["team-status", option], { from: "user" })).rejects.toThrow(
      `unknown option '${option}'`,
    );
    expect(paginate).not.toHaveBeenCalled();
  });
});
