#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const componentsDir = path.join(process.cwd(), "packages", "calcite-components", "src", "components");
const blockList = new Set([
  "Action Menu",
  "Color Picker Hex Input",
  "Date Picker Day",
  "Date Picker Month",
  "Date Picker Month Header",
  "Functional",
  "Graph",
  "Handle",
  "Sort Handle",
  "Sortable List",
  "Stack",
]);

async function main() {
  if (!fs.existsSync(componentsDir)) {
    console.error("Components directory not found:", componentsDir);
    process.exit(2);
  }

  const changeCaseModule = await import("change-case");
  const changeCaseRoot = changeCaseModule.default ?? changeCaseModule;
  const { capitalCase } = changeCaseRoot;

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  const componentFolders = entries
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => directoryEntry.name)
    .sort((left, right) => left.localeCompare(right, "en"));

  // Exclude non user facing component folders (blacklist)
  const filteredComponentFolders = componentFolders.filter((name) => !blockList.has(name));
  const templateDir = path.join(process.cwd(), ".github", "ISSUE_TEMPLATE");
  const allFiles = fs.readdirSync(templateDir);

  // Only update these template types
  const targetPattern = /bug|accessibility|documentation|enhancement|refactor|test/i;
  const files = allFiles.filter((f) => targetPattern.test(f));
  if (files.length === 0) {
    console.log("No templates for bug, accessibility, documentation, or enhancement found in", templateDir);
    return;
  }
  console.log("Updating following templates:", files.join(", "));
  let updatedCount = 0;

  for (const file of files) {
    const fullPath = path.join(templateDir, file);
    const content = fs.readFileSync(fullPath, "utf8");

    const lines = content.split(/\r?\n/);
    const outputLines = [...lines];
    const whichComponentIndex = lines.findIndex((line) => /^\s*id:\s*which-component\s*$/.test(line));

    let changed = false;
    if (whichComponentIndex !== -1) {
      // Find the next line with "options:" under "which-component"
      let i = whichComponentIndex + 1;
      while (i < lines.length && !/^\s*options:\s*$/.test(lines[i])) i++;
      const optionsLineIndex = i;
      if (optionsLineIndex >= lines.length) {
        console.error(`No options: line found after which-component in ${file}, skipping`);
        continue;
      }

      // Determine where the options list ends: scan downward and stop when we encounter the next '- type:' line (start of next input)
      let componentsListEndIdx = optionsLineIndex + 1;
      while (componentsListEndIdx < lines.length) {
        // Stop when we hit the next input marker '- type:'
        if (/^\s*-\s*type:/.test(lines[componentsListEndIdx])) break;
        componentsListEndIdx++;
      }

      // Get indentation from options line so we don't change any user formatting there
      const indentMatch = lines[optionsLineIndex].match(/^(\s*)/);
      const optionsLineIndentation = indentMatch[1];
      const componentListIndent = `${optionsLineIndentation}  `;

      // Build the new component option item lines, populate the constant options first
      const newOptionItems = [`${componentListIndent}- N/A`, `${componentListIndent}- Unknown / Not Sure`];
      for (const componentName of filteredComponentFolders) {
        newOptionItems.push(`${componentListIndent}- ${capitalCase(componentName)}`);
      }

      // Replace the lines between the "options:" line and the next input marker with the item lines
      // optionsLineIndex points at the 'options:' line, so start replacing at +1
      const replaceStart = optionsLineIndex + 1;
      const replaceCount = componentsListEndIdx - replaceStart;
      outputLines.splice(replaceStart, replaceCount, ...newOptionItems);
      changed = true;
    }

    if (changed) {
      const newContent = outputLines.join("\n");
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, "utf8");
        console.log(`Updated ${file} with ${filteredComponentFolders.length} components`);
        updatedCount++;
      }
    }
  }

  const message = updatedCount === 0 ? "No templates needed updating" : `Updated ${updatedCount} template(s)`;
  console.log(message);
}

main();
