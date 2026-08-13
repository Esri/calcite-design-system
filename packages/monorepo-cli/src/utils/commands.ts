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

export function assertRequiredOption<T extends unknown>(
  option: T,
  name: string,
  errorMessage?: string,
): NonNullable<T> {
  if (option === undefined || option === null) {
    // TODO: Log with GH core if available, otherwise console. Look at Web GIS for example.
    console.log(errorMessage || `error: required option ${name} not specified`);
    process.exit(0);
  }

  return option as NonNullable<T>;
}
