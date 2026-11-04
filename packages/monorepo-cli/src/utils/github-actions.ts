import * as githubCore from "@actions/core";
import { execFileSync } from "node:child_process";
import { styleText } from "node:util";

export const isUnderGitHubActions = process.env.GITHUB_ACTIONS === "true";

const markdownLog: string[] = [];

/**
 * Resolves explicit or environment credentials before using the local GitHub CLI login.
 */
export function getGithubToken(token?: string): string {
  const providedToken = token || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (providedToken) {
    return providedToken;
  }

  const authError =
    "Unable to read local GitHub authentication. Install the GitHub CLI and run " +
    "'gh auth login --hostname github.com', or provide --token, GH_TOKEN, or GITHUB_TOKEN.";
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

export function logForOperator(text: string): void {
  if (!isUnderGitHubActions) {
    /* eslint-disable-next-line no-console -- Required for CLI output outside of GitHub. */
    console.log(text);
  }
}

/**
 * Set a GitHub Actions error annotation.
 */
export function setGithubError(text: string, properties?: githubCore.AnnotationProperties): void {
  if (isUnderGitHubActions) {
    githubCore.error(text, properties);
  }
  if (properties?.file) {
    /* eslint-disable-next-line no-console -- Required for CLI output outside of GitHub. */
    console.error(styleText("red", `In ${properties.file}:`));
  }
  /* eslint-disable-next-line no-console -- Required for CLI output outside of GitHub. */
  console.error(styleText("red", text));
}

/**
 * Set a GitHub Actions output variable.
 */
export function setGithubOutput(key: string, value: string[] | string): void {
  if (isUnderGitHubActions) {
    githubCore.setOutput(key, value);
  }
}

/**
 * Assemble the summary output and set it as a GitHub Actions output variable.
 */
export function setSummaryAsGithubOutput(key = "summary"): void {
  setGithubOutput(key, markdownLog.join("\n"));
}

/**
 * Add a heading to the summary output.
 */
export function addHeadingToSummary(text: string, level: 1 | 2 | 3 | 4 = 1): void {
  if (isUnderGitHubActions) {
    githubCore.summary.addHeading(text, level).addEOL();
    markdownLog.push(`**${text}**`); // Teams card don't support markdown headings
  } else {
    logForOperator(styleText("bold", text));
  }
}

/**
 * Add a line of text to the summary output.
 */
export function addLineToSummary(text: string): void {
  if (isUnderGitHubActions) {
    githubCore.summary.addRaw(text).addEOL();
    markdownLog.push(text);
    markdownLog.push("\n");
  } else {
    logForOperator(text.replace(/^#{1,6}[ \t]+(.+)$/gmu, (_match, heading: string) => styleText("bold", heading)));
  }
}

/**
 * Add a list of items to the summary output.
 */
export function addListToSummary(items: string[], ordered?: boolean): void {
  if (isUnderGitHubActions) {
    githubCore.summary.addList(items, ordered).addEOL();
    markdownLog.push(
      ordered
        ? items.map((item, index) => `${index + 1}. ${item}`).join("\n")
        : items.map((item) => `- ${item}`).join("\n"),
    );
    markdownLog.push("\n");
  } else {
    items.forEach((item) => logForOperator(`- ${item}`));
  }
}

/**
 * Write the summary of actions taken to the GitHub Actions summary file.
 */
export async function writeSummary(): Promise<void> {
  if (isUnderGitHubActions) {
    await githubCore.summary.write();
  }
}
