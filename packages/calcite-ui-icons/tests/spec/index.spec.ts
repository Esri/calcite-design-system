import { readdirSync, readFileSync } from "node:fs"
import { resolve, extname, basename } from "node:path"
import { describe, it, expect } from "vitest";

const iconsDir = resolve(import.meta.dirname, "../../icons")

const iconFiles = readdirSync(iconsDir)
  .filter((fileName) => extname(fileName) === ".svg")
  .sort()

const iconSources = iconFiles.map((fileName) => {
  const filePath = resolve(iconsDir, fileName)
  const svgText = readFileSync(filePath, "utf8")
    .replace(/\r\n/g, "\n")
    .trim()

  return {
    fileName,
    baseName: basename(fileName, ".svg"),
    svgText,
  }
})

describe("icon output", () => {
  it("has icons", () => {
    expect(iconSources.length).toBeGreaterThan(0);
  });

  for (const { baseName, svgText } of iconSources) {
    it(`${baseName} matches snapshot`, () => {
      expect(svgText).toMatchSnapshot();
    });
  }
});
