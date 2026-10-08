import { getOctokit } from "@actions/github";
import { Command } from "@commander-js/extra-typings";
import dedent from "dedent";
import { execFileSync } from "node:child_process";
import { randomInt } from "node:crypto";
import { createServer, type Server } from "node:http";
import { errorAndExit, getSummary } from "./utils/commands.ts";
import calcitePackageJson from "../../components/package.json" with { type: "json" };

type TeamStatusOptions = {
  /** GitHub token with read access to repository issues. */
  token?: string;
};

type StatusInfo = {
  issueCount: number;
  pullCount: number;
  milestoneTitle: string;
  assignees: { username: string; firstName: string; issueCount: number }[];
};

const repository = { owner: "Esri", repo: "calcite-design-system" };
/* eslint-disable @cspell/spellchecker -- Team members' names and GitHub usernames. */
const team = [
  { username: "ashetland", firstName: "Aaron" },
  { username: "aPreciado88", firstName: "Abraham" },
  { username: "benelan", firstName: "Ben" },
  { username: "macandcheese", firstName: "Adam" },
  { username: "Amretasre002762670", firstName: "Amreta" },
  { username: "anveshmekala", firstName: "Anvesh" },
  { username: "brendan-vincent-rice", firstName: "Brendan" },
  { username: "brittneytewks", firstName: "Brittney" },
  { username: "DitwanP", firstName: "Ditwan" },
  { username: "Elijbet", firstName: "Eliza" },
  { username: "eriklharper", firstName: "Erik" },
  { username: "jcfranco", firstName: "Franco" },
  { username: "isaacbraun", firstName: "Isaac" },
  { username: "chezHarper", firstName: "Keith" },
  { username: "geospatialem", firstName: "Kitty" },
  { username: "driskull", firstName: "Matt D" },
  { username: "matgalla", firstName: "Matt G" },
  { username: "DintaMel", firstName: "Mel" },
  { username: "ryhoran", firstName: "Ryan" },
  { username: "SkyeSeitz", firstName: "Skye" },
];
/* eslint-enable @cspell/spellchecker */

const description = dedent`
  Show the team's open issues in the current milestone.

  Fetches a snapshot from Esri/calcite-design-system and serves an HTML page on
  localhost. Uses the earliest-due open milestone and excludes pull requests
  and issues labeled "4 - installed". The team order is randomized on each run.
  No browser is opened.
`;
const tokenUsage = "-t, --token <TOKEN>";

export const registerCommand = (command: Command): void =>
  void command
    .command("team-status")
    .summary(getSummary(description))
    .description(description)
    .option(tokenUsage, "GitHub token. Defaults to GH_TOKEN, then local gh authentication.")
    .action(run);

async function run({ token }: TeamStatusOptions): Promise<void> {
  try {
    const validatedToken = getTeamStatusToken(token);
    const statusInfo = await getStatusInfo(validatedToken);
    const server = createTeamStatusServer(renderTeamStatus(statusInfo));
    server.on("error", (error) => errorAndExit(`Failed to serve team status. ${error.message}`));
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        errorAndExit("Failed to determine the team status server address.");
      }
      /* eslint-disable-next-line no-console -- Required for CLI output. */
      console.log(
        `\nTeam status: http://127.0.0.1:${address.port}\n\nPress Ctrl+C to stop. Rerun the command to refresh data.`,
      );
    });
  } catch (error) {
    errorAndExit(`Failed to load team status. ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Resolves explicit or environment credentials before using the local GitHub CLI login.
 */
export function getTeamStatusToken(token?: string): string {
  const providedToken = token || process.env.GH_TOKEN;
  if (providedToken) {
    return providedToken;
  }

  const authError =
    "Unable to read local GitHub authentication. Install the GitHub CLI and run " +
    "'gh auth login --hostname github.com', or provide --token or GH_TOKEN.";
  let localToken: string;
  try {
    localToken = execFileSync("gh", ["auth", "token", "--hostname", "github.com"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    // Subprocess errors may include captured credentials; only report remediation.
    throw new Error(authError);
  }
  if (!localToken) {
    throw new Error(authError);
  }
  return localToken;
}

/**
 * Fetches open milestone issues and returns team members' outstanding work in randomized order.
 */
export async function getStatusInfo(token: string): Promise<StatusInfo> {
  const github = getOctokit(token);
  const milestones = await github.paginate(github.rest.issues.listMilestones, {
    ...repository,
    state: "open",
    sort: "due_on",
    direction: "asc",
  });
  const milestone = milestones.find(({ due_on }) => due_on !== null) ?? null;
  const counts = new Map<string, number>();

  if (!milestone) {
    throw new Error("No open milestone with a due date found.");
  }

  const pullRequests = await github.paginate(github.rest.pulls.list, {
    ...repository,
    state: "open",
    per_page: 100,
  });

  const issueList = await github.paginate(github.rest.issues.listForRepo, {
    ...repository,
    state: "open",
    milestone: String(milestone.number),
    per_page: 100,
  });

  const issues = issueList.filter(
    (issue) =>
      !issue.pull_request &&
      !issue.labels.some((label) => (typeof label === "string" ? label : label.name) === "4 - installed"),
  );

  issues.forEach((issue) => {
    for (const assignee of issue.assignees ?? []) {
      const username = assignee.login.toLowerCase();
      counts.set(username, (counts.get(username) ?? 0) + 1);
    }
  });

  const assignees = team.map((member) => ({
    ...member,
    issueCount: counts.get(member.username.toLowerCase()) ?? 0,
  }));

  for (let index = assignees.length - 1; index > 0; index--) {
    const swapIndex = randomInt(index + 1);
    [assignees[index], assignees[swapIndex]] = [assignees[swapIndex], assignees[index]];
  }

  return {
    issueCount: issues.length,
    pullCount: issueList.filter((issue) => issue.pull_request).length,
    milestoneTitle: milestone.title,
    assignees,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Generates a self-contained snapshot with links to each member's matching issues.
 */
export function renderTeamStatus({ issueCount, pullCount, milestoneTitle, assignees }: StatusInfo): string {
  const calciteVersion = calcitePackageJson.version ?? "latest";
  const baseUrl = new URL(`https://github.com/${repository.owner}/${repository.repo}/issues`);
  const milestoneParams = `sort:updated-desc is:issue state:open -label:"4 - installed" milestone:"${milestoneTitle}"`;

  const openIssuesUrl = new URL(baseUrl.href);
  openIssuesUrl.searchParams.set("q", milestoneParams);

  const openPullsUrl = new URL(baseUrl.href);
  openPullsUrl.searchParams.set("q", `sort:updated-desc is:pr state:open review:required draft:false`);

  const items = assignees.map(({ username, firstName, issueCount }) => {
    const name = escapeHtml(firstName);
    const url = new URL(baseUrl.href);
    url.searchParams.set("q", `${milestoneParams} assignee:${username}`);
    return `<li><a href="${escapeHtml(url.href)}" target="_blank" rel="noreferrer">${name}</a> - ${issueCount}</li>`;
  });

  return dedent`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Calcite team status</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@esri/calcite-components@${calciteVersion}/dist/cdn/index.js"></script>
      </head>
      <body>
        <main>
          <h1 style="font-weight: 500;">Calcite team status</h1>
          <section id="copy">
            <div>
              <a href="${openIssuesUrl}" target="_blank" rel="noreferrer">Open issues:</a>&nbsp;${issueCount}
            </div>
            <div>
              <a href="${openPullsUrl}" target="_blank" rel="noreferrer">Open pull requests:</a>&nbsp;${pullCount}
            </div>
            <p>Order</p>
            <ul>
              ${items.join("\n")}
            </ul>
          </section>
          <calcite-button>Copy team status</calcite-button>
        </main>
        <script>
          const copyButtonEl = document.querySelector("calcite-button");
          const copyContentEl = document.querySelector("#copy");

          copyButton.addEventListener("click", async () => {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  "text/html": new Blob([copyContent.innerHTML], { type: "text/html" }),
                  "text/plain": new Blob([copyContent.innerText], { type: "text/plain" }),
                }),
              ]);
            } catch (error) {
              console.error("Failed to copy team status:", error);
            }
          });
        </script>
      </body>
    </html>
  `;
}

/**
 * Creates a local HTTP server for the generated page without serving filesystem paths.
 */
export function createTeamStatusServer(html: string): Server {
  return createServer((request, response) => {
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
    });
    response.end(request.method === "HEAD" ? undefined : html);
  });
}
