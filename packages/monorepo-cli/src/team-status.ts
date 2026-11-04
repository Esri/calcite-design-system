import { getOctokit } from "@actions/github";
import { Command } from "@commander-js/extra-typings";
import dedent from "dedent";
import { execFileSync } from "node:child_process";
import { createServer, type Server } from "node:http";
import { errorAndExit, getSummary } from "./utils/commands.ts";
import calcitePackageJson from "../../components/package.json" with { type: "json" };

type TeamStatusOptions = {
  /** Show only the local roster without fetching GitHub data. */
  listOnly?: boolean;
  /** GitHub token with read access to repository issues. */
  token?: string;
};

type StatusInfo = {
  issues: { query: string; count: number };
  pulls: { query: string; count: number };
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
  Display the team's outstanding issues in the current milestone via a HTML page.

  When running locally, the command can be run without a token if the GitHub CLI
  is installed and authorized for the Esri organization via SSO.

  A HTML page is used to support rich text copying into applications like Microsoft Teams.
`;
const tokenUsage = "-t, --token <TOKEN>";

export const registerCommand = (command: Command): void =>
  void command
    .command("team-status")
    .summary(getSummary(description))
    .description(description)
    .option("--list-only", "Show only the team list, without GitHub overview, links, or counts.")
    .option(tokenUsage, "GitHub token. Defaults to GH_TOKEN, then local gh authentication.")
    .action(run);

async function run({ listOnly, token }: TeamStatusOptions): Promise<void> {
  try {
    const statusInfo = listOnly ? undefined : await getStatusInfo(getTeamStatusToken(token));
    const server = createTeamStatusServer(renderTeamStatus(statusInfo));
    server.on("error", (error) => errorAndExit(`Failed to serve team status. ${error.message}`));
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        errorAndExit("Failed to determine the team status server address.");
      }
      /* eslint-disable-next-line no-console -- Required for CLI output. */
      console.log(
        `\nServer: http://127.0.0.1:${address.port}\n\nPress Ctrl+C to stop.${listOnly ? "" : " Rerun the command to refresh data."}`,
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
 * Fetches open milestone issues and returns team members' outstanding work in roster order.
 */
export async function getStatusInfo(token: string): Promise<StatusInfo> {
  const github = getOctokit(token);
  const milestones = await github.paginate(github.rest.issues.listMilestones, {
    ...repository,
    state: "open",
    sort: "due_on",
    direction: "asc",
  });
  const milestone = milestones.find(({ due_on }) => due_on !== null);
  if (!milestone) {
    throw new Error("No open milestone with a due date found.");
  }

  const counts = new Map<string, number>();
  const issueQuery = `sort:updated-desc is:issue state:open -label:"4 - installed" milestone:"${milestone.title}"`;
  const pullRequestQuery = "sort:updated-desc is:pr state:open review:required draft:false -label:dependencies";

  const {
    data: { total_count: pullCount },
  } = await github.rest.search.issuesAndPullRequests({
    q: `repo:${repository.owner}/${repository.repo} ${pullRequestQuery}`,
    per_page: 1,
  });

  const issues = await github.paginate(github.rest.search.issuesAndPullRequests, {
    q: `repo:${repository.owner}/${repository.repo} ${issueQuery}`,
    per_page: 100,
  });

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

  return {
    issues: { query: issueQuery, count: issues.length },
    pulls: { query: pullRequestQuery, count: pullCount },
    assignees,
  };
}

/**
 * Generates a snapshot with issue links and counts, or just the local roster when no status is provided.
 */
export function renderTeamStatus(statusInfo?: StatusInfo): string {
  const calciteVersion = calcitePackageJson.version ?? "latest";
  const baseUrl = `https://github.com/${repository.owner}/${repository.repo}/issues`;

  function getSearchUrl(query: string): URL {
    const url = new URL(baseUrl);
    url.searchParams.set("q", query);
    return url;
  }

  const items = statusInfo
    ? statusInfo.assignees.map(({ username, firstName, issueCount }) => {
        const url = getSearchUrl(`${statusInfo.issues.query} assignee:${username}`);
        return `<li><a href="${url.href}" target="_blank" rel="noreferrer">${firstName}</a> - ${issueCount}</li>`;
      })
    : team.map(({ firstName }) => `<li>${firstName}</li>`);
  const totals = statusInfo
    ? dedent`
        <div>
          <a href="${getSearchUrl(statusInfo.issues.query)}" target="_blank" rel="noreferrer">Open issues:</a>&nbsp;${statusInfo.issues.count}
        </div>
        <div>
          <a href="${getSearchUrl(statusInfo.pulls.query)}" target="_blank" rel="noreferrer">Pull requests needing review:</a>&nbsp;${statusInfo.pulls.count}
        </div>
      `
    : "";

  return dedent`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Calcite team status</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@esri/calcite-components@${calciteVersion}/dist/cdn/index.js"></script>
        <style>
          a {
            color: var(--calcite-color-text-link);
          }
        </style>
      </head>
      <body>
        <main>
          <h1 style="font-weight: 500;">Calcite team status</h1>
          <section id="copy">
            ${totals}
            <ul id="team">
              ${items.join("\n")}
            </ul>
          </section>
          <calcite-button id="randomize-button" kind="neutral">Randomize order</calcite-button>
          <calcite-button id="copy-button" icon-end="copy-to-clipboard">Copy</calcite-button>
        </main>
        <script>
          const copyButtonEl = document.querySelector("#copy-button");
          const contentEl = document.querySelector("#copy");
          const randomizeButtonEl = document.querySelector("#randomize-button");
          const teamEl = document.querySelector("#team");

          function randomizeOrder() {
            const items = Array.from(teamEl.children);
            for (let index = items.length - 1; index > 0; index--) {
              const swapIndex = Math.floor(Math.random() * (index + 1));
              [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
            }
            teamEl.replaceChildren(...items);
          }

          randomizeButtonEl.addEventListener("click", randomizeOrder);
          randomizeOrder();

          copyButtonEl.addEventListener("click", async () => {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  "text/html": new Blob([contentEl.innerHTML], { type: "text/html" }),
                  "text/plain": new Blob([contentEl.innerText], { type: "text/plain" }),
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
