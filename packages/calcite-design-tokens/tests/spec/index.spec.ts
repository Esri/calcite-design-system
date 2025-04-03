import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

enum Platform {
  CSS = "css",
  SCSS = "scss",
  ES6 = "es6",
  JS = "js",
  DOCS = "docs",
}

const platforms: {
  name: Platform;
  files: string[];
  internal?: boolean;
}[] = [
  { name: Platform.CSS, files: ["breakpoints", "classes", "core", "dark", "global", "index", "light", "semantic"] },
  { name: Platform.SCSS, files: ["breakpoints", "core", "dark", "global", "index", "light", "mixins", "semantic"] },
  { name: Platform.ES6, files: ["breakpoints", "core", "global", "semantic"] },
  { name: Platform.DOCS, files: ["core", "global", "semantic"], internal: true },
  { name: Platform.JS, files: ["core", "global", "semantic"], internal: true },
];

describe("generated tokens", () => {
  platforms.forEach(({ name, files }) => generateTests(name, files));
});

/**
 * Generate test cases for a given platform and files
 *
 * @param platform - The platform name (e.g., "css", "scss", "es6")
 * @param files - The list of files to test
 * @param internal - Whether the test is for internal files
 */
function generateTests(platform: Platform, files: string[], internal = false) {
  // eslint-disable-next-line vitest/valid-title
  describe(platform.toUpperCase(), () => {
    files.forEach((file) => {
      const extension = platform === "docs" ? "json" : platform === "es6" ? "js" : platform;
      const internalTestAnnotation = internal ? " (internal)" : "";

      it(`${file}${internalTestAnnotation} should match`, () => assertOutput(`${platform}/${file}.${extension}`));

      if (platform === "es6" || platform === "js") {
        it(`${file}${internalTestAnnotation} types should match`, () => assertOutput(`${platform}/${file}.d.ts`));
      }
    });
  });
}

/**
 * Assert that the output file contents matches the snapshot
 *
 * @param outputFilePath - The path to the output file to test, relative to the dist directory
 */
function assertOutput(outputFilePath: string) {
  const filePath = resolve(__dirname, "..", "..", "dist", outputFilePath);
  let content = readFileSync(filePath, "utf-8");
  content = content.slice(content.indexOf("*/") + 1);
  expect(content).toMatchSnapshot();
}
