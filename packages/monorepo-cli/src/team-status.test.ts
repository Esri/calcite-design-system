import { Command } from "@commander-js/extra-typings";
import { once } from "node:events";
import { createServer, type Server } from "node:http";
// import { runInNewContext } from "node:vm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStatusInfo, registerCommand, renderTeamStatus } from "./team-status.ts";

// cspell:words ashetland Preciado benelan isaacbraun

const { paginate, listMilestones, issuesAndPullRequests, execFileSync } = vi.hoisted(() => ({
  paginate: vi.fn(),
  listMilestones: vi.fn(),
  issuesAndPullRequests: vi.fn(),
  execFileSync: vi.fn(),
}));

vi.mock("@actions/github", () => ({
  getOctokit: () => ({ paginate, rest: { issues: { listMilestones }, search: { issuesAndPullRequests } } }),
}));
vi.mock("node:child_process", () => ({ execFileSync }));
vi.mock("node:http", { spy: true });

beforeEach(() => {
  vi.clearAllMocks();
  paginate.mockReset();
  issuesAndPullRequests.mockReset();
  execFileSync.mockReset();
});

// const statusInfo = {
//   issues: { query: 'is:issue milestone:"October & next #1"', count: 3 },
//   pulls: { query: "is:pr review:required draft:false", count: 1 },
//   assignees: [
//     { username: "ashetland", firstName: "Aaron", issueCount: 2 },
//     { username: "benelan", firstName: "Ben", issueCount: 0 },
//     { username: "isaacbraun", firstName: "Isaac", issueCount: 1 },
//   ],
// };

describe("team status data", () => {
  it("searches the earliest-due milestone and counts matching issues and pull requests", async () => {
    const milestone = { number: 10, title: "October", due_on: "2026-10-15T00:00:00Z" };
    paginate
      .mockResolvedValueOnce([
        { number: 1, title: "Backlog", due_on: null },
        milestone,
        { number: 11, title: "November", due_on: "2026-11-15T00:00:00Z" },
      ])
      .mockResolvedValueOnce([
        { assignees: [{ login: "ASHETLAND" }, { login: "aPreciado88" }] },
        { assignees: [{ login: "ashetland" }] },
        { assignees: null },
      ]);
    issuesAndPullRequests.mockResolvedValue({ data: { total_count: 7 } });

    const status = await getStatusInfo("token");
    const issueQuery = 'sort:updated-desc is:issue state:open -label:"4 - installed" milestone:"October"';
    const pullQuery = "sort:updated-desc is:pr state:open review:required draft:false";

    expect(status.issues).toEqual({ query: issueQuery, count: 3 });
    expect(status.pulls).toEqual({ query: pullQuery, count: 7 });
    expect(status.assignees).toEqual(
      expect.arrayContaining([
        { username: "ashetland", firstName: "Aaron", issueCount: 2 },
        { username: "aPreciado88", firstName: "Abraham", issueCount: 1 },
        { username: "benelan", firstName: "Ben", issueCount: 0 },
      ]),
    );
    expect(paginate).toHaveBeenNthCalledWith(1, listMilestones, {
      owner: "Esri",
      repo: "calcite-design-system",
      state: "open",
      sort: "due_on",
      direction: "asc",
    });
    expect(issuesAndPullRequests).toHaveBeenCalledWith({
      q: `repo:Esri/calcite-design-system ${pullQuery}`,
      per_page: 1,
    });
    expect(paginate).toHaveBeenNthCalledWith(2, issuesAndPullRequests, {
      q: `repo:Esri/calcite-design-system ${issueQuery}`,
      per_page: 100,
    });
  });
});

// describe("team status page", () => {
//   it("renders totals and links every member to an independent, correctly encoded search", () => {
//     const html = renderTeamStatus(statusInfo);
//     const urls = [...html.matchAll(/href="([^"]+)"/g)].map(([, href]) => new URL(href));
//
//     expect(urls.map((url) => url.origin + url.pathname)).toEqual(
//       Array(5).fill("https://github.com/Esri/calcite-design-system/issues"),
//     );
//     expect(urls.map((url) => [...url.searchParams])).toEqual([
//       [["q", statusInfo.issues.query]],
//       [["q", statusInfo.pulls.query]],
//       ...statusInfo.assignees.map(({ username }) => [["q", `${statusInfo.issues.query} assignee:${username}`]]),
//     ]);
//     expect(html).toContain("Open issues:</a>&nbsp;3");
//     expect(html).toContain("Pull requests needing review:</a>&nbsp;1");
//     for (const { firstName, issueCount } of statusInfo.assignees) {
//       expect(html).toContain(`${firstName}</a> - ${issueCount}</li>`);
//     }
//   });
// });
//
// describe("team status page interactions", () => {
//   it("shuffles on load and click, then copies the displayed order", async () => {
//     const html = renderTeamStatus(statusInfo);
//     const originalItems = [...html.matchAll(/<li>(.*?)<\/li>/g)].map(([outerHTML]) => ({ outerHTML }));
//     const team = {
//       children: [...originalItems],
//       replaceChildren(...items: typeof originalItems) {
//         this.children = items;
//       },
//     };
//     const content = {
//       get innerHTML() {
//         return html
//           .match(/<section id="copy">([\s\S]*?)<\/section>/)![1]
//           .replace(
//             /<ul id="team">[\s\S]*?<\/ul>/,
//             `<ul id="team">${team.children.map((item) => item.outerHTML).join("")}</ul>`,
//           );
//       },
//       get innerText() {
//         return this.innerHTML.replace(/<[^>]*>/g, "");
//       },
//     };
//     const copyButton = { addEventListener: vi.fn<(event: string, listener: () => Promise<void>) => void>() };
//     const randomizeButton = { addEventListener: vi.fn<(event: string, listener: () => void) => void>() };
//     const elements = new Map<string, object>([
//       ["#copy-button", copyButton],
//       ["#copy", content],
//       ["#randomize-button", randomizeButton],
//       ["#team", team],
//     ]);
//     const write = vi.fn<(items: { data: Record<string, Blob> }[]) => Promise<void>>().mockResolvedValue();
//     const clipboardItem = vi.fn(function (this: { data: Record<string, Blob> }, data: Record<string, Blob>) {
//       this.data = data;
//     });
//     runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)![1], {
//       document: {
//         querySelector: (selector: string) => {
//           expect(html).toContain(`id="${selector.slice(1)}"`);
//           return elements.get(selector);
//         },
//       },
//       Math: { floor: Math.floor, random: () => 0 },
//       navigator: { clipboard: { write } },
//       ClipboardItem: clipboardItem,
//       Blob,
//       console,
//     });
//     expect(randomizeButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function));
//     expect(copyButton.addEventListener).toHaveBeenCalledWith("click", expect.any(Function));
//     const randomize = randomizeButton.addEventListener.mock.calls[0][1];
//     const copy = copyButton.addEventListener.mock.calls[0][1];
//     const [first, second, third] = originalItems;
//     for (const expectedOrder of [
//       [second, third, first],
//       [third, first, second],
//     ]) {
//       expect(team.children).toEqual(expectedOrder);
//       await copy();
//       const { data } = write.mock.lastCall![0][0];
//       expect(data["text/html"].type).toBe("text/html");
//       expect(await data["text/html"].text()).toBe(content.innerHTML);
//       expect(data["text/plain"].type).toBe("text/plain");
//       expect(await data["text/plain"].text()).toBe(content.innerText);
//       randomize();
//     }
//   });
// });

describe("team status command", () => {
  it("serves --list-only without GitHub authentication or requests", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const program = new Command().exitOverride();
    registerCommand(program);
    await program.parseAsync(["team-status", "--list-only"], { from: "user" });
    const server: Server = vi.mocked(createServer).mock.results[0].value;
    try {
      if (!server.listening) {
        await once(server, "listening");
      }
      const address = server.address();
      if (!address || typeof address === "string") {
        throw new Error("Expected a TCP address.");
      }
      const response = await fetch(`http://127.0.0.1:${address.port}`);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe(renderTeamStatus());
      expect(execFileSync).not.toHaveBeenCalled();
      expect(paginate).not.toHaveBeenCalled();
      expect(issuesAndPullRequests).not.toHaveBeenCalled();
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      log.mockRestore();
    }
  });
});
