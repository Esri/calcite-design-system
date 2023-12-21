import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createCalciteTokenFiles } from "./createCalciteTokenFiles.js";
import { ConfigOptions } from "../../types/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Helper to create a Calcite Token Transformer configuration file", () => {
  it("should return a token file", async () => {
    const args = {
      name: "testName",
      path: resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"),
    };
    const expected = {
      name: "testName",
      source: [resolve(__dirname, "..", "..", "test", "mock", "src", "global.json")],
    };
    const tokenFile = await createCalciteTokenFiles(args);
    expect(tokenFile).toMatchObject({
      name: expected.name,
      source: expected.source,
    });
  });

  it("should add additional sources to the returned token file", async () => {
    const args = {
      name: "testName",
      path: resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"),
      source: ["./my-extra-source"],
    };
    const expected = {
      name: "testName",
      source: [resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"), "my-extra-source"],
    };
    const tokenFile = await createCalciteTokenFiles(args);
    expect(tokenFile).toMatchObject({
      name: expected.name,
      source: expected.source,
    });
  });

  it("should add references to the returned token file", async () => {
    const args = {
      name: "testName",
      path: resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"),
      references: ["my-extra-source"],
    };
    const expected = {
      name: "testName",
      source: [resolve(__dirname, "..", "..", "test", "mock", "src", "global.json")],
      references: ["my-extra-source"],
    };
    const tokenFile = await createCalciteTokenFiles(args);
    expect(tokenFile).toMatchObject({
      name: expected.name,
      source: expected.source,
      references: expected.references,
    });
  });

  it("should add options to the returned token file", async () => {
    const options: ConfigOptions = {
      prefix: "testPrefix",
    };
    const args = {
      name: "testName",
      path: resolve(__dirname, "..", "..", "test", "mock", "src", "global.json"),
      options,
    };
    const expected = {
      name: "testName",
      source: [resolve(__dirname, "..", "..", "test", "mock", "src", "global.json")],
      options,
    };
    const tokenFile = await createCalciteTokenFiles(args);
    expect(tokenFile).toMatchObject({
      name: expected.name,
      source: expected.source,
      options: expected.options,
    });
  });
});
