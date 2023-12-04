import { resolve } from "path";
import { getFiles } from "./getFiles.js";

describe("Helper to get files", () => {
  it("should accept a file path", async () => {
    const globalPath = resolve(__dirname, "../../test/mock/src/global.json");
    const files = await getFiles(globalPath);
    expect(files).toMatchObject({
      global: globalPath,
    });
  });

  it("should accept a directory path", async () => {
    const globalPath = resolve(__dirname, "../../test/mock/src");
    const files = await getFiles(globalPath);
    expect(files).toMatchObject({
      global: resolve(__dirname, "../../test/mock/src/global.json"),
    });
  });
});
