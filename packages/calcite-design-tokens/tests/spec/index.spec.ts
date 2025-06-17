import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

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
  {
    name: Platform.CSS,
    files: ["breakpoints", "classes", "component", "core", "dark", "global", "index", "light", "semantic"],
  },
  { name: Platform.SCSS, files: ["breakpoints", "core", "dark", "global", "index", "light", "mixins", "semantic"] },
  { name: Platform.ES6, files: ["breakpoints", "core", "global", "semantic"] },
  { name: Platform.DOCS, files: ["core", "global", "semantic"], internal: true },
  { name: Platform.JS, files: ["core", "global", "semantic"], internal: true },
];

describe("generated tokens", () => {
  platforms.forEach(({ name, files, internal }) => generateTests(name, files, internal));
});

/**
 * Generate test cases for a given platform and files
 *
 * @param platform - The platform name (e.g., "css", "scss", "es6")
 * @param files - The list of files to test
 * @param internal - Whether the test is for internal files
 */
function generateTests(platform: Platform, files: string[], internal = false) {
  const internalTestAnnotation = internal ? " (internal)" : "";
  describe(`${platform.toUpperCase()}${internalTestAnnotation}`, () => {
    files.forEach((file) => {
      const extension = platform === "docs" ? "json" : platform === "es6" ? "js" : platform;

      it(`${file} should match`, () => assertOutput(`${platform}/${file}.${extension}`));

      if (platform === "es6" || platform === "js") {
        it(`${file} types should match`, () => assertOutput(`${platform}/${file}.d.ts`));
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
  const filePath = resolve(import.meta.dirname, "..", "..", "dist", outputFilePath);
  const content = preprocessContent(readFileSync(filePath, "utf-8"), outputFilePath.split(".").pop());
  expect(content).toMatchSnapshot();
}

/**
 * Preprocess the output file before snapshot comparison
 *
 * @param content
 * @param extension
 */
function preprocessContent(content: string, extension: string): string {
  if (extension === "json") {
    content = content.replace(/"timestamp": \d+,\n/, '"timestamp": "TEST_TIMESTAMP",\n');
  }

  return content;
}
