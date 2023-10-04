import { nameKebabCase } from "./nameKebabCase";

describe("transform names to kebab case", () => {
  it("should transform a token path to token name in a kebab case format", () => {
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
    expect(nameKebabCase(mockToken)).toBe("test-token-name");
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
    expect(nameKebabCase(mockToken)).toBe("test-token-name");
  });
});
