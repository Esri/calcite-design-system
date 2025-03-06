import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

describe("generated tokens", () => {
  describe("CSS", () => {
    it("global should match", () => {
      assertOutput("css/global.css");
    });
    it("core should match", () => {
      assertOutput("css/core.css");
    });
    it("light should match", () => {
      assertOutput("css/light.css");
    });
    it("dark should match", () => {
      assertOutput("css/dark.css");
    });
  });

  describe("SCSS", () => {
    it("global should match", () => {
      assertOutput("scss/global.scss");
    });
    it("core should match", () => {
      assertOutput("scss/core.scss");
    });
    it("light should match", () => {
      assertOutput("scss/light.scss");
    });
    it("dark should match", () => {
      assertOutput("scss/dark.scss");
    });
  });

  describe("ES6", () => {
    it("global should match", () => {
      assertOutput("es6/global.js");
    });
    it("core should match", () => {
      assertOutput("es6/core.js");
    });
    it("types should match", () => {
      assertOutput("es6/core.d.ts");
      assertOutput("es6/global.d.ts");
    });
  });
});
