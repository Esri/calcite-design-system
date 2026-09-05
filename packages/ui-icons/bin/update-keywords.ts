import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type Codepoint = number | null;

interface FantasticonConfig {
  codepoints?: Record<string, Codepoint>;
}

interface KeywordEntry {
  codepoint?: unknown;
}

type Keywords = Record<string, KeywordEntry>;

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fantasticonrcPath = resolve(packageRoot, process.argv[2] ?? "fantasticonrc.json");
const keywordsPath = resolve(packageRoot, process.argv[3] ?? "docs/keywords.json");

function readJson<T>(filePath: string): T {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    throw new Error(`Failed to read or parse ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function validateKeywords(codepoints: Record<string, Codepoint>, keywords: Keywords): string[] {
  const issues: string[] = [];

  for (const [iconName, entry] of Object.entries(keywords)) {
    if (entry === null || typeof entry !== "object") {
      issues.push(`${iconName}: keyword entry must be an object`);
      continue;
    }

    const expectedCodepoint = Object.hasOwn(codepoints, iconName) ? codepoints[iconName] : null;
    if (!Object.hasOwn(entry, "codepoint")) {
      issues.push(`${iconName}: missing codepoint (expected ${expectedCodepoint ?? "null"})`);
    } else if (entry.codepoint !== expectedCodepoint) {
      issues.push(
        `${iconName}: codepoint ${String(entry.codepoint)} does not match expected ${expectedCodepoint ?? "null"}`,
      );
    }
  }

  return issues;
}

const config = readJson<FantasticonConfig>(fantasticonrcPath);
const keywords = readJson<Keywords>(keywordsPath);
const issues = validateKeywords(config.codepoints ?? {}, keywords);

if (issues.length > 0) {
  throw new Error(
    [
      `Keyword validation failed with ${issues.length} issue${issues.length === 1 ? "" : "s"}:`,
      ...issues.map((issue) => `- ${issue}`),
    ].join("\n"),
  );
}

console.log(`Validated ${Object.keys(keywords).length} keyword entries.`);
