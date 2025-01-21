import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { describe, it, expect } from "vitest";
import { getFiles } from "./getFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Helper to get files", () => {
  it("should accept a file path", async () => {
    const globalPath = resolve(__dirname, "..", "..", "test", "mock", "src", "global.json");
    const files = await getFiles(globalPath);
    expect(files).toMatchObject({
      global: globalPath,
    });
  });

  it("should accept a directory path", async () => {
    const globalPath = resolve(__dirname, "..", "..", "test", "mock", "src");
    const files = await getFiles(globalPath);
    expect(files).toMatchObject({
      global: resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"),
    });
  });
});
