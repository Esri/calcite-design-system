import { setGithubError } from "./github-actions.ts";

/**
 * Returns first non-empty line from command description.
 */
export function getSummary(description: string): string {
  const newLineIndex = description.indexOf("\n");
  if (newLineIndex === -1) {
    return description.trim();
  } else {
    return description.slice(0, newLineIndex);
  }
}

/**
 * Normalizes multiline command descriptions by removing leading/trailing blank lines
 * and stripping shared indentation while preserving internal formatting.
 */
export function formatDescription(text: string): string {
  const normalized = text.replace(/\r\n/gu, "\n");
  const lines = normalized.split("\n");

  while (lines.length > 0 && lines[0]?.trim() === "") {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1]?.trim() === "") {
    lines.pop();
  }

  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const match = line.match(/^[\t ]*/u);
      return match ? match[0].length : 0;
    });

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(minIndent)).join("\n");
}

/**
 * Asserts that the provided option is not undefined or null, otherwise exits with an error message.
 * @param option The option to check.
 * @param name The name of the option. Used to generate a useful error message.
 * @param errorMessage Optional custom error message to display if the option is not specified.
 * @returns The non-nullable value of the option.
 */
export function assertRequiredOption<T extends unknown>(
  option: T,
  name: string,
  errorMessage?: string,
): NonNullable<T> {
  if (option === undefined || option === null) {
    errorAndExit(errorMessage || `error: required option ${name} not specified`);
  }

  return option as NonNullable<T>;
}

/**
 * Logs the error message and exits the process with the provided exit code.
 * @param message The error message to log.
 * @param code The process exit code (default: 1).
 */
export function errorAndExit(message: string, code: number = 1): never {
  setGithubError(message);
  process.exit(code);
}
