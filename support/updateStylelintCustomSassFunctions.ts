/**
 * This script updates a variable from the stylelint config file with a list of custom Sass functions found in the project.
 * This helps stylelint flag unknown functions that may be unintentionally used.
 */

import * as fs from 'fs';
import * as path from 'path';

console.info('Scanning custom functions for Stylelint config update.');

const rootDirectory = path.join(__dirname, '..');

function collectSassFiles(dir: string): string[] {
  const sassFiles: string[] = [];

  try {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
      const fullPath = path.join(dir, dirent.name);

      if (dirent.isDirectory() && dirent.name !== 'node_modules') {
        sassFiles.push(...collectSassFiles(fullPath)); // Recursively collect files
      } else if (dirent.isFile() && fullPath.endsWith('.scss')) {
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

sassFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let match: RegExpExecArray | null;

    while ((match = customFunctionPattern.exec(content)) !== null) {
      customFunctions.add(match[1]);
    }
  } catch (err) {
    console.error(`Error reading file: ${filePath}`, err);
  }
});

const stylelintConfigPath = path.join(__dirname, '../packages/calcite-components/.stylelintrc.cjs');

try {
  const stylelintConfigContent = fs.readFileSync(stylelintConfigPath, 'utf8');
  const customFunctionsPattern = /const customFunctions = \[[\s\S]*?\];/;

  const updatedConfigContent = stylelintConfigContent.replace(
    customFunctionsPattern,
    `const customFunctions = ${JSON.stringify(Array.from(customFunctions).sort(), null, 2)};`
  );

  fs.writeFileSync(stylelintConfigPath, updatedConfigContent);
  console.info('Stylelint configuration updated successfully');
} catch (err) {
  console.error(`Error updating Stylelint configuration: ${stylelintConfigPath}`, err);
}
