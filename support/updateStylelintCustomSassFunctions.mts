/**
 * This script updates a variable from the stylelint config file with a list of custom Sass functions found in the project.
 * This helps stylelint flag unknown functions that may be unintentionally used.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

console.info("Scanning custom functions for Stylelint config update.");

const rootDirectory = join(import.meta.dirname, "..");

function collectSassFiles(dir: string): string[] {
  const sassFiles: string[] = [];

  try {
    readdirSync(dir, { recursive: true, withFileTypes: true }).forEach((dirent) => {
      const fullPath = join(dirent.parentPath, dirent.name);

      if (dirent.isFile() && fullPath.endsWith(".scss")) {
        sassFiles.push(fullPath);
      }
    });
  } catch (err) {
    console.error(`Error reading directory: ${dir}`, err);
  }

  return sassFiles;
}

const customFunctionPattern = /@function\s+([a-zA-Z0-9_-]+)/g;
const customFunctions = new Set<string>();
const sassFiles = collectSassFiles(rootDirectory);

sassFiles.forEach((filePath) => {
  try {
    const content = readFileSync(filePath, "utf8");
    let match: RegExpExecArray | null;

    while ((match = customFunctionPattern.exec(content)) !== null) {
      customFunctions.add(match[1]);
    }
  } catch (err) {
    console.error(`Error reading file: ${filePath}`, err);
  }
});

const stylelintConfigPath = join(import.meta.dirname, "..", "packages", "components", ".stylelintrc.cjs");

try {
  const stylelintConfigContent = readFileSync(stylelintConfigPath, "utf8");
  const customFunctionsPattern = /const customFunctions = \[[\s\S]*?\];/;

  const updatedConfigContent = stylelintConfigContent.replace(
    customFunctionsPattern,
    `const customFunctions = ${JSON.stringify(Array.from(customFunctions).sort(), null, 2)};`,
  );

  writeFileSync(stylelintConfigPath, updatedConfigContent);
  console.info("Stylelint configuration updated successfully");
} catch (err) {
  console.error(`Error updating Stylelint configuration: ${stylelintConfigPath}`, err);
}
