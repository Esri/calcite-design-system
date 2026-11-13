import dedent from "dedent";
import { randomInt } from "node:crypto";
import { getOctokit } from "@actions/github";
import { Command } from "@commander-js/extra-typings";
import { errorAndExit, getSummary } from "./utils/commands.ts";
import { addLineToSummary, getGithubToken, setGithubOutput, writeSummary } from "./utils/github-actions.ts";

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
  Print the team's outstanding issues in the current milestone as \`notify-teams\` compatible Markdown.

  The command prints a snapshot locally and exits. In GitHub Actions, it writes
  the snapshot to the run summary and the "message" step output. Roster order is
  randomized on every run.

  When running locally, the command can be run without a token if the GitHub CLI
  is installed and authorized for the Esri organization via SSO.
`;
const tokenUsage = "-t, --token <TOKEN>";

export const registerCommand = (command: Command): void =>
  void command
    .command("team-status")
    .summary(getSummary(description))
    .description(description)
    .option("--list-only", "Show only the team list, without GitHub overview, links, or counts.")
    .option(tokenUsage, "GitHub token. Defaults to GH_TOKEN, GITHUB_TOKEN, then local gh authentication.")
    .action(run);

async function run({ listOnly, token }: TeamStatusOptions): Promise<void> {
  try {
    const statusInfo = listOnly ? undefined : await getStatusInfo(getGithubToken(token));
    const markdown = renderTeamStatusMarkdown(statusInfo);
    addLineToSummary(markdown);
    await writeSummary();
    setGithubOutput("message", markdown);
  } catch (error) {
    errorAndExit(`Failed to load team status. ${error instanceof Error ? error.message : String(error)}`);
  }
}

function getSearchUrl(query: string): URL {
  const url = new URL(`https://github.com/${repository.owner}/${repository.repo}/issues`);
  url.searchParams.set("q", query);
  return url;
}

function shuffleListItems<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = randomInt(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

/**
 * Generates basic Markdown with a randomized roster for Teams notifications or local command output.
 */
export function renderTeamStatusMarkdown(statusInfo?: StatusInfo): string {
  if (!statusInfo) {
    return shuffleListItems(team)
      .map(({ firstName }) => `- ${firstName}`)
      .join("\n");
  }

  return [
    `[Open issues](${getSearchUrl(statusInfo.issues.query)}): ${statusInfo.issues.count}`,
    `[Pull requests needing review](${getSearchUrl(statusInfo.pulls.query)}): ${statusInfo.pulls.count}`,
    "",
    ...shuffleListItems(statusInfo.assignees).map(
      ({ username, firstName, issueCount }) =>
        `- [${firstName}](${getSearchUrl(`${statusInfo.issues.query} assignee:${username}`)}) - ${issueCount}`,
    ),
  ].join("\n");
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
