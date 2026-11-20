import { setGithubError } from "./github-actions.ts";

/**
 * Returns first non-empty line from command description.
 */
export function getSummary(description: string): string {
  const newLineIndex = description.indexOf("\n");
  return newLineIndex === -1 ? description.trim() : description.slice(0, newLineIndex);
}

/**
 * Asserts that the provided option is not undefined or null, otherwise exits with an error message.
 *
 * @param option The option to check.
 * @param name The name of the option. Used to generate a useful error message.
 * @param errorMessage Optional custom error message to display if the option is not specified.
 * @returns The non-nullable value of the option.
 */
export function assertRequiredOption<T>(option: T, name: string, errorMessage?: string): NonNullable<T> {
  return option ?? errorAndExit(errorMessage || `error: required option ${name} not specified`);
}

/**
 * Logs the error message and exits the process with the provided exit code.
 *
 * @param message The error message to log.
 * @param code The process exit code (default: 1).
 */
export function errorAndExit(message: string, code: number = 1): never {
  setGithubError(message);
  process.exit(code);
}
