import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type Codepoint = number | null;

interface FantasticonConfig {
  codepoints?: Record<string, Codepoint>;
}

interface KeywordEntry {
  [key: string]: unknown;
  codepoint?: Codepoint;
}

type Keywords = Record<string, KeywordEntry>;

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fix = process.argv.includes("--fix");
const fantasticonrcPath = resolve(packageRoot, "fantasticonrc.json");
const keywordsPath = resolve(packageRoot, "docs/keywords.json");

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

    const expectedCodepoint = codepoints[iconName] ?? null;
    if (!Object.hasOwn(entry, "codepoint")) {
      issues.push(`${iconName}: missing codepoint (expected ${expectedCodepoint})`);
    } else if (entry.codepoint !== expectedCodepoint) {
      issues.push(`${iconName}: codepoint ${String(entry.codepoint)} does not match expected ${expectedCodepoint}`);
    }
  }

  return issues;
}

const config = readJson<FantasticonConfig>(fantasticonrcPath);
const keywords = readJson<Keywords>(keywordsPath);
const issues = validateKeywords(config.codepoints ?? {}, keywords);
const criticalIssues = issues.filter((issue) => !issue.includes(": missing codepoint "));

if (criticalIssues.length > 0) {
  throw new Error(
    [
      `Keyword validation failed with ${criticalIssues.length} critical issue${criticalIssues.length === 1 ? "" : "s"}:`,
      ...criticalIssues.map((issue) => `- ${issue}`),
    ].join("\n"),
  );
}

if (fix) {
  const codepoints = config.codepoints ?? {};
  for (const [iconName, entry] of Object.entries(keywords)) {
    if (entry !== null && typeof entry === "object") {
      entry.codepoint = codepoints[iconName] ?? null;
    }
  }

  writeFileSync(keywordsPath, `${JSON.stringify(keywords, null, 2)}\n`, "utf8");
  console.log(`Updated ${keywordsPath}.`);
} else if (issues.length > 0) {
  const missingIssues = issues.filter((issue) => issue.includes(": missing codepoint "));
  if (missingIssues.length > 0) {
    console.warn(missingIssues.join("\n"));
  }
}

if (!fix) {
  console.log(`Checked ${Object.keys(keywords).length} keyword entries.`);
}
