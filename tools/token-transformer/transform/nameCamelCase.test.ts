import { nameCamelCase } from "./nameCamelCase";

describe("transform names to camel case", () => {
  it("should transform a token path to token name in a camel case format", () => {
    const mockToken = {
      name: "current-name",
      path: ["test", "token", "name"],
      value: "fake-value",
      filePath: "./fakePath.json",
      original: {
        value: "fake-value",
        type: "composite"
      },
      isSource: true
    };
    expect(nameCamelCase(mockToken, {})).toBe("testTokenName");
  });

  it("should add prefix to token name", () => {
    const mockToken = {
      name: "current-name",
      path: ["test", "token", "name"],
      value: "fake-value",
      filePath: "./fakePath.json",
      original: {
        value: "fake-value",
        type: "composite"
      },
      isSource: true
    };
    const mockOptions = {
      prefix: "calcite"
    };
    expect(nameCamelCase(mockToken, mockOptions)).toBe("calciteTestTokenName");
  });
});
