#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import select from "@inquirer/select";
import checkbox from "@inquirer/checkbox";

type ComponentEntry = {
  componentName: string;
  files: string[];
};

type ParsedBlocks = {
  cssBlocks: string[];
  jsBlocks: string[];
  htmlBlocks: string[];
  unknownLanguages: Set<string>;
};

const snippetsDir = "../../../calcite-documentation/documentation/component-sample-snippets";
const indexHtml = "index.html";

yargs(hideBin(process.argv)).scriptName("demo-snippet").strict().help().parseSync();

async function promptForChoice(promptLabel: string, options: string[]): Promise<number> {
  if (options.length === 1) {
    return 0;
  }

  const value = await select<string>({
    message: promptLabel,
    choices: options.map((name, index) => ({
      name,
      value: String(index),
    })),
    loop: true,
    pageSize: 10,
  });

  const index = Number.parseInt(value);
  if (Number.isNaN(index) || index < 0 || index >= options.length) {
    console.error("Unexpected selection result");
    process.exit(1);
  }

  return index;
}

async function promptForMultipleChoices(promptLabel: string, options: string[]): Promise<number[]> {
  if (options.length === 1) {
    return [0];
  }

  const values = await checkbox<string>({
    message: `${promptLabel} (space to toggle, enter to confirm)`,
    choices: options.map((name, index) => ({
      name,
      value: String(index),
    })),
    loop: true,
    pageSize: 10,
    validate: (selected) => selected.length > 0 || "Select at least one snippet",
  });

  const indices = values
    .map((value) => Number.parseInt(value))
    .filter((index) => !Number.isNaN(index) && index >= 0 && index < options.length);

  if (indices.length === 0) {
    console.error("No valid selections resolved from prompt");
    process.exit(1);
  }

  return indices;
}

async function collectComponents(rootDir: string): Promise<Map<string, ComponentEntry>> {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const components = new Map<string, ComponentEntry>();

  for (const entry of entries) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".mdx")) {
      const componentName = path.basename(entry.name, ".mdx");
      const filePath = path.join(rootDir, entry.name);

      components.set(componentName, {
        componentName,
        files: [filePath],
      });
    }

    if (entry.isDirectory()) {
      const componentName = entry.name;
      const componentDir = path.join(rootDir, componentName);
      const childEntries = await fs.readdir(componentDir, { withFileTypes: true });

      const mdxFiles = childEntries
        .filter((child) => child.isFile() && child.name.toLowerCase().endsWith(".mdx"))
        .map((child) => path.join(componentDir, child.name));

      if (mdxFiles.length > 0) {
        components.set(componentName, {
          componentName,
          files: mdxFiles,
        });
      }
    }
  }

  return components;
}

function stripFrontmatter(mdxContent: string): string {
  const frontmatterPattern = /^---[\r\n]+[\s\S]*?^---[\r\n]+/m;
  return mdxContent.replace(frontmatterPattern, "").trimStart();
}

function parseMdxIntoBlocks(mdxContent: string): ParsedBlocks {
  const fencePattern = /```([^\r\n]*)\r?\n([\s\S]*?)```/g;

  const cssBlocks: string[] = [];
  const jsBlocks: string[] = [];
  const htmlBlocks: string[] = [];
  const unknownLanguages = new Set<string>();

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = fencePattern.exec(mdxContent)) !== null) {
    const [fullMatch, rawLanguage, codeContent] = match;
    const language = (rawLanguage || "").trim().toLowerCase();

    const leadingText = mdxContent.slice(lastIndex, match.index);
    if (leadingText.trim()) {
      htmlBlocks.push(leadingText.trim());
    }

    lastIndex = match.index + fullMatch.length;

    const trimmedCode = codeContent.trim();
    if (!trimmedCode) {
      continue;
    }

    if (language === "css") {
      cssBlocks.push(trimmedCode);
    } else if (language === "js") {
      jsBlocks.push(trimmedCode);
    } else if (!language || language === "html") {
      htmlBlocks.push(trimmedCode);
    } else {
      unknownLanguages.add(language);

      const commentedBlock = [
        "<!-- Unrecognized fenced code block",
        `lang: ${language || "(none)"}`,
        "",
        trimmedCode,
        "-->",
      ].join("\n");

      htmlBlocks.push(commentedBlock);
    }
  }

  const trailingText = mdxContent.slice(lastIndex);
  if (trailingText.trim()) {
    htmlBlocks.push(trailingText.trim());
  }

  return {
    cssBlocks,
    jsBlocks,
    htmlBlocks,
    unknownLanguages,
  };
}

function buildHtmlSnippet(cssBlocks: string[], jsBlocks: string[], htmlBlocks: string[]): string {
  const parts: string[] = [];

  if (cssBlocks.length > 0) {
    parts.push("<style>", cssBlocks.join("\n\n"), "</style>");
  }

  if (htmlBlocks.length > 0) {
    parts.push(htmlBlocks.join("\n\n"));
  }

  if (jsBlocks.length > 0) {
    parts.push('<script type="module">', jsBlocks.join("\n\n"), "</script>");
  }

  return parts.join("\n\n");
}

async function updateIndexHtml(indexHtmlPath: string, snippetContent: string): Promise<void> {
  const startMarker = "<!-- demo snippet start -->";
  const endMarker = "<!-- demo snippet end -->";

  const originalContent = await fs.readFile(indexHtmlPath, "utf8");
  const startIndex = originalContent.indexOf(startMarker);
  const endIndex = originalContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    console.error("Could not find demo snippet markers in index.html");
    process.exit(1);
  }

  const beforeSnippet = originalContent.slice(0, startIndex + startMarker.length);
  const afterSnippet = originalContent.slice(endIndex);

  const updatedContent = [beforeSnippet.trimEnd(), "", snippetContent, "", afterSnippet.trimStart()].join("\n");

  await fs.writeFile(indexHtmlPath, updatedContent, "utf8");
}

async function run(): Promise<void> {
  const snippetsRoot = path.resolve(process.cwd(), snippetsDir);
  const indexHtmlPath = path.resolve(process.cwd(), indexHtml);

  const componentsMap = await collectComponents(snippetsRoot);
  const componentNames = Array.from(componentsMap.keys()).sort();

  if (componentNames.length === 0) {
    console.error(`No MDX snippets found in ${snippetsRoot}`);
    process.exit(1);
  }

  const selectedComponentIndex = await promptForChoice("Select a component", componentNames);
  const selectedComponentName = componentNames[selectedComponentIndex];
  const component = componentsMap.get(selectedComponentName);

  if (!component) {
    console.error(`Component not found for selection: ${selectedComponentName}`);
    process.exit(1);
  }

  const files = component.files;
  const fileLabels = files.map((filePath) => path.basename(filePath));

  const selectedSnippetIndices = await promptForMultipleChoices(
    `Select snippet(s) for ${selectedComponentName}`,
    fileLabels,
  );

  const selectedSnippetPaths = selectedSnippetIndices.map((index) => files[index]);

  const aggregateCssBlocks: string[] = [];
  const aggregateJsBlocks: string[] = [];
  const aggregateHtmlBlocks: string[] = [];
  const aggregateUnknownLanguages = new Set<string>();

  for (const snippetPath of selectedSnippetPaths) {
    const rawMdx = await fs.readFile(snippetPath, "utf8");
    const mdxWithoutFrontmatter = stripFrontmatter(rawMdx);

    const { cssBlocks, jsBlocks, htmlBlocks, unknownLanguages } = parseMdxIntoBlocks(mdxWithoutFrontmatter);

    aggregateCssBlocks.push(...cssBlocks);
    aggregateJsBlocks.push(...jsBlocks);
    aggregateHtmlBlocks.push(...htmlBlocks);

    for (const language of unknownLanguages) {
      aggregateUnknownLanguages.add(language);
    }
  }

  if (aggregateUnknownLanguages.size > 0) {
    console.warn(`Warning: unrecognized code block languages: ${Array.from(aggregateUnknownLanguages).join(", ")}`);
  }

  const snippetHtml = buildHtmlSnippet(aggregateCssBlocks, aggregateJsBlocks, aggregateHtmlBlocks);

  await updateIndexHtml(indexHtmlPath, snippetHtml);

  const snippetNames = selectedSnippetPaths.map((filePath) => path.basename(filePath));

  console.log(`Updated ${indexHtmlPath} with snippet(s) from ${selectedComponentName}: ${snippetNames.join(", ")}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
