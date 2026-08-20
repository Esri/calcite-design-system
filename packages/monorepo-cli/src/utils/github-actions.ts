import * as githubCore from "@actions/core";
import { styleText } from "node:util";

/**
 * Check if the current environment is running under GitHub Actions.
 */
export const isUnderGitHubActions = process.env.GITHUB_ACTIONS === "true";

/**
 * Set a GitHub Actions error annotation.
 */
export function setGithubError(text: string, properties?: githubCore.AnnotationProperties): void {
  if (isUnderGitHubActions) {
    githubCore.error(text, properties);
  }
  if (properties?.file) {
    // eslint-disable-next-line no-console
    console.error(styleText("red", `In ${properties.file}:`));
  }
  // eslint-disable-next-line no-console
  console.error(styleText("red", text));
}
