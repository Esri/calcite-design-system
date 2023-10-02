import { matchMultiWord, valueMultiWord } from "./valueMultiWordString";

const tokenDefaults = {
  filePath: "core/",
  isSource: true,
  name: "placeholder-name",
  path: ["placeholder", "path"]
};
const mockFalseMatches = {
  string: {
    ...tokenDefaults,
    attributes: {
      type: "color"
    },
    original: {
      value: "Somevalue"
    },
    value: "Somevalue"
  }
};

const mockMultiWordToken = {
  ...tokenDefaults,
  attributes: { type: "fontFamily" },
  original: {
    value: "Some value"
  },
  value: "Some value"
};

describe("transform value for multi-word", () => {
  it("should only multi-word values", () => {
    expect(matchMultiWord(mockFalseMatches.string)).toBe(false);
  });

  it("should match multi-word", () => {
    expect(matchMultiWord(mockMultiWordToken)).toBe(true);
  });

  it("should transform multi-word", () => {
    expect(valueMultiWord(mockMultiWordToken)).toBe('"Some value"');
  });
});
